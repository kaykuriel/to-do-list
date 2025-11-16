/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#0E0E0F",
        card: "#181818",
        textMain: "#FFFFFF",
        textSub: "#A1A1A5",
        accent: "#FF4D4F",
        accentLight: "#FF7375",
      },
    },
  },
  plugins: [],
};
