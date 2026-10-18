// The ink circle that covers the screen between the home page and the
// certificates archive. It is a scaled circle animated with WAAPI, so the
// compositor runs it even while the next page is mounting on the main thread,
// and the same element carries across the route change (no swap, no flash).

type Wipe = { root: HTMLDivElement; circle: HTMLDivElement; covering: Promise<void> };

let active: Wipe | null = null;

// GSAP's power3.inOut.
const EASE = "cubic-bezier(0.645, 0.045, 0.355, 1)";
const DURATION = 1200;

function create(x: number, y: number, covered: boolean): Wipe {
  const w = window.innerWidth, h = window.innerHeight;
  // Diameter that reaches the farthest corner from (x, y).
  const d = 2 * Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 4;

  const root = document.createElement("div");
  root.style.cssText = "position:fixed;inset:0;z-index:9999999;pointer-events:none;overflow:hidden;contain:strict";
  const circle = document.createElement("div");
  circle.style.cssText = `position:absolute;left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px;border-radius:50%;background:var(--ink);will-change:transform;transform:scale(${covered ? 1 : 0})`;
  root.appendChild(circle);
  document.body.appendChild(root);
  return { root, circle, covering: Promise.resolve() };
}

const play = (el: HTMLElement, from: number, to: number) =>
  el.animate([{ transform: `scale(${from})` }, { transform: `scale(${to})` }], {
    duration: DURATION,
    easing: EASE,
    fill: "forwards",
  }).finished.then(() => undefined);

// Grows the circle from (x, y) until it covers the screen. Resolves when covered.
export function wipeCover(x: number, y: number): Promise<void> {
  if (active) return active.covering;
  const wipe = create(x, y, false);
  wipe.covering = play(wipe.circle, 0, 1);
  active = wipe;
  return wipe.covering;
}

// Makes sure the screen is covered before the first paint (a direct load of a
// page that reveals itself). Call from a layout effect.
export function holdCover(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  if (!active) active = create(x, y, true);
}

// Shrinks the circle back to where it grew from, then removes it.
export async function wipeReveal(): Promise<void> {
  const wipe = active;
  if (!wipe) return;
  await wipe.covering;
  await play(wipe.circle, 1, 0);
  wipe.root.remove();
  if (active === wipe) active = null;
}

// Resolves once the page has finished its mount work: after `ready` (if any),
// a couple of frames and the main thread going idle, or after `cap` ms.
export function whenSettled(ready?: Promise<unknown>, cap = 1200): Promise<void> {
  const frame = () => new Promise((r) => requestAnimationFrame(() => r(undefined)));
  const idle = () =>
    new Promise((r) =>
      "requestIdleCallback" in window ? window.requestIdleCallback(r, { timeout: 500 }) : setTimeout(r, 50),
    );
  const settled = Promise.resolve(ready)
    .then(frame)
    .then(frame)
    .then(idle)
    .then(() => undefined);
  return Promise.race([settled, new Promise<void>((r) => setTimeout(r, cap))]);
}
