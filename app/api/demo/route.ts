import { NextResponse } from "next/server";
import { validateDemoRequest, type DemoRequest } from "@/lib/demo";

/**
 * Receives "Book a Demo" requests and delivers them to whichever destinations are configured:
 *
 *   DEMO_WEBHOOK_URL                 – POSTs the lead as JSON (Zapier, Make, Google Apps Script → Sheets,
 *                                      Slack incoming webhook, a CRM endpoint, …)
 *   RESEND_API_KEY + DEMO_NOTIFY_EMAIL – emails the lead to your sales inbox via Resend
 *   DEMO_FROM_EMAIL                  – optional sender for that email (must be a domain verified in Resend)
 *
 * With nothing configured, development logs the lead and succeeds; production returns 503 so leads are
 * never silently dropped.
 */

// Best-effort per-IP limit. Resets when the server restarts and isn't shared between instances —
// enough to stop a script hammering the form, not a substitute for a WAF.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function sendWebhook(url: string, lead: DemoRequest & { submittedAt: string; source: string }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function sendEmail(apiKey: string, to: string, lead: DemoRequest & { submittedAt: string; source: string }) {
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Team size: ${lead.teamSize}`,
    `Industry: ${lead.industry}`,
    `Page: ${lead.source}`,
    `Submitted: ${lead.submittedAt}`,
  ];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.DEMO_FROM_EMAIL ?? "Fietra Website <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email,
      subject: `Demo request: ${lead.company} (${lead.teamSize})`,
      text: lines.join("\n"),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a field real visitors never see. Bots that fill it get a fake success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const result = validateDemoRequest(body);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  const lead = {
    ...result.data,
    submittedAt: new Date().toISOString(),
    source: typeof body.source === "string" ? body.source.slice(0, 200) : "",
  };

  const webhook = process.env.DEMO_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.DEMO_NOTIFY_EMAIL;

  const deliveries: Promise<void>[] = [];
  if (webhook) deliveries.push(sendWebhook(webhook, lead));
  if (resendKey && notifyEmail) deliveries.push(sendEmail(resendKey, notifyEmail, lead));

  if (deliveries.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[demo] No delivery configured — lead logged only:", lead);
      return NextResponse.json({ ok: true });
    }
    console.error("[demo] No delivery configured (set DEMO_WEBHOOK_URL or RESEND_API_KEY + DEMO_NOTIFY_EMAIL). Lead lost:", lead.email);
    return NextResponse.json({ error: "We couldn't send your request right now. Please try again later." }, { status: 503 });
  }

  // Succeed if at least one destination received the lead.
  const results = await Promise.allSettled(deliveries);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((f) => console.error("[demo] Delivery failed:", f.reason));
  if (failures.length === results.length) {
    return NextResponse.json({ error: "We couldn't send your request right now. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
