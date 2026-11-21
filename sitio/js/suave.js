// Scroll suave compartido (v2.js y sitio.js).
// - Con mouse o trackpad: Lenis, pero su bucle de requestAnimationFrame corre solo mientras
//   hay una animación de scroll en curso (rueda, ancla); quieto no gasta CPU.
// - En pantallas táctiles no se carga Lenis: el scroll nativo ya es suave y Lenis agrega
//   listeners de touch no pasivos. Se deja un reemplazo mínimo de stop()/start() (bloqueo del
//   scroll al abrir el carro o un diálogo) y las anclas bajan suave con el mismo desfase.
import Lenis from 'lenis';

export function iniciarScroll(offset) {
  const tactil = matchMedia('(hover: none), (pointer: coarse)').matches;
  if (tactil) {
    const root = document.documentElement;
    root.classList.add('lenis');
    window.lenis = {
      stop: () => root.classList.add('lenis-stopped'),
      start: () => root.classList.remove('lenis-stopped'),
      on() {},
    };
    document.addEventListener('click', e => {
      const a = e.target.closest?.('a[href*="#"]');
      if (!a || a.origin !== location.origin || a.pathname !== location.pathname || !a.hash) return;
      const destino = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!destino) return;
      e.preventDefault();
      history.pushState(null, '', a.hash);
      window.scrollTo({ top: destino.getBoundingClientRect().top + scrollY + offset, behavior: 'smooth' });
    });
    return null;
  }

  const lenis = new Lenis({ anchors: { offset }, lerp: 0.1, smoothWheel: true });
  window.lenis = lenis;
  let raf = 0;
  const tick = t => {
    lenis.raf(t);
    raf = lenis.isScrolling === 'smooth' ? requestAnimationFrame(tick) : 0;
  };
  const despertar = () => {
    if (raf) return;
    lenis.time = 0; // sin salto: el primer cuadro tras la pausa avanza con delta 0
    raf = requestAnimationFrame(tick);
  };
  // Lenis registra su listener de rueda en el constructor, así que este corre después del suyo.
  // Las anclas (onClick interno) y los scrollTo externos pasan por el scrollTo envuelto.
  addEventListener('wheel', despertar, { passive: true });
  const irA = lenis.scrollTo.bind(lenis);
  lenis.scrollTo = (...args) => { irA(...args); despertar(); };
  return lenis;
}
