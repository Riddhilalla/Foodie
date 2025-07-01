/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FFFDF1',
        'secondary1': '#FFE353',
        'btnColor': '#FD5E27',
        'secondary2': '#094C3B',
        'black': '#000000',
        'white': '#FFFFFF',
      },
      fontFamily: {
        headings: ['"Chelsea Market"', 'system-ui'],
        body: ['"Roboto Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

