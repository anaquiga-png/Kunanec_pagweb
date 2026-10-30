/**
 * Analytics & ads tracking for GA4 and Meta Pixel.
 *
 * Embudo formulario (para Exploraciones → Embudo):
 *   form_view → form_start → qualify_lead
 *
 * `qualify_lead` es el key event. `lead_submit` se mantiene por compatibilidad.
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

  // gtag descarta `undefined`; normalizamos booleanos a 0/1 para reportes limpios
  const cleaned: Record<string, string | number> = {}
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue
      if (typeof value === 'boolean') cleaned[key] = value ? 1 : 0
      else cleaned[key] = value
    }
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, cleaned)
  }
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: name, ...cleaned })
}

export function trackCtaClick(payload: CtaClickPayload) {
  gaEvent('cta_click', {
    cta_label: payload.cta_label,
    section: payload.section,
  })
}

export function trackFormView() {
  gaEvent('form_view', {
    form_id: 'solicitar_demo',
    form_name: 'Solicitar demo',
  })
}

export function trackFormStart() {
  gaEvent('form_start', {
    form_id: 'solicitar_demo',
    form_name: 'Solicitar demo',
  })
}

/**
 * Tras envío exitoso.
 * Incluye value/currency (parámetros recomendados de qualify_lead en GA4)
 * para que reportes de leads / embudos lo reconozcan mejor.
 */
export function trackLeadSubmit(params?: Record<string, string | number | boolean>) {
  const shared = {
    form_id: 'solicitar_demo',
    form_name: 'Solicitar demo',
    currency: 'USD',
    value: 1,
    ...params,
  }
  gaEvent('qualify_lead', shared)
  gaEvent('lead_submit', shared)
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
