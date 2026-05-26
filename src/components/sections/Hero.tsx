import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { CtaButton } from '@/components/ui/CtaButton'

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-kunan-primary via-kunan-primary-dark to-kunan-900 px-4 pb-20 pt-16 text-white sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-kunan-sky/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-kunan-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <motion.a
            href="#demo"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#F3E8FF] px-6 py-2 text-xs font-semibold text-[#6F2DE2] shadow-md shadow-black/10 transition-colors hover:bg-[#EBD5FF] sm:px-7 sm:text-sm"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-[#6F2DE2]" aria-hidden />
            Quiero Kunan para mi empresa
          </motion.a>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.55 }}>
            <h1 id="hero-title" className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Convierte el bienestar en una ventaja competitiva
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
              Plataforma de bienestar, telemedicina y beneficios corporativos diseñada para empresas y programas de
              fidelización que buscan mejorar engagement, experiencia y salud digital.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <CtaButton trackingLabel="Solicitar demo" trackingSection="hero_primary" className="shadow-xl shadow-kunan-primary-dark/45">
              Solicitar demo
            </CtaButton>
            <CtaButton
              variant="secondary"
              trackingLabel="Hablar con un asesor"
              trackingSection="hero_secondary"
              metaContact
              className="border-0 bg-white text-[#6F2DE2] font-semibold hover:bg-[#F4F1FF] hover:text-[#5820B8] transition-all duration-300"
            >
              Hablar con un asesor
            </CtaButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-kunan-accent-soft">Por qué importa</p>
            <ul className="space-y-4 text-sm text-slate-100">
              <li className="flex gap-3 rounded-2xl bg-black/20 p-4">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-kunan-accent" />
                Confianza y seguridad percibida en momentos sensibles.
              </li>
              <li className="flex gap-3 rounded-2xl bg-black/20 p-4">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-kunan-primary" />
                Diferenciación de beneficios y programas de lealtad Ecuador.
              </li>
              <li className="flex gap-3 rounded-2xl bg-black/20 p-4">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/70" />
                Soporte continuo alineado a tu marca — salud digital Ecuador con enfoque humano.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
