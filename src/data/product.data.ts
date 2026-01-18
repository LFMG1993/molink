import type {Category, Product} from "../types";
import {Display, LightningFill, Lock, Server, ShieldCheck} from "react-bootstrap-icons";

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Windows 11 Pro - Licencia Digital OEM',
        price: 45000,
        originalPrice: 90000,
        discount: 50,
        rating: 4.9,
        reviews: 1240,
        category: 'os',
        image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80&w=1000',
        tags: ['bestseller', 'flash'],
        deliveryTime: 'Entrega Automática ⚡'
    },
    {
        id: '2',
        name: 'Microsoft Office 2021 Pro Plus - Vitalicia',
        price: 65000,
        originalPrice: 150000,
        discount: 57,
        rating: 4.9,
        reviews: 856,
        category: 'office',
        image: 'https://images.unsplash.com/photo-1633419461186-7d40a2e50594?auto=format&fit=crop&q=80&w=1000',
        tags: ['flash'],
        deliveryTime: 'Entrega Automática ⚡'
    },
    {
        id: '3',
        name: 'Kaspersky Total Security - 1 Año 3 PC',
        price: 85000,
        originalPrice: 120000,
        discount: 29,
        rating: 4.8,
        reviews: 420,
        category: 'security',
        image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=1000',
        tags: [],
        deliveryTime: 'Envío en < 15 min'
    },
    {
        id: '4',
        name: 'Adobe Creative Cloud - Suscripción 1 Año',
        price: 450000,
        originalPrice: 900000,
        discount: 50,
        rating: 5.0,
        reviews: 120,
        category: 'design',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
        tags: ['new'],
        deliveryTime: 'Cuenta Personal'
    },
    {
        id: '5',
        name: 'NordVPN Premium - 1 Año + 3 Meses',
        price: 120000,
        originalPrice: 240000,
        discount: 50,
        rating: 4.7,
        reviews: 89,
        category: 'security',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
        tags: [],
        deliveryTime: 'Entrega Automática ⚡'
    },
    {
        id: '6',
        name: 'Windows 10 Home - Retail Key',
        price: 35000,
        originalPrice: 70000,
        discount: 50,
        rating: 4.6,
        reviews: 2100,
        category: 'os',
        image: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?auto=format&fit=crop&q=80&w=1000',
        tags: ['bestseller'],
        deliveryTime: 'Entrega Automática ⚡'
    }
];

export const CATEGORIES: Category[] = [
    { id: 'os', name: 'Sistemas', icon: Display },
    { id: 'office', name: 'Ofimática', icon: Server },
    { id: 'security', name: 'Seguridad', icon: ShieldCheck },
    { id: 'design', name: 'Diseño', icon: Lock },
    { id: 'games', name: 'Gaming', icon: LightningFill },
    { id: 'vpn', name: 'VPN', icon: Lock },
];