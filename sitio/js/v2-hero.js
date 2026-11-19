// Hero v2: identificador 3D sobre cielo claro, con fotos de deportes orbitando.
// Los paneles giran en una órbita continua (sin reinicios); al pasar por delante del
// identificador se desvanecen, así nunca lo tapan ni aparecen de golpe.
// ?t= fija el reloj (capturas); ?p= sin ?t usa un reloj fijo.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { crearIdentificador, W, H } from './identificador.js';

const canvas = document.getElementById('hero-canvas');
const stage = canvas.parentElement;
const hero = document.querySelector('.hero');
const params = new URLSearchParams(location.search);
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tFijo = params.has('t') ? parseFloat(params.get('t')) : (params.has('p') ? 4 : null);
const clamp01 = x => Math.min(1, Math.max(0, x));
const smooth = x => { x = clamp01(x); return x * x * (3 - 2 * x); };

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch {
  throw new Error('Sin WebGL: queda la imagen de respaldo');
}
document.documentElement.classList.add('gl');
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.55;

// Luz de estudio limpia: llave cálida arriba, relleno frío al costado
const key = new THREE.DirectionalLight(0xfff4e2, 0.9);
key.position.set(2, 5, 6);
const fill = new THREE.DirectionalLight(0xdfeaff, 0.35);
fill.position.set(-5, 1, 3);
scene.add(key, fill, new THREE.HemisphereLight(0xeaf2ff, 0xf6e7cf, 0.3));

const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

// ---------- Identificador ----------
const { sticker, layers, restZ, resin } = crearIdentificador(renderer);
layers.forEach((l, i) => { l.position.z = restZ[i] - 0.05; });
resin.material.envMapIntensity *= 0.55;
const holder = new THREE.Group();
holder.add(sticker);
scene.add(holder);

// Sombra de contacto suave: elipse difusa bajo el identificador, de frente a la cámara
const shadow = (() => {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(256, 64, 0, 256, 64, 256);
  g.addColorStop(0, 'rgba(30,41,59,.5)');
  g.addColorStop(0.35, 'rgba(30,41,59,.2)');
  g.addColorStop(1, 'rgba(30,41,59,0)');
  ctx.setTransform(1, 0, 0, 0.25, 0, 0);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  return new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.15), new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, toneMapped: false, opacity: 0.5,
  }));
})();
scene.add(shadow);

// ---------- Paneles con fotos ----------
const FOTOS = [
  { f: 'moto', v: false }, { f: 'bici-urbana', v: true }, { f: 'skate', v: true },
  { f: 'mountain-bike', v: false }, { f: 'patines', v: true }, { f: 'scooter', v: true }, { f: 'ruta', v: false },
];
const PAD = 0.12; // margen transparente para la sombra del panel

function panelTexture(img, v) {
  const pw = v ? 600 : 800, ph = v ? 800 : 600;
  const m = Math.round(Math.max(pw, ph) * PAD);
  const c = document.createElement('canvas');
  c.width = pw + 2 * m; c.height = ph + 2 * m;
  const ctx = c.getContext('2d');
  const r = 0.19 * Math.min(pw, ph); // regla del dueño: 19 % del lado más corto
  const path = () => { ctx.beginPath(); ctx.roundRect(m, m, pw, ph, r); };
  ctx.save();
  ctx.shadowColor = 'rgba(30,41,59,.30)';
  ctx.shadowBlur = m * 0.75;
  ctx.shadowOffsetY = m * 0.3;
  path(); ctx.fillStyle = '#dfe6ee'; ctx.fill();
  ctx.restore();
  ctx.save();
  path(); ctx.clip();
  const k = Math.max(pw / img.width, ph / img.height);
  ctx.drawImage(img, m + (pw - img.width * k) / 2, m + (ph - img.height * k) / 2, img.width * k, img.height * k);
  ctx.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}

const panels = FOTOS.map((d, i) => {
  const w = d.v ? 1.5 : 2.0, h = d.v ? 2.0 : 1.5;
  const geo = new THREE.PlaneGeometry(w + 2 * PAD * Math.max(w, h), h + 2 * PAD * Math.max(w, h));
  const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, toneMapped: false, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.visible = false;
  scene.add(mesh);
  const img = new Image();
  img.onload = () => { mat.map = panelTexture(img, d.v); mat.needsUpdate = true; mesh.userData.ok = true; };
  img.src = `/assets/deportes/${d.f}${innerWidth <= 760 ? '-640' : ''}.jpg`;
  return { mesh, w, h, i };
});

// ---------- Tamaño y encuadre ----------
let mobile = false, layout;
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  mobile = w <= 760;
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 3 : 2)); // en celular, nítido en pantallas de densidad 3
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  if (mobile) {
    // identificador grande; 4 fotos arriba y abajo
    // fotos grandes (~40 % del ancho en su lado mayor): dos arriba y dos abajo, cortándose por los bordes
    layout = { count: 4, rx: 2.45, rz: 1.8, ys: [2.25, -2.6, 2.25, -2.6], scale: 1.28, stickerY: 0.1 };
    camera.fov = 30;
    fitDistance(W * 1.3 / 0.82); // el identificador ocupa ~80 % del ancho (escala 1.3)
    sticker.scale.setScalar(1.3);
  } else {
    const visible = W / Math.min(0.5, 560 / w); // ancho visible en unidades de escena
    layout = { count: 6, rx: Math.min(4.75, visible * 0.4), rz: 2.4, ys: [0.85, -0.8, 0.95, -0.7, 0.75, -0.9], scale: Math.min(0.8, visible * 0.075), stickerY: 0 };
    camera.fov = 30;
    fitDistance(visible);
    sticker.scale.setScalar(1);
  }
  camera.updateProjectionMatrix();
  panels.forEach((p, i) => { p.mesh.visible = i < layout.count; });
  if (!running) draw(now());
}
function fitDistance(visibleWidth) {
  const d = visibleWidth / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
  camera.position.set(0, d * 0.11, d);
  camera.lookAt(0, mobile ? 0.05 : -0.45, 0);
}
new ResizeObserver(resize).observe(stage);

