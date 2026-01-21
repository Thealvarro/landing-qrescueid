<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QRescueID Físico - Detalle de Producto</title>
    <meta name="description" content="QRescueID físico con QR y NFC. Toda la información, características y compra.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css?v=2" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css?v=2" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="styles.css?v=3">
    <link rel="icon" href="img/favicon.ico">
    <!-- Desarrollado por www.alvarocofre.dev -->
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.php"><strong>QRescueID</strong></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="index.php">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="servicios.php">Planes</a></li>
                    <li class="nav-item"><a class="nav-link" href="empresas.php">Empresas</a></li>
                    <li class="nav-item"><a class="nav-link" href="tienda.php">Tienda</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.php">Contacto</a></li>
                    <li class="nav-item ms-3"><a href="servicios.php" class="btn btn-primary-yellow">Crear cuenta</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <section class="product-detail-section" style="padding-top: 15rem; padding-bottom: 5rem;">
        <div class="container">
            <div class="row g-5 align-items-start">
                <div class="col-lg-6" data-aos="fade-right">
                    <img id="mainProductImage" src="img/caja-qrescueid_resultado.webp" alt="QRescueID Físico"
                        class="img-fluid rounded-4 shadow mb-3"
                        style="width: 100%; height: 500px; object-fit: cover; object-position: center center;">

                    <!-- Thumbnails -->
                    <div class="row g-2">
                        <div class="col-3">
                            <img src="img/caja-qrescueid_resultado.webp"
                                class="img-fluid rounded border thumbnail-active cursor-pointer"
                                onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                        <div class="col-3">
                            <img src="img/_MG_3493_resultado.webp" class="img-fluid rounded border cursor-pointer"
                                onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                        <div class="col-3">
                            <img src="img/_MG_3494blanynegro_resultado.webp"
                                class="img-fluid rounded border cursor-pointer" onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                        <div class="col-3">
                            <img src="img/_MG_3496_resultado.webp" class="img-fluid rounded border cursor-pointer"
                                onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                        <div class="col-3">
                            <img src="img/_MG_5074_resultado.webp" class="img-fluid rounded border cursor-pointer"
                                onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                        <div class="col-3">
                            <img src="img/Casco-bicicleta-reflectante-blanco%20_resultado.webp"
                                class="img-fluid rounded border cursor-pointer" onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                        <div class="col-3">
                            <img src="img/foto-casco-barro.jpg" class="img-fluid rounded border cursor-pointer"
                                onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                        <div class="col-3">
                            <img src="img/foto1.png" class="img-fluid rounded border cursor-pointer"
                                onclick="changeImage(this)"
                                style="cursor: pointer; height: 80px; width: 100%; object-fit: cover;">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left">
                    <h1 class="section-heading mb-3">QRescueID Físico</h1>
                    <p class="lead text-light mb-3">Identificación de emergencia física con QR y NFC, resistente al agua
                        y al calor, ideal para cascos y superficies duras.</p>
                    <div class="pricing-price mb-3">
                        <span class="price-currency" style="color: var(--golden-yellow) !important;">$</span>
                        <span class="price-amount" style="color: var(--golden-yellow) !important;">19.990</span>
                        <span class="price-period" style="color: var(--golden-yellow) !important;">CLP</span>
                    </div>

                    <hr>
                    <h5 class="mb-3">Características</h5>
                    <ul class="list-unstyled feature-list">
                        <li class="mb-2"><i class="fas fa-shield-alt me-2 text-warning"></i>Adhesivo 3M ultra fuerte
                        </li>
                        <li class="mb-2"><i class="fas fa-water me-2 text-warning"></i>Resistente al agua y calor</li>
                        <li class="mb-2"><i class="fas fa-mobile-alt me-2 text-warning"></i>Compatible con QR y NFC</li>
                        <li class="mb-2"><i class="fas fa-lock me-2 text-warning"></i>Datos en base de datos encriptada
                        </li>
                        <li class="mb-2"><i class="fas fa-helmet-safety me-2 text-warning"></i>Diseño discreto para
                            cascos</li>
                    </ul>
                    <hr>
                    <h5 class="mb-3">Qué incluye</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">1 unidad QRescueID físico</li>
                        <li class="mb-2">Instrucciones de instalación</li>
                        <li class="mb-2">Soporte por WhatsApp</li>
                    </ul>
                    <div class="mt-4 text-center">
                        <button type="button" class="btn btn-primary-yellow btn-lg" data-bs-toggle="modal"
                            data-bs-target="#stockModal">
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>

    <!-- Modal Stock -->
    <div class="modal fade" id="stockModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-dark">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold">Stock no disponible para B2C</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pt-2">
                    <p class="mb-3">Por el momento no tenemos stock disponible para venta directa. Encuentra QRescueID
                        en nuestros distribuidores oficiales:</p>
                    <ul class="list-unstyled d-grid gap-2">
                        <li><a href="https://www.bigtrail.cl" target="_blank"
                                class="text-decoration-none d-block p-2 bg-light rounded hover-bg-gray"><i
                                    class="fas fa-external-link-alt me-2 text-warning"></i>www.bigtrail.cl</a></li>
                        <li><a href="https://www.motoss.cl" target="_blank"
                                class="text-decoration-none d-block p-2 bg-light rounded hover-bg-gray"><i
                                    class="fas fa-external-link-alt me-2 text-warning"></i>www.motoss.cl</a></li>
                        <li><a href="https://www.motoaventura.cl" target="_blank"
                                class="text-decoration-none d-block p-2 bg-light rounded hover-bg-gray"><i
                                    class="fas fa-external-link-alt me-2 text-warning"></i>www.motoaventura.cl</a></li>
                        <li><a href="https://www.chilemontana.cl" target="_blank"
                                class="text-decoration-none d-block p-2 bg-light rounded hover-bg-gray"><i
                                    class="fas fa-external-link-alt me-2 text-warning"></i>www.chilemontana.cl</a></li>
                        <li><a href="https://www.motoclases.cl" target="_blank"
                                class="text-decoration-none d-block p-2 bg-light rounded hover-bg-gray"><i
                                    class="fas fa-external-link-alt me-2 text-warning"></i>www.motoclases.cl</a></li>
                        <li><a href="https://www.laguaridademotos.cl" target="_blank"
                                class="text-decoration-none d-block p-2 bg-light rounded hover-bg-gray"><i
                                    class="fas fa-external-link-alt me-2 text-warning"></i>www.laguaridademotos.cl</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mb-4 mb-md-0">
                    <h5 class="footer-brand mb-3">QRescueID</h5>
                    <p class="text-muted">Tu identificación de emergencia, siempre contigo.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <h5 class="mb-3">Enlaces</h5>
                    <ul class="footer-links list-unstyled">
                        <li><a href="index.php">Inicio</a></li>
                        <li><a href="servicios.php">Planes</a></li>
                        <li><a href="tienda.php">Tienda</a></li>
                        <li><a href="contact.php">Contacto</a></li>
                    </ul>
                </div>
            </div>
            <hr class="footer-divider">
            <div class="row">
                <div class="col-12 text-center">
                    <p class="footer-copyright mb-0">© 2025 QRescueID – Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js?v=2"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js?v=2"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
        });

        function changeImage(element) {
            // Update main image
            document.getElementById('mainProductImage').src = element.src;

            // Remove active class from all thumbnails
            const thumbnails = document.querySelectorAll('.thumbnail-active');
            thumbnails.forEach(thumb => thumb.classList.remove('thumbnail-active', 'border-primary'));

            // Add active class to clicked thumbnail
            element.classList.add('thumbnail-active', 'border-primary');
        }
    </script>
</body>

</html>