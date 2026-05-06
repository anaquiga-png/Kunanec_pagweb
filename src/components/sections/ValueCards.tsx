import { motion } from 'framer-motion'
import { BadgeCheck, HeartHandshake, LineChart, Sparkle } from 'lucide-react'
import { Section } from '@/components/Section'

const cards = [
  {
    title: 'Genera lealtad',
    body: 'Convierte momentos de necesidad en oportunidades para fortalecer la relación con tus clientes.',
    icon: HeartHandshake,
  },
  {
    title: 'Construye confianza',
    body: 'Ofrece acompañamiento real que genera seguridad y conexión emocional con tu marca.',
    icon: BadgeCheck,
  },
  {
    title: 'Diferénciate',
    body: 'Destácate con un beneficio tangible que impacta directamente en la experiencia del usuario.',
    icon: Sparkle,
  },
  {
    title: 'Impacta tu negocio',
    body: 'Reduce ausentismo, mejora retención y genera valor medible para tu empresa.',
    icon: LineChart,
  },
]

export function ValueCards() {
  return (
    <Section id="valor" eyebrow="Propuesta de valor" title="Lealtad, confianza, diferenciación e impacto">
      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-kunan-primary/20 to-kunan-accent/14 blur-2xl transition group-hover:opacity-100" />
            <c.icon className="relative h-10 w-10 text-kunan-accent" aria-hidden />
            <h3 className="relative mt-4 text-xl font-semibold text-kunan-900">{c.title}</h3>
            <p className="relative mt-2 text-kunan-muted">{c.body}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
