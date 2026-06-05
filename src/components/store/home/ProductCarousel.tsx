import type {Product} from "../../../types";
import {ProductCard} from "../shop/ProductCard.tsx";

interface Props {
    products: Product[];
    onAdd: (product: Product) => void;
    /** Segundos que tarda en recorrer todos los productos una vez. Por defecto 20s */
    speed?: number;
}

/**
 * Carrusel automático de productos tipo marquee.
 * - Sin selectores ni controles visibles.
 * - Una sola fila que se adapta a todas las pantallas.
 * - Se pausa al pasar el cursor encima.
 * - Loop infinito: duplica los items internamente.
 */
export const ProductCarousel = ({products, onAdd, speed = 20}: Props) => {
    if (!products.length) return null;

    // Duplicamos los items para crear el efecto de loop infinito.
    // El marquee recorre el -50% del total (= el primer grupo completo).
    const items = [...products, ...products];

    // Calculamos la duración: base de 20s + 4s por cada producto extra
    // para que el movimiento no sea ni muy rápido ni muy lento
    const duration = `${speed + products.length * 2}s`;

    return (
        <div
            className="overflow-hidden w-full"
            // Al hacer hover pausamos la animación
            style={{'--marquee-duration': duration} as React.CSSProperties}
        >
            <div
                className="flex gap-4 animate-marquee w-max [animation-play-state:running] hover:[animation-play-state:paused]"
            >
                {items.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        className="w-52 sm:w-60 shrink-0"
                    >
                        <ProductCard
                            product={product}
                            onAdd={() => onAdd(product)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

