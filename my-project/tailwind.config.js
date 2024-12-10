/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4EB7AC",
        secondary: "#FF8682",
        blackishGreen: "#112211",
        customBorder: "#E8ECF4",
      },
    },
  },
  plugins: [],
};
