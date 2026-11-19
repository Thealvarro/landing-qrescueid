// Carro de compras del sitio.
// Seguridad: en localStorage solo se guarda [{product_id, variant, quantity}]. Nunca precios ni datos personales.
// Al leer se valida todo: producto conocido, variante dentro de las de ese producto y cantidad entera
// entre 1 y MAX_CANTIDAD; lo demás se descarta. Todo el texto dinámico se inserta con textContent.
// Cada línea del carro es producto + variante (dos tamaños del mismo producto = dos líneas).
import { track } from './medicion.js';
import { CATALOGO, MAX_CANTIDAD, preventaActiva, msPreventa, precioVigente, precioTachado, textoHastaPreventa, VENDEDOR, PLAN_PREMIUM, textoDespachoPreventa, pesos, mesesPlan, mesesRegalo, textoMeses, frasePlan } from './tienda-datos.js';

const CLAVE = 'qrescueid-carro';
const SPRITE = '/assets/icons.svg';
const tiene = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const valida = (id, v) => typeof id === 'string' && tiene(CATALOGO, id) && typeof v === 'string' && tiene(CATALOGO[id].variantes, v);

export function leer() {
  let crudo;
  try { crudo = JSON.parse(localStorage.getItem(CLAVE) || '[]'); } catch { crudo = []; }
  if (!Array.isArray(crudo)) crudo = [];
  const vistos = new Set();
  const limpio = [];
  for (const it of crudo) {
    if (!it || typeof it !== 'object') continue;
    const { product_id: id, variant: v, quantity: q } = it;
    if (!valida(id, v) || vistos.has(id + '|' + v)) continue;
    if (!Number.isInteger(q) || q < 1 || q > MAX_CANTIDAD) continue;
    vistos.add(id + '|' + v);
    limpio.push({ product_id: id, variant: v, quantity: q });
  }
  return limpio;
}

function guardar(items) {
  const datos = items.map(({ product_id, variant, quantity }) => ({ product_id, variant, quantity }));
  try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch {}
  dispatchEvent(new CustomEvent('carro:cambio'));
}

export function vaciar() {
  try { localStorage.removeItem(CLAVE); } catch {}
  dispatchEvent(new CustomEvent('carro:cambio'));
}

const buscar = (items, id, v) => items.find(i => i.product_id === id && i.variant === v);

// Devuelve la cantidad final de la línea y si se topó con el máximo
export function agregar(id, variante, cantidad = 1) {
  if (!valida(id, variante)) return { cantidad: 0, tope: false };
  const items = leer();
  const it = buscar(items, id, variante);
  const pedida = (it ? it.quantity : 0) + cantidad;
  const final = Math.max(1, Math.min(MAX_CANTIDAD, pedida));
  if (it) it.quantity = final; else items.push({ product_id: id, variant: variante, quantity: final });
  guardar(items);
  const agregadas = final - (pedida - cantidad);
  if (agregadas > 0) {
    track('AddToCart', {
      content_ids: [id], content_type: 'product',
      contents: [{ id, quantity: agregadas }],
      value: precioVigente(id) * agregadas, currency: 'CLP',
    });
  }
  return { cantidad: final, tope: pedida > MAX_CANTIDAD };
}

export function cambiar(id, variante, cantidad) {
  const items = leer();
  const it = buscar(items, id, variante);
  if (!it) return;
  it.quantity = Math.max(1, Math.min(MAX_CANTIDAD, cantidad));
  guardar(items);
}

export function quitar(id, variante) {
  guardar(leer().filter(i => !(i.product_id === id && i.variant === variante)));
}

export function resumen() {
  const items = leer();
  const unidades = items.reduce((t, i) => t + i.quantity, 0);
  const subtotal = items.reduce((t, i) => t + precioVigente(i.product_id) * i.quantity, 0);
  return { items, unidades, subtotal };
}

