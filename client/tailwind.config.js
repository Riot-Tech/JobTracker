/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          appCardsDark: "#61677A",
          appCardsLight:'#D8D9DA',
          backDark: "#272829",
          backLight: "#FFFF",
          modalSpontaneousLight: '#ECD7D7'
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
