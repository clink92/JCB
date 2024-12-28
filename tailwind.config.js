/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // ...other paths if necessary...
  ],
  theme: {
    extend: {
      colors: {
        booked: '#F59E0B', // Tailwind yellow-500
      },
      fontFamily: { // Added font family
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

