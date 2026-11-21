// Identificador QRescueID en 3D: las 4 capas (resina en domo, impresión, inlay NFC, adhesivo 3M).
// Lo usan index.html (despiece) y deportes.html (identificador armado bajo el foco).
import * as THREE from 'three';

// Medidas del sticker (proporción real del arte recortado: 4096 x 1267)
export const W = 4;
export const H = W * 1267 / 4096;
const R = H * 0.12;

// Inlay NFC: calza con el logo NFC del arte (bbox medido en sticker.png: x 3054–3518, y 153–1114)
const INLAY = { w: 0.5, h: 0.92, x: (3286 / 4096 - 0.5) * W, y: 0 };
export const RESIN_TINT = new THREE.Color(0.004, 0.007, 0.010);

export function crearIdentificador(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  // Estudio solo para reflejos de resina, lámina y antena: oscuro al frente y atrás (de frente
  // no agrega velo), con paneles grandes arriba/abajo y franjas a los lados (brillan los cantos).
  const studio = new THREE.Scene();
  studio.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({
    color: new THREE.Color().setScalar(0.004), side: THREE.BackSide,
  })));
  // Softbox con borde difuso (degradado radial), para que el reflejo en el domo no tenga aristas
  const softEdge = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, '#fff');
    g.addColorStop(0.45, '#fff');
    g.addColorStop(1, '#000');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const softbox = (w, h, power, x, y, z, rx, ry = 0) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({
      color: new THREE.Color().setScalar(power), map: softEdge, side: THREE.DoubleSide,
    }));
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0);
    studio.add(m);
  };
  softbox(10, 7, 1.6, 0, 9, -1.5, Math.PI / 2);   // techo: reflejo grande y suave en la cara superior
  softbox(12, 5, 0.5, 0, -9, 0, Math.PI / 2);     // piso: luz de rebote para el canto inferior
  softbox(1.2, 12, 4, -9, 1, 0, 0, Math.PI / 2);  // franjas laterales: cantos y destellos
  softbox(1.2, 12, 4, 9, 1, 0, 0, Math.PI / 2);
  softbox(0.5, 14, 3, 3, 8, -3, Math.PI / 2);     // línea cenital nítida
  softbox(16, 2, 1.5, 0, -6, 8, -0.6);            // banda baja frontal: delinea el canto delantero
  const glossEnv = pmrem.fromScene(studio, 0.02).texture;

  // ---------- Las 4 capas ----------
  const sticker = new THREE.Group();
  sticker.rotation.order = 'YXZ';

  // 4. Adhesivo: espuma con liner rojo; la cara inferior lleva "3M" repetido como la cinta real
  const adhesive = new THREE.Mesh(slab(0.04, 0.008, 2), [
    new THREE.MeshPhysicalMaterial({ color: 0xb3121d, roughness: 0.42, clearcoat: 0.3, clearcoatRoughness: 0.4 }),
    new THREE.MeshPhysicalMaterial({ color: 0x9a9da3, roughness: 0.9, sheen: 1, sheenColor: 0xffffff, sheenRoughness: 0.8 }),
  ]);
  const linerTex = new THREE.CanvasTexture(linerCanvas());
  linerTex.colorSpace = THREE.SRGBColorSpace;
  linerTex.anisotropy = maxAniso;
  const liner = new THREE.Mesh(flatShape().rotateY(Math.PI), new THREE.MeshPhysicalMaterial({
    map: linerTex, roughness: 0.4, clearcoat: 0.4, clearcoatRoughness: 0.3,
  }));
  liner.position.z = -0.002;
  adhesive.add(liner);

  // 3. Inlay NFC chico detrás del logo NFC: lámina transparente + antena plateada + chip
  const nfc = new THREE.Group();
  const inlay = new THREE.Group();
  inlay.position.set(INLAY.x, INLAY.y, 0);
  const film = new THREE.Mesh(slab(0.004, 0, 1, INLAY.w, INLAY.h, 0.04), glassMaterial(2.5));
  const antennaTex = new THREE.CanvasTexture(antennaCanvas());
  antennaTex.anisotropy = maxAniso;
  const antenna = new THREE.Mesh(new THREE.PlaneGeometry(INLAY.w, INLAY.h), new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 1, roughness: 0.15, envMap: glossEnv, envMapIntensity: 4,
    emissive: 0x9ba2ab, alphaMap: antennaTex, transparent: true, side: THREE.DoubleSide,
  }));
  antenna.position.z = 0.0048;
  const chip = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.05, 0.008), new THREE.MeshPhysicalMaterial({
    color: 0x15171a, roughness: 0.25, clearcoat: 1,
  }));
  chip.position.z = 0.009;
  inlay.add(film, antenna, chip);
  nfc.add(inlay);

  // 2. Impresión: papel mate, ganancia calibrada para que el color en pantalla calce con el arte
  const PRINT_GAIN = new THREE.Color().setScalar(0.68);
  // WebP del mismo arte (sticker.png queda como original); la promesa avisa cuando ya cargó
  let avisar;
  const texturaLista = new Promise(r => { avisar = r; });
  const printTex = new THREE.TextureLoader().load('/assets/sticker.webp', avisar, undefined, avisar);
  printTex.colorSpace = THREE.SRGBColorSpace;
  printTex.anisotropy = maxAniso;
  const printGeo = slab(0.008);
  { // la cara de abajo de la impresión es papel blanco, no el arte en espejo
    const lid = printGeo.groups[0], half = lid.count / 2;
    printGeo.groups.splice(0, 1, { start: lid.start, count: half, materialIndex: 1 },
      { start: lid.start + half, count: half, materialIndex: 0 });
  }
  const print = new THREE.Mesh(printGeo, [
    new THREE.MeshPhysicalMaterial({ map: printTex, color: PRINT_GAIN, roughness: 0.8, specularIntensity: 0.05, toneMapped: false }),
    new THREE.MeshPhysicalMaterial({ color: 0xf2f2ef, roughness: 0.6, specularIntensity: 0.1 }),
  ]);

  // 1. Resina epóxica en domo (doming): gruesa, convexa, solo reflejos + un tinte leve al separarse
  const resin = new THREE.Mesh(domeGeometry(), glassMaterial(2.2));

  // Orden de arriba hacia abajo + base de apilado en el armado
  const layers = [resin, print, nfc, adhesive];
  const restZ = [0.082, 0.074, 0.056, 0]; // resina, impresión, NFC, adhesivo
  layers.forEach(l => sticker.add(l));

  return { sticker, layers, restZ, resin, inlay, texturaLista };

  // ---------- Geometría y materiales ----------
  // ---------- Geometría base ----------
  function roundedRect(w, h, r) {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }

  // Losa con canto redondeado; la base queda en z = 0 y las UV cubren la losa completa
  function slab(depth, bevel = 0, segments = 1, w = W, h = H, r = R) {
    const g = new THREE.ExtrudeGeometry(roundedRect(w - 2 * bevel, h - 2 * bevel, Math.max(r - bevel, 0.005)), {
      depth, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel,
      bevelSegments: segments, curveSegments: 24,
    });
    g.computeBoundingBox();
    g.translate(0, 0, -g.boundingBox.min.z);
    const pos = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
    return g;
  }

  // Domo de resina: malla densa sobre el contorno del sticker. La altura depende de la distancia
  // al borde: canto en cuarto de círculo (normal horizontal en el borde) + corona levemente convexa.
  function domeGeometry() {
    const g = new THREE.PlaneGeometry(W, H, 220, 70);
    const pos = g.attributes.position, uv = g.attributes.uv;
    const cx = W / 2 - R, cy = H / 2 - R, EDGE = 0.24, RD = 0.3;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), y = pos.getY(i);
      // Esquinas: los puntos fuera del arco se proyectan al contorno redondeado
      const qx = Math.abs(x) - cx, qy = Math.abs(y) - cy;
      if (qx > 0 && qy > 0 && Math.hypot(qx, qy) > R) {
        const k = R / Math.hypot(qx, qy);
        x = Math.sign(x) * (cx + qx * k);
        y = Math.sign(y) * (cy + qy * k);
      }
      // Distancia al borde medida sobre un contorno de esquinas más amplias (RD >= EDGE):
      // así la banda del canto no tiene pliegues diagonales en las esquinas
      const ax = Math.abs(x) - (W / 2 - RD), ay = Math.abs(y) - (H / 2 - RD);
      const sd = Math.hypot(Math.max(ax, 0), Math.max(ay, 0)) + Math.min(Math.max(ax, ay), 0) - RD;
      const d = Math.max(0, -sd);
      const edge = Math.sqrt(1 - (1 - Math.min(d / EDGE, 1)) ** 2);
      // Corona suave y separable (sin aristas): convexa a lo alto, casi plana a lo largo
      const crown = (1 - (x / (W / 2)) ** 8) * (1 - (y / (H / 2)) ** 2);
      pos.setXYZ(i, x, y, 0.17 * edge + 0.06 * crown);
      uv.setXY(i, x / W + 0.5, y / H + 0.5);
    }
    g.computeVertexNormals();
    return g;
  }

  function flatShape(w = W, h = H, r = R) {
    const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 24);
    const pos = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
    return g;
  }

  // Material que solo SUMA reflejos (negro + mezcla aditiva): no tapa ni borronea lo de abajo
  function glassMaterial(env) {
    return new THREE.MeshPhysicalMaterial({
      color: 0x000000, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.03, envMap: glossEnv, envMapIntensity: env,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
  }
}

// ---------- Texturas generadas ----------
// Liner rojo con "3M" blanco repetido en diagonal
function linerCanvas() {
  const cw = 2048, ch = Math.round(cw * H / W);
  const c = document.createElement('canvas');
  c.width = cw; c.height = ch;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c4141f';
  ctx.fillRect(0, 0, cw, ch);
  ctx.translate(cw / 2, ch / 2);
  ctx.rotate(-Math.PI / 7);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 112px system-ui, -apple-system, Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let row = -6; row <= 6; row++) {
    for (let col = -8; col <= 8; col++) {
      ctx.fillText('3M', col * 300 + (row % 2) * 150, row * 190);
    }
  }
  return c;
}

