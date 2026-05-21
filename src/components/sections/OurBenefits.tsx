import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import {
  AppWindow,
  Brain,
  ExternalLink,
  Salad,
  Sparkles,
  Stethoscope,
  Video,
  type LucideIcon,
} from 'lucide-react'
import {
  AppAccessVisual,
  MedicalBenefitVisual,
  MentalHealthBenefitVisual,
  NutritionBenefitVisual,
  WellnessContentBenefitVisual,
} from '@/components/benefits/BenefitVisuals'
import { KUNAN_PORTAL_URL } from '@/lib/links'
import { trackCtaClick } from '@/lib/tracking'

type BenefitTheme = {
  card: string
  pill: string
  glow: string
}

type BenefitItem = {
  id: string
  serviceLabel: string
  icon: LucideIcon
  title: string
  description: string
  cta: string
  theme: BenefitTheme
  Visual: ComponentType
}

const benefits: BenefitItem[] = [
  {
    id: 'atencion-medica',
    serviceLabel: 'Atención médica',
    icon: Stethoscope,
    title: 'Atención en minutos',
    description: 'Conéctate en minutos con médicos generales todos los días del año.',
    cta: 'Atiéndete ahora',
    theme: {
      card: 'from-[#FFF0F7] via-white to-[#FFF8FC]',
      pill: 'bg-[#FF4DA6]/15 text-[#C2186B] ring-[#FF4DA6]/25',
      glow: 'from-[#FF4DA6]/25 to-transparent',
    },
    Visual: MedicalBenefitVisual,
  },
  {
    id: 'salud-mental',
    serviceLabel: 'Salud Mental',
    icon: Brain,
    title: 'Tu salud mental importa',
    description: 'Encuentra un soporte psicológico en un espacio seguro y de confianza.',
    cta: 'Agenda una sesión',
    theme: {
      card: 'from-emerald-50 via-white to-[#F0FDF4]',
      pill: 'bg-kunan-green/20 text-emerald-700 ring-emerald-200/60',
      glow: 'from-kunan-green/30 to-transparent',
    },
    Visual: MentalHealthBenefitVisual,
  },
  {
    id: 'nutricion',
    serviceLabel: 'Nutrición',
    icon: Salad,
    title: 'Asesoría nutricional',
    description: 'Cumple tus objetivos y vive de una manera saludable.',
    cta: 'Agenda una sesión',
    theme: {
      card: 'from-orange-50 via-white to-[#FAF5FF]',
      pill: 'bg-kunan-orange/15 text-orange-700 ring-kunan-orange/30',
      glow: 'from-kunan-orange/25 via-kunan-primary/10 to-transparent',
    },
    Visual: NutritionBenefitVisual,
  },
  {
    id: 'contenido-bienestar',
    serviceLabel: 'Contenido de bienestar',
    icon: Video,
    title: 'Accede a nuestro contenido exclusivo',
    description:
      'Desde yoga, meditación y entrenamiento funcional a contenido de educación financiera para mejorar tus hábitos de ahorro y crédito.',
    cta: 'Ver ahora',
    theme: {
      card: 'from-cyan-50 via-white to-[#F0FDFF]',
      pill: 'bg-kunan-accent/15 text-teal-700 ring-kunan-accent/30',
      glow: 'from-kunan-accent/25 to-transparent',
    },
    Visual: WellnessContentBenefitVisual,
  },
]

function BenefitCta({ label, section }: { label: string; section: string }) {
  return (
    <a
      href={KUNAN_PORTAL_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackCtaClick({ cta_label: label, section })}
      className="inline-flex items-center justify-center rounded-full bg-kunan-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-kunan-primary/30 transition hover:bg-kunan-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
    >
      {label}
    </a>
  )
}

function BenefitCard({ benefit, index }: { benefit: BenefitItem; index: number }) {
  const reverse = index % 2 === 1
  const { Visual, theme, icon: Icon } = benefit

  return (
    <motion.article
      id={benefit.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className={`relative overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br ${theme.card} p-5 shadow-lg shadow-slate-200/50 sm:p-6 lg:p-7`}
    >
      <motion.div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${theme.glow} blur-2xl`}
      />
      <div
        className={`relative flex flex-col gap-6 lg:items-center lg:gap-8 ${
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        <div className="flex flex-1 flex-col justify-center space-y-4 lg:min-w-0 lg:py-2">
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ${theme.pill}`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {benefit.serviceLabel}
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-kunan-900 sm:text-[1.65rem]">{benefit.title}</h3>
          <p className="max-w-md text-base leading-relaxed text-kunan-muted sm:text-lg">{benefit.description}</p>
          <div className="pt-1">
            <BenefitCta label={benefit.cta} section={`beneficios_${benefit.id}`} />
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center lg:min-h-[220px]">
          <Visual />
        </div>
      </div>
    </motion.article>
  )
}

export function OurBenefits() {
  return (
    <section
      id="beneficios"
      className="benefits-dot-pattern relative scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      aria-labelledby="beneficios-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative mb-12 text-center sm:mb-14 lg:mb-16"
        >
          <Sparkles
            className="absolute left-[12%] top-2 hidden h-5 w-5 text-kunan-primary/70 sm:block lg:left-[18%]"
            aria-hidden
          />
          <Sparkles
            className="absolute right-[12%] top-6 hidden h-4 w-4 text-[#FF4DA6]/80 sm:block lg:right-[18%]"
            aria-hidden
          />
          <span
            className="mb-3 inline-block text-kunan-primary"
            aria-hidden
          >
            ✦
          </span>
          <h2
            id="beneficios-title"
            className="text-3xl font-bold tracking-tight text-kunan-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Nuestros beneficios</span>
              <span
                className="absolute -bottom-0.5 left-0 right-0 z-0 h-3 rounded-sm bg-[#F3E8FF] sm:h-3.5"
                aria-hidden
              />
            </span>
          </h2>
          <Sparkles className="mx-auto mt-4 h-5 w-5 text-kunan-primary/60" aria-hidden />
        </motion.header>

        <motion.div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-r from-white via-[#FAF8FF] to-[#F0FDFF] p-5 shadow-lg shadow-slate-200/50 sm:mt-8 sm:p-6 lg:p-8"
        >
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-10">
            <div className="flex w-full shrink-0 justify-center lg:w-[42%]">
              <AppAccessVisual />
            </div>
            <div className="flex flex-1 flex-col justify-center space-y-4 text-center lg:text-left">
              <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-kunan-primary/10 px-3.5 py-1.5 text-xs font-semibold text-kunan-primary ring-1 ring-kunan-primary/20 lg:mx-0">
                <AppWindow className="h-4 w-4" aria-hidden />
                Plataforma Kunan
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-kunan-900 sm:text-3xl">
                Accede a Kunan a través de nuestra web o app móvil
              </h3>
              <p className="text-base leading-relaxed text-kunan-muted sm:text-lg">
                Ingresa a la plataforma web o descarga la app en tiendas virtuales.
              </p>
              <motion.div className="flex justify-center pt-1 lg:justify-start">
                <a
                  href={KUNAN_PORTAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackCtaClick({
                      cta_label: 'Ingresar a la plataforma',
                      section: 'beneficios_plataforma',
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-kunan-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-kunan-primary/30 transition hover:bg-kunan-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
                >
                  Ingresar a la plataforma
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
