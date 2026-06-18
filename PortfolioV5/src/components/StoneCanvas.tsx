import { useEffect, useRef } from "react";
import { getGL, makeProgram, bindFullQuad } from "../lib/webgl";

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uSeed;
uniform float uTint;     // 0 cool grey .. 1 warm sand
uniform float uFlow;     // liquid distortion speed
uniform float uMouseAmt;
uniform float uContrast;

float hash(vec2 p){ p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.55;
  for (int i = 0; i < 5; i++){ s += a * vnoise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return s;
}
void main(){
  vec2 uv = vUv;
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (uv - 0.5) * asp * 2.4 + uSeed * 17.0;
  float t = uTime * 0.04 * uFlow;
  vec2 flow = vec2(fbm(p * 0.55 + vec2(t, 0.0)), fbm(p * 0.55 + vec2(0.0, -t) + 5.2));
  vec2 m = (uv - uMouse) * asp;
  float ripple = exp(-dot(m, m) * 6.0);
  p += (flow - 0.5) * 0.6 + normalize(m + 1e-4) * ripple * 0.14 * uMouseAmt;
  float base = fbm(p * 1.5);
  float fine = fbm(p * 5.5);
  float veins = abs(fbm(p * 2.6 + base * 1.4) - 0.5);
  float vein = smoothstep(0.06, 0.0, veins);
  float v = base * 0.7 + fine * 0.2;
  vec3 light = vec3(0.96, 0.945, 0.91);
  vec3 dark  = vec3(0.74, 0.715, 0.66);
  vec3 col = mix(dark, light, pow(v, mix(1.0, 1.6, uContrast)));
  col = mix(col, dark * 0.86, vein * 0.55);
  col -= ripple * 0.05 * uMouseAmt;
  vec3 cool = vec3(0.94, 0.96, 1.0), warm = vec3(1.03, 0.99, 0.93);
  col *= mix(cool, warm, uTint);
  float vig = smoothstep(1.5, 0.45, length((uv - 0.5) * asp));
  col *= mix(0.82, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  className?: string;
  seed?: number;
  tint?: number;
  flow?: number;
  contrast?: number;
  interactive?: boolean;
};

export default function StoneCanvas({
  className = "",
  seed = 0.3,
  tint = 0.5,
  flow = 1.0,
  contrast = 0.5,
  interactive = false,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, amt: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = getGL(canvas, { alpha: false });
    if (!gl) { canvas.style.background = "#e7e1d6"; return; }
    const prog = makeProgram(gl, FRAG);
    if (!prog) { canvas.style.background = "#e7e1d6"; return; }
    gl.useProgram(prog);
    bindFullQuad(gl, prog);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = U("uTime"), uRes = U("uRes"), uMouse = U("uMouse");
    const uSeed = U("uSeed"), uTint = U("uTint"), uFlow = U("uFlow");
    const uMouseAmt = U("uMouseAmt"), uContrast = U("uContrast");
    gl.uniform1f(uSeed, seed);
    gl.uniform1f(uTint, tint);
    gl.uniform1f(uFlow, flow);
    gl.uniform1f(uContrast, contrast);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const loop = () => {
      if (!visible) { raf = 0; return; }
      const t = (performance.now() - t0) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.uniform1f(uMouseAmt, interactive ? mouse.current.amt : 0.0);
      mouse.current.amt *= 0.95;
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (es) => { visible = es[0].isIntersecting; if (visible && !raf) loop(); },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouse.current.amt = 1;
    };
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });

    loop();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (interactive) window.removeEventListener("pointermove", onMove);
    };
  }, [seed, tint, flow, contrast, interactive]);

  return <canvas ref={ref} className={className} />;
}
