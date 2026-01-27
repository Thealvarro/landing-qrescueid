<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>QRescueID Empresas - Gestión de Seguridad Ocupacional y Control de EPP</title>
	<meta name="description"
		content="Plataforma de gestión de seguridad ocupacional para empresas. Control de EPP, identificación de trabajadores con QR/NFC y trazabilidad en seguridad industrial digital.">
	<meta name="keywords"
		content="gestión de seguridad ocupacional, plataforma de seguridad laboral, control de EPP, identificación de trabajadores con QR, seguridad industrial digital, trazabilidad en seguridad, prevención de riesgos minería, seguridad construcción">

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
	<style>
		.hero-section-empresas {
			background: linear-gradient(rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9)), url('img/construccion-hero.jpg');
			background-size: cover;
			background-position: center;
		}

		.process-step {
			position: relative;
			padding: 2rem;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 12px;
			height: 100%;
			transition: all 0.3s ease;
		}

		.process-step:hover {
			transform: translateY(-5px);
			border-color: var(--golden-yellow);
		}

		.step-number {
			font-size: 3rem;
			font-weight: 800;
			color: var(--golden-yellow);
			opacity: 0.2;
			position: absolute;
			top: 10px;
			right: 20px;
		}

		.data-list li {
			margin-bottom: 1rem;
			display: flex;
			align-items: center;
			color: var(--text-light);
		}

		.data-list li i {
			color: var(--golden-yellow);
			margin-right: 1rem;
			width: 20px;
			text-align: center;
		}

		.impact-card {
			border-left: 4px solid var(--golden-yellow);
			background: rgba(255, 255, 255, 0.03);
			padding: 2rem;
			height: 100%;
		}
	</style>
</head>

