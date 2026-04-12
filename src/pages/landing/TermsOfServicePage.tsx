import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/shared/SEO.tsx';
import { useFadeInOnScroll } from '../../hooks/landing/useFadeInOnScroll.ts';

const LegalSection = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => {
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

const TermsOfServicePage = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t('legal.terms.seo_title')}
                description={t('legal.terms.seo_description')}
                keywords="terms of service, conditions, legal, molink, technology, cúcuta"
                canonicalUrl="/termService"
            />

            {/* Page Header */}
            <section className="relative py-24 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white title-underline">
                        {t('legal.terms.title')}
                    </h1>
                    <p className="mt-8 text-white/70">{t('legal.terms.last_updated')}</p>
                </div>
            </section>

            {/* Terms Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12 text-white/80 text-lg leading-relaxed">

                        <LegalSection title={t('legal.terms.sections.acceptance.title')}>
                            <p>{t('legal.terms.sections.acceptance.content')}</p>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.services.title')} delay={100}>
                            <p>{t('legal.terms.sections.services.intro')}</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                {(t('legal.terms.sections.services.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.usage.title')} delay={100}>
                            <p>{t('legal.terms.sections.usage.intro')}</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                {(t('legal.terms.sections.usage.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.accounts.title')} delay={100}>
                            <p>{t('legal.terms.sections.accounts.intro')}</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                {(t('legal.terms.sections.accounts.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.payments.title')} delay={100}>
                            <p>{t('legal.terms.sections.payments.content')}</p>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.ip.title')} delay={100}>
                            <p>{t('legal.terms.sections.ip.content')}</p>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.data_protection.title')} delay={100}>
                            <p>
                                {t('legal.terms.sections.data_protection.content_link')}{' '}
                                <Link to="/privacity" className="text-accent hover:underline">
                                    {t('legal.terms.sections.data_protection.link_text')}
                                </Link>
                                . {t('legal.terms.sections.data_protection.content_end')}
                            </p>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.liability.title')} delay={100}>
                            <p>{t('legal.terms.sections.liability.content')}</p>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.modifications.title')} delay={100}>
                            <p>{t('legal.terms.sections.modifications.content')}</p>
                        </LegalSection>

                        <LegalSection title={t('legal.terms.sections.jurisdiction.title')} delay={100}>
                            <p>{t('legal.terms.sections.jurisdiction.content')}</p>
                        </LegalSection>

                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsOfServicePage;
