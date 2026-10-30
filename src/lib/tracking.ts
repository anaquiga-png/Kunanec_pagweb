/**
 * Analytics & ads tracking for GA4 and Meta Pixel.
 *
 * GA4 key conversion: `qualify_lead` (evento recomendado).
 * También se emite `lead_submit` por compatibilidad con reportes previos.
 */

export type CtaClickPayload = {
  cta_label: string
  section: string
}

export function gaEvent(
  name: 'form_view' | 'form_start' | 'lead_submit' | 'qualify_lead' | 'cta_click',
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === 'undefined') return
  const payload = { event: name, ...params }
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params ?? {})
  }
  // Siempre empujar a dataLayer (GTM / debug)
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

/** Tras envío exitoso: qualify_lead (key event) + lead_submit (legacy). */
export function trackLeadSubmit(params?: Record<string, string | number | boolean>) {
  gaEvent('qualify_lead', params)
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
