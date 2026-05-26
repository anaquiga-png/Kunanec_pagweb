import { BrandLogo } from '@/components/BrandLogo'
import { KUNAN_EMPRESA_URL } from '@/lib/links'

type NavLink = { href: string; label: string; external?: boolean }

const navLinks: NavLink[] = [
  { href: '#', label: 'Inicio' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: KUNAN_EMPRESA_URL, label: 'Para empresas', external: true },
  { href: '#demo', label: 'Agendar demo' },
]

const legalLinks = [
  { href: '#', label: 'Términos y condiciones' },
  { href: '#', label: 'Política de privacidad' },
  { href: '#', label: 'Políticas de comunicación' },
] as const

const linkClass =
  'text-[0.9375rem] font-medium text-kunan-900 transition hover:text-kunan-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary'

const columnTitleClass =
  'text-[11px] font-semibold uppercase tracking-[0.18em] text-kunan-muted'

function ColumnAccent() {
  return (
    <span
      className="mt-3 block h-px w-8 rounded-full bg-gradient-to-r from-kunan-primary to-kunan-accent"
      aria-hidden
    />
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-kunan-900" aria-label="Pie de página">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Muy sutil: profundidad sin color de hero */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(111,45,226,0.04),transparent_50%)]" />

        <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
          {/* Columna 1 — marca & contacto */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <a
              href="#"
              className="inline-flex w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kunan-primary"
            >
              <BrandLogo variant="color" className="h-11 w-auto sm:h-12" alt="Kunan Salud Ecuador" />
            </a>
            <div className="space-y-6 text-[0.9375rem] leading-relaxed text-slate-600">
              <p className="font-medium text-kunan-900">Quito – Ecuador</p>
              <div className="flex flex-col gap-3.5">
                <a href="mailto:ventas@kunansaludec.com" className={`${linkClass} w-fit`}>
                  ventas@kunansaludec.com
                </a>
                <a
                  href="https://www.kunansaludec.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${linkClass} w-fit`}
                >
                  www.kunansaludec.com
                </a>
              </div>
              <p className="max-w-sm text-sm font-normal leading-relaxed text-slate-500">
                Tecnología, salud y bienestar para empresas.
              </p>
            </div>
          </div>

          <nav className="flex flex-col lg:col-span-3" aria-label="Navegación del sitio">
            <h2 className={columnTitleClass}>Navegación</h2>
            <ColumnAccent />
            <ul className="mt-8 flex flex-col gap-4">
              {navLinks.map(({ href, label, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={linkClass}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {label}
                    {external ? <span className="sr-only"> (abre en una pestaña nueva)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col lg:col-span-4" aria-label="Información legal">
            <h2 className={columnTitleClass}>Legales</h2>
            <ColumnAccent />
            <ul className="mt-8 flex flex-col gap-4">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative mt-16 border-t border-slate-200 pt-10">
          <p className="text-center text-[13px] font-medium text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Kunan Salud Ecuador. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
