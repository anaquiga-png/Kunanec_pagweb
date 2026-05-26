import type { Plugin } from 'vite'

/**
 * Inyecta GTM o GA4 en index.html en tiempo de build (Vercel lee las VITE_* del proyecto).
 * Así Tag Assistant / GTM detectan el tag en el HTML servido, no solo tras hidratar React.
 */
export function injectAnalyticsTags(env: Record<string, string>): Plugin {
  const gtmId = env.VITE_GTM_CONTAINER_ID?.trim()
  const gaId = env.VITE_GA4_MEASUREMENT_ID?.trim()

  return {
    name: 'inject-analytics-tags',
    transformIndexHtml(html) {
      let head = ''
      let bodyStart = ''

      if (gtmId) {
        head += `
    <!-- Google Tag Manager -->
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
        var f = d.getElementsByTagName(s)[0]
        var j = d.createElement(s)
        var dl = l !== 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', ${JSON.stringify(gtmId)})
    </script>
    <!-- End Google Tag Manager -->`

        bodyStart += `
    <!-- Google Tag Manager (noscript) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></noscript>
    <!-- End Google Tag Manager (noscript) -->`
      } else if (gaId) {
        const safeGa = JSON.stringify(gaId)
        head += `
    <!-- Google tag (gtag.js) / GA4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}"></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', ${safeGa})
    </script>`
      }

      if (!head && !bodyStart) return html

      return html.replace('</head>', `${head}\n  </head>`).replace('<body>', `<body>${bodyStart}`)
    },
  }
}
