import { motion } from 'framer-motion'
import { Section } from '@/components/Section'

export function Solution() {
  return (
    <Section
      id="solucion"
      title="Bienestar que genera valor real"
      className="bg-gradient-to-b from-white to-slate-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/60 backdrop-blur"
      >
        <p className="text-lg leading-relaxed text-slate-600">
          Kunan permite a las empresas ofrecer acceso inmediato a apoyo profesional, transformando el bienestar en una
          herramienta estratégica. No es solo un beneficio. Es una forma de estar presente cuando más importa.
        </p>
        <p className="mt-4 text-base text-slate-600">
          <strong className="font-semibold text-kunan-900">Kunan Salud Ecuador</strong> conecta esa promesa con salud
          digital y telemedicina para beneficios empresariales y programas de lealtad en el país.
        </p>
      </motion.div>
    </Section>
  )
}
