import { useState, useMemo } from 'react';
import { userService } from '../../services/admin/userService.ts';
import type { User, UserCreationData, PaginatedResponse } from '../../types'
import { UserTable } from '../../components/admin/users/UserTable.tsx';
import { UserForm } from '../../components/admin/users/UserForm.tsx';
import { ConfirmationModal } from '../../components/shared/ConfirmationModal.tsx';
import { Button } from '../../components/shared/Button.tsx';
import { PlusCircle } from 'lucide-react';
import { useNotification } from "../../context/shared/NotificationContext.tsx";
import { Spinner } from "../../components/shared/Spinner.tsx";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import type { PaginationState } from "@tanstack/react-table";
import { DraggableWindow } from "../../components/admin/DraggableWindow.tsx";
import { useWindows98 } from "../../context/admin/Windows98Context.tsx";

export default function UsersPage() {
    const { addNotification } = useNotification();
    const { closeApp } = useWindows98();
    const queryClient = useQueryClient();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    // Hook useQuery para obtener los datos
    const { data, isLoading, isError, error } = useQuery<PaginatedResponse<User>, Error>({
        queryKey: ['users', pageIndex, pageSize],
        queryFn: () => userService.getUsers({ page: pageIndex + 1, limit: pageSize }),
        placeholderData: keepPreviousData,
    });

    // Usamos useMemo para evitar recalcular en cada render.
    const users = useMemo(() => data?.data ?? [], [data]);
    const pageCount = useMemo(() => data?.pageCount ?? -1, [data]);

    // Hook useMutation para crear/actualizar usuarios
    const userMutation = useMutation({
        mutationFn: async (data: { userData: UserCreationData; id?: string }) => {
            if (data.id) {
                return userService.updateUser(data.id, data.userData);
            }
            return userService.createUser(data.userData);
        },
        onSuccess: (_, variables) => {
            addNotification(`Usuario ${variables.id ? 'actualizado' : 'creado'} con éxito`, 'success');
            queryClient.invalidateQueries({ queryKey: ['users'] }); // Invalida y refetchea la query de usuarios
            handleCloseModal();
        },
        onError: (err: Error) => {
            addNotification(err.message || 'Error al guardar el usuario.', 'error');
        },
    });

    // 3. Hook useMutation para eliminar usuarios
    const deleteMutation = useMutation({
        mutationFn: (userId: string) => userService.deleteUser(userId),
        onSuccess: () => {
            addNotification('Usuario eliminado con éxito', 'success');
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setUserToDelete(null);
        },
        onError: (err: Error) => {
            addNotification(err.message || 'Error al eliminar el usuario.', 'error');
        },
    });

    const handleOpenCreateModal = () => {
        setUserToEdit(null);
        setIsFormOpen(true);
    };

    const handleOpenEditModal = (user: User) => {
        setUserToEdit(user);
        setIsFormOpen(true);
    };

    const handleCloseModal = () => {
        setIsFormOpen(false);
        setUserToEdit(null);
    };

    const handleDelete = (user: User) => {
        setUserToDelete(user);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            deleteMutation.mutate(userToDelete.id);
        }
    };

    const handleFormSubmit = async (data: UserCreationData) => {
        userMutation.mutate({
            userData: data,
            id: userToEdit?.id,
        });
    };

    return (
        <DraggableWindow
            id="users"
            title="Usuarios"
            icon="https://win98icons.alexmeub.com/icons/png/users-1.png"
            defaultMaximized={true}
            defaultSize={{ width: 800, height: 600 }}
            onClose={() => closeApp('users')}
        >
            <div className="p-4 sm:p-6 lg:p-8 bg-transparent text-[var(--os-text)] min-h-full">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-bold tracking-widest uppercase">Users</h1>
                        <p className="mt-2 text-sm opacity-80 font-mono">
                            Lista de usuarios activos en el sistema.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Button onClick={handleOpenCreateModal}><PlusCircle className="mr-2 h-5 w-5" />Crear Usuario</Button>
                    </div>
                </div>
                <div className="mt-8">
                    {isLoading && <div className="flex justify-center items-center py-16">
                        <Spinner />
                    </div>}
                    {isError &&
                        <p className="text-red-500 text-center">{error.message || 'Error al cargar los usuarios.'}</p>}
                    {!isLoading && !isError &&
                        <UserTable
                            users={users}
                            onEdit={handleOpenEditModal}
                            onDelete={handleDelete}
                            pagination={{ pageIndex, pageSize }}
                            setPagination={setPagination}
                            pageCount={pageCount} />}
                </div>
                <UserForm
                    isOpen={isFormOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleFormSubmit}
                    userToEdit={userToEdit}
                    isSubmitting={userMutation.isPending}
                />
                <ConfirmationModal
                    isOpen={!!userToDelete}
                    onClose={() => setUserToDelete(null)}
                    onConfirm={confirmDelete}
                    title="Confirmar Eliminación"
                    isConfirming={deleteMutation.isPending}
                    message={`¿Estás seguro de que deseas eliminar al usuario "${userToDelete?.name}"? Esta acción no se puede deshacer.`}
                />
            </div>
        </DraggableWindow>
    );
}