// ---------- Construcción de DOM sin innerHTML ----------
export function el(tag, cls, texto) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (texto !== undefined) n.textContent = texto;
  return n;
}
export function icono(nombre, cls = '') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'ic' + (cls ? ' ' + cls : ''));
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${SPRITE}#${nombre}`);
  svg.appendChild(use);
  return svg;
}

// Selector de cantidad accesible (− n +), acotado a 1..MAX_CANTIDAD
export function selector(valor, alCambiar, etiqueta) {
  const box = el('div', 'qty');
  box.setAttribute('role', 'group');
  box.setAttribute('aria-label', etiqueta);
  const menos = el('button', 'qty-b');
  menos.type = 'button';
  menos.setAttribute('aria-label', 'Quitar una unidad');
  menos.appendChild(icono('i-minus'));
  const n = el('output', 'qty-n', String(valor));
  n.setAttribute('aria-live', 'polite');
  const mas = el('button', 'qty-b');
  mas.type = 'button';
  mas.setAttribute('aria-label', 'Agregar una unidad');
  mas.appendChild(icono('i-plus'));
  const pintar = v => {
    n.textContent = String(v);
    menos.disabled = v <= 1;
    mas.disabled = v >= MAX_CANTIDAD;
  };
  menos.addEventListener('click', () => { valor = Math.max(1, valor - 1); pintar(valor); alCambiar(valor); });
  mas.addEventListener('click', () => { valor = Math.min(MAX_CANTIDAD, valor + 1); pintar(valor); alCambiar(valor); });
  pintar(valor);
  box.append(menos, n, mas);
  return box;
}

// Lista de líneas del carro (panel lateral, carro.html y resumen del checkout)
// modo 'editar': stepper y quitar; modo 'resumen': miniatura con burbuja de cantidad (estilo checkout)
export function pintarLista(cont, { modo = 'editar' } = {}) {
  cont.replaceChildren();
  const { items } = resumen();
  for (const it of items) {
    const p = CATALOGO[it.product_id];
    const resumenModo = modo === 'resumen';
    const fila = el('div', 'cline' + (resumenModo ? ' sum' : ''));
    const media = el(resumenModo ? 'div' : 'a', 'cline-img');
    if (!resumenModo) media.href = p.ficha;
    const img = el('img');
    img.src = p.imagen; img.alt = ''; img.width = 120; img.height = 120;
    media.appendChild(img);
    if (resumenModo) {
      const burbuja = el('span', 'bubble', String(it.quantity));
      burbuja.setAttribute('aria-label', `Cantidad ${it.quantity}`);
      media.appendChild(burbuja);
    }
    const info = el('div', 'cline-info');
    const nombre = el(resumenModo ? 'span' : 'a', 'cline-name', p.nombre);
    if (!resumenModo) nombre.href = p.ficha;
    info.append(nombre, el('span', 'cline-var', `Tamaño: ${p.variantes[it.variant]}`));
    if (frasePlan(p.id)) info.appendChild(el('span', 'cline-gift', `Incluye: ${frasePlan(p.id)}`));
    if (!resumenModo) info.appendChild(el('span', 'cline-unit', `${pesos(precioVigente(p.id))} c/u`));
    const fin = el('div', 'cline-end');
    fin.appendChild(el('b', 'cline-total', pesos(precioVigente(p.id) * it.quantity)));
    if (!resumenModo) {
      const ctl = el('div', 'cline-ctl');
      ctl.appendChild(selector(it.quantity, v => cambiar(p.id, it.variant, v), `Cantidad de ${p.nombre}, ${p.variantes[it.variant]}`));
      const x = el('button', 'cline-del');
      x.type = 'button';
      x.setAttribute('aria-label', `Quitar ${p.nombre}, ${p.variantes[it.variant]}, del carro`);
      x.append(icono('i-trash-2'), el('span', '', 'Quitar'));
      x.addEventListener('click', () => quitar(p.id, it.variant));
      ctl.appendChild(x);
      info.appendChild(ctl);
    }
    fila.append(media, info, fin);
    cont.appendChild(fila);
  }
  return items.length;
}

