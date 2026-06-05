import { useState } from 'react';
import { DarkInput } from './DarkInput.tsx';
import { PrimaryButton } from './PrimaryButton.tsx';

interface OtpStepProps {
    emailMasked: string;
    onSubmit: (e: React.FormEvent, otp: string) => void;
    onBack: () => void;
    loading: boolean;
    error: string;
}

/** Paso de verificación de código OTP enviado al email */
export function OtpStep({ emailMasked, onSubmit, onBack, loading, error }: OtpStepProps) {
    const [otp, setOtp] = useState('');
    return (
        <form onSubmit={e => onSubmit(e, otp)} className="space-y-5">
            <div>
                <h3 className="text-lg font-bold text-white">Verifica tu email</h3>
                <p className="text-white/50 text-sm mt-1">
                    Código de 6 dígitos enviado a{' '}
                    <span className="text-white font-medium">{emailMasked}</span>
                </p>
            </div>
            <DarkInput
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-3xl font-mono tracking-[0.5em]"
                maxLength={6}
                required
                autoFocus
            />
            {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}
            <PrimaryButton type="submit" loading={loading} disabled={otp.length < 6}>
                Verificar →
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

