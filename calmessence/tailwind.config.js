module.exports = {
  content:['./index.html', './src/**/*.{vue,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Poppins"', "sans-serif"],
        // Add more custom font families as needed
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    darkTheme: "light",
  },
};
