import { useEffect, useRef, useState } from 'react';

interface UseFadeInOptions {
    threshold?: number;
    delay?: number;
}

/**
 * Hook para aplicar una animación de "fade-in" cuando un elemento entra en el viewport.
 * @param options - Opciones para el IntersectionObserver y el delay de la animación.
 * @returns Un ref para asignar al elemento y el estilo a aplicar.
 */
export const useFadeInOnScroll = (options: UseFadeInOptions = {}) => {
    const { threshold = 0.1, delay = 0 } = options;
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Dejar de observar una vez que es visible
                }
            },
            { threshold }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    const style = {
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    };

    return [elementRef, style] as const;
};