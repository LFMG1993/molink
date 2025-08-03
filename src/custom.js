// Importamos el contenido HTML directamente como texto usando la sintaxis '?raw' de Vite.
import headerComponent from '/src/components/_header.html?raw';
import footerComponent from '/src/components/_footer.html?raw';
import Swiper from 'swiper';
import {Autoplay, Navigation} from "swiper/modules";

/** Función principal que inicializa todos los scripts de interactividad. */
function initializePageScripts() {
    "use strict";

    /** Header con Scroll */
    function handleHeaderScroll() {
        const header = document.querySelector('#header');
        if (!header) return;

        if (window.scrollY > 100) {
            header.classList.remove('bg-transparent');
            header.classList.add('bg-surface', 'shadow-lg');
        } else {
            header.classList.remove('bg-surface', 'shadow-lg');
            header.classList.add('bg-transparent');
        }
    }

    window.addEventListener('load', handleHeaderScroll);
    document.addEventListener('scroll', handleHeaderScroll);

    /** Menú de Navegación Móvil */
    const mobileNavToggleBtn = document.querySelector('#mobile-nav-toggle');
    const mobileNavMenu = document.querySelector('#mobile-nav-menu');
    if (mobileNavToggleBtn && mobileNavMenu) {
        mobileNavToggleBtn.addEventListener('click', () => {
            mobileNavMenu.classList.toggle('hidden');
            const icon = mobileNavToggleBtn.querySelector('i');
            icon.classList.toggle('bi-list');
            icon.classList.toggle('bi-x');
            document.body.classList.toggle('overflow-hidden');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavMenu.classList.add('hidden');
                const icon = mobileNavToggleBtn.querySelector('i');
                icon.classList.add('bi-list');
                icon.classList.remove('bi-x');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    /** Preloader */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('opacity-0', 'invisible');
            setTimeout(() => preloader.remove(), 500);
        });
    }

    /** Botón de Scroll-to-Top */
    const scrollTopBtn = document.querySelector('#scroll-top');
    if (scrollTopBtn) {
        const toggleScrollTop = () => {
            if (window.scrollY > 100) {
                scrollTopBtn.classList.remove('opacity-0', 'invisible');
                scrollTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollTopBtn.classList.remove('opacity-100', 'visible');
                scrollTopBtn.classList.add('opacity-0', 'invisible');
            }
        };
        window.addEventListener('load', toggleScrollTop);
        document.addEventListener('scroll', toggleScrollTop);
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    new Swiper('.services-carousel', {
        // Usar los módulos que necesitamos
        modules: [Navigation, Autoplay],
        // Configuración de la navegación con flechas
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Bucle infinito
        loop: true,
        autoplay: {
            delay: 2500, // Tiempo en milisegundos entre cada slide
            disableOnInteraction: false, // El autoplay no se detiene si el usuario interactúa
            pauseOnMouseEnter: true, // El autoplay se pausa si el cursor está sobre el carrusel
        },
        // Configuración responsiva
        breakpoints: {
            // Cuando la pantalla es >= 320px
            320: {
                slidesPerView: 1, // Se apilan en una columna
                spaceBetween: 30
            },
            // Cuando la pantalla es >= 768px (tablets)
            768: {
                slidesPerView: 2, // Muestra 2 tarjetas
                spaceBetween: 40
            },
            // Cuando la pantalla es >= 1024px (laptops)
            1024: {
                slidesPerView: 2, // Muestra 3 tarjetas
                spaceBetween: 40
            },
            // Cuando la pantalla es >= 1280px (pantallas más grandes)
            1280: {
                slidesPerView: 3, // Muestra 4 tarjetas
                spaceBetween: 40
            }
        }
    });

    /** Animaciones con Intersection Observer (Fade-in) */
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-5');
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});

    sections.forEach(section => {
        section.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(section);
    });

    /** Scrollspy para el menú de navegación */
    const navLinks = document.querySelectorAll('#navmenu a[href^="/#"]');
    const scrollSpy = () => {
        const fromTop = window.scrollY + 150;
        navLinks.forEach(link => {
            const sectionId = link.hash;
            if (!sectionId) return;
            const section = document.querySelector(sectionId);
            if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                navLinks.forEach(l => l.classList.remove('text-accent'));
                link.classList.add('text-accent');
            } else {
                link.classList.remove('text-accent');
            }
        });
    };
    window.addEventListener('load', scrollSpy);
    document.addEventListener('scroll', scrollSpy);
}


/** Punto de Entrada Principal de la Aplicación */
document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.querySelector('#header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.outerHTML = headerComponent;
    }

    const footerPlaceholder = document.querySelector('#footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = footerComponent;
    }
    initializePageScripts();
});