import { CtaButton } from '@/components/ui/CtaButton'

const links = [
  { href: '#valor', label: 'Valor' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#casos', label: 'Casos de uso' },
  { href: '#demo', label: 'Demo' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-kunan-primary to-kunan-accent text-sm font-bold text-white shadow-md">
            K
          </span>
          <span className="text-sm font-semibold leading-tight text-kunan-900 sm:text-base">
            Kunan Salud
            <span className="block text-xs font-medium text-kunan-accent sm:text-sm">Ecuador</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition hover:text-kunan-primary focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <CtaButton trackingLabel="Solicitar demo" trackingSection="header" className="!px-4 !py-2 text-xs sm:!px-5 sm:text-sm">
          Solicitar demo
        </CtaButton>
      </div>
    </header>
  )
}
