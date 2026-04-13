import {
    type LucideIcon,
    Home,
    Users,
    Package,
    Truck,
    Warehouse,
    Archive,
    Cylinder,
    Wallet,
    Folders,
    Send,
    Lightbulb
} from 'lucide-react';

export interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

export const dockItems: NavItem[] = [
    {name: 'Inicio', href: '/admin', icon: Home},
    {name: 'Usuarios', href: '/admin/users', icon: Users},
    {name: 'Emprende', href: '/admin/emprende', icon: Lightbulb},
    {name: 'Categorías', href: '/admin/categories', icon: Archive},
    {name: 'Atributos', href: '/admin/attributes', icon: Cylinder},
    {name: 'Productos', href: '/admin/products', icon: Package},
    {name: 'Proveedores', href: '/admin/providers', icon: Truck},
    {name: 'Inventario', href: '/admin/inventory', icon: Warehouse},
    {name: 'Pagos', href: '/admin/payment-methods', icon: Wallet},
    {name: 'Pedidos', href: '/admin/orders', icon: Folders},
    {name: 'Envios', href: '/admin/shipments', icon: Send},
];