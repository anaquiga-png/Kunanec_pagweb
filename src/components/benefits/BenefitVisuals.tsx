import { motion } from 'framer-motion'
import {
  Apple,
  Brain,
  Calendar,
  Clock,
  Dumbbell,
  Leaf,
  Mic,
  Play,
  VideoOff,
  Salad,
  Smartphone,
  Stethoscope,
  Video,
  Wallet,
} from 'lucide-react'
import type { ReactNode } from 'react'

function PhoneFrame({
  children,
  className = '',
  accent = 'border-slate-200',
}: {
  children: ReactNode
  className?: string
  accent?: string
}) {
  return (
    <motion.div
      className={`relative mx-auto w-[min(100%,220px)] rounded-[2rem] border-[6px] ${accent} bg-white p-2 shadow-xl shadow-slate-300/40 ${className}`}
    >
      <motion.div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-slate-200" />
      <div className="mt-4 overflow-hidden rounded-[1.35rem]">{children}</div>
    </motion.div>
  )
}

export function MedicalBenefitVisual() {
  return (
    <div className="relative flex items-center justify-center py-2">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF4DA6]/20 to-[#FF8EC7]/5" />
      <PhoneFrame accent="border-[#FF6BB5]/40" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2.5 bg-gradient-to-b from-[#FFF0F7] to-white p-3"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between gap-2 rounded-xl bg-[#FF4DA6] px-3 py-2 text-white shadow-md"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-[11px] font-semibold">Conectando en minutos…</span>
            </div>
            <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[8px] font-semibold">App · Web</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-kunan-800 to-kunan-900 shadow-inner"
          >
            <div className="flex aspect-[4/5] flex-col items-center justify-center p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF4DA6]/25 ring-2 ring-[#FF4DA6]/50">
                <Stethoscope className="h-7 w-7 text-[#FF8EC7]" aria-hidden />
              </div>
              <p className="mt-2 text-[11px] font-bold text-white">Dr. García</p>
              <p className="mt-0.5 flex items-center gap-1 text-[9px] text-white/80">
                <Video className="h-3 w-3 text-[#FF4DA6]" aria-hidden />
                Videollamada en curso
              </p>
            </div>
            <motion.div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <Mic className="h-3.5 w-3.5 text-white" aria-hidden />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4DA6] shadow-md">
                <Video className="h-4 w-4 text-white" aria-hidden />
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <VideoOff className="h-3.5 w-3.5 text-white/70" aria-hidden />
              </div>
            </motion.div>
            <div className="absolute right-2 top-2 overflow-hidden rounded-lg border-2 border-white/30 bg-kunan-700 shadow-lg">
              <div className="flex h-10 w-14 items-center justify-center">
                <span className="text-[8px] font-medium text-white/70">Tú</span>
              </div>
            </div>
          </motion.div>
          <p className="text-center text-[9px] font-medium text-kunan-muted">
            Atención por video desde la app o la web
          </p>
        </motion.div>
      </PhoneFrame>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="absolute -right-1 top-6 z-20 rounded-2xl bg-white px-3 py-2 shadow-lg ring-1 ring-[#FF4DA6]/20 sm:right-2"
      >
        <p className="text-[10px] font-bold text-[#E91E8C]">24/7</p>
        <p className="text-[9px] text-kunan-muted">Disponible</p>
      </motion.div>
    </div>
  )
}

