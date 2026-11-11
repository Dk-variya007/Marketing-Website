// Shared types for the Tracking Map story (phone screens + status tones).

export type PhoneScreen =
  | "home"
  | "permission"
  | "gps"
  | "started"
  | "tracking"
  | "onBreak"
  | "resumed"
  | "noNet"
  | "offline"
  | "syncing"
  | "synced"
  | "arrive"
  | "checkedIn"
  | "visitForm"
  | "visitDone"
  | "summary"
  | "stopping"
  | "complete";

export type StatusTone = "idle" | "active" | "break" | "offline" | "sync" | "visit" | "done";
