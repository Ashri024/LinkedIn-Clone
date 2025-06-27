import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images domains
  images: {
    // domains: [
    //   "encrypted-tbn0.gstatic.com",
    //   "www.vecteezy.com",
    //   "res.cloudinary.com",
    //   "cdn.pixabay.com",
    //   "images.unsplash.com",
    //   "dummyimage.com",
    //   "i.imgur.com",
    // "https://lh3.googleusercontent.com/a/ACg8ocIxsCBcNMQ-T6oODbRDk5pjTQ_ONWOEyos5N2HuW-1ZU7Kn-Q=s96-c"
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/dms/image/**", // Allows for dynamic paths under this domain
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**", // Allows for dynamic paths under this domain
      },
      {
        protocol: "https",
        hostname: "www.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
};

export default nextConfig;
