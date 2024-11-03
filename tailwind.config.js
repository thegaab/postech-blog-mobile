/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff0f2",
          100: "#ffe3e8",
          200: "#ffcad6",
          300: "#ff9fb4",
          400: "#ff6a8e",
          500: "#fe356b",
          600: "#ed195c",
          700: "#c70949",
          800: "#a70a45",
          900: "#8e0d41",
        },
        secondary: {
          50: "#fffceb",
          100: "#fdf5c8",
          200: "#fce98b",
          300: "#fad84f",
          400: "#f9c526",
          500: "#f3a712",
          600: "#d77e08",
          700: "#b2590b",
          800: "#91440f",
          900: "#773910",
        },
        tertiary: {
          50: "#eefbfd",
          100: "#d3f4fa",
          200: "#adeaf4",
          300: "#75d9eb",
          400: "#35bedb",
          500: "#19a1c1",
          600: "#1881a2",
          700: "#19647e",
          800: "#1e566c",
          900: "#1d485c",
        },
      }
    },
  },
  plugins: [],
}

