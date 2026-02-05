/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3498db",
          dark: "#2980b9",
        },
        heading: "#2c3e50",
        muted: "#7f8c8d",
        border: "#ecf0f1",
      },
    },
  },
  plugins: [],
};
