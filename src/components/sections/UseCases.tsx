import { motion } from 'framer-motion'
import { Building2, CreditCard, Handshake, Trophy } from 'lucide-react'
import { Section } from '@/components/Section'

const cases = [
  {
    title: 'Empresas',
    body: 'Mejora el bienestar y la retención de tus colaboradores.',
    icon: Building2,
    iconWrap: 'bg-kunan-sky/15 text-kunan-sky',
  },
  {
    title: 'Bancos y fintechs',
    body: 'Fortalece la lealtad de tus clientes con beneficios de alto valor percibido.',
    icon: CreditCard,
    iconWrap: 'bg-kunan-accent/15 text-kunan-accent',
  },
  {
    title: 'Programas de loyalty',
    body: 'Aumenta el engagement con beneficios útiles y memorables.',
    icon: Trophy,
    iconWrap: 'bg-kunan-green/20 text-kunan-green',
  },
  {
    title: 'Brokers y aliados estratégicos',
    body: 'Incorpora bienestar digital a tu portafolio de soluciones.',
    icon: Handshake,
    iconWrap: 'bg-kunan-orange/20 text-kunan-orange',
  },
]

export function UseCases() {
  return (
    <Section
      id="casos"
      title="Soluciones para empresas que quieren diferenciarse"
      className="bg-white"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="flex gap-4 rounded-3xl border border-slate-200 bg-kunan-surface p-6 shadow-sm"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c.iconWrap}`}>
              <c.icon className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-kunan-900">{c.title}</h3>
              <p className="mt-1 text-kunan-muted">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
