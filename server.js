// Start file for hosts that run `npm start` (GoDaddy Node.js Hosting and similar).
// It prepares the environment, then starts the Next.js standalone server built by `npm run build`.
const path = require("node:path");

process.env.NODE_ENV = "production";
// Containers set HOSTNAME to the container's own id, which makes Next listen on that one address
// only, so the host's health check (and the outside world) cannot reach the app. Listen on all.
process.env.HOSTNAME = "0.0.0.0";
process.env.PORT = process.env.PORT || "3000";
// The standalone server changes the working directory, so pin the default database file to the
// app folder. Set DATABASE_PATH to keep it somewhere that survives redeploys.
process.env.DATABASE_PATH = process.env.DATABASE_PATH || path.join(__dirname, ".data", "araqah.sqlite");

require("./.next/standalone/server.js");
