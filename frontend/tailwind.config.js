module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
