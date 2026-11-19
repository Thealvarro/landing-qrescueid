// Preventa: franja fija arriba y pop-up. Solo mientras preventaActiva() (flag + fecha del navegador).
// - Franja: en todas las páginas del sitio menos checkout y pedido; se puede cerrar (recuerda el cierre por sesión).
// - Pop-up: una vez por visita (sessionStorage) y máximo una vez cada 3 días (localStorage); a los 12 s o al pasar
//   el 40 % de scroll; nunca en carro, checkout, pedido ni páginas legales; tampoco en tienda o fichas si ya hay
//   productos en el carro; espera a que se cierre el aviso de cookies. ?popup=1 lo fuerza (capturas).
// Todo el texto dinámico va con textContent.
import { CATALOGO, preventaActiva, precioVigente, textoHastaPreventa, textoDespachoPreventa, pesos } from './tienda-datos.js';
import { resumen, el, icono } from './carro.js';
import { trackCustom } from './medicion.js';

const pagina = location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/'); // ruta: /tienda/, /tienda/carro/…
const forzar = new URLSearchParams(location.search).get('popup') === '1';
const SIN_FRANJA = ['/tienda/checkout/', '/tienda/pedido/'];
const SIN_POPUP = ['/tienda/carro/', '/tienda/checkout/', '/tienda/pedido/', '/privacidad/', '/terminos/', '/eliminar-cuenta/'];
const TIENDA = ['/tienda/', '/tienda/qrescueid-fisico/', '/tienda/kit-premium/'];
const CADA_3_DIAS = 3 * 24 * 60 * 60 * 1000;
const leer = (st, k) => { try { return st.getItem(k); } catch { return null; } };
const guardar = (st, k, v) => { try { st.setItem(k, v); } catch {} };
const desde = Math.min(...Object.keys(CATALOGO).map(precioVigente));

// ---------- Franja fija ----------
function franja() {
  if (SIN_FRANJA.includes(pagina) || document.body.classList.contains('mini')) return;
  if (leer(sessionStorage, 'qrescueid-franja-cerrada')) return;
  const bar = el('div', 'pvbar');
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Preventa');
  const a = el('a', 'pvbar-a');
  a.href = '/tienda/';
  a.append(el('b', '', textoHastaPreventa()), el('span', 'pvbar-sep', ' · '), el('span', '', `desde ${pesos(desde)}`),
    el('span', 'pvbar-sep s2', ' · '), el('span', 'pvbar-gift', 'Plan Premium de regalo'), icono('i-arrow-right', 'pvbar-go'));
  const x = el('button', 'pvbar-x');
  x.type = 'button';
  x.setAttribute('aria-label', 'Cerrar el aviso de preventa');
  x.appendChild(icono('i-x'));
  x.addEventListener('click', () => {
    guardar(sessionStorage, 'qrescueid-franja-cerrada', '1');
    bar.remove();
    document.documentElement.classList.remove('pvbar-on');
  });
  bar.append(a, x);
  document.body.prepend(bar);
  document.documentElement.classList.add('pvbar-on');
}

// ---------- Pop-up ----------
function puedeMostrarPopup() {
  if (forzar) return true;
  if (SIN_POPUP.includes(pagina) || document.body.classList.contains('mini')) return false;
  if (TIENDA.includes(pagina) && resumen().items.length) return false;
  if (leer(sessionStorage, 'qrescueid-popup-visto')) return false;
  const ultimo = Number(leer(localStorage, 'qrescueid-popup-ultimo')) || 0;
  return Date.now() - ultimo > CADA_3_DIAS;
}

