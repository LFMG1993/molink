import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/shared/SEO.tsx';
import { ChevronDown, ChevronUp, Lightbulb, Settings, Cpu, Headset } from 'lucide-react';
import clsx from 'clsx';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQCategory {
    id: string;
    icon: React.ElementType;
    title: string;
    items: FAQ[];
}

/**
 * Componente acordeón para una pregunta individual.
 */
const FAQItem = ({ question, answer }: FAQ) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left bg-black/40 hover:bg-black/60 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-white pr-4">{question}</span>
                <span className="text-accent shrink-0">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
            </button>
            <div
                className={clsx(
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className="p-6 bg-surface/50 text-white/80 leading-relaxed text-base">
                    {answer}
                </div>
            </div>
        </div>
    );
};

/**
 * Página de Preguntas Frecuentes (FAQ) optimizada para SEO.
 * Incluye Schema.org FAQPage JSON-LD para rich snippets en Google.
 */
const FAQPage = () => {
    const { t } = useTranslation();

    const categories: FAQCategory[] = [
        {
            id: 'services',
            icon: Lightbulb,
            title: t('landing.faq.categories.services.title'),
            items: [
                {
                    question: t('landing.faq.categories.services.items.q1_q'),
                    answer: t('landing.faq.categories.services.items.q1_a'),
                },
                {
                    question: t('landing.faq.categories.services.items.q2_q'),
                    answer: t('landing.faq.categories.services.items.q2_a'),
                },
                {
                    question: t('landing.faq.categories.services.items.q3_q'),
                    answer: t('landing.faq.categories.services.items.q3_a'),
                },
                {
                    question: t('landing.faq.categories.services.items.q4_q'),
                    answer: t('landing.faq.categories.services.items.q4_a'),
                },
                {
                    question: t('landing.faq.categories.services.items.q5_q'),
                    answer: t('landing.faq.categories.services.items.q5_a'),
                },
            ],
        },
        {
            id: 'pricing',
            icon: Settings,
            title: t('landing.faq.categories.pricing.title'),
            items: [
                {
                    question: t('landing.faq.categories.pricing.items.q1_q'),
                    answer: t('landing.faq.categories.pricing.items.q1_a'),
                },
                {
                    question: t('landing.faq.categories.pricing.items.q2_q'),
                    answer: t('landing.faq.categories.pricing.items.q2_a'),
                },
                {
                    question: t('landing.faq.categories.pricing.items.q3_q'),
                    answer: t('landing.faq.categories.pricing.items.q3_a'),
                },
                {
                    question: t('landing.faq.categories.pricing.items.q4_q'),
                    answer: t('landing.faq.categories.pricing.items.q4_a'),
                },
                {
                    question: t('landing.faq.categories.pricing.items.q5_q'),
                    answer: t('landing.faq.categories.pricing.items.q5_a'),
                },
            ],
        },
        {
            id: 'process',
            icon: Settings,
            title: t('landing.faq.categories.process.title'),
            items: [
                {
                    question: t('landing.faq.categories.process.items.q1_q'),
                    answer: t('landing.faq.categories.process.items.q1_a'),
                },
                {
                    question: t('landing.faq.categories.process.items.q2_q'),
                    answer: t('landing.faq.categories.process.items.q2_a'),
                },
                {
                    question: t('landing.faq.categories.process.items.q3_q'),
                    answer: t('landing.faq.categories.process.items.q3_a'),
                },
                {
                    question: t('landing.faq.categories.process.items.q4_q'),
                    answer: t('landing.faq.categories.process.items.q4_a'),
                },
                {
                    question: t('landing.faq.categories.process.items.q5_q'),
                    answer: t('landing.faq.categories.process.items.q5_a'),
                },
            ],
        },
        {
            id: 'technical',
            icon: Cpu,
            title: t('landing.faq.categories.technical.title'),
            items: [
                {
                    question: t('landing.faq.categories.technical.items.q1_q'),
                    answer: t('landing.faq.categories.technical.items.q1_a'),
                },
                {
                    question: t('landing.faq.categories.technical.items.q2_q'),
                    answer: t('landing.faq.categories.technical.items.q2_a'),
                },
                {
                    question: t('landing.faq.categories.technical.items.q3_q'),
                    answer: t('landing.faq.categories.technical.items.q3_a'),
                },
                {
                    question: t('landing.faq.categories.technical.items.q4_q'),
                    answer: t('landing.faq.categories.technical.items.q4_a'),
                },
                {
                    question: t('landing.faq.categories.technical.items.q5_q'),
                    answer: t('landing.faq.categories.technical.items.q5_a'),
                },
            ],
        },
        {
            id: 'support',
            icon: Headset,
            title: t('landing.faq.categories.support.title'),
            items: [
                {
                    question: t('landing.faq.categories.support.items.q1_q'),
                    answer: t('landing.faq.categories.support.items.q1_a'),
                },
                {
                    question: t('landing.faq.categories.support.items.q2_q'),
                    answer: t('landing.faq.categories.support.items.q2_a'),
                },
                {
                    question: t('landing.faq.categories.support.items.q3_q'),
                    answer: t('landing.faq.categories.support.items.q3_a'),
                },
                {
                    question: t('landing.faq.categories.support.items.q4_q'),
                    answer: t('landing.faq.categories.support.items.q4_a'),
                },
                {
                    question: t('landing.faq.categories.support.items.q5_q'),
                    answer: t('landing.faq.categories.support.items.q5_a'),
                },
            ],
        },
    ];

    // Construir Schema.org FAQPage para rich snippets de Google
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": categories.flatMap(cat =>
            cat.items.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer.replace(/<[^>]*>/g, '').substring(0, 500),
                },
            }))
        ),
    };

    return (
        <>
            <SEO
                title={t('landing.faq.seo.title')}
                description={t('landing.faq.seo.description')}
                keywords={t('landing.faq.seo.keywords')}
                canonicalUrl="/faq"
            />

            {/* Schema.org FAQPage JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>

            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-4xl font-bold uppercase text-white title-underline">
                        {t('landing.faq.hero_title')}
                    </h1>
                    <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg">
                        {t('landing.faq.hero_subtitle')}
                    </p>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-16">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <div key={category.id}>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-800/30 text-accent">
                                            <Icon size={24} />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                                            {category.title}
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {category.items.map((faq, index) => (
                                            <FAQItem
                                                key={`${category.id}-${index}`}
                                                question={faq.question}
                                                answer={faq.answer}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-surface">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('landing.faq.cta_title')}
                    </h2>
                    <p className="text-white/70 mb-8 max-w-xl mx-auto">
                        {t('landing.faq.cta_desc')}
                    </p>
                    <a
                        href="https://wa.me/573155756600"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-accent text-white font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105"
                    >
                        WhatsApp
                    </a>
                </div>
            </section>
        </>
    );
};

export default FAQPage;
