import { motion } from 'framer-motion'
import {
  AppWindow,
  Brain,
  ExternalLink,
  LayoutDashboard,
  LayoutGrid,
  Salad,
  Sparkles,
  Stethoscope,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { BenefitMockupImage } from '@/components/benefits/BenefitMockupImage'
import { BENEFIT_MOCKUPS } from '@/data/benefitMockups'
import { KUNAN_EMPRESA_URL, KUNAN_PORTAL_URL } from '@/lib/links'
import { trackCtaClick } from '@/lib/tracking'

type BenefitTheme = {
  card: string
  pill: string
  accentRing: string
  glow: string
}

type BenefitItem = {
  id: string
  serviceLabel: string
  icon: LucideIcon
  title: string
  description: string
  cta: string
  mockupSrc: string
  mockupAlt: string
  mockupPosition?: string
  theme: BenefitTheme
}

const benefits: BenefitItem[] = [
  {
    id: 'atencion-medica',
    serviceLabel: 'Atención médica',
    icon: Stethoscope,
    title: 'Atención en minutos',
    description: 'Conéctate en minutos con médicos generales todos los días del año.',
    cta: 'Atiéndete ahora',
    mockupSrc: BENEFIT_MOCKUPS.atencionMedica,
    mockupAlt: 'App móvil Kunan: atención médica y videoconsulta',
    mockupPosition: 'top center',
    theme: {
      card: 'from-white/90 via-[#FFF8FB]/95 to-white/80',
      pill: 'bg-[#FF4DA6]/12 text-[#C2186B] ring-[#FF4DA6]/20',
      accentRing: 'group-hover:ring-[#FF4DA6]/18',
      glow: 'from-[#FF4DA6]/20 via-kunan-primary/5 to-transparent',
    },
  },
  {
    id: 'salud-mental',
    serviceLabel: 'Salud Mental',
    icon: Brain,
    title: 'Tu salud mental importa',
    description: 'Encuentra un soporte psicológico en un espacio seguro y de confianza.',
    cta: 'Agenda una sesión',
    mockupSrc: BENEFIT_MOCKUPS.saludMental,
    mockupAlt: 'Plataforma web Kunan: salud mental y beneficios del colaborador',
    mockupPosition: 'top center',
    theme: {
      card: 'from-white/90 via-emerald-50/40 to-white/85',
      pill: 'bg-emerald-500/10 text-emerald-800 ring-emerald-200/50',
      accentRing: 'group-hover:ring-emerald-300/40',
      glow: 'from-kunan-green/25 to-emerald-400/10',
    },
  },
  {
    id: 'nutricion',
    serviceLabel: 'Nutrición',
    icon: Salad,
    title: 'Asesoría nutricional',
    description: 'Cumple tus objetivos y vive de una manera saludable.',
    cta: 'Agenda una sesión',
    mockupSrc: BENEFIT_MOCKUPS.nutricion,
    mockupAlt: 'Flujo de agendamiento de asesoría nutricional en Kunan',
    mockupPosition: 'center',
    theme: {
      card: 'from-white/90 via-orange-50/35 to-[#FAF5FF]/60',
      pill: 'bg-kunan-orange/12 text-orange-800 ring-kunan-orange/25',
      accentRing: 'group-hover:ring-kunan-orange/25',
      glow: 'from-kunan-orange/15 via-kunan-primary/8 to-transparent',
    },
  },
  {
    id: 'contenido-bienestar',
    serviceLabel: 'Contenido de bienestar',
    icon: Video,
    title: 'Accede a nuestro contenido exclusivo',
    description:
      'Desde yoga, meditación y entrenamiento funcional a contenido de educación financiera para mejorar tus hábitos de ahorro y crédito.',
    cta: 'Ver ahora',
    mockupSrc: BENEFIT_MOCKUPS.contenidoBienestar,
    mockupAlt: 'Biblioteca de contenido de bienestar: yoga, funcional y más',
    mockupPosition: 'top center',
    theme: {
      card: 'from-white/90 via-cyan-50/40 to-white/85',
      pill: 'bg-kunan-accent/12 text-teal-800 ring-kunan-accent/30',
      accentRing: 'group-hover:ring-kunan-accent/30',
      glow: 'from-kunan-accent/20 to-kunan-sky/10',
    },
  },
]

function BenefitCta({ label, section }: { label: string; section: string }) {
  return (
    <a
      href={KUNAN_PORTAL_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackCtaClick({ cta_label: label, section })}
      className="inline-flex items-center justify-center rounded-full bg-kunan-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-kunan-primary/25 transition duration-300 hover:-translate-y-0.5 hover:bg-kunan-primary-dark hover:shadow-xl hover:shadow-kunan-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
    >
      {label}
    </a>
  )
}

function BenefitCard({ benefit, index }: { benefit: BenefitItem; index: number }) {
  const reverse = index % 2 === 1
  const { theme, icon: Icon } = benefit

  return (
    <motion.article
      id={benefit.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-[1.75rem] bg-gradient-to-br opacity-0 blur-xl transition duration-500 group-hover:opacity-100 ${theme.glow}`}
      />
      <div
        className={`relative overflow-hidden rounded-[1.75rem] border border-white/90 bg-gradient-to-br ${theme.card} p-6 shadow-[0_8px_40px_-12px_rgba(28,36,51,0.12)] ring-1 ring-slate-200/50 backdrop-blur-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_-15px_rgba(111,45,226,0.18)] sm:p-7 lg:p-8 ${theme.accentRing} group-hover:ring-2`}
      >
        <div
          className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${theme.glow} opacity-40 blur-3xl transition duration-500 group-hover:opacity-70`}
        />
        <div
          className={`relative flex flex-col gap-8 xl:items-stretch xl:gap-10 ${
            reverse ? 'xl:flex-row-reverse' : 'xl:flex-row'
          }`}
        >
          <div className="flex flex-1 flex-col justify-center space-y-5 xl:min-w-0 xl:max-w-[46%] xl:py-1">
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 backdrop-blur-sm ${theme.pill}`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {benefit.serviceLabel}
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-kunan-900 sm:text-[1.7rem] sm:leading-snug">
              {benefit.title}
            </h3>
            <p className="max-w-md text-base leading-relaxed text-kunan-muted sm:text-[1.05rem]">
              {benefit.description}
            </p>
            <div className="pt-0.5">
              <BenefitCta label={benefit.cta} section={`beneficios_${benefit.id}`} />
            </div>
          </div>
          <div className="relative flex min-h-[240px] flex-1 items-center justify-center sm:min-h-[280px] xl:min-h-[300px]">
            <BenefitMockupImage
              src={benefit.mockupSrc}
              alt={benefit.mockupAlt}
              objectPosition={benefit.mockupPosition}
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function EnterpriseDashboardBenefit() {
  const theme = {
    card: 'from-white/90 via-[#F3E8FF]/50 to-white/85',
    pill: 'bg-kunan-primary/12 text-kunan-primary ring-kunan-primary/20',
    accentRing: 'group-hover:ring-kunan-primary/25',
    glow: 'from-kunan-primary/20 via-kunan-accent/10 to-transparent',
  }

  return (
    <motion.article
      id="dashboard-empresa"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: 0.04 }}
      className="group relative mt-10 sm:mt-12"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-[1.75rem] bg-gradient-to-br opacity-0 blur-xl transition duration-500 group-hover:opacity-100 ${theme.glow}`}
      />
      <div
        className={`relative overflow-hidden rounded-[1.75rem] border border-white/90 bg-gradient-to-br ${theme.card} p-6 shadow-[0_8px_40px_-12px_rgba(28,36,51,0.12)] ring-1 ring-slate-200/50 backdrop-blur-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_-15px_rgba(111,45,226,0.18)] sm:p-7 lg:p-8 ${theme.accentRing} group-hover:ring-2`}
      >
        <div
          className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${theme.glow} opacity-40 blur-3xl transition duration-500 group-hover:opacity-70`}
        />
        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-stretch xl:gap-10">
          <div className="flex flex-1 flex-col justify-center space-y-5 xl:min-w-0 xl:max-w-[46%] xl:py-1">
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 backdrop-blur-sm ${theme.pill}`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden />
              Dashboard empresarial
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-kunan-900 sm:text-[1.7rem] sm:leading-snug lg:text-[1.85rem]">
              Mide engagement y salud digital en un solo panel
            </h3>
            <p className="max-w-md text-base leading-relaxed text-kunan-muted sm:text-[1.05rem]">
              Visualiza uso de beneficios, sesiones y métricas de tu programa para tomar decisiones con datos.
            </p>
            <div className="pt-0.5">
              <a
                href={KUNAN_EMPRESA_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackCtaClick({
                    cta_label: 'Ver plataforma empresarial',
                    section: 'beneficios_dashboard_empresa',
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-kunan-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-kunan-primary/25 transition duration-300 hover:-translate-y-0.5 hover:bg-kunan-primary-dark hover:shadow-xl hover:shadow-kunan-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
              >
                Ver plataforma empresarial
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
          <div className="relative flex min-h-[240px] flex-1 items-center justify-center sm:min-h-[280px] xl:min-h-[300px]">
            <BenefitMockupImage
              src={BENEFIT_MOCKUPS.dashboardEmpresa}
              alt="Dashboard empresarial Kunan: métricas, engagement y uso de beneficios"
              objectPosition="top center"
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function OurBenefits() {
  return (
    <section
      id="beneficios"
      className="benefits-premium-mesh relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      aria-labelledby="beneficios-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-14 text-center sm:mb-16 lg:mb-20"
        >
          <Sparkles
            className="absolute left-[8%] top-0 hidden h-5 w-5 text-kunan-primary/50 sm:block lg:left-[14%]"
            aria-hidden
          />
          <Sparkles
            className="absolute right-[8%] top-8 hidden h-4 w-4 text-kunan-accent/60 sm:block lg:right-[14%]"
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-kunan-primary/15 bg-white/70 px-4 py-1.5 text-xs font-semibold text-kunan-primary shadow-sm backdrop-blur-md"
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
            Plataforma de beneficios
          </motion.div>

          <h2
            id="beneficios-title"
            className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-kunan-900 sm:text-4xl lg:text-[2.85rem] lg:leading-[1.15]"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Nuestros beneficios</span>
              <span
                className="absolute -bottom-1 left-0 right-0 z-0 h-3.5 rounded-md bg-gradient-to-r from-[#F3E8FF] via-[#EDE9FE] to-[#E0F2FE] sm:h-4"
                aria-hidden
              />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-kunan-muted sm:text-lg">
            Un stack único para engagement, salud digital y experiencia empleado — con la solidez de un producto enterprise.
          </p>

          <Sparkles className="mx-auto mt-5 h-5 w-5 text-kunan-primary/45" aria-hidden />
        </motion.header>

        <div className="grid gap-7 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-12">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>

        <EnterpriseDashboardBenefit />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="group relative mt-10 sm:mt-12"
        >
          <div className="pointer-events-none absolute -inset-0.5 rounded-[1.75rem] bg-gradient-to-r from-kunan-primary/12 via-kunan-accent/10 to-kunan-primary/12 opacity-0 blur-md transition duration-500 group-hover:opacity-100" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/90 bg-white/75 p-6 shadow-[0_12px_48px_-16px_rgba(28,36,51,0.15)] ring-1 ring-slate-200/60 backdrop-blur-xl transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_24px_60px_-20px_rgba(111,45,226,0.2)] sm:p-8 lg:p-10">
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12">
              <div className="w-full shrink-0 lg:w-[48%]">
                <BenefitMockupImage
                  src={BENEFIT_MOCKUPS.plataformaAcceso}
                  alt="Accede a Kunan desde la app móvil y la plataforma web"
                  objectPosition="center"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center space-y-5 text-center lg:text-left">
                <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-kunan-primary/15 bg-[#F3E8FF]/60 px-3.5 py-1.5 text-xs font-semibold text-kunan-primary backdrop-blur-sm lg:mx-0">
                  <AppWindow className="h-4 w-4" aria-hidden />
                  Acceso omnicanal
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-kunan-900 sm:text-3xl lg:text-[1.95rem]">
                  Accede a Kunan a través de nuestra web o app móvil
                </h3>
                <p className="text-base leading-relaxed text-kunan-muted sm:text-lg">
                  Ingresa a la plataforma web o descarga la app en tiendas virtuales.
                </p>
                <div className="flex justify-center pt-1 lg:justify-start">
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
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-kunan-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-kunan-primary/28 transition duration-300 hover:-translate-y-0.5 hover:bg-kunan-primary-dark hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary"
                  >
                    Ingresar a la plataforma
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
