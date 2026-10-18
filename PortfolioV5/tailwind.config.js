/** @type {import('tailwindcss').Config} */
export default {
  // hover: styles only on devices that can hover, so a tap never leaves one stuck.
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        stone: "var(--stone)",
        "stone-deep": "var(--stone-deep)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-dim": "var(--ink-dim)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "var(--accent)",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        body: ["Inter", "system-ui", "sans-serif"],
        display: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
