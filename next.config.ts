import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Every route here is prerendered and there are no API routes, so the whole
   * site exports to static files. That makes it a drop-in for Cloudflare Pages
   * (or any static host) with no server runtime or adapter.
   */
  output: "export",
  images: {
    // The export target has no image optimisation server.
    unoptimized: true,
  },
  // Emit /about/index.html rather than /about.html so static hosts resolve
  // clean URLs without per-host rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
