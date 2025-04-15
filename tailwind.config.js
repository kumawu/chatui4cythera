/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // 移除了 tailwind-scrollbar 插件
  ],
  // 移除了 scrollbar 相关的 variants
}