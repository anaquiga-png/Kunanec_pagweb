/**
 * POST /api/notify-lead-email
 * Avisa a ventas@ cuando llega un lead del formulario web.
 *
 * Preferencia:
 * 1) Resend si existe RESEND_API_KEY (+ opcional LEAD_NOTIFY_FROM)
 * 2) FormSubmit (sin API key) hacia LEAD_NOTIFY_EMAIL o ventas@kunansaludec.com
 */

type LeadBody = {
  name?: string
  email?: string
  company?: string
  phone?: string
  message?: string
  landing_page_url?: string
  source?: string
  client_timestamp?: string
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}

const DEFAULT_TO = 'ventas@kunansaludec.com'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildText(payload: LeadBody): string {
  const lines = [
    'Nuevo lead desde la web de Kunan Salud Ecuador',
    '',
    `Nombre: ${payload.name || '—'}`,
    `Email: ${payload.email || '—'}`,
    `Empresa: ${payload.company || '—'}`,
    `Teléfono: ${payload.phone || '—'}`,
    `Mensaje: ${payload.message || '—'}`,
    '',
    `Landing: ${payload.landing_page_url || '—'}`,
    `Origen: ${payload.source || 'website'}`,
    `UTM: ${[payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(' / ') || '—'}`,
    `Fecha: ${payload.client_timestamp || new Date().toISOString()}`,
  ]
  return lines.join('\n')
}

function buildHtml(payload: LeadBody): string {
  const rows: [string, string][] = [
    ['Nombre', payload.name || '—'],
    ['Email', payload.email || '—'],
    ['Empresa', payload.company || '—'],
    ['Teléfono', payload.phone || '—'],
    ['Mensaje', payload.message || '—'],
    ['Landing', payload.landing_page_url || '—'],
    ['Origen', payload.source || 'website'],
    [
      'UTM',
      [payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(' / ') || '—',
    ],
    ['Fecha', payload.client_timestamp || new Date().toISOString()],
  ]
  const tr = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;font-weight:600">${escapeHtml(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111">${escapeHtml(v)}</td></tr>`,
    )
    .join('')
  return `<div style="font-family:system-ui,sans-serif;max-width:560px"><h2 style="color:#1c2433">Nuevo lead — web Kunan EC</h2><table style="width:100%;border-collapse:collapse">${tr}</table></div>`
}

async function sendWithResend(to: string, payload: LeadBody): Promise<{ ok: boolean; detail?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return { ok: false, detail: 'no_resend_key' }

  const from = process.env.LEAD_NOTIFY_FROM?.trim() || 'Kunan Web <onboarding@resend.dev>'
  const subject = `Nuevo lead web: ${payload.company || payload.name || 'Sin empresa'}`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email || undefined,
      subject,
      text: buildText(payload),
      html: buildHtml(payload),
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    return { ok: false, detail }
  }
  return { ok: true }
}

async function sendWithFormSubmit(to: string, payload: LeadBody): Promise<{ ok: boolean; detail?: string }> {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `Nuevo lead web: ${payload.company || payload.name || 'Sin empresa'}`,
      _template: 'table',
      _replyto: payload.email || to,
      name: payload.name || '',
      email: payload.email || '',
      company: payload.company || '',
      phone: payload.phone || '',
      message: payload.message || 'Solicitud de demo desde la web',
      landing: payload.landing_page_url || '',
      source: payload.source || 'website',
      utm: [payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(' / '),
      sent_at: payload.client_timestamp || new Date().toISOString(),
    }),
  })

  const detail = await res.text()
  if (!res.ok) return { ok: false, detail }
  return { ok: true, detail }
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

    const payload = req.body ?? {}
    if (typeof payload.email !== 'string' || !payload.email.includes('@')) {
      return res.status(400).json({ error: 'Invalid lead payload' })
    }

    const to = process.env.LEAD_NOTIFY_EMAIL?.trim() || DEFAULT_TO

    if (process.env.RESEND_API_KEY?.trim()) {
      const result = await sendWithResend(to, payload)
      if (!result.ok) {
        console.error('[notify-lead-email] Resend failed', result.detail)
        return res.status(502).json({ error: 'Email send failed', detail: result.detail })
      }
      return res.status(200).json({ ok: true, provider: 'resend' })
    }

    const result = await sendWithFormSubmit(to, payload)
    if (!result.ok) {
      console.error('[notify-lead-email] FormSubmit failed', result.detail)
      return res.status(502).json({ error: 'Email send failed', detail: result.detail })
    }
    return res.status(200).json({ ok: true, provider: 'formsubmit' })
  } catch (error) {
    console.error('[notify-lead-email] unhandled', error)
    return res.status(500).json({
      error: 'Unexpected server error',
      detail: error instanceof Error ? error.message : String(error),
    })
  }
}
