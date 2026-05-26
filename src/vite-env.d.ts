/// <reference types="vite/client" />

declare module 'vite/client' {
  interface ImportMetaEnv {
    /** Supabase project URL — add in .env as VITE_SUPABASE_URL */
    readonly VITE_SUPABASE_URL?: string
    /** Supabase anon (public) key — add in .env as VITE_SUPABASE_ANON_KEY */
    readonly VITE_SUPABASE_ANON_KEY?: string
    /** Google Tag Manager container ID (GTM-XXXXXXX) */
    readonly VITE_GTM_CONTAINER_ID?: string
    /** GA4 Measurement ID (G-XXXXXXXX) — add in .env as VITE_GA4_MEASUREMENT_ID */
    readonly VITE_GA4_MEASUREMENT_ID?: string
    /** Meta Pixel ID — add in .env as VITE_META_PIXEL_ID */
    readonly VITE_META_PIXEL_ID?: string
    /** Canonical URL for this deployment (e.g. https://ecuador.kunansalud.com) */
    readonly VITE_SITE_CANONICAL_URL?: string
    /** Public site origin for JSON-LD @id / og:url */
    readonly VITE_PUBLIC_SITE_URL?: string
    /** Absolute URL for og:image (LinkedIn) */
    readonly VITE_OG_IMAGE_URL?: string
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
  }
}

export {}
