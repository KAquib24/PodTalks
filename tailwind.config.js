/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1ED760',
          black: '#191414',
          gray: '#535353',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
  ],
};
