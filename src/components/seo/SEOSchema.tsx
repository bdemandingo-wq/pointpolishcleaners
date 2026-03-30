import { Helmet } from 'react-helmet-async';

interface SEOSchemaProps {
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  pageType?: 'home' | 'county' | 'blog' | 'service' | 'city';
  county?: string;
  cityName?: string;
  blogMeta?: {
    datePublished?: string;
    dateModified?: string;
    readTime?: string;
    category?: string;
  };
  faqItems?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const WEBSITE = "https://pointpolishcleaners.com";
const BUSINESS_NAME = "Point Polish Cleaners";
const PHONE = "+1-904-513-9002";

const cleaningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "@id": `${WEBSITE}/#business`,
  "name": BUSINESS_NAME,
  "alternateName": ["Point Polish", "Point Polish Cleaning"],
  "description": "Point Polish Cleaners provides luxury-level residential and commercial cleaning in Jacksonville, FL. We deliver precision cleaning with a polished finish every time.",
  "url": WEBSITE,
  "telephone": PHONE,
  "email": "support@pointpolishcleaners.com",
  "foundingDate": "2025",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jacksonville",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Jacksonville", "sameAs": "https://en.wikipedia.org/wiki/Jacksonville,_Florida" },
    { "@type": "City", "name": "Jacksonville Beach" },
    { "@type": "City", "name": "Atlantic Beach" },
    { "@type": "City", "name": "Neptune Beach" },
    { "@type": "City", "name": "Ponte Vedra Beach" },
    { "@type": "AdministrativeArea", "name": "Duval County", "sameAs": "https://en.wikipedia.org/wiki/Duval_County,_Florida" }
  ],
  "knowsAbout": ["House Cleaning", "Deep Cleaning", "Move-In Cleaning", "Move-Out Cleaning", "Carpet Cleaning", "Upholstery Cleaning", "Eco-Friendly Cleaning", "Commercial Cleaning"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Point Polish Cleaning Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Standard House Cleaning", "description": "Regular maintenance cleaning for homes.", "price": "150", "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Standard Cleaning", "serviceType": "House Cleaning" } },
      { "@type": "Offer", "name": "Deep House Cleaning", "description": "Comprehensive deep cleaning including baseboards, inside cabinets, light fixtures.", "price": "250", "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Deep Cleaning", "serviceType": "Deep House Cleaning" } },
      { "@type": "Offer", "name": "Move In / Move Out Cleaning", "description": "Complete top-to-bottom cleaning for move-ins and move-outs.", "price": "300", "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Move In/Out Cleaning", "serviceType": "Move Out Cleaning" } },
      { "@type": "Offer", "name": "Carpet Cleaning", "description": "Professional deep extraction carpet cleaning.", "itemOffered": { "@type": "Service", "name": "Carpet Cleaning", "serviceType": "Carpet Cleaning" } },
      { "@type": "Offer", "name": "Upholstery Cleaning", "description": "Expert furniture and fabric cleaning.", "itemOffered": { "@type": "Service", "name": "Upholstery Cleaning", "serviceType": "Upholstery Cleaning" } }
    ]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${WEBSITE}/#website`,
  "url": WEBSITE,
  "name": BUSINESS_NAME,
  "description": "Professional house cleaning in Jacksonville, FL. Luxury-level cleaning with precision and care.",
  "publisher": { "@id": `${WEBSITE}/#business` }
};

const SEOSchema = ({ 
  pageTitle, 
  pageDescription, 
  canonicalUrl,
  pageType = 'home',
  county,
  cityName,
  blogMeta,
  faqItems,
  breadcrumbs
}: SEOSchemaProps) => {
  const isHome = pageType === 'home';

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  } : pageType !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": WEBSITE },
      { "@type": "ListItem", "position": 2, "name": pageTitle.replace(' | Point Polish Cleaners', '').replace(' | POINT POLISH', ''), "item": canonicalUrl }
    ]
  } : null;

  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  } : null;

  const blogPostingSchema = pageType === 'blog' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "datePublished": blogMeta?.datePublished || "2025-01-15",
    "dateModified": blogMeta?.dateModified || "2025-03-08",
    "author": { "@type": "Organization", "name": BUSINESS_NAME, "url": WEBSITE },
    "publisher": { "@type": "Organization", "name": BUSINESS_NAME },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    ...(blogMeta?.category && { "articleSection": blogMeta.category }),
    ...(blogMeta?.readTime && { "timeRequired": `PT${blogMeta.readTime.replace(/\D/g, '')}M` })
  } : null;

  const serviceSchema = pageType === 'service' ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageTitle.replace(' | Point Polish Cleaners', '').replace(' | POINT POLISH', ''),
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": { "@id": `${WEBSITE}/#business` },
    "areaServed": { "@type": "City", "name": "Jacksonville, FL" },
    "termsOfService": `${WEBSITE}/faq`
  } : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={pageType === 'blog' ? 'article' : 'website'} />
      <meta property="og:site_name" content={BUSINESS_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Jacksonville" />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en-us" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(cleaningServiceSchema)}
        </script>
      )}
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {!isHome && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CleaningService",
            "@id": `${WEBSITE}/#business`,
            "name": BUSINESS_NAME,
            "url": WEBSITE,
            "telephone": PHONE
          })}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {blogPostingSchema && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
      )}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOSchema;