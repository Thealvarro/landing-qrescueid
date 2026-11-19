// Llave de vista previa de la tienda (#k=…), mientras la tienda está cerrada al público.
// - Se captura en cualquier página (la importa sitio.js antes que todo lo demás) y se borra de la barra.
//   Solo se quita el parámetro k: un ancla normal (#condiciones) no se toca.
// - Se guarda 7 días en localStorage como {k, hasta}, así sirve entre pestañas y al volver otro día.
// - Solo viaja al servidor de la tienda, en la cabecera x-store-preview (checkout.js). Nunca a medición.
const CLAVE = 'qrescueid-llave-tienda';
const VIGENCIA = 7 * 24 * 60 * 60 * 1000;
const FORMATO = /^[\x21-\x7E]{1,200}$/; // ASCII visible, sin espacios

function capturar() {
  const h = new URLSearchParams(location.hash.slice(1));
  const k = h.get('k');
  if (k === null) return false;
  const ok = FORMATO.test(k);
  if (ok) { try { localStorage.setItem(CLAVE, JSON.stringify({ k, hasta: Date.now() + VIGENCIA })); } catch {} }
  h.delete('k');
  const resto = h.toString();
  history.replaceState(history.state, '', location.pathname + location.search + (resto ? '#' + resto : ''));
  return ok;
}

// Llave vigente o null. Si está vencida o mal formada, se borra.
export function leerLlave() {
  try {
    const g = JSON.parse(localStorage.getItem(CLAVE) || 'null');
    if (g && typeof g.k === 'string' && FORMATO.test(g.k) && g.hasta > Date.now()) return g.k;
    localStorage.removeItem(CLAVE);
  } catch {}
  try { // compatibilidad: llave guardada por la versión anterior (por pestaña)
    const s = sessionStorage.getItem('tiendaPreview');
    if (s && FORMATO.test(s)) return s;
  } catch {}
  return null;
}

capturar();
leerLlave(); // limpia una llave vencida
// Llave pegada con la página ya abierta (solo cambia el hash): se guarda y se avisa
addEventListener('hashchange', () => { if (capturar()) dispatchEvent(new Event('tienda:llave')); });
