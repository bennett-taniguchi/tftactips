const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...fontFamily.sans],
      },
    },
  },
};