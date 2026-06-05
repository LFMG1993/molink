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
    appId: string;
}

export const dockItems: NavItem[] = [
    {name: 'Inicio', href: '/admin', icon: Home, appId: 'dashboard'},
    {name: 'Usuarios', href: '/admin/users', icon: Users, appId: 'users'},
    {name: 'Emprende', href: '/admin/emprende', icon: Lightbulb, appId: 'emprende'},
    {name: 'Categorías', href: '/admin/categories', icon: Archive, appId: 'categories'},
    {name: 'Atributos', href: '/admin/attributes', icon: Cylinder, appId: 'attributes'},
    {name: 'Productos', href: '/admin/products', icon: Package, appId: 'products'},
    {name: 'Proveedores', href: '/admin/providers', icon: Truck, appId: 'providers'},
    {name: 'Inventario', href: '/admin/inventory', icon: Warehouse, appId: 'inventory'},
    {name: 'Pagos', href: '/admin/payment-methods', icon: Wallet, appId: 'payment-methods'},
    {name: 'Pedidos', href: '/admin/orders', icon: Folders, appId: 'orders'},
    {name: 'Envios', href: '/admin/shipments', icon: Send, appId: 'shipments'},
];