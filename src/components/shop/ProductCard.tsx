import type {Product} from "../../types";
import {Cart3, LightningFill} from "react-bootstrap-icons";
import {StarRating} from "./StarRating.tsx";

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">

            {/* Discount Badge */}
            {product.discount && (
                <span className="absolute top-3 left-3 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-md z-10 border border-red-100">
          AHORRA {product.discount}%
        </span>
            )}

            {/* Image Area */}
            <div className="relative p-6 bg-slate-50/50 group-hover:bg-slate-50 transition-colors aspect-square flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                />
                {/* Quick Add Button Overlay */}
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 text-blue-600 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600">
                    <Cart3 className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{product.category}</span>
                    {product.deliveryTime.includes('Automática') && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    <LightningFill className="w-3 h-3 fill-current" /> AUTO
                </span>
                    )}
                </div>

                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors leading-relaxed">
                    {product.name}
                </h3>

                <div className="mb-4">
                    <StarRating rating={product.rating} count={product.reviews} />
                </div>

                <div className="mt-auto border-t border-slate-50 pt-3">
                    <div className="flex items-end justify-between">
                        <div>
                            {product.originalPrice && (
                                <span className="text-xs text-slate-400 line-through block mb-0.5">
                    ${product.originalPrice.toLocaleString('es-CO')}
                    </span>
                            )}
                            <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-slate-900">
                    ${product.price.toLocaleString('es-CO')}
                    </span>
                            </div>
                        </div>
                        {/* Simple Text Action */}
                        <span className="text-xs font-medium text-blue-600 group-hover:underline cursor-pointer">
                Ver detalle
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};