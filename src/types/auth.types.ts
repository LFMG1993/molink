/**
 * Payload decodificado del JWT del cliente.
 */
export interface Customer {
    userId: number;
    email: string;
    name: string;
    rol: 'customer';
}

/**
 * Datos del usuario cliente tal como los devuelve el backend en sus respuestas.
 */
export interface CustomerApiUser {
    id: string;
    nombre: string;
    email: string;
    rol: 'customer';
}

/**
 * Respuesta de POST /api/auth/verify-code
 */
export interface CustomerVerifyCodeResponse {
    token?: string;
    user: CustomerApiUser;
}
