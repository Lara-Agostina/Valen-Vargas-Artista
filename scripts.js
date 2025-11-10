// app.js

// 1. Funcionalidad de Menú Móvil
document.getElementById('mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    // Esto requiere el CSS para ocultar/mostrar .nav-links en móviles
});

// 2. Animación de Scroll (Opcional pero muy profesional)
// Muestra la barra de navegación con un fondo sólido al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// (Requiere añadir .scrolled { background-color: rgba(0,0,0,0.9); } en CSS)

// 3. Smooth Scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});