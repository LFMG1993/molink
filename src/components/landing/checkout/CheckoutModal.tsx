import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Loader2, CreditCard, Mail, User, Shield } from 'lucide-react';
import { wompiService } from '../../../services/shared/wompiService.ts';
import { customerAuthService } from '../../../services/shared/customerAuthService.ts';
import { formatCopFromCents, formatUsd, formatCardNumber } from '../../../utils/currency.ts';
import type {
    WompiPlan,
    WompiTrmRate,
    WompiCheckoutStep,
    WompiPlanSummary,
    WompiCardFormData,
} from '../../../types';

interface CheckoutModalProps {
    plan: WompiPlan;
    billingCycle: 'monthly' | 'annual';
    trm: WompiTrmRate | null;
    onClose: () => void;
}

function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f30519]/60 focus:bg-white/8 transition-all ${props.className ?? ''}`}
        />
    );
}

function PrimaryButton({
    children,
    loading,
    disabled,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
    return (
        <button
            {...rest}
            disabled={loading || disabled}
            className="w-full flex items-center justify-center gap-2 bg-[#f30519] text-white font-bold uppercase tracking-wider py-3.5 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-[#f30519]/30 hover:bg-red-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {children}
        </button>
    );
}

/** Indicador de pasos */
function StepIndicator({ current }: { current: WompiCheckoutStep }) {
    const steps: WompiCheckoutStep[] = ['details', 'otp', 'payment'];
    const currentIndex = steps.indexOf(current);
    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((step, i) => (
                <div
                    key={step}
                    className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                        i <= currentIndex ? 'bg-[#f30519]' : 'bg-white/10'
                    }`}
                />
            ))}
        </div>
    );
}

// Paso 1: Datos personales
interface DetailsStepProps {
    plan: WompiPlan;
    billingCycle: 'monthly' | 'annual';
    trm: WompiTrmRate | null;
    onSubmit: (email: string, name: string) => Promise<void>;
    loading: boolean;
    error: string;
}

function DetailsStep({ plan, billingCycle, trm, onSubmit, loading, error }: DetailsStepProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const priceUsd = billingCycle === 'annual'
        ? parseFloat(plan.annualPriceUsd ?? String(parseFloat(plan.priceUsd) * 12))
        : parseFloat(plan.priceUsd);
    const setupFeeUsd = parseFloat(plan.setupFeeUsd);
    const effectiveSetupFee = billingCycle === 'annual' ? 0 : setupFeeUsd;
    const totalUsd = priceUsd + effectiveSetupFee;
    const totalCop = trm ? Math.round(totalUsd * trm.usdCopRate) : null;

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(email, name); }} className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-white">Plan {plan.name}</h2>
                <p className="text-white/50 text-sm mt-1">Ingresa tus datos para crear tu cuenta</p>
            </div>

            {/* Resumen rápido del plan */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-1.5">
                <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                        {billingCycle === 'annual' ? 'Plan anual' : 'Plan mensual'}
                    </span>
                    <span className="text-white font-semibold">{formatUsd(priceUsd)}</span>
                </div>
                {billingCycle === 'monthly' && (
                    <div className="flex justify-between text-sm">
                        <span className="text-white/60">Setup fee (único)</span>
                        <span className="text-white font-semibold">{formatUsd(setupFeeUsd)}</span>
                    </div>
                )}
                {billingCycle === 'annual' && (
                    <div className="flex justify-between text-sm">
                        <span className="text-white/60">Setup fee</span>
                        <span className="text-green-400 font-semibold">¡GRATIS!</span>
                    </div>
                )}
                <div className="border-t border-white/10 pt-1.5 flex justify-between font-bold">
                    <span className="text-white">Total hoy</span>
                    <div className="text-right">
                        <p className="text-[#f30519]">{formatUsd(totalUsd)}</p>
                        {totalCop && (
                            <p className="text-xs text-white/40 font-normal">
                                ≈ {totalCop.toLocaleString('es-CO')} COP
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <DarkInput
                        className="pl-9"
                        type="text"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={2}
                    />
                </div>
                <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <DarkInput
                        className="pl-9"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

            <PrimaryButton type="submit" loading={loading}>
                {loading ? 'Enviando...' : 'Continuar →'}
            </PrimaryButton>

            <p className="text-xs text-white/30 text-center">
                Al continuar creas una cuenta en Molink. Puedes cancelar en cualquier momento.
            </p>
        </form>
    );
}

// Paso 2: Verificar OTP
interface OtpStepProps {
    emailMasked: string;
    onSubmit: (code: string) => Promise<void>;
    onBack: () => void;
    loading: boolean;
    error: string;
}

function OtpStep({ emailMasked, onSubmit, onBack, loading, error }: OtpStepProps) {
    const [otp, setOtp] = useState('');

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(otp); }} className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-white">Verifica tu email</h2>
                <p className="text-white/50 text-sm mt-1">
                    Enviamos un código de 6 dígitos a{' '}
                    <span className="text-white font-medium">{emailMasked}</span>
                </p>
            </div>

            <DarkInput
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-3xl font-mono tracking-[0.5em]"
                maxLength={6}
                required
                autoFocus
            />

            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

            <PrimaryButton type="submit" loading={loading} disabled={otp.length < 6}>
                {loading ? 'Verificando...' : 'Verificar →'}
            </PrimaryButton>

            <button
                type="button"
                onClick={onBack}
                className="w-full text-white/40 text-sm hover:text-white/70 transition-colors"
            >
                ← Cambiar email
            </button>
        </form>
    );
}

