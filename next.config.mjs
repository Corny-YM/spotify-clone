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
};

export default nextConfig;
