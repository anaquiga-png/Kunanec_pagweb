import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import { deliverLead, isLeadDestinationConfigured } from '@/lib/lead-delivery'
import { supabaseConfigured } from '@/lib/supabaseClient'
import { metaTrackLead, trackFormStart, trackFormView, trackLeadSubmit } from '@/lib/tracking'
import { useUtmParams } from '@/hooks/useUtmParams'
import { leadFormSchema, type KunanLeadInsert, type LeadFormValues } from '@/types/lead'

const fieldClass =
  'mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-kunan-primary focus:ring-2 focus:ring-kunan-primary/20'

const labelClass = 'text-sm font-medium text-slate-700'

export function LeadForm() {
  const utm = useUtmParams()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const formStarted = useRef(false)
  const formViewSent = useRef(false)
  // threshold 0 + rootMargin: form_view debe dispararse apenas el form entra en viewport
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '0px 0px -10% 0px',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      consent: false,
    },
  })

  const markFormView = () => {
    if (formViewSent.current) return
    formViewSent.current = true
    trackFormView()
  }

  useEffect(() => {
    if (inView) markFormView()
  }, [inView])

  const markFormStart = () => {
    markFormView()
    if (formStarted.current) return
    formStarted.current = true
    trackFormStart()
  }

  const onValid = async (data: LeadFormValues) => {
    setSubmitError(null)
    // Garantiza form_view → form_start → qualify_lead en la misma sesión
    markFormStart()

    const landing = typeof window !== 'undefined' ? window.location.href : ''
    const row: KunanLeadInsert = {
      name: data.name,
      company: data.company,
      role: '',
      email: data.email,
      phone: data.phone || '',
      organization_type: '',
      user_volume: '',
      message: 'Solicitud de demo desde la web',
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

    const delivery = await deliverLead(row)

    if (!delivery.ok) {
      setSubmitError(
        'No pudimos enviar tu solicitud ahora. Por favor intenta de nuevo en un momento o escríbenos a ventas@kunansaludec.com / WhatsApp.',
      )
      console.warn('[LeadForm] delivery failed', delivery)
      return
    }

    if (supabaseConfigured && delivery.supabase === false) {
      console.warn('[LeadForm] Supabase falló; lead enviado por otro canal.', delivery)
    }
    if (delivery.hubspot !== true) {
      console.warn('[LeadForm] HubSpot no confirmó el lead.', delivery)
    }

    trackLeadSubmit({
      company: data.company,
      has_phone: Boolean(data.phone),
    })
    metaTrackLead()
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
      {!isLeadDestinationConfigured() && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Falta configurar un destino para leads: Supabase (`VITE_SUPABASE_*`) o HubSpot (`HUBSPOT_*` en Vercel).
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
          <p className="mt-1 text-sm text-slate-500">Déjanos tus datos y te contactamos a la brevedad.</p>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="name">
            Nombre completo
          </label>
          <input id="name" className={fieldClass} autoComplete="name" {...register('name')} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Correo corporativo
          </label>
          <input id="email" type="email" className={fieldClass} autoComplete="email" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="company">
            Empresa
          </label>
          <input id="company" className={fieldClass} autoComplete="organization" {...register('company')} />
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="phone">
            Teléfono / WhatsApp <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <input id="phone" type="tel" className={fieldClass} autoComplete="tel" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
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
