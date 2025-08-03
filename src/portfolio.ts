import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Seleccionar los elementos de la galería
const galleryItems = gsap.utils.toArray<HTMLElement>('.gallery-item');
const gallery = document.querySelector<HTMLElement>('#portfolio-gallery');
const header = document.querySelector<HTMLElement>('#header');

// Crear la línea de tiempo de la animación
if (gallery && galleryItems.length > 1) {
    // El primer elemento es visible por defecto, el resto se oculta.
    gsap.set(galleryItems[0], {z: 0, autoAlpha: 1});
    gsap.set(galleryItems.slice(1), {z: -2000, autoAlpha: 0});
    const headerHeight = header ? header.offsetHeight : 80;

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: gallery,
            start: `top top+=${headerHeight}px`,
            end: () => `+=${(galleryItems.length - 1) * window.innerHeight}`,
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
        },
    });
    // Animar la secuencia de entrada y salida
    galleryItems.forEach((item, index) => {
        if (index === 0) return; // El primer item ya está visible

        const prevItem = galleryItems[index - 1];

        // 1. Posicionar el item actual fuera de la pantalla
        gsap.set(item, {
            xPercent: index % 2 === 0 ? 150 : -150,
            rotationY: index % 2 === 0 ? -45 : 45,
        });

        // 2. Animar el item actual hacia el centro
        timeline.to(item, {
            xPercent: 0,
            rotationY: 0,
            z: 0,
            autoAlpha: 1,
            duration: 1,
        }, '>-=0.5'); // Solapar ligeramente con la animación anterior

        // 3. Animar el item PREVIO para que salga
        timeline.to(prevItem, {
            z: -1000,
            autoAlpha: 0,
            duration: 1,
        }, '<'); // '<' hace que empiece al mismo tiempo que la animación anterior
    });
    if (galleryItems.length > 0) {
        timeline.to(galleryItems[galleryItems.length - 1], {
            z: -1000,
            autoAlpha: 0,
            duration: 1,
        }, '>-=0.5'); // Inicia un poco antes de que termine la animación anterior
    }
} else if (galleryItems.length > 0) {
    // Si solo hay un item, simplemente mostrarlo.
    gsap.set(galleryItems[0], {z: 0, autoAlpha: 1});
}