import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User } from 'lucide-react';
import { wompiService } from '../../../services/shared/wompiService.ts';
import { customerAuthService } from '../../../services/shared/customerAuthService.ts';
import { parseCheckoutError } from '../../../utils/parseCheckoutError.ts';
import { CouponInput } from '../../shared/CouponInput.tsx';
import { PriceSummary } from '../../shared/PriceSummary.tsx';
import { DarkInput } from './DarkInput.tsx';
import { PrimaryButton } from './PrimaryButton.tsx';
import { StepDots } from './StepDots.tsx';
import { OtpStep } from './OtpStep.tsx';
import { SavedCardsSection } from './SavedCardsSection.tsx';
import { SubscriptionCardStep } from './SubscriptionCardStep.tsx';
import { PollingStep } from './PollingStep.tsx';
import { ThreeDSStep } from './ThreeDSStep.tsx';
import { SubscriptionSuccessStep } from './SubscriptionSuccessStep.tsx';
import { useUserAuth } from '../../../context/store/UserAuthContext.tsx';
import type {
    WompiPlan, WompiTrmRate, WompiCheckoutStep,
    WompiPlanSummary, WompiCardFormData, CouponInfo, WompiPaymentSource,
} from '../../../types';
interface SubscriptionFlowProps {
    plan: WompiPlan;
    billingCycle: 'monthly' | 'annual';
    trm: WompiTrmRate | null;
}

