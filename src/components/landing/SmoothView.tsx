import type {ReactNode} from 'react';
import {useInView} from '../../hooks/landing/useInView.ts';

interface SmoothViewProps {
    children: ReactNode;
}

export const SmoothView = ({children}: SmoothViewProps) => {
    const {ref, inView} = useInView(0.2);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {children}
        </div>
    );
};