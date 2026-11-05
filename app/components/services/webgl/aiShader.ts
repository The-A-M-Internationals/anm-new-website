/* AI particle renderer shaders — extracted verbatim from the original AI card */
export const P_VS = `#version 300 es
in vec4 aA; in vec4 aB; in vec4 aR;
uniform mat4 uPV; uniform float uRot, uMix, uTime, uPx;
out vec3 vC; out float vA;
const vec3 IVORY = vec3(0.86, 0.84, 0.78), GOLD = vec3(1.0, 0.72, 0.32), AMBER = vec3(1.0, 0.38, 0.12), ICE = vec3(0.6, 0.72, 1.0);
vec3 pal(float t){ return t < 0.5 ? IVORY * 0.42 : t < 1.5 ? GOLD : t < 2.5 ? AMBER * 1.3 : t < 3.5 ? GOLD : ICE * 0.62; }
vec3 flow(vec4 s, out float fa){
  fa = 1.0; vec3 p = s.xyz;
  if (s.w > 2.5 && s.w < 3.5) { p.x = mod(p.x + uTime * 0.42 + 1.6, 3.2) - 1.6; fa = smoothstep(1.6, 1.3, abs(p.x)); }
  return p;
}
void main(){
  float k = clamp((uMix - aR.x * 0.4) / 0.6, 0.0, 1.0); k = k * k * (3.0 - 2.0 * k);
  float fa, fb; vec3 a = flow(aA, fa), b = flow(aB, fb);
  vec3 p = mix(a, b, k) + (aR.yzw - 0.5) * 1.1 * sin(k * 3.14159);
  p += 0.006 * vec3(sin(uTime * 1.3 + aR.y * 40.0), sin(uTime * 1.1 + aR.z * 40.0), sin(uTime * 1.7 + aR.w * 40.0));
  float c = cos(uRot), s = sin(uRot); p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  gl_Position = uPV * vec4(p, 1.0);
  vC = mix(pal(aA.w), pal(aB.w), k);
  vA = mix(fa, fb, k) * (0.55 + 0.45 * aR.y);
  gl_PointSize = uPx * (0.55 + aR.z * 0.9) / gl_Position.w;
}`;
export const P_FS = `#version 300 es
precision mediump float;
in vec3 vC; in float vA; out vec4 o;
void main(){ vec2 q = gl_PointCoord * 2.0 - 1.0; float r = dot(q, q); if (r > 1.0) discard;
  float a = exp(-r * 3.2) * vA; o = vec4(vC * a, a); }`;
