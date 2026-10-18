import { getGL, makeProgram } from "../lib/webgl";

// Draws the certificate ring in WebGL. Every certificate is a fine grid laid
// onto one sphere centred on the ring, so the cards read as panels of a single
// globe they orbit, and their backs show as they pass behind it. Positions use
// the same units and perspective as the CSS scene around it (px, y down, +z
// toward the viewer).

export type TileState = {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotY: number; // radians; the card's face points out from the ring centre
  alpha: number;
};

const COLS = 32;
const ROWS = 24;
const TEX_W = 1024; // power-of-two so the GPU can build mipmaps (WebGL 1)
const TEX_H = 512;

const VS = `
attribute vec2 aUv;
uniform vec2 uSize;
uniform vec2 uView;
uniform float uPersp, uSphere;
uniform vec3 uPos;
uniform float uScale, uRotY;
varying vec2 vUv;
void main() {
  vUv = aUv;
  vec2 p = (aUv - 0.5) * uSize * uScale;
  // Wrap the card onto the globe (radius uSphere, centre behind the card),
  // keeping arc lengths so the card doesn't shrink as it bends.
  float th = p.x / uSphere, ph = p.y / uSphere;
  vec3 v = vec3(uSphere * sin(th) * cos(ph), uSphere * sin(ph), uSphere * (cos(th) * cos(ph) - 1.0));
  float c = cos(uRotY), s = sin(uRotY);
  v = vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c); // CSS rotateY
  vec3 w = v + uPos;
  // CSS perspective: screen = xy * P / (P - z); the GPU does the divide.
  gl_Position = vec4(w.x * uPersp / (uView.x * 0.5), -w.y * uPersp / (uView.y * 0.5), 0.0, uPersp - w.z);
}
`;

const FS = `
precision mediump float;
uniform sampler2D uTex;
uniform float uAlpha;
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(texture2D(uTex, vUv).rgb * uAlpha, uAlpha);
}
`;

export function createCertRing(
  canvas: HTMLCanvasElement,
  images: string[],
  size: { w: number; h: number },
  perspective: number,
  sphereRadius: number,
  onReady: () => void,
) {
  const gl = getGL(canvas, { antialias: true, premultipliedAlpha: true });
  const prog = gl && makeProgram(gl, FS, VS);
  if (!gl || !prog) return null;
  gl.useProgram(prog);

  // Shared grid mesh: (COLS+1) x (ROWS+1) vertices, uv only.
  const uv: number[] = [];
  for (let r = 0; r <= ROWS; r++) for (let c = 0; c <= COLS; c++) uv.push(c / COLS, r / ROWS);
  const idx: number[] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const a = r * (COLS + 1) + c, b = a + 1, d = a + COLS + 1, e = d + 1;
      idx.push(a, d, b, b, d, e);
    }
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
  const aUv = gl.getAttribLocation(prog, "aUv");
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = { view: U("uView"), pos: U("uPos"), scale: U("uScale"), rotY: U("uRotY"), alpha: U("uAlpha") };
  gl.uniform2f(U("uSize"), size.w, size.h);
  gl.uniform1f(U("uPersp"), perspective);
  gl.uniform1f(U("uSphere"), sphereRadius);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  // Textures: decoded off the main thread, scaled into a mipmapped POT canvas,
  // one GPU upload per frame so uploading the set never stalls a frame.
  const textures: (WebGLTexture | null)[] = images.map(() => null);
  let pending = images.length;
  let disposed = false;
  const scratch = document.createElement("canvas");
  scratch.width = TEX_W;
  scratch.height = TEX_H;
  const sctx = scratch.getContext("2d")!;
  let queue: Promise<unknown> = Promise.resolve();
  const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r(undefined)));
  images.forEach((src, i) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    const decoded = img.decode().then(() => true, () => false);
    queue = queue.then(() => decoded).then(nextFrame);
    Promise.all([decoded, queue])
      .then(([ok]) => {
        if (disposed || !ok) return;
        sctx.clearRect(0, 0, TEX_W, TEX_H);
        sctx.drawImage(img, 0, 0, TEX_W, TEX_H);
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, scratch);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        textures[i] = tex;
      })
      .catch(() => {})
      .finally(() => {
        if (--pending === 0 && !disposed) onReady();
      });
  });

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.view, w || 1, h || 1);
  };
  resize();

  // Draws the given tiles back to front, replacing the canvas content.
  const draw = (tiles: { i: number; s: TileState }[]) => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (const { i, s } of [...tiles].sort((a, b) => a.s.z - b.s.z)) {
      const tex = textures[i];
      if (!tex || s.alpha <= 0) continue;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform3f(u.pos, s.x, s.y, s.z);
      gl.uniform1f(u.scale, s.scale);
      gl.uniform1f(u.rotY, s.rotY);
      gl.uniform1f(u.alpha, s.alpha);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    }
  };

  const dispose = () => {
    disposed = true;
    textures.forEach((t) => t && gl.deleteTexture(t));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };

  return { canvas, draw, resize, dispose };
}
