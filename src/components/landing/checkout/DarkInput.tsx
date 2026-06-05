/** Input con estilo oscuro para el checkout */
export function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f30519]/60 transition-all ${props.className ?? ''}`}
        />
    );
}

