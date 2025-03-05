/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.themealdb.com",
      },
      {
        hostname: "locavor.fr",
      },
      {
        hostname: "bigoven-res.cloudinary.com",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
