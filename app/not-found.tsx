import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRODUCTS, productPath } from "@/lib/products";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="bg-slate-50 pb-24 pt-36">
      <Container size="narrow" className="text-center">
        <p className="font-mono text-sm font-bold text-brand-600">404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">This route went off the map.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">The page you were looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/product" variant="secondary">
            Explore the platform
          </Button>
        </div>
        <ul className="mx-auto mt-12 grid max-w-2xl gap-2 text-sm sm:grid-cols-3">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link href={productPath(p.slug)} className="text-slate-600 hover:text-brand-600">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
