<?php
// Datos Simulados (Mock Data)
$workerData = [
	'name' => 'Eduardo Jofré',
	'position' => 'Jefe de Brigada',
	'company' => 'Arauco',
	'company_logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Arauco_logo.svg/2560px-Arauco_logo.svg.png', // Logo Arauco
	'qrescue_logo' => 'img/logo-qrescue-dark.png', // Usar logo local si existe o placeholder
	'photo' => 'https://randomuser.me/api/portraits/men/32.jpg',
	'age' => 42,
	'country' => 'Chile',
	'gender' => 'Masculino',
	'emergency_info' => [
		'rut' => '12.345.678-9',
		'dob' => '01/05/1982',
		'blood_type' => 'A+',
		'allergies' => 'Penicilina',
		'diseases' => 'Diabetes Tipo 1',
		'medications' => 'Insulina',
		'implants' => 'Marcapasos',
		'donor' => 'Sí',
		'insurance' => 'Fonasa', // Isapre/Fonasa
		'policy' => 'FNS-123456',
		'address' => 'La Florida, Santiago',
		'observations' => 'Carnet de identificación médica en cartera.'
	],
	'contacts' => [
		['name' => 'María Jofré', 'relation' => 'Esposa', 'phone' => '+56 9 1234 5678'],
		['name' => 'Carlos Jofré', 'relation' => 'Hermano', 'phone' => '+56 9 8765 4321']
	],
	'epp' => [
		['name' => 'Casco de Seguridad', 'status' => 'Vigente', 'icon' => 'fa-helmet-safety'],
		['name' => 'Protección Auditiva', 'status' => 'Vigente', 'icon' => 'fa-ear-listen'],
		['name' => 'Lentes de Seguridad', 'status' => 'Vigente', 'icon' => 'fa-glasses'],
		['name' => 'Guantes de Cabritilla', 'status' => 'Vigente', 'icon' => 'fa-hands'],
		['name' => 'Zapatos de Seguridad', 'status' => 'Por Vencer', 'icon' => 'fa-shoe-prints', 'warning' => true],
		['name' => 'Silbato de Emergencia', 'status' => 'No Entregado', 'icon' => 'fa-bullhorn', 'missing' => true]
	],
	'certifications' => [
		['name' => 'Trabajo en Altura', 'status' => 'Habilitado', 'date' => 'Vence: Dic 2025'],
		['name' => 'Primeros Auxilios', 'status' => 'Habilitado', 'date' => 'Vence: Mar 2026'],
		['name' => 'Manejo de Extintores', 'status' => 'Habilitado', 'date' => 'Vence: Jun 2025']
	]
];
?>

