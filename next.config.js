const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
});

/** @type {import('next').NextConfig} */
/* const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}; */

module.exports = withPWA({
  reactStrictMode: false,
  swcMinify: true,
});
