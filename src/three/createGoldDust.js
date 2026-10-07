import * as THREE from 'three'

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec2 uMouse;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    // slow upward drift, wrapped inside the volume
    p.y = mod(p.y + uTime * aSpeed + 3.0, 6.0) - 3.0;
    p.x += sin(uTime * 0.25 + aPhase) * 0.18;
    p.z += cos(uTime * 0.2 + aPhase) * 0.12;
    // gentle parallax with the pointer — nearer particles move more
    p.xy += uMouse * (0.15 + p.z * 0.08);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);

    float twinkle = 0.55 + 0.45 * sin(uTime * 1.3 + aPhase * 6.0);
    float edge = smoothstep(3.0, 2.2, abs(p.y));
    vAlpha = twinkle * edge;
  }
`

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    glow = pow(glow, 2.2);
    gl_FragColor = vec4(uColor, glow * vAlpha * uOpacity);
  }
`

/**
 * Particules dorées façon bokeh de bougies. Vanilla Three.js,
 * retourne une API { setMouse, pause, resume, dispose }.
 */
export function createGoldDust(canvas, { count = 220, opacity = 0.85, size = 70 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
  const pixelRatio = Math.min(window.devicePixelRatio, 1.75)
  renderer.setPixelRatio(pixelRatio)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
  camera.position.z = 5

  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const speeds = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 9
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    scales[i] = 0.25 + Math.pow(Math.random(), 3) * 1.6
    speeds[i] = 0.04 + Math.random() * 0.1
    phases[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

  const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uSize: { value: size },
      uMouse: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color('#e3c48d') },
      uOpacity: { value: opacity },
    },
  })

  scene.add(new THREE.Points(geometry, material))

  const target = new THREE.Vector2()
  const clock = new THREE.Clock()
  let raf = 0
  let running = false

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const tick = () => {
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniforms.uMouse.value.lerp(target, 0.04)
    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }

  const api = {
    setMouse(x, y) { target.set(x, y) },
    resume() {
      if (running) return
      running = true
      clock.start()
      tick()
    },
    pause() {
      running = false
      cancelAnimationFrame(raf)
    },
    dispose() {
      api.pause()
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
  return api
}
