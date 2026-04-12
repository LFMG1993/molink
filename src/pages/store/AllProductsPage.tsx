import {useState, Fragment, useMemo} from "react";
import {useProductFilter} from "../../hooks/useProductFilter.ts";
import FilterSidebar from "../../components/shop/FilterSidebar.tsx";
import {ProductCard} from "../../components/shop/ProductCard.tsx";
import {useCart} from "../../context/CardContext.tsx";
import type {Product} from "../../types";
import {SEO} from "../../components/shared/SEO.tsx";
import {ProductDetailModal} from "../../components/shop/ProductDetailModal.tsx";
import {shopService} from '../../services/shopService.ts';
import {Spinner} from "../../components/shared/Spinner.tsx";
import {Dialog, Transition} from '@headlessui/react';
import {Filter, X} from 'lucide-react';
import {useInfiniteQuery} from "@tanstack/react-query";
import {Button} from "../../components/shop/Button.tsx";
import {StoreHeader} from "../../components/shop/StoreHeader.tsx";
import {StoreFooter} from "../../components/shop/StoreFooter.tsx";

export default function AllProductsPage() {
    const {
        searchText,
        setSearchText,
        selectedCategoryIds,
        toggleCategory,
        clearFilters,
        isLoading,
        hierarchicalCategories,
        filterableAttributes,
        selectedAttributes,
        toggleAttribute,
    } = useProductFilter();

    const {addItem} = useCart();
    const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Extraemos los IDs de los valores de atributos seleccionados
    const attributeValueIds = useMemo(() => {
        return Object.values(selectedAttributes).flat();
    }, [selectedAttributes]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingProducts
    } = useInfiniteQuery({
        queryKey: ['allPublicProducts', searchText, selectedCategoryIds, selectedAttributes, {isActive:true}],
        queryFn: ({pageParam = 1}) => shopService.getPublicProducts({
            page: pageParam,
            limit: 30, // Cargamos de 30 en 30
            search: searchText,
            categoryIds: selectedCategoryIds,
            attributeValueIds: attributeValueIds,
            isActive: true,
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // Si la última página no estaba vacía, podemos cargar la siguiente.
            return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
        },
    });

    const filteredProducts = useMemo(() => data?.pages.flatMap(page => page.data) ?? [], [data]);

    //  Nueva función "inteligente" que decide la acción a tomar.
    const handleAddOrSelect = async (product: Product) => {
        try {
            const fullProduct = await shopService.getPublicProductById(product.id);
            if (fullProduct.variants && fullProduct.variants.length === 1) {
                // Si solo hay una variante, la añadimos directamente.
                addItem(fullProduct, 1);
            } else {
                // Si hay múltiples variantes, abrimos el modal de detalles para que el usuario elija.
                setViewingProduct(fullProduct);
            }
        } catch (error) {
            console.error("Error al procesar el producto:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <StoreHeader/>
            <SEO
                title={`Tienda - ${searchText || 'Todos los Productos'}`}
                description="Explora nuestro catálogo completo de licencias y software original."
                canonicalUrl="/products"
            />
            <section className="py-8 pb-20">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Título de página */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">Todos los productos</h1>
                        <p className="text-slate-500 text-sm mt-1">Explora nuestro catálogo completo de software original</p>
                    </div>

                    {/* Botón de Filtros para Móvil */}
                    <div className="md:hidden mb-4">
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
                        >
                            <Filter className="h-5 w-5"/>
                            Filtros
                        </button>
                    </div>

                    {/* Off-canvas para Filtros en Móvil */}
                    <Transition.Root show={isMobileFilterOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-50 md:hidden" onClose={setIsMobileFilterOpen}>
                            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300"
                                              enterFrom="opacity-0" enterTo="opacity-100"
                                              leave="transition-opacity ease-linear duration-300"
                                              leaveFrom="opacity-100" leaveTo="opacity-0">
                                <div className="fixed inset-0 bg-black bg-opacity-25"/>
                            </Transition.Child>
                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform"
                                                  enterFrom="-translate-x-full" enterTo="translate-x-0"
                                                  leave="transition ease-in-out duration-300 transform"
                                                  leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                                    <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                        <div className="flex px-4 pt-5 pb-2 justify-end">
                                            <button type="button"
                                                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-400"
                                                    onClick={() => setIsMobileFilterOpen(false)}>
                                                <X className="h-6 w-6" aria-hidden="true"/>
                                            </button>
                                        </div>
                                        <FilterSidebar searchText={searchText} onSearch={setSearchText}
                                                       selectedCategoryIds={selectedCategoryIds}
                                                       toggleCategory={toggleCategory}
                                                       clearFilters={clearFilters}
                                                       hierarchicalCategories={hierarchicalCategories}
                                                       filterableAttributes={filterableAttributes}
                                                       selectedAttributes={selectedAttributes}
                                                       toggleAttribute={toggleAttribute}/>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar para Desktop */}
                        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 md:sticky top-24 self-start h-[calc(100vh-7rem)]">
                            <aside className="h-full">
                                <FilterSidebar
                                    searchText={searchText}
                                    onSearch={setSearchText}
                                    selectedCategoryIds={selectedCategoryIds}
                                    toggleCategory={toggleCategory}
                                    clearFilters={clearFilters}
                                    hierarchicalCategories={hierarchicalCategories}
                                    filterableAttributes={filterableAttributes}
                                    selectedAttributes={selectedAttributes}
                                    toggleAttribute={toggleAttribute}
                                />
                            </aside>
                        </div>

                        <main className="w-full md:w-3/4 lg:w-4/5">
                            {isLoading || isLoadingProducts ? (
                                <div className="flex justify-center items-center py-16">
                                    <Spinner/>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                    {filteredProducts.map((p) => (
                                        <ProductCard
                                            key={p.id}
                                            product={p}
                                            onAdd={() => handleAddOrSelect(p)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Botón de Cargar Más */}
                            <div className="col-span-full flex justify-center mt-8">
                                {hasNextPage && (
                                    <Button
                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                        variant="gradient"
                                    >
                                        {isFetchingNextPage ? 'Cargando...' : 'Cargar más productos'}
                                    </Button>
                                )}
                            </div>

                            {!(isLoading || isLoadingProducts) && filteredProducts.length === 0 && (
                                <div className="col-span-full text-center py-16">
                                    <p className="text-slate-500 text-xl mb-4">No se encontraron productos.</p>
                                    <button
                                        className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                                        onClick={clearFilters}
                                    >
                                        Ver todos los productos
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
                <ProductDetailModal
                    product={viewingProduct}
                    onClose={() => setViewingProduct(null)}
                />
            </section>
            <StoreFooter/>
        </div>
    );
}