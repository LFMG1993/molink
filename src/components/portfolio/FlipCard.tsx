import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface FlipCardProps {
    imageUrl: string;
    title: string;
    date: string;
    slug: string;
    description: string;
    flipDirection?: 'horizontal' | 'vertical';
}

const FlipCard = ({
                      imageUrl,
                      date,
                      slug,
                      title,
                      description,
                      flipDirection = 'horizontal',
                  }: FlipCardProps) => {
    const [animationClass, setAnimationClass] = useState('');

    const handleMouseEnter = () => {
        setAnimationClass(flipDirection === 'vertical' ? 'animate-flip-x' : 'animate-flip-y');
    };

    const handleMouseLeave = () => {
        setAnimationClass(flipDirection === 'vertical' ? 'animate-flip-x-back' : 'animate-flip-y-back');
    };

    const isVertical = flipDirection === 'vertical';

    return (
        <div
            className="w-[420px] h-[540px] cursor-pointer group"
            style={{ perspective: '1200px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={clsx(
                    'relative w-full h-full rounded-xl shadow-2xl transition-shadow duration-300',
                    'group-hover:shadow-[#f30519]/40',
                    '[transform-style:preserve-3d]',
                    animationClass
                )}
            >
                {/* Cara Frontal */}
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-xl [backface-visibility:hidden] bg-black p-8 flex flex-col justify-between z-10"
                >
                    {/* Año del proyecto en la parte superior derecha */}
                    <div className="self-end bg-black/50 px-3 py-1 rounded-lg">
                        <span className="text-white font-semibold text-2xl">{date}</span>
                    </div>

                    <div className="flex-grow flex justify-center items-center">
                        <img src={imageUrl} alt={`Proyecto ${title}`} className="w-4/5 h-auto max-h-full object-contain rounded-lg" />
                    </div>

                    {/* Título en la parte inferior */}
                    <h1 className="text-3xl text-center font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                        {title}
                    </h1>
                </div>

                {/* Cara Trasera */}
                <div
                    className={clsx(
                        'absolute top-0 left-0 w-full h-full rounded-xl [backface-visibility:hidden] bg-gradient-to-br from-surface to-[#1a1a1d] p-8 text-white flex flex-col',
                        isVertical ? '[transform:rotateX(180deg)]' : '[transform:rotateY(180deg)]'
                    )}
                >
                    <div className="flex-grow flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold mb-2 text-[#ffcc70] mt-2">{title}</h2>
                        <p className="text-base leading-relaxed text-gray-300 text-justify">{description}</p>
                    </div>
                    <div className="mt-6 text-center">
                        <Link
                            to={`/portfolio/${slug}`}
                            className="inline-block bg-accent text-white font-bold uppercase tracking-wider py-2 px-6 rounded-md transition-all duration-300 hover:bg-red-800 hover:scale-105"
                        >
                            Conocer más
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;