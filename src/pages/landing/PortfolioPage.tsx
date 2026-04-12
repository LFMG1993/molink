import { useTranslation } from 'react-i18next';
import FlipCard from '../../components/landing/FlipCard.tsx';
import {SEO} from '../../components/shared/SEO.tsx';
import { portfolioData } from "../../data/landing/portfolio.data.ts";

const PortfolioPage = () => {
    const { t } = useTranslation();

    const sortedProjects = [...portfolioData].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;

        return Number(b.date) - Number(a.date);
    });

    return (
        <>
            <SEO
                title={t('landing.portfolio.seo.title')}
                description={t('landing.portfolio.seo.description')}
                keywords={t('landing.portfolio.seo.keywords')}
                canonicalUrl="/portfolio"
            />
            
            <section className="bg-black min-h-screen w-full pt-32 pb-20">
                <div className="container mx-auto text-center mb-16 px-4">
                    <h1 className="font-heading text-4xl md:text-4xl font-bold uppercase text-white title-underline">
                        {t('landing.portfolio.title')}
                    </h1>
                </div>

                <div className="flex flex-wrap justify-center items-start gap-8 md:gap-16 px-4 md:px-8">
                {sortedProjects.map((project, index) => (
                    <FlipCard
                        key={index}
                        imageUrl={project.imageUrl}
                        slug={project.slug}
                        date={project.date}
                        title={t(`portfolio.projects.${project.slug}.title`)}
                        description={t(`portfolio.projects.${project.slug}.shortDescription`)}
                        isFeatured={project.featured}
                        flipDirection="horizontal"
                    />
                ))}
                </div>
            </section>
        </>
    );
};

export default PortfolioPage;