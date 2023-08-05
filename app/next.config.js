/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
      },
      {
        source: "/github",
        destination: "https://github.com/logform/logform",
      },
    ];
  },
};

module.exports = nextConfig;
