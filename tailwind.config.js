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
      colors: {
        primary: '#4f46E5',     // Indigo (used for buttons, highlights)
        secondary: '#6B7280',   // Grat-ish (text, borders)
        danger: "#EF4444",      // Red (error, down %)
        success: '#22C55E',     // Green (up %)
        dark: '#0f172A',        // very dark blue-gray(background)
        light: '#FBFAFC'        // Very light gray (text/bg on dark)
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

