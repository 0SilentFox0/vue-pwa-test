/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'qr-codes': "url('/qrcode.jpg')",
      }
    }
  },
  plugins: [],
};
