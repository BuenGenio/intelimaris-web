precision highp float;

uniform sampler2D uBackdrop;
uniform vec2 uResolution;
uniform vec2 uBackdropAspect;
uniform float uTime;
uniform float uIor;
uniform float uDispersion;
uniform float uRippleAmp;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform vec3 uTint;
uniform float uTintAmount;
uniform float uQuality;

varying vec2 vUv;

const vec3 LIGHT_DIR = normalize(vec3(-0.35, 0.72, 0.6));

/* Height field: a slow swell, a cross-chop, and the pointer ripple.
   Kept to sines — cheap, and the motion reads as water rather than noise. */
float height(vec2 p) {
  float h = 0.0;
  h += sin(p.x * 5.2 + uTime * 0.42) * 0.55;
  h += sin((p.x * 2.6 - p.y * 3.4) + uTime * 0.31) * 0.42;
  h += sin((p.x * 7.9 + p.y * 6.1) - uTime * 0.56) * 0.22;

  if (uQuality > 0.5) {
    h += sin((p.y * 11.3 - p.x * 4.7) + uTime * 0.83) * 0.12;
  }

  /* Pointer ripple: a decaying ring travelling out from the cursor. */
  float d = distance(p * uBackdropAspect, uPointer * uBackdropAspect);
  h += sin(d * 26.0 - uTime * 2.6) * exp(-d * 5.5) * uPointerStrength * 1.6;

  return h * uRippleAmp;
}

/* Surface normal from the height field by central difference. */
vec3 surfaceNormal(vec2 p) {
  float e = 1.6 / max(uResolution.x, 1.0);
  float hx = height(p + vec2(e, 0.0)) - height(p - vec2(e, 0.0));
  float hy = height(p + vec2(0.0, e)) - height(p - vec2(0.0, e));
  return normalize(vec3(-hx / (2.0 * e), -hy / (2.0 * e), 1.0));
}

void main() {
  vec3 n = surfaceNormal(vUv);

  /* Refraction: bend the sample toward the surface tangent by (1 - 1/ior). */
  float bend = 1.0 - 1.0 / uIor;
  vec2 offset = n.xy * bend * 0.18;

  /* Chromatic dispersion — red bends least, blue most. */
  vec2 spread = n.xy * uDispersion;
  vec3 refracted;
  refracted.r = texture2D(uBackdrop, vUv + offset - spread).r;
  refracted.g = texture2D(uBackdrop, vUv + offset).g;
  refracted.b = texture2D(uBackdrop, vUv + offset + spread).b;

  /* Fresnel: the view vector is +Z under an orthographic camera, so the rim
     falls out of how far the perturbed normal tilts away from it. */
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  float fresnel = pow(1.0 - clamp(dot(n, viewDir), 0.0, 1.0), 2.4);

  /* Blinn-Phong specular for the lit crests. */
  vec3 halfVec = normalize(LIGHT_DIR + viewDir);
  float specular = pow(max(dot(n, halfVec), 0.0), 68.0);

  vec3 color = refracted;
  color = mix(color, uTint, uTintAmount * (0.35 + fresnel * 0.65));
  color += fresnel * 0.16 * uTint;
  color += specular * 0.45;

  gl_FragColor = vec4(color, 1.0);
}
