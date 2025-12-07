import React, { useState,type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

interface CarouselProps {
    children: ReactNode[];
    slidesToShow?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, slidesToShow = 1 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? children.length - slidesToShow : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex >= children.length - slidesToShow;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        const newIndex = Math.min(slideIndex, children.length - slidesToShow);
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full h-full group">
            {/* Contenedor de los slides */}
            <div className="relative h-full overflow-hidden">
                <div
                    className="flex transition-transform ease-out duration-500 h-full"
                    style={{ transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)` }}
                >
                    {children.map((child, index) => (
                        <div key={index} className="h-full px-4" style={{ flex: `0 0 ${100 / slidesToShow}%` }}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón Izquierdo */}
            <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 z-10 p-2 bg-surface rounded-full text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronLeft className="text-2xl" />
            </button>

            {/* Botón Derecho */}
            <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-8 z-10 p-2 bg-surface rounded-full text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight className="text-2xl" />
            </button>

            {/* Puntos de Navegación */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex space-x-2">
                {children.map((_, slideIndex) => (
                    <button key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`w-3 h-3 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-red-700' : 'bg-white/50 hover:bg-white'}`}></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;