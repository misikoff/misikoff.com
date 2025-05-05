const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       sans: ['var(--font-inter)', ...fontFamily.sans],
  //     },
  //     spacing: {
  //       '1/5': '20%',
  //       '2/5': '40%',
  //       '3/5': '60%',
  //       '4/5': '80%',
  //     },
  //   },
  // },
  // plugins: [
  //   require('@tailwindcss/container-queries'),
  //   require('@tailwindcss/typography'),
  // ],
}
