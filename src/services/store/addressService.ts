import {apiClient} from './apiClient.ts';
import type {Address, AddressCreationData, AddressUpdateData} from "../../types";

export const addressService = {
    /**
     * Obtiene todas las direcciones del cliente autenticado.
     */
    async listAddresses(): Promise<Address[]> {
        const response = await apiClient.get<{ addresses: Address[] }>('/api/addresses');
        return response.data.addresses;
    },

    async createAddress(addressData: AddressCreationData): Promise<Address> {
        const response = await apiClient.post<{ address: Address }>('/api/addresses', addressData);
        return response.data.address;
    },

    async updateAddress(id: string, addressData: AddressUpdateData): Promise<Address> {
        const response = await apiClient.put<{ address: Address }>(`/api/addresses/${id}`, addressData);
        return response.data.address;
    },

    async deleteAddress(id: string): Promise<{ success: boolean }> {
        const response = await apiClient.delete(`/api/addresses/${id}`);
        return response.data;
    },

    async setDefaultAddress(id: string): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.post(`/api/addresses/${id}/default`);
        return response.data;
    },
};