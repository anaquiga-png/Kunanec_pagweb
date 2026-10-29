/**
 * Testimonios en video — edita este array para cambiar piezas.
 * Coloca cada MP4 en `public/videos/testimonios/`.
 */
export type Testimonial = {
  id: string
  name: string
  role: string
  /** Ruta desde /public, ej. `/videos/testimonios/testimonio-1.mp4` */
  videoSrc: string
  /** Imagen de portada opcional */
  posterSrc?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonio-1',
    name: 'Overall',
    role: 'Empresa aliada',
    videoSrc: '/videos/testimonios/testimonio-1.mp4',
  },
  {
    id: 'testimonio-2',
    name: 'NTT Data',
    role: 'Empresa aliada',
    videoSrc: '/videos/testimonios/testimonio-2.mp4',
  },
]
