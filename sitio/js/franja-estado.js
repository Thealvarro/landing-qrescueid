// ¿Corresponde mostrar la franja de preventa en esta página? Lo usan preventa-ui.js (que la dibuja)
// y franja-temprana.js (que reserva su espacio antes del primer pintado, para que el contenido no salte).
import { preventaActiva } from './tienda-datos.js';

const SIN_FRANJA = ['/tienda/checkout/', '/tienda/pedido/'];

export function franjaVisible() {
  const pagina = location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  if (!preventaActiva() || SIN_FRANJA.includes(pagina) || document.body.classList.contains('mini')) return false;
  try { if (sessionStorage.getItem('qrescueid-franja-cerrada')) return false; } catch {}
  return true;
}
