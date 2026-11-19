// Tarifas de despacho a domicilio por región: Blue Express, paquete talla XS (hasta 0,5 kg), origen Santiago Centro.
// Fuente: cotizador público de blue.cl, cotizado el 2026-11-18.
// Son valores ESTIMADOS cotizados hacia la capital regional: comunas aisladas o insulares pueden variar.
// `plazo`: días estimados (min–max); `nota`: aclaración opcional. `precio: null` se sigue soportando
// (se muestra "Por confirmar"), pero con esta tabla todas las regiones tienen precio.
//
// IMPORTANTE: esta tabla solo sirve para MOSTRAR el valor en la tienda y el checkout. El costo que se
// cobra lo define el servidor (tienda-crear-pedido), que hoy usa una tarifa única (secreto
// STORE_SHIPPING_CLP). Antes de abrir la tienda hay que llevar esta tabla al servidor para que el
// cobro calce con lo que ve el comprador.
export const REGIONES = [
  { nombre: 'Arica y Parinacota', precio: 5200, plazo: [4, 4] },
  { nombre: 'Tarapacá', precio: 5200, plazo: [3, 3] },
  { nombre: 'Antofagasta', precio: 5200, plazo: [3, 3] },
  { nombre: 'Atacama', precio: 4300, plazo: [2, 2] },
  { nombre: 'Coquimbo', precio: 4300, plazo: [2, 2] },
  { nombre: 'Valparaíso', precio: 4300, plazo: [2, 2] },
  { nombre: 'Metropolitana de Santiago', precio: 3100, plazo: [1, 1], nota: 'entrega al día siguiente' },
  { nombre: "Libertador General Bernardo O'Higgins", precio: 4300, plazo: [2, 3] },
  { nombre: 'Maule', precio: 4300, plazo: [2, 2] },
  { nombre: 'Ñuble', precio: 4300, plazo: [2, 3] },
  { nombre: 'Biobío', precio: 4300, plazo: [2, 2] },
  { nombre: 'La Araucanía', precio: 4300, plazo: [2, 2] },
  { nombre: 'Los Ríos', precio: 4300, plazo: [2, 2] },
  { nombre: 'Los Lagos', precio: 4300, plazo: [2, 2] },
  { nombre: 'Aysén del General Carlos Ibáñez del Campo', precio: 5200, plazo: [10, 10] },
  { nombre: 'Magallanes y de la Antártica Chilena', precio: 5200, plazo: [12, 12] },
];

// Texto del plazo dentro de la tarjeta de envío. Igual que Blue Express: "N días", sin calificar el tipo de día.
export function textoPlazo(r) {
  if (!r.plazo) return '';
  const [a, b] = r.plazo;
  if (r.nota === 'entrega al día siguiente') return 'Llega al día siguiente del despacho';
  return a === b ? `Llega en ${a} ${a === 1 ? 'día' : 'días'} desde el despacho` : `Llega en ${a} a ${b} días desde el despacho`;
}
