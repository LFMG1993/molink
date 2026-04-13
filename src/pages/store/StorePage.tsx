import {useState, useEffect} from "react";
import {Server} from 'react-bootstrap-icons';
import {StoreHeader} from "../../components/store/layout/StoreHeader.tsx";
import {StoreFooter} from "../../components/store/layout/StoreFooter.tsx";
import {HeroGrid} from "../../components/store/home/HeroGrid.tsx";
import {FeaturesRow} from "../../components/store/home/FeaturesRow.tsx";
import {SectionHeading} from "../../components/store/home/SectionHeading.tsx";
import {ProductCarousel} from "../../components/store/home/ProductCarousel.tsx";
import {Button} from "../../components/shared/Button.tsx";
import {useTranslation} from 'react-i18next';
import {shopService} from "../../services/store/shopService.ts";
import type {Product} from "../../types";
import {useCart} from "../../context/store/CardContext.tsx";
import {ProductDetailModal} from "../../components/store/shop/ProductDetailModal.tsx";
import {StoreSEO} from "../../components/store/StoreSEO.tsx";

const StorePage = () => {
    const {t} = useTranslation();
    const {addItem} = useCart();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);
    const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    useEffect(() => {
        // Productos destacados (isFeatured)
        shopService.getPublicProducts({page: 1, limit: 6, featured: true, isActive: true})
            .then(res => setFeaturedProducts(res.data))
            .catch(() => {})
            .finally(() => setLoadingFeatured(false));

        // Novedades recientes (sin filtro de featured, ordenados por más reciente)
        shopService.getPublicProducts({page: 1, limit: 4, isActive: true})
            .then(res => setRecentProducts(res.data))
            .catch(() => {});
    }, []);

    const handleAddOrSelect = async (product: Product) => {
        try {
            const full = await shopService.getPublicProductById(product.id);
            if (full.variants?.length === 1) {
                addItem(full, 1);
            } else {
                setViewingProduct(full);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            <StoreSEO
                title={t('store.seo.home.title')}
                description={t('store.seo.home.description')}
                keywords={t('store.seo.home.keywords')}
                canonicalUrl="/"
            />
            <StoreHeader/>
            <main className="pb-20 space-y-16">
                <HeroGrid/>
                <FeaturesRow/>

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
                            {Array.from({length: 4}).map((_, i) => (
                                <div key={i} className="w-52 sm:w-60 flex-shrink-0 bg-white rounded-xl border border-slate-100 aspect-[3/4] animate-pulse"/>
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
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-900/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 text-white max-w-lg">
                            <h3 className="text-3xl font-bold mb-3">{t('store.business.title')}</h3>
                            <p className="text-blue-100 text-lg mb-6">{t('store.business.desc')}</p>
                            <Button variant="outline"
                                    className="bg-white text-blue-600 border-transparent hover:bg-blue-50 border-0">
                                {t('store.business.cta')}
                            </Button>
                        </div>
                        <div className="relative z-10 hidden md:block">
                            <Server className="w-40 h-40 text-white/20"/>
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
            </main>
            <StoreFooter/>
            <ProductDetailModal
                product={viewingProduct}
                onClose={() => setViewingProduct(null)}
            />
        </div>
    );
}

export default StorePage;

