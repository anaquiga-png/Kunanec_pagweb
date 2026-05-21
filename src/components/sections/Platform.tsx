import { motion } from 'framer-motion'
import {
  Activity,
  Brain,
  ExternalLink,
  LayoutDashboard,
  Palette,
  Salad,
  Stethoscope,
  Sparkles,
} from 'lucide-react'
import { CtaButton } from '@/components/ui/CtaButton'

const features = [
  {
    icon: Stethoscope,
    label: 'Atención médica inmediata',
    color: 'bg-kunan-sky/15 text-kunan-sky',
  },
  {
    icon: Brain,
    label: 'Salud mental',
    color: 'bg-kunan-primary/10 text-kunan-primary',
  },
  {
    icon: Salad,
    label: 'Nutrición',
    color: 'bg-kunan-green/15 text-kunan-green',
  },
  {
    icon: Sparkles,
    label: 'Contenido wellbeing',
    color: 'bg-kunan-orange/15 text-kunan-orange',
  },
  {
    icon: LayoutDashboard,
    label: 'Dashboard empresarial',
    color: 'bg-kunan-accent/15 text-kunan-accent',
  },
  {
    icon: Palette,
    label: 'Marca blanca y loyalty',
    color: 'bg-[#F3E8FF] text-kunan-primary',
  },
]

const metrics = [
  { value: '24/7', label: 'Disponibilidad' },
  { value: '<60s', label: 'Tiempo de conexión' },
  { value: '98%', label: 'Satisfacción' },
]

export function Platform() {
  return (
    <section id="plataforma" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="platform-title">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        >
          {/* Dashboard mockup */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-kunan-surface p-5 shadow-xl shadow-slate-200/60 sm:p-7">
              {/* Top bar */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="h-5 flex-1 rounded-lg bg-white/80" />
              </div>

              {/* Metric cards row */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-xl font-bold text-kunan-primary sm:text-2xl">{m.value}</p>
                    <p className="mt-1 text-[11px] font-medium text-kunan-muted">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="flex items-end gap-2 rounded-2xl bg-white p-4 shadow-sm">
                {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-lg bg-gradient-to-t from-kunan-primary/70 to-kunan-primary/20"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              {/* Activity mini */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <Activity className="h-5 w-5 shrink-0 text-kunan-accent" />
                <div className="flex-1">
                  <div className="h-2 w-3/4 rounded-full bg-kunan-accent/20" />
                  <div className="mt-2 h-2 w-1/2 rounded-full bg-kunan-primary/15" />
                </div>
              </div>
            </div>

            {/* Floating accents */}
            <div className="pointer-events-none absolute -bottom-4 -left-4 h-28 w-28 rounded-full bg-kunan-primary/10 blur-2xl" />
            <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-kunan-accent/15 blur-2xl" />
          </div>

          {/* Content */}
          <div className="space-y-7">
            <div className="space-y-4">
              <h2 id="platform-title" className="text-3xl font-semibold tracking-tight text-kunan-900 sm:text-4xl">
                Todo el ecosistema Kunan en una sola plataforma.
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-kunan-muted sm:text-lg">
                Kunan Ecuador combina salud digital, bienestar y beneficios corporativos en una experiencia simple y
                humana para colaboradores y clientes.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="flex items-start gap-2.5 rounded-2xl bg-kunan-surface p-3.5"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${f.color}`}>
                    <f.icon className="h-[18px] w-[18px]" aria-hidden />
                  </div>
                  <span className="text-sm font-medium leading-snug text-kunan-900">{f.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <CtaButton trackingLabel="Solicitar demo" trackingSection="platform">
                Solicitar demo
              </CtaButton>
              <a
                href="https://portal.kunansalud.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-kunan-primary shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:bg-[#F3E8FF] hover:text-kunan-primary-dark hover:ring-kunan-primary/30"
              >
                Ingresar a la plataforma
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
