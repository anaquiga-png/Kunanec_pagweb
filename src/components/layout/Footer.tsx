export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold text-kunan-900">Kunan Salud Ecuador</p>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Bienestar corporativo Ecuador, beneficios para colaboradores Ecuador y programas de lealtad Ecuador
              con salud digital y telemedicina — la misma confianza de{' '}
              <a
                href="https://kunansalud.com/"
                className="font-medium text-kunan-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Kunan Salud
              </a>
              , adaptada a empresas y aliados en el país.
            </p>
          </div>
          <address className="not-italic text-sm text-slate-600">
            <span className="font-semibold text-kunan-900">Presencia en Ecuador</span>
            <br />
            Quito, Pichincha, Ecuador
          </address>
        </div>
        <p className="text-xs text-slate-500">
          Fidelización de clientes Ecuador · bienestar digital Ecuador · beneficios empresariales Ecuador · loyalty
          Ecuador
        </p>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} Kunan Salud Ecuador. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
