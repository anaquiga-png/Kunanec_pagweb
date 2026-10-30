/**
 * Vercel serverless: POST /api/hubspot-lead
 * Env (Production): HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID
 *
 * Self-contained (no imports from /src) to avoid FUNCTION_INVOCATION_FAILED on Vercel.
 */

type LeadBody = {
  name?: string
  email?: string
  company?: string
  phone?: string
  role?: string
  organization_type?: string
  user_volume?: string
  message?: string
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  landing_page_url?: string
  consent?: boolean
  source?: string
  client_timestamp?: string
}

function splitFullName(full: string): { firstname: string; lastname: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstname: '', lastname: '' }
  if (parts.length === 1) return { firstname: parts[0], lastname: '' }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') }
}

function buildSubmission(payload: LeadBody) {
  const { firstname, lastname } = splitFullName(String(payload.name ?? ''))
  const utmParts = [payload.utm_source, payload.utm_medium, payload.utm_campaign]
    .filter(Boolean)
    .join(' / ')

  const messageParts = [
    payload.message?.trim() || 'Solicitud de demo desde la web',
    '',
    '---',
    payload.organization_type ? `Tipo de organización: ${payload.organization_type}` : null,
    payload.user_volume ? `Volumen aproximado: ${payload.user_volume}` : null,
    utmParts ? `UTM: ${utmParts}` : null,
    payload.landing_page_url ? `Landing: ${payload.landing_page_url}` : null,
    `Origen: ${payload.source || 'website'}`,
    payload.client_timestamp ? `Enviado: ${payload.client_timestamp}` : null,
  ].filter((line) => line !== null)

  const fields = [
    { objectTypeId: '0-1', name: 'firstname', value: firstname },
    { objectTypeId: '0-1', name: 'lastname', value: lastname },
    { objectTypeId: '0-1', name: 'email', value: String(payload.email ?? '') },
    { objectTypeId: '0-1', name: 'phone', value: String(payload.phone ?? '') },
    { objectTypeId: '0-1', name: 'company', value: String(payload.company ?? '') },
    { objectTypeId: '0-1', name: 'jobtitle', value: String(payload.role ?? '') },
    { objectTypeId: '0-1', name: 'message', value: messageParts.join('\n') },
  ]

  const body: Record<string, unknown> = {
    fields,
    context: {
      pageUri: payload.landing_page_url || 'https://www.kunansaludec.com/',
      pageName: 'Kunan Salud Ecuador — Solicitar demo',
    },
  }

  if (payload.consent) {
    body.legalConsentOptions = {
      consent: {
        consentToProcess: true,
        text: 'Acepto ser contactado por Kunan Salud Ecuador.',
        communications: [],
      },
    }
  }

  return body
}

export default async function handler(
  req: { method?: string; body?: LeadBody },
  res: {
    setHeader: (k: string, v: string) => void
    status: (n: number) => { json: (b: unknown) => void; end: () => void }
  },
) {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      return res.status(204).end()
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const portalId = process.env.HUBSPOT_PORTAL_ID?.trim()
    const formGuid = process.env.HUBSPOT_FORM_GUID?.trim()

    if (!portalId || !formGuid) {
      return res.status(503).json({
        error: 'HubSpot is not configured on the server',
        hint: 'Set HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID in Vercel → Settings → Environment Variables, then redeploy.',
      })
    }

    const payload = req.body ?? {}
    if (typeof payload.email !== 'string' || !payload.email.includes('@') || typeof payload.name !== 'string') {
      return res.status(400).json({ error: 'Invalid lead payload' })
    }

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`
    const hsRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildSubmission(payload)),
    })

    if (!hsRes.ok) {
      const detail = await hsRes.text()
      console.error('[hubspot-lead] HubSpot rejected', hsRes.status, detail)
      return res.status(502).json({ error: 'HubSpot submission failed', detail })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('[hubspot-lead] unhandled', error)
    return res.status(500).json({
      error: 'Unexpected server error',
      detail: error instanceof Error ? error.message : String(error),
    })
  }
}
