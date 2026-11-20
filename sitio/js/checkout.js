// Checkout de una página (estilo Shopify): Contacto → Entrega → Método de envío → Pago.
// Mismo contrato y mismas validaciones que la función tienda-crear-pedido.
// Seguridad:
// - Los datos del comprador NO se guardan en ningún almacenamiento del navegador.
// - Al servidor se envía solo { items:[{product_id, variant, quantity}], buyer, shipping, provider, captcha_token }.
//   Sin precios ni total: el cobro lo calcula el servidor.
// - Cupón Premium: se manda solo el código (`cupon`). El descuento lo calcula el servidor, tanto al
//   apretar Aplicar (modo cotizar de tienda-crear-pedido) como al crear el pedido.
//   OJO: el servidor todavía no conoce `variant` (hoy ignora los campos de más). Hay que agregarlo a
//   tienda-crear-pedido y a store_order_items antes de abrir la tienda, o el pedido no guardará el tamaño.
// - Todo texto dinámico va con textContent.
import { pesos, preventaActiva, fechaDespachoPreventa } from './tienda-datos.js';
import { REGIONES, textoPlazo } from './despacho-datos.js';
import { COMUNAS } from './comunas-datos.js';
import { resumen, pintarLista, vacio } from './carro.js';
import { track, atribucion } from './medicion.js';
import { leerLlave } from './llave-tienda.js';

const API = 'https://byzjsuxbdmbmvwoagujg.supabase.co/functions/v1/tienda-crear-pedido';
const SITEKEY = '0x4AAAAAADt7NVt_5oppicP0';
const WEBPAY_HOSTS = ['webpay3gint.transbank.cl', 'webpay3g.transbank.cl'];
const MP_HOSTS = ['www.mercadopago.cl', 'sandbox.mercadopago.cl', 'www.mercadopago.com', 'sandbox.mercadopago.com'];
const NOMBRES = { webpay: 'Webpay', mercadopago: 'Mercado Pago' };

// El servidor solo acepta pedidos desde estos orígenes. En cualquier otro (este prototipo)
// se valida el formulario completo pero NO se llama al servidor.
const REAL = ['qrescueid.app', 'www.qrescueid.app'].includes(location.hostname) || location.host === 'localhost:4321';

// Mismas reglas que el servidor
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO = /^\+?[0-9 ()-]{6,20}$/;
const RUT = /^[0-9.]{1,10}-?[0-9kK]$/;

// ---------- Llave de vista previa: #k= (llave-tienda.js) → header x-store-preview ----------
// El fragmento (#k=...) nunca viaja al servidor; llave-tienda.js lo guarda y lo borra de la barra.
const llave = leerLlave();
// Llave pegada con el checkout ya abierto en "no disponible": se recarga para mostrar el formulario
addEventListener('tienda:llave', () => { if (!$('sinTienda').hidden) location.reload(); });

// ---------- Logo de Webpay ----------
// Cuando llegue el archivo, déjalo en assets/pagos/ y pon aquí su ruta: './assets/pagos/webpay.svg' (o .png).
// Mientras sea null se muestra el logotipo en texto. La imagen solo reemplaza al texto si carga bien (nunca queda rota).
const LOGO_WEBPAY = '/assets/pagos/webpay.svg';
if (LOGO_WEBPAY) {
  document.querySelectorAll('[data-logo-webpay]').forEach(caja => {
    const img = new Image();
    img.className = 'pay-img wp';
    img.alt = caja.closest('.trust') ? '' : 'Webpay Plus';
    img.onload = () => caja.replaceChildren(img);
    img.src = LOGO_WEBPAY;
  });
}

const $ = id => document.getElementById(id);
const form = $('checkoutForm');
const boton = $('pagar');
const aviso = $('aviso');
const lbl = boton.querySelector('.lbl');

