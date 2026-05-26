import { ExternalLink } from 'lucide-react'
import { BrandLogo } from '@/components/BrandLogo'
import { CtaButton } from '@/components/ui/CtaButton'
import { KUNAN_PORTAL_URL } from '@/lib/links'
import { trackCtaClick } from '@/lib/tracking'

const links = [
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#casos', label: 'Casos de uso' },
  { href: '#aliados', label: 'Aliados' },
]

const btnBase =
  'inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 sm:py-2.5 sm:text-sm'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
        <a
          href="#"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
        >
          <BrandLogo variant="color" className="h-9 w-auto sm:h-10" />
        </a>

        <nav
          className="hidden items-center gap-5 text-sm font-medium text-kunan-muted lg:flex xl:gap-6"
          aria-label="Principal"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap transition hover:text-kunan-primary focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <a
            href={KUNAN_PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackCtaClick({ cta_label: 'Iniciar sesión', section: 'header' })
            }
            className={`${btnBase} border border-kunan-primary/25 bg-white text-kunan-primary shadow-sm hover:border-kunan-primary/50 hover:bg-[#F3E8FF] focus-visible:outline-kunan-primary`}
          >
            <span className="hidden min-[380px]:inline">Iniciar sesión</span>
            <span className="min-[380px]:hidden">Entrar</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
          </a>
          <CtaButton
            trackingLabel="Solicitar demo"
            trackingSection="header"
            className="!px-4 !py-2 !text-xs sm:!px-5 sm:!py-2.5 sm:!text-sm"
          >
            Solicitar demo
          </CtaButton>
        </div>
      </div>
    </header>
  )
}
