import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export function PreloaderShell({
  percentRef,
}: {
  percentRef: React.MutableRefObject<HTMLElement | null>;
}) {
  return (
    <div className="fixed inset-0 z-[10000] flex h-lvh w-full items-center justify-center bg-white">
      <div className="text-sm font-mono tracking-widest">
        LOADING <span ref={percentRef}>0%</span>
      </div>
    </div>
  );
}