export function SubscriptionFlow({ plan, billingCycle, trm }: SubscriptionFlowProps) {
    const navigate = useNavigate();
    const { login } = useUserAuth();
    const [step, setStep] = useState<WompiCheckoutStep>('details');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailMasked, setEmailMasked] = useState('');
    const [planSummary, setPlanSummary] = useState<WompiPlanSummary | null>(null);
    const [transactionId, setTransactionId] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');

    const [couponInfo, setCouponInfo] = useState<CouponInfo | null>(null);
    const [couponCode, setCouponCode] = useState<string | null>(null);

    const [savedSources, setSavedSources] = useState<WompiPaymentSource[]>([]);
    const [showNewCardForm, setShowNewCardForm] = useState(false);

    // Cálculo previo
    const priceUsd = billingCycle === 'annual'
        ? parseFloat(plan.annualPriceUsd ?? String(parseFloat(plan.priceUsd) * 12))
        : parseFloat(plan.priceUsd);
    const setupFeeUsd = billingCycle === 'annual' ? 0 : parseFloat(plan.setupFeeUsd);
    const totalUsd = priceUsd + setupFeeUsd;
    const totalCop = trm ? Math.round(totalUsd * trm.usdCopRate) : null;

    async function handleDetails(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const res = await wompiService.initiateCheckout({
                email, name,
                plan_id: plan.id,
                billing_cycle: billingCycle,
                ...(couponCode ? { coupon_code: couponCode } : {}),
            });
            setEmailMasked(res.emailMasked);
            setPlanSummary(res.planSummary);
            setStep('otp');
        } catch (err) { setError(parseCheckoutError(err, '[subscription]')); }
        finally { setLoading(false); }
    }

    async function handleOtp(e: React.FormEvent, otp: string) {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const res = await customerAuthService.verifyCode(email, otp.trim());
            login(res.user);
            setStep('payment');

            // Cargar tarjetas guardadas en paralelo sin bloquear
            wompiService.getPaymentSources()
                .then(sources => { setSavedSources(sources); setShowNewCardForm(sources.length === 0); })
                .catch(() => setShowNewCardForm(true));
        } catch { setError('Código inválido o expirado. Revisa tu correo e intenta de nuevo.'); }
        finally { setLoading(false); }
    }

    function resolveTransactionStep(transaction: {
        wompi_transaction_id?: string;
        id?: string;
        status: string;
        redirect_url?: string | null;
    }) {
        const txId = transaction.wompi_transaction_id || transaction.id || '';
        if (!transaction || transaction.status === 'APPROVED') {
            setStep('success');
        } else if (transaction.status === 'PENDING' && transaction.redirect_url) {
            setTransactionId(txId); setRedirectUrl(transaction.redirect_url); setStep('threeds');
        } else if (transaction.status === 'PENDING') {
            setTransactionId(txId); setStep('polling');
        } else {
            setError('El pago fue declinado. Verifica los datos de tu tarjeta.');
        }
    }

    async function handlePaymentWithSource(wompiSourceId: number) {
        setLoading(true); setError('');
        try {
            const res = await wompiService.subscribeWithSource({
                plan_id: plan.id,
                billing_cycle: billingCycle,
                payment_source_id: wompiSourceId,
                redirect_url: `${window.location.origin}/checkout/callback`,
                ...(couponCode ? { coupon_code: couponCode } : {}),
            });
            if (res.transaction) resolveTransactionStep(res.transaction);
            else { setStep('success'); }
        } catch (err) { setError(parseCheckoutError(err, '[subscription]')); }
        finally { setLoading(false); }
    }

    async function handlePayment(card: WompiCardFormData) {
        setLoading(true); setError('');
        try {
            const res = await wompiService.subscribe({
                plan_id: plan.id,
                billing_cycle: billingCycle,
                card_number: card.cardNumber.replace(/\s/g, ''),
                cvc: card.cvc,
                exp_month: card.expMonth,
                exp_year: card.expYear,
                card_holder: card.cardHolder,
                installments: card.installments,
                redirect_url: `${window.location.origin}/checkout/callback`,
                ...(couponCode ? { coupon_code: couponCode } : {}),
            });
            if (res.transaction) resolveTransactionStep(res.transaction);
            else { setStep('success'); }
        } catch (err) { setError(parseCheckoutError(err, '[subscription]')); }
        finally { setLoading(false); }
    }

    return (
        <>
            {step !== 'success' && <StepDots current={step} />}

            {/* Paso 1: Datos personales + resumen previo */}
            {step === 'details' && (
                <form onSubmit={handleDetails} className="space-y-5">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
                        <p className="text-white/50 text-xs uppercase tracking-wider font-bold mb-2">Resumen del plan</p>
                        <div className="flex justify-between text-sm">
                            <span className="text-white/60">{billingCycle === 'annual' ? 'Plan anual (12 meses)' : 'Plan mensual'}</span>
                            <span className="text-white font-semibold">
                                {priceUsd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                {billingCycle === 'annual' ? '/año' : '/mes'}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-white/60">Setup fee</span>
                            {billingCycle === 'annual'
                                ? <span className="text-green-400 font-semibold">¡GRATIS!</span>
                                : <span className="text-white font-semibold">{setupFeeUsd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                            }
                        </div>
                        <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                            <span className="text-white">Estimado hoy</span>
                            <div className="text-right">
                                <p className={`${couponInfo ? 'line-through text-white/30 text-sm font-normal' : 'text-white'}`}>
                                    {totalUsd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                                {couponInfo ? (
                                    <>
                                        <p className="text-green-400 font-bold text-sm">
                                            {couponInfo.discountType === 'PERCENTAGE'
                                                ? `−${parseFloat(couponInfo.discountValue)}% aplicado`
                                                : 'Descuento aplicado'}
                                        </p>
                                        <p className="text-white font-bold">
                                            {couponInfo.discountType === 'PERCENTAGE'
                                                ? (totalUsd * (1 - parseFloat(couponInfo.discountValue) / 100))
                                                    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                                : totalUsd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </p>
                                        {trm && couponInfo.discountType === 'PERCENTAGE' && (
                                            <p className="text-white/40 text-xs font-normal">
                                                ≈ {Math.round(totalUsd * trm.usdCopRate * (1 - parseFloat(couponInfo.discountValue) / 100)).toLocaleString('es-CO')} COP
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    totalCop
                                        ? <p className="text-white/30 text-xs font-normal">≈ {totalCop.toLocaleString('es-CO')} COP</p>
                                        : null
                                )}
                            </div>
                        </div>
                        {billingCycle === 'annual' && (
                            <div className="border-t border-white/5 pt-2 space-y-1">
                                <div className="flex justify-between text-xs text-white/40">
                                    <span>Meses 2 al 12</span>
                                    <span>${(priceUsd / 12).toFixed(0)} USD/mes × 11 meses</span>
                                </div>
                                <div className="flex justify-between text-xs text-white/25 italic">
                                    <span>Año 2 en adelante</span>
                                    <span>{priceUsd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}/año</span>
                                </div>
                            </div>
                        )}
                        {billingCycle === 'monthly' && (
                            <div className="border-t border-white/5 pt-2">
                                <div className="flex justify-between text-xs text-white/40">
                                    <span>Próximos meses</span>
                                    <span>${priceUsd.toFixed(0)} USD/mes</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <DarkInput className="pl-9" type="text" placeholder="Nombre completo"
                            value={name} onChange={e => setName(e.target.value)} required minLength={2} />
                    </div>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <DarkInput className="pl-9" type="email" placeholder="tu@email.com"
                            value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>

                    <CouponInput
                        planId={plan.id}
                        onApplied={info => { setCouponInfo(info); setCouponCode(info.code); }}
                        onRemoved={() => { setCouponInfo(null); setCouponCode(null); }}
                    />

                    {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
                    <PrimaryButton type="submit" loading={loading}>Continuar →</PrimaryButton>
                    <p className="text-xs text-white/30 text-center">
                        Al continuar, creas una cuenta en Molink. Puedes cancelar en cualquier momento.
                    </p>
                </form>
            )}

            {/* Paso 2: OTP */}
            {step === 'otp' && (
                <OtpStep
                    emailMasked={emailMasked}
                    onSubmit={handleOtp}
                    onBack={() => setStep('details')}
                    loading={loading}
                    error={error}
                />
            )}

            {/* Paso 3: Pago */}
            {step === 'payment' && planSummary && (
                savedSources.length > 0 && !showNewCardForm ? (
                    <div className="space-y-5">
                        <PriceSummary planSummary={planSummary} billingCycle={billingCycle} couponInfo={couponInfo} />
                        {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
                        <SavedCardsSection
                            sources={savedSources}
                            loading={loading}
                            onPay={handlePaymentWithSource}
                            onUseNew={() => setShowNewCardForm(true)}
                        />
                    </div>
                ) : (
                    <SubscriptionCardStep
                        planSummary={planSummary}
                        billingCycle={billingCycle}
                        couponInfo={couponInfo}
                        onSubmit={handlePayment}
                        loading={loading}
                        error={error}
                        showBackToSaved={savedSources.length > 0}
                        onBackToSaved={() => setShowNewCardForm(false)}
                    />
                )
            )}

            {/* Paso 4: 3DS */}
            {step === 'threeds' && (
                        <ThreeDSStep
                    redirectUrl={redirectUrl}
                    transactionId={transactionId}
                    onSuccess={() => { setStep('success'); }}
                    onError={msg => { setError(msg); setStep('payment'); }}
                />
            )}

            {/* Paso 4b: Polling (PENDING sin 3DS) */}
            {step === 'polling' && (
                        <PollingStep
                    transactionId={transactionId}
                    onSuccess={() => { setStep('success'); }}
                    onError={msg => { setError(msg); setStep('payment'); }}
                />
            )}

            {/* Éxito */}
            {step === 'success' && (
                <SubscriptionSuccessStep email={email} onDone={() => navigate('/')} />
            )}
        </>
    );
}

