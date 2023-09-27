/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tel.img.pmdstatic.net', 'wp.programmetvcesoir.fr']
  }
}

module.exports = nextConfig
