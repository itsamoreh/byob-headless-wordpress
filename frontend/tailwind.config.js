module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xl: '60rem',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
