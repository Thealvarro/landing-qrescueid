// Tienda, fichas de producto y carro.html. Todo el texto dinámico va con textContent.
import { CATALOGO, TAMANOS, preventaActiva, precioVigente, EXPLICACION_TAMANOS, varianteKit, pesos } from './tienda-datos.js';
import { track } from './medicion.js';
import { agregar, resumen, pintarLista, vacio, selector, el, icono, confirmarAgregado } from './carro.js';

// ---------- Pastillas de tamaño (radio accesible) ----------
function pastillas(nombre, opciones, alElegir, etiqueta) {
  const grupo = el('div', 'pills');
  grupo.setAttribute('role', 'radiogroup');
  grupo.setAttribute('aria-label', etiqueta);
  for (const o of opciones) {
    const lab = el('label', 'pill');
    const input = el('input');
    input.type = 'radio'; input.name = nombre; input.value = o.valor;
    input.addEventListener('change', () => alElegir(o.valor));
    const caja = el('span', 'pill-c');
    caja.append(el('b', '', o.titulo), el('small', '', o.detalle));
    lab.append(input, caja);
    grupo.appendChild(lab);
  }
  return grupo;
}
const opcionesTamano = () => Object.entries(TAMANOS).map(([k, t]) => ({ valor: k, titulo: t.nombre, detalle: t.medidas }));

// Arma las pastillas de tamaño de un producto. Devuelve () => variante elegida o null.
function armarTamanos(zona, id, prefijo, alCambiar = () => {}) {
  let variante = null;
  if (id === 'kit-premium') {
    let a = null, b = null;
    const elegir = () => { alCambiar(a, b); if (a && b) { variante = varianteKit(a, b); alCambiar(a, b, variante); } };
    zona.append(el('p', 'qs-lbl', 'Identificador 1'), pastillas(prefijo + 'a', opcionesTamano(), v => { a = v; elegir(); }, 'Tamaño del identificador 1'),
      el('p', 'qs-lbl', 'Identificador 2'), pastillas(prefijo + 'b', opcionesTamano(), v => { b = v; elegir(); }, 'Tamaño del identificador 2'));
  } else {
    zona.appendChild(pastillas(prefijo + 'a', opcionesTamano(), v => { variante = v; alCambiar(v, null, v); }, 'Tamaño'));
  }
  return () => variante;
}
const textoPedirTamano = id => id === 'kit-premium'
  ? 'Elige el tamaño de los dos identificadores para continuar.'
  : 'Elige un tamaño para continuar: Moto o Bicicleta.';

// ---------- Selector rápido de tamaño (tienda.html) ----------
function selectorRapido(id, origen) {
  const p = CATALOGO[id];
  const fondo = el('div', 'qs-bg');
  const caja = el('div', 'qs');
  caja.setAttribute('role', 'dialog');
  caja.setAttribute('aria-modal', 'true');
  caja.setAttribute('aria-labelledby', 'qs-t');
  const cab = el('div', 'qs-h');
  const t = el('h2', '', 'Elige el tamaño');
  t.id = 'qs-t';
  const x = el('button', 'cdrawer-x');
  x.type = 'button';
  x.setAttribute('aria-label', 'Cerrar');
  x.appendChild(icono('i-x'));
  cab.append(t, x);
  const prod = el('div', 'qs-prod');
  const img = el('img'); img.src = p.imagen; img.alt = ''; img.width = 64; img.height = 64;
  const pi = el('div');
  pi.append(el('b', '', p.nombre), el('span', '', pesos(precioVigente(p.id))));
  prod.append(img, pi);
  const cuerpo = el('div', 'qs-body');
  const msg = el('p', 'qs-msg');
  msg.setAttribute('role', 'alert');
  msg.hidden = true;
  const elegida = armarTamanos(cuerpo, id, 'qs', (a, b, v) => { if (v) msg.hidden = true; });
  cuerpo.appendChild(el('p', 'qs-why', EXPLICACION_TAMANOS));
  const ok = el('button', 'btn btn-gold btn-lg', preventaActiva() ? 'Reservar en preventa' : 'Agregar al carro');
  ok.type = 'button';
  caja.append(cab, prod, cuerpo, msg, ok);
  document.body.append(fondo, caja);
  window.lenis?.stop();
  const quitarDialogo = () => { fondo.remove(); caja.remove(); window.lenis?.start(); };
  const cerrar = () => { quitarDialogo(); origen?.focus(); };
  x.addEventListener('click', cerrar);
  fondo.addEventListener('click', cerrar);
  caja.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrar();
    if (e.key === 'Tab') { // foco atrapado en el diálogo
      const f = [...caja.querySelectorAll('button, input')].filter(n => !n.disabled);
      const primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });
  ok.addEventListener('click', () => {
    const variante = elegida();
    if (!variante) {
      msg.textContent = textoPedirTamano(id);
      msg.hidden = false;
      return;
    }
    const r = agregar(id, variante, 1);
    quitarDialogo();
    confirmarAgregado(id, variante, r);
  });
  requestAnimationFrame(() => caja.querySelector('input')?.focus());
}

