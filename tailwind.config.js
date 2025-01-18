/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily :{
        "racing": ["Racing Sans One", "sans-serif"],
        "Montserrat": ["Montserrat", "sans-serif"],
        "Bebas": ["Bebas Neue", "sans-serif"],
        "karla": ["Karla", "serif"],
        "poppins": ["Poppins", "serif"]
      },
      backgroundImage: {
        bannerImg: "url('https://ecommerce.musfolio.com/wp-content/uploads/2018/02/pexels-spencer-selover-428338-scaled.jpg')",
        backOverlay: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)"
      },
    },
  },
  plugins: [],
}

