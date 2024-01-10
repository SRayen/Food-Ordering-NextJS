const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "green",
        secondary: "#f13a01",
        warning: "#F54180",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        lemon: ["var(--font-lemon)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
