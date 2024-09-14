/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
        merri: ["Merriweather", "sans-serif"],
      },
      colors: {
        mirage: "#151B32",
        lavenderMist: "#E6EAF8",
        periwinkleBlue: "#849FFF",
      },
      boxShadow: {
        xl: "0px 8px 23px 0px rgba(218, 224, 249, 0.70)",
      },
      backgroundImage: {
        searchIcon: "url('/src/assets/images/search.svg')",
      },
    },
  },
  plugins: [],
};
