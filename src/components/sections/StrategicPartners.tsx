import { motion } from 'framer-motion'
import { useState } from 'react'
import { strategicPartners } from '@/data/strategicPartners'

function PartnerLogo({ name, logoSrc }: { name: string; logoSrc: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="flex h-[9rem] w-full items-center justify-center sm:h-[7.5rem]">
      {failed ? (
        <span className="text-xs font-semibold tracking-wide text-kunan-700/60">{name}</span>
      ) : (
        <img
          src={logoSrc}
          alt={name}
          className="max-h-full max-w-[85%] object-contain"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export function StrategicPartners() {
  return (
    <section
      id="aliados"
      className="allies-section-pattern relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      aria-labelledby="aliados-title"
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex rounded-full bg-[#F3E8FF] px-4 py-1.5 text-xs font-semibold tracking-wide text-kunan-primary"
        >
          Nuestros aliados estratégicos
        </motion.span>

        <motion.h2
          id="aliados-title"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-kunan-900 sm:text-4xl lg:text-[2.35rem] lg:leading-tight"
        >
          Ya son 30+ empresas que confían en nosotros
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-6 sm:mt-14 sm:flex-nowrap sm:gap-8 md:gap-10"
          role="list"
        >
          {strategicPartners.map((partner, index) => (
            <motion.li
              key={partner.id}
              role="listitem"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.08 + index * 0.06 }}
              className="flex w-[calc(50%-0.625rem)] justify-center sm:w-auto"
            >
              <div
                className="flex h-48 w-48 items-center justify-center rounded-full border border-slate-200/60 bg-white p-6 shadow-sm shadow-slate-200/50 sm:h-[13rem] sm:w-[13rem] sm:p-8"
                title={partner.name}
              >
                <PartnerLogo name={partner.name} logoSrc={partner.logoSrc} />
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 text-sm font-medium tracking-wide text-kunan-700/70 sm:mt-12"
        >
          Y muchas más…
        </motion.p>
      </div>
    </section>
  )
}
