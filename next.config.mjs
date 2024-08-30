/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.annihil.us', 'wallpapers.com'],
  },
  env: {
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    NEXT_PUBLIC_PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY,
  },
};

export default nextConfig;