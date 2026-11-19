// Carga la escena 3D del hero (three.js) recién cuando la página terminó de cargar,
// así no compite con el primer render. Mientras tanto se ve la imagen de respaldo del hero.
const cargar = () => import('./v2-hero.js');
if (document.readyState === 'complete') cargar();
else addEventListener('load', cargar, { once: true });
