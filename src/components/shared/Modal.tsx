import React, {useEffect, useRef} from 'react';
import {X} from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, children, size = 'md', className}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Efecto para cerrar el modal con la tecla 'Escape'
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Efecto para cerrar el modal al hacer clic fuera de él
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                className={`${className || 'bg-[var(--color-card)] text-[var(--color-foreground)]'} rounded-xl shadow-2xl w-full ${sizeClasses[size]} transform transition-all duration-300 border border-white/10`}
            >
                <div className="flex justify-between items-center p-5 border-b border-white/10">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <X className="h-6 w-6"/>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};