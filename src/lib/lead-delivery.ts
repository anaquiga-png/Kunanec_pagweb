import type { KunanLeadInsert } from '@/types/lead'
import { forwardLeadToCrm, isHubSpotClientConfigured } from '@/lib/crm'
import { supabase, supabaseConfigured } from '@/lib/supabaseClient'

/** Evita que un canal caído deje el formulario en “Enviando…” para siempre. */
const CHANNEL_TIMEOUT_MS = 8_000

export type LeadDeliveryResult = {
  ok: boolean
  supabase: boolean | 'skipped'
  hubspot: boolean | 'skipped'
  n8n: boolean | 'skipped'
  email: boolean | 'skipped'
  errors: string[]
}

function n8nWebhookUrl(): string | null {
  // Solo si está explícito en env. NO hardcodear URLs muertas (n8n cloud “No instance here”).
  const fromEnv = import.meta.env.VITE_N8N_WEBHOOK_URL?.trim()
  return fromEnv || null
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
  try {
    const ok = await withTimeout(forwardLeadToCrm(row), CHANNEL_TIMEOUT_MS, 'hubspot')
    return ok
  } catch (error) {
    console.warn('[leads] HubSpot forward error', error)
    return false
  }
}

/** Aviso por correo a ventas@ (no bloquea el éxito del formulario si falla). */
async function notifySalesEmail(row: KunanLeadInsert): Promise<boolean> {
  try {
    const response = await withTimeout(
      fetch('/api/notify-lead-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
        signal: AbortSignal.timeout(CHANNEL_TIMEOUT_MS),
      }),
      CHANNEL_TIMEOUT_MS + 500,
      'email',
    )
    if (!response.ok) {
      console.warn('[leads] email notify failed', response.status, await response.text())
      return false
    }
    return true
  } catch (error) {
    console.warn('[leads] email notify error', error)
    return false
  }
}

/**
 * Envía el lead en paralelo a los destinos configurados.
 * Éxito si al menos un destino CRM/DB responde bien.
 * El correo a ventas es best-effort (no hace fallar el envío).
 */
export async function deliverLead(row: KunanLeadInsert): Promise<LeadDeliveryResult> {
  const runSupabase = supabaseConfigured
  const runN8n = isN8nConfigured()
  const errors: string[] = []

  const [supabaseOk, hubspotResult, n8nOk, emailOk] = await Promise.all([
    runSupabase ? saveToSupabase(row) : Promise.resolve(false as const),
    forwardHubSpotSafe(row),
    runN8n ? forwardToN8n(row) : Promise.resolve(false as const),
    notifySalesEmail(row),
  ])

  const hubspotOk = hubspotResult === true
  if (runSupabase && !supabaseOk) errors.push('supabase')
  if (!hubspotOk) errors.push('hubspot')
  if (runN8n && !n8nOk) errors.push('n8n')
  if (!emailOk) errors.push('email')

  const successes = [runSupabase && supabaseOk, hubspotOk, runN8n && n8nOk].filter(Boolean).length

  return {
    supabase: runSupabase ? Boolean(supabaseOk) : 'skipped',
    hubspot: hubspotOk,
    n8n: runN8n ? Boolean(n8nOk) : 'skipped',
    email: emailOk,
    ok: successes > 0,
    errors,
  }
}
