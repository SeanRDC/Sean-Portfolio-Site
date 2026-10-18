import { GLYPHS } from "./glyphs";

const GLYPH_SIZE = 100; // font size the GLYPHS outlines were extracted at
// Archivo's vertical metrics (per 1000 units); the browser's character box
// spans ascent + descent, which locates the alphabetic baseline inside it.
const ASCENT = 878;
const DESCENT = 210;
const SVG_NS = "http://www.w3.org/2000/svg";

// Draws `text`'s letter as an outline path in `parent`, placed exactly where
// the browser drew the <text>, so the stroke traces the real letter.
export function glyphOutline(
  text: SVGTextElement,
  parent: Element,
  attrs: Record<string, string | number>,
): SVGPathElement {
  const ch = (text.textContent ?? "") as keyof typeof GLYPHS;
  const box = text.getExtentOfChar(0);
  // The mask text is set with dominant-baseline="central", so its y is not
  // the baseline the outlines are measured from; derive it from the box.
  const baseline = box.y + (box.height * ASCENT) / (ASCENT + DESCENT);
  const scale = parseFloat(text.getAttribute("font-size") ?? "0") / GLYPH_SIZE;

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", GLYPHS[ch]);
  path.setAttribute("transform", `translate(${box.x} ${baseline}) scale(${scale})`);
  for (const [k, v] of Object.entries(attrs)) path.setAttribute(k, String(v));
  parent.appendChild(path);
  return path;
}
