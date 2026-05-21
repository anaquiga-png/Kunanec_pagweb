type BrandLogoVariant = 'color' | 'negative'

type BrandLogoProps = {
  variant?: BrandLogoVariant
  className?: string
  alt?: string
}

const LOGO_SRC_BY_VARIANT: Record<BrandLogoVariant, string> = {
  color: '/logo_kunan-1.png',
  negative: '/logo_kunan-negativo.png',
}

/**
 * Renders official Kunan logo assets without altering proportions/colors.
 * - Use `color` on light backgrounds.
 * - Use `negative` on dark/purple backgrounds.
 */
export function BrandLogo({ variant = 'color', className = 'h-10 w-auto', alt = 'Kunan Salud' }: BrandLogoProps) {
  return <img src={LOGO_SRC_BY_VARIANT[variant]} alt={alt} className={className} />
}
