// Catálogo de muestra de la tienda: única fuente de los precios y variantes que se MUESTRAN en el sitio.
// Ojo: el monto que se cobra lo calcula el servidor (tienda-crear-pedido) con los precios de su
// tabla de productos; estos valores son solo informativos y deben coincidir con esa tabla.
export const MAX_CANTIDAD = 5;

// ---------- Preventa ----------
// Apagar la preventa = cambiar `activa` a false. Nada más.
// `despachoDesde`: fecha (AAAA-MM-DD) desde la que se despachan los pedidos de preventa; en null se muestra
// "Fecha de despacho por confirmar vía email".
// `hasta`: último día de la preventa (inclusive). Pasada esa fecha, según el reloj del navegador, la interfaz
// se comporta como si `activa` fuera false, sin tocar el flag.
export const PREVENTA = { activa: true, despachoDesde: '2026-12-07', hasta: '2026-12-07' };
// Instante absoluto en que termina la preventa: fin del 7 de diciembre en Chile continental (UTC−3 en diciembre).
// Única fuente para el contador y para preventaActiva(): cambian exactamente al mismo tiempo, sin importar la
// zona horaria del navegador.
export const FIN_PREVENTA = Date.parse('2026-12-08T00:00:00-03:00');
// Usar SIEMPRE esta función (no PREVENTA.activa directo) para saber si la preventa corre ahora
export const preventaActiva = () => PREVENTA.activa && Date.now() < FIN_PREVENTA;
export const msPreventa = () => Math.max(0, FIN_PREVENTA - Date.now());
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
// "Preventa hasta el 7 de diciembre"
export const textoHastaPreventa = () => {
  if (!PREVENTA.hasta) return 'Preventa';
  const [, m, d] = PREVENTA.hasta.split('-').map(Number);
  return `Preventa hasta el ${d} de ${MESES[m - 1]}`;
};

// ---------- Datos del vendedor (los muestran el checkout y la página de gracias) ----------
// En los textos legales y en los correos van escritos a mano: si cambian aquí, cambiarlos también allá.
export const VENDEDOR = {
  razonSocial: 'Soluciones Informáticas Cofre SpA',
  rut: '77.154.424-K',
  domicilio: 'Antonio Bellet 193, oficina 1210, Providencia, Santiago, Chile',
  correo: 'qrescueid@gmail.com',
  whatsapp: '+56 9 5475 1380',
  whatsappUrl: 'https://wa.me/56954751380',
};
export const textoDespachoPreventa = () =>
  PREVENTA.despachoDesde ? `Despacho desde el ${fechaLarga(PREVENTA.despachoDesde)}` : 'Fecha de despacho por confirmar vía email';
// "2026-12-07" → "7 de diciembre"
function fechaLarga(iso) {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} de ${['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][m - 1]}`;
}
export const fechaDespachoPreventa = () => (PREVENTA.despachoDesde ? fechaLarga(PREVENTA.despachoDesde) : null);

// ---------- Plan Premium incluido / de regalo (meses por producto, con y sin preventa) ----------
// Se entrega como un código de canje que llega por correo con la confirmación del pedido (Mi Plan → Tengo un código).
export const PLAN_PREMIUM = {
  'qrescueid-fisico': { normal: 0, preventa: 1 },
  'kit-premium': { normal: 2, preventa: 3 },
};
export const mesesPlan = id => (preventaActiva() ? PLAN_PREMIUM[id].preventa : PLAN_PREMIUM[id].normal);
export const mesesRegalo = id => (preventaActiva() ? PLAN_PREMIUM[id].preventa - PLAN_PREMIUM[id].normal : 0);
export const textoMeses = n => `${n} ${n === 1 ? 'mes' : 'meses'}`;
// "3 meses de Plan Premium" (vacío si el producto no incluye plan)
export const frasePlan = id => (mesesPlan(id) ? `${textoMeses(mesesPlan(id))} de Plan Premium` : '');

// ---------- Tamaños ----------
export const TAMANOS = {
  moto: { nombre: 'Moto', medidas: '7 × 2,5 cm', ancho: 7, alto: 2.5 },
  bici: { nombre: 'Bicicleta', medidas: '6 × 2 cm', ancho: 6, alto: 2 },
};
export const EXPLICACION_TAMANOS =
  'El de bicicleta es un poco más delgado porque los cascos de bici tienen más ventilación y menos superficie lisa.';

export const CATALOGO = {
  'qrescueid-fisico': {
    id: 'qrescueid-fisico',
    nombre: 'QRescueID Físico',
    descripcion: 'Identificación de emergencia física con QR y NFC.',
    precio: 19990, // precio normal
    precioPreventa: 16990,
    antes: null,
    imagen: '/img/tienda/fisico-700.jpg',
    ficha: '/tienda/qrescueid-fisico/',
    // variante → texto que se muestra en carro, checkout y resumen
    variantes: {
      moto: 'Moto · 7 × 2,5 cm',
      bici: 'Bicicleta · 6 × 2 cm',
    },
  },
  'kit-premium': {
    id: 'kit-premium',
    nombre: 'Kit Premium QRescueID',
    get descripcion() { return `2 QRescueID físicos + ${frasePlan('kit-premium')}.`; },
    precio: 36990, // precio normal
    precioPreventa: 29990,
    antes: 40000, // tachado fuera de preventa
    imagen: '/img/tienda/kit-700.jpg',
    ficha: '/tienda/kit-premium/',
    // El cliente elige el tamaño de cada uno de los 2 identificadores (sin orden: moto-bici = bici-moto)
    variantes: {
      'moto-moto': '2 de Moto',
      'bici-bici': '2 de Bicicleta',
      'moto-bici': '1 de Moto y 1 de Bicicleta',
    },
  },
};

// Combina los dos tamaños del kit en su variante (normalizada)
export const varianteKit = (a, b) => (a === b ? `${a}-${b}` : 'moto-bici');

export const pesos = n => '$' + n.toLocaleString('es-CL');

// ---------- Precio vigente ----------
// TODO el sitio usa estas funciones (tarjetas, fichas, carro, checkout, medición).
// OJO: el servidor (tienda-crear-pedido) cobra el precio de la base de datos: hay que cargar ahí los precios de
// preventa y volver al precio normal el 8 de diciembre de 2026. Estos valores son solo los que se muestran.
export const precioVigente = id => (preventaActiva() && CATALOGO[id].precioPreventa ? CATALOGO[id].precioPreventa : CATALOGO[id].precio);
// Un solo precio tachado: en preventa, el normal; fuera de preventa, el `antes` (si existe)
export const precioTachado = id => (preventaActiva() && CATALOGO[id].precioPreventa ? CATALOGO[id].precio : CATALOGO[id].antes);
