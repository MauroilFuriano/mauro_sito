import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    noindex?: boolean;
    structuredData?: Record<string, unknown>;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical = 'https://www.mauroceccarelli.it/',
    ogImage = 'https://www.mauroceccarelli.it/og-image.jpg',
    ogType = 'website',
    noindex = false,
    structuredData,
}) => {
    const fullTitle = title.includes('Mauro') ? title : `${title} | Mauro.exe`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Mauro Ceccarelli" />
            <meta
                name="robots"
                content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
            />
            {/* Description e canonical stanno solo qui: in index.html farebbero da doppione su ogni pagina, con la home come canonical */}
            <link rel="canonical" href={canonical} />

            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonical} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
