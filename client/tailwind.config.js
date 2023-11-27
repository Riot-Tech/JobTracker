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
          modalLight: '#ECD7D7',
          modalDark: '#5C5470',
          spontLight: '#F5F7F8',
          red: '#ff0000',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
