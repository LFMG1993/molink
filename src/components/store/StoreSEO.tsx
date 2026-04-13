import {Helmet} from 'react-helmet-async';

interface StoreSEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
}

/**
 * Componente SEO exclusivo para la tienda (tienda.molink.com.co).
 * Maneja meta tags, Open Graph y schema.org específicos para e-commerce.
 */
export const StoreSEO = ({title, description, keywords, canonicalUrl, ogImage, noIndex}: StoreSEOProps) => {
    const siteName = "Molink Tienda";
    const storeUrl = "https://tienda.molink.com.co";

    const fullTitle = `${title} | ${siteName}`;
    const defaultOgImage = `https://molink.com.co/og-image.jpg`;
    const finalOgImage = ogImage || defaultOgImage;
    const finalCanonicalUrl = canonicalUrl ? `${storeUrl}${canonicalUrl}` : storeUrl;

    // Keywords exclusivas de la tienda
    const storeKeywords = "licencias software, windows original, office 365, antivirus, software Colombia, licencias digitales, tienda software, molink tienda, software original, licencias baratas";
    const finalKeywords = keywords ? `${storeKeywords}, ${keywords}` : storeKeywords;

    // Schema.org específico para tienda online (OnlineStore + Product)
    const schema = {
        "@context": "https://schema.org",
        "@type": "OnlineStore",
        "name": "Molink Tienda - Software y Licencias Originales",
        "description": "Tienda oficial de licencias de software original con entrega digital inmediata. Windows, Office, Antivirus y más.",
        "image": `${storeUrl}/og-image.jpg`,
        "@id": storeUrl,
        "url": storeUrl,
        "telephone": "+573155756600",
        "priceRange": "$$",
        "currenciesAccepted": "COP",
        "paymentAccepted": "Cash, Credit Card, PayPal",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle 12 # 3 - 59, Trapiches",
            "addressLocality": "Villa del Rosario",
            "addressRegion": "Norte de Santander",
            "postalCode": "541030",
            "addressCountry": "CO"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Colombia"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 7.8650731,
            "longitude": -72.4774450
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
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
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${storeUrl}/products?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Helmet>
            {noIndex && <meta name="robots" content="noindex, nofollow"/>}
            <title>{fullTitle}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={finalKeywords}/>
            <link rel="canonical" href={finalCanonicalUrl}/>

            {/* Open Graph - exclusivo para tienda */}
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={fullTitle}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={finalOgImage}/>
            <meta property="og:url" content={finalCanonicalUrl}/>
            <meta property="og:site_name" content={siteName}/>
            <meta property="og:locale" content="es_CO"/>

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={fullTitle}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={finalOgImage}/>

            {/* Schema.org JSON-LD - OnlineStore específico */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};