function iniciar() {
  if (!resumen().items.length) { mostrarSinCarro(); return; }
  $('coShell').hidden = false;
  pintarResumen();
  const r0 = resumen();
  track('InitiateCheckout', { content_ids: [...new Set(r0.items.map(i => i.product_id))], content_type: 'product', num_items: r0.unidades, value: r0.subtotal, currency: 'CLP' });
  addEventListener('carro:cambio', () => {
    if (!resumen().items.length) { mostrarSinCarro(); return; }
    pintarResumen();
    if (cupon) aplicarCupon(cupon.codigo); // el descuento depende del carro: se vuelve a cotizar
  });
  if (REAL) cargarTurnstile();
}

function mostrarSinCarro() {
  $('coShell').hidden = true;
  const box = $('sinCarro');
  box.replaceChildren(vacio('No hay productos para pagar'));
  box.hidden = false;
}

// ---------- Resumen móvil (acordeón) ----------
const toggle = $('coToggle'), side = $('coSide');
toggle.addEventListener('click', () => {
  const abierto = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(abierto));
  side.classList.toggle('open', abierto);
  $('coToggleTxt').textContent = abierto ? 'Ocultar resumen del pedido' : 'Mostrar resumen del pedido';
});

// ---------- Resumen, envío y totales ----------
const tarifa = nombre => REGIONES.find(r => r.nombre === nombre);
function pintarResumen() {
  pintarLista($('coLista'), { modo: 'resumen' });
  const { subtotal: bruto } = resumen();
  $('coSub').textContent = pesos(bruto);
  const descuento = cupon ? cupon.descuento : 0;
  $('coCuponFila').hidden = !descuento;
  $('coCupon').textContent = '-' + pesos(descuento);
  const subtotal = bruto - descuento;
  const r = tarifa(form.region.value);
  const envio = $('coEnvio'), nota = $('coTotalNota'), precio = $('shipPrecio'), plazo = $('shipPlazo');
  let textoTotal;
  if (!r) {
    envio.textContent = 'Ingresa tu región';
    precio.textContent = '—';
    plazo.textContent = 'Ingresa tu región para ver el costo y el plazo.';
    textoTotal = pesos(subtotal);
    nota.hidden = true;
  } else if (r.precio === null) {
    envio.textContent = 'Por confirmar';
    precio.textContent = 'Por confirmar';
    plazo.textContent = `Envío a ${r.nombre}. Te confirmamos el valor antes de despachar.`;
    textoTotal = `${pesos(subtotal)} + despacho`;
    nota.hidden = false;
  } else {
    envio.textContent = pesos(r.precio);
    precio.textContent = pesos(r.precio);
    // En preventa: desde cuándo se despacha + el plazo de Blue Express desde el despacho
    plazo.textContent = preventaActiva() && fechaDespachoPreventa()
      ? `Se despacha desde el ${fechaDespachoPreventa()}. ${textoPlazo(r)}.`
      : textoPlazo(r);
    textoTotal = pesos(subtotal + r.precio);
    nota.hidden = true;
  }
  $('shipOpt').toggleAttribute('data-sin-region', !r);
  for (const id of ['coTotal', 'coTotal2', 'coToggleTotal']) $(id).textContent = textoTotal;
}

