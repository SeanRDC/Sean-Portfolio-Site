import React, { useRef } from "react";
import { useScrollStore } from "../utils/store";
import { designConfig } from "../data/config";

export default function ViewToggle() {
  const { viewMode, setViewMode } = useScrollStore();
  const isList = viewMode === "list";

  return (
    <button
      onClick={() => setViewMode(isList ? "grid" : "list")}
      className="fixed left-1/2 bottom-8 z-[70] h-[54px] w-[102px] -translate-x-1/2 cursor-pointer bg-black/90 active:scale-95 transition-transform border border-neutral-700 rounded-sm overflow-hidden flex items-center justify-between px-3 text-white font-mono text-[10px] uppercase tracking-wider"
    >
      {/* Structural pixel layout generated from config mapping */}
      <div className="relative w-4 h-4 grid grid-cols-3 gap-0.5">
        {designConfig.buttonPixelMatrix.slice(0, 9).map((pixel, idx) => (
          <span
            key={idx}
            className="w-1 h-1 bg-white transition-all duration-300"
            style={{
              opacity: isList ? pixel.opacity : 0.3,
              transform: isList ? "scale(1)" : "scale(0.6)"
            }}
          />
        ))}
      </div>
      <span>{viewMode}</span>
    </button>
  );
}