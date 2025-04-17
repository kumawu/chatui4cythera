import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://10.222.96.107:3000'], // 只保留纯字符串
};

export default nextConfig;