/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/logform/logform",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
