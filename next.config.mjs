/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingExcludes: {
    "/*": ["./data/**/*", "./.pnpm-store/**/*", "./.test-build/**/*", "./tests/**/*"],
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
