/**
 * The admin dashboard, the customer payment pages and the Moyasar webhook are built but switched
 * off. Set ADMIN_ENABLED=true on the server to turn them on; leave it unset to serve only the
 * landing page (its request form and tracking keep working).
 * Checked in server code (auth, admin pages, pay pages, webhook), which reads the variable at runtime.
 */
export const adminEnabled = () => process.env.ADMIN_ENABLED === "true";
