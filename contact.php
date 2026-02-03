<!DOCTYPE html>
<html lang="es">

<head>
    <?php include 'google-analytics.php'; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - QRescueID</title>
    <meta name="description"
        content="Contáctanos - QRescueID. Estamos aquí para ayudarte con cualquier pregunta o consulta.">

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
    <link rel="stylesheet" href="styles.css?v=3">
    <link rel="icon" href="img/favicon.ico">
    <!-- Desarrollado por www.alvarocofre.dev -->
</head>

<body>
    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/56954751380" target="_blank" class="whatsapp-float" data-bs-toggle="tooltip"
        title="Habla con nosotros">
        <i class="fab fa-whatsapp"></i>
    </a>


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
                        <a class="nav-link highlight" href="empresas.php">Empresas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="tienda.php">Tienda</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.php">Contacto</a>
                    </li>
                    <li class="nav-item ms-3">
                        <a href="https://plataforma.qrescueid.app" class="btn btn-primary-yellow">Crear cuenta</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contact Hero Section -->
    <section class="contact-hero-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center py-lg-5 mt-lg-5" data-aos="fade-up">
                    <h1 class="display-4 fw-bold mb-3 mt-4 mt-lg-0">Hablemos ahora</h1>
                    <p class="lead text-muted">
                        Elige el canal que te sea más rápido para contactarnos. Sin formularios largos.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Actions Section -->
    <section class="contact-actions-section pb-5 mb-5">
        <div class="container">
            <div class="row g-4 justify-content-center">

                <!-- WhatsApp Action (Priority) -->
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
                    <a href="https://wa.me/56954751380?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20QRescueID%20para%20empresas"
                        target="_blank"
                        class="card action-card bg-success text-white text-decoration-none h-100 border-0 shadow-lg text-center p-4">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center">
                            <div class="icon-mb mb-3">
                                <i class="fab fa-whatsapp fa-4x"></i>
                            </div>
                            <h3 class="fw-bold mb-2">Hablar por WhatsApp</h3>
                            <span class="badge bg-white text-success rounded-pill px-3 py-2 mb-3">Respuesta
                                rápida</span>
                            <p class="small opacity-75 mb-0">Clic para abrir chat directo</p>
                        </div>
                    </a>
                </div>

                <!-- Schedule Call -->
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                    <a href="https://calendar.app.google/fWgoGk32DYdEpF7NA" target="_blank"
                        class="card action-card bg-primary text-white text-decoration-none h-100 border-0 shadow text-center p-4">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center">
                            <div class="icon-mb mb-3">
                                <i class="fas fa-calendar-check fa-4x"></i>
                            </div>
                            <h3 class="fw-bold mb-2">Agendar llamada</h3>
                            <p class="mb-0 small text-white-50">15 minutos</p>
                            <span class="btn btn-sm btn-light text-primary mt-3 px-4 rounded-pill">Ver
                                disponibilidad</span>
                        </div>
                    </a>
                </div>

                <!-- Email -->
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
                    <a href="mailto:acofre@qrescue.cl?subject=Consulta%20QRescueID&body=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n."
                        class="card action-card bg-white text-dark text-decoration-none h-100 border shadow-sm text-center p-4">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center">
                            <div class="icon-mb mb-3 text-secondary">
                                <i class="fas fa-envelope fa-4x"></i>
                            </div>
                            <h3 class="fw-bold mb-2">Enviar correo</h3>
                            <p class="mb-0 small text-muted">Contacto directo</p>
                            <span class="btn btn-sm btn-outline-dark mt-3 px-4 rounded-pill">Redactar email</span>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </section>

    <!-- Styles for Hover Effects -->
    <style>
        .action-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .action-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175) !important;
        }
    </style>


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
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });
    </script>
</body>

</html>