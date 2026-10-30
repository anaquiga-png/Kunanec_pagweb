/**
 * IDs públicos del formulario HubSpot (visibles en el embed).
 * Preferir env en Vercel; estos valores son fallback para que los leads no se pierdan.
 *
 * Embed:
 * portal-id="51619844"
 * form-id="58df5fa0-2b32-4e55-8834-71b84d7171a4"
 */
export const HUBSPOT_DEFAULT_PORTAL_ID = '51619844'
export const HUBSPOT_DEFAULT_FORM_GUID = '58df5fa0-2b32-4e55-8834-71b84d7171a4'

export function getHubSpotClientIds(): { portalId: string; formGuid: string } {
  return {
    portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID?.trim() || HUBSPOT_DEFAULT_PORTAL_ID,
    formGuid: import.meta.env.VITE_HUBSPOT_FORM_GUID?.trim() || HUBSPOT_DEFAULT_FORM_GUID,
  }
}
