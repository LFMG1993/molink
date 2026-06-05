import {useEffect, useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {addressService} from '../../../services/store/addressService.ts';
import type {Address, AddressCreationData} from '../../../types';
import {useNotification} from "../../../context/shared/NotificationContext.tsx";
import {Spinner} from '../../shared/Spinner.tsx';
import {Button} from '../../shared/Button.tsx';
import {PlusCircle} from 'lucide-react';
import {AddressFormModal} from "./AddressFormModal.tsx";
import {Modal} from "../../shared/Modal.tsx";

interface AddressSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddressSelected: (addressId: string) => void;
}

export const AddressSelectionModal = ({isOpen, onClose, onAddressSelected}: AddressSelectionModalProps) => {
    const queryClient = useQueryClient();
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const {addNotification} = useNotification();

    // Estado para el modal de creación/edición
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const {data: addresses = [], isLoading} = useQuery<Address[], any>({
        queryKey: ['customerAddresses'],
        queryFn: addressService.listAddresses,
        enabled: isOpen, // Solo ejecuta la query cuando el modal está abierto
    });

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            if (!selectedAddressId) {
                const defaultAddress = addresses.find(a => a.isDefault);
                if (defaultAddress) {
                    setSelectedAddressId(defaultAddress.id);
                }
            }
        }
    }, [addresses, selectedAddressId]);

    useEffect(() => {
        if (isLoading) return; // Evitar notificaciones en la carga inicial
        const queryState = queryClient.getQueryState(['customerAddresses']);
        if (queryState?.error) {
            const error = queryState.error as any;
            if (error.response?.status === 404) {
            } else {
                addNotification(`Error al cargar direcciones: ${error.message}`, 'error');
            }
        }
    }, [isLoading, queryClient, addNotification]);

    const createAddressMutation = useMutation({
        mutationFn: (data: AddressCreationData) => addressService.createAddress(data),
        onSuccess: () => {
            addNotification('Dirección creada con éxito.', 'success');
            queryClient.invalidateQueries({queryKey: ['customerAddresses']});
            setIsFormModalOpen(false);
        },
        onError: (error: any) => {
            addNotification(`Error al guardar la dirección: ${error.message}`, 'error');
        }
    });

    const handleSaveNewAddress = (data: AddressCreationData) => {
        createAddressMutation.mutate(data);
    };

    const handleConfirmSelection = () => {
        if (selectedAddressId) {
            onAddressSelected(selectedAddressId);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title="Selecciona una Dirección de Envío" size="lg" className="bg-[#0a0a0a] text-white">
                {isLoading ? (
                    <div className="flex justify-center p-8"><Spinner/></div>
                ) : (
                    <div className="space-y-4">
                        {addresses.length > 0 ? (
                            addresses.map(addr => (
                                <div key={addr.id}
                                     className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-red-600 bg-red-600/10 ring-1 ring-red-600 shadow-sm shadow-red-600/20' : 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10'}`}
                                     onClick={() => setSelectedAddressId(addr.id)}
                                >
                                    <div className="flex items-start">
                                        <input type="radio" name="address" checked={selectedAddressId === addr.id}
                                               readOnly
                                               className="mt-1 h-4 w-4 text-red-600 focus:ring-red-600 bg-black/50 border-white/20"/>
                                        <div className="ml-3 text-sm text-white/80">
                                            <p className="font-bold text-white">{addr.recipientName}</p>
                                            <p className="text-white/60">{addr.street}, {addr.details}</p>
                                            <p className="text-white/60">{addr.city}, {addr.state}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white/40 py-6">No tienes direcciones
                                guardadas. ¡Añade una para continuar!</p>
                        )}

                        <Button variant="outline" size="md" className="w-full border-white/10 text-white hover:bg-white/5"
                                onClick={() => setIsFormModalOpen(true)}>
                            <PlusCircle className="h-5 w-5 mr-2"/>
                            Añadir Nueva Dirección
                        </Button>

                        <div className="pt-6 flex justify-end gap-3 mt-4 border-t border-white/10">
                            <Button type="button" variant="outline" className="text-white/60 border-white/10 hover:bg-white/5" onClick={onClose}>Cancelar</Button>
                            <Button type="button" onClick={handleConfirmSelection}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 shadow-md shadow-red-600/20"
                                    disabled={!selectedAddressId || isLoading}>
                                Continuar con esta Dirección
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Modal para crear una nueva dirección */}
            <AddressFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveNewAddress}
                isSaving={createAddressMutation.isPending}
            />
        </>
    );
};