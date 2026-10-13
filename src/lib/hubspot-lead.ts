/**
 * Mapeo lead landing → envío HubSpot Forms API v3.
 * @see https://developers.hubspot.com/docs/api/marketing/forms
 */

export type HubSpotLeadPayload = {
  name: string
  company: string
  role: string
  email: string
  phone: string
  organization_type: string
  user_volume: string
  message: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  landing_page_url: string
  consent: boolean
  source: string
  client_timestamp: string
}

export type HubSpotFormField = {
  objectTypeId: '0-1'
  name: string
  value: string
}

export type HubSpotFormSubmission = {
  fields: HubSpotFormField[]
  context: {
    pageUri: string
    pageName: string
  }
  legalConsentOptions?: {
    consent: {
      consentToProcess: boolean
      text: string
      communications: []
    }
  }
}

export function splitFullName(full: string): { firstname: string; lastname: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstname: '', lastname: '' }
  if (parts.length === 1) return { firstname: parts[0], lastname: '' }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') }
}

function formatMessageBlock(payload: HubSpotLeadPayload): string {
  const utmParts = [payload.utm_source, payload.utm_medium, payload.utm_campaign]
    .filter(Boolean)
    .join(' / ')

  const meta = [
    `Tipo de organización: ${payload.organization_type}`,
    `Volumen aproximado: ${payload.user_volume}`,
    utmParts ? `UTM: ${utmParts}` : null,
    payload.landing_page_url ? `Landing: ${payload.landing_page_url}` : null,
    `Origen: ${payload.source}`,
    `Enviado: ${payload.client_timestamp}`,
  ]
    .filter(Boolean)
    .join('\n')

  return `${payload.message.trim()}\n\n---\n${meta}`
}

export function buildHubSpotFormSubmission(payload: HubSpotLeadPayload): HubSpotFormSubmission {
  const { firstname, lastname } = splitFullName(payload.name)

  const fields: HubSpotFormField[] = [
    { objectTypeId: '0-1', name: 'firstname', value: firstname },
    { objectTypeId: '0-1', name: 'lastname', value: lastname },
    { objectTypeId: '0-1', name: 'email', value: payload.email },
    { objectTypeId: '0-1', name: 'phone', value: payload.phone },
    { objectTypeId: '0-1', name: 'company', value: payload.company },
    { objectTypeId: '0-1', name: 'jobtitle', value: payload.role },
    { objectTypeId: '0-1', name: 'message', value: formatMessageBlock(payload) },
  ]

  const submission: HubSpotFormSubmission = {
    fields,
    context: {
      pageUri: payload.landing_page_url || 'https://ecuador.kunansalud.com',
      pageName: 'Kunan Salud Ecuador — Solicitar demo',
    },
  }

  if (payload.consent) {
    submission.legalConsentOptions = {
      consent: {
        consentToProcess: true,
        text: 'Acepto ser contactado por Kunan Salud Ecuador.',
        communications: [],
      },
    }
  }

  return submission
}

export async function submitToHubSpotForm(
  portalId: string,
  formGuid: string,
  payload: HubSpotLeadPayload,
): Promise<{ ok: true } | { ok: false; status: number; detail: string }> {
  const body = buildHubSpotFormSubmission(payload)
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const detail = await response.text()
    return { ok: false, status: response.status, detail }
  }

  return { ok: true }
}
