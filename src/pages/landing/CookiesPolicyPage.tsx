import * as React from "react";
import { useTranslation } from 'react-i18next';
import { SEO } from "../../components/shared/SEO.tsx";
import { Link } from "react-router-dom";
import { useFadeInOnScroll } from "../../hooks/landing/useFadeInOnScroll.ts";

const CookieSection = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => {
    const [ref, style] = useFadeInOnScroll({ delay });
    return (
        <div ref={ref} style={style}>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="space-y-4">{children}</div>
        </div>
    );
};

export default function CookiePolicyPage() {
    const { t } = useTranslation();

    const browserUrls = t('legal.cookies.sections.management.browser_urls', { returnObjects: true }) as string[];

    return (
        <>
            <SEO
                title={t('legal.cookies.seo_title')}
                description="Understand how and why we use cookies to improve your experience on our website."
                noIndex={true}
            />
            <main className="bg-black text-white">
                <section className="relative py-24 bg-surface">
                    <div className="container mx-auto text-center px-4">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white title-underline">{t('legal.cookies.title')}</h1>
                        <p className="mt-8 text-white/70">{t('legal.cookies.last_updated')}</p>
                    </div>
                </section>

                <section className="py-8">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="space-y-12 text-white/80 text-lg leading-relaxed">
                            <CookieSection title={t('legal.cookies.sections.what_are.title')}>
                                <p className="text-justify">{t('legal.cookies.sections.what_are.content')}</p>
                            </CookieSection>
                            
                            <CookieSection title={t('legal.cookies.sections.how_we_use.title')} delay={100}>
                                <p className="mb-4 text-justify" dangerouslySetInnerHTML={{ __html: t('legal.cookies.sections.how_we_use.intro') }} />
                                <ul className="list-disc list-inside space-y-4 pl-4">
                                    <li className="text-justify">
                                        <strong>{t('legal.cookies.sections.how_we_use.essential.label')}</strong> {t('legal.cookies.sections.how_we_use.essential.desc')}
                                        <ul className="list-circle list-inside space-y-2 pl-8 mt-2 text-base">
                                            {(t('legal.cookies.sections.how_we_use.essential.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="text-justify">
                                        <strong>{t('legal.cookies.sections.how_we_use.functionality.label')}</strong> {t('legal.cookies.sections.how_we_use.functionality.desc')}
                                        <ul className="list-circle list-inside space-y-2 pl-8 mt-2 text-base">
                                            {(t('legal.cookies.sections.how_we_use.functionality.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="text-justify">
                                        <strong>{t('legal.cookies.sections.how_we_use.analytics.label')}</strong> {t('legal.cookies.sections.how_we_use.analytics.desc')}
                                    </li>
                                    <li className="text-justify">
                                        <strong>{t('legal.cookies.sections.how_we_use.marketing.label')}</strong> {t('legal.cookies.sections.how_we_use.marketing.desc')}
                                    </li>
                                </ul>
                            </CookieSection>
                            
                            <CookieSection title={t('legal.cookies.sections.management.title')} delay={200}>
                                <p>{t('legal.cookies.sections.management.intro')}</p>
                                <ul className="list-disc list-inside space-y-3 pl-4 mt-4">
                                    {(t('legal.cookies.sections.management.items', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <p className="mt-4">{t('legal.cookies.sections.management.warning')}</p>
                                <p className="mt-4">{t('legal.cookies.sections.management.browser_links')}</p>
                                <ul className="list-disc list-inside space-y-3 pl-4 mt-4">
                                    {(t('legal.cookies.sections.management.browsers', { returnObjects: true }) as string[]).map((browser: string, i: number) => (
                                        <li key={i}>
                                            <a href={browserUrls[i]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{browser}</a>
                                        </li>
                                    ))}
                                </ul>
                            </CookieSection>
                            
                            <CookieSection title={t('legal.cookies.sections.more_info.title')} delay={300}>
                                <p>{t('legal.cookies.sections.more_info.privacy_link_text')} <strong><Link to="/privacity" className="text-accent hover:underline">{t('legal.cookies.sections.more_info.privacy_link_label')}</Link></strong></p>
                                <p className="mt-4">{t('legal.cookies.sections.more_info.contact')} <strong><Link to="mailto:contacto@molink.com.co" className="text-accent hover:underline">contacto@molink.com.co</Link></strong></p>
                            </CookieSection>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}