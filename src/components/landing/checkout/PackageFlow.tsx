import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, FileText, Loader2 } from 'lucide-react';
import { wompiService } from '../../../services/shared/wompiService.ts';
import { packageService } from '../../../services/shared/packageService.ts';
import { customerAuthService } from '../../../services/shared/customerAuthService.ts';
import { parseCheckoutError } from '../../../utils/parseCheckoutError.ts';
import { formatCopFromCents } from '../../../utils/currency.ts';
import { CouponInput } from '../../shared/CouponInput.tsx';
import { DarkInput } from './DarkInput.tsx';
import { PrimaryButton } from './PrimaryButton.tsx';
import { StepDots } from './StepDots.tsx';
import { OtpStep } from './OtpStep.tsx';
import { SavedCardsSection } from './SavedCardsSection.tsx';
import { PackageCardStep } from './PackageCardStep.tsx';
import { PackageSuccessStep } from './PackageSuccessStep.tsx';
import { useUserAuth } from '../../../context/store/UserAuthContext.tsx';
import type {
    WompiCheckoutStep, WompiCardFormData, CouponInfo,
    PackageWithPrice, WompiPaymentSource,
} from '../../../types';

interface PackageFlowProps {
    package: PackageWithPrice;
}

export function PackageFlow({ package: pkg }: PackageFlowProps) {

    const priceUsd = parseFloat(pkg.priceUsd);
    const navigate = useNavigate();
    const { login } = useUserAuth();
    const [step, setStep] = useState<'details' | 'otp' | 'payment' | 'polling' | 'success'>('details');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [requirements, setRequirements] = useState('');
    const [emailMasked, setEmailMasked] = useState('');

    const [couponInfo, setCouponInfo] = useState<CouponInfo | null>(null);
    const [couponCode, setCouponCode] = useState<string | null>(null);

    const [savedSources, setSavedSources] = useState<WompiPaymentSource[]>([]);
    const [showNewCardForm, setShowNewCardForm] = useState(false);

    async function handleDetails(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const res = await packageService.initiateCheckout({
                package_id: pkg.id, email, name,
                ...(requirements ? { requirements } : {}),
                ...(couponCode ? { coupon_code: couponCode } : {}),
            });
            setEmailMasked(res.email ?? email);
            setStep('otp');
        } catch (err) { setError(parseCheckoutError(err, '[package]')); }
        finally { setLoading(false); }
    }

    async function handleOtp(e: React.FormEvent, otp: string) {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const res = await customerAuthService.verifyCode(email, otp.trim());
            login(res.user);
            setStep('payment');
            wompiService.getPaymentSources()
                .then(sources => { setSavedSources(sources); setShowNewCardForm(sources.length === 0); })
                .catch(() => setShowNewCardForm(true));
        } catch { setError('Código inválido o expirado. Revisa tu correo e intenta de nuevo.'); }
        finally { setLoading(false); }
    }

    async function processPollResult(orderId: string) {
        setStep('polling');
        const result = await packageService.pollOrderStatus(orderId);
        if (result === 'paid') {
            setStep('success');
        } else {
            setError(result === 'cancelled'
                ? 'Pago rechazado. Intenta con otra tarjeta.'
                : 'No pudimos confirmar el pago. Contáctanos para verificar.');
            setStep('payment');
        }
    }

    async function handlePaymentWithSource(wompiSourceId: number) {
        setLoading(true); setError('');
        try {
            const res = await packageService.payWithSource({
                package_id: pkg.id,
                payment_source_id: wompiSourceId,
                ...(requirements ? { requirements } : {}),
                ...(couponCode ? { coupon_code: couponCode } : {}),
            });
            if (res.wompi_status === 'APPROVED') {
                setStep('success');
            } else if (res.wompi_status === 'PENDING') {
                setLoading(false);
                await processPollResult(res.package_order.id);
            } else {
                setError('Tarjeta rechazada o no autorizada. Verifica e intenta de nuevo.');
            }
        } catch (err) { setError(parseCheckoutError(err, '[package]')); }
        finally { setLoading(false); }
    }

    async function handlePayment(card: WompiCardFormData) {
        setLoading(true); setError('');
        try {
            const res = await packageService.pay({
                package_id: pkg.id,
                card_number: card.cardNumber.replace(/\s/g, ''),
                cvc: card.cvc,
                exp_month: card.expMonth,
                exp_year: card.expYear,
                card_holder: card.cardHolder,
                installments: card.installments,
                ...(requirements ? { requirements } : {}),
                ...(couponCode ? { coupon_code: couponCode } : {}),
            });
            if (res.wompi_status === 'APPROVED') {
                setStep('success');
            } else if (res.wompi_status === 'PENDING') {
                setLoading(false);
                await processPollResult(res.package_order.id);
            } else {
                setError('Tarjeta rechazada o no autorizada. Verifica e intenta de nuevo.');
            }
        } catch (err) { setError(parseCheckoutError(err, '[package]')); }
        finally { setLoading(false); }
    }

    const dotStep: WompiCheckoutStep | null =
        step === 'details' ? 'details'
        : step === 'otp' ? 'otp'
        : step === 'payment' || step === 'polling' ? 'payment'
        : null;

    return (
        <>
            {dotStep && step !== 'success' && <StepDots current={dotStep} />}

            {/* Paso 1: Datos del cliente */}
            {step === 'details' && (
                <form onSubmit={handleDetails} className="space-y-5">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                        <p className="text-white/50 text-xs uppercase tracking-wider font-bold mb-2">Resumen del paquete</p>
                        <div className="flex justify-between items-start">
                            <span className="text-white font-semibold">{pkg.name}</span>
                            <div className="text-right">
                                <p className={`font-bold ${couponInfo ? 'line-through text-white/30 text-sm font-normal' : 'text-white'}`}>
                                    {formatCopFromCents(pkg.amountInCents)}
                                </p>
                                {couponInfo && (
                                    <p className="text-green-400 text-xs font-bold">
                                        {couponInfo.discountType === 'PERCENTAGE'
                                            ? `−${parseFloat(couponInfo.discountValue)}% descuento`
                                            : 'Descuento aplicado'}
                                    </p>
                                )}
                                <p className="text-white/30 text-xs">${priceUsd.toFixed(0)} USD · TRM {pkg.trm.rate.toLocaleString('es-CO')}</p>
                            </div>
                        </div>
                        {pkg.deliveryDaysMin && (
                            <p className="text-white/40 text-xs">
                                Entrega estimada: {pkg.deliveryDaysMin}–{pkg.deliveryDaysMax} días hábiles · Soporte {pkg.supportDays} días
                            </p>
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
                    <div className="relative">
                        <FileText size={16} className="absolute left-3 top-3.5 text-white/30" />
                        <textarea
                            placeholder="Requerimientos o notas del proyecto (opcional)"
                            value={requirements}
                            onChange={e => setRequirements(e.target.value)}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f30519]/60 transition-all resize-none text-sm"
                        />
                    </div>

                    <CouponInput
                        onApplied={info => { setCouponInfo(info); setCouponCode(info.code); }}
                        onRemoved={() => { setCouponInfo(null); setCouponCode(null); }}
                    />

                    {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
                    <PrimaryButton type="submit" loading={loading}>Continuar →</PrimaryButton>
                    <p className="text-xs text-white/30 text-center">
                        Al continuar, creas una cuenta en Molink y aceptas nuestros términos.
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
            {step === 'payment' && (
                savedSources.length > 0 && !showNewCardForm ? (
                    <div className="space-y-5">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">{pkg.name}</span>
                                <div className="text-right">
                                    <p className={`font-bold text-sm ${couponInfo ? 'line-through text-white/30' : 'text-white'}`}>
                                        ${priceUsd.toFixed(0)} USD
                                    </p>
                                    {couponInfo?.discountType === 'PERCENTAGE' && (
                                        <p className="text-green-400 text-xs font-bold">
                                            ${(priceUsd * (1 - parseFloat(couponInfo.discountValue) / 100)).toFixed(0)} USD
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
                        <SavedCardsSection
                            sources={savedSources}
                            loading={loading}
                            onPay={handlePaymentWithSource}
                            onUseNew={() => setShowNewCardForm(true)}
                        />
                    </div>
                ) : (
                    <PackageCardStep
                        pkg={pkg}
                        couponInfo={couponInfo}
                        onSubmit={handlePayment}
                        loading={loading}
                        error={error}
                        showBackToSaved={savedSources.length > 0}
                        onBackToSaved={() => setShowNewCardForm(false)}
                    />
                )
            )}

            {/* Polling */}
            {step === 'polling' && (
                <div className="text-center py-10 space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <Loader2 size={36} className="text-blue-400 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Procesando pago</h3>
                    <p className="text-white/50 text-sm">Estamos confirmando tu pago con Wompi.<br />Por favor no cierres esta página.</p>
                </div>
            )}

            {/* Éxito */}
            {step === 'success' && (
                <PackageSuccessStep pkg={pkg} email={email} onDone={() => navigate('/')} />
            )}
        </>
    );
}

