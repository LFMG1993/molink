import { useWindows98 } from "../../context/admin/Windows98Context.tsx";
import {useEffect, useState, useMemo} from 'react';
import type {InventoryItem, InventoryUpdateData, PaginatedResponse} from '../../types';
import {inventoryService} from '../../services/admin/inventoryService.ts';
import {useNotification} from '../../context/shared/NotificationContext.tsx';
import {Spinner} from '../../components/shared/Spinner.tsx';
import {InventoryTable} from '../../components/admin/inventory/InventoryTable.tsx';
import {ConfirmationModal} from "../../components/shared/ConfirmationModal.tsx";
import {useQuery, useMutation, useQueryClient, keepPreviousData} from '@tanstack/react-query';
import type {PaginationState, SortingState} from "@tanstack/react-table";
import {DraggableWindow} from "../../components/admin/DraggableWindow.tsx";

const InventoryPage = () => {
    const queryClient = useQueryClient();
    const { closeApp } = useWindows98();
    const {addNotification} = useNotification();

    const [updateToConfirm, setUpdateToConfirm] = useState<{
        variantId: number;
        data: InventoryUpdateData
    } | null>(null);

    // --- Estados para TanStack Table ---
    const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [debouncedFilter, setDebouncedFilter] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilter(globalFilter);
        }, 500);
        return () => clearTimeout(timer);
    }, [globalFilter]);

    // Query para el inventario paginado
    const {
        data: inventoryData,
        isLoading: isLoadingInventory,
        isError,
        error
    } = useQuery<PaginatedResponse<InventoryItem>, Error>({
        queryKey: ['inventory', pageIndex, pageSize, debouncedFilter, sorting],
        queryFn: () => inventoryService.getInventory({
            page: pageIndex + 1,
            pageSize: pageSize,
            search: debouncedFilter,
            sortBy: sorting[0]?.id,
            sortOrder: sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
        }),
        placeholderData: keepPreviousData,
    });

    const inventoryItems = useMemo(() => inventoryData?.data ?? [], [inventoryData]);
    const pageCount = useMemo(() => inventoryData?.pageCount ?? -1, [inventoryData]);

    const requestUpdateInventory = (variantId: number, data: InventoryUpdateData) => {
        setUpdateToConfirm({variantId, data});
    };

    const updateMutation = useMutation({
        mutationFn: ({variantId, data}: { variantId: number, data: InventoryUpdateData }) =>
            inventoryService.updateVariantInventory(variantId, data),
        onSuccess: (updatedVariant) => {
            addNotification('Inventario actualizado con éxito.', 'success');
            // Actualización optimista de la caché para una respuesta instantánea en la UI
            queryClient.setQueryData<PaginatedResponse<InventoryItem>>(
                ['inventory', pageIndex, pageSize, debouncedFilter, sorting],
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.map(item =>
                            item.id === updatedVariant.id ? {...item, ...updatedVariant} : item
                        ),
                    };
                }
            );
            setUpdateToConfirm(null);
        },
        onError: (err: Error) => {
            addNotification(`Error al actualizar: ${err.message}`, 'error');
            setUpdateToConfirm(null);
        },
    });

    const executeConfirmedUpdate = () => {
        if (!updateToConfirm) return;
        updateMutation.mutate(updateToConfirm);
    };

    const isLoading = isLoadingInventory && inventoryData === undefined;

    return (
        <DraggableWindow
            id="inventory"
            title="Inventario"
            icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
            defaultMaximized={true}
            defaultSize={{ width: 800, height: 600 }}
            onClose={() => closeApp('inventory')}
        >
            <div className="p-8 bg-transparent text-[var(--os-text)] min-h-full">
                <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Gestión de Inventario</h1>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-16">
                    <Spinner/>
                </div>
            ) : isError ? (
                <p className="text-red-500 text-center">Error: {error.message}</p>
            ) : (
                <InventoryTable
                    items={inventoryItems}
                    onUpdate={requestUpdateInventory}
                    pagination={{pageIndex, pageSize}}
                    setPagination={setPagination}
                    sorting={sorting}
                    setSorting={setSorting}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    pageCount={pageCount}
                />
            )}

            <ConfirmationModal
                isOpen={!!updateToConfirm}
                onClose={() => setUpdateToConfirm(null)}
                onConfirm={executeConfirmedUpdate}
                isConfirming={updateMutation.isPending}
                title="Confirmar Actualización"
                message="¿Estás seguro de que deseas guardar este cambio en el inventario?"
            />
            </div>
        </DraggableWindow>
    );
};

export default InventoryPage;
