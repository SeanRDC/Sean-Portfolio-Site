/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#060608",
        "panel-deep": "#0c0c14",
        violet: "#7b5cff",
        cyan: "#4fd2ff",
        rose: "#ff6fa5",
        ink: {
          DEFAULT: "#f4f5fa",
          muted: "#9ca0b4",
          faint: "#5e627a",
        },
      },
      fontFamily: {
        display: ["Inter Tight", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};
