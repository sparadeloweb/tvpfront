/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tel.img.pmdstatic.net']
  }
}

module.exports = nextConfig
