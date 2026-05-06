import type { ButtonHTMLAttributes } from 'react'
import { scrollToDemo } from '@/lib/scroll'
import { metaTrackContact, trackCtaClick } from '@/lib/tracking'

type Variant = 'primary' | 'secondary'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant?: Variant
  trackingLabel: string
  trackingSection: string
  /** If true, fires Meta Pixel “Contact” (e.g. “Hablar con un asesor”). */
  metaContact?: boolean
}

export function CtaButton({
  variant = 'primary',
  trackingLabel,
  trackingSection,
  metaContact = false,
  className = '',
  onClick,
  children,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60'
  const styles =
    variant === 'primary'
      ? 'bg-kunan-primary text-white shadow-lg shadow-kunan-primary/35 hover:bg-kunan-primary-dark focus-visible:outline-kunan-primary'
      : 'border border-slate-200 bg-white/90 text-kunan-900 backdrop-blur hover:border-kunan-primary/40 hover:text-kunan-primary focus-visible:outline-kunan-accent'

  return (
    <button
      type="button"
      className={`${base} ${styles} ${className}`}
      onClick={(e) => {
        trackCtaClick({ cta_label: trackingLabel, section: trackingSection })
        if (metaContact) metaTrackContact()
        onClick?.(e)
        if (!e.defaultPrevented) scrollToDemo()
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
