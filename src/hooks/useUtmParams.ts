import { useMemo } from 'react'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

export type UtmParams = Record<(typeof UTM_KEYS)[number], string>

const STORAGE_KEY = 'kunan_ec_utm'

function readFromUrl(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
    }
  }
  const params = new URLSearchParams(window.location.search)
  const fromUrl: UtmParams = {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? '',
  }
  const hasAny = UTM_KEYS.some((k) => fromUrl[k] !== '')
  if (hasAny) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
    } catch {
      /* ignore */
    }
    return fromUrl
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UtmParams>
      return {
        utm_source: parsed.utm_source ?? '',
        utm_medium: parsed.utm_medium ?? '',
        utm_campaign: parsed.utm_campaign ?? '',
        utm_content: parsed.utm_content ?? '',
        utm_term: parsed.utm_term ?? '',
      }
    }
  } catch {
    /* ignore */
  }
  return {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  }
}

/** Captures UTM parameters from the URL and persists them for the session. */
export function useUtmParams(): UtmParams {
  return useMemo(() => readFromUrl(), [])
}
