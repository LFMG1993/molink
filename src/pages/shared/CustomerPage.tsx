import { useUserAuth } from '../../context/store/UserAuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from '../../components/shared/Spinner.tsx';
import { Tabs } from '../../components/shared/Tabs.tsx';
import { OrderHistory } from '../../components/store/customer/OrderHistory.tsx';
import { ShipmentHistory } from '../../components/store/customer/ShipmentHistory.tsx';
import { ProfileEditor } from '../../components/store/customer/ProfileEditor.tsx';
import { AddressManager } from '../../components/store/customer/AddressManager.tsx';
import { SubscriptionsList } from '../../components/shared/customer/SubscriptionsList.tsx';
import { SavedCardsList } from '../../components/shared/customer/SavedCardsList.tsx';
import { TransactionHistory } from '../../components/shared/customer/TransactionHistory.tsx';

/** Página de perfil compartida entre la landing y la tienda */
export default function CustomerPage() {
    const { customer, isAuthenticated, isLoading } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading || !customer) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <Spinner />
            </div>
        );
    }

    const tabs = [
        {
            label: 'Suscripciones',
            content: <SubscriptionsList />,
        },
        {
            label: 'Mis Tarjetas',
            content: <SavedCardsList />,
        },
        {
            label: 'Historial de Pagos',
            content: <TransactionHistory />,
        },
        {
            label: 'Mis Pedidos',
            content: <OrderHistory />,
        },
        {
            label: 'Mis Envíos',
            content: <ShipmentHistory />,
        },
        {
            label: 'Mis Direcciones',
            content: <AddressManager />,
        },
        {
            label: 'Mis Datos',
            content: <ProfileEditor />,
        },
    ];

    return (
        <div className="container mx-auto px-6 py-16 bg-slate-50 text-slate-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-2">¡Hola, {customer.name}!</h1>
            <p className="text-slate-600 mb-8">
                Bienvenido a tu espacio personal.
            </p>
            <Tabs tabs={tabs} />
        </div>
    );
}

