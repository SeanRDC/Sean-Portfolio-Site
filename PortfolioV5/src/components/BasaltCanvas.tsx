import { useEffect, useRef } from "react";
import { getGL, makeProgram, bindFullQuad } from "../lib/webgl";

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uSeed;
uniform float uTone;     // 0 warm .. 1 cold
uniform float uFlow;     // liquid distortion speed
uniform float uMouseAmt; // pointer ripple strength
uniform float uBright;   // overall exposure

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
  vec2 p = (uv - 0.5) * asp * 2.6 + uSeed * 17.0;
  float t = uTime * 0.045 * uFlow;
  vec2 flow = vec2(fbm(p * 0.6 + vec2(t, 0.0)), fbm(p * 0.6 + vec2(0.0, -t) + 5.2));
  vec2 m = (uv - uMouse) * asp;
  float ripple = exp(-dot(m, m) * 7.0);
  p += (flow - 0.5) * 0.7 + normalize(m + 1e-4) * ripple * 0.16 * uMouseAmt;
  float base = fbm(p * 1.6);
  float fine = fbm(p * 6.5);
  float veins = abs(fbm(p * 3.0 + base * 1.5) - 0.5);
  float crack = smoothstep(0.05, 0.0, veins);
  float v = base * 0.72 + fine * 0.18;
  vec3 col = mix(vec3(0.014, 0.014, 0.017), vec3(0.165, 0.158, 0.15), v);
  col = mix(col, vec3(0.02), crack * 0.7);
  col += ripple * 0.045 * uMouseAmt;
  vec3 warm = vec3(1.06, 0.99, 0.92), cold = vec3(0.9, 0.95, 1.08);
  col *= mix(warm, cold, uTone);
  float vig = smoothstep(1.4, 0.4, length((uv - 0.5) * asp));
  col *= mix(0.26, 1.0, vig);
  col *= uBright;
  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  className?: string;
  seed?: number;
  tone?: number;
  flow?: number;
  bright?: number;
  interactive?: boolean;
};

export default function BasaltCanvas({
  className = "",
  seed = 0.3,
  tone = 0.05,
  flow = 1.0,
  bright = 1.0,
  interactive = false,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, amt: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = getGL(canvas, { alpha: false });
    if (!gl) {
      canvas.style.background = "#0b0b0c";
      return;
    }
    const prog = makeProgram(gl, FRAG);
    if (!prog) {
      canvas.style.background = "#0b0b0c";
      return;
    }
    gl.useProgram(prog);
    bindFullQuad(gl, prog);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = U("uTime"), uRes = U("uRes"), uMouse = U("uMouse");
    const uSeed = U("uSeed"), uTone = U("uTone"), uFlow = U("uFlow");
    const uMouseAmt = U("uMouseAmt"), uBright = U("uBright");
    gl.uniform1f(uSeed, seed);
    gl.uniform1f(uTone, tone);
    gl.uniform1f(uFlow, flow);
    gl.uniform1f(uBright, bright);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
    const resize = () => {
      const w = canvas.clientWidth || canvas.offsetWidth || window.innerWidth;
      const h = canvas.clientHeight || canvas.offsetHeight || window.innerHeight;
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
      (es) => {
        visible = es[0].isIntersecting;
        if (visible && !raf) loop();
      },
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
  }, [seed, tone, flow, bright, interactive]);

  return <canvas ref={ref} className={className} />;
}
