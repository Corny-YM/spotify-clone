/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["tugpcmnivrboqpesoiun.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tugpcmnivrboqpesoiun.supabase.co",
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