export function MentalHealthBenefitVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative flex items-center justify-center py-2"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-kunan-green/25 to-emerald-50/30" />
      <div className="relative z-10 w-full max-w-[280px] space-y-3">
        <motion.div
          whileInView={{ y: [0, -4, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 4, repeat: Infinity }}
          className="rounded-2xl border border-emerald-200/80 bg-white p-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-kunan-green/20">
              <Brain className="h-5 w-5 text-emerald-600" aria-hidden />
            </div>
            <motion.div>
              <p className="text-xs font-bold text-kunan-900">Sesión reservada</p>
              <p className="text-[10px] text-kunan-muted">Psicología · Espacio seguro</p>
            </motion.div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
            <Calendar className="h-4 w-4 text-emerald-600" aria-hidden />
            <span className="text-[11px] font-semibold text-emerald-800">Mañana · 10:00 a. m.</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="ml-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-kunan-green px-4 py-2.5 text-white shadow-md"
        >
          <p className="text-[10px] font-semibold">Tu bienestar, acompañado</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function NutritionBenefitVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative flex items-center justify-center py-2"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-kunan-orange/20 via-[#F3E8FF]/40 to-kunan-primary/10" />
      <PhoneFrame accent="border-kunan-orange/50" className="relative z-10">
        <div className="space-y-3 bg-gradient-to-b from-orange-50 to-[#FAF5FF] p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-kunan-orange/20">
              <Salad className="h-4 w-4 text-kunan-orange" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] font-bold text-kunan-900">Plan personalizado</p>
              <p className="text-[9px] text-kunan-muted">Objetivos saludables</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Proteína', pct: '72%', color: 'bg-kunan-orange' },
              { label: 'Carbos', pct: '48%', color: 'bg-kunan-primary' },
              { label: 'Grasas', pct: '35%', color: 'bg-[#FF8EC7]' },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl bg-white p-2 text-center shadow-sm"
              >
                <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${m.color}/20`}>
                  <span className="text-[9px] font-bold text-kunan-900">{m.pct}</span>
                </div>
                <p className="mt-1 text-[8px] font-medium text-kunan-muted">{m.label}</p>
              </motion.div>
            ))}
          </div>
          <div
            className="w-full rounded-xl bg-kunan-primary py-2 text-center text-[10px] font-semibold text-white"
            aria-hidden
          >
            Ver menú del día
          </div>
        </div>
      </PhoneFrame>
    </motion.div>
  )
}

export function WellnessContentBenefitVisual() {
  const items = [
    { label: 'Yoga', icon: Leaf, tone: 'from-kunan-accent/30 to-cyan-50' },
    { label: 'Meditación', icon: Brain, tone: 'from-kunan-sky/25 to-blue-50' },
    { label: 'Funcional', icon: Dumbbell, tone: 'from-teal-100 to-emerald-50' },
    { label: 'Finanzas', icon: Wallet, tone: 'from-kunan-primary/15 to-violet-50' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative flex items-center justify-center py-2"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-kunan-accent/20 to-cyan-50/40" />
      <div className="relative z-10 grid w-full max-w-[300px] grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.tone} p-3 shadow-md ring-1 ring-white/80`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 shadow-sm">
              <item.icon className="h-4 w-4 text-kunan-accent" aria-hidden />
            </div>
            <p className="mt-2 text-[11px] font-bold text-kunan-900">{item.label}</p>
            <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-kunan-primary text-white shadow">
              <Play className="h-3 w-3 fill-current" aria-hidden />
            </div>
            <Video className="absolute right-2 top-2 h-3 w-3 text-kunan-accent/50" aria-hidden />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function AppAccessVisual() {
  return (
    <div className="relative flex min-h-[200px] items-center justify-center gap-3 sm:gap-4">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <PhoneFrame accent="border-kunan-primary/30" className="scale-90 sm:scale-100">
          <div className="bg-gradient-to-b from-[#F3E8FF] to-white p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <motion.div className="h-6 w-6 rounded-lg bg-kunan-primary/20" />
              <span className="text-[10px] font-bold text-kunan-primary">Kunan App</span>
            </div>
            <div className="space-y-1.5">
              {['Salud', 'Bienestar', 'Mi plan'].map((t) => (
                <div key={t} className="rounded-lg bg-white px-2 py-1.5 text-[9px] font-medium text-kunan-900 shadow-sm">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </PhoneFrame>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-lg sm:block"
      >
        <div className="mb-2 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <div className="h-24 w-36 rounded-xl bg-gradient-to-br from-kunan-primary/10 to-kunan-accent/10" />
        <p className="mt-2 text-[10px] font-semibold text-kunan-900">portal.kunansalud.com</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="absolute -bottom-1 left-0 flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 shadow-md ring-1 ring-slate-100 sm:-left-2"
      >
        <Smartphone className="h-3.5 w-3.5 text-kunan-primary" aria-hidden />
        <Apple className="h-3.5 w-3.5 text-kunan-900" aria-hidden />
        <span className="text-[9px] font-semibold text-kunan-muted">App Store · Play Store</span>
      </motion.div>
    </div>
  )
}
