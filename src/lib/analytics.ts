/**
 * Loads third-party analytics scripts when env IDs are set (see `.env.local` / README).
 *
 * - GA4: `VITE_GA4_MEASUREMENT_ID` (Measurement ID `G-…` en Admin → Data streams). Si está vacío, no se carga gtag.
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

  const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim()
  if (gaId) {
    initDataLayer()
    if (typeof window.gtag !== 'function') {
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args)
      }
    }
    const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    if (!document.querySelector(`script[src="${gtagSrc}"]`)) {
      const s = document.createElement('script')
      s.async = true
      s.src = gtagSrc
      document.head.appendChild(s)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId)
  }

  const pixelId = import.meta.env.VITE_META_PIXEL_ID
  if (pixelId && !window.fbq) {
    const inline = document.createElement('script')
    const safeId = JSON.stringify(pixelId)
    inline.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${safeId});fbq('track','PageView');`
    document.head.appendChild(inline)
  }
}
