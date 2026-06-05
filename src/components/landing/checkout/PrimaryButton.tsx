import { Loader2 } from 'lucide-react';

/** Botón principal del checkout — blanco sobre negro */
export function PrimaryButton({
    children, loading, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
    return (
        <button
            {...rest}
            disabled={loading || rest.disabled}
            className="w-full flex items-center justify-center gap-2 bg-white text-[#0a0a0a] font-bold uppercase tracking-wider py-3.5 rounded-lg transition-all shadow-lg shadow-white/20 hover:bg-white/90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {children}
        </button>
    );
}

