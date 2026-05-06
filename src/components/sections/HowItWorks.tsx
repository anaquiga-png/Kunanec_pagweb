import { motion } from 'framer-motion'
import { Plug, Timer, TrendingUp } from 'lucide-react'
import { Section } from '@/components/Section'

const steps = [
  {
    n: '1',
    title: 'Integra Kunan en tu propuesta de valor.',
    icon: Plug,
  },
  {
    n: '2',
    title: 'Tus usuarios acceden a apoyo profesional en segundos.',
    icon: Timer,
  },
  {
    n: '3',
    title: 'Tu marca genera valor en cada interacción.',
    icon: TrendingUp,
  },
]

export function HowItWorks() {
  return (
    <Section id="como-funciona" title="Simple. Inmediato. Escalable." className="bg-kunan-surface">
      <ol className="grid gap-6 lg:grid-cols-3">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="relative flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-kunan-primary to-kunan-primary-dark text-sm font-bold text-white">
                {s.n}
              </span>
              <s.icon className="h-7 w-7 text-kunan-primary" aria-hidden />
            </div>
            <p className="text-base font-medium leading-snug text-kunan-900">{s.title}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
