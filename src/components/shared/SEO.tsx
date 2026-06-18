import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
}

/**
 * Componente reutilizable para gestionar las etiquetas de SEO de cada página.
 */
export const SEO = ({title, description, keywords, canonicalUrl, ogImage, noIndex}: SEOProps) => {
    const {i18n} = useTranslation();
    const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es';
    const ogLocale = currentLang === 'en' ? 'en_US' : 'es_CO';
    const ogLocaleAlternate = currentLang === 'en' ? 'es_CO' : 'en_US';

    const siteName = "Molink Tecnología";
    const siteUrl = "https://molink.com.co";

    const fullTitle = `${title} | ${siteName}`;
    const defaultOgImage = `https://molink.com.co/og-image.jpg`;
    const finalOgImage = ogImage || defaultOgImage;
    const finalCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

    // Keywords servicios de desarrollo
    const siteKeywords = "desarrollo de software Cúcuta, agencia de desarrollo web Cúcuta, creación de páginas web, diseño web Cúcuta, desarrollo de tiendas virtuales, e-commerce, comercio electrónico, tiendas online, aplicaciones móviles, programación web, agencias de tecnología Norte de Santander, automatización de procesos, desarrollo a medida en Cúcuta, Villa del Rosario, Los Patios, desarrolladores web Colombia, software Latinoamérica, desarrollo de apps, ecommerce development, consultoría tecnológica, Molink Tecnología";
    const finalKeywords = keywords ? `${siteKeywords}, ${keywords}` : siteKeywords;
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Molink Tecnología - Agencia de Desarrollo Web y Software",
        "alternateName": [
            "Molink",
            "Agencia de desarrollo web Cúcuta",
            "Desarrolladores FullStack Colombia",
            "Empresa de software Norte de Santander"
        ],
        "description": description || "Agencia experta en desarrollo de software, páginas web, tiendas virtuales, chatbots con IA, automatizaciones y aplicaciones móviles en Cúcuta y Latinoamérica.",
        "image": `https://molink.com.co/og-image.jpg`,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": "+573155756600",
        "email": "contacto@molink.com.co",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle 12 # 3 - 59, Trapiches",
            "addressLocality": "Villa del Rosario, Cúcuta",
            "addressRegion": "Norte de Santander",
            "postalCode": "541030",
            "addressCountry": "CO"
        },
        "areaServed": [
            { "@type": "City", "name": "Cúcuta" },
            { "@type": "City", "name": "Villa del Rosario" },
            { "@type": "City", "name": "Los Patios" },
            { "@type": "State", "name": "Norte de Santander" },
            { "@type": "Country", "name": "Colombia" },
            { "@type": "Continent", "name": "South America" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Desarrollo de Software y IA",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Desarrollo de Páginas Web en Cúcuta",
                        "description": "Creación de páginas web corporativas, landing pages y sitios de presentación para empresas en Cúcuta y Norte de Santander.",
                        "areaServed": "Cúcuta, Colombia"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Desarrollo de Tiendas Virtuales y E-commerce",
                        "description": "E-commerce completo con carrito, pasarelas de pago y panel de administración para empresas en Colombia.",
                        "areaServed": "Colombia, Latinoamérica"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Desarrollo de Aplicaciones Móviles iOS y Android",
                        "description": "Apps con React Native y Flutter para iOS y Android. Publicación en App Store y Google Play.",
                        "areaServed": "Colombia, Latinoamérica"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Chatbots con IA y LLMs para Empresas",
                        "description": "Chatbots inteligentes para WhatsApp y web usando OpenAI, Claude y LLMs locales (Ollama/LLaMA). Asistentes virtuales entrenados con datos del negocio.",
                        "areaServed": "Colombia, Latinoamérica"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Automatización de Procesos Empresariales",
                        "description": "Automatización de flujos de trabajo con Node.js, Go, n8n e integraciones API para reducir tareas manuales en pymes.",
                        "areaServed": "Colombia, Latinoamérica"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Desarrollo FullStack a Medida",
                        "description": "Desarrollo con React, TypeScript, Node.js, Go, PostgreSQL, MongoDB, Firebase y Cloudflare Workers.",
                        "areaServed": "Colombia, Latinoamérica"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Software SaaS por Suscripción",
                        "description": "Soluciones de software como servicio (SaaS) para pymes colombianas. Acceso por suscripción mensual sin pago único elevado.",
                        "areaServed": "Colombia, Latinoamérica"
                    }
                }
            ]
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 7.8650731,
            "longitude": -72.4774450
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                "opens": "08:00",
                "closes": "21:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://web.facebook.com/Molink",
            "https://www.instagram.com/molink_tecnologia",
            "https://www.tiktok.com/@molink_tecnologia",
            "https://www.youtube.com/@molink_tecnologia",
            "https://maps.app.goo.gl/CjUAgiT8jMeZfjjW8"
        ],
        "serviceType": [
            "Desarrollo Web en Cúcuta",
            "Desarrollo de E-commerce Colombia",
            "Aplicaciones Móviles iOS Android",
            "Desarrollo FullStack React Node.js Go",
            "Chatbots IA WhatsApp Colombia",
            "LLMs Locales Empresas Colombia",
            "Automatización de Procesos Pymes",
            "Software SaaS Colombia",
            "Mapas OpenStreetMap Leaflet",
            "PostgreSQL Go Golang Colombia",
            "Tiendas Virtuales Norte de Santander",
            "Diseño UI/UX",
            "Hosting y Dominio"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Molink Tecnología",
        "url": siteUrl,
        "description": "Agencia de desarrollo web, e-commerce y apps en Cúcuta, Colombia.",
        "inLanguage": currentLang,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Helmet htmlAttributes={{lang: currentLang}}>
            {noIndex && <meta name="robots" content="noindex, nofollow"/>}
            <title>{fullTitle}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={finalKeywords} />
            <link rel="canonical" href={finalCanonicalUrl}/>
            <link rel="alternate" hrefLang="es" href={siteUrl}/>
            <link rel="alternate" hrefLang="es-CO" href={siteUrl}/>
            <link rel="alternate" hrefLang="en" href={siteUrl}/>
            <link rel="alternate" hrefLang="x-default" href={siteUrl}/>

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={ogLocale}/>
            <meta property="og:locale:alternate" content={ogLocaleAlternate}/>
            <meta property="og:title" content={fullTitle}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={finalOgImage}/>
            <meta property="og:url" content={finalCanonicalUrl}/>
            <meta property="og:site_name" content={siteName}/>

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={finalOgImage}/>

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
        </Helmet>
    );
};