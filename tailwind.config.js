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
        primary: "#b64978",
        secondary: "#f0d1d1",
        accent: "#e7b0b0",
        active: "#9e3c65",
        text: {
          base: "#f8faff",
          subtle: "#d6e4ff",
          hover: "#e3f0ff",
        },
        bg: {
          sub: "#d78e8e",
          secondary: "#f3b8a6",
          peach: "#f1e0d6",
        },
        purple: {
          100: "#f9e4f0",
          400: "#e4a3d3",
          500: "#d187c2",
          600: "#b96aae",
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
