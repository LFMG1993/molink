import type { WompiCheckoutStep } from '../../../types';

/** Barra de progreso de pasos del checkout */
export function StepDots({ current }: { current: WompiCheckoutStep }) {
    const steps: WompiCheckoutStep[] = ['details', 'otp', 'payment'];
    const idx = steps.indexOf(current);
    return (
        <div className="flex justify-center gap-2 mb-8">
            {steps.map((s, i) => (
                <div
                    key={s}
                    className={`h-1.5 w-10 rounded-full transition-all ${
                        i <= idx ? 'bg-white ring-1 ring-[#f30519]/50' : 'bg-white/10'
                    }`}
                />
            ))}
        </div>
    );
}

