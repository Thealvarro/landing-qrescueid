// Script clásico (no módulo) al inicio del <body>: corre antes del primer pintado y pone .pvbar-on
// si va a haber franja de preventa. Así el espacio de la franja queda reservado desde el comienzo
// y el contenido no se corre hacia abajo cuando preventa-ui.js la dibuja (CLS).
import { franjaVisible } from './franja-estado.js';

if (franjaVisible()) document.documentElement.classList.add('pvbar-on');
