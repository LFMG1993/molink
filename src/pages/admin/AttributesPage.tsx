import { useWindows98 } from "../../context/admin/Windows98Context.tsx";
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { attributeService } from '../../services/admin/attributeService.ts';
import type { Attribute, AttributeValue } from "../../types";
import { useNotification } from '../../context/shared/NotificationContext.tsx';
import { Button } from '../../components/shared/Button.tsx';
import { ConfirmationModal } from '../../components/shared/ConfirmationModal.tsx';
import { Plus } from 'lucide-react';
import { AttributeCard } from '../../components/admin/attributes/AttributeCard.tsx';
import { AttributeForm } from "../../components/admin/attributes/AttributeForm.tsx";
import { Spinner } from "../../components/shared/Spinner.tsx";
import { DraggableWindow } from "../../components/admin/DraggableWindow.tsx";

const AttributesPage = () => {
    const queryClient = useQueryClient();
    const { closeApp } = useWindows98();
    const { addNotification } = useNotification();

    // Estados para los modales
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const [isValueModalOpen, setIsValueModalOpen] = useState(false);
    const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);
    const [deletingAttribute, setDeletingAttribute] = useState<Attribute | null>(null);
    const [deletingValue, setDeletingValue] = useState<{ attribute: Attribute, value: AttributeValue } | null>(null);
    const [addingValueTo, setAddingValueTo] = useState<Attribute | null>(null);
    const [formValue, setFormValue] = useState('');

    const { data: attributes = [], isLoading, isError, error } = useQuery<Attribute[], Error>({
        queryKey: ['attributes'],
        queryFn: attributeService.getAttributesWithValues,
    });

    const saveAttributeMutation = useMutation({
        mutationFn: (data: { name: string, id?: string }) =>
            data.id
                ? attributeService.updateAttribute(data.id, { name: data.name })
                : attributeService.createAttribute({ name: data.name }),
        onSuccess: (_, variables) => {
            addNotification(`Atributo ${variables.id ? 'actualizado' : 'creado'} con éxito.`, 'success');
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
            closeAttributeModal();
        },
        onError: (err: Error) => addNotification(`Error: ${err.message}`, 'error'),
    });

    const saveValueMutation = useMutation({
        mutationFn: (data: { attributeId: string, value: string }) =>
            attributeService.createAttributeValue(data),
        onSuccess: () => {
            addNotification('Valor añadido con éxito.', 'success');
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
            closeValueModal();
        },
        onError: (err: Error) => addNotification(`Error: ${err.message}`, 'error'),
    });

    const deleteAttributeMutation = useMutation({
        mutationFn: (id: string) => attributeService.deleteAttribute(id),
        onSuccess: () => {
            addNotification('Atributo eliminado con éxito.', 'success');
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
            setDeletingAttribute(null);
        },
        onError: (err: Error) => addNotification(`Error: ${err.message}`, 'error'),
    });

    const deleteValueMutation = useMutation({
        mutationFn: (data: { attributeId: string, valueId: string }) =>
            attributeService.deleteAttributeValue(data.attributeId, data.valueId),
        onSuccess: () => {
            addNotification('Valor eliminado con éxito.', 'success');
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
            setDeletingValue(null);
        },
        onError: (err: Error) => addNotification(`Error: ${err.message}`, 'error'),
    });

    const handleSaveAttribute = (e: React.FormEvent) => {
        e.preventDefault();
        saveAttributeMutation.mutate({ name: formValue, id: editingAttribute?.id });
    };

    const handleSaveValue = (e: React.FormEvent) => {
        e.preventDefault();
        if (!addingValueTo) return;
        saveValueMutation.mutate({ attributeId: addingValueTo.id, value: formValue });
    };

    const handleConfirmDeleteAttribute = () => {
        if (deletingAttribute) {
            deleteAttributeMutation.mutate(deletingAttribute.id);
        }
    };

    const handleConfirmDeleteValue = () => {
        if (deletingValue) {
            deleteValueMutation.mutate({
                attributeId: deletingValue.attribute.id,
                valueId: deletingValue.value.id
            });
        }
    };

    // Funciones para controlar los modales
    const closeAttributeModal = () => {
        setIsAttributeModalOpen(false);
        setEditingAttribute(null);
        setFormValue('');
    };

    const closeValueModal = () => {
        setIsValueModalOpen(false);
        setAddingValueTo(null);
        setFormValue('');
    };

    const openNewAttributeModal = () => {
        setEditingAttribute(null);
        setFormValue('');
        setIsAttributeModalOpen(true);
    };

    const openEditAttributeModal = (attr: Attribute) => {
        setEditingAttribute(attr);
        setFormValue(attr.name);
        setIsAttributeModalOpen(true);
    };

    const openValueModal = (attr: Attribute) => {
        setAddingValueTo(attr);
        setFormValue('');
        setIsValueModalOpen(true);
    };

    return (
        <DraggableWindow
            id="attributes"
            title="Atributos"
            icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
            defaultMaximized={true}
            defaultSize={{ width: 800, height: 600 }}
            onClose={() => closeApp('attributes')}
        >
            <div className="p-8 bg-transparent text-[var(--os-text)] min-h-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Gestión de Atributos</h1>
                    <Button onClick={openNewAttributeModal}><Plus className="h-4 w-4 mr-2" />Crear Atributo</Button>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center py-16">
                        <Spinner />
                    </div>
                )}
                {isError && <p className="text-red-500 text-center">Error al cargar atributos: {error.message}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!isLoading && attributes.map(attr => (
                        <AttributeCard
                            key={attr.id}
                            attribute={attr}
                            onEdit={openEditAttributeModal}
                            onDelete={setDeletingAttribute}
                            onAddValue={openValueModal}
                            onDeleteValue={(value) => setDeletingValue({ attribute: attr, value })}
                        />
                    ))}
                </div>

                {/* Modal para Atributos */}
                <AttributeForm title={editingAttribute ? 'Editar Atributo' : 'Crear Atributo'}
                    isOpen={isAttributeModalOpen} onClose={closeAttributeModal}
                    onSubmit={handleSaveAttribute} isSubmitting={saveAttributeMutation.isPending}>
                    <label htmlFor="attributeName" className="block text-sm font-medium text-[var(--color-foreground)]/80">Nombre
                        del
                        Atributo</label>
                    <input type="text" id="attributeName" value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        className="mt-1 block w-full rounded-md border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-foreground)] shadow-sm focus:border-liderplast-primary focus:ring-liderplast-primary p-2.5"
                        required />
                </AttributeForm>

                {/* Modal para Valores de Atributos */}
                <AttributeForm title={`Añadir valor a "${addingValueTo?.name}"`} isOpen={isValueModalOpen}
                    onClose={closeValueModal} onSubmit={handleSaveValue}
                    isSubmitting={saveValueMutation.isPending}>
                    <label htmlFor="valueName" className="block text-sm font-medium text-[var(--color-foreground)]/80">Nuevo
                        Valor</label>
                    <input type="text" id="valueName" value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        className="mt-1 block w-full rounded-md border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-foreground)] shadow-sm focus:border-liderplast-primary focus:ring-liderplast-primary p-2.5"
                        required />
                </AttributeForm>

                {/* Modal de Confirmación para eliminar Atributo */}
                <ConfirmationModal
                    isOpen={!!deletingAttribute}
                    onClose={() => setDeletingAttribute(null)}
                    onConfirm={handleConfirmDeleteAttribute}
                    isConfirming={deleteAttributeMutation.isPending}
                    title="Confirmar Eliminación"
                    message={`¿Estás seguro de que deseas eliminar el atributo "${deletingAttribute?.name}"? Esta acción también eliminará todos sus valores asociados y no se puede deshacer.`}
                />

                {/* Modal de Confirmación para eliminar Valor */}
                <ConfirmationModal
                    isOpen={!!deletingValue}
                    onClose={() => setDeletingValue(null)}
                    onConfirm={handleConfirmDeleteValue}
                    isConfirming={deleteValueMutation.isPending}
                    title="Confirmar Eliminación de Valor"
                    message={`¿Estás seguro de que deseas eliminar el valor "${deletingValue?.value.value}" del atributo "${deletingValue?.attribute.name}"?`}
                />
            </div>
        </DraggableWindow>
    );
};

export default AttributesPage;