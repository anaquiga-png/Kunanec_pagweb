/**
 * Loads third-party analytics scripts when env IDs are set (see `.env.local` / README).
 *
 * - GTM: `VITE_GTM_CONTAINER_ID` (`GTM-…` en tagmanager.google.com). Se inyecta en index.html al build.
 * - GA4: `VITE_GA4_MEASUREMENT_ID` (`G-…`). Si hay GTM, configura GA4 como tag dentro de GTM; si no hay GTM, se inyecta gtag en index.html.
 * - Meta: `VITE_META_PIXEL_ID` (ID numérico en Events Manager). Si está vacío, no se carga fbq.
 *
 * Eventos en la app (también en `src/lib/tracking.ts`): GA4 `form_view`, `form_start`, `lead_submit`, `cta_click`;
 * Meta estándar `Lead` y `Contact` según acciones del usuario.
 */
import { initDataLayer } from '@/lib/tracking'

export function initAnalytics() {
  if (typeof window === 'undefined') return
  const w = window as Window & { __kunanAnalyticsInit?: boolean }
  if (w.__kunanAnalyticsInit) return
  w.__kunanAnalyticsInit = true

  const gtmId = import.meta.env.VITE_GTM_CONTAINER_ID?.trim()
  const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim()

  initDataLayer()

  // GTM o GA4 ya pueden estar en index.html (build); aquí solo completamos si faltara gtag
  if (gtmId || gaId) {
    if (typeof window.gtag !== 'function') {
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args)
      }
    }
  }

  // Sin GTM: cargar GA4 por JS solo si no se inyectó en index.html (p. ej. dev sin rebuild)
  if (gaId && !gtmId) {
    const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    if (!document.querySelector(`script[src="${gtagSrc}"]`)) {
      const s = document.createElement('script')
      s.async = true
      s.src = gtagSrc
      document.head.appendChild(s)
      window.gtag!('js', new Date())
      window.gtag!('config', gaId)
    }
  }

  const pixelId = import.meta.env.VITE_META_PIXEL_ID
  if (pixelId && !window.fbq) {
    const inline = document.createElement('script')
    const safeId = JSON.stringify(pixelId)
    inline.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${safeId});fbq('track','PageView');`
    document.head.appendChild(inline)
  }
}
