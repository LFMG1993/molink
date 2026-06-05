import { useEffect, useState } from 'react';
import { wompiService } from '../../services/shared/wompiService.ts';
import type { WompiPlan, WompiTrmRate } from '../../types';

/**
 * Hook que carga los planes de suscripción desde la API de Wompi
 * junto con la TRM actual (COP/USD).
 *
 * Si la API no está disponible, `apiPlans` quedará vacío y el componente
 * puede seguir mostrando los planes estáticos para efectos de display.
 */
export function usePlans() {
    const [apiPlans, setApiPlans] = useState<WompiPlan[]>([]);
    const [trm, setTrm] = useState<WompiTrmRate | null>(null);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                const [plans, trmData] = await Promise.all([
                    wompiService.getPlans(),
                    wompiService.getTrm(),
                ]);
                if (!cancelled) {
                    setApiPlans(Array.isArray(plans) ? plans : []);
                    setTrm(trmData ?? null);
                }
            } catch {
                if (!cancelled) {
                    // La API no está disponible: el checkout quedará deshabilitado
                    // pero los planes estáticos siguen visibles para display
                    setApiError('No se pudieron cargar los planes desde el servidor.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, []);

    /**
     * Busca el plan de la API que coincide con el slug del plan estático.
     * Retorna null si la API no está disponible o el plan no existe.
     */
    function getApiPlanBySlug(slug: string): WompiPlan | null {
        // Protección defensiva: apiPlans podría ser undefined si el estado aún no inicializó
        return (apiPlans ?? []).find((p) => p.slug === slug) ?? null;
    }

    return { apiPlans, trm, loading, apiError, getApiPlanBySlug };
}

