import { motion } from 'framer-motion'

type Props = {
  src: string
  alt: string
  /** Ajuste de encuadre cuando la imagen es un mockup ancho */
  objectPosition?: string
  className?: string
  /** Ancho al 100% de la columna; el marco ceñido al alto intrínseco de la imagen (beneficios en grid) */
  fillColumn?: boolean
}

export function BenefitMockupImage({
  src,
  alt,
  objectPosition = 'center',
  className = '',
  fillColumn = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group/mock relative w-full max-w-full ${className}`}
    >
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-kunan-primary/10 via-transparent to-kunan-accent/10 opacity-0 blur-2xl transition duration-500 group-hover/mock:opacity-100" />
      <div
        className={`relative h-fit w-full max-w-full overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white/85 to-slate-100/50 p-2 shadow-[0_20px_50px_-20px_rgba(28,36,51,0.2)] ring-1 ring-slate-200/60 backdrop-blur-sm transition duration-300 group-hover/mock:-translate-y-1 group-hover/mock:shadow-[0_28px_60px_-22px_rgba(111,45,226,0.22)] sm:rounded-[1.35rem] sm:p-2.5`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`block max-h-none max-w-full rounded-xl transition duration-500 group-hover/mock:scale-[1.02] ${fillColumn ? 'h-auto w-full' : 'h-auto w-full object-contain object-center'}`}
          style={{ objectPosition }}
        />
      </div>
    </motion.div>
  )
}