// ---------- Cupón Premium ----------
// cupon = { codigo, descuento } cuando el servidor lo aceptó; null si no hay cupón aplicado
let cupon = null;
const campoCupon = form.cupon, botonCupon = $('cuponAplicar'), errCupon = $('e-cupon');
function estadoCupon(msg = '') {
  errCupon.textContent = msg;
  errCupon.hidden = !msg;
  campoCupon.closest('.field').classList.toggle('bad', !!msg);
  campoCupon.readOnly = !!cupon;
  botonCupon.querySelector('.lbl').textContent = cupon ? 'Quitar' : 'Aplicar';
  $('h-cupon').textContent = cupon
    ? `Cupón aplicado, ahorras ${pesos(cupon.descuento)}. El 20% es sobre el precio normal, en hasta 2 unidades.`
    : 'Si tienes Plan Premium, encuentras tu cupón de 20% en Mi Plan.';
}
function quitarCupon(msg) {
  cupon = null;
  estadoCupon(msg);
  pintarResumen();
}
async function aplicarCupon(codigo) {
  if (!REAL) { quitarCupon('Modo prototipo: los cupones se validan solo en qrescueid.app.'); return; }
  botonCupon.disabled = true;
  botonCupon.classList.add('loading');
  try {
    const items = resumen().items.map(({ product_id, variant, quantity }) => ({ product_id, variant, quantity }));
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-store-preview': llave },
      body: JSON.stringify({ cotizar: true, items, cupon: codigo }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || typeof data.descuento !== 'number') {
      quitarCupon(typeof data.error === 'string' ? data.error : 'No pudimos validar el cupón. Intenta de nuevo.');
      return;
    }
    cupon = { codigo, descuento: data.descuento };
    estadoCupon();
    pintarResumen();
  } catch {
    quitarCupon('No pudimos conectarnos. Revisa tu conexión e intenta de nuevo.');
  } finally {
    botonCupon.disabled = false;
    botonCupon.classList.remove('loading');
  }
}
botonCupon.addEventListener('click', () => {
  if (cupon) { quitarCupon(); campoCupon.focus(); return; }
  const codigo = campoCupon.value.trim().toUpperCase();
  if (!codigo) { estadoCupon('Escribe tu cupón, por ejemplo DESC-ABCD-EFGH.'); campoCupon.focus(); return; }
  aplicarCupon(codigo);
});
// Enter en el campo aplica el cupón en vez de enviar el formulario
campoCupon.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); botonCupon.click(); } });
campoCupon.addEventListener('input', () => { if (!errCupon.hidden) estadoCupon(); });

// ---------- Región → comuna ----------
function llenarComunas() {
  const sel = form.comuna;
  const lista = COMUNAS[form.region.value] || [];
  sel.replaceChildren();
  const vacia = document.createElement('option');
  vacia.value = '';
  vacia.textContent = lista.length ? 'Elige tu comuna' : 'Primero elige la región';
  sel.appendChild(vacia);
  for (const c of lista) {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    sel.appendChild(o);
  }
  sel.disabled = !lista.length;
}
form.region.addEventListener('change', () => { llenarComunas(); pintarResumen(); });

// ---------- RUT con formato automático (12.345.678-9) ----------
function formatearRut(valor) {
  const limpio = valor.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 9);
  if (limpio.length < 2) return limpio;
  const cuerpo = limpio.slice(0, -1).replace(/K/g, ''), dv = limpio.slice(-1);
  return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}
form.rut.addEventListener('input', () => {
  const nuevo = formatearRut(form.rut.value);
  if (nuevo !== form.rut.value) form.rut.value = nuevo;
});

// ---------- Validación por campo ----------
const v = name => form[name].value.trim();
const REGLAS = {
  correo: () => !v('correo') ? 'Ingresa tu correo.'
    : (v('correo').length < 3 || v('correo').length > 254 || !EMAIL.test(v('correo'))) ? 'Ingresa un correo válido, por ejemplo nombre@correo.cl.' : '',
  nombre: () => !v('nombre') ? 'Ingresa tu nombre y apellido.' : v('nombre').length > 120 ? 'El nombre puede tener hasta 120 caracteres.' : '',
  telefono: () => !v('telefono') ? 'Ingresa tu teléfono.'
    : !TELEFONO.test(v('telefono')) ? 'Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.' : '',
  region: () => !tarifa(form.region.value) ? 'Elige tu región.' : '',
  comuna: () => !v('comuna') ? 'Elige tu comuna.' : v('comuna').length > 80 ? 'La comuna puede tener hasta 80 caracteres.' : '',
  direccion: () => !v('direccion') ? 'Ingresa la dirección de despacho.' : v('direccion').length > 200 ? 'La dirección puede tener hasta 200 caracteres.' : '',
  indicaciones: () => v('indicaciones').length > 500 ? 'Las indicaciones pueden tener hasta 500 caracteres.' : '',
  rut: () => (v('rut') && (v('rut').length > 12 || !RUT.test(v('rut')))) ? 'Revisa el RUT, por ejemplo 12.345.678-9. Si no lo necesitas, déjalo en blanco.' : '',
  acepto: () => !form.acepto.checked ? 'Para continuar, acepta los Términos y condiciones y la Política de privacidad.' : '',
};
const ORDEN = Object.keys(REGLAS);

