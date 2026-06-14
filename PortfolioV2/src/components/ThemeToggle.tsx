import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// Flips the document theme attribute; tokens in index.css do the rest.
export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      light ? "light" : "dark",
    );
  }, [light]);

  return (
    <button
      data-cursor
      onClick={() => setLight((v) => !v)}
      className="glass glass-edge group flex items-center gap-2.5 rounded-pill px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-ink"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {light ? (
          <Moon className="h-4 w-4" strokeWidth={1.75} />
        ) : (
          <Sun className="h-4 w-4" strokeWidth={1.75} />
        )}
      </span>
      {light ? "Dark mode" : "Light mode"}
    </button>
  );
}
