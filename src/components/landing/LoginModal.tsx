import { useState } from 'react';
import { X, Mail, Loader2, Shield } from 'lucide-react';
import { customerAuthService } from '../../services/shared/customerAuthService.ts';
import { useCustomerAuthStore } from '../../store/customerAuthStore.ts';

interface LoginModalProps {
    onClose: () => void;
}

type LoginStep = 'email' | 'otp';

export function LoginModal({ onClose }: LoginModalProps) {
    const login = useCustomerAuthStore((s) => s.login);
    const [step, setStep] = useState<LoginStep>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSendCode(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            await customerAuthService.requestCode(email);
            setStep('otp');
        } catch {
            setError('No pudimos enviar el código. ¿Tienes una cuenta activa con ese correo?');
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const res = await customerAuthService.verifyCode(email, otp.trim());
            login(res.user);
            onClose();
        } catch {
            setError('Código inválido o expirado. Revisa tu correo e intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Ingresar a tu cuenta</h2>
                    <p className="text-white/50 text-sm mt-1">
                        {step === 'email'
                            ? 'Te enviaremos un código a tu correo.'
                            : `Ingresa el código enviado a ${email}`}
                    </p>
                </div>

                {error && (
                    <p className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                {step === 'email' && (
                    <form onSubmit={handleSendCode} className="space-y-4">
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f30519]/60 transition-all text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#f30519] text-white font-bold py-3 rounded-lg hover:bg-[#d10415] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Enviar código →'}
                        </button>
                    </form>
                )}

                {step === 'otp' && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Código de 6 dígitos"
                            value={otp}
                            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            maxLength={6}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-center text-xl tracking-[0.5em] placeholder:text-white/20 placeholder:text-base placeholder:tracking-normal focus:outline-none focus:border-[#f30519]/60 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={loading || otp.length < 4}
                            className="w-full bg-[#f30519] text-white font-bold py-3 rounded-lg hover:bg-[#d10415] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Ingresar →'}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setStep('email'); setOtp(''); setError(''); }}
                            className="w-full text-white/40 text-sm hover:text-white/70 transition-colors"
                        >
                            ← Cambiar correo
                        </button>
                    </form>
                )}

                <div className="mt-4 flex items-center justify-center gap-1.5 text-white/20 text-xs">
                    <Shield size={10} />
                    <span>Acceso seguro · Sin contraseña</span>
                </div>
            </div>
        </div>
    );
}
