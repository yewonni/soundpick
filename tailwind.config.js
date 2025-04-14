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
        primary: "#6f78f6",
        secondary: "#b1b6f8",
        accent: "#3c4ddd",
        text: {
          base: "#F3F5FF",
          subtle: "#BFCBFF",
          hover: "#d2e9ff",
        },
        bg: {
          sub: "#dbe4ff",
        },
        purple: {
          100: "#e5e6fb",
          400: "#b1b6f8",
          500: "#8887f2",
          600: "#5740c2",
        },
      },
    },
  },

  plugins: [
    function ({ addBase }) {
      addBase({
        "input:-webkit-autofill": {
          appearance: "none",
          "-webkit-box-shadow": "0 0 0 30px transparent inset !important",
          "-webkit-text-fill-color": "#F3F5FF !important",
          transition: "background-color 5000s ease-in-out 0s",
          "background-color": "transparent !important",
        },
        "input:-webkit-autofill:hover": {
          "background-color": "transparent !important",
        },
        "input:-webkit-autofill:focus": {
          "background-color": "transparent !important",
        },
        "input:-webkit-autofill:active": {
          "background-color": "transparent !important",
        },
      });
    },
  ],
};
