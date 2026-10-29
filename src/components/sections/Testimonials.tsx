import { motion } from 'framer-motion'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="relative scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      aria-labelledby="testimonios-title"
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex rounded-full bg-[#F3E8FF] px-4 py-1.5 text-xs font-semibold tracking-wide text-kunan-primary"
        >
          Testimonios
        </motion.span>

        <motion.h2
          id="testimonios-title"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-kunan-900 sm:text-4xl lg:text-[2.35rem] lg:leading-tight"
        >
          Quienes ya confían en Kunan
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base text-kunan-muted sm:text-lg"
        >
          Escucha cómo empresas y aliados viven el bienestar con nosotros.
        </motion.p>

        <ul
          className="mx-auto mt-12 grid max-w-4xl gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10"
          role="list"
        >
          {testimonials.map((item, index) => (
            <motion.li
              key={item.id}
              role="listitem"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 + index * 0.08 }}
              className="text-left"
            >
              <div className="overflow-hidden rounded-2xl bg-kunan-900/5 ring-1 ring-slate-200/80">
                <video
                  className="aspect-video w-full bg-kunan-900 object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.posterSrc}
                  aria-label={`Testimonio de ${item.name}`}
                >
                  <source src={item.videoSrc} type="video/mp4" />
                  Tu navegador no soporta video HTML5.
                </video>
              </div>
              <p className="mt-4 text-base font-semibold text-kunan-900">{item.name}</p>
              <p className="mt-0.5 text-sm text-kunan-muted">{item.role}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
