import {createContext, useContext, useState, useEffect, type ReactNode, useCallback} from 'react';
import type {Product, VolumeDiscount} from '../types';

// El tipo CartItem refleja la estructura real de los datos.
export interface CartItem {
    productId: string;
    variantId: string;
    name: string;
    variantDescription: string;
    unitOfMeasure: string | null;
    volumeDiscounts: VolumeDiscount[];
    price: number; // Convertido a number para cálculos
    image_url: string | null;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity?: number, variantId?: string) => void;
    removeItem: (variantId: string) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    clearCart: () => void;
    isShaking: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [isShaking, setIsShaking] = useState(false);
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const localData = localStorage.getItem('molink-cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error al cargar el carrito desde localStorage", error);
            return [];
        }
    });

    // Efecto sincroniza el estado del carrito con localStorage cada vez que cambia.
    useEffect(() => {
        localStorage.setItem('molink-cart', JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((product: Product, quantity: number = 1, variantId?: string) => {
        const variantToAdd = variantId
            ? product.variants.find(v => v.id === variantId)
            : product.variants?.[0];

        if (!variantToAdd) {
            console.error("El producto no tiene variantes para añadir al carrito.");
            return;
        }

        if (!variantToAdd.id) {
            console.error("La variante no tiene ID — usa getPublicProductById antes de añadir al carrito.");
            return;
        }

        // El precio ya es number desde la API
        const priceNumber = variantToAdd.salePrice ?? variantToAdd.price;

        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.variantId === variantToAdd.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.variantId === variantToAdd.id
                        ? {...item, quantity: item.quantity + quantity}
                        : item
                );
            }

            const variantDescription = variantToAdd.variantValues
                ?.map(vv => vv.attributeValue.value)
                .join(' / ') || '';

            const newItem: CartItem = {
                productId: product.id,
                variantId: variantToAdd.id!,
                name: product.name,
                variantDescription,
                unitOfMeasure: variantToAdd.unitOfMeasure ?? null,
                volumeDiscounts: variantToAdd.volumeDiscounts || [],
                price: priceNumber,
                image_url: variantToAdd.imageUrl || product.imageUrl,
                quantity,
            };
            return [...prevItems, newItem];
        });

        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    }, []);

    const removeItem = (variantId: string) => {
        setItems(prevItems => prevItems.filter(item => item.variantId !== variantId));
    };

    const updateQuantity = (variantId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(variantId);
        } else {
            setItems(prevItems => prevItems.map(item =>
                item.variantId === variantId ? {...item, quantity} : item
            ));
        }
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{items, addItem, removeItem, updateQuantity, clearCart, isShaking}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};