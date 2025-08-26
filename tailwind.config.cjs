/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        secondary: '#43A047',
        warning: '#FB8C00',
        danger: '#E53935',
        background: '#F5F7FA',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],  // 👈 this adds `font-roboto`
      },
    },
  },
  plugins: [],
};
