/**
 * Aliados estratégicos — edita este array para cambiar logos.
 * Coloca cada imagen en `public/logos/aliados/` (PNG o SVG recomendado).
 */
export type StrategicPartner = {
  id: string
  /** Nombre para accesibilidad y fallback si falta la imagen */
  name: string
  /** Ruta desde /public, ej. `/logos/aliados/mi-banco.png` */
  logoSrc: string
}

export const strategicPartners: StrategicPartner[] = [
  {
    id: 'coolbox',
    name: 'Coolbox',
    logoSrc: '/logos/aliados/aliado-1.png',
  },
  {
    id: 'euromotors',
    name: 'Grupo Euromotors',
    logoSrc: '/logos/aliados/aliado-2.png',
  },
  {
    id: 'tinka',
    name: 'TiNKA',
    logoSrc: '/logos/aliados/aliado-3.jpeg',
  },
  {
    id: 'ntt-data',
    name: 'NTT DATA',
    logoSrc: '/logos/aliados/aliado-4.png',
  },
]
