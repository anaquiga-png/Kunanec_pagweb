import type { KunanLeadInsert } from '@/types/lead'
import { forwardLeadToCrm, isHubSpotClientConfigured } from '@/lib/crm'
import { supabase, supabaseConfigured } from '@/lib/supabaseClient'

/** Webhook n8n (correos / automatizaciones). No depende de Supabase. */
const DEFAULT_N8N_WEBHOOK_URL = 'https://anaquiga.app.n8n.cloud/webhook/registro-landing'

/** Evita que un canal caído (p. ej. Supabase pausado) deje el formulario en “Enviando…” para siempre. */
const CHANNEL_TIMEOUT_MS = 8_000

export type LeadDeliveryResult = {
  ok: boolean
  supabase: boolean | 'skipped'
  hubspot: boolean | 'skipped'
  n8n: boolean | 'skipped'
}

function n8nWebhookUrl(): string | null {
  const fromEnv = import.meta.env.VITE_N8N_WEBHOOK_URL?.trim()
  if (fromEnv) return fromEnv
  return DEFAULT_N8N_WEBHOOK_URL
}

export function isN8nConfigured(): boolean {
  return Boolean(n8nWebhookUrl())
}

export function isLeadDestinationConfigured(): boolean {
  return supabaseConfigured || isHubSpotClientConfigured() || isN8nConfigured()
}

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`[leads] ${label} timed out after ${ms}ms`)), ms)
      }),
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

async function saveToSupabase(row: KunanLeadInsert): Promise<boolean> {
  try {
    const insertPromise = Promise.resolve(supabase.from('kunan_leads').insert(row))
    const { error } = await withTimeout(insertPromise, CHANNEL_TIMEOUT_MS, 'supabase')
    if (error) {
      console.warn('[leads] Supabase insert failed', error.message)
      return false
    }
    return true
  } catch (error) {
    console.warn('[leads] Supabase insert error', error)
    return false
  }
}

async function forwardToN8n(row: KunanLeadInsert): Promise<boolean> {
  const url = n8nWebhookUrl()
  if (!url) return false

  try {
    const response = await withTimeout(
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
        signal: AbortSignal.timeout(CHANNEL_TIMEOUT_MS),
      }),
      CHANNEL_TIMEOUT_MS + 500,
      'n8n',
    )
    if (!response.ok) {
      console.warn('[leads] n8n webhook failed', response.status)
      return false
    }
    return true
  } catch (error) {
    console.warn('[leads] n8n webhook error', error)
    return false
  }
}

async function forwardHubSpotSafe(row: KunanLeadInsert): Promise<boolean | 'skipped'> {
  // En producción sin VITE_HUBSPOT_*: intentamos /api/hubspot-lead, pero con timeout.
  // Si HubSpot no está configurado en Vercel, la API responde 503 rápido.
  try {
    const ok = await withTimeout(forwardLeadToCrm(row), CHANNEL_TIMEOUT_MS, 'hubspot')
    return ok
  } catch (error) {
    console.warn('[leads] HubSpot forward error', error)
    return false
  }
}

/**
 * Envía el lead en paralelo a Supabase, HubSpot y n8n.
 * Éxito si al menos un destino responde bien. Cada canal tiene timeout (Supabase pausado no bloquea).
 */
export async function deliverLead(row: KunanLeadInsert): Promise<LeadDeliveryResult> {
  const runSupabase = supabaseConfigured
  const runN8n = isN8nConfigured()

  const [supabaseOk, hubspotResult, n8nOk] = await Promise.all([
    runSupabase ? saveToSupabase(row) : Promise.resolve(false as const),
    forwardHubSpotSafe(row),
    runN8n ? forwardToN8n(row) : Promise.resolve(false as const),
  ])

  const hubspotOk = hubspotResult === true
  const successes = [runSupabase && supabaseOk, hubspotOk, runN8n && n8nOk].filter(Boolean).length

  return {
    supabase: runSupabase ? Boolean(supabaseOk) : 'skipped',
    hubspot: hubspotResult === 'skipped' ? 'skipped' : hubspotOk,
    n8n: runN8n ? Boolean(n8nOk) : 'skipped',
    ok: successes > 0,
  }
}
