import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Allow opening the dev server from other devices / the LAN IP
  // (e.g. http://192.168.x.x:3000). Without this, Next blocks its dev
  // scripts for non-localhost hosts and the page never hydrates.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "*.local",
    // ngrok tunnels for testing on other devices
    "*.ngrok-free.app",
    "*.ngrok.app",
  ],
  partialPrefetching: true,
  turbopack: {
    // Keep resolution rooted in this package even if a parent folder has a lockfile.
    root: path.join(__dirname),
  },
};

export default nextConfig;
