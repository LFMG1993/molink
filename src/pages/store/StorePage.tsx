import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Server } from 'react-bootstrap-icons';
import { StoreCategoriesBar } from "../../components/store/home/StoreCategoriesBar";
import { HeroGrid } from "../../components/store/home/HeroGrid";
import { FeaturesRow } from "../../components/store/home/FeaturesRow";
import { SectionHeading } from "../../components/store/home/SectionHeading";
import { ProductCarousel } from "../../components/store/home/ProductCarousel";
import { Button } from "../../components/shared/Button";
import { useTranslation } from 'react-i18next';
import { shopService } from "../../services/store/shopService";
import type { Product } from "../../types";
import { StoreSEO } from "../../components/store/StoreSEO";
import { useCart } from "../../context/store/CardContext";

const StorePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    useEffect(() => {
        // Productos destacados (isFeatured) — endpoint dedicado
        shopService.getPublicFeaturedProducts(6)
            .then(res => setFeaturedProducts(res.data))
            .catch(error => {
                console.error('Error cargando productos destacados:', error);
                setFeaturedProducts([]);
            })
            .finally(() => setLoadingFeatured(false));
    }, []);

    useEffect(() => {
        // Novedades recientes (últimos productos añadidos) — independiente
        shopService.getPublicProducts({ page: 1, limit: 4, isActive: true })
            .then(res => setRecentProducts(res.data))
            .catch(error => {
                console.error('Error cargando novedades recientes:', error);
                setRecentProducts([]);
            });
    }, []);

    const { addItem } = useCart();

    const handleAddOrSelect = async (product: Product) => {
        // Si el producto tiene múltiples variantes, forzamos a ir al detalle para que seleccione.
        if (product.variants && product.variants.length > 1) {
            navigate(`/products/${product.id}`);
            return;
        }

        // Si falta el ID de la variante, obtenemos el producto completo primero
        if (!product.variants?.[0]?.id) {
            try {
                const fullProduct = await shopService.getPublicProductById(product.id);
                if (fullProduct.variants && fullProduct.variants.length > 1) {
                    navigate(`/products/${product.id}`);
                } else {
                    addItem(fullProduct);
                }
            } catch (error) {
                console.error("Error cargando producto completo:", error);
                navigate(`/products/${product.id}`);
            }
        } else {
            // Si ya tenemos el ID, añadimos directamente
            addItem(product);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            <StoreSEO
                title={t('store.seo.home.title')}
                description={t('store.seo.home.description')}
                keywords={t('store.seo.home.keywords')}
                canonicalUrl="/"
            />
            <StoreCategoriesBar />
            <div className="pb-20 space-y-16">
                <HeroGrid 
                    mainProduct={featuredProducts[0]} 
                    onAdd={handleAddOrSelect} 
                />
                <FeaturesRow />

                {/* Más vendidos / Destacados */}
                <section className="container mx-auto px-4">
                    <SectionHeading
                        title={t('store.bestsellers.title')}
                        subtitle={t('store.bestsellers.subtitle')}
                        action={t('store.bestsellers.action')}
                        to="/products"
                    />
                    {loadingFeatured ? (
                        /* Skeleton mientras carga */
                        <div className="flex gap-4 overflow-hidden">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="w-52 sm:w-60 shrink-0 bg-white rounded-xl border border-slate-100 aspect-3/4 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <ProductCarousel
                            products={featuredProducts}
                            onAdd={handleAddOrSelect}
                            speed={18}
                        />
                    )}
                </section>

                {/* Banner corporativo */}
                <section className="container mx-auto px-4">
                    <div className="rounded-2xl bg-black p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                        <div className="relative z-10 text-white max-w-lg">
                            <h3 className="text-3xl font-bold mb-3">{t('store.business.title')}</h3>
                            <p className="text-white/60 text-lg mb-6">{t('store.business.desc')}</p>
                            <a
                                href="https://wa.me/573155756600"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline"
                                    className="bg-white text-black border border-transparent hover:bg-black hover:text-white hover:border-red-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                                    {t('store.business.cta')}
                                </Button>
                            </a>
                        </div>
                        <div className="relative z-10 hidden md:block">
                            <Server className="w-40 h-40 text-white/10" />
                        </div>
                    </div>
                </section>

                {/* Novedades Recientes */}
                <section className="container mx-auto px-4">
                    <SectionHeading
                        title="Novedades Recientes"
                        action="Ver novedades"
                        to="/products"
                    />
                    <ProductCarousel
                        products={recentProducts}
                        onAdd={handleAddOrSelect}
                        speed={22}
                    />
                </section>
            </div>
        </main>
    );
}

export default StorePage;
