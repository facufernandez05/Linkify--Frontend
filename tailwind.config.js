const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      width: {
        468: '468px'
      },
      height: {
        468: '468px'
      },
      maxWidth: {
        468: '468px'
      },
      maxHeight: {
        576: '576px',
        448: '448px'
      },
      colors: {
        palette: {
          1: '#15202B',
          2: '#2C3640',
          3: '#273340',
          4: '#1E2732',
          5: '#F91880',
          6: '#E01673',
          blue: '#3F88C5',
          red: '#F8615A',
          white: '#E1E1E1',
          background: '#F9F9F9',
          gray: '#212529'
        }
      },
      screens: {
        xs: { min: '380px' },
        sm: { min: '500px' },
        md: { min: '720px' },
        lg: { min: '900px' },
        xl: { min: '1350px' },
        '2xl': { min: '1700px' },
        'max-xs': { max: '379px' },
        'max-sm': { max: '499px' },
        'max-md': { max: '719px' },
        'max-lg': { max: '899px' },
        'max-xl': { max: '1349px' },
        'max-2xl': { max: '1699px' }
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui({
    addCommonColors: true
  })
  ]
}
