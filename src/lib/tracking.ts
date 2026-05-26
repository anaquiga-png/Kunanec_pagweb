/**
 * Analytics & ads tracking for GA4 and Meta Pixel.
 *
 * CONFIGURE:
 * - VITE_GA4_MEASUREMENT_ID in .env (see main.tsx script injection)
 * - VITE_META_PIXEL_ID in .env (see main.tsx fbq init)
 */

export type CtaClickPayload = {
  cta_label: string
  section: string
}

export function gaEvent(
  name: 'form_view' | 'form_start' | 'lead_submit' | 'cta_click',
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === 'undefined') return
  const payload = { event: name, ...params }
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params ?? {})
    return
  }
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
}

export function trackCtaClick(payload: CtaClickPayload) {
  gaEvent('cta_click', {
    cta_label: payload.cta_label,
    section: payload.section,
  })
}

export function trackFormView() {
  gaEvent('form_view')
}

export function trackFormStart() {
  gaEvent('form_start')
}

export function trackLeadSubmit(params?: Record<string, string | number | boolean>) {
  gaEvent('lead_submit', params)
}

/** Meta Pixel — standard event Lead (e.g. after successful form submit) */
export function metaTrackLead() {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', 'Lead')
}

/** Meta Pixel — standard event Contact (e.g. “Hablar con un asesor”) */
export function metaTrackContact() {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', 'Contact')
}

export function initDataLayer() {
  window.dataLayer = window.dataLayer ?? []
}
