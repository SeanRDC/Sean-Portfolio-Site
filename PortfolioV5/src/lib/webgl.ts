
export const QUAD_VS = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export function makeProgram(
  gl: WebGLRenderingContext,
  fragSrc: string,
  vertSrc: string = QUAD_VS
): WebGLProgram | null {
  const compile = (type: number, src: string): WebGLShader | null => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const v = compile(gl.VERTEX_SHADER, vertSrc);
  const f = compile(gl.FRAGMENT_SHADER, fragSrc);
  if (!v || !f) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, v);
  gl.attachShader(prog, f);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

export function bindFullQuad(gl: WebGLRenderingContext, prog: WebGLProgram) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  return buf;
}

export function getGL(canvas: HTMLCanvasElement, opts: WebGLContextAttributes = {}): WebGLRenderingContext | null {
  const attrs: WebGLContextAttributes = {
    antialias: false,
    alpha: true,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
    ...opts,
  };
  return (canvas.getContext("webgl", attrs) ||
    canvas.getContext("experimental-webgl", attrs)) as WebGLRenderingContext | null;
}
