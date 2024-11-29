/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
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
      }
    },
  },
  plugins: [],
}

