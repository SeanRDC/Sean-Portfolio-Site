import { useEffect, useRef } from "react";
import { getGL, makeProgram, bindFullQuad } from "../lib/webgl";

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
float hash(vec2 p){ p = fract(p * vec2(443.897, 441.423)); p += dot(p, p + 19.19); return fract((p.x + p.y) * p.x); }
void main(){
  vec2 g = floor(vUv * uRes / 1.6);
  float n = hash(g + floor(uTime * 30.0) * 1.71);
  float speck = pow(n, 3.2);
  gl_FragColor = vec4(vec3(0.0), speck * 0.05);
}
`;

export default function FilmGrain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = getGL(canvas, { alpha: true, premultipliedAlpha: false });
    if (!gl) return;
    const prog = makeProgram(gl, FRAG);
    if (!prog) return;
    gl.useProgram(prog);
    bindFullQuad(gl, prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const t0 = performance.now();
    const loop = () => {
      const t = (performance.now() - t0) / 1000;
      gl.uniform1f(uTime, t);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[60] h-full w-full" />;
}
