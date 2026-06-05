import { useState } from 'react';
import { CreditCard, Shield } from 'lucide-react';
import { formatCardNumber, formatCopFromCents } from '../../../utils/currency.ts';
import { DarkInput } from './DarkInput.tsx';
import { PrimaryButton } from './PrimaryButton.tsx';
import type { PackageWithPrice, WompiCardFormData, CouponInfo } from '../../../types';

interface PackageCardStepProps {
    pkg: PackageWithPrice;
    couponInfo: CouponInfo | null;
    onSubmit: (card: WompiCardFormData) => void;
    loading: boolean;
    error: string;
    showBackToSaved?: boolean;
    onBackToSaved?: () => void;
}

/** Formulario de tarjeta para el flujo de pago único de paquetes */
export function PackageCardStep({
    pkg,
    couponInfo,
    onSubmit,
    loading,
    error,
    showBackToSaved,
    onBackToSaved,
}: PackageCardStepProps) {
    const [card, setCard] = useState<WompiCardFormData>({
        cardNumber: '', cardHolder: '', expMonth: '', expYear: '', cvc: '', installments: 1,
    });

    const priceUsd = parseFloat(pkg.priceUsd);
    const discountedUsd = couponInfo?.discountType === 'PERCENTAGE'
        ? priceUsd * (1 - parseFloat(couponInfo.discountValue) / 100)
        : priceUsd;
    const discountedCents = couponInfo?.discountType === 'PERCENTAGE'
        ? Math.round(pkg.amountInCents * (1 - parseFloat(couponInfo.discountValue) / 100))
        : pkg.amountInCents;

    return (
        <form onSubmit={e => { e.preventDefault(); onSubmit(card); }} className="space-y-5">
            {/* Resumen de cobro */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
                <p className="text-white/50 text-xs uppercase tracking-wider font-bold mb-2">Total a pagar</p>
                <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">{pkg.name}</span>
                    <span className="text-white font-semibold text-sm">${priceUsd.toFixed(0)} USD</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                    <span className="text-white">Total hoy</span>
                    <div className="text-right">
                        <p className={`${couponInfo ? 'line-through text-white/30 text-sm font-normal' : 'text-white text-lg'}`}>
                            ${priceUsd.toFixed(0)} USD
                        </p>
                        {couponInfo ? (
                            <>
                                <p className="text-green-400 text-sm font-bold">
                                    {couponInfo.discountType === 'PERCENTAGE'
                                        ? `−${parseFloat(couponInfo.discountValue)}% aplicado`
                                        : 'Descuento aplicado'}
                                </p>
                                <p className="text-white font-bold text-lg">${discountedUsd.toFixed(0)} USD</p>
                                <p className="text-white/40 text-xs font-normal">
                                    ≈ {formatCopFromCents(discountedCents)} · TRM {pkg.trm.rate.toLocaleString('es-CO')}
                                </p>
                            </>
                        ) : (
                            <p className="text-white/40 text-xs font-normal">
                                ≈ {formatCopFromCents(pkg.amountInCents)} · TRM {pkg.trm.rate.toLocaleString('es-CO')}
                            </p>
                        )}
                    </div>
                </div>
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
                        onChange={e => setCard({ ...card, cardNumber: formatCardNumber(e.target.value) })}
                        maxLength={19}
                        required
                    />
                </div>
                <DarkInput
                    type="text"
                    placeholder="NOMBRE EN LA TARJETA"
                    value={card.cardHolder}
                    onChange={e => setCard({ ...card, cardHolder: e.target.value.toUpperCase() })}
                    className="uppercase"
                    required
                    minLength={5}
                    title="Mínimo 5 caracteres"
                />
                <div className="grid grid-cols-3 gap-3">
                    <DarkInput
                        type="text" placeholder="MM" value={card.expMonth}
                        onChange={e => setCard({ ...card, expMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })}
                        maxLength={2} required
                    />
                    <DarkInput
                        type="text" placeholder="AA" value={card.expYear}
                        onChange={e => setCard({ ...card, expYear: e.target.value.replace(/\D/g, '').slice(0, 2) })}
                        maxLength={2} required
                    />
                    <DarkInput
                        type="password" placeholder="CVV" value={card.cvc}
                        onChange={e => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        maxLength={4} required
                    />
                </div>

                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider font-bold mb-1.5">
                        Número de cuotas
                    </label>
                    <select
                        value={card.installments}
                        onChange={e => setCard({ ...card, installments: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f30519]/60 transition-all"
                    >
                        {[1, 2, 3, 6, 12, 18, 24, 36].map(n => (
                            <option key={n} value={n} className="bg-[#111] text-white">
                                {n === 1 ? '1 cuota (sin intereses*)' : `${n} cuotas`}
                            </option>
                        ))}
                    </select>
                    <p className="text-white/25 text-xs mt-1">*Las cuotas con interés las define tu banco.</p>
                </div>
            </div>

            {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            <PrimaryButton type="submit" loading={loading}>
                {loading ? 'Procesando...' : `Pagar $${discountedUsd.toFixed(0)} USD`}
            </PrimaryButton>

            {showBackToSaved && onBackToSaved && (
                <button
                    type="button"
                    onClick={onBackToSaved}
                    className="w-full text-white/40 text-sm hover:text-white/70 transition-colors"
                >
                    ← Usar tarjeta guardada
                </button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs text-white/20">
                <Shield size={12} />
                <span>Pago seguro por Wompi · No almacenamos datos de tu tarjeta</span>
            </div>
        </form>
    );
}

