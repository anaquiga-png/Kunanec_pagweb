import { z } from 'zod'

export const ORGANIZATION_TYPES = [
  'Empresa',
  'Banco/Fintech',
  'Programa de loyalty',
  'Broker/Aliado',
  'Otro',
] as const

const orgTypes = ORGANIZATION_TYPES

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

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  company: z.string().min(2, 'Ingresa el nombre de la empresa'),
  role: z.string().min(2, 'Ingresa tu cargo'),
  email: z
    .string()
    .email('Email inválido')
    .refine((val) => {
      const domain = val.split('@')[1]?.toLowerCase()
      if (!domain) return false
      return !freeEmailDomains.has(domain)
    }, 'Usa un email corporativo (no dominios personales gratuitos)'),
  phone: z.string().min(8, 'Ingresa un teléfono o WhatsApp válido'),
  organization_type: z
    .string()
    .min(1, 'Selecciona un tipo de organización')
    .refine((v): v is (typeof orgTypes)[number] => (orgTypes as readonly string[]).includes(v), {
      message: 'Selecciona un tipo de organización',
    }),
  user_volume: z.string().min(1, 'Indica un volumen aproximado'),
  message: z.string().min(10, 'Cuéntanos brevemente tu necesidad (mín. 10 caracteres)'),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Debes aceptar ser contactado para continuar',
  }),
})

export type LeadFormValues = z.infer<typeof leadFormSchema>

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
