import type { ReactNode } from 'react'

type Props = {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
  innerClassName?: string
  as?: 'section' | 'div'
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  innerClassName = '',
  as: Tag = 'section',
}: Props) {
  const titleId = title ? `${id ?? 'section'}-title` : undefined
  return (
    <Tag
      id={id}
      className={`scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ${className}`}
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={`mx-auto max-w-6xl ${innerClassName}`}>
        {(eyebrow || title || description) && (
          <header className="mb-10 max-w-3xl space-y-3 lg:mb-14">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-kunan-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 id={titleId} className="text-3xl font-semibold tracking-tight text-kunan-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {description && <p className="text-lg text-kunan-muted">{description}</p>}
          </header>
        )}
        {children}
      </div>
    </Tag>
  )
}
