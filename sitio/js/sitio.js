// QRescueID · comportamiento común del sitio:
// menú móvil, scroll suave (Lenis), entradas al aparecer, radio 19 % de las fotos,
// índice de lectura y easter egg de consola. ?p= (0 a 1) fija la posición para capturas.
// En v2.html (body data-solo-nav) solo se activa el menú: lo demás ya lo hace v2.js.
import Lenis from 'lenis';
import './llave-tienda.js'; // llave de vista previa (#k=): se guarda y sale de la URL antes de cualquier medición
import './medicion.js'; // Píxel de Meta con consentimiento (antes que el carro: PageView primero)
import './carro.js'; // contador del carro en el nav y panel lateral (todas las páginas)
import './preventa-ui.js'; // franja fija y pop-up de preventa (solo mientras dure)

const root = document.documentElement;
const soloNav = document.body.hasAttribute('data-solo-nav');
const params = new URLSearchParams(location.search);
const fijo = params.has('p');
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Menú móvil ----------
const nav = document.querySelector('.snav');
const boton = nav?.querySelector('.snav-menu');
const panel = nav?.querySelector('.snav-panel');
function abrir(si) {
  if (!nav) return;
  nav.toggleAttribute('data-open', si);
  boton.setAttribute('aria-expanded', String(si));
  boton.setAttribute('aria-label', si ? 'Cerrar menú' : 'Abrir menú');
  panel.inert = !si;
  if (si) panel.querySelector('a')?.focus({ preventScroll: true });
}
if (nav) {
  panel.inert = true;
  boton.addEventListener('click', () => abrir(!nav.hasAttribute('data-open')));
  panel.addEventListener('click', e => { if (e.target.closest('a')) abrir(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && nav.hasAttribute('data-open')) { abrir(false); boton.focus(); } });
  document.addEventListener('click', e => { if (nav.hasAttribute('data-open') && !nav.contains(e.target)) abrir(false); });
  addEventListener('resize', () => { if (innerWidth > 1100 && nav.hasAttribute('data-open')) abrir(false); });
}

if (!soloNav) {
  console.log('%c¿Qué buscas por acá? 👀', 'font-size:20px;color:#59B9C7;font-weight:bold');
  console.log('%cNo hay WordPress, no hay template. Si llegaste hasta acá, escríbeme: alvarocofre.dev', 'font-size:14px;color:#2B313F');
  root.classList.add('js');

  // ---------- Fotos: radio = 19 % del lado más corto (fotos de producto: 15,5 %) ----------
  const ponerRadio = el => {
    const { width, height } = el.getBoundingClientRect();
    if (!width || !height) return;
    // 19 % del lado corto en todo el sitio; las fotos de producto usan data-radio (15,5 %)
    const r = (parseFloat(el.dataset.radio) || 0.19) * Math.min(width, height);
    el.style.borderRadius = `${r.toFixed(1)}px`;
    el.style.setProperty('--r', `${r.toFixed(1)}px`);
  };
  const ro = new ResizeObserver(entries => entries.forEach(e => ponerRadio(e.target)));
  document.querySelectorAll('.foto, .rr').forEach(el => { ponerRadio(el); ro.observe(el); });

  // ---------- Modo captura ----------
  if (fijo) document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });

  // ---------- Entradas ----------
  const reveals = document.querySelectorAll('[data-reveal]');
  if (fijo || quieto || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    reveals.forEach(el => io.observe(el));
  }

  // ---------- Scroll suave ----------
  if (!fijo && !quieto) {
    window.lenis = new Lenis({ autoRaf: true, anchors: { offset: -96 }, lerp: 0.1 });
  }
  if (fijo) {
    const ir = () => scrollTo(0, Math.min(1, Math.max(0, parseFloat(params.get('p')) || 0)) * (root.scrollHeight - innerHeight));
    ir();
    addEventListener('load', () => { ir(); requestAnimationFrame(ir); });
  }

  // ---------- Índice de lectura: marca la sección visible ----------
  const enlaces = [...document.querySelectorAll('.toc a[href^="#"]')];
  if (enlaces.length) {
    const titulos = enlaces.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
    const marcar = () => {
      let actual = titulos[0];
      for (const t of titulos) if (t.getBoundingClientRect().top < 140) actual = t;
      enlaces.forEach(a => a.classList.toggle('on', a.hash.slice(1) === actual?.id));
    };
    addEventListener('scroll', marcar, { passive: true });
    marcar();
  }
  // Índice móvil: se cierra al elegir una sección
  document.querySelectorAll('.toc-m a').forEach(a => a.addEventListener('click', () => a.closest('details').removeAttribute('open')));
}