function validarCampo(nombre) {
  const msg = REGLAS[nombre]();
  const campo = form[nombre];
  const err = $('e-' + nombre);
  err.textContent = msg;
  err.hidden = !msg;
  if (msg) campo.setAttribute('aria-invalid', 'true'); else campo.removeAttribute('aria-invalid');
  campo.closest('.field')?.classList.toggle('bad', !!msg);
  return !msg;
}

// Valida al salir del campo (si escribió algo o ya intentó pagar) y corrige en vivo cuando está marcado
let intentado = false;
for (const nombre of ORDEN) {
  const campo = form[nombre];
  const salir = campo.type === 'checkbox' || campo.tagName === 'SELECT' ? 'change' : 'blur';
  campo.addEventListener(salir, () => { if (intentado || campo.value.trim() || campo.type === 'checkbox') validarCampo(nombre); });
  campo.addEventListener('input', () => { if (campo.getAttribute('aria-invalid')) validarCampo(nombre); });
}

const medio = () => form.querySelector('input[name="medio"]:checked').value;
let enviando = false;
function cargando(si, texto) {
  enviando = si;
  boton.disabled = si;
  boton.classList.toggle('loading', si);
  boton.setAttribute('aria-busy', String(si));
  lbl.textContent = texto || 'Pagar ahora';
}
// Si vuelve desde el medio de pago con el botón atrás, el navegador restaura la página: reactivamos el botón.
addEventListener('pageshow', e => { if (e.persisted) cargando(false); });

function mostrarAviso(msg, tipo = 'error') {
  aviso.textContent = msg;
  aviso.className = 'co-aviso ' + tipo;
  aviso.hidden = false;
}

// ---------- Turnstile (solo en producción, invisible: se ejecuta al pagar) ----------
let widgetId = null, pendiente = null;
function cargarTurnstile() {
  window.onTurnstileLoad = () => {
    widgetId = turnstile.render('#turnstile', {
      sitekey: SITEKEY,
      execution: 'execute',
      callback: token => { if (pendiente) { pendiente.resolve(token); pendiente = null; } },
      'error-callback': () => { if (pendiente) { pendiente.reject(); pendiente = null; } },
      'expired-callback': () => turnstile.reset(widgetId),
    });
  };
  const s = document.createElement('script');
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad';
  s.async = true;
  document.head.appendChild(s);
}
const pedirToken = () => new Promise((resolve, reject) => {
  if (widgetId === null) return reject();
  pendiente = { resolve, reject };
  turnstile.execute(widgetId);
});

