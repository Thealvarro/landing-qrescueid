<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - QRescueID</title>
    <meta name="description" content="Contáctanos - QRescueID. Estamos aquí para ayudarte con cualquier pregunta o consulta.">
    
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

    <!-- Contact Hero Section -->
    <section class="contact-hero-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center py-5 mt-5" data-aos="fade-up">
                    <h1 class="section-heading mb-4">
                        Contáctanos
                    </h1>
                    <p class="lead text-muted">
                        ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Completa el formulario y te responderemos lo antes posible.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-form-section py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8" data-aos="fade-up">
                    <div class="contact-form-container">
                        <?php
                        // Procesar formulario
                        $mensaje_enviado = false;
                        $error = '';

                        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                            // Obtener datos del formulario
                            $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
                            $correo = isset($_POST['correo']) ? trim($_POST['correo']) : '';
                            $mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

                            // Validar campos
                            if (empty($nombre) || empty($correo) || empty($mensaje)) {
                                $error = 'Por favor, completa todos los campos.';
                            } elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                                $error = 'Por favor, ingresa un correo electrónico válido.';
                            } else {
                                // IMPORTANTE: Configurar email de destino
                                // Cambia 'contacto@qrescueid.com' por tu email real
                                $to = 'contacto@qrescueid.com';
                                $subject = 'Nuevo mensaje de contacto - QRescueID';
                                $email_message = "Nombre: " . htmlspecialchars($nombre) . "\n";
                                $email_message .= "Correo: " . htmlspecialchars($correo) . "\n\n";
                                $email_message .= "Mensaje:\n" . htmlspecialchars($mensaje);
                                $headers = "From: " . htmlspecialchars($correo) . "\r\n";
                                $headers .= "Reply-To: " . htmlspecialchars($correo) . "\r\n";
                                $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

                                // Enviar email
                                if (mail($to, $subject, $email_message, $headers)) {
                                    $mensaje_enviado = true;
                                } else {
                                    $error = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por WhatsApp.';
                                }
                            }
                        }
                        ?>

                        <?php if ($mensaje_enviado): ?>
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <i class="fas fa-check-circle me-2"></i>
                                ¡Mensaje enviado con éxito! Te responderemos pronto.
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        <?php endif; ?>

                        <?php if ($error): ?>
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <i class="fas fa-exclamation-circle me-2"></i>
                                <?php echo htmlspecialchars($error); ?>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        <?php endif; ?>

                        <form method="POST" action="" class="contact-form">
                            <div class="mb-4">
                                <label for="nombre" class="form-label">Nombre completo</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" required 
                                       value="<?php echo isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : ''; ?>">
                            </div>

                            <div class="mb-4">
                                <label for="correo" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control" id="correo" name="correo" required 
                                       value="<?php echo isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : ''; ?>">
                            </div>

                            <div class="mb-4">
                                <label for="mensaje" class="form-label">Mensaje</label>
                                <textarea class="form-control" id="mensaje" name="mensaje" rows="6" required><?php echo isset($_POST['mensaje']) ? htmlspecialchars($_POST['mensaje']) : ''; ?></textarea>
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary-yellow btn-lg">
                                    <i class="fas fa-paper-plane me-2"></i>Enviar mensaje
                                </button>
                            </div>
                        </form>

                        <div class="text-center mt-4">
                            <p class="text-muted">O contáctanos directamente por WhatsApp</p>
                            <a href="https://wa.me/56954751380" target="_blank" class="btn btn-outline-yellow">
                                <i class="fab fa-whatsapp me-2"></i>Hablar por WhatsApp
                            </a>
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

