/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mdark: '#1C1C1C',
        ldark: '#242424',
        accent: '#05ACEE',
        error: '#C13515',
      },
    },
  },
  plugins: [],
};
