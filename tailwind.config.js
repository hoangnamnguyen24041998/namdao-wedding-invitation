import defaultTheme from "tailwindcss/defaultTheme";

export default {
  theme: {
    extend: {
      fontFamily: {
        great: ['"Great Vibes"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        pulse: "pulse 2s infinite",
      },
    },
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your project structure
  ],
};
