/**
 * Utilidades de conversión y formateo de moneda para el flujo Wompi.
 * Los precios se almacenan en USD y se convierten a COP con la TRM oficial.
 */

/**
 * Convierte un monto en USD a COP y lo formatea para mostrar en la UI.
 *
 * @param usdAmount  Monto en dólares
 * @param trmRate    Tasa de cambio (ej: 4247.14 COP por 1 USD)
 * @returns          String formateado, ej: "$ 42.471"
 *
 * @example
 * formatCopEquivalent(10, 4247.14) // "$ 42.471"
 */
export function formatCopEquivalent(usdAmount: number, trmRate: number): string {
    const cop = Math.round(usdAmount * trmRate);
    return cop.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    });
}

/**
 * Convierte centavos COP a pesos COP y formatea para mostrar en la UI.
 *
 * @param cents  Valor en centavos COP
 * @returns      String formateado, ej: "$ 42.471"
 *
 * @example
 * formatCopFromCents(4247100) // "$ 42.471"
 */
export function formatCopFromCents(cents: number): string {
    const cop = cents / 100;
    return cop.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    });
}

/**
 * Formatea un monto en USD para mostrar en la UI.
 *
 * @param usdAmount  Monto en dólares
 * @returns          String formateado, ej: "$10.00 USD"
 *
 * @example
 * formatUsd(10) // "$10.00 USD"
 */
export function formatUsd(usdAmount: number): string {
    return `$${usdAmount.toFixed(2)} USD`;
}

/**
 * Retorna el número de tarjeta formateado con espacios cada 4 dígitos.
 * Útil en el input del formulario de tarjeta.
 *
 * @param value  Valor crudo del input
 * @returns      Valor formateado, ej: "4111 1111 1111 1111"
 *
 * @example
 * formatCardNumber("4111111111111111") // "4111 1111 1111 1111"
 */
export function formatCardNumber(value: string): string {
    return value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
}

