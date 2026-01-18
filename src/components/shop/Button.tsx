import React from "react";

export const Button = ({
                    children,
                    variant = 'primary',
                    className = '',
                    ...props
                }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'gradient' | 'outline' | 'ghost' }) => {
    const baseStyle = "px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm active:scale-95";
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/30 border border-white/10",
        outline: "bg-transparent border border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-600"
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};