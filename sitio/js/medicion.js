// Medición con el Píxel de Meta (sitio público y tienda; NUNCA en la plataforma ni en fichas de emergencia).
//
// Reglas:
// - Consentimiento primero: el script de Meta no se carga ni se envía nada hasta que la persona acepta.
//   La decisión se guarda en localStorage ('qrescueid-cookies' = 'aceptadas' | 'necesarias') y se puede
//   cambiar desde "Preferencias de cookies" en el footer.
// - Interruptor por host: el píxel real solo corre en qrescueid.app y www.qrescueid.app. En cualquier otro
//   host (localhost, IP local, vistas previas) queda en modo prueba: no carga nada de Meta y escribe los
//   eventos con console.debug('[medicion]', evento, datos).
// - Privacidad: nunca se envían datos personales (nombre, correo, teléfono, RUT, dirección, contenido de
//   campos) ni nada de salud. Se desactiva la configuración automática de Meta (detección de eventos por
//   botones/formularios y coincidencia avanzada automática) con fbq('set', 'autoConfig', false, PIXEL_ID).
//   Sin <noscript> con imagen: se saltaría el consentimiento.
// - Cada evento lleva event_id propio para deduplicar con la API de conversiones. Purchase usa como
//   event_id el número de pedido.
//
// PENDIENTE EN EL SERVIDOR (antes de lanzar la publicidad):
//   Al confirmar el pago (tienda-webpay-retorno / webhook de Mercado Pago), enviar Purchase por la API de
//   conversiones de Meta con el MISMO event_id (el número de pedido), value y currency reales del pedido,
//   y los datos del comprador normalizados y con hash SHA-256 (em, ph, etc.), usando un token de acceso
//   guardado como secreto del servidor (nunca en el sitio). Así Meta cuenta la compra una sola vez y la
//   recibe aunque el navegador bloquee el píxel.

const PIXEL_ID = '1261114428095817';
const CLAVE = 'qrescueid-cookies';
const REAL = ['qrescueid.app', 'www.qrescueid.app'].includes(location.hostname);
const EVENTOS_DE_PAGINA = new Set(['PageView', 'ViewContent', 'InitiateCheckout', 'Purchase']);

let decision = null;
try { decision = localStorage.getItem(CLAVE); } catch {}
let cargado = false;
const pendientes = []; // eventos de página que se envían si la persona acepta después

const nuevoId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

function cargarMeta() {
  if (cargado || !REAL) { cargado = true; return; }
  cargado = true;
  /* eslint-disable */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq.disablePushState = true; // el checkout usa history.replaceState: no queremos PageView extra
  window.fbq('set', 'autoConfig', false, PIXEL_ID);
  window.fbq('init', PIXEL_ID); // sin datos del usuario: nada de coincidencia avanzada
}

function enviar(tipo, evento, datos, id) {
  if (!REAL) { console.debug('[medicion]', evento, { ...datos, event_id: id }); return; }
  window.fbq(tipo, evento, datos, { eventID: id });
}

// alEnviar: se llama cuando el evento efectivamente se envía (ahora o al aceptar más tarde)
function registrar(tipo, evento, datos = {}, id = nuevoId(), alEnviar = () => {}) {
  if (decision === 'aceptadas') { cargarMeta(); enviar(tipo, evento, datos, id); alEnviar(); return true; }
  if (decision === null && EVENTOS_DE_PAGINA.has(evento)) pendientes.push([tipo, evento, datos, id, alEnviar]);
  return false;
}

export const track = (evento, datos, id, alEnviar) => registrar('track', evento, datos, id || nuevoId(), alEnviar);
export const trackCustom = (evento, datos, id) => registrar('trackCustom', evento, datos, id || nuevoId());

// ---------- Banner de consentimiento ----------
let banner = null;
function el(tag, cls, texto) { const n = document.createElement(tag); if (cls) n.className = cls; if (texto !== undefined) n.textContent = texto; return n; }

function decidir(valor) {
  decision = valor;
  try { localStorage.setItem(CLAVE, valor); } catch {}
  ocultarBanner();
  if (valor === 'aceptadas') {
    cargarMeta();
    pendientes.splice(0).forEach(([t, e, d, i, fin]) => { enviar(t, e, d, i); fin?.(); });
  } else pendientes.length = 0;
}

function mostrarBanner() {
  if (banner) { banner.hidden = false; return; }
  banner = el('div', 'ck');
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Preferencias de cookies');
  const p = el('p', 'ck-t', 'Usamos cookies de medición para mejorar el sitio y nuestra publicidad. ');
  const a = el('a', '', 'Política de privacidad');
  a.href = '/privacidad/';
  p.appendChild(a);
  const botones = el('div', 'ck-b');
  const no = el('button', 'btn btn-ghost btn-sm', 'Solo las necesarias');
  no.type = 'button';
  no.addEventListener('click', () => decidir('necesarias'));
  const si = el('button', 'btn btn-navy btn-sm', 'Aceptar');
  si.type = 'button';
  si.addEventListener('click', () => decidir('aceptadas'));
  botones.append(no, si);
  banner.append(p, botones);
  document.body.appendChild(banner);
  document.documentElement.classList.add('ck-on');
}
function ocultarBanner() {
  if (banner) banner.hidden = true;
  document.documentElement.classList.remove('ck-on');
}

if (decision !== 'aceptadas' && decision !== 'necesarias') { decision = null; mostrarBanner(); }

// "Preferencias de cookies" en el footer: vuelve a preguntar
document.addEventListener('click', e => {
  if (e.target.closest('[data-cookies]')) { e.preventDefault(); mostrarBanner(); banner.querySelector('button')?.focus(); }
});

// ---------- Atribución de campañas ----------
// Guarda (sin enviar a nadie) los parámetros de campaña de la URL de entrada. No contiene datos personales.
const CLAVE_ATRIB = 'qrescueid-atribucion';
(() => {
  const q = new URLSearchParams(location.search);
  const campos = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid'];
  const datos = {};
  for (const c of campos) { const v = q.get(c); if (v) datos[c] = v.slice(0, 200); }
  if (Object.keys(datos).length) { try { sessionStorage.setItem(CLAVE_ATRIB, JSON.stringify(datos)); } catch {} }
})();
const cookie = nombre => (document.cookie.split('; ').find(c => c.startsWith(nombre + '=')) || '').split('=')[1] || undefined;
// Lo que va en el campo `atribucion` del pedido: parámetros de campaña y, solo con consentimiento, _fbp/_fbc
export function atribucion() {
  let datos = {};
  try { datos = JSON.parse(sessionStorage.getItem(CLAVE_ATRIB) || '{}') || {}; } catch {}
  if (decision === 'aceptadas') {
    const fbp = cookie('_fbp'), fbc = cookie('_fbc');
    if (fbp) datos.fbp = fbp;
    if (fbc) datos.fbc = fbc;
  }
  return Object.keys(datos).length ? datos : undefined;
}

// ---------- Eventos comunes a todas las páginas ----------
track('PageView');

// Contacto por WhatsApp, Lead al ir a crear cuenta y clics en los CTA del Home
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (/^https:\/\/wa\.me\//.test(href)) track('Contact', { content_name: 'WhatsApp' });
  else if (href.startsWith('https://plataforma.qrescueid.app/auth')) track('Lead', { content_name: 'Crear cuenta' });
  if (a.dataset.cta) trackCustom('ClicCTA', { ubicacion: a.dataset.cta });
}, { capture: true });