let abierto = false;
function mostrarPopup() {
  if (abierto) return;
  abierto = true;
  guardar(sessionStorage, 'qrescueid-popup-visto', '1');
  guardar(localStorage, 'qrescueid-popup-ultimo', String(Date.now()));
  const origen = document.activeElement;

  const fondo = el('div', 'pvp-bg');
  const caja = el('div', 'pvp');
  caja.setAttribute('role', 'dialog');
  caja.setAttribute('aria-modal', 'true');
  caja.setAttribute('aria-labelledby', 'pvp-t');
  caja.setAttribute('aria-describedby', 'pvp-d');
  const x = el('button', 'pvp-x');
  x.type = 'button';
  x.setAttribute('aria-label', 'Cerrar');
  x.appendChild(icono('i-x'));
  const img = el('img', 'pvp-img');
  img.src = '/assets/identificador-v2-800.png'; img.alt = ''; img.width = 800; img.height = 280;
  const t = el('h2', '', 'Preventa de Navidad');
  t.id = 'pvp-t';
  const d = el('p', 'pvp-d', 'Reserva tu QRescueID hasta el 7 de diciembre');
  d.id = 'pvp-d';
  const precios = el('div', 'pvp-precios');
  for (const id of ['qrescueid-fisico', 'kit-premium']) {
    const p = CATALOGO[id];
    const fila = el('div', 'pvp-p');
    const v = el('div', 'pvp-v');
    v.append(el('b', '', pesos(precioVigente(id))), el('s', '', pesos(p.precio)));
    fila.append(el('span', '', id === 'kit-premium' ? 'Kit Premium (2)' : 'QRescueID Físico'), v);
    precios.appendChild(fila);
  }
  const extras = el('ul', 'pvp-extras');
  const li1 = el('li'); li1.append(icono('i-sparkles'), el('span', '', 'Plan Premium de regalo'));
  const li2 = el('li'); li2.append(icono('i-truck'), el('span', '', textoDespachoPreventa()));
  extras.append(li1, li2);
  const ver = el('a', 'btn btn-gold btn-lg', 'Ver la preventa');
  ver.href = '/tienda/';
  const no = el('button', 'pvp-no', 'Ahora no');
  no.type = 'button';
  caja.append(x, img, t, d, precios, extras, ver, no);
  document.body.append(fondo, caja);
  window.lenis?.stop();
  requestAnimationFrame(() => { fondo.classList.add('on'); caja.classList.add('on'); });
  trackCustom('PopupPreventaVisto', { pagina });

  const cerrar = (como) => {
    fondo.remove(); caja.remove();
    window.lenis?.start();
    document.removeEventListener('keydown', teclas);
    origen?.focus?.();
    if (como) trackCustom('PopupPreventaCerrado', { como });
  };
  const teclas = e => {
    if (e.key === 'Escape') cerrar('escape');
    if (e.key === 'Tab') {
      const f = [...caja.querySelectorAll('a[href], button')];
      const primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  };
  document.addEventListener('keydown', teclas);
  x.addEventListener('click', () => cerrar('x'));
  no.addEventListener('click', () => cerrar('ahora-no'));
  fondo.addEventListener('click', () => cerrar('fuera'));
  ver.addEventListener('click', () => trackCustom('PopupPreventaClic', { pagina }));
  ver.focus({ preventScroll: true });
}

function programarPopup() {
  if (!puedeMostrarPopup()) return;
  if (forzar) { setTimeout(mostrarPopup, 300); return; }
  let disparado = false;
  const intentar = () => {
    if (disparado) return;
    disparado = true;
    removeEventListener('scroll', alScroll);
    clearTimeout(timer);
    esperarCookies(mostrarPopup);
  };
  const alScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max > 0 && scrollY / max >= 0.4) intentar();
  };
  const timer = setTimeout(intentar, 12000);
  addEventListener('scroll', alScroll, { passive: true });
}

// No aparece mientras el aviso de cookies está visible: espera a que se cierre y deja pasar unos segundos
function esperarCookies(fn) {
  const raiz = document.documentElement;
  if (!raiz.classList.contains('ck-on')) { fn(); return; }
  const obs = new MutationObserver(() => {
    if (!raiz.classList.contains('ck-on')) { obs.disconnect(); setTimeout(fn, 3000); }
  });
  obs.observe(raiz, { attributes: true, attributeFilter: ['class'] });
}

if (preventaActiva()) {
  franja();
  programarPopup();
}
