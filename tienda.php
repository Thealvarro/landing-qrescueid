<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda - QRescueID</title>
    <meta name="description" content="Compra QRescueID físico y accesorios. Seguridad y tranquilidad en cada aventura.">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css?v=2" rel="stylesheet">
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css?v=2" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css?v=2">
</head>
<body>
    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/56954751380" target="_blank" class="whatsapp-float" data-bs-toggle="tooltip" title="Habla con nosotros">
        <i class="fab fa-whatsapp"></i>
    </a>

    <!-- Header / Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <strong>QRescueID</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="servicios.php">Planes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="tienda.php">Tienda</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.php">Contacto</a>
                    </li>
                    <li class="nav-item ms-3">
                        <a href="servicios.php" class="btn btn-primary-yellow">Crear cuenta</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Tienda -->
    <section class="plans-hero-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center py-5 mt-5" data-aos="fade-up">
                    <h1 class="section-heading mb-4">
                        Nuestra <span class="highlight-yellow">Tienda</span>
                    </h1>
                    <p class="lead text-muted">
                        Productos QRescueID diseñados para darte tranquilidad en tus aventuras.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Productos -->
     <section class="products-section py-5">
         <div class="container">
             <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                 <!-- Card: QRescueID Físico -->
                 <div class="col" data-aos="fade-up">
                     <div class="card h-100 shadow-sm">
                         <a href="producto-fisico.php" class="text-decoration-none text-reset">
                             <img src="img/caja-qrescueid_resultado.webp" alt="QRescueID Físico" class="card-img-top" style="height:220px;object-fit:cover;">
                         </a>
                         <div class="card-body d-flex flex-column">
                             <h5 class="card-title mb-2">
                                 <a href="producto-fisico.php" class="text-decoration-none text-reset">QRescueID Físico</a>
                             </h5>
                             <p class="card-text text-muted mb-3">Identificación de emergencia física con QR y NFC.</p>
                             <div class="mt-auto">
                                 <div class="pricing-price mb-3">
                                     <span class="price-currency">$</span>
                                     <span class="price-amount">19.990</span>
                                     <span class="price-period">CLP</span>
                                 </div>
                                 <a href="producto-fisico.php" class="btn btn-primary-yellow w-100">Ver detalles</a>
                             </div>
                         </div>
                     </div>
                 </div>
 
                 <!-- Card: Kit Premium QRescueID -->
                 <div class="col" data-aos="fade-up" data-aos-delay="100">
                     <div class="card h-100 shadow-sm">
                         <a href="producto-kit-premium.php" class="text-decoration-none text-reset">
                             <img src="img/casco-qrescueid-fluor-nocturno_resultado.webp" alt="Kit Premium QRescueID" class="card-img-top" style="height:220px;object-fit:cover;">
                         </a>
                         <div class="card-body d-flex flex-column">
                             <h5 class="card-title mb-2">
                                 <a href="producto-kit-premium.php" class="text-decoration-none text-reset">Kit Premium QRescueID</a>
                             </h5>
                             <p class="card-text text-muted mb-3">2 QRescueID físicos + 1 año Plan Premium.</p>
                             <div class="mt-auto">
                                 <div class="mb-1">
                                     <small class="text-muted text-decoration-line-through">$62.990</small>
                                 </div>
                                 <div class="pricing-price mb-3">
                                     <span class="price-currency">$</span>
                                     <span class="price-amount">49.990</span>
                                     <span class="price-period">CLP</span>
                                 </div>
                                 <a href="producto-kit-premium.php" class="btn btn-primary-yellow w-100">Ver detalles</a>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </section>

    <!-- Footer -->
    <footer class="footer py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mb-4 mb-md-0">
                    <h5 class="footer-brand mb-3">QRescueID</h5>
                    <p class="text-muted">
                        Tu identificación de emergencia, siempre contigo.
                    </p>
                </div>
                <div class="col-md-6 text-md-end">
                    <h5 class="mb-3">Enlaces</h5>
                    <ul class="footer-links list-unstyled">
                        <li><a href="index.php">Inicio</a></li>
                        <li><a href="servicios.php">Planes</a></li>
                        <li><a href="tienda.php">Tienda</a></li>
                        <li><a href="contact.php">Contacto</a></li>
                        <li><a href="#">Política de privacidad</a></li>
                        <li><a href="#">Términos</a></li>
                    </ul>
                </div>
            </div>
            <hr class="footer-divider">
            <div class="row">
                <div class="col-12 text-center">
                    <p class="footer-copyright mb-0">
                        © 2025 QRescueID – Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js?v=2"></script>
    <!-- AOS Animation JS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js?v=2"></script>
    <!-- Custom JS -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });
</script>
</body>
</html>