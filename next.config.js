/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imagedelivery.net", "videodelivery.net", "avatars.githubusercontent.com"]
  }
}

module.exports = nextConfig