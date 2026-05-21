import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import { forwardLeadToCrm } from '@/lib/crm'
import { supabase, supabaseConfigured } from '@/lib/supabaseClient'
import { metaTrackLead, trackFormStart, trackFormView, trackLeadSubmit } from '@/lib/tracking'
import { useUtmParams } from '@/hooks/useUtmParams'
import {
  ORGANIZATION_TYPES,
  leadFormSchema,
  type KunanLeadInsert,
  type LeadFormValues,
} from '@/types/lead'

const fieldClass =
  'mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-kunan-primary focus:ring-2 focus:ring-kunan-primary/20'

const labelClass = 'text-sm font-medium text-slate-700'

export function LeadForm() {
  const utm = useUtmParams()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const formStarted = useRef(false)
  const formViewSent = useRef(false)
  const { ref: viewRef, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      company: '',
      role: '',
      email: '',
      phone: '',
      organization_type: '',
      user_volume: '',
      message: '',
      consent: false,
    },
  })

  useEffect(() => {
    if (inView && !formViewSent.current) {
      formViewSent.current = true
      trackFormView()
    }
  }, [inView])

  const markFormStart = () => {
    if (formStarted.current) return
    formStarted.current = true
    trackFormStart()
  }

  const onValid = async (data: LeadFormValues) => {
    setSubmitError(null)
    if (!supabaseConfigured) {
      setSubmitError(
        'Falta configurar Supabase. Añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env.',
      )
      return
    }

    const landing = typeof window !== 'undefined' ? window.location.href : ''
    const row: KunanLeadInsert = {
      name: data.name,
      company: data.company,
      role: data.role,
      email: data.email,
      phone: data.phone,
      organization_type: data.organization_type,
      user_volume: data.user_volume,
      message: data.message,
      utm_source: utm.utm_source || null,
      utm_medium: utm.utm_medium || null,
      utm_campaign: utm.utm_campaign || null,
      utm_content: utm.utm_content || null,
      utm_term: utm.utm_term || null,
      landing_page_url: landing,
      consent: data.consent,
      source: 'website',
      client_timestamp: new Date().toISOString(),
    }

    const { error } = await supabase.from('kunan_leads').insert(row)

    if (error) {
      setSubmitError(
        'No pudimos enviar tu solicitud. Verifica tu conexión o inténtalo más tarde. Si el problema continúa, escríbenos por WhatsApp.',
      )
      return
    }

    trackLeadSubmit({
      organization_type: data.organization_type,
      company: data.company,
    })
    metaTrackLead()
    void forwardLeadToCrm(row)

    void fetch('https://anaquiga.app.n8n.cloud/webhook/registro-landing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    }).catch(() => {})
    setSuccess(true)
    reset()
  }

  if (success) {
    return (
      <div
        ref={viewRef}
        className="rounded-3xl border border-emerald-200 bg-emerald-50/90 p-8 text-center shadow-lg"
        role="status"
      >
        <p className="text-lg font-semibold text-emerald-900">¡Gracias! Recibimos tu solicitud.</p>
        <p className="mt-2 text-emerald-800">
          Un asesor de Kunan Salud Ecuador se pondrá en contacto contigo pronto.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-emerald-700/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-sm hover:bg-emerald-100/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          onClick={() => setSuccess(false)}
        >
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  return (
    <div ref={viewRef} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
      {!supabaseConfigured && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Modo sin Supabase: configura <code className="rounded bg-amber-100 px-1">VITE_SUPABASE_URL</code> y{' '}
          <code className="rounded bg-amber-100 px-1">VITE_SUPABASE_ANON_KEY</code> para guardar leads.
        </p>
      )}
      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={handleSubmit(onValid)}
        onFocusCapture={markFormStart}
        onChange={markFormStart}
        noValidate
      >
        <div className="sm:col-span-2">
          <h3 className="text-xl font-semibold text-kunan-900">Solicitar demo</h3>
          <p className="mt-1 text-sm text-slate-500">Completa el formulario y te contactaremos a la brevedad.</p>
        </div>

        <div>
          <label className={labelClass} htmlFor="name">
            Nombre
          </label>
          <input id="name" className={fieldClass} autoComplete="name" {...register('name')} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="company">
            Empresa
          </label>
          <input id="company" className={fieldClass} autoComplete="organization" {...register('company')} />
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="role">
            Cargo
          </label>
          <input id="role" className={fieldClass} autoComplete="organization-title" {...register('role')} />
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email corporativo
          </label>
          <input id="email" type="email" className={fieldClass} autoComplete="email" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="phone">
            Teléfono / WhatsApp
          </label>
          <input id="phone" type="tel" className={fieldClass} autoComplete="tel" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="organization_type">
            Tipo de organización
          </label>
          <select id="organization_type" className={fieldClass} defaultValue="" {...register('organization_type')}>
            <option value="" disabled>
              Selecciona…
            </option>
            {ORGANIZATION_TYPES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.organization_type && (
            <p className="mt-1 text-sm text-red-600">{errors.organization_type.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="user_volume">
            Número aproximado de usuarios / colaboradores
          </label>
          <input id="user_volume" className={fieldClass} placeholder="50 – 2.000" {...register('user_volume')} />
          {errors.user_volume && <p className="mt-1 text-sm text-red-600">{errors.user_volume.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Mensaje
          </label>
          <textarea id="message" rows={4} className={fieldClass} {...register('message')} />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <div className="sm:col-span-2 flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-kunan-primary focus:ring-kunan-primary"
            {...register('consent')}
          />
          <label htmlFor="consent" className="text-sm text-slate-600">
            Acepto ser contactado por Kunan Salud Ecuador.
          </label>
        </div>
        {errors.consent && <p className="sm:col-span-2 text-sm text-red-600">{errors.consent.message}</p>}

        {submitError && (
          <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {submitError}
          </div>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-kunan-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition hover:bg-kunan-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kunan-primary disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? 'Enviando…' : 'Solicitar demo'}
          </button>
        </div>
      </form>
    </div>
  )
}
