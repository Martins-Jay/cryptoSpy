/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    screens: {
      xs: "306px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        poppins: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

