import {useState, useMemo, useEffect, useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';
import type {Category, Attribute} from '../types';
import {shopService} from '../services/shopService';
import {useQuery} from "@tanstack/react-query";

export function useProductFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Estados de los filtros
    const [searchText, setSearchText] = useState<string>(searchParams.get('search') || '');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(() => {
        const cats = searchParams.get('categories');
        return cats ? cats.split(',').filter(Boolean) : [];
    });

    // Estado para los filtros de atributos (Record<string, string[]> — atributoId → [valueId, ...])
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>(() => {
        const attrs: Record<string, string[]> = {};
        for (const [key, value] of searchParams.entries()) {
            if (key.startsWith('attr_')) {
                const attrId = key.split('_')[1];
                if (attrId) {
                    attrs[attrId] = value.split(',').filter(Boolean);
                }
            }
        }
        return attrs;
    });

    // --- CARGA DE DATOS PARA CONSTRUIR LOS FILTROS (CATEGORÍAS Y ATRIBUTOS) ---
    const {data: allCategories = [], isLoading: isLoadingCategories} = useQuery<Category[], Error>({
        queryKey: ['allCategoriesForFilter'],
        queryFn: shopService.getPublicCategories,
        staleTime: Infinity,
    });

    const {data: filterableAttributes = [], isLoading: isLoadingAttributes} = useQuery<Attribute[], Error>({
        queryKey: ['allAttributesForFilter'],
        queryFn: shopService.getPublicAttributes,
        staleTime: Infinity,
    });

    // --- FUNCIONES PARA MANIPULAR LOS FILTROS ---
    const toggleCategory = useCallback((categoryId: string) => {
        setSelectedCategoryIds((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        );
    }, []);

    const clearFilters = useCallback(() => {
        setSearchText("");
        setSelectedCategoryIds([]);
        setSelectedAttributes({});
    }, []);

    const toggleAttribute = useCallback((attributeId: string, valueId: string) => {
        setSelectedAttributes(prev => {
            const currentValues = prev[attributeId] || [];
            const newValues = currentValues.includes(valueId)
                ? currentValues.filter((v) => v !== valueId)
                : [...currentValues, valueId];

            if (newValues.length === 0) {
                const {[attributeId]: _, ...rest} = prev;
                return rest;
            }
            return {...prev, [attributeId]: newValues};
        });
    }, []);

    // Si la URL cambia (ej. desde el SearchDropdown del Header), actualiza el estado interno del hook.
    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        if (urlSearch !== searchText) {
            setSearchText(urlSearch);
        }
    }, [searchParams]);

    // --- SINCRONIZACIÓN CON LA URL ---
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchText) params.set('search', searchText);
        if (selectedCategoryIds.length > 0) params.set('categories', selectedCategoryIds.join(','));
        Object.entries(selectedAttributes).forEach(([key, values]) => {
            if (values.length > 0) {
                params.set(`attr_${key}`, values.join(','));
            }
        });
        setSearchParams(params, {replace: true});
    }, [searchText, selectedCategoryIds, selectedAttributes, setSearchParams]);

    // Construimos una estructura jerárquica para las categorías para renderizar el filtro correctamente.
    const hierarchicalCategories = useMemo(() => {
        const categoryMap = new Map(allCategories.map(c => [c.id, {...c, children: [] as Category[]}]));
        const tree: (Category & { children: Category[] })[] = [];
        allCategories.forEach(c => {
            if (c.parentId && categoryMap.has(c.parentId)) {
                categoryMap.get(c.parentId)?.children.push(c as Category & { children: Category[] });
            } else {
                tree.push(c as Category & { children: Category[] });
            }
        });
        return tree;
    }, [allCategories]);

    return {
        searchText,
        setSearchText,
        selectedCategoryIds,
        toggleCategory,
        clearFilters,
        isLoading: isLoadingCategories || isLoadingAttributes,
        toggleAttribute,
        filterableAttributes,
        hierarchicalCategories,
        selectedAttributes
    };
}
