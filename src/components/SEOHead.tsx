import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PortfolioItem, MusicRelease } from '../types';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  project?: PortfolioItem | null;
  release?: MusicRelease | null;
}

const DEFAULT_TITLE = 'Wacha Multimedia | Producciones & Sonido Decrépito';
const DEFAULT_DESCRIPTION = 'Plataforma oficial de Wacha Multimedia & Mr. Decrépito: Ingeniería de contenido, Sonido Decrépito, canales de YouTube, portafolio de guerrilla y AEO/SEO.';
const DEFAULT_IMAGE = '/cetes_premier_app.jpg';
const SITE_NAME = 'Wacha Multimedia & Mr. Decrépito';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  project,
  release
}) => {
  // Determine site origin dynamically or fallback to domain
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://whachas.site';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.hash + window.location.search : '';
  const currentUrl = url || `${origin}${currentPath}`;

  // Resolve active title, description, and preview image
  let metaTitle = title;
  let metaDescription = description;
  let metaImage = image;
  let schemaData: Record<string, unknown> | null = null;

  if (project) {
    metaTitle = `${project.title} | Portafolio Wacha Multimedia`;
    metaDescription = `${project.subtitle}. ${project.description}`;
    metaImage = project.image || project.images?.[0] || DEFAULT_IMAGE;
    
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': project.title,
      'description': project.description,
      'applicationCategory': project.category,
      'operatingSystem': 'Web',
      'author': {
        '@type': 'Organization',
        'name': 'Wacha Multimedia',
        'url': origin
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    };
  } else if (release) {
    metaTitle = `${release.title} – ${release.subtitle} | Sonido Decrépito`;
    metaDescription = `Escucha y descarga ${release.title} de Sonido Decrépito. ${release.subtitle}. Tracks: ${release.tracksCount}. Estilo Cumbia Rebajada.`;
    metaImage = release.coverImage || DEFAULT_IMAGE;

    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'MusicAlbum',
      'name': release.title,
      'byArtist': {
        '@type': 'MusicGroup',
        'name': 'Sonido Decrépito'
      },
      'genre': 'Cumbia Rebajada',
      'numTracks': release.tracksCount,
      'datePublished': release.year
    };
  }

  // Fallbacks
  metaTitle = metaTitle ? `${metaTitle} | Wacha Multimedia` : DEFAULT_TITLE;
  metaDescription = metaDescription || DEFAULT_DESCRIPTION;
  metaImage = metaImage || DEFAULT_IMAGE;

  // Ensure absolute image URL for Open Graph cards
  const absoluteImageUrl = metaImage.startsWith('http')
    ? metaImage
    : `${origin}${metaImage.startsWith('/') ? '' : '/'}${metaImage}`;

  // Default Organization & WebSite JSON-LD
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_NAME,
    'url': origin,
    'description': DEFAULT_DESCRIPTION,
    'publisher': {
      '@type': 'Organization',
      'name': 'Wacha Multimedia',
      'logo': `${origin}/cetes_premier_app.jpg`
    }
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={metaTitle} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wachamultimedia" />
      <meta name="twitter:creator" content="@mrdecrepito" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* Schema.org Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
};
