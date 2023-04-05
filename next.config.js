/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['sportsbot.rollbot.com', 'i.seadn.io'],
},
}

module.exports = nextConfig
