import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { HubSpotLeadPayload } from '../src/lib/hubspot-lead'
import { submitToHubSpotForm } from '../src/lib/hubspot-lead'

function isValidPayload(body: unknown): body is HubSpotLeadPayload {
  if (!body || typeof body !== 'object') return false
  const p = body as Record<string, unknown>
  return (
    typeof p.email === 'string' &&
    p.email.includes('@') &&
    typeof p.name === 'string' &&
    typeof p.company === 'string' &&
    typeof p.phone === 'string'
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_FORM_GUID

  if (!portalId || !formGuid) {
    return res.status(503).json({ error: 'HubSpot is not configured on the server' })
  }

  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'Invalid lead payload' })
  }

  const result = await submitToHubSpotForm(portalId, formGuid, req.body)

  if (!result.ok) {
    console.error('[hubspot-lead]', result.status, result.detail)
    return res.status(502).json({ error: 'HubSpot submission failed', detail: result.detail })
  }

  return res.status(200).json({ ok: true })
}
