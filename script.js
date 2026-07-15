/* =========================================================
   SPE — Sistemas Para Empresas
   JavaScript principal (vanilla JS)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: cambia de estilo al hacer scroll ---------- */
  const navbar = document.getElementById('mainNav');
  const toggleNavbarStyle = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('spe-navbar-scrolled');
    } else {
      navbar.classList.remove('spe-navbar-scrolled');
    }
  };
  toggleNavbarStyle();
  window.addEventListener('scroll', toggleNavbarStyle, { passive: true });

  /* ---------- Cierra el menú móvil al elegir una opción ---------- */
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link, .btn') : [];
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Animación al hacer scroll (reveal) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-reveal-delay') || 0;
        setTimeout(() => entry.target.classList.add('spe-revealed'), Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Botón "volver arriba" ---------- */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('spe-visible', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Validación y envío del formulario de contacto ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Simulación de envío (sin backend conectado).
      // Aquí se puede integrar EmailJS, Formspree o un endpoint propio.
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando... <i class="bi bi-arrow-repeat"></i>';

      setTimeout(() => {
        formSuccess.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        setTimeout(() => formSuccess.classList.add('d-none'), 6000);
      }, 900);
    });
  }

});
