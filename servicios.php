<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planes - QRescueID</title>
    <meta name="description"
        content="Elige tu plan ideal de QRescueID. Planes Free, Pro y Premium para todos los presupuestos.">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css?v=2" rel="stylesheet">
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css?v=2" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css?v=2">
    <link rel="icon" href="img/favicon.ico">
    <!-- Desarrollado por www.alvarocofre.dev -->
</head>

<body>
    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/56954751380" target="_blank" class="whatsapp-float" data-bs-toggle="tooltip"
        title="Habla con nosotros">
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
                        <a class="nav-link" href="empresas.php">Empresas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="tienda.php">Tienda</a>
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

    <!-- Plans Hero Section -->
    <section class="plans-hero-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center py-5 mt-5" data-aos="fade-up">
                    <h1 class="section-heading mb-4">Elige tu plan <span class="highlight-yellow">ideal</span></h1>
                    <p class="lead text-muted">
                        Selecciona el plan que mejor se adapte a tus necesidades. Desde el plan gratuito hasta el
                        premium con todas las funciones.
                    </p>

                    <!-- Billing Toggle -->
                    <div class="billing-toggle-container mt-4 mb-3">
                        <button class="billing-toggle-btn active" data-period="monthly">Mensual</button>
                        <button class="billing-toggle-btn" data-period="annual">Anual</button>
                    </div>

                    <a href="contact.php" class="btn btn-primary-yellow btn-lg mt-3">Crear cuenta gratis</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Plans Section -->
    <section class="pricing-section">
        <div class="container">
            <div class="row g-4 justify-content-center">
                <!-- Free Plan -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="pricing-card h-100" style="border: 2px solid var(--golden-yellow);">
                        <div class="pricing-header">
                            <div class="d-flex align-items-center mb-3">
                                <div class="plan-icon me-3"
                                    style="background: var(--golden-yellow); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-check" style="color: white; font-size: 24px;"></i>
                                </div>
                                <div>
                                    <h3 class="pricing-title mb-0">Plan Free</h3>
                                </div>
                            </div>
                            <p class="text-muted small">Plan gratuito con funcionalidades básicas</p>
                            <div class="pricing-price">
                                <span class="price-amount" style="font-size: 2.5rem; font-weight: 700;">Gratis</span>
                            </div>
                        </div>
                        <div class="mt-3 mb-3">
                            <p class="fw-bold mb-2">Características incluidas:</p>
                        </div>
                        <ul class="pricing-features">
                            <li><i class="fas fa-check-circle" style="color: var(--golden-yellow);"></i> 1 contacto de
                                emergencia
                            </li>
                            <li><i class="fas fa-check-circle" style="color: var(--golden-yellow);"></i> Perfil médico
                                completo</li>
                            <li><i class="fas fa-check-circle" style="color: var(--golden-yellow);"></i> QR Visible en
                                perfil</li>
                            <li><i class="fas fa-check-circle" style="color: var(--golden-yellow);"></i> Botón de envío
                                de ubicación
                                por SMS</li>
                        </ul>
                        <div class="pricing-footer mt-auto">
                            <a href="https://plataforma.qrescueid.app" class="btn btn-outline-yellow w-100">Crear Cuenta
                                Gratis</a>
                        </div>
                    </div>
                </div>

                <!-- Pro Plan (Featured) -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="pricing-card featured h-100" style="border: 2px solid #f59e0b;">
                        <div class="badge-featured"
                            style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">Más Popular</div>
                        <div class="pricing-header">
                            <div class="d-flex align-items-center mb-3">
                                <div class="plan-icon me-3"
                                    style="background: #f59e0b; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-crown" style="color: white; font-size: 24px;"></i>
                                </div>
                                <div>
                                    <h3 class="pricing-title mb-0">Plan Pro</h3>
                                </div>
                            </div>
                            <p class="text-muted small">Plan premium con funcionalidades avanzadas</p>
                            <div class="pricing-price">
                                <span class="price-currency">$</span>
                                <span class="price-amount" data-monthly="2.500" data-annual="20.000">2.500</span>
                                <span class="price-period" data-monthly="CLP/mes" data-annual="CLP/año">CLP/mes</span>
                            </div>
                        </div>
                        <div class="mt-3 mb-3">
                            <p class="fw-bold mb-2">Características incluidas:</p>
                        </div>
                        <ul class="pricing-features">
                            <li><i class="fas fa-check-circle" style="color: #f59e0b;"></i> ✨ Todo lo del Plan Free,
                                más:</li>
                            <li><i class="fas fa-check-circle" style="color: #f59e0b;"></i> Hasta 2 contactos de
                                emergencia</li>
                            <li><i class="fas fa-check-circle" style="color: #f59e0b;"></i> QR descargable en digital
                                PDF/JPG/PNG/SVG</li>
                            <li><i class="fas fa-check-circle" style="color: #f59e0b;"></i> Ubicación automática a email
                                configurable</li>
                            <li><i class="fas fa-check-circle" style="color: #f59e0b;"></i> Botón envío de ubicación por
                                WhatsApp/SMS</li>
                        </ul>
                        <div class="pricing-footer mt-auto">
                            <a href="https://plataforma.qrescueid.app" class="btn w-100"
                                style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; font-weight: 600; padding: 12px;">
                                <i class="fas fa-crown me-2"></i>Comenzar plan Pro
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Premium Plan -->
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="pricing-card h-100" style="border: 2px solid #a855f7;">
                        <div class="pricing-header">
                            <div class="d-flex align-items-center mb-3">
                                <div class="plan-icon me-3"
                                    style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-bolt" style="color: white; font-size: 24px;"></i>
                                </div>
                                <div>
                                    <h3 class="pricing-title mb-0">Plan Premium</h3>
                                </div>
                            </div>
                            <p class="text-muted small">Plan completo con todas las funcionalidades avanzadas</p>
                            <div class="pricing-price">
                                <span class="price-currency">$</span>
                                <span class="price-amount" data-monthly="4.500" data-annual="40.000">4.500</span>
                                <span class="price-period" data-monthly="CLP/mes" data-annual="CLP/año">CLP/mes</span>
                            </div>
                        </div>
                        <div class="mt-3 mb-3">
                            <p class="fw-bold mb-2">Características incluidas:</p>
                        </div>
                        <ul class="pricing-features">
                            <li><i class="fas fa-check-circle" style="color: #a855f7;"></i> ✨ Todo lo del Plan Pro, más:
                            </li>
                            <li><i class="fas fa-check-circle" style="color: #a855f7;"></i> Hasta 4 contactos de
                                emergencia</li>
                            <li><i class="fas fa-check-circle" style="color: #a855f7;"></i> Subida de archivos (recetas,
                                informes médicos) para mostrar en perfil público</li>
                            <li><i class="fas fa-check-circle" style="color: #a855f7;"></i> Botón de Traducción
                                automática de ficha médica (viajes)</li>
                            <li><i class="fas fa-check-circle" style="color: #a855f7;"></i> Descarga de ficha medica
                                completa en PDF</li>
                            <li><i class="fas fa-check-circle" style="color: #a855f7;"></i> 20% descuento en QRescueID
                                físico para el casco</li>
                        </ul>
                        <div class="pricing-footer mt-auto">
                            <a href="https://plataforma.qrescueid.app" class="btn w-100"
                                style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); color: white; font-weight: 600; padding: 12px;">
                                <i class="fas fa-bolt me-2"></i>Comenzar plan Premium
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Discount Section -->
    <section class="products-section">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
                    <img src="img/caja-qrescueid_resultado.webp" alt="Producto QRescueID" class="img-fluid rounded-4">
                </div>
                <div class="col-lg-6" data-aos="fade-left">

                    <p class="mb-4">
                        QRescueID físico con todas las características premium: resistente al agua, adhesivo 3M ultra
                        fuerte, tecnología NFC y diseño discreto para tu casco.
                    </p>
                    <div class="row g-4 mb-4">
                        <div class="col-md-6">
                            <div class="product-feature">
                                <i class="fas fa-shield-alt fa-2x mb-2"></i>
                                <h5>Resistente</h5>
                                <p>QrescueID se adhiere a tu casco con pegamento ultra resistente 3M, así cuenta con una
                                    adherencia total.</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product-feature">
                                <i class="fas fa-mobile-alt fa-2x mb-2"></i>
                                <h5>Tecnología NFC</h5>
                                <p>Cuenta con un chip NFC NTAG 213 con una memoria total de 180 bytes, el chip más
                                    versátil y adecuado para este uso.</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product-feature">
                                <i class="fas fa-lock fa-2x mb-2"></i>
                                <h5>Datos seguros</h5>
                                <p>Tu información personal está segura en nuestra base de datos totalmente encriptada.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product-feature">
                                <i class="fas fa-check-circle fa-2x mb-2"></i>
                                <h5>Compatibilidad</h5>
                                <p>Compatible con todos los dispositivos Apple y Android del mercado.</p>
                            </div>
                        </div>
                    </div>
                    <!-- Cambiar botón 'Tienda' para apuntar a tienda.php -->
                    <a href="tienda.php" class="btn btn-primary-yellow btn-lg d-block mx-auto">Tienda</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Sustainability Section -->
    <section class="sustainability-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 mx-auto" data-aos="fade-up">
                    <h2 class="section-heading text-center mb-5">
                        Nuestro Compromiso con la <span class="highlight-yellow">Sostenibilidad</span>
                    </h2>
                    <p class="lead text-center text-muted mb-5">
                        En QRescueID, estamos comprometidos no solo con la seguridad de nuestros usuarios, sino también
                        con la salud de nuestro planeta. Es por eso que hemos rediseñado nuestro packaging para que sea
                        completamente sostenible y respetuoso con el medio ambiente.
                    </p>
                    <div class="row g-4">
                        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
                            <div class="sustainability-card text-center">
                                <i class="fas fa-leaf fa-3x mb-3"></i>
                                <h5>Materiales Biodegradables</h5>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
                            <div class="sustainability-card text-center">
                                <i class="fas fa-palette fa-3x mb-3"></i>
                                <h5>Tintas Ecológicas</h5>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
                            <div class="sustainability-card text-center">
                                <i class="fas fa-recycle fa-3x mb-3"></i>
                                <h5>Reciclado y Reciclable</h5>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
                            <div class="sustainability-card text-center">
                                <i class="fas fa-heart fa-3x mb-3"></i>
                                <h5>Conciencia Ambiental</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" style="padding: 8rem 0;">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
                    <h2 class="cta-title mb-4">
                        Activa tu QRescueID hoy y ten tranquilidad en tus aventuras.
                    </h2>
                    <a href="contact.php" class="btn btn-dark-blue btn-lg">Comenzar ahora</a>
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
            AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle=\"tooltip\"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });

            // Billing Toggle Functionality
            const toggleButtons = document.querySelectorAll('.billing-toggle-btn');
            const priceAmounts = document.querySelectorAll('.price-amount[data-monthly]');
            const pricePeriods = document.querySelectorAll('.price-period[data-monthly]');

            toggleButtons.forEach(button => {
                button.addEventListener('click', function () {
                    // Update active state
                    toggleButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const period = this.dataset.period;

                    // Update prices
                    priceAmounts.forEach(element => {
                        if (period === 'monthly') {
                            element.textContent = element.dataset.monthly;
                        } else {
                            element.textContent = element.dataset.annual;
                        }
                    });

                    // Update periods
                    pricePeriods.forEach(element => {
                        if (period === 'monthly') {
                            element.textContent = element.dataset.monthly;
                        } else {
                            element.textContent = element.dataset.annual;
                        }
                    });
                });
            });
        });
    </script>
</body>

</html>