export function vacio(texto = 'Tu carro está vacío') {
  const box = el('div', 'cempty');
  const t = el('span', 'tile tile-lg t-yellow');
  t.appendChild(icono('i-shopping-bag'));
  const a = el('a', 'btn btn-gold', 'Ir a la tienda');
  a.href = '/tienda/';
  box.append(t, el('b', '', texto), el('p', '', 'Agrega tu QRescueID y paga con Webpay o Mercado Pago.'), a);
  return box;
}

// ---------- Preventa: un solo flag en tienda-datos.js ----------
// [data-preventa] se muestra solo con preventa activa; [data-sin-preventa] solo sin ella;
// [data-preventa-fecha] recibe el texto de despacho; [data-label-preventa] cambia el texto de su .lbl.
export function aplicarPreventa() {
  document.querySelectorAll('[data-preventa]').forEach(e => { e.hidden = !preventaActiva(); });
  document.querySelectorAll('[data-sin-preventa]').forEach(e => { e.hidden = preventaActiva(); });
  document.querySelectorAll('[data-preventa-fecha]').forEach(e => { e.textContent = textoDespachoPreventa(); });
  document.querySelectorAll('[data-preventa-hasta]').forEach(e => { e.textContent = textoHastaPreventa(); });
  pintarVendedor();
  // Bloques de precio: [data-precio=id] → precio vigente, tachado y etiqueta de preventa
  document.querySelectorAll('[data-precio]').forEach(box => {
    const id = box.dataset.precio;
    const tachado = precioTachado(id);
    const partes = [];
    if (tachado) partes.push(el('s', 'was', pesos(tachado)));
    partes.push(el('b', '', pesos(precioVigente(id))), el('span', '', 'CLP'));
    if (preventaActiva()) partes.push(el('em', 'pv-tag', 'Precio de preventa'));
    box.replaceChildren(...partes);
  });
  // Meses de Plan Premium desde los datos:
  // [data-plan-frase=id] → "3 meses de Plan Premium"; [data-plan-meses=id] → "3 meses";
  // [data-plan-normal=id] / [data-plan-extra=id] → meses del producto / de regalo; [data-plan-si=id] se oculta si no incluye plan.
  document.querySelectorAll('[data-plan-frase]').forEach(e => { e.textContent = frasePlan(e.dataset.planFrase); });
  document.querySelectorAll('[data-plan-meses]').forEach(e => { e.textContent = textoMeses(mesesPlan(e.dataset.planMeses)); });
  document.querySelectorAll('[data-plan-normal]').forEach(e => { e.textContent = String(PLAN_PREMIUM[e.dataset.planNormal].normal); });
  document.querySelectorAll('[data-plan-extra]').forEach(e => { e.textContent = String(mesesRegalo(e.dataset.planExtra)); });
  document.querySelectorAll('[data-plan-si]').forEach(e => { e.hidden = !mesesPlan(e.dataset.planSi); });
  document.querySelectorAll('[data-label-preventa]').forEach(b => {
    const lbl = b.querySelector('.lbl') || b;
    if (!b.dataset.labelNormal) b.dataset.labelNormal = lbl.textContent;
    if (!preventaActiva()) lbl.textContent = b.dataset.labelNormal;
  });
  if (preventaActiva()) {
    document.querySelectorAll('[data-label-preventa]').forEach(b => {
      const lbl = b.querySelector('.lbl') || b;
      lbl.textContent = b.dataset.labelPreventa;
    });
  }
}

