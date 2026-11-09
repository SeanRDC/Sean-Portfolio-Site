import { GLYPHS } from "./glyphs";

const GLYPH_SIZE = 100; // font size the GLYPHS outlines were extracted at
const SVG_NS = "http://www.w3.org/2000/svg";
// Archivo's advance widths at GLYPH_SIZE, for centring on the <text>'s x.
const ADVANCE: Record<string, number> = { S: 88.2, R: 94.3, D: 93.3, C: 93.9 };

// Baseline that keeps a letter of this size centred on the plane's y = 49.
export const letterBaseline = (size: number) => 49 + size * 0.3338;

// Draws `text`'s letter as an outline path in `parent`, so the stroke traces the
// real letter. Placed from the <text>'s attributes and the font's metrics rather
// than getExtentOfChar: Safari answers that from the fallback font's layout
// while the webfont is still being applied, which pulled the outlines off.
export function glyphOutline(
  text: SVGTextElement,
  parent: Element,
  attrs: Record<string, string | number>,
): SVGPathElement {
  const ch = (text.textContent ?? "") as keyof typeof GLYPHS;
  const baseline = parseFloat(text.getAttribute("y") ?? "0");
  const scale = parseFloat(text.getAttribute("font-size") ?? "0") / GLYPH_SIZE;
  const left = parseFloat(text.getAttribute("x") ?? "0") - (ADVANCE[ch] * scale) / 2;

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", GLYPHS[ch]);
  path.setAttribute("transform", `translate(${left} ${baseline}) scale(${scale})`);
  for (const [k, v] of Object.entries(attrs)) path.setAttribute(k, String(v));
  parent.appendChild(path);
  return path;
}
