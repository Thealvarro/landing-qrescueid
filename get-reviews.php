<?php
/**
 * Google Places API - Reviews Fetcher
 * Fetches and caches Google reviews for QRescueID
 */

// Configuration
$PLACE_ID = 'ChIJNQn2c0zZYpYRg18NXY24X1A'; // QrescueID Place ID
$CACHE_FILE = __DIR__ . '/cache/google-reviews.json';
$CACHE_DURATION = 86400; // 24 hours in seconds

// Load API Key from config.php
if (file_exists('config.php')) {
	include 'config.php';
} else {
	$API_KEY = getenv('GOOGLE_PLACES_API_KEY') ?: ''; // Fallback to env var or empty
}

// Enable CORS for local development
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

/**
 * Get cached reviews if valid
 */
function getCachedReviews($cacheFile, $cacheDuration)
{
	if (file_exists($cacheFile)) {
		$cacheTime = filemtime($cacheFile);
		if (time() - $cacheTime < $cacheDuration) {
			$cachedData = file_get_contents($cacheFile);
			return json_decode($cachedData, true);
		}
	}
	return null;
}

/**
 * Fetch reviews from Google Places API
 */
function fetchGoogleReviews($placeId, $apiKey)
{
	$url = "https://maps.googleapis.com/maps/api/place/details/json?place_id={$placeId}&fields=name,rating,reviews,user_ratings_total&key={$apiKey}&language=es";

	// Try using curl.exe as a robust fallback for Windows systems without PHP extensions enabled
	$command = 'curl.exe -s -L "' . $url . '"';
	$response = shell_exec($command);

	if (!$response) {
		// Fallback to file_get_contents if curl.exe failed
		$options = [
			'http' => [
				'method' => 'GET',
				'header' => "Accept-language: es\r\n",
				'ignore_errors' => true
			],
			'ssl' => [
				'verify_peer' => false,
				'verify_peer_name' => false,
			]
		];
		$context = stream_context_create($options);
		$response = @file_get_contents($url, false, $context);
	}

	if ($response === false || empty($response)) {
		throw new Exception('No se pudo conectar con la API de Google. Por favor, asegúrate de que el servidor tiene acceso a internet y permite ejecutar comandos externos.');
	}

	return json_decode($response, true);
}

/**
 * Save reviews to cache
 */
function cacheReviews($cacheFile, $data)
{
	$cacheDir = dirname($cacheFile);
	if (!is_dir($cacheDir)) {
		mkdir($cacheDir, 0755, true);
	}
	file_put_contents($cacheFile, json_encode($data));
}

// Main execution
try {
	// Try to get cached reviews first
	$cachedReviews = getCachedReviews($CACHE_FILE, $CACHE_DURATION);

	if ($cachedReviews !== null) {
		echo json_encode([
			'success' => true,
			'cached' => true,
			'data' => $cachedReviews
		]);
		exit;
	}

	// Fetch fresh reviews from API
	if ($API_KEY === 'TU_API_KEY_AQUI') {
		// Return mock data for testing
		$mockData = [
			'name' => 'Qrescue id',
			'rating' => 5.0,
			'user_ratings_total' => 3,
			'reviews' => [
				[
					'author_name' => 'Francisco Spiegel',
					'rating' => 5,
					'text' => 'Me siento más tranquilo ahora que poseo información de contacto ante un accidente en nuestros cascos.',
					'time' => time() - (60 * 60 * 24 * 270)
				],
				[
					'author_name' => 'maurolex',
					'rating' => 5,
					'text' => 'Muy buena opción para registrar datos de piloto. También lo ocupé para indicar datos de certificación del casco que ocupo.',
					'time' => time() - (60 * 60 * 24 * 365)
				],
				[
					'author_name' => 'Michel Nikolic',
					'rating' => 5,
					'text' => 'Excelente producto, buena calidad y visibilidad de la placa/sticker. El QR entrega de forma fácil toda la info que se necesita al momento de una emergencia. Además, Alvaro de Qrescue aclara todas las dudas de forma rápida y clara. 100% recomendable.',
					'time' => time() - (60 * 60 * 24 * 365)
				]
			]
		];

		cacheReviews($CACHE_FILE, $mockData);

		echo json_encode([
			'success' => true,
			'cached' => false,
			'mock' => true,
			'message' => 'Usando datos de prueba. Agrega tu API Key de Google Places.',
			'data' => $mockData
		]);
		exit;
	}

	try {
		$apiResponse = fetchGoogleReviews($PLACE_ID, $API_KEY);

		if ($apiResponse['status'] === 'OK') {
			$reviewsData = [
				'name' => $apiResponse['result']['name'],
				'rating' => $apiResponse['result']['rating'],
				'user_ratings_total' => $apiResponse['result']['user_ratings_total'],
				'reviews' => array_slice($apiResponse['result']['reviews'], 0, 5) // Max 5 reviews
			];

			cacheReviews($CACHE_FILE, $reviewsData);

			echo json_encode([
				'success' => true,
				'cached' => false,
				'data' => $reviewsData
			]);
		} else {
			throw new Exception('API returned status: ' . $apiResponse['status']);
		}
	} catch (Exception $e) {
		// Fallback to mock data on ANY error (API connection or status)
		$mockData = [
			'name' => 'Qrescue id',
			'rating' => 5.0,
			'user_ratings_total' => 3,
			'reviews' => [
				[
					'author_name' => 'Francisco Spiegel',
					'rating' => 5,
					'text' => 'Me siento más tranquilo ahora que poseo información de contacto ante un accidente en nuestros cascos.',
					'time' => time() - (60 * 60 * 24 * 270)
				],
				[
					'author_name' => 'maurolex',
					'rating' => 5,
					'text' => 'Muy buena opción para registrar datos de piloto. También lo ocupé para indicar datos de certificación del casco que ocupo.',
					'time' => time() - (60 * 60 * 24 * 365)
				],
				[
					'author_name' => 'Michel Nikolic',
					'rating' => 5,
					'text' => 'Excelente producto, buena calidad y visibilidad de la placa/sticker. El QR entrega de forma fácil toda la info que se necesita al momento de una emergencia. Además, Alvaro de Qrescue aclara todas las dudas de forma rápida y clara. 100% recomendable.',
					'time' => time() - (60 * 60 * 24 * 365)
				]
			]
		];

		echo json_encode([
			'success' => true,
			'cached' => false,
			'mock' => true,
			'error' => $e->getMessage(), // Include error for debugging but still show content
			'data' => $mockData
		]);
	}

} catch (Exception $e) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'error' => $e->getMessage()
	]);
}