// ---------- Movimiento ----------
const t0 = performance.now();
const now = () => (tFijo !== null ? tFijo : quieto ? 2 : (performance.now() - t0) / 1000);
const v = new THREE.Vector3();

function draw(t) {
  const sy = clamp01(scrollY / Math.max(1, hero.offsetHeight)); // avance del hero
  const swing = Math.sin(t * 0.42) * 0.38;
  holder.rotation.set(-0.1 + sy * 0.15, swing + sy * 0.5, 0.0);
  holder.position.y = layout.stickerY + 0.06 * Math.sin(t * 0.9);
  shadow.position.set(0, -H / 2 * sticker.scale.x - 0.45, -0.4);
  shadow.lookAt(camera.position);
  shadow.material.opacity = 0.5 - 0.08 * Math.sin(t * 0.9);
  shadow.scale.setScalar(sticker.scale.x);

  const n = layout.count;
  const halfW = (W / 2) * sticker.scale.x, halfH = (H / 2) * sticker.scale.x;
  for (let i = 0; i < n; i++) {
    const p = panels[i];
    const a = (i / n) * Math.PI * 2 + t * 0.13 + sy * 1.1;
    const x = Math.sin(a) * layout.rx;
    const z = Math.cos(a) * layout.rz;
    const y = layout.ys[i] + 0.08 * Math.sin(t * 0.7 + i);
    const s = layout.scale;
    p.mesh.position.set(x, y, z);
    p.mesh.scale.setScalar(s);
    v.set(camera.position.x, camera.position.y * 0.4, camera.position.z);
    p.mesh.lookAt(v);
    p.mesh.rotateY(-Math.sin(a) * 0.28);

    // Delante del identificador y encima de él: se desvanece (continuo, sin saltos)
    const pw = p.w * s / 2, ph = p.h * s / 2;
    const depth = (camera.position.z) / (camera.position.z - z); // los de adelante se ven más grandes
    const ox = clamp01((halfW + pw * depth + 0.5 - Math.abs(x * depth)) / 0.9);
    const oy = clamp01((halfH + ph * depth + 0.15 - Math.abs(y * depth)) / 0.6);
    const front = smooth((z + 0.6) / 0.9);
    const cover = ox * oy * front;
    // Detrás: un poco más tenues, para dar profundidad
    const back = 0.82 + 0.18 * smooth((z + layout.rz) / (2 * layout.rz));
    p.mesh.material.opacity = p.mesh.userData.ok ? (1 - smooth(cover)) * back : 0;
    p.mesh.renderOrder = z > 0 ? 2 : 0;
  }
  renderer.render(scene, camera);
}

let running = false, raf = 0;
function loop() {
  draw(now());
  raf = requestAnimationFrame(loop);
}
function start() { if (!running && tFijo === null && !quieto) { running = true; raf = requestAnimationFrame(loop); } }
function stop() { running = false; cancelAnimationFrame(raf); }

// Pausa cuando el hero sale de pantalla
new IntersectionObserver(([e]) => { e.isIntersecting ? start() : stop(); }).observe(hero);
resize();
// Con reloj fijo o movimiento reducido: se dibuja a pedido (al cargar fotos, scroll o resize)
if (tFijo !== null || quieto) {
  const redraw = () => draw(now());
  addEventListener('load', () => setTimeout(redraw, 50));
  addEventListener('scroll', redraw, { passive: true });
  setInterval(() => { if (panels.some(p => p.mesh.userData.ok && !p.drawn)) { panels.forEach(p => { p.drawn = p.mesh.userData.ok; }); redraw(); } }, 120);
}

// ?debug: medidas en pantalla de cada foto (lado mayor, completo y visible) para verificar tamaños
if (params.has('debug')) {
  window.medirFotos = () => {
    const r = canvas.getBoundingClientRect();
    return panels.filter(p => p.mesh.visible && p.mesh.material.opacity > 0.5).map(p => {
      p.mesh.updateMatrixWorld();
      const xs = [], ys = [];
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const v3 = new THREE.Vector3(sx * p.w / 2, sy * p.h / 2, 0).applyMatrix4(p.mesh.matrixWorld).project(camera);
        xs.push(r.left + (v3.x + 1) / 2 * r.width); ys.push(r.top + (1 - v3.y) / 2 * r.height);
      }
      const ancho = Math.max(...xs) - Math.min(...xs), alto = Math.max(...ys) - Math.min(...ys);
      const visible = Math.min(innerWidth, Math.max(...xs)) - Math.max(0, Math.min(...xs));
      return { mayor: Math.round(Math.max(ancho, alto)), ancho: Math.round(ancho), anchoVisible: Math.round(visible), pctMayor: +(100 * Math.max(ancho, alto) / innerWidth).toFixed(1), opacidad: +p.mesh.material.opacity.toFixed(2) };
    });
  };
}
