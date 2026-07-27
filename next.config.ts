import type { NextConfig } from "next";
import path from "path";

// Pin tracing root to this app so a parent lockfile (e.g. under the user home)
// does not make Next treat the wrong directory as the project root.
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "hampiokftlozrrsersva.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
