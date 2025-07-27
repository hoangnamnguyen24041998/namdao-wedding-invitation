import defaultTheme from "tailwindcss/defaultTheme";

export default {
  theme: {
    extend: {
      fontFamily: {
        great: ['"Great Vibes"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your project structure
  ],
};
