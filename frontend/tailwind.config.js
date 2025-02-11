module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // 根据你的文件类型调整
    './public/index.html', // 如果 HTML 文件在 public 中
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