<div class="demo-scan-container my-5" x-data="{ 
	openSection: null,
	toggle(section) { 
		this.openSection = this.openSection === section ? null : section;
	}
}">
	<div class="row">
		<div class="col-lg-8 mx-auto text-center mb-5">
			<span class="badge bg-warning text-dark mb-2">Simulación Interactiva</span>
			<h2 class="section-heading mb-3">Escaneo en Vivo: <span class="highlight-yellow">Perfil de Trabajador</span>
			</h2>
			<p class="text-light">Experimente exactamente lo que vería un paramédico o supervisor al escanear el casco
				de un trabajador.</p>
		</div>
	</div>

	<div class="row justify-content-center">
		<div class="col-md-6 col-lg-4">
			<!-- Mobile Device Frame Wrapper -->
			<div class="mobile-frame-wrapper">
				<div class="mobile-frame shadow-lg">
					<!-- Top Bar Simulated -->
					<div
						class="mobile-header d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
						<div class="brand-logo text-dark fw-bold" style="font-size: 1.2rem;">Qrescue<span
								style="color: #0dcaf0;">id</span></div>
						<div class="text-uppercase fw-bold text-muted small"
							style="border: 1px dashed #ccc; padding: 2px 5px; border-radius: 4px;">TU LOGO AQUÍ</div>
					</div>

					<!-- Worker Profile Header -->
					<div class="profile-header text-center p-4 bg-white">
						<div class="profile-photo-container mb-3 position-relative d-inline-block">
							<img src="<?php echo $workerData['photo']; ?>" alt="<?php echo $workerData['name']; ?>"
								class="rounded-circle border border-3 border-light shadow-sm"
								style="width: 120px; height: 120px; object-fit: cover;">
							<div class="verification-badge"><i class="fas fa-check-circle text-success"></i></div>
						</div>
						<h4 class="text-dark fw-bold mb-1">
							<?php echo $workerData['name']; ?>
						</h4>
						<div class="badge bg-secondary text-uppercase px-3 py-2 mb-3">
							<?php echo $workerData['position']; ?>
						</div>

						<!-- Mini Info Grid -->
						<div class="row g-2 text-start mt-2 border-top pt-3">
							<div class="col-6">
								<small class="text-muted d-block" style="font-size: 0.75rem;">EDAD</small>
								<strong class="text-dark">
									<?php echo $workerData['age']; ?> Años
								</strong>
							</div>
							<div class="col-6">
								<small class="text-muted d-block" style="font-size: 0.75rem;">PAÍS</small>
								<strong class="text-dark">
									<?php echo $workerData['country']; ?>
								</strong>
							</div>
						</div>
					</div>

					<!-- Accordion Sections -->
					<div class="mobile-body bg-light">

						<!-- 1. Información de Emergencia -->
						<div class="accordion-item-custom mb-2 shadow-sm">
							<button @click="toggle('emergency')"
								class="accordion-header-custom d-flex justify-content-between align-items-center w-100 p-3 border-0 text-white"
								:class="openSection === 'emergency' ? 'bg-dark-gray' : 'bg-dark-gray'">
								<div class="d-flex align-items-center gap-2">
									<i class="fas fa-heartbeat text-danger"></i>
									<span class="fw-bold">Información de emergencia</span>
								</div>
								<i class="fas" :class="openSection === 'emergency' ? 'fa-minus' : 'fa-plus'"></i>
							</button>
							<div x-show="openSection === 'emergency'" x-collapse class="accordion-content bg-white p-3">
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-id-card text-muted" style="width: 20px;"></i>
										<small class="text-muted fw-bold">RUT / DNI</small>
									</div>
									<div class="ps-4 text-dark">
										<?php echo $workerData['emergency_info']['rut']; ?>
									</div>
								</div>
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-droplet text-danger" style="width: 20px;"></i>
										<small class="text-muted fw-bold">Grupo Sanguíneo</small>
									</div>
									<div class="ps-4 text-dark fw-bold">
										<?php echo $workerData['emergency_info']['blood_type']; ?>
									</div>
								</div>
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-file-medical text-warning" style="width: 20px;"></i>
										<small class="text-muted fw-bold">Alergias</small>
									</div>
									<div class="ps-4 text-danger fw-bold">
										<?php echo $workerData['emergency_info']['allergies']; ?>
									</div>
								</div>
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-notes-medical text-muted" style="width: 20px;"></i>
										<small class="text-muted fw-bold">Enfermedades Crónicas</small>
									</div>
									<div class="ps-4 text-dark">
										<?php echo $workerData['emergency_info']['diseases']; ?>
									</div>
								</div>
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-pills text-info" style="width: 20px;"></i>
										<small class="text-muted fw-bold">Medicamentos</small>
									</div>
									<div class="ps-4 text-dark">
										<?php echo $workerData['emergency_info']['medications']; ?>
									</div>
								</div>
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-heart-pulse text-secondary" style="width: 20px;"></i>
										<small class="text-muted fw-bold">Implantes</small>
									</div>
									<div class="ps-4 text-dark">
										<?php echo $workerData['emergency_info']['implants']; ?>
									</div>
								</div>
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-hand-holding-heart text-danger" style="width: 20px;"></i>
										<small class="text-muted fw-bold">Donante</small>
									</div>
									<div class="ps-4 text-dark fw-bold">
										<?php echo $workerData['emergency_info']['donor']; ?>
									</div>
								</div>
								<div class="info-row mb-2 pb-2 border-bottom border-light">
									<div class="d-flex align-items-center gap-2 mb-1">
										<i class="fas fa-briefcase-medical text-primary" style="width: 20px;"></i>
										<small class="text-muted fw-bold">Previsión</small>
									</div>
									<div class="ps-4 text-dark">
										<?php echo $workerData['emergency_info']['insurance']; ?>
									</div>
								</div>
							</div>
						</div>

						<!-- 2. Contactos de Emergencia -->
						<div class="accordion-item-custom mb-2 shadow-sm">
							<button @click="toggle('contacts')"
								class="accordion-header-custom d-flex justify-content-between align-items-center w-100 p-3 border-0 text-white bg-danger">
								<div class="d-flex align-items-center gap-2">
									<i class="fas fa-phone-volume"></i>
									<span class="fw-bold">Contactos de emergencia</span>
								</div>
								<i class="fas" :class="openSection === 'contacts' ? 'fa-minus' : 'fa-plus'"></i>
							</button>
							<div x-show="openSection === 'contacts'" x-collapse class="accordion-content bg-white p-3">
								<?php foreach ($workerData['contacts'] as $contact): ?>
									<div class="contact-card p-2 mb-2 bg-light rounded border border-light">
										<div class="fw-bold text-dark">
											<?php echo $contact['name']; ?>
										</div>
										<div class="small text-muted mb-1">
											<?php echo $contact['relation']; ?>
										</div>
										<a href="#" class="btn btn-sm btn-outline-danger w-100"><i
												class="fas fa-phone me-2"></i>Llamar</a>
									</div>
								<?php endforeach; ?>
							</div>
						</div>

						<!-- 3. EPP del Brigadista -->
						<div class="accordion-item-custom mb-2 shadow-sm">
							<button @click="toggle('epp')"
								class="accordion-header-custom d-flex justify-content-between align-items-center w-100 p-3 border-0 text-white bg-primary">
								<div class="d-flex align-items-center gap-2">
									<i class="fas fa-helmet-safety"></i>
									<span class="fw-bold">EPP del Brigadista</span>
								</div>
								<i class="fas" :class="openSection === 'epp' ? 'fa-minus' : 'fa-plus'"></i>
							</button>
							<div x-show="openSection === 'epp'" x-collapse class="accordion-content bg-white p-3">
								<?php foreach ($workerData['epp'] as $epp): ?>
									<div
										class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-light">
										<div class="d-flex align-items-center gap-2">
											<i
												class="fas <?php echo $epp['icon']; ?> <?php echo isset($epp['missing']) ? 'text-danger' : 'text-primary'; ?>"></i>
											<span class="text-dark small fw-bold">
												<?php echo $epp['name']; ?>
											</span>
										</div>
										<?php if (isset($epp['warning'])): ?>
											<span class="badge bg-warning text-dark" style="font-size: 0.65rem;">Por
												Vencer</span>
										<?php elseif (isset($epp['missing'])): ?>
											<span class="badge bg-danger" style="font-size: 0.65rem;"><i
													class="fas fa-times me-1"></i>No Entregado</span>
										<?php else: ?>
											<span class="badge bg-success" style="font-size: 0.65rem;"><i
													class="fas fa-check me-1"></i>OK</span>
										<?php endif; ?>
									</div>
								<?php endforeach; ?>
							</div>
						</div>

						<!-- 4. Habilitación Profesional -->
						<div class="accordion-item-custom mb-2 shadow-sm">
							<button @click="toggle('certifications')"
								class="accordion-header-custom d-flex justify-content-between align-items-center w-100 p-3 border-0 text-white bg-success">
								<div class="d-flex align-items-center gap-2">
									<i class="fas fa-certificate"></i>
									<span class="fw-bold">Habilitación Profesional</span>
								</div>
								<i class="fas" :class="openSection === 'certifications' ? 'fa-minus' : 'fa-plus'"></i>
							</button>
							<div x-show="openSection === 'certifications'" x-collapse
								class="accordion-content bg-white p-3">
								<?php foreach ($workerData['certifications'] as $cert): ?>
									<div
										class="certification-card mb-2 p-2 bg-light rounded border-start border-4 border-success">
										<div class="d-flex justify-content-between">
											<span class="text-dark fw-bold small">
												<?php echo $cert['name']; ?>
											</span>
											<i class="fas fa-check-circle text-success"></i>
										</div>
										<div class="text-muted" style="font-size: 0.7rem;">
											<?php echo $cert['date']; ?>
										</div>
									</div>
								<?php endforeach; ?>
							</div>
						</div>

					</div>

					<!-- Footer Simulated -->
					<div class="mobile-footer p-3 bg-dark text-center">
						<small class="text-light" style="font-size: 0.7rem;">&copy; 2025 QRescueID. Todos los derechos
							reservados.</small>
					</div>

				</div>
			</div>

			<!-- Contextual Help -->
			<div class="text-center mt-4">
				<p class="text-muted small mb-3"><i class="fas fa-hand-pointer me-2 animate-bounce"></i>Interactúa con
					las secciones para ver detalles</p>
				<div class="d-grid gap-2">
					<a href="https://wa.me/56954751380?text=Hola,%20me%20interesa%20conocer%20mas%20sobre%20QRescueID%20para%20empresas"
						target="_blank" class="btn btn-primary-yellow"><i class="fab fa-whatsapp me-2"></i>Contacto</a>
				</div>
			</div>

		</div>
	</div>
</div>

<style>
	/* Estilos específicos para la demo - Scopedish */
	.mobile-frame-wrapper {
		width: 100%;
		max-width: 380px;
		margin: 0 auto;
		border-radius: 20px;
		overflow: hidden;
		border: 8px solid #333;
		background-color: #fff;
	}

	.mobile-frame {
		background-color: #f8f9fa;
		min-height: 600px;
	}

	.bg-dark-gray {
		background-color: #4a4a4a;
	}

	.accordion-header-custom {
		text-align: left;
		transition: background-color 0.2s;
		cursor: pointer;
	}

	.accordion-header-custom:hover {
		filter: brightness(1.1);
	}

	.verification-badge {
		position: absolute;
		bottom: 0;
		right: 0;
		background: white;
		border-radius: 50%;
		padding: 2px;
	}

	/* Animations */
	@keyframes bounce {

		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-5px);
		}
	}

	.animate-bounce {
		animation: bounce 2s infinite;
	}
</style>

<!-- Alpine.js CDN -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>