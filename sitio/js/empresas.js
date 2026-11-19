// Empresas: simulación interactiva de la ficha del trabajador (acordeón y botón Llamar de demostración).
const app = document.querySelector('.app-worker');
const secciones = [...document.querySelectorAll('[data-acc]')];
secciones.forEach(sec => {
  const boton = sec.querySelector('.acc-h');
  boton.addEventListener('click', () => {
    const abrir = !sec.classList.contains('open');
    secciones.forEach(s => {
      const si = s === sec && abrir;
      s.classList.toggle('open', si);
      s.querySelector('.acc-h').setAttribute('aria-expanded', String(si));
      s.querySelector('.acc-b').hidden = !si;
    });
    if (abrir) app.scrollTo({ top: sec.offsetTop - 70, behavior: 'smooth' });
  });
});

// En la demo no se marca a nadie: se explica qué pasaría en la ficha real
const toast = document.querySelector('.toast');
let timer;
document.querySelectorAll('.call').forEach(b => b.addEventListener('click', () => {
  toast.textContent = `En una ficha real, este botón llama a ${b.dataset.nombre}.`;
  toast.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(() => { toast.hidden = true; }, 2600);
}));