document.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
  if (CATALOGO[b.dataset.add]) selectorRapido(b.dataset.add, b);
}));

// ---------- Ficha: galería, tamaño, cantidad, agregar y comprar ahora ----------
const pdp = document.querySelector('[data-producto]');
if (pdp) {
  const p = CATALOGO[pdp.dataset.producto];
  track('ViewContent', { content_ids: [p.id], content_type: 'product', content_name: p.nombre, value: precioVigente(p.id), currency: 'CLP' });
  const main = document.getElementById('galMain');
  const thumbs = [...document.querySelectorAll('.thumb')];
  thumbs.forEach(t => t.addEventListener('click', () => {
    main.src = t.dataset.src;
    main.alt = t.dataset.alt;
    thumbs.forEach(x => { x.classList.toggle('on', x === t); x.setAttribute('aria-pressed', String(x === t)); });
  }));

  const zona = document.getElementById('sizeBox');
  const aviso = document.getElementById('sizeMsg');
  const escala = document.getElementById('escala');
  const elegida = armarTamanos(zona, p.id, 't', (a, b, v) => {
    escala?.querySelectorAll('[data-t]').forEach(g => g.classList.toggle('on', g.dataset.t === a || g.dataset.t === b));
    if (v) { aviso.hidden = true; zona.classList.remove('bad'); }
  });
  const pedirTamano = () => {
    aviso.textContent = textoPedirTamano(p.id);
    aviso.hidden = false;
    zona.classList.add('bad');
    zona.scrollIntoView({ block: 'center', behavior: 'smooth' });
    zona.querySelector('input:not(:checked)')?.focus({ preventScroll: true });
  };

  let cantidad = 1;
  const caja = selector(1, v => { cantidad = v; }, 'Cantidad');
  caja.setAttribute('aria-labelledby', 'qtyLbl');
  caja.removeAttribute('aria-label');
  document.getElementById('qtyBox').appendChild(caja);
  document.getElementById('btnAdd').addEventListener('click', () => {
    const v = elegida();
    if (!v) return pedirTamano();
    confirmarAgregado(p.id, v, agregar(p.id, v, cantidad));
  });
  // Comprar ahora (o Reservar en preventa): agrega y va directo al checkout, sin pasos intermedios
  document.getElementById('btnBuy').addEventListener('click', () => {
    const v = elegida();
    if (!v) return pedirTamano();
    agregar(p.id, v, cantidad);
    location.assign('/tienda/checkout/');
  });
}

// ---------- carro.html ----------
const lista = document.getElementById('carroLista');
if (lista) {
  const resu = document.getElementById('carroResumen');
  const pintar = () => {
    const n = pintarLista(lista);
    if (!n) lista.replaceChildren(vacio());
    resu.hidden = !n;
    document.getElementById('carroSub').textContent = pesos(resumen().subtotal);
  };
  addEventListener('carro:cambio', pintar);
  addEventListener('storage', pintar);
  pintar();
}

// Enlace directo a las condiciones de la promoción: abre el desplegable
const cond = document.getElementById('condiciones');
if (cond && location.hash === '#condiciones') { cond.open = true; requestAnimationFrame(() => cond.scrollIntoView({ block: 'center' })); }