// ---------- "Vendido por": datos del vendedor desde tienda-datos.js ----------
function pintarVendedor() {
  document.querySelectorAll('[data-vendedor]').forEach(box => {
    const v = VENDEDOR;
    const correo = el('a', '', v.correo); correo.href = `mailto:${v.correo}`;
    const wa = el('a', '', `WhatsApp ${v.whatsapp}`); wa.href = v.whatsappUrl; wa.target = '_blank'; wa.rel = 'noopener';
    const contacto = el('span', '');
    contacto.append(correo, document.createTextNode(' · '), wa);
    box.replaceChildren(el('span', '', `${v.razonSocial} · RUT ${v.rut}`), el('span', '', v.domicilio), contacto);
  });
}

// ---------- Contador del nav y panel lateral ----------
let abrirPanel = () => {};
// Abre el panel con la confirmación de lo recién agregado
export function confirmarAgregado(id, variante, r) {
  abrirPanel({ id, variante, r });
}

function iniciarNav() {
  const botones = document.querySelectorAll('.snav-cart');
  if (!botones.length) return;

  const panel = el('aside', 'cdrawer');
  panel.id = 'panel-carro';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'panel-carro-t');
  panel.hidden = true;
  const fondo = el('div', 'cdrawer-bg');
  fondo.hidden = true;
  const cab = el('div', 'cdrawer-h');
  const titulo = el('h2', '', 'Tu carro');
  titulo.id = 'panel-carro-t';
  const cerrar = el('button', 'cdrawer-x');
  cerrar.type = 'button';
  cerrar.setAttribute('aria-label', 'Cerrar el carro');
  cerrar.appendChild(icono('i-x'));
  cab.append(titulo, cerrar);
  const ok = el('p', 'cdrawer-ok');
  ok.setAttribute('role', 'status');
  ok.hidden = true;
  const lista = el('div', 'cdrawer-list');
  const pie = el('div', 'cdrawer-f');
  const sub = el('div', 'csum-row');
  const subV = el('b');
  sub.append(el('span', '', 'Subtotal'), subV);
  const nota = el('p', 'csum-note', 'El despacho se calcula en el checkout según tu región.');
  const pv = el('p', 'csum-note pv-note');
  pv.hidden = !preventaActiva();
  pv.append(el('b', '', 'Preventa · '), el('span', '', textoDespachoPreventa()));
  const ir = el('a', 'btn btn-gold btn-lg', 'Finalizar compra');
  ir.href = '/tienda/checkout/';
  const ver = el('a', 'cdrawer-link', 'Ver carro completo');
  ver.href = '/tienda/carro/';
  pie.append(sub, nota, pv, ir, ver);
  panel.append(cab, ok, lista, pie);
  document.body.append(fondo, panel);

  let origen = null;
  const pintar = () => {
    const { unidades, subtotal } = resumen();
    botones.forEach(b => {
      const badge = b.querySelector('.snav-count');
      badge.textContent = String(unidades);
      badge.hidden = unidades === 0;
      b.setAttribute('aria-label', unidades ? `Carro, ${unidades} ${unidades === 1 ? 'producto' : 'productos'}` : 'Carro vacío');
    });
    const n = pintarLista(lista);
    if (!n) lista.replaceChildren(vacio());
    pie.hidden = !n;
    subV.textContent = pesos(subtotal);
  };
  abrirPanel = agregado => {
    if (panel.hidden) origen = document.activeElement;
    pintar();
    if (agregado && agregado.r.cantidad) {
      const p = CATALOGO[agregado.id];
      const talla = p.variantes[agregado.variante];
      ok.replaceChildren(icono('i-circle-check'), el('span', '', agregado.r.tope
        ? `Llegaste al máximo de ${MAX_CANTIDAD} unidades de ${p.nombre} (${talla}).`
        : `Agregaste ${p.nombre} (${talla}).`));
      ok.className = 'cdrawer-ok' + (agregado.r.tope ? ' warn' : '');
      ok.hidden = false;
    } else ok.hidden = true;
    panel.hidden = false; fondo.hidden = false;
    requestAnimationFrame(() => { panel.classList.add('on'); fondo.classList.add('on'); });
    document.documentElement.classList.add('carro-abierto');
    window.lenis?.stop();
    cerrar.focus();
  };
  const ocultar = () => {
    panel.classList.remove('on'); fondo.classList.remove('on');
    document.documentElement.classList.remove('carro-abierto');
    window.lenis?.start();
    setTimeout(() => { panel.hidden = true; fondo.hidden = true; }, 350);
    origen?.focus?.();
  };
  botones.forEach(b => b.addEventListener('click', e => {
    if (location.pathname.startsWith('/tienda/carro')) return; // en la página del carro, el ícono no abre el panel
    e.preventDefault();
    abrirPanel();
  }));
  cerrar.addEventListener('click', ocultar);
  fondo.addEventListener('click', ocultar);
  addEventListener('keydown', e => {
    if (panel.hidden) return;
    if (e.key === 'Escape') ocultar();
    if (e.key === 'Tab') { // foco atrapado dentro del panel
      const f = [...panel.querySelectorAll('a[href], button:not([disabled])')];
      if (!f.length) return;
      const primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });
  addEventListener('carro:cambio', pintar);
  addEventListener('storage', e => { if (e.key === CLAVE) pintar(); });
  window.abrirCarro = () => abrirPanel();
  pintar();
}

