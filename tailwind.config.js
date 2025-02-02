/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        lightGrey: "#FAFAFA",
        midGrey: "#616161",
        darkGrey: "#676464",
        blueGrey: "#E9EFF5",
        subtleGray: "#E7E7E7",
        greyOpacity: "#89898933",
        phillipineGrey: "#8C8C8C",
        orange: "#FF9255",
        lightGreen: "#E5F4F2",
        lightBlue: "#00A7C4",
        vibrantBlue: "rgba(0, 167, 196, 1)",
        tealBlue: "#007C9E",
        softTeal: "#8BADA9",
        limeGreen: "#EEC920",
        lightSilver: "#F5F5F5",
      },
      boxShadow: {
        dropdown: "0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
        card: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        cardHover: "0px 10px 15px -3px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
