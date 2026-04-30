import { motion } from 'framer-motion'

export function EmotionalStatement() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-kunan-900 via-kunan-800 to-kunan-primary px-4 py-20 text-center text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28" aria-label="Mensaje de marca">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-4xl text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl"
      >
        Las marcas que ganan no son las que más prometen, son las que están cuando más importa.
      </motion.blockquote>
    </section>
  )
}
