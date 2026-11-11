// On/off switches for site features still under review. Flip a value and restart the dev server.

export const FEATURES = {
  /**
   * Demo form: a required "I agree…" checkbox (with the Privacy Policy link) above the submit button.
   * The server also rejects requests without it while this is on.
   * false → a plain privacy notice is shown above the button instead, with no checkbox.
   */
  demoConsentCheckbox: true,

  /** "Trust" links (Security, Employee Privacy) in the Product menu and the mobile menu. */
  trustMenu: true,
} as const;
