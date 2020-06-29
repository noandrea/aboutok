module.exports = {
  important: true,
  purge: [
    './src/**/*.html',
  ],
  theme: {
    fontFamily: {
      body: ['"Hind Siliguri"', 'sans-serif'],
      title: ['"Heebo"', 'sans-serif'],
      subtitle: ['serif'],
    },
    colors: {
      dark: '#242D2E',
      light: '#EAEAEA',
      highlight: '#CB7529',
    },
    extend: {
      spacing: {
        '136': '34rem',
      }
    }
  },
  variants: {},
  plugins: [],
}
