/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1c1c1c",
        lightdark: "#242424",
        accentBlue: "#05ACEE",
        error: "#C13515",
      },
    },
  },
  plugins: [],
};