<body>
	<!-- WhatsApp Floating Button -->
	<a href="https://wa.me/56954751380" target="_blank" class="whatsapp-float" data-bs-toggle="tooltip"
		title="Hablar con un especialista">
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
						<a class="nav-link active" href="empresas.php">Empresas</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="tienda.php">Tienda</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="contact.php">Contacto</a>
					</li>
					<li class="nav-item ms-3">
						<a href="contact.php" class="btn btn-primary-yellow">Crear cuenta</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="hero-section hero-section-empresas">
		<div class="container">
			<div class="row align-items-center min-vh-100">
				<div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
					<h1 class="hero-title mb-4">
						Control Total y Trazabilidad en Seguridad Industrial Digital
					</h1>
					<p class="hero-subtitle mb-5">
						Centralice la gestión de seguridad ocupacional. QRescueID transforma la identificación de sus
						trabajadores en una potente herramienta de control de EPP, certificaciones y respuesta ante
						emergencias.
					</p>
					<div class="d-flex gap-3 justify-content-center">
						<a href="contact.php" class="btn btn-primary-yellow btn-lg">Solicitar Información</a>

					</div>
				</div>
			</div>
		</div>
		<div class="hero-background hero-background-empresas"></div>
	</section>

	<!-- Qué es para empresas -->
	<section class="why-section">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
					<h2 class="section-heading mb-4">
						Más que un código QR: <br>
						<span class="highlight-yellow">Plataforma Integral</span>
					</h2>
					<p class="lead mb-4">
						QRescueID es el puente digital entre sus trabajadores y la gestión centralizada de seguridad.
					</p>
					<p class="mb-4">
						Validación en tiempo real de competencias, EPP e información médica crítica para una operación
						segura.
					</p>
					<p class="mb-0">
						<strong>Visibilidad total. Control absoluto.</strong>
					</p>
				</div>
				<div class="col-lg-6" data-aos="fade-left">
					<div class="image-container d-flex justify-content-center">
						<!-- Dashboard Imagen Real -->
						<img src="img/Photoroom_20250929_150344.jpg" alt="Dashboard de Gestión QRescueID"
							class="img-fluid rounded-4 border border-secondary border-opacity-25"
							style="width: 100%; height: auto;">
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Stats Section -->
	<section class="stats-section">
		<div class="container">
			<div class="row">
				<div class="col-md-6" data-aos="zoom-in">
					<div class="stat-item">
						<span class="stat-number" data-target="2500">0</span>
						<span class="stat-text">Trabajadores usando QRescueID</span>
					</div>
				</div>
				<div class="col-md-6" data-aos="zoom-in" data-aos-delay="200">
					<div class="stat-item">
						<span class="stat-number" data-target="2">0</span>
						<span class="stat-text">Años en el mercado</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Cómo Funciona (Paso a Paso) -->
	<section class="explore-section">
		<div class="container">
			<div class="row mb-5">
				<div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
					<h2 class="section-heading">Integración Operativa Simplificada</h2>
					<p class="text-muted">Implementación rápida sin interrumpir faenas</p>
				</div>
			</div>
			<div class="row g-4">
				<div class="col-md-3" data-aos="fade-up" data-aos-delay="100">
					<div class="process-step">
						<span class="step-number">01</span>
						<i class="fas fa-users-cog fa-2x text-warning mb-3"></i>
						<h5>Registro Digital</h5>
						<p class="small text-light">Carga masiva de trabajadores y perfiles en la plataforma
							centralizada.</p>
					</div>
				</div>
				<div class="col-md-3" data-aos="fade-up" data-aos-delay="200">
					<div class="process-step">
						<span class="step-number">02</span>
						<i class="fas fa-qrcode fa-2x text-warning mb-3"></i>
						<h5>Asignación ID</h5>
						<p class="small text-light">Entrega y vinculación del dispositivo físico QR/NFC único por
							trabajador.</p>
					</div>
				</div>
				<div class="col-md-3" data-aos="fade-up" data-aos-delay="300">
					<div class="process-step">
						<span class="step-number">03</span>
						<i class="fas fa-helmet-safety fa-2x text-warning mb-3"></i>
						<h5>Instalación EPP</h5>
						<p class="small text-light">El dispositivo se adhiere al casco con resistencia industrial para
							ambientes hostiles.</p>
					</div>
				</div>
				<div class="col-md-3" data-aos="fade-up" data-aos-delay="400">
					<div class="process-step">
						<span class="step-number">04</span>
						<i class="fas fa-mobile-screen-button fa-2x text-warning mb-3"></i>
						<h5>Gestión & Control</h5>
						<p class="small text-light">Escaneo para verificación de credenciales, emergencias y auditoría
							de EPP.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Simulación Interactiva -->
	<section class="demo-section py-5" style="background-color: #1a2236;">
		<div class="container">
			<?php include 'empresas/demo-escaneo.php'; ?>
		</div>
	</section>

	<!-- Información que gestiona -->
	<section class="sustainability-section">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-5 order-lg-2" data-aos="fade-left">
					<!-- Placeholder para imagen de ficha técnica digital -->
					<!-- Imagen de Notificaciones Dashboard -->
					<div class="mb-4 mb-lg-0">
						<img src="img/notificaciones-dashboard.jpg" alt="Ficha Digital y Notificaciones"
							class="img-fluid rounded-4 shadow-lg border border-secondary border-opacity-25"
							style="width: 100%; height: auto;">
					</div>
				</div>
				<div class="col-lg-7 order-lg-1" data-aos="fade-right">
					<h2 class="section-heading mb-4">¿Qué gestiona nuestra plataforma?</h2>
					<p class="mb-4">Centralice toda la información crítica para la prevención de riesgos y recursos
						humanos en un solo lugar accesible vía escaneo.</p>

					<div class="row">
						<div class="col-md-6">
							<ul class="list-unstyled data-list">
								<li><i class="fas fa-heartbeat"></i> Información Médica de Emergencia</li>
								<li><i class="fas fa-briefcase"></i> Cargo, Rol y Departamento</li>
								<li><i class="fas fa-hard-hat"></i> Listado de EPP Asignados</li>
								<li><i class="fas fa-history"></i> Historial de Recambio de EPP</li>
							</ul>
						</div>
						<div class="col-md-6">
							<ul class="list-unstyled data-list">
								<li><i class="fas fa-certificate"></i> Cursos y Capacitaciones</li>
								<li><i class="fas fa-check-circle"></i> Certificaciones y Habilitaciones</li>
								<li><i class="fas fa-traffic-light"></i> Estado de Cumplimiento (Semáforo)</li>
								<li><i class="fas fa-route"></i> Trazabilidad de Accesos</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Impacto y Beneficios -->
	<section class="confian-section">
		<div class="container">
			<div class="row mb-5">
				<div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
					<h2 class="section-heading">Impacto Estratégico en la Organización</h2>
				</div>
			</div>
			<div class="row g-4">
				<div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
					<div class="impact-card">
						<i class="fas fa-server fa-2x text-warning mb-3"></i>
						<h4>Centralización</h4>
						<p class="text-light small">Elimine las planillas dispersas. Toda la documentación de seguridad
							y EPP unificada y disponible 24/7 para jefaturas y prevencionistas.</p>
					</div>
				</div>
				<div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
					<div class="impact-card">
						<i class="fas fa-file-contract fa-2x text-warning mb-3"></i>
						<h4>Reducción de Riesgo</h4>
						<p class="text-light small">Minimice errores humanos y brechas de información. Asegure que cada
							trabajador tenga sus certificaciones al día antes de iniciar tareas.</p>
					</div>
				</div>
				<div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
					<div class="impact-card">
						<i class="fas fa-stopwatch fa-2x text-warning mb-3"></i>
						<h4>Eficiencia Operativa</h4>
						<p class="text-light small">Acelere los procesos de auditoría en terreno y respuesta ante
							emergencias. Información vital accesible en segundos, no en horas.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Mensaje Final -->
	<section class="final-cta-section">
		<div class="container">
			<div class="row">
				<div class="col-lg-10 mx-auto text-center" data-aos="zoom-in">
					<h3 class="mb-4 text-white" style="font-weight: 300; font-style: italic;">
						"La tecnología bien aplicada no solo protege personas, también optimiza la gestión y fortalece
						el
						liderazgo en seguridad."
					</h3>
					<div class="mt-5">
						<h2 class="section-heading mb-4">Lleve su gestión de seguridad al siguiente nivel</h2>
						<a href="https://wa.me/56954751380?text=Hola,%20quisiera%20agendar%20una%20consultoria%20sobre%20QRescueID%20para%20empresas"
							target="_blank" class="btn btn-primary-yellow btn-lg px-5"><i
								class="fab fa-whatsapp me-2"></i>Hablar con un consultor</a>
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
						Plataforma líder en gestión de identidad y seguridad ocupacional.
					</p>
				</div>
				<div class="col-md-6 text-md-end">
					<h5 class="mb-3">Enlaces</h5>
					<ul class="footer-links list-unstyled">
						<li><a href="index.php">Inicio</a></li>
						<li><a href="empresas.php">Empresas</a></li>
						<li><a href="contact.php">Contacto</a></li>
						<li><a href="#">Privacidad de Datos</a></li>
						<li><a href="#">Soporte Corporativo</a></li>
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
	<script>
		// Counter Animation
		function animateCounters() {
			const counters = document.querySelectorAll('.stat-number');
			const speed = 200; // lower is slower

			counters.forEach(counter => {
				const updateCount = () => {
					const target = +counter.getAttribute('data-target');
					const count = +counter.innerText;

					// Lower inc to slow and higher inc to fast
					const inc = Math.ceil(target / speed);

					if (count < target) {
						counter.innerText = count + inc;
						setTimeout(updateCount, 15);
					} else {
						counter.innerText = target + (target === 2500 ? '+' : '+');
					}
				};
				updateCount();
			});
		}

		// Trigger when visible
		const statsSection = document.querySelector('.stats-section');
		const observerOptions = {
			threshold: 0.5
		};

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateCounters();
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		if (statsSection) {
			observer.observe(statsSection);
		}
	</script>
</body>

</html>