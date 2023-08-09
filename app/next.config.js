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
        source: "/dashboard",
        destination: "/dashboard/forms",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
