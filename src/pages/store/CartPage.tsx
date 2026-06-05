import { useState, useCallback, useEffect } from "react";
import { useCart } from "../../context/store/CardContext.tsx";
import { wompiService } from "../../services/shared/wompiService.ts";
import { FileImage, Plus, Trash, Dash, CreditCard } from "react-bootstrap-icons";
import { StoreSEO } from "../../components/store/StoreSEO.tsx";
import { Link } from "react-router-dom";
import { ConfirmationModal } from "../../components/shared/ConfirmationModal.tsx";
import { useUserAuth } from "../../context/store/UserAuthContext.tsx";
import { AuthModal } from "../../components/store/auth/AuthModal.tsx";
import { orderService } from "../../services/store/orderService.ts";
import { useNotification } from "../../context/shared/NotificationContext.tsx";
import { AddressSelectionModal } from "../../components/store/customer/AdressSelectionModal.tsx";
import { useTranslation } from 'react-i18next';

export default function CartPage() {
    const { t } = useTranslation();
    const { items, removeItem, clearCart, updateQuantity } = useCart();
    const { isAuthenticated } = useUserAuth();
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCheckoutIntent, setIsCheckoutIntent] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const { addNotification } = useNotification();

    const handleConfirmClearCart = () => {
        clearCart();
        setIsConfirmingClear(false);
    };

    const startCheckoutProcess = useCallback(() => {
        if (!isAuthenticated) {
            setIsCheckoutIntent(true);
            setIsAuthModalOpen(true);
            return;
        }
        // Si ya está autenticado, abre directamente el modal de direcciones.
        setIsAddressModalOpen(true);
    }, [isAuthenticated]);

    const subtotal = items.reduce((sum, item) => {
        const applicableDiscount = item.volumeDiscounts
            ?.sort((a, b) => b.minQuantity - a.minQuantity)
            .find(d => item.quantity >= d.minQuantity);
        const effectivePrice = applicableDiscount ? applicableDiscount.price : item.price;
        return sum + (effectivePrice * item.quantity);
    }, 0);

    // Se ejecuta DESPUÉS de seleccionar una dirección.
    const handleAddressSelected = useCallback(async (addressId: string) => {
        setIsAddressModalOpen(false); // Cierra el modal de direcciones
        setIsProcessing(true);
        try {
            // 1. Preparamos el payload para crear la orden
            const payload = {
                items: items.map(item => {
                    const applicableDiscount = item.volumeDiscounts
                        ?.sort((a, b) => b.minQuantity - a.minQuantity)
                        .find(d => item.quantity >= d.minQuantity);
                    const effectivePrice = applicableDiscount ? applicableDiscount.price : item.price;
                    return {
                        variantId: item.variantId,
                        quantity: item.quantity,
                        unitPrice: effectivePrice
                    };
                }),
                shippingAddressId: addressId
            };
            const newOrder = await orderService.create(payload);
            const totalEnCents = subtotal * 100;
            const linkResponse = await wompiService.generatePaymentLink({
                order_id: newOrder.id,
                amount_in_cents: totalEnCents,
                name: "Compra en Tienda Molink",
                description: `Pago de la orden ${newOrder.id}`,
                redirect_url: `${window.location.origin}/order-confirmation/${newOrder.id}`
            });
            window.location.href = linkResponse.checkout_url;
        } catch (error: any) {
            addNotification(`Error al iniciar pago Wompi: ${error.message}`, 'error');
            setIsProcessing(false);
        }
    }, [items, subtotal, addNotification]);

    useEffect(() => {
        if (isAuthenticated && isCheckoutIntent) {
            // Cerramos el modal y reiniciamos la intención...
            setIsAuthModalOpen(false);
            setIsCheckoutIntent(false);
            setIsAddressModalOpen(true);
        }
    }, [isAuthenticated, isCheckoutIntent]);

    return (
        <>
            <StoreSEO
                title={t('store.seo.cart.title')}
                description={t('store.seo.cart.description')}
                keywords={t('store.seo.cart.keywords')}
                canonicalUrl="/cart"
            />
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

                    {/* Layout de dos columnas para una mejor organización. */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                        {/* Columna Izquierda: Lista de Productos */}
                        <div className="lg:col-span-2">
                            {items.length === 0 ? (
                                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <p className="text-slate-500 text-lg mb-6">No hay productos en tu carrito.</p>
                                    {/* Usamos un Link estilizado como botón para la navegación. */}
                                    <Link to="/products"
                                        className="inline-flex bg-red-500 text-white px-6 py-3 rounded-xl shadow-sm text-base font-medium hover:bg-red-600 transition-colors">
                                        Explorar productos
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.variantId}
                                            className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                                        >
                                            <div
                                                className="h-24 w-24 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name}
                                                        className="h-full w-full object-cover rounded-lg" />
                                                ) : (
                                                    <FileImage
                                                        className="h-10 w-10 text-slate-400" />
                                                )}
                                            </div>
                                            <div className="ml-4 grow">
                                                <p className="font-bold text-lg text-slate-800">{item.name}</p>
                                                <p className="text-sm text-slate-500 mb-2">{item.variantDescription} {item.unitOfMeasure ? `(${item.unitOfMeasure})` : ''}</p>
                                                {/*  Lógica de precios dinámicos. */}
                                                <div className="text-sm">
                                                    {(() => {
                                                        const applicableDiscount = item.volumeDiscounts
                                                            ?.sort((a, b) => b.minQuantity - a.minQuantity)
                                                            .find(d => item.quantity >= d.minQuantity);
                                                        const effectivePrice = applicableDiscount ? applicableDiscount.price : item.price;

                                                        return effectivePrice < item.price ? (
                                                            <p>
                                                                <span
                                                                    className="text-slate-400 line-through mr-2">${item.price.toLocaleString('es-CO')}</span>
                                                                <span
                                                                    className="font-bold text-emerald-600">${effectivePrice.toLocaleString('es-CO')}</span>
                                                            </p>
                                                        ) : <p className="font-semibold text-slate-700">${item.price.toLocaleString('es-CO')}</p>
                                                    })()}
                                                </div>
                                                {/* Controles de cantidad en línea. */}
                                                <div className="flex items-center mt-3 bg-slate-50 border border-slate-200 rounded-lg w-fit">
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-l-lg transition-colors">
                                                        <Dash className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4 font-semibold text-slate-700">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-r-lg transition-colors">
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                {/*  Burbuja de sugerencia para descuentos por volumen. */}
                                                {(() => {
                                                    // Ordenamos los descuentos de menor a mayor cantidad.
                                                    const sortedDiscounts = [...(item.volumeDiscounts || [])].sort((a, b) => a.minQuantity - b.minQuantity);
                                                    // Buscamos el próximo descuento que el usuario aún no ha alcanzado.
                                                    const nextDiscount = sortedDiscounts.find(d => item.quantity < d.minQuantity);

                                                    if (nextDiscount) {
                                                        const needed = nextDiscount.minQuantity - item.quantity;
                                                        // Mostramos la burbuja solo si le faltan 5 o menos unidades para el descuento.
                                                        if (needed > 0 && needed <= 100) {
                                                            return (
                                                                <div
                                                                    className="mt-2 text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 p-2 rounded-lg">
                                                                    ¡Añade <b>{needed} {needed > 1 ? 'unidades más' : 'unidad más'}</b> y
                                                                    paga <b>${nextDiscount.price.toLocaleString('es-CO')}</b> por
                                                                    cada una!
                                                                </div>
                                                            );
                                                        }
                                                    }
                                                    return null;
                                                })()}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-xl text-slate-800">
                                                    ${(() => {
                                                        const applicableDiscount = item.volumeDiscounts
                                                            ?.sort((a, b) => b.minQuantity - a.minQuantity)
                                                            .find(d => item.quantity >= d.minQuantity);
                                                        return ((applicableDiscount?.price || item.price) * item.quantity).toLocaleString('es-CO');
                                                    })()}
                                                </p>
                                                <button
                                                    className="mt-3 text-red-500 hover:text-red-700 text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
                                                    onClick={() => removeItem(item.variantId)}>
                                                    <Trash className="h-4 w-4" />
                                                    <span>Eliminar</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-6 border-t border-slate-200 mt-6 text-right">
                                        <button
                                            className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                                            onClick={() => setIsConfirmingClear(true)}>
                                            Vaciar Carrito
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Columna Derecha: Resumen del Pedido */}
                        {items.length > 0 && (
                            <div className="lg:col-span-1">
                                <div
                                    className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 lg:sticky lg:top-28">
                                    <h2 className="text-xl font-bold mb-6 text-slate-800">Resumen del Pedido</h2>
                                    <div className="flex justify-between mb-4 text-slate-600 font-medium">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toLocaleString('es-CO')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">
                                        <span>Envío</span>
                                        <span>Calculado en el siguiente paso</span>
                                    </div>

                                    <div
                                        className="flex justify-between font-black text-2xl text-slate-900">
                                        <span>Total</span>
                                        <span>${subtotal.toLocaleString('es-CO')}</span>
                                    </div>
                                    <div className="mt-8">
                                        <button
                                            onClick={startCheckoutProcess}
                                            disabled={isProcessing}
                                            className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-red-600/30">
                                            <CreditCard className="h-5 w-5 mr-2" />
                                            {isProcessing ? 'Procesando Pedido...' : 'Proceder al Pago'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
            <ConfirmationModal
                isOpen={isConfirmingClear}
                onClose={() => setIsConfirmingClear(false)}
                onConfirm={handleConfirmClearCart}
                title="Confirmar Acción"
                message="¿Estás seguro de que deseas vaciar tu carrito? Todos los productos serán eliminados."
            />
            <AddressSelectionModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onAddressSelected={handleAddressSelected}
            />
        </>
    );
}
