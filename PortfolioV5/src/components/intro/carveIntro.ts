import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { glyphOutline } from "./glyphOutline";
import type { IntroParts } from "./types";

gsap.registerPlugin(DrawSVGPlugin);

// SRDC is cut into the alabaster plane: each outline is drawn like a chisel
// line, the letters open onto the stone, then R, D and C close again and the
// S moves to the centre. Ends with the S <text> centred and visible.
export function carveIntro({ letters, overlay }: IntroParts) {
  const all = [letters.S, letters.R, letters.D, letters.C];
  gsap.set(all, { opacity: 0 });

  // The SVG is cropped to cover the screen, so a tall phone only shows a
  // narrow band of the 100-unit width. Fit the four letters into that band.
  const size = parseFloat(letters.S.getAttribute("font-size") ?? "24");
  const { width, height } = letters.S.ownerSVGElement!.getBoundingClientRect();
  const visible = 100 * Math.min(1, width / height);
  const k = Math.min(1, (visible * 0.88) / 80);
  all.forEach((t, i) =>
    gsap.set(t, { attr: { "font-size": size * k, x: 50 + (i - 1.5) * 20 * k } }),
  );

  const outlines = all.map((t) =>
    glyphOutline(t, overlay, {
      fill: "none",
      stroke: "var(--ink)",
      "stroke-width": 1.4,
      "stroke-linejoin": "round",
      "vector-effect": "non-scaling-stroke",
    }),
  );
  gsap.set(outlines, { drawSVG: "0% 0%" });

  const tl = gsap.timeline();
  tl.to({}, { duration: 0.2 });
  tl.to(outlines, { drawSVG: "0% 100%", duration: 0.85, ease: "power2.inOut", stagger: 0.12 });
  // The cut letters open onto the stone; the chisel line softens to an edge.
  tl.to(all, { opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }, "-=0.35");
  tl.to(outlines, { opacity: 0.35, duration: 0.5, ease: "power2.out", stagger: 0.1 }, "<");
  tl.to(outlines, { opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.15");
  tl.to([letters.R, letters.D, letters.C], { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "<");
  tl.to(letters.S, { attr: { x: 50, "font-size": size }, duration: 0.8, ease: "power2.inOut" }, "<0.1");
  // R, D and C go back to their resting layout, hidden.
  tl.set([letters.R, letters.D, letters.C], {
    attr: { "font-size": size, x: (i: number) => 40 + i * 20 },
  });
  return tl;
}
