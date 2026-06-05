import { apiPublic } from './apiPublic';
import type { ContactFormData } from '../../types';

export const contactService = {
    submit: async (data: ContactFormData): Promise<{ success: boolean }> => {
        const response = await apiPublic.post('/api/contact', data);
        return response.data;
    },
};
