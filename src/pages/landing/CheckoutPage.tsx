import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { X, ArrowLeft, Shield } from 'lucide-react';
import { SEO } from '../../components/shared/SEO.tsx';
import {
    SubscriptionFlow,
    PackageFlow,
    OnetimeFlow,
} from '../../components/landing/checkout';
import type { WompiPlan, WompiTrmRate, PackageWithPrice } from '../../types';

export type CheckoutSubscriptionState = {
    type: 'subscription';
    plan: WompiPlan;
    billingCycle: 'monthly' | 'annual';
    trm: WompiTrmRate | null;
};

export type CheckoutPackageState = {
    type: 'package';
    package: PackageWithPrice;
};

export type CheckoutOnetimeState = {
    type: 'onetime';
    productName: string;
    amountUsdMin: number;
    amountUsdMax: number;
    details: string;
    trm: WompiTrmRate | null;
};

export type CheckoutLocationState =
    | CheckoutSubscriptionState
    | CheckoutPackageState
    | CheckoutOnetimeState;

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as CheckoutLocationState | undefined;

    useEffect(() => {
        if (!state) navigate('/pricing', { replace: true });
    }, [state, navigate]);

    if (!state) return null;

    const title = state.type === 'subscription'
        ? `Checkout · Plan ${state.plan.name}`
        : state.type === 'package'
        ? `Checkout · ${state.package.name}`
        : `Cotización · ${state.productName}`;

    const headerLabel = state.type === 'subscription' ? 'Checkout seguro'
        : state.type === 'package' ? 'Pago único seguro'
        : 'Solicitud de cotización';

    return (
        <>
            <SEO title={title} description="Proceso de pago seguro con Wompi" canonicalUrl="/checkout" />

            <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
                <header className="border-b border-white/5 py-4 px-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Volver
                    </button>
                    <span className="text-white/30 text-xs uppercase tracking-widest">{headerLabel}</span>
                    <Link to="/" className="text-white/30 hover:text-white/60 transition-colors">
                        <X size={18} />
                    </Link>
                </header>

                <div className="flex-1 flex items-start justify-center py-12 px-4">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            {state.type === 'subscription' && (
                                <>
                                    <p className="text-[#f30519] text-xs uppercase tracking-widest font-bold mb-1">
                                        {state.billingCycle === 'annual' ? 'Plan anual' : 'Plan mensual'}
                                    </p>
                                    <h1 className="text-3xl font-bold text-white">Plan {state.plan.name}</h1>
                                    <p className="text-white/40 text-sm mt-1">{state.plan.description}</p>
                                </>
                            )}
                            {state.type === 'package' && (
                                <>
                                    <p className="text-[#f30519] text-xs uppercase tracking-widest font-bold mb-1">Pago único</p>
                                    <h1 className="text-3xl font-bold text-white">{state.package.name}</h1>
                                    {state.package.description && (
                                        <p className="text-white/40 text-sm mt-1">{state.package.description}</p>
                                    )}
                                </>
                            )}
                            {state.type === 'onetime' && (
                                <>
                                    <p className="text-[#f30519] text-xs uppercase tracking-widest font-bold mb-1">Proyecto único</p>
                                    <h1 className="text-3xl font-bold text-white">{state.productName}</h1>
                                </>
                            )}
                        </div>

                        <div className="h-px bg-linear-to-r from-transparent via-[#f30519]/50 to-transparent mb-8" />

                        {state.type === 'subscription' && <SubscriptionFlow {...state} />}
                        {state.type === 'package' && <PackageFlow {...state} />}
                        {state.type === 'onetime' && <OnetimeFlow {...state} />}
                    </div>
                </div>

                <footer className="border-t border-white/5 py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-white/20 text-xs">
                        <Shield size={12} />
                        <span>Pagos procesados por Wompi · Información encriptada</span>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default CheckoutPage;
