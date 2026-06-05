/**
 * Convierte errores de la API de checkout (Axios-style) en mensajes
 * legibles para el usuario.
 *
 * @param err      El error capturado en catch.
 * @param context  Prefijo para el log de consola (ej. '[checkout]').
 */
export function parseCheckoutError(err: unknown, context = '[checkout]'): string {
    if (err && typeof err === 'object' && 'response' in err) {
        const e = err as {
            response?: {
                status?: number;
                data?: {
                    error?: string;
                    message?: string;
                    errors?: Record<string, string[]>;
                    details?: Record<string, string[]> & { api?: string[] };
                };
            };
        };
        const status = e.response?.status;
        const data = e.response?.data;
        console.error(`${context} API error →`, status, JSON.stringify(data));

        const fieldLabel: Record<string, string> = {
            card_holder: 'Titular',
            card_number: 'Número de tarjeta',
            cvc: 'CVV',
            exp_month: 'Mes',
            exp_year: 'Año',
            plan_id: 'Plan',
            billing_cycle: 'Ciclo de facturación',
            package_id: 'Paquete',
            email: 'Email',
            name: 'Nombre',
        };

        // Errores campo a campo
        const fieldErrors = data?.errors ?? (
            data?.details && !('api' in data.details) ? data.details : undefined
        );
        if (fieldErrors) {
            return Object.entries(fieldErrors)
                .map(([field, msgs]) => `${fieldLabel[field] ?? field}: ${(msgs as string[]).join(', ')}`)
                .join(' · ');
        }

        // Credenciales del servidor inválidas con Wompi
        if (data?.details?.['api']?.includes('Unauthorized')) {
            return 'No pudimos procesar tu pago en este momento. Por favor contáctanos por WhatsApp para completar tu compra.';
        }

        if (data?.details) {
            const all = Object.values(data.details).flat();
            if (all.length) return `${data.error ?? 'Error'}: ${all.join(' · ')}`;
        }

        if (data?.error) return `${data.error}${status ? ` (${status})` : ''}`;
        if (data?.message) return `${data.message}${status ? ` (${status})` : ''}`;

        if (status === 401) return 'Tu sesión expiró. Vuelve a verificar tu email para continuar.';
        if (status === 402) return 'Pago rechazado. Verifica los datos de tu tarjeta.';
        if (status === 422) return 'Datos inválidos. Revisa los campos e intenta de nuevo.';
        if (status && status >= 500) return 'Error en el servidor de pagos. Intenta en unos minutos.';
    }
    if (err instanceof Error) return err.message;
    return 'Ocurrió un error inesperado. Intenta de nuevo.';
}