// Paso 3: Formulario de tarjeta
interface PaymentStepProps {
    planSummary: WompiPlanSummary;
    onSubmit: (card: WompiCardFormData) => Promise<void>;
    loading: boolean;
    error: string;
}

function PaymentStep({ planSummary, onSubmit, loading, error }: PaymentStepProps) {
    const [card, setCard] = useState<WompiCardFormData>({
        cardNumber: '', cardHolder: '', expMonth: '', expYear: '', cvc: '', installments: 1,
    });

    const initialUsd = planSummary.initial_charge_usd;

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(card); }} className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-white">Datos de pago</h2>
                <p className="text-white/50 text-sm mt-1">Tu pago es procesado de forma segura por Wompi</p>
            </div>

            {/* Resumen de cobro */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-white/60">Setup fee (único)</span>
                    <span className="text-white">{formatUsd(planSummary.setup_fee_usd)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                        {planSummary.billing_cycle === 'annual' ? 'Primer año' : 'Primer mes'}
                    </span>
                    <span className="text-white">{formatUsd(planSummary.price_usd)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                    <span className="text-white">Total hoy</span>
                    <div className="text-right">
                        <p className="text-[#f30519]">{formatUsd(initialUsd)}</p>
                        <p className="text-xs text-white/40 font-normal">
                            ≈ {formatCopFromCents(planSummary.initial_charge_cents)}
                        </p>
                        <p className="text-xs text-white/30 font-normal">
                            TRM: ${planSummary.trm.rate.toFixed(2)}
                        </p>
                    </div>
                </div>
                {planSummary.trial_days > 0 && (
                    <p className="text-green-400 text-xs mt-1">
                        ✓ {planSummary.trial_days} días de prueba gratis incluidos
                    </p>
                )}
            </div>

            {/* Campos de tarjeta */}
            <div className="space-y-3">
                <div className="relative">
                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <DarkInput
                        className="pl-9 font-mono"
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        value={card.cardNumber}
                        onChange={(e) => setCard({ ...card, cardNumber: formatCardNumber(e.target.value) })}
                        maxLength={19}
                        required
                    />
                </div>
                <DarkInput
                    type="text"
                    placeholder="NOMBRE EN LA TARJETA"
                    value={card.cardHolder}
                    onChange={(e) => setCard({ ...card, cardHolder: e.target.value.toUpperCase() })}
                    className="uppercase"
                    required
                />
                <div className="grid grid-cols-3 gap-3">
                    <DarkInput
                        type="text"
                        placeholder="MM"
                        value={card.expMonth}
                        onChange={(e) => setCard({ ...card, expMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })}
                        maxLength={2}
                        required
                    />
                    <DarkInput
                        type="text"
                        placeholder="AA"
                        value={card.expYear}
                        onChange={(e) => setCard({ ...card, expYear: e.target.value.replace(/\D/g, '').slice(0, 2) })}
                        maxLength={2}
                        required
                    />
                    <DarkInput
                        type="password"
                        placeholder="CVV"
                        value={card.cvc}
                        onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        maxLength={4}
                        required
                    />
                </div>
                <div>
                    <select
                        value={card.installments}
                        onChange={(e) => setCard({ ...card, installments: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f30519]/60 transition-all"
                        required
                    >
                        {[1, 3, 6, 12, 24, 36].map((n) => (
                            <option key={n} value={n} className="bg-[#0d0d0d]">
                                {n === 1 ? 'Pago de contado (1 cuota)' : `${n} cuotas`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

            <PrimaryButton type="submit" loading={loading}>
                {loading ? 'Procesando...' : `Pagar ${formatUsd(initialUsd)} y activar`}
            </PrimaryButton>

            <div className="flex items-center justify-center gap-1.5 text-xs text-white/30">
                <Shield size={12} />
                <span>Pago seguro procesado por Wompi · No almacenamos datos de tu tarjeta</span>
            </div>
        </form>
    );
}

// Paso 4b: Polling (PENDING sin 3DS)
function PollingStep({ transactionId, onSuccess, onError }: {
    transactionId: string;
    onSuccess: () => void; onError: (msg: string) => void;
}) {
    useEffect(() => {
        let attempts = 0;
        const MAX_ATTEMPTS = 12;
        const interval = setInterval(async () => {
            attempts++;
            try {
                const res = await wompiService.getTransactionStatus(transactionId);
                if (res.status === 'APPROVED') {
                    clearInterval(interval);
                    onSuccess();
                } else if (res.status === 'DECLINED' || res.status === 'ERROR') {
                    clearInterval(interval);
                    onError('El pago fue rechazado. Intenta con otra tarjeta.');
                } else if (attempts >= MAX_ATTEMPTS) {
                    clearInterval(interval);
                    onSuccess();
                }
            } catch {
                if (attempts >= MAX_ATTEMPTS) {
                    clearInterval(interval);
                    onSuccess();
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Loader2 size={36} className="text-blue-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-white">Verificando tu pago…</h3>
            <p className="text-white/50 text-sm max-w-xs mx-auto">
                Esto puede tardar unos segundos. No cierres esta página.
            </p>
            <p className="text-white/30 text-xs">Tu tarjeta ya fue procesada correctamente.</p>
        </div>
    );
}

// Paso 4: 3DS
interface ThreeDSStepProps {
    redirectUrl: string;
    transactionId: string;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

function ThreeDSStep({ redirectUrl, transactionId, onSuccess, onError }: ThreeDSStepProps) {
    const popupRef = useRef<Window | null>(null);

    useEffect(() => {
        // Abrir popup de autenticación 3DS
        popupRef.current = window.open(redirectUrl, '3DS_Auth', 'width=520,height=640,left=200,top=100');

        // Escuchar postMessage desde la página callback
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            if (event.data === '3ds_complete') {
                clearInterval(pollInterval);
                checkStatus();
            }
        };
        window.addEventListener('message', handleMessage);

        // Polling para detectar cierre del popup (fallback)
        const pollInterval = setInterval(async () => {
            if (popupRef.current?.closed) {
                clearInterval(pollInterval);
                window.removeEventListener('message', handleMessage);
                checkStatus();
            }
        }, 1000);

        async function checkStatus() {
            try {
                const res = await wompiService.getTransactionStatus(transactionId);
                if (res.status === 'APPROVED') {
                    onSuccess();
                } else {
                    onError('El pago no fue aprobado. Intenta con otra tarjeta.');
                }
            } catch {
                onError('No se pudo verificar el estado del pago. Revisa tu correo.');
            }
        }

        return () => {
            clearInterval(pollInterval);
            window.removeEventListener('message', handleMessage);
        };
    }, [redirectUrl, transactionId]);

    return (
        <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <Shield size={36} className="text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Autenticación 3DS</h3>
            <p className="text-white/50 text-sm max-w-xs mx-auto">
                Se abrió una ventana de tu banco para verificar tu identidad. No cierres esta página.
            </p>
            <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
                <Loader2 size={14} className="animate-spin" />
                <span>Esperando autenticación...</span>
            </div>
            <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-[#f30519] underline underline-offset-2"
            >
                ¿No se abrió la ventana? Haz clic aquí
            </a>
        </div>
    );
}

// Paso 5: Éxito
function SuccessStep({ email, onClose }: { email: string; onClose: () => void }) {
    return (
        <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">¡Suscripción activa!</h2>
                <p className="text-white/50 text-sm mt-2">
                    Te enviamos los detalles a{' '}
                    <span className="text-white font-medium">{email}</span>
                </p>
            </div>
            <button
                onClick={onClose}
                className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg hover:bg-green-700 transition-colors"
            >
                ¡Entendido! Comenzar →
            </button>
        </div>
    );
}

// Modal principal
export function CheckoutModal({ plan, billingCycle, trm, onClose }: CheckoutModalProps) {
    const [step, setStep] = useState<WompiCheckoutStep>('details');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [emailMasked, setEmailMasked] = useState('');
    const [planSummary, setPlanSummary] = useState<WompiPlanSummary | null>(null);
    const [transactionId, setTransactionId] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');

    function parseError(err: unknown): string {
        if (err && typeof err === 'object' && 'response' in err) {
            const e = err as {
                response?: {
                    status?: number;
                    data?: {
                        error?: string;
                        message?: string;
                        errors?: Record<string, string[]>;
                        details?: Record<string, string[]>;
                    };
                };
            };
            const status = e.response?.status;
            const data = e.response?.data;
            const fieldLabel: Record<string, string> = {
                card_holder: 'Titular', card_number: 'Número de tarjeta',
                cvc: 'CVV', exp_month: 'Mes', exp_year: 'Año',
            };
            const fieldErrors = data?.errors ?? (
                data?.details && !('api' in data.details) ? data.details : undefined
            );
            if (fieldErrors) {
                return Object.entries(fieldErrors)
                    .map(([f, msgs]) => `${fieldLabel[f] ?? f}: ${msgs.join(', ')}`)
                    .join(' · ');
            }
            if (data?.details?.['api']?.includes('Unauthorized')) {
                return 'No pudimos procesar tu pago. Contáctanos por WhatsApp para completar tu compra.';
            }
            if (data?.error) return `${data.error}${status ? ` (${status})` : ''}`;
            if (data?.message) return data.message;
        }
        return 'Ocurrió un error inesperado. Intenta de nuevo.';
    }

    // Paso 1: Iniciar checkout
    async function handleDetails(userEmail: string, userName: string) {
        setLoading(true);
        setError('');
        try {
            const res = await wompiService.initiateCheckout({
                email: userEmail,
                name: userName,
                plan_id: plan.id,
                billing_cycle: billingCycle,
            });
            setEmail(userEmail);
            setEmailMasked(res.emailMasked);
            setPlanSummary(res.planSummary);
            setStep('otp');
        } catch (err) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    }

    // Paso 2: Verificar OTP
    async function handleOtp(code: string) {
        setLoading(true);
        setError('');
        try {
            await customerAuthService.verifyCode(email, code.trim());
            setStep('payment');
        } catch {
            setError('Código inválido o expirado. Verifica en tu correo e intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    // Paso 3: Pagar con tarjeta
    async function handlePayment(card: WompiCardFormData) {
        setLoading(true);
        setError('');
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
            });

            const { transaction } = res;
            const txId = transaction?.wompi_transaction_id || transaction?.id || '';

            if (!transaction || transaction.status === 'APPROVED') {
                setStep('success');
            } else if (transaction.status === 'PENDING' && transaction.redirect_url) {
                // Flujo 3DS: abrir ventana del banco
                setTransactionId(txId);
                setRedirectUrl(transaction.redirect_url);
                setStep('threeds');
            } else if (transaction.status === 'PENDING') {
                setTransactionId(txId);
                setStep('polling');
            } else {
                setError('El pago fue declinado. Verifica los datos de tu tarjeta o usa otra.');
            }
        } catch (err) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    }

    // Prevenir cierre accidental en pasos intermedios
    function handleClose() {
        if (step === 'success') { onClose(); return; }
        if (step === 'threeds' || step === 'polling') return;
        const confirmClose = step !== 'details'
            ? window.confirm('¿Seguro que deseas cancelar? Perderás el progreso del checkout.')
            : true;
        if (confirmClose) onClose();
    }

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">

                {/* Línea decorativa superior */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#f30519] to-transparent" />

                {/* Header */}
                {step !== 'success' && (
                    <div className="flex items-center justify-between px-6 pt-5 pb-3">
                        <span className="text-xs text-white/30 uppercase tracking-widest font-bold">
                            Checkout seguro
                        </span>
                        {step !== 'threeds' && (
                            <button
                                onClick={handleClose}
                                className="text-white/30 hover:text-white/70 transition-colors"
                                aria-label="Cerrar"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}

                {/* Indicador de pasos */}
                {(step === 'details' || step === 'otp' || step === 'payment') && (
                    <div className="px-6">
                        <StepIndicator current={step} />
                    </div>
                )}

                {/* Contenido */}
                <div className="px-6 pb-6">
                    {step === 'details' && (
                        <DetailsStep
                            plan={plan}
                            billingCycle={billingCycle}
                            trm={trm}
                            onSubmit={handleDetails}
                            loading={loading}
                            error={error}
                        />
                    )}
                    {step === 'otp' && (
                        <OtpStep
                            emailMasked={emailMasked}
                            onSubmit={handleOtp}
                            onBack={() => setStep('details')}
                            loading={loading}
                            error={error}
                        />
                    )}
                    {step === 'payment' && planSummary && (
                        <PaymentStep
                            planSummary={planSummary}
                            onSubmit={handlePayment}
                            loading={loading}
                            error={error}
                        />
                    )}
                    {step === 'threeds' && (
                        <ThreeDSStep
                            redirectUrl={redirectUrl}
                            transactionId={transactionId}
                            onSuccess={() => setStep('success')}
                            onError={(msg) => { setError(msg); setStep('payment'); }}
                        />
                    )}
                    {step === 'polling' && (
                        <PollingStep
                            transactionId={transactionId}
                            onSuccess={() => setStep('success')}
                            onError={(msg) => { setError(msg); setStep('payment'); }}
                        />
                    )}
                    {step === 'success' && (
                        <SuccessStep email={email} onClose={onClose} />
                    )}
                </div>
            </div>
        </div>
    );
}