// ---------- Envío ----------
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (enviando) return; // bloqueo de doble clic
  intentado = true;
  aviso.hidden = true;
  const malos = ORDEN.filter(n => !validarCampo(n));
  if (malos.length) {
    form[malos[0]].focus(); // foco al primer error
    return;
  }
  const { items } = resumen();
  if (!items.length) { mostrarSinCarro(); return; }

  const provider = medio();
  const buyer = { name: v('nombre'), email: v('correo'), phone: v('telefono') };
  if (v('rut')) buyer.rut = v('rut');
  const shipping = { region: form.region.value, comuna: v('comuna'), address: v('direccion') };
  if (v('indicaciones')) shipping.notes = v('indicaciones');

  cargando(true, 'Conectando con ' + NOMBRES[provider] + '…');

  // Medición: valor estimado (subtotal + envío mostrado), sin datos personales
  const est = resumen();
  const tar = tarifa(form.region.value);
  const medida = {
    value: est.subtotal - (cupon ? cupon.descuento : 0) + (tar && tar.precio ? tar.precio : 0), currency: 'CLP',
    content_ids: [...new Set(est.items.map(i => i.product_id))], num_items: est.unidades,
  };
  const pagoListo = order_number => {
    track('AddPaymentInfo', { ...medida, content_type: 'product', payment_type: NOMBRES[provider] });
    // pedido.html lee esto para Purchase (no lleva datos personales) y lo borra
    if (order_number) { try { sessionStorage.setItem('qrescueid-compra', JSON.stringify({ order_number, ...medida })); } catch {} }
  };

  if (!REAL) {
    // Modo prototipo: el servidor solo acepta qrescueid.app, así que aquí no se envía nada.
    await new Promise(r => setTimeout(r, 700));
    cargando(false);
    pagoListo(null);
    mostrarAviso(`Modo prototipo: aquí continúa el pago en ${NOMBRES[provider]}. Los datos están completos y no se envió nada.`, 'info');
    return;
  }

  try {
    let token;
    try { token = await pedirToken(); } catch { throw new Error('No pudimos verificar que no eres un robot. Intenta de nuevo.'); }
    let res;
    try {
      res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-store-preview': llave },
        body: JSON.stringify({
          // Cada línea del carro es producto + tamaño; nunca va precio ni total
          items: items.map(({ product_id, variant, quantity }) => ({ product_id, variant, quantity })),
          buyer,
          shipping,
          provider,
          captcha_token: token,
          // Atribución de campaña (utm_*, fbclid y, con consentimiento, _fbp/_fbc). Sin datos personales.
          // OJO: el servidor todavía no recibe ni guarda este campo (hoy ignora los campos de más).
          atribucion: atribucion(),
          ...(cupon ? { cupon: cupon.codigo } : {}),
        }),
      });
    } catch { throw new Error('No pudimos conectarnos. Revisa tu conexión e intenta de nuevo.'); }
    const data = await res.json().catch(() => ({}));
    // Cupón rechazado al crear el pedido (por ejemplo, venció o se usó entretanto): se quita del resumen
    if (!res.ok && typeof data.cupon === 'string') quitarCupon(typeof data.error === 'string' ? data.error : '');
    if (!res.ok) throw new Error(typeof data.error === 'string' ? data.error : 'No pudimos crear tu pedido. Intenta de nuevo.');
    let destino;
    try { destino = new URL(data.url); } catch {}
    if (typeof data.order_number === 'string' && /^[A-Za-z0-9]{1,26}$/.test(data.order_number)) pagoListo(data.order_number);
    else pagoListo(null);
    if (provider === 'mercadopago') {
      if (!destino || destino.protocol !== 'https:' || !MP_HOSTS.includes(destino.hostname)) throw new Error('No pudimos conectar con Mercado Pago. Intenta de nuevo.');
      location.assign(destino.href);
      return;
    }
    if (!destino || destino.protocol !== 'https:' || !WEBPAY_HOSTS.includes(destino.hostname) || !data.token) {
      throw new Error('No pudimos conectar con Webpay. Intenta de nuevo.');
    }
    // Webpay: form POST con token_ws
    const f = document.createElement('form');
    f.method = 'POST';
    f.action = destino.href;
    const campo = document.createElement('input');
    campo.type = 'hidden';
    campo.name = 'token_ws';
    campo.value = data.token;
    f.appendChild(campo);
    document.body.appendChild(f);
    f.submit();
  } catch (err) {
    cargando(false);
    mostrarAviso(err.message);
    if (widgetId !== null) turnstile.reset(widgetId);
  }
});

iniciar();
