import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/shared/SEO.tsx';
import { useFadeInOnScroll } from '../../hooks/landing/useFadeInOnScroll.ts';

const PrivacySection = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => {
    const [ref, style] = useFadeInOnScroll({ delay });
    return (
        <div ref={ref} style={style}>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

const PrivacyPolicyPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t('legal.privacy.seo_title')}
                description={t('legal.privacy.seo_description')}
                keywords="privacy policy, data protection, law 1581, habeas data"
                canonicalUrl="/privacity"
            />

            {/* Page Header */}
            <section className="relative py-24 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white title-underline">
                        {t('legal.privacy.title')}
                    </h1>
                    <p className="mt-8 text-white/70">{t('legal.privacy.last_updated')}</p>
                </div>
            </section>

            {/* Privacy Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12 text-white/80 text-lg leading-relaxed">
                        <PrivacySection title={t('legal.privacy.sections.info.title')}>
                            <p>{t('legal.privacy.sections.info.content')}</p>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.legal.title')} delay={100}>
                            <p>{t('legal.privacy.sections.legal.content')}</p>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.data_collected.title')} delay={200}>
                            <p className="mb-4">{t('legal.privacy.sections.data_collected.intro')}</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                {(t('legal.privacy.sections.data_collected.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.purpose.title')} delay={300}>
                            <p className="mb-4">{t('legal.privacy.sections.purpose.intro')}</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                {(t('legal.privacy.sections.purpose.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.consent.title')} delay={400}>
                            <p>{t('legal.privacy.sections.consent.content')}</p>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.rights.title')} delay={500}>
                            <p className="mb-4">{t('legal.privacy.sections.rights.intro')}</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                {(t('legal.privacy.sections.rights.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.security.title')} delay={600}>
                            <p>{t('legal.privacy.sections.security.content')}</p>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.third_parties.title')} delay={700}>
                            <p>{t('legal.privacy.sections.third_parties.content')}</p>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.cookies.title')} delay={800}>
                            <p>{t('legal.privacy.sections.cookies.content')}</p>
                        </PrivacySection>
                        <PrivacySection title={t('legal.privacy.sections.modifications.title')} delay={900}>
                            <p>{t('legal.privacy.sections.modifications.content')}</p>
                        </PrivacySection>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicyPage;
