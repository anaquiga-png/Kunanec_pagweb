import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { CtaButton } from '@/components/ui/CtaButton'
import { BENEFIT_MOCKUPS } from '@/data/benefitMockups'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden text-white" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-kunan-primary via-kunan-primary-dark to-kunan-900" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-kunan-sky/35 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-1/4 h-[min(80vw,480px)] w-[min(80vw,480px)] rounded-full bg-kunan-primary/45 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]" />

      {/* Dos mitades en desktop (50 / 50); en móvil: copy primero, imagen a ancho completo debajo */}
      <div className="relative grid w-full lg:grid-cols-2 lg:items-stretch lg:min-h-[min(90dvh,760px)]">
        {/* Izquierda: copy */}
        <div className="relative z-10 flex flex-col justify-center px-4 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:min-h-0 lg:py-28 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-12 xl:pr-16">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.55 }}
              className="mt-8"
            >
              <h1 id="hero-title" className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[2.85rem] lg:leading-[1.1] xl:text-[3.35rem]">
                Convierte la salud y el bienestar en una ventaja competitiva
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-200 sm:text-xl">
                Plataforma de bienestar, telemedicina y beneficios corporativos diseñada para empresas y programas de
                fidelización que buscan mejorar engagement, experiencia y salud digital.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <CtaButton
                trackingLabel="Solicitar demo"
                trackingSection="hero_primary"
                className="shadow-xl shadow-kunan-primary-dark/45"
              >
                Solicitar demo
              </CtaButton>
              <CtaButton
                variant="secondary"
                trackingLabel="Hablar con un asesor"
                trackingSection="hero_secondary"
                metaContact
                className="border-0 bg-white font-semibold text-[#6F2DE2] hover:bg-[#F4F1FF] hover:text-[#5820B8] transition-all duration-300"
              >
                Hablar con un asesor
              </CtaButton>
            </motion.div>
          </div>
        </div>

        {/* Derecha: solo imagen, columna completa */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[280px] w-full lg:min-h-[inherit]"
        >
          <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block lg:bg-gradient-to-l lg:from-kunan-primary/[0.92] lg:via-kunan-primary-dark/25 lg:to-transparent" />
          <img
            src={BENEFIT_MOCKUPS.plataformaAcceso}
            alt="App Kunan Salud: beneficios, videoconsulta, salud mental y resumen de sesión"
            className="h-full min-h-[280px] w-full rounded-none object-cover object-center lg:absolute lg:inset-y-0 lg:left-0 lg:right-0 lg:min-h-0"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  )
}
