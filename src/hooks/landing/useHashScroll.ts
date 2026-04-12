import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personalizado que maneja el desplazamiento suave a un ancla (hash) en la URL.
 * Escucha los cambios en la ubicación y, si hay un hash, busca el elemento
 * correspondiente y se desplaza hacia él.
 */
export const useHashScroll = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Esperamos un breve momento para asegurarnos de que el DOM se haya actualizado
            // después del cambio de ruta, especialmente en la carga inicial de la página.
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                element?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [hash]); // El efecto se ejecuta cada vez que el hash cambia
};