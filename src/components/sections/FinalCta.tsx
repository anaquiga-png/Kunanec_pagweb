import { LeadForm } from '@/components/forms/LeadForm'

export function FinalCta() {
  return (
    <section id="demo" className="scroll-mt-24 bg-kunan-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-kunan-900 sm:text-4xl">
            Empieza a construir relaciones más fuertes con tus usuarios
          </h2>
          <p className="text-lg text-kunan-muted">
            Conversemos sobre cómo Kunan Salud Ecuador puede integrarse a tu estrategia de bienestar, fidelización o
            beneficios corporativos.
          </p>
        </header>
        <LeadForm />
      </div>
    </section>
  )
}
