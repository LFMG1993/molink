import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { productService } from '../../services/admin/productService.ts';
import type { Product, ProductCreationData, PaginatedResponse } from '../../types';
import { Button } from '../../components/shared/Button.tsx';
import { ConfirmationModal } from '../../components/shared/ConfirmationModal.tsx';
import { ProductTable } from '../../components/admin/products/ProductTable.tsx';
import { useNotification } from '../../context/shared/NotificationContext.tsx';
import { ProductForm, type ProductFormData, createInitialProductState } from '../../components/admin/products/ProductForm.tsx';
import { attributeService } from "../../services/admin/attributeService.ts";
import { categoryService } from "../../services/admin/categoryService.ts";
import type { Attribute, Category } from "../../types";
import { uploadImage } from "../../services/admin/imageService.ts";
import { slugify } from "../../utils/slugify.ts";
import { Spinner } from "../../components/shared/Spinner.tsx";
import { DraggableWindow } from "../../components/admin/DraggableWindow.tsx";
import { useWindows98 } from "../../context/admin/Windows98Context.tsx";

const ProductsPage = () => {
    const queryClient = useQueryClient();
    const { closeApp } = useWindows98();
    const { addNotification } = useNotification();
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<ProductFormData>(createInitialProductState);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    // Estados para las tablas
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [debouncedFilter, setDebouncedFilter] = useState('');

    // Debounce para el filtro de búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilter(globalFilter);
        }, 500); // Espera 500ms después de que el usuario deja de escribir
        return () => clearTimeout(timer);
    }, [globalFilter]);

    // Query para productos paginados
    const {
        data: productsData,
        isLoading: isLoadingProducts,
        isError,
        error
    } = useQuery<PaginatedResponse<Product>, Error>({
        queryKey: ['products', pageIndex, pageSize, debouncedFilter, sorting],
        queryFn: () => productService.getProducts({
            page: pageIndex + 1,
            limit: pageSize,
            search: debouncedFilter,
            sortBy: sorting[0]?.id,
            sortOrder: sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
        }),
        placeholderData: keepPreviousData,
    });

    // Queries para datos de soporte (atributos y categorías)
    const { data: attributes = [] } = useQuery<Attribute[], Error>({
        queryKey: ['attributes'],
        queryFn: attributeService.getAttributesWithValues,
    });
    const { data: categories = [] } = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: categoryService.getCategories,
    });

    const products = useMemo(() => productsData?.data ?? [], [productsData]);
    const pageCount = useMemo(() => productsData?.pageCount ?? -1, [productsData]);

    const handleEdit = async (id: string) => {
        try {
            const productDetails = await productService.getProductById(id);
            // Pre-populamos el estado del formulario para edición.
            setFormData({
                name: productDetails.name,
                description: productDetails.description || '',
                categoryId: productDetails.category?.id || '',
                isFeatured: productDetails.isFeatured,
                isActive: productDetails.isActive,
                image_url: productDetails.imageUrl || null,
                imageFile: null,
                variants: productDetails.variants.map(v => ({
                    ...v,
                    sku: v.sku || '',
                    stock: v.stock ?? '',
                    isActive: v.isActive ?? true,
                    imageUrl: v.imageUrl || null,
                    unitOfMeasure: v.unitOfMeasure || null,
                    unitsPerItem: v.unitsPerItem || null,
                    imageFile: null,
                    selectedAttributes: (v.variantValues ?? []).reduce((acc: Record<string, string>, vv) => {
                        if (vv.attributeValue && vv.attributeValue.attributeId) {
                            acc[vv.attributeValue.attributeId] = vv.attributeValue.id;
                        }
                        return acc;
                    }, {}),
                })),
            });
            setEditingProduct(productDetails);
            setIsFormModalOpen(true);
        } catch (err: any) {
            addNotification(`Error al cargar los detalles del producto: ${err.message}`, 'error');
        }
    };

    const handleDelete = (product: Product) => {
        setProductToDelete(product);
    };

    const saveProductMutation = useMutation({
        mutationFn: async (formData: ProductFormData) => {
            const slug = slugify(formData.name);
            const uploadPromises: Promise<string | null>[] = [];

            if (formData.imageFile) {
                const entityName = `product/${slug}-${editingProduct?.id || 'new'}`;
                uploadPromises.push(uploadImage(formData.imageFile, entityName));
            } else {
                uploadPromises.push(Promise.resolve(formData.image_url));
            }

            formData.variants.forEach((variant, index) => {
                if (variant.imageFile) {
                    const entityName = `product/${slug}/${variant.sku || `variant-${index}`}`;
                    uploadPromises.push(uploadImage(variant.imageFile, entityName));
                } else {
                    uploadPromises.push(Promise.resolve(variant.imageUrl || null));
                }
            });

            const [mainImageUrl, ...variantImageUrls] = await Promise.all(uploadPromises);

            const finalPayload: ProductCreationData = {
                name: formData.name,
                description: formData.description,
                categoryId: formData.categoryId,
                isFeatured: formData.isFeatured,
                isActive: formData.isActive,
                imageUrl: mainImageUrl,
                variants: formData.variants.map((v, index) => {
                    const attributeValueIds = Object.values(v.selectedAttributes).filter(id => id);
                    return {
                        id: v.id,
                        sku: v.sku,
                        price: Number(v.price),
                        stock: Number(v.stock),
                        salePrice: v.salePrice === null ? undefined : v.salePrice,
                        imageUrl: variantImageUrls[index],
                        isActive: v.isActive,
                        unitOfMeasure: v.unitOfMeasure,
                        unitsPerItem: v.unitsPerItem,
                        volumeDiscounts: v.volumeDiscounts,
                        attributeValueIds: attributeValueIds,
                    };
                }),
            };

            if (editingProduct) {
                return productService.updateProduct(editingProduct.id, finalPayload);
            } else {
                return productService.createProduct(finalPayload);
            }
        },

        onSuccess: () => {
            const successMessage = editingProduct ? 'Producto actualizado.' : 'Producto creado.';
            addNotification(successMessage, 'success');
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setIsFormModalOpen(false);
            setEditingProduct(null);
        },
        onError: (err: any) => {
            const errorInfo = err.info?.errors ? Object.values(err.info.errors).flat().join(', ') : err.message;
            const finalMessage = `Error al guardar: ${errorInfo || 'Error desconocido.'}`;
            addNotification(finalMessage, 'error');
        }
    });

    const deleteProductMutation = useMutation({
        mutationFn: (id: string) => productService.deleteProduct(id),
        onSuccess: () => {
            addNotification('Producto eliminado con éxito.', 'success');
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setProductToDelete(null);
        },
        onError: (err: Error) => {
            addNotification(`Error al eliminar: ${err.message}`, 'error');
        }
    });

    const handleConfirmDelete = () => {
        if (productToDelete) {
            deleteProductMutation.mutate(productToDelete.id);
        }
    };

    const handleFormClose = () => {
        setIsFormModalOpen(false);
        setEditingProduct(null);
    };

    const isLoading = isLoadingProducts && productsData === undefined;

    return (
        <DraggableWindow
            id="products"
            title="Productos"
            icon="https://win98icons.alexmeub.com/icons/png/package-0.png"
            defaultMaximized={true}
            defaultSize={{ width: 900, height: 600 }}
            onClose={() => closeApp('products')}
        >
            <div className="p-4 sm:p-6 lg:p-8 bg-transparent text-[var(--os-text)] min-h-full">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-bold tracking-widest uppercase">Productos</h1>
                        <p className="mt-2 text-sm opacity-80 font-mono">
                            Lista de todos los productos.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Button onClick={() => {
                            setFormData(createInitialProductState);
                            setEditingProduct(null);
                            setIsFormModalOpen(true);
                        }}>Crear Producto</Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-16">
                        <Spinner />
                    </div>
                ) : isError ? (
                    <p className="text-red-500 text-center">Error: {error.message}</p>
                ) : (
                    <ProductTable
                        products={products}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        pagination={{ pageIndex, pageSize }}
                        setPagination={setPagination}
                        sorting={sorting}
                        setSorting={setSorting}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        pageCount={pageCount}
                    />
                )}

                <ProductForm
                    isOpen={isFormModalOpen}
                    onClose={handleFormClose}
                    onSave={(formData) => saveProductMutation.mutate(formData)}
                    productToEdit={editingProduct}
                    attributes={attributes}
                    categories={categories}
                    isSubmitting={saveProductMutation.isPending}
                    formData={formData}
                    setFormData={setFormData}
                />

                <ConfirmationModal
                    isOpen={!!productToDelete}
                    onClose={() => setProductToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    isConfirming={deleteProductMutation.isPending}
                    title="Confirmar Eliminación"
                    message={`¿Estás seguro de que deseas eliminar el producto "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
                />
            </div>
        </DraggableWindow>
    );
};

export default ProductsPage;