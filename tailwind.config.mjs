/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Helvetica", "sans-serif"],
      },
      screens: {
        md: "701px",
      },
      colors: {
        "tag-blog": "#4ad440",
        "tag-js": "#f7df1e",
        "light-aaa": "#aaaaaa",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
