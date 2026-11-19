// Estado del pedido al volver del medio de pago: ?r=ok|rechazado|cancelado|error y ?n=número.
import { vaciar } from './carro.js';
import { track } from './medicion.js';

const q = new URLSearchParams(location.search);
let r = q.get('r');
if (!['ok', 'pendiente', 'rechazado', 'cancelado', 'error'].includes(r)) r = 'error';
const bloque = document.querySelector(`[data-estado="${r}"]`);
bloque.hidden = false;

const n = q.get('n');
if (n && /^[A-Za-z0-9]{1,26}$/.test(n)) {
  const p = bloque.querySelector('.numero');
  p.querySelector('strong').textContent = n;
  p.hidden = false;
}
if (r === 'ok') vaciar(); // pago confirmado: el carro queda vacío

// Un solo h1 en la página: el título del estado visible pasa a ser el h1
const t = bloque.querySelector('.ty-title');
if (t) {
  const h1 = document.createElement('h1');
  h1.className = t.className;
  h1.textContent = t.textContent;
  t.replaceWith(h1);
}

// Medición: Purchase solo con r=ok, con event_id = número de pedido (el servidor enviará el mismo por la
// API de conversiones y Meta lo cuenta una vez). No se repite al recargar.
if (r === 'ok' && n && /^[A-Za-z0-9]{1,26}$/.test(n)) {
  // Solo se mide si el checkout dejó el resumen de ESTE pedido justo antes de ir a pagar.
  // Abrir pedido.html?r=ok&n=CUALQUIERA no dispara nada.
  let compra = null, enviados = [];
  try { compra = JSON.parse(sessionStorage.getItem('qrescueid-compra') || 'null'); sessionStorage.removeItem('qrescueid-compra'); } catch {}
  try { enviados = JSON.parse(localStorage.getItem('qrescueid-compras-medidas') || '[]'); } catch {}
  if (!Array.isArray(enviados)) enviados = [];
  if (compra && compra.order_number === n && Number.isFinite(compra.value) && !enviados.includes(n)) {
    const datos = { currency: 'CLP', content_type: 'product', value: compra.value, num_items: compra.num_items, content_ids: compra.content_ids };
    track('Purchase', datos, n, () => {
      try { localStorage.setItem('qrescueid-compras-medidas', JSON.stringify([...enviados, n].slice(-20))); } catch {}
    });
  }
}
