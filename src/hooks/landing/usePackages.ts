import { useEffect, useState } from 'react';
import { packageService } from '../../services/shared/packageService.ts';
import type { PackageWithPrice } from '../../types';

/**
 * Hook que carga los paquetes de pago único desde la API.
 *
 * Cada paquete ya incluye su precio COP en `amountInCents` y la TRM del día.
 * Si la API no está disponible, `apiPackages` quedará vacío y el componente
 * puede seguir mostrando los paquetes estáticos (de pricing.data.ts) para display,
 * redirigiendo el CTA a WhatsApp como fallback.
 */
export function usePackages() {
    const [apiPackages, setApiPackages] = useState<PackageWithPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [packagesError, setPackagesError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchPackages() {
            try {
                const packages = await packageService.getPackages();
                if (!cancelled) {
                    setApiPackages(Array.isArray(packages) ? packages : []);
                }
            } catch {
                if (!cancelled) {
                    setPackagesError('No se pudieron cargar los paquetes desde el servidor.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPackages();
        return () => { cancelled = true; };
    }, []);

    /**
     * Busca el paquete de la API que coincide con el slug del paquete estático.
     * Retorna null si la API no está disponible o el paquete no existe.
     */
    function getApiPackageBySlug(slug: string): PackageWithPrice | null {
        return (apiPackages ?? []).find(p => p.slug === slug) ?? null;
    }

    return { apiPackages, loading, packagesError, getApiPackageBySlug };
}

