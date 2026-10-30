import type { KunanLeadInsert } from '@/types/lead'
import { getHubSpotClientIds } from '@/lib/hubspot-config'
import { submitToHubSpotForm } from '@/lib/hubspot-lead'

/** Siempre hay destino HubSpot (env o IDs del formulario embebido). */
export function isHubSpotClientConfigured(): boolean {
  const { portalId, formGuid } = getHubSpotClientIds()
  return Boolean(portalId && formGuid)
}

/**
 * Envía el lead a HubSpot Forms API.
 * 1) Intenta directo desde el navegador (IDs públicos del form).
 * 2) Si falla, intenta /api/hubspot-lead (env server-side en Vercel).
 */
export async function forwardLeadToCrm(payload: KunanLeadInsert): Promise<boolean> {
  const { portalId, formGuid } = getHubSpotClientIds()

  try {
    const clientResult = await submitToHubSpotForm(portalId, formGuid, payload)
    if (clientResult.ok) return true
    console.warn('[crm] HubSpot client submit failed', clientResult.status, clientResult.detail)
  } catch (error) {
    console.warn('[crm] HubSpot client submit error', error)
  }

  try {
    const response = await fetch('/api/hubspot-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    })

    if (response.status === 404 || response.status === 503) {
      console.info('[crm] HubSpot API not available (not configured or no serverless route)')
      return false
    }

    if (!response.ok) {
      const detail = await response.text()
      console.warn('[crm] HubSpot API forward failed', response.status, detail)
      return false
    }

    return true
  } catch (error) {
    console.warn('[crm] HubSpot forward error', error)
    return false
  }
}
