import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pricingPackages, pricingAddons, whatsappNumber } from '../../data/landing/pricing.data.ts';
import { CheckCircle2, Calculator, MessageCircle, CreditCard } from 'lucide-react';
import clsx from 'clsx';
import { usePlans } from '../../hooks/landing/usePlans.ts';

const pageMultipliers = [1, 1.15, 1.35, 1.6];

export const PricingCalculator = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isEn = i18n.language?.startsWith('en');
    const { trm } = usePlans();

    const [selectedPackage, setSelectedPackage] = useState<string>('');
    const [pageRange, setPageRange] = useState<number>(0);
    const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

    const pkg = pricingPackages.find(p => p.id === selectedPackage);
    const basePrice = pkg?.price ?? 0;
    const pageMultiplier = pageMultipliers[pageRange] ?? 1;
    const addonsTotal = pricingAddons
        .filter(a => selectedAddons.has(a.id))
        .reduce((sum, a) => sum + a.price, 0);

    const minEstimate = Math.round((basePrice * pageMultiplier + addonsTotal) * 0.9);
    const maxEstimate = Math.round((basePrice * pageMultiplier + addonsTotal) * 1.15);

    const toggleAddon = (id: string) => {
        const next = new Set(selectedAddons);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedAddons(next);
    };

    const getWhatsAppUrl = () => {
        const pkgName = isEn ? (pkg?.nameEn || '') : (pkg?.name || '');
        const addons = pricingAddons
            .filter(a => selectedAddons.has(a.id))
            .map(a => isEn ? a.nameEn : a.name)
            .join(', ');
        const msg = isEn
            ? `Hi, I used the pricing calculator. I'm interested in: ${pkgName}, ~${pageRange === 0 ? '1-3' : pageRange === 1 ? '4-7' : pageRange === 2 ? '8-15' : '15+'} pages, addons: ${addons || 'none'}. Estimated: $${minEstimate}-$${maxEstimate} USD.`
            : `Hola, usé la calculadora de precios. Me interesa: ${pkgName}, ~${pageRange === 0 ? '1-3' : pageRange === 1 ? '4-7' : pageRange === 2 ? '8-15' : '15+'} páginas, extras: ${addons || 'ninguno'}. Estimado: $${minEstimate}-$${maxEstimate} USD.`;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    };

    const goToWompiCheckout = () => {
        const pkgName = isEn ? (pkg?.nameEn || '') : (pkg?.name || '');
        const pageLabel = ['1-3', '4-7', '8-15', '15+'][pageRange] ?? '1-3';
        const addonsLabel = pricingAddons
            .filter(a => selectedAddons.has(a.id))
            .map(a => isEn ? a.nameEn : a.name)
            .join(', ');
        navigate('/checkout', {
            state: {
                type: 'onetime',
                productName: pkgName,
                amountUsdMin: minEstimate,
                amountUsdMax: maxEstimate,
                details: `${pageLabel} páginas${addonsLabel ? ` · Extras: ${addonsLabel}` : ''}`,
                trm: trm ?? null,
            },
        });
    };

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 text-accent mb-4">
                        <Calculator size={40} />
                    </div>
                    <h2 className="font-heading text-4xl font-bold uppercase text-white title-underline">
                        {t('landing.calculator.title')}
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
                        {t('landing.calculator.subtitle')}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Options */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Package Selection */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">{t('landing.calculator.select_package')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {pricingPackages.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedPackage(p.id)}
                                        className={clsx(
                                            'p-4 rounded-lg border text-left transition-all',
                                            selectedPackage === p.id
                                                ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/10'
                                                : 'border-white/20 bg-white/5 hover:bg-white/10'
                                        )}
                                    >
                                        <div className="font-bold text-white text-sm">{isEn ? p.nameEn : p.name}</div>
                                        <div className="text-accent text-lg font-bold mt-1">{p.priceLabel}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Page Range */}
                        {selectedPackage && (
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">{t('landing.calculator.select_pages')}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[0, 1, 2, 3].map((idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setPageRange(idx)}
                                            className={clsx(
                                                'p-3 rounded-lg border text-center transition-all duration-300 hover:scale-105',
                                                pageRange === idx
                                                    ? 'border-green-500 bg-green-500/10 text-white'
                                                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                                            )}
                                        >
                                            <span className="text-white text-sm">
                                                {t(`landing.calculator.pages.${['1_3', '4_7', '8_15', '15_plus'][idx]}`)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Addons */}
                        {selectedPackage && (
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">{t('landing.calculator.select_addons')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {pricingAddons.map((addon) => {
                                        const selected = selectedAddons.has(addon.id);
                                        return (
                                            <button
                                                key={addon.id}
                                                onClick={() => toggleAddon(addon.id)}
                                                className={clsx(
                                                    'p-3 rounded-lg border text-left flex items-center justify-between transition-all',
                                                    selected
                                                        ? 'border-green-500 bg-green-500/10'
                                                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 size={18} className={clsx('shrink-0', selected ? 'text-green-500' : 'text-white/20')} />
                                                    <span className="text-white/90 text-sm">{isEn ? addon.nameEn : addon.name}</span>
                                                </div>
                                                <span className="text-accent font-bold text-sm">+${addon.price}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Estimate */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-surface border border-white/10 rounded-xl p-6 text-center">
                            <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">
                                {t('landing.calculator.total')}
                            </h3>
                            {selectedPackage ? (
                                <>
                                    <div className="text-4xl font-bold text-accent mb-1">
                                        ${minEstimate} - ${maxEstimate}
                                    </div>
                                    <p className="text-white/50 text-xs mb-2">USD</p>
                                    {trm && (
                                        <p className="text-white/30 text-xs mb-6">
                                            ≈ {Math.round(minEstimate * trm.usdCopRate).toLocaleString('es-CO')} –{' '}
                                            {Math.round(maxEstimate * trm.usdCopRate).toLocaleString('es-CO')} COP
                                        </p>
                                    )}

                                    {/* Botón Wompi */}
                                    <button
                                        onClick={goToWompiCheckout}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-bold uppercase tracking-wider py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105 mb-2"
                                    >
                                        <CreditCard size={16} />
                                        {isEn ? 'Pay with Wompi' : 'Pagar con Wompi'}
                                    </button>

                                    {/* Botón WhatsApp */}
                                    <a
                                        href={getWhatsAppUrl()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 text-sm font-semibold py-2.5 px-6 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <MessageCircle size={15} />
                                        {isEn ? 'Ask on WhatsApp' : 'Consultar por WhatsApp'}
                                    </a>
                                </>
                            ) : (
                                <p className="text-white/40 text-sm">
                                    {isEn ? 'Select a package to see your estimate' : 'Selecciona un paquete para ver tu estimado'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
