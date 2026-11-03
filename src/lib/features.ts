/**
 * The admin dashboard, the customer payment pages and the Moyasar webhook are built but switched
 * off. Set ADMIN_ENABLED=true on the server to turn them on; leave it unset to serve only the
 * landing page (its request form and tracking keep working).
 * Plain function with no imports so the middleware can use it too.
 */
export const adminEnabled = () => process.env.ADMIN_ENABLED === "true";
