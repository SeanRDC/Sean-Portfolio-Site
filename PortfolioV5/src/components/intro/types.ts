export type IntroParts = {
  // The SRDC <text> elements inside the mask (black = cut through the plane).
  letters: Record<"S" | "R" | "D" | "C", SVGTextElement>;
  // Group drawn on top of the plane, masked like it.
  overlay: SVGGElement;
};
