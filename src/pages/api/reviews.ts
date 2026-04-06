export const prerender = false;

import type { APIRoute } from 'astro';

const PLACE_ID = 'ChIJNQn2c0zZYpYRg18NXY24X1A';

const MOCK_DATA = {
  name: 'Qrescue id',
  rating: 5.0,
  user_ratings_total: 3,
  reviews: [
    {
      author_name: 'Francisco Spiegel',
      rating: 5,
      text: 'Me siento más tranquilo ahora que poseo información de contacto ante un accidente en nuestros cascos.',
      time: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 270,
    },
    {
      author_name: 'maurolex',
      rating: 5,
      text: 'Muy buena opción para registrar datos de piloto. También lo ocupé para indicar datos de certificación del casco que ocupo.',
      time: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 365,
    },
    {
      author_name: 'Michel Nikolic',
      rating: 5,
      text: 'Excelente producto, buena calidad y visibilidad de la placa/sticker. El QR entrega de forma fácil toda la info que se necesita al momento de una emergencia. Además, Alvaro de Qrescue aclara todas las dudas de forma rápida y clara. 100% recomendable.',
      time: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 365,
    },
  ],
};

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ success: true, mock: true, data: MOCK_DATA }),
      { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400' } }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}&language=es`;
    const res = await fetch(url);
    const json = await res.json();

    if (json.status === 'OK') {
      const data = {
        name: json.result.name,
        rating: json.result.rating,
        user_ratings_total: json.result.user_ratings_total,
        reviews: (json.result.reviews ?? []).slice(0, 5),
      };
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400' } }
      );
    }
  } catch {
    // fallback a mock
  }

  return new Response(
    JSON.stringify({ success: true, mock: true, data: MOCK_DATA }),
    { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400' } }
  );
};