// Antena en espiral rectangular del inlay (blanco = metal) con el chip al centro
function antennaCanvas() {
  const cw = 1024, ch = Math.round(cw * INLAY.h / INLAY.w);
  const c = document.createElement('canvas');
  c.width = cw; c.height = ch;
  const ctx = c.getContext('2d');
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 13;

  const turns = 8, pitch = 30;
  let l = 70, t = 70, r = cw - 70, b = ch - 70;
  const start = [l, b];
  ctx.beginPath();
  ctx.moveTo(l, b);
  for (let i = 0; i < turns; i++) {
    ctx.lineTo(l, t + 50);
    ctx.lineTo(l + 50, t); // esquina achaflanada
    ctx.lineTo(r, t);
    ctx.lineTo(r, b);
    ctx.lineTo(l + pitch, b);
    l += pitch; t += pitch; r -= pitch; b -= pitch;
  }
  ctx.stroke();
  const end = [l, b + pitch];

  // Puentes hacia el chip (al centro) y pads
  const cx = cw / 2, cy = ch / 2;
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(end[0], end[1]); ctx.lineTo(end[0], cy); ctx.lineTo(cx - 60, cy);
  ctx.moveTo(start[0], start[1]); ctx.lineTo(start[0], start[1] + 35); ctx.lineTo(cx + 60, start[1] + 35);
  ctx.lineTo(cx + 60, cy);
  ctx.stroke();
  ctx.fillRect(cx - 120, cy - 30, 60, 60);
  ctx.fillRect(cx + 60, cy - 30, 60, 60);
  return c;
}
