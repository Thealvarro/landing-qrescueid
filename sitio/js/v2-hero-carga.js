// Carga la escena 3D del hero (three.js) recién cuando la página terminó de cargar y la persona
// empieza a usarla (mueve el mouse, toca, hace scroll o usa el teclado), o a los pocos segundos
// si no hace nada. Así el 3D no compite con el primer render ni con la carga de la página.
// Mientras tanto se ve la imagen de respaldo del hero, y el 3D entra con un fundido.
// Con ?p= o ?t= (capturas) se carga apenas termina la carga, como antes.
const EVENTOS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'];
const ESPERA = 5000; // ms después de load si no hay interacción

let hecho = false;
const cargar = () => {
  if (hecho) return;
  hecho = true;
  EVENTOS.forEach(ev => removeEventListener(ev, cargar));
  import('./v2-hero.js');
};

const alCargar = () => {
  const params = new URLSearchParams(location.search);
  if (params.has('p') || params.has('t')) return cargar();
  EVENTOS.forEach(ev => addEventListener(ev, cargar, { passive: true, once: true }));
  setTimeout(cargar, ESPERA);
};
if (document.readyState === 'complete') alCargar();
else addEventListener('load', alCargar, { once: true });
