import type {Product} from "../../types";
import {Cart3, FileImage, LightningFill} from "react-bootstrap-icons";

interface Props {
    product: Product;
    onAdd?: () => void;
}

export const ProductCard = ({product, onAdd}: Props) => {
    const displayVariant = product.variants?.[0];
    const displayPrice = displayVariant?.salePrice ?? displayVariant?.price;
    const hasDiscount = !!(displayVariant?.salePrice && displayVariant.salePrice < displayVariant.price);
    const discountPct = hasDiscount
        ? Math.round((1 - displayVariant!.salePrice! / displayVariant!.price) * 100)
        : null;

    return (
        <div className="bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">

            {/* Badge de descuento */}
            {discountPct && (
                <span className="absolute top-3 left-3 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-md z-10 border border-red-100">
                    AHORRA {discountPct}%
                </span>
            )}

            {/* Área de imagen */}
            <div className="relative p-6 bg-slate-50/50 group-hover:bg-slate-50 transition-colors aspect-square flex items-center justify-center">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <FileImage className="w-16 h-16 text-slate-300"/>
                )}
                {/* Botón rápido de añadir */}
                {onAdd && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd();
                        }}
                        className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 text-blue-600 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                        <Cart3 className="w-5 h-5"/>
                    </button>
                )}
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col flex-1">
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {product.category?.name}
                    </span>
                    {hasDiscount && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <LightningFill className="w-3 h-3 fill-current"/> OFERTA
                        </span>
                    )}
                </div>

                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors leading-relaxed">
                    {product.name}
                </h3>

                <div className="mt-auto border-t border-slate-50 pt-3">
                    <div className="flex items-end justify-between">
                        <div>
                            {hasDiscount && (
                                <span className="text-xs text-slate-400 line-through block mb-0.5">
                                    ${displayVariant!.price.toLocaleString('es-CO')}
                                </span>
                            )}
                            <span className="text-lg font-bold text-slate-900">
                                {displayPrice != null ? `$${displayPrice.toLocaleString('es-CO')}` : '—'}
                            </span>
                        </div>
                        <span className="text-xs font-medium text-blue-600 group-hover:underline cursor-pointer">
                            Ver detalle
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

