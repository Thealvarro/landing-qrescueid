// Landing v2: scroll suave (Lenis), entradas, parallax, radio 19 % de las fotos y carrusel.
// El hero 3D vive en v2-hero.js. ?p= (0 a 1) fija la posición de la página para capturas.
import Lenis from 'lenis';

console.log('%c¿Qué buscas por acá? 👀', 'font-size:20px;color:#59B9C7;font-weight:bold');
console.log('%cNo hay WordPress, no hay template. Si llegaste hasta acá, escríbeme: alvarocofre.dev', 'font-size:14px;color:#2B313F');

const root = document.documentElement;
root.classList.add('js');
const params = new URLSearchParams(location.search);
const fijo = params.has('p');
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp01 = x => Math.min(1, Math.max(0, x));

// ---------- Fotos: radio = 19 % del lado más corto ----------
const conRadio = document.querySelectorAll('.foto:not(.impact img):not(.slide img):not(.step-media img):not(.biz-media img), .impact, .slide, .step-media:not(.step-ui), .biz-media');
const ponerRadio = el => {
  const { width, height } = el.getBoundingClientRect();
  if (width && height) el.style.borderRadius = `${(0.19 * Math.min(width, height)).toFixed(1)}px`;
};
const ro = new ResizeObserver(entries => entries.forEach(e => ponerRadio(e.target)));
conRadio.forEach(el => { ponerRadio(el); ro.observe(el); });

// ---------- Carrusel: se duplica para que avance sin fin ----------
const track = document.querySelector('.track');
const originales = [...track.children];
originales.forEach(s => {
  const c = s.cloneNode(true);
  c.setAttribute('aria-hidden', 'true');
  c.querySelectorAll('img').forEach(i => { i.alt = ''; });
  track.appendChild(c);
});
track.querySelectorAll('.slide').forEach(el => { ponerRadio(el); ro.observe(el); });

// ---------- Modo captura ----------
if (fijo) {
  document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
}

// ---------- Entradas ----------
const reveals = document.querySelectorAll('[data-reveal]');
if (fijo || quieto || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
  reveals.forEach(el => io.observe(el));
}

// ---------- Scroll suave ----------
let lenis = null;
if (!fijo && !quieto) {
  lenis = new Lenis({ autoRaf: true, anchors: { offset: -90 }, lerp: 0.1, smoothWheel: true });
  window.lenis = lenis;
}

if (fijo) {
  const ir = () => scrollTo(0, clamp01(parseFloat(params.get('p')) || 0) * (root.scrollHeight - innerHeight));
  ir();
  addEventListener('load', () => { ir(); requestAnimationFrame(ir); });
}

// ---------- Parallax leve (solo transform) ----------
const par = [
  ...[...document.querySelectorAll('[data-par]')].map(el => ({ el, k: parseFloat(el.dataset.par), ref: el.closest('.bcard') })),
  { el: document.querySelector('.impact img'), k: 0.55, ref: document.querySelector('.impact') },
  { el: document.querySelector('.mosaic'), k: 0.9, ref: document.querySelector('.wide') },
  { el: document.querySelector('.simple-img'), k: 0.5, ref: document.querySelector('.simple') },
].filter(p => p.el && p.ref);

function parallax() {
  for (const p of par) {
    const r = p.ref.getBoundingClientRect();
    if (r.bottom < -100 || r.top > innerHeight + 100) continue;
    const k = clamp01((innerHeight - r.top) / (innerHeight + r.height));
    p.el.style.setProperty('--py', `${((0.5 - k) * 56 * p.k).toFixed(1)}px`);
  }
}
if (!quieto) {
  if (lenis) lenis.on('scroll', parallax);
  addEventListener('scroll', parallax, { passive: true });
  addEventListener('resize', parallax);
  parallax();
  addEventListener('load', parallax);
}

// ---------- Carrusel: avance automático suave + arrastre con mouse ----------
let pos = 0, pausa = 0, arrastre = null, visible = false, ultimo = performance.now();
const anchoSet = () => {
  const a = originales[0], b = track.children[originales.length];
  return b.offsetLeft - a.offsetLeft;
};
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(track);
track.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') pausa = Infinity; });
track.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') pausa = performance.now() + 600; });
track.addEventListener('touchstart', () => { pausa = Infinity; }, { passive: true });
track.addEventListener('touchend', () => { pausa = performance.now() + 2500; pos = track.scrollLeft; }, { passive: true });
track.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  arrastre = { x: e.clientX, s: track.scrollLeft };
  track.classList.add('dragging');
  track.setPointerCapture(e.pointerId);
});
track.addEventListener('pointermove', e => {
  if (!arrastre) return;
  track.scrollLeft = arrastre.s - (e.clientX - arrastre.x);
  pos = track.scrollLeft;
});
const soltar = () => { arrastre = null; track.classList.remove('dragging'); pos = track.scrollLeft; };
track.addEventListener('pointerup', soltar);
track.addEventListener('pointercancel', soltar);
track.addEventListener('scroll', () => {
  const w = anchoSet();
  if (track.scrollLeft >= w) { track.scrollLeft -= w; pos = track.scrollLeft; if (arrastre) arrastre.s -= w; }
}, { passive: true });

function carrusel(now) {
  const dt = Math.min(64, now - ultimo);
  ultimo = now;
  if (!fijo && !quieto && visible && !arrastre && now > pausa) {
    pos += dt * 0.035;
    const w = anchoSet();
    if (pos >= w) pos -= w;
    track.scrollLeft = pos;
  }
  requestAnimationFrame(carrusel);
}
requestAnimationFrame(carrusel);

// ---------- Depuración (?debug): mide desbordes, errores y fotos que no cargan ----------
if (params.has('debug')) {
  const errs = [];
  addEventListener('error', e => errs.push(String(e.message || e.target?.src)), true);
  addEventListener('load', () => setTimeout(() => {
    const out = [`innerWidth=${innerWidth} scrollWidth=${root.scrollWidth} bodyScrollWidth=${document.body.scrollWidth}`];
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > innerWidth + 1 && !el.closest('.track, .mosaic-scroll, .bcard, .impact, .wide, .hero-sky')) out.push(`ancho: ${el.tagName}.${el.className} right=${Math.round(r.right)}`);
    });
    document.querySelectorAll('img').forEach(i => { if (i.complete && !i.naturalWidth) out.push('img rota: ' + i.src); });
    errs.forEach(e => out.push('error: ' + e));
    const pre = document.createElement('pre'); pre.id = 'dbg'; pre.style.cssText = 'white-space:pre-wrap;word-break:break-all;font-size:10px'; pre.textContent = out.slice(0, 40).join(' | ');
    document.body.appendChild(pre);
  }, 300));
}