aplicarPreventa();
iniciarNav();

// ---------- Cuenta regresiva de la preventa ([data-cuenta-preventa]) ----------
// Un solo intervalo para toda la página. Los dígitos van aria-hidden; el texto accesible es estático.
// Al llegar a cero: se quitan los contadores, se oculta lo de preventa y se repintan los precios sin recargar.
let cuentaId = null, pintarCuenta = null;
function iniciarCuenta() {
  if (cuentaId) { pintarCuenta(); return; } // un solo intervalo por página
  const armar = caja => {
    if (caja.dataset.armada) return;
    caja.dataset.armada = '1';
    caja.classList.add('cuenta');
    const lectores = el('span', 'sr', 'La preventa termina el 7 de diciembre');
    const rot = el('span', 'cuenta-t', 'La preventa termina en');
    rot.setAttribute('aria-hidden', 'true');
    const fila = el('span', 'cuenta-b');
    fila.setAttribute('aria-hidden', 'true');
    for (const [k, u] of [['d', 'días'], ['h', 'horas'], ['m', 'min'], ['s', 'seg']]) {
      const b = el('span', 'cb cb-' + k);
      b.append(el('b', '', '00'), el('small', '', u));
      fila.appendChild(b);
    }
    caja.replaceChildren(lectores, rot, fila);
  };
  const dos = n => String(n).padStart(2, '0');
  const pintar = () => {
    const ms = msPreventa();
    const todas = [...document.querySelectorAll('[data-cuenta-preventa]')];
    if (!preventaActiva() || ms <= 0) {
      todas.forEach(c => c.remove());
      return false;
    }
    const t = Math.floor(ms / 1000);
    const v = { d: Math.floor(t / 86400), h: Math.floor(t / 3600) % 24, m: Math.floor(t / 60) % 60, s: t % 60 };
    todas.forEach(c => {
      armar(c);
      c.classList.toggle('sin-dias', v.d === 0);
      for (const k of 'dhms') c.querySelector('.cb-' + k + ' b').textContent = dos(v[k]);
    });
    return true;
  };
  pintarCuenta = pintar;
  if (!pintar()) return;
  cuentaId = setInterval(() => {
    if (!pintar()) {
      clearInterval(cuentaId);
      aplicarPreventa();                        // insignias, botones, precios y meses del plan
      document.querySelector('.pvbar')?.remove(); // franja fija
      document.documentElement.classList.remove('pvbar-on');
      document.querySelector('.pvp')?.remove(); document.querySelector('.pvp-bg')?.remove();
      dispatchEvent(new CustomEvent('carro:cambio')); // totales del carro con precio normal
    }
  }, 1000);
}
iniciarCuenta();
