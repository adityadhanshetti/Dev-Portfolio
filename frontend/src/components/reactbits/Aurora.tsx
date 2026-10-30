import { useEffect, useRef, type CSSProperties } from 'react';

export interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  time?: number;
  height?: number;
  scale?: number;
  glow?: number;
  brightness?: number;
  layers?: number;
  direction?: 'top' | 'bottom';
  mouseInteraction?: boolean;
  intro?: boolean;
  opacity?: number;
  lightMode?: boolean;
  paused?: boolean;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
}

const MAX_STOPS = 5;
const MAX_LAYERS = 3;

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uStops[${MAX_STOPS}];
uniform int uStopCount;
uniform float uAmplitude;
uniform float uBlend;
uniform float uHeight;
uniform float uScale;
uniform float uGlow;
uniform float uBrightness;
uniform int uLayers;
uniform float uFlip;
uniform vec3 uPointer;
uniform float uReveal;
uniform float uOpacity;
uniform float uLightMode;
out vec4 outColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float smootherstep(float edge0, float edge1, float x) {
  float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 oklabToLinear(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

vec3 ramp(float t) {
  float x = clamp(t, 0.0, 1.0) * float(uStopCount - 1);
  int i = int(min(floor(x), float(uStopCount - 2)));
  float f = x - float(i);
  f = f * f * (3.0 - 2.0 * f);
  vec3 lch = mix(uStops[i], uStops[i + 1], f);
  lch.x = mix(lch.x, min(lch.x, 0.7), uLightMode);
  return toSrgb(oklabToLinear(vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z))));
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float y = 1.0 - frag.y / uResolution.y;
  y = mix(y, 1.0 - y, uFlip);
  float u = frag.x / uResolution.x;
  float X = (frag.x - uResolution.x * 0.5) / uResolution.y;
  float t = uTime;
  float reach = uPointer.z * exp(-pow((X - uPointer.x) / 0.38, 2.0));

  vec3 glow = vec3(0.0);
  float cover = 0.0;
  for (int k = 0; k < ${MAX_LAYERS}; k++) {
    if (k >= uLayers) break;
    float layer = float(k);
    float seed = layer * 13.7;
    float pace = t * (1.0 - layer * 0.18);
    float warp = snoise(vec2(X * 0.45 * uScale + pace * 0.02 + seed, pace * 0.05 + seed));
    float crest = sin(X * 2.2 * uScale + warp * 1.8 + pace * 0.3 + seed) * (0.10 + 0.05 * sin(pace * 0.2 + seed));
    crest += sin(X * 5.0 * uScale - pace * 0.4 + seed * 2.0) * 0.035;
    float shift = reach * (uPointer.y - y) * 0.45 * (1.0 - layer * 0.2);
    float base = (uHeight + layer * 0.08) * (1.0 + 0.2 * warp) + crest * uAmplitude + shift;
    float spread = (0.35 + layer * 0.12) * uBlend;
    float fill = smootherstep(base - spread * 0.5, base + spread * 0.5, y);
    float falloff = exp(-pow((y - base) / (spread * 0.7), 2.0));
    float shade = mix(fill, falloff, 0.45);
    shade *= (1.0 - layer * 0.18);
    float colorPick = clamp(u + warp * 0.15 + (layer - 1.0) * 0.25, 0.0, 1.0);
    vec3 band = ramp(colorPick);
    glow += band * shade;
    cover = max(cover, fill * (1.0 - layer * 0.12));
  }

  vec3 finalColor = glow * (1.6 * uBrightness);
  finalColor += finalColor * (uGlow * 0.7);
  float dither = (hash(frag + vec2(t, 0.0)) - 0.5) / 255.0;
  finalColor += dither;
  float alpha = clamp(cover * uOpacity * uReveal, 0.0, 1.0);
  outColor = vec4(finalColor * alpha, alpha);
}
`;

const parseHex = (hex: string): [number, number, number] => {
  const clean = hex.replace('#', '').trim();
  const raw = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const num = parseInt(raw, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const srgbToLinear = (x: number) => (x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));

const rgbToOklab = (r: number, g: number, b: number): [number, number, number] => {
  const lr = srgbToLinear(r / 255);
  const lg = srgbToLinear(g / 255);
  const lb = srgbToLinear(b / 255);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
};

const parseColor = (color: string): [number, number, number] => {
  const [L, a, b] = rgbToOklab(...parseHex(color));
  return [L, Math.hypot(a, b), Math.atan2(b, a)];
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const Aurora = ({
  colorStops = ['#4F46E5', '#06B6D4', '#8B5CF6', '#10B981'],
  amplitude = 1.3,
  blend = 0.8,
  speed = 0.8,
  time,
  height = 0.45,
  scale = 1.0,
  glow = 0.7,
  brightness = 1.25,
  layers = 3,
  direction = 'top',
  mouseInteraction = true,
  intro = false,
  opacity = 1.0,
  lightMode = false,
  paused = false,
  dpr,
  className = '',
  style
}: AuroraProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check for WebGL 2 first
    let gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: 'high-performance'
    });

    // If WebGL2 is not supported, render high-performance Canvas fallback
    if (!gl) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let rafFallback = 0;
      let t = 0;
      const renderFallback = () => {
        t += 0.01 * speed;
        const w = (canvas.width = container.clientWidth || window.innerWidth);
        const h = (canvas.height = container.clientHeight || window.innerHeight);
        ctx.clearRect(0, 0, w, h);

        const cx1 = w * 0.4 + Math.sin(t * 0.6) * 120;
        const cy1 = h * 0.35 + Math.cos(t * 0.5) * 60;
        const g1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, Math.max(w, h) * 0.7);
        g1.addColorStop(0, 'rgba(99, 102, 241, 0.45)'); // Electric Indigo
        g1.addColorStop(0.5, 'rgba(6, 182, 212, 0.25)'); // Cyan
        g1.addColorStop(1, 'rgba(3, 7, 18, 0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, w, h);

        const cx2 = w * 0.7 + Math.cos(t * 0.7) * 100;
        const cy2 = h * 0.5 + Math.sin(t * 0.6) * 70;
        const g2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, Math.max(w, h) * 0.6);
        g2.addColorStop(0, 'rgba(139, 92, 246, 0.4)'); // Purple
        g2.addColorStop(0.6, 'rgba(16, 185, 129, 0.2)'); // Emerald
        g2.addColorStop(1, 'rgba(3, 7, 18, 0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, w, h);

        rafFallback = requestAnimationFrame(renderFallback);
      };

      renderFallback();
      return () => cancelAnimationFrame(rafFallback);
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const linkProgram = (vs: WebGLShader, fs: WebGLShader) => {
      const p = gl.createProgram();
      if (!p) return null;
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      const uniformCount = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      for (let i = 0; i < uniformCount; i++) {
        const info = gl.getActiveUniform(p, i);
        if (!info) continue;
        uniforms[info.name] = gl.getUniformLocation(p, info.name);
      }
      return { program: p, uniforms };
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = linkProgram(vs, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!program) return;

    const state = { clock: 0, px: 0, py: 0, reach: 0, reveal: 1.0 }; // Instant reveal so it's directly visible!
    const pointer = { x: 0, y: 0, inside: false };
    const view = { width: 0, height: 0 };
    let raf = 0;
    let last = 0;
    let visible = true;

    const render = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program.program);
      gl.bindVertexArray(vao);

      const count = clamp(colorStops.length, 2, MAX_STOPS);
      const flat: number[] = [];
      for (let i = 0; i < count; i++) flat.push(...parseColor(colorStops[i]));
      for (let i = count; i < MAX_STOPS; i++) flat.push(0, 0, 0);

      gl.uniform2f(program.uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform1f(program.uniforms.uTime, time ?? state.clock);
      gl.uniform3fv(program.uniforms['uStops[0]'], new Float32Array(flat));
      gl.uniform1i(program.uniforms.uStopCount, count);
      gl.uniform1f(program.uniforms.uAmplitude, amplitude);
      gl.uniform1f(program.uniforms.uBlend, blend);
      gl.uniform1f(program.uniforms.uHeight, height);
      gl.uniform1f(program.uniforms.uScale, scale);
      gl.uniform1f(program.uniforms.uGlow, glow);
      gl.uniform1f(program.uniforms.uBrightness, brightness);
      gl.uniform1i(program.uniforms.uLayers, clamp(Math.round(layers), 1, MAX_LAYERS));
      gl.uniform1f(program.uniforms.uFlip, direction === 'bottom' ? 1 : 0);
      gl.uniform3f(program.uniforms.uPointer, state.px, state.py, state.reach);
      gl.uniform1f(program.uniforms.uReveal, state.reveal);
      gl.uniform1f(program.uniforms.uOpacity, opacity);
      gl.uniform1f(program.uniforms.uLightMode, lightMode ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = last ? clamp((now - last) / 1000, 0.0005, 0.05) : 1 / 60;
      last = now;
      if (paused) {
        state.reveal = 1;
        render();
        return;
      }
      state.clock += dt * speed;
      const engaged = mouseInteraction && pointer.inside;
      const follow = 1 - Math.exp(-dt / 0.6);
      if (engaged) {
        const tx = (pointer.x - view.width / 2) / view.height;
        const ty = direction === 'bottom' ? 1 - pointer.y / view.height : pointer.y / view.height;
        state.px += (tx - state.px) * follow;
        state.py += (ty - state.py) * follow;
      }
      state.reach += ((engaged ? 1 : 0) - state.reach) * (1 - Math.exp(-dt / (engaged ? 0.9 : 1.4)));
      state.reveal = 1.0;
      render();
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const width = Math.max(1, container.clientWidth || window.innerWidth);
      const height = Math.max(1, container.clientHeight || window.innerHeight);
      const ratio = Math.min(dpr || window.devicePixelRatio || 1, 1.5);
      view.width = width;
      view.height = height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      render();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('resize', resize);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program.program);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
    };
  }, [colorStops, amplitude, blend, speed, time, height, scale, glow, brightness, layers, direction, mouseInteraction, intro, opacity, lightMode, paused, dpr]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          filter: 'blur(28px)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default Aurora;
