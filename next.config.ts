import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    domains: [
      "static.vecteezy.com",
      "storage.googleapis.com",
      "indigo-tiger-237802.hostingersite.com",
    ], // Add the external image domain here
  },
};

export default withNextIntl(nextConfig);
