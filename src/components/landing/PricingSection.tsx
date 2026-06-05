import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { subscriptionPlans, pricingPackages, whatsappNumber } from '../../data/landing/pricing.data.ts';
import { CheckCircle2, Star, Loader2, WifiOff, MessageCircle } from 'lucide-react';
import clsx from 'clsx';
import { usePlans } from '../../hooks/landing/usePlans.ts';
import { usePackages } from '../../hooks/landing/usePackages.ts';
import { formatCopFromCents } from '../../utils/currency.ts';
import type { WompiPlan, PackageWithPrice } from '../../types';

export const PricingSection = ({ isFullPage = false }: { isFullPage?: boolean }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isEn = i18n.language?.startsWith('en');
    const [mode, setMode] = useState<'subscription' | 'onetime'>('subscription');
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
    const { trm, loading: plansLoading, apiError, getApiPlanBySlug } = usePlans();
    const { loading: packagesLoading, packagesError, getApiPackageBySlug } = usePackages();

    function goToSubscriptionCheckout(apiPlan: WompiPlan) {
        navigate('/checkout', {
            state: {
                type: 'subscription',
                plan: apiPlan,
                billingCycle: billing,
                trm,
            },
        });
    }

    function goToPackageCheckout(apiPkg: PackageWithPrice) {
        navigate('/checkout', { state: { type: 'package', package: apiPkg } });
    }

    const getWhatsAppUrl = (plan: typeof subscriptionPlans[number]) => {
        const msg = isEn ? plan.whatsappMessageEn : plan.whatsappMessage;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    };

    const getWhatsAppUrlOneTime = (pkg: typeof pricingPackages[number]) => {
        const msg = isEn ? pkg.whatsappMessageEn : pkg.whatsappMessage;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    };

    // Calcular Ahorro
    const getSavingsVsOneTime = (planId: string) => {
        const oneTimePrices: Record<string, number> = {
            'basic': 250,
            'business': 550,
            'ecommerce': 1800
        };
        const subPrice = billing === 'annual' ? subscriptionPlans.find(p => p.id === planId)?.annualPrice || 0 : 0;
        if (!subPrice || !oneTimePrices[planId]) return null;
        return Math.round(((oneTimePrices[planId] - subPrice) / oneTimePrices[planId]) * 100);
    };

    // Precio real desde la API; fallback al precio estático
    function getPrice(plan: typeof subscriptionPlans[number]): string {
        const apiPlan = getApiPlanBySlug(plan.id);
        if (apiPlan) {
            if (billing === 'annual') {
                const annual = parseFloat(apiPlan.annualPriceUsd ?? String(parseFloat(apiPlan.priceUsd) * 12));
                return `$${annual.toFixed(0)}`;
            }
            return `$${parseFloat(apiPlan.priceUsd).toFixed(0)}`;
        }
        return billing === 'annual' ? `$${plan.annualPrice}` : `$${plan.monthlyPrice}`;
    }

    // Setup fee real o gratuito en anual
    function getSetupFeeLabel(plan: typeof subscriptionPlans[number]): string {
        if (billing === 'annual') return isEn ? 'Setup Fee: FREE' : 'Configuración: GRATIS';
        const apiPlan = getApiPlanBySlug(plan.id);
        const fee = apiPlan ? parseFloat(apiPlan.setupFeeUsd) : plan.setupFee;
        return `${t('landing.pricing.setup_fee')}: $${fee} USD`;
    }

    // Si el API plan existe, el botón hace checkout real; si no, va a WhatsApp
    const apiReady = !plansLoading && !apiError;

    return (
        <section
            id="pricing"
            className={clsx("bg-surface", isFullPage ? "py-12" : "py-24")}
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className={clsx("text-center mb-12", isFullPage && "hidden")}>
                    <h2 className="font-heading text-4xl font-bold uppercase text-white title-underline">
                        {t('landing.pricing.section_title')}
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
                        {t('landing.pricing.section_subtitle')}
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex flex-col items-center mb-12">
                    <div className="inline-flex bg-black/40 border border-white/10 rounded-lg p-1 mb-3">
                        <button
                            onClick={() => setMode('subscription')}
                            className={clsx(
                                'px-6 py-2.5 rounded-md font-bold text-sm uppercase tracking-wider transition-all',
                                mode === 'subscription'
                                    ? 'bg-accent text-white shadow-lg shadow-[#f30519]/30'
                                    : 'text-white/60 hover:text-white'
                            )}
                        >
                            <Star size={14} className="inline-block mr-1 text-yellow-400 fill-yellow-400 mb-0.5" />
                            {t('landing.pricing.toggle_subscription')}
                        </button>
                        <button
                            onClick={() => setMode('onetime')}
                            className={clsx(
                                'px-6 py-2.5 rounded-md font-bold text-sm uppercase tracking-wider transition-all',
                                mode === 'onetime'
                                    ? 'bg-accent text-white shadow-lg shadow-[#f30519]/30'
                                    : 'text-white/60 hover:text-white'
                            )}
                        >
                            {t('landing.pricing.toggle_one_time')}
                        </button>
                    </div>
                    <p className="text-white/50 text-sm text-center max-w-lg">
                        {mode === 'subscription' ? t('landing.pricing.toggle_hint') : t('landing.pricing.disclaimer')}
                    </p>
                </div>

                {/* Subscription Plans */}
                {mode === 'subscription' && (
                    <>
                        {/* Billing Toggle */}
                        <div className="flex justify-center mb-10">
                            <div className="inline-flex bg-black/30 border border-white/10 rounded-lg p-1">
                                <button
                                    onClick={() => setBilling('monthly')}
                                    className={clsx(
                                        'px-5 py-2 rounded-md text-sm font-semibold transition-all',
                                        billing === 'monthly'
                                            ? 'bg-white/10 text-white shadow-lg shadow-[#f30519]/30'
                                            : 'text-white/50 hover:text-white/80'
                                    )}
                                >
                                    {t('landing.pricing.monthly_hint')}
                                </button>
                                <button
                                    onClick={() => setBilling('annual')}
                                    className={clsx(
                                        'relative px-5 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2',
                                        billing === 'annual'
                                            ? 'bg-accent/20 text-accent shadow-lg shadow-[#f30519]/30'
                                            : 'text-white/50 hover:text-white/80'
                                    )}
                                >
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    {t('landing.pricing.annual_hint')}

                                    {/* Sticker de Ahorro Real (Setup Fee + Mensualidad) */}
                                    <span className="absolute -top-2 -right-6 bg-black text-green-400 text-[10px] font-black px-1.5 py-0.1 rounded shadow-sm border border-green-500/30 whitespace-nowrap">
                                        {isEn ? 'UP TO -40%' : 'HASTA -40%'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {subscriptionPlans.map((plan) => {
                                const apiPlan = getApiPlanBySlug(plan.id);
                                const canCheckout = apiReady && !!apiPlan;
                                return (
                                    <div
                                        key={plan.id}
                                        className={clsx(
                                            'relative bg-black/60 border rounded-xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2',
                                            plan.popular
                                                ? 'border-2 border-[#f30519] hover:shadow-lg hover:shadow-[#f30519]/30 order-first md:order-none'
                                                : 'border border-white/10 hover:border-white/20'
                                        )}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3.75 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full border-2 border-[#f30519] flex items-center gap-1 z-20">
                                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                {t('landing.pricing.popular_badge')}
                                            </div>
                                        )}

                                        {/* Sticker de Ahorro vs Pago Único (Solo en Anual) */}
                                        {billing === 'annual' && (
                                            <div className="absolute top-6 right-6 flex flex-col items-end">
                                                <span className="text-[10px] text-white/40 uppercase font-bold">{isEn ? 'SAVE' : 'AHORRA'}</span>
                                                <span className="text-xl font-black text-green-400">-{getSavingsVsOneTime(plan.id)}%</span>
                                            </div>
                                        )}

                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {isEn ? plan.nameEn : plan.name}
                                        </h3>

                                        {/* Precio: dinámico desde API o estático */}
                                        <div className="mb-2 flex items-end gap-1">
                                            {plansLoading ? (
                                                <Loader2 size={20} className="text-white/40 animate-spin mb-1" />
                                            ) : (
                                                <>
                                                    <span className="text-4xl font-bold text-accent">
                                                        {getPrice(plan)}
                                                    </span>
                                                    <span className="text-white/60 text-sm mb-1">
                                                        {billing === 'annual' ? t('landing.pricing.annual_label') : t('landing.pricing.monthly_label')}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Equivalente COP si hay TRM */}
                                        {trm && !plansLoading && apiPlan && (
                                            <p className="text-xs text-white/30 mb-2">
                                                ≈ {Math.round(
                                                    (billing === 'annual'
                                                        ? parseFloat(apiPlan.annualPriceUsd ?? String(parseFloat(apiPlan.priceUsd) * 12))
                                                        : parseFloat(apiPlan.priceUsd)
                                                    ) * trm.usdCopRate
                                                ).toLocaleString('es-CO')} COP / {billing === 'annual' ? 'año' : 'mes'}
                                            </p>
                                        )}

                                        <div className={clsx(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-4",
                                            billing === 'annual' ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/70"
                                        )}>
                                            {getSetupFeeLabel(plan)}
                                        </div>

                                        <p className="text-white/70 mb-6 text-sm">
                                            {isEn ? plan.descriptionEn : plan.description}
                                        </p>

                                        {/* Features */}
                                        <ul className="space-y-3 mb-6 grow">
                                            {(isEn ? plan.featuresEn : plan.features).map((feature, i) => (
                                                <li key={i} className="flex items-start text-white/80 text-sm">
                                                    <CheckCircle2 size={16} className="text-yellow-400 mt-0.5 mr-2 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Always Included */}
                                        <div className="mb-6 pt-4 border-t border-white/10">
                                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">{t('landing.pricing.includes_label')}</p>
                                            <ul className="space-y-1.5">
                                                {(isEn ? plan.includedEn : plan.included).map((item, i) => (
                                                    <li key={i} className="flex items-start text-white/60 text-xs">
                                                        <CheckCircle2 size={14} className="text-green-500 mt-0.5 mr-2 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* CTA: checkout real si API disponible, WhatsApp como fallback */}
                                        {canCheckout ? (
                                            <button
                                                onClick={() => goToSubscriptionCheckout(apiPlan!)}
                                                className="inline-block w-full text-center bg-white text-[#0a0a0a] font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-white/20 hover:bg-white/90 hover:scale-105 hover:ring-2 hover:ring-[#f30519]/70 active:ring-2 active:ring-[#f30519] focus-visible:ring-2 focus-visible:ring-[#f30519]/70"
                                            >
                                                {isEn ? plan.ctaEn : plan.cta}
                                            </button>
                                        ) : plansLoading ? (
                                            <button
                                                disabled
                                                className="inline-flex items-center justify-center gap-2 w-full bg-white/5 text-white/30 font-bold uppercase tracking-wider py-3 px-8 rounded-md cursor-not-allowed"
                                            >
                                                <Loader2 size={16} className="animate-spin" />
                                                Cargando...
                                            </button>
                                        ) : (
                                            // Fallback a WhatsApp si la API falla
                                            <a
                                                href={getWhatsAppUrl(plan)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 w-full text-center bg-white text-[#0a0a0a] font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-white/20 hover:bg-white/90 hover:scale-105"
                                                title="Consultar por WhatsApp"
                                            >
                                                <WifiOff size={14} className="opacity-50" />
                                                {isEn ? 'Contact on WhatsApp' : 'Consultar por WhatsApp'}
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <p className="mt-8 text-center text-white/40 text-xs max-w-2xl mx-auto">
                            {t('landing.pricing.subs_disclaimer')}
                        </p>
                    </>
                )}

                {/* One-Time Packages */}
                {mode === 'onetime' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {pricingPackages.map((pkg) => {
                                const apiPkg = getApiPackageBySlug(pkg.id);
                                const canPay = !packagesLoading && !packagesError && !!apiPkg;
                                return (
                                    <div
                                        key={pkg.id}
                                        className={clsx(
                                            'relative bg-black/60 border rounded-xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2',
                                            pkg.popular
                                                ? 'border-2 border-[#f30519] hover:shadow-lg hover:shadow-[#f30519]/30 order-first md:order-none'
                                                : 'border border-white/10 hover:border-white/20'
                                        )}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute -top-3.75 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full border-2 border-[#f30519] flex items-center gap-1 z-20">
                                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                {t('landing.pricing.popular_badge')}
                                            </div>
                                        )}

                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {isEn ? pkg.nameEn : pkg.name}
                                        </h3>

                                        {/* Precio: real desde API o estático */}
                                        <div className="mb-4">
                                            {packagesLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 size={18} className="text-white/40 animate-spin" />
                                                    <span className="text-white/40 text-sm">Cargando precio...</span>
                                                </div>
                                            ) : apiPkg ? (
                                                <>
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="text-3xl font-bold text-accent">
                                                            ${parseFloat(apiPkg.priceUsd).toFixed(0)}
                                                        </span>
                                                        <span className="text-accent/80 font-bold text-lg">USD</span>
                                                    </div>
                                                    <div className="text-white/50 text-xs mt-1">
                                                        ≈ {formatCopFromCents(apiPkg.amountInCents)} COP · TRM {apiPkg.trm.rate.toLocaleString('es-CO')}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-3xl font-bold text-accent">
                                                        {isEn ? pkg.priceLabelEn : pkg.priceLabel}
                                                    </div>
                                                    <div className="text-white/50 text-xs uppercase tracking-wider mt-1">
                                                        {t('landing.pricing.per_project')}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <p className="text-white/70 mb-6 text-sm">
                                            {isEn ? pkg.descriptionEn : pkg.description}
                                            <span className="block mt-2 text-[11px] text-white/40 italic">
                                                {pkg.id === 'presentation'
                                                    ? (isEn ? '* Email contact forms are optional modules.' : '* Formularios a correo son módulos extra.')
                                                    : (isEn ? '* Includes integrated contact system.' : '* Incluye sistema de contacto integrado.')
                                                }
                                            </span>
                                        </p>

                                        <ul className="space-y-3 mb-8 grow">
                                            {(isEn ? pkg.featuresEn : pkg.features).map((feature, i) => (
                                                <li key={i} className="flex items-start text-white/80 text-sm">
                                                    <CheckCircle2 size={16} className="text-yellow-400 mt-0.5 mr-2 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTAs */}
                                        <div className="space-y-2">
                                            {canPay ? (
                                                <button
                                                    onClick={() => goToPackageCheckout(apiPkg!)}
                                                    className="inline-block w-full text-center bg-white text-[#0a0a0a] font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-white/20 hover:bg-white/90 hover:scale-105"
                                                >
                                                    {isEn ? 'Pay Now' : 'Pagar Ahora'}
                                                </button>
                                            ) : packagesLoading ? (
                                                <button
                                                    disabled
                                                    className="inline-flex items-center justify-center gap-2 w-full bg-white/5 text-white/30 font-bold uppercase tracking-wider py-3 px-8 rounded-md cursor-not-allowed"
                                                >
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Cargando...
                                                </button>
                                            ) : (
                                                // Fallback a WhatsApp si la API falla
                                                <a
                                                    href={getWhatsAppUrlOneTime(pkg)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 w-full text-center bg-white text-[#0a0a0a] font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-white/20 hover:bg-white/90 hover:scale-105"
                                                >
                                                    <WifiOff size={14} className="opacity-50" />
                                                    {isEn ? 'Contact on WhatsApp' : 'Consultar por WhatsApp'}
                                                </a>
                                            )}
                                            <a
                                                href={getWhatsAppUrlOneTime(pkg)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center justify-center gap-2 w-full border border-white/20 text-white/60 text-sm font-semibold py-2.5 px-6 rounded-md hover:bg-white/5 transition-colors"
                                            >
                                                <MessageCircle size={15} className="transition-colors group-hover:text-green-400" />
                                                {isEn ? 'Ask on WhatsApp' : 'Consultar por WhatsApp'}
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-white/50 text-sm">{t('landing.pricing.currency_label')}</p>
                        </div>

                        {/* Banner de error de API de paquetes */}
                        {packagesError && (
                            <div className="mt-6 mx-auto max-w-lg flex items-center gap-2 bg-yellow-900/60 border border-yellow-500/30 text-yellow-300 text-xs px-4 py-2.5 rounded-lg">
                                <WifiOff size={14} className="shrink-0" />
                                <span>Precios desde datos locales · Usa WhatsApp para coordinar el pago</span>
                            </div>
                        )}
                    </>
                )}

                {/* CTA Section */}
                {!isFullPage && (
                    <div className="mt-12 text-center bg-black/40 border border-white/10 rounded-xl p-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {t('landing.pricing.cta_section_title')}
                        </h3>
                        <p className="text-white/70 mb-6">
                            {t('landing.pricing.cta_section_desc')}
                        </p>
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(isEn ? 'Hello, I would like to speak with an advisor about the plans.' : 'Hola, me gustaría hablar con un asesor sobre los planes.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-white font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105"
                        >
                            {t('landing.pricing.cta_button')}
                            <MessageCircle size={18} />
                        </a>
                    </div>
                )}
            </div>

            {/* Banner de error de API */}
            {apiError && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-yellow-900/80 border border-yellow-500/30 text-yellow-300 text-xs px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
                    <WifiOff size={14} />
                    <span>Precios desde datos locales · Checkout no disponible temporalmente</span>
                </div>
            )}
        </section>
    );
};
