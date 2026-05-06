import { motion } from 'framer-motion'
import { HeartCrack, Layers, Link2Off, TrendingDown, Users } from 'lucide-react'
import { Section } from '@/components/Section'

const pains = [
  {
    title: 'Baja lealtad de clientes',
    icon: HeartCrack,
    desc: 'La competencia copia precios; la conexión emocional no.',
  },
  {
    title: 'Beneficios poco diferenciados',
    icon: Layers,
    desc: 'Catálogos genéricos que no refuerzan tu propuesta de valor.',
  },
  {
    title: 'Alta rotación de colaboradores',
    icon: Users,
    desc: 'Talento que busca propósito y respaldo real, no solo un PDF.',
  },
  {
    title: 'Ausentismo y costos de bienestar',
    icon: TrendingDown,
    desc: 'Impacto directo en productividad y en la cultura organizacional.',
  },
  {
    title: 'Poca conexión con la marca',
    icon: Link2Off,
    desc: 'Dificultad para generar vínculos memorables en puntos críticos.',
  },
]

export function Problem() {
  return (
    <Section id="problema" title="Hoy competir no es suficiente" className="bg-kunan-surface">
      <p className="mb-10 max-w-3xl text-lg text-kunan-muted">
        Las empresas ya no compiten solo por precio o producto. Compiten por experiencia, conexión y valor percibido.
        En Ecuador, la confianza y el acompañamiento marcan la diferencia.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pains.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-300/55"
          >
            <item.icon className="h-8 w-8 text-kunan-primary" aria-hidden />
            <h3 className="text-base font-semibold text-kunan-900">{item.title}</h3>
            <p className="text-sm text-kunan-muted">{item.desc}</p>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
