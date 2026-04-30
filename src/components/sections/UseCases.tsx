import { motion } from 'framer-motion'
import { Building2, CreditCard, Handshake, Trophy } from 'lucide-react'
import { Section } from '@/components/Section'

const cases = [
  {
    title: 'Empresas',
    body: 'Mejora el bienestar y la retención de tus colaboradores.',
    icon: Building2,
  },
  {
    title: 'Bancos y fintechs',
    body: 'Fortalece la lealtad de tus clientes con beneficios de alto valor percibido.',
    icon: CreditCard,
  },
  {
    title: 'Programas de loyalty',
    body: 'Aumenta el engagement con beneficios útiles y memorables.',
    icon: Trophy,
  },
  {
    title: 'Brokers y aliados estratégicos',
    body: 'Incorpora bienestar digital a tu portafolio de soluciones.',
    icon: Handshake,
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
            className="flex gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-kunan-primary/10 text-kunan-primary">
              <c.icon className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-kunan-900">{c.title}</h3>
              <p className="mt-1 text-slate-600">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
