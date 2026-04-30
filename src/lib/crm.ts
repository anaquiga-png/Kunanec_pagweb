import type { KunanLeadInsert } from '@/types/lead'

/**
 * Optional forward to HubSpot, Zapier, or another CRM.
 *
 * LATER: Set e.g. VITE_CRM_WEBHOOK_URL and POST JSON here.
 * This must NOT block the user flow — Supabase remains the source of truth.
 */
export async function forwardLeadToCrm(payload: KunanLeadInsert): Promise<void> {
  void payload
  // const url = import.meta.env.VITE_CRM_WEBHOOK_URL
  // if (!url) return
  // await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
}
