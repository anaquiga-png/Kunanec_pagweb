import { z } from 'zod'

const freeEmailDomains = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'yahoo.com',
  'yahoo.es',
  'icloud.com',
  'me.com',
  'msn.com',
  'proton.me',
  'protonmail.com',
])

/** Formulario corto: nombre, email, empresa, teléfono opcional + consentimiento. */
export const leadFormSchema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z
    .string()
    .email('Email inválido')
    .refine((val) => {
      const domain = val.split('@')[1]?.toLowerCase()
      if (!domain) return false
      return !freeEmailDomains.has(domain)
    }, 'Usa un email corporativo (no dominios personales gratuitos)'),
  company: z.string().min(2, 'Ingresa el nombre de la empresa'),
  phone: z
    .string()
    .trim()
    .refine((v) => v === '' || v.length >= 8, 'Ingresa un teléfono válido o déjalo vacío'),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Debes aceptar ser contactado para continuar',
  }),
})

export type LeadFormValues = z.infer<typeof leadFormSchema>

/** Payload hacia Supabase / HubSpot / n8n (campos legacy vacíos si el form es corto). */
export type KunanLeadInsert = {
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
