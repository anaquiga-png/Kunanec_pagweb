import { Helmet } from 'react-helmet-async'

/**
 * Metadatos y JSON-LD. Variables en `.env.local` (ver README → “Opcional: GA4, Meta Pixel y URLs”):
 * - `VITE_SITE_CANONICAL_URL` — canonical y URL del LocalBusiness en schema.org
 * - `VITE_PUBLIC_SITE_URL` — origen sin “/” final; @id de Organization y fallback de logo/og:url
 * - `VITE_OG_IMAGE_URL` — imagen absoluta para og:image / Twitter (opcional)
 */
const defaultTitle = 'Kunan Salud Ecuador | Bienestar, lealtad y beneficios corporativos'
const defaultDescription =
  'Kunan Salud Ecuador ayuda a empresas, bancos y aliados estratégicos a convertir el bienestar en una ventaja competitiva, generando lealtad, confianza y diferenciación.'

const keywords =
  'Kunan Salud Ecuador, bienestar corporativo Ecuador, beneficios para colaboradores Ecuador, loyalty Ecuador, fidelización de clientes Ecuador, salud digital Ecuador, bienestar digital Ecuador, beneficios empresariales Ecuador, telemedicina Ecuador, programas de lealtad Ecuador'

function buildJsonLd() {
  const site = import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://example.com'
  const canonical = import.meta.env.VITE_SITE_CANONICAL_URL || site
  const logo = `${site}/favicon.svg`

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'Kunan Salud Ecuador',
        url: site,
        logo,
        sameAs: ['https://kunansalud.com/'],
        description: defaultDescription,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${site}/#localbusiness`,
        name: 'Kunan Salud Ecuador',
        url: canonical,
        image: import.meta.env.VITE_OG_IMAGE_URL || logo,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Quito',
          addressRegion: 'Pichincha',
          addressCountry: 'EC',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Ecuador',
        },
        parentOrganization: { '@id': `${site}/#organization` },
      },
    ],
  }
  return JSON.stringify(graph)
}

export function Seo() {
  const site = import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, '') || ''
  const canonical = import.meta.env.VITE_SITE_CANONICAL_URL || site || 'https://example.com'
  const ogImage = import.meta.env.VITE_OG_IMAGE_URL || (site ? `${site}/favicon.svg` : '')

  return (
    <Helmet defaultTitle={defaultTitle} titleTemplate="%s | Kunan Salud Ecuador" htmlAttributes={{ lang: 'es-EC' }}>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_EC" />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

      <script type="application/ld+json">{buildJsonLd()}</script>
    </Helmet>
  )
}
