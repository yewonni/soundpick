/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#7D3C98",
        secondary: "#8e8d8d",
        purple: {
          100: "#cfcfcf",
          200: "#7a7a7a",
          400: "#b1b6f8",
          500: "#8887f2",
          600: "#5740c2",
        },
        bg: {
          sub: "#F6FBF0",
        },
      },
    },
  },
  plugins: [],
};
