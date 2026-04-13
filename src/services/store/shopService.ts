import {apiPublic} from '../shared/apiPublic.ts';
import type {Product, Category, Attribute, PaginatedResponse} from '../../types';

interface ApiPublicProductsResponse {
    products: Product[];
    pagination: {
        totalPages: number;
    };
}

/**
 * Parámetros para la obtención de productos públicos, incluyendo paginación y filtros.
 */
interface GetPublicProductsParams {
    page: number;
    limit: number;
    search?: string;
    featured?: boolean;
    categoryIds?: string[];
    attributeValueIds?: string[];
    isActive?: boolean;
}

/**
 * Servicio para las llamadas a la API que son públicas (no requieren autenticación).
 */
export const shopService = {
    getPublicProducts: async ({ limit, isActive, categoryIds, attributeValueIds, featured, ...restParams }: GetPublicProductsParams): Promise<PaginatedResponse<Product>> => {
        const apiParams: Record<string, unknown> = {
            ...restParams,
            pageSize: limit,
        };
        if (featured !== undefined) apiParams.featured = featured ? 'true' : undefined;
        if (categoryIds && categoryIds.length > 0) apiParams.categoryIds = categoryIds.join(',');
        if (attributeValueIds && attributeValueIds.length > 0) apiParams.attributeValueIds = attributeValueIds.join(',');
        // El filtro isActive no es soportado por la API pública (solo devuelve activos)
        const response = await apiPublic.get<ApiPublicProductsResponse>('/api/products', {params: apiParams});
        return {
            data: response.data.products,
            pageCount: response.data.pagination.totalPages,
        };
    },

    // Obtiene los detalles completos de un solo producto.
    getPublicProductById: async (id: string): Promise<Product> => {
        const response = await apiPublic.get<{ product: Product }>(`/api/products/${id}`);
        return response.data.product;
    },

    getPublicCategories: async (): Promise<Category[]> => {
        const response = await apiPublic.get<{ categories: Category[] }>('/api/categories');
        const all = response.data.categories;
        // Excluimos las categorías que son "padre" de otras — son organizadoras de proveedor
        // (ej. "KeyXpress") y no deben aparecer en la tienda pública.
        const parentIds = new Set(all.filter(c => c.parentId).map(c => c.parentId!));
        return all.filter(c => !parentIds.has(c.id));
    },

    getPublicAttributes: async (): Promise<Attribute[]> => {
        const response = await apiPublic.get<{ attributes: Attribute[] }>('/api/attributes');
        return response.data.attributes;
    },
};