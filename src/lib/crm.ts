import type { KunanLeadInsert } from '@/types/lead'
import { submitToHubSpotForm } from '@/lib/hubspot-lead'

export function isHubSpotClientConfigured(): boolean {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID
  const formGuid = import.meta.env.VITE_HUBSPOT_FORM_GUID
  return Boolean(portalId && formGuid)
}

/** Hay al menos un destino explícito en el cliente (Supabase o HubSpot VITE_*). */
export function isHubSpotEnvConfiguredOnClient(): boolean {
  return isHubSpotClientConfigured()
}

/**
 * Envía el lead a HubSpot (Forms API).
 * Producción: POST /api/hubspot-lead (HUBSPOT_PORTAL_ID + HUBSPOT_FORM_GUID en Vercel).
 * Local: VITE_HUBSPOT_* o `vercel dev`.
 */
export async function forwardLeadToCrm(payload: KunanLeadInsert): Promise<boolean> {
  try {
    if (isHubSpotClientConfigured()) {
      const result = await submitToHubSpotForm(
        import.meta.env.VITE_HUBSPOT_PORTAL_ID!,
        import.meta.env.VITE_HUBSPOT_FORM_GUID!,
        payload,
      )
      if (!result.ok) {
        console.warn('[crm] HubSpot client submit failed', result.status, result.detail)
      }
      return result.ok
    }

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
