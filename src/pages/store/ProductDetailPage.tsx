import {useState, useMemo, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {shopService} from '../../services/store/shopService.ts';
import {useCart} from '../../context/store/CardContext.tsx';
import {StoreSEO} from '../../components/store/StoreSEO.tsx';
import {Spinner} from '../../components/shared/Spinner.tsx';
import {FileImage, Plus, Minus, CheckCircle} from 'lucide-react';
import {StoreHeader} from "../../components/store/layout/StoreHeader.tsx";
import {StoreFooter} from "../../components/store/layout/StoreFooter.tsx";
import {Button} from "../../components/shared/Button.tsx";

export default function ProductDetailPage() {
    const {id} = useParams<{ id: string }>();
    const {addItem} = useCart();

    const {data: product, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => shopService.getPublicProductById(id!),
        enabled: !!id,
    });

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);
    const [displayImage, setDisplayImage] = useState<string | null>(null);
    const [addedToCart, setAddedToCart] = useState(false);

    // Inicializa la imagen y las opciones seleccionadas cuando el producto se carga
    useEffect(() => {
        if (product) {
            setDisplayImage(product.imageUrl);
            // Pre-selecciona la primera opción de cada atributo si solo hay una
            const initialOptions: Record<string, string> = {};
            product.variants.forEach(variant => {
                variant.variantValues?.forEach(vv => {
                    const attrName = vv.attributeValue.attribute.name;
                    if (!initialOptions[attrName]) {
                        initialOptions[attrName] = vv.attributeValue.value;
                    }
                });
            });
            setSelectedOptions(initialOptions);
        }
    }, [product]);

    const attributeOptions = useMemo(() => {
        if (!product) return {};
        const options: Record<string, Set<string>> = {};
        product.variants.forEach(variant => {
            variant.variantValues?.forEach(vv => {
                const attrName = vv.attributeValue.attribute.name;
                if (!options[attrName]) {
                    options[attrName] = new Set();
                }
                options[attrName].add(vv.attributeValue.value);
            });
        });
        return options;
    }, [product]);

    const selectedVariant = useMemo(() => {
        if (!product || Object.keys(selectedOptions).length < Object.keys(attributeOptions).length) return null;
        return product.variants.find(variant =>
            variant.variantValues?.every(vv =>
                selectedOptions[vv.attributeValue.attribute.name] === vv.attributeValue.value
            )
        );
    }, [product, selectedOptions, attributeOptions]);

    useEffect(() => {
        if (selectedVariant?.imageUrl) {
            setDisplayImage(selectedVariant.imageUrl);
        } else if (product) {
            setDisplayImage(product.imageUrl);
        }
    }, [selectedVariant, product]);

    const handleOptionClick = (attributeName: string, value: string) => {
        setSelectedOptions(prev => ({...prev, [attributeName]: value}));
    };

    const handleAddToCart = () => {
        if (!product || !selectedVariant) return;
        addItem(product, quantity, selectedVariant.id);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000); // El mensaje desaparece después de 2 segundos
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner/></div>;
    }

    if (isError) {
        return <div className="text-center py-20 text-red-500">Error al cargar el
            producto: {(error as Error).message}</div>;
    }

    if (!product) {
        return <div className="text-center py-20">Producto no encontrado.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <StoreHeader/>
            <StoreSEO
                title={`${product.name} | Molink Tienda`}
                description={product.description || ''}
                ogImage={product.imageUrl || ''}
                canonicalUrl={`/products/${product.id}`}
            />
            <div className="container mx-auto px-4 py-12 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Columna de Imagen */}
                    <div className="w-full aspect-square bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
                        {displayImage ? (
                            <img src={displayImage} alt={product.name}
                                 className="w-full h-full object-contain rounded-2xl p-4"/>
                        ) : (
                            <FileImage className="w-24 h-24 text-slate-300"/>
                        )}
                    </div>

                    {/* Columna de Detalles */}
                    <div className="flex flex-col">
                        {product.category && (
                            <Link to={`/products?categories=${product.category.id}`}
                                  className="text-sm text-blue-600 hover:underline mb-2 font-medium">
                                {product.category.name}
                            </Link>
                        )}
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">{product.name}</h1>
                        <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>

                        <div className="space-y-6">
                            {Object.entries(attributeOptions).map(([attributeName, values]) => (
                                <div key={attributeName}>
                                    <h4 className="font-semibold mb-2 text-slate-800">{attributeName}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(values).map(value => (
                                            <button
                                                key={value}
                                                onClick={() => handleOptionClick(attributeName, value)}
                                                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                                                    selectedOptions[attributeName] === value
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                                                }`}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <div className="text-3xl font-bold text-slate-900">
                                {selectedVariant ? (
                                    <span>${(selectedVariant.salePrice || selectedVariant.price).toLocaleString('es-CO')}</span>
                                ) : (
                                    <span className="text-slate-400 text-xl">Selecciona las opciones para ver el precio</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-2 h-6 text-sm text-green-600 font-medium">
                            {selectedVariant?.volumeDiscounts && selectedVariant.volumeDiscounts.length > 0 && (
                                <span>
                                    Lleva {selectedVariant.volumeDiscounts[0].minQuantity} o más a ${selectedVariant.volumeDiscounts[0].price.toLocaleString('es-CO')} c/u
                                </span>
                            )}
                        </div>

                        {selectedVariant && (
                            <div className="mt-8 border-t border-slate-100 pt-6">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="quantity" className="font-semibold text-slate-800">Cantidad:</label>
                                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                className="p-2.5 hover:bg-slate-50 transition-colors text-slate-600"
                                                aria-label="Disminuir cantidad">
                                            <Minus className="h-4 w-4"/>
                                        </button>
                                        <span className="px-5 font-semibold text-slate-900 text-lg border-x border-slate-200">{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)}
                                                className="p-2.5 hover:bg-slate-50 transition-colors text-slate-600"
                                                aria-label="Aumentar cantidad">
                                            <Plus className="h-4 w-4"/>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button
                                        onClick={handleAddToCart}
                                        variant="gradient"
                                        className="w-full py-3 text-base"
                                    >
                                        {addedToCart ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 mr-2"/>
                                                ¡Añadido al carrito!
                                            </>
                                        ) : (
                                            'Añadir al Carrito'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <StoreFooter/>
        </div>
    );
}