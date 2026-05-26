import { motion } from 'framer-motion'

type Props = {
  src: string
  alt: string
  /** Ajuste de encuadre cuando la imagen es un mockup ancho */
  objectPosition?: string
  className?: string
}

export function BenefitMockupImage({
  src,
  alt,
  objectPosition = 'center',
  className = '',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group/mock relative w-full ${className}`}
    >
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-kunan-primary/10 via-transparent to-kunan-accent/10 opacity-0 blur-2xl transition duration-500 group-hover/mock:opacity-100" />
      <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/40 p-2 shadow-[0_20px_50px_-20px_rgba(28,36,51,0.2)] ring-1 ring-slate-200/60 backdrop-blur-sm transition duration-300 group-hover/mock:-translate-y-1 group-hover/mock:shadow-[0_28px_60px_-22px_rgba(111,45,226,0.22)] sm:rounded-[1.35rem] sm:p-2.5">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full rounded-xl object-cover transition duration-500 group-hover/mock:scale-[1.02]"
          style={{ objectPosition }}
        />
      </div>
    </motion.div>
  )
}
