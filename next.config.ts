import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // Keep resolution rooted in this package even if a parent folder has a lockfile.
    root: path.join(__dirname),
  },
};

export default nextConfig;
