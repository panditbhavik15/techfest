import { useId, type ReactNode } from 'react'
import { eyebrow } from '../lib/styles'

export function Logo({
  href = '#home',
  label = 'CYBERCORE',
  compact = false,
}: {
  href?: string
  label?: string
  /** Drops the wordmark below `sm` so the fixed header keeps its controls reachable. */
  compact?: boolean
}) {
  const edge = useId()
  return (
    <a href={href} className="group inline-flex min-h-11 items-center gap-3" aria-label={`${label} — back to top`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9 shrink-0">
        <defs>
          <linearGradient id={edge} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: 'var(--color-neon)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-plasma)' }} />
          </linearGradient>
        </defs>
        <path
          d="M32 8 53 20v24L32 56 11 44V20Z"
          fill="none"
          stroke={`url(#${edge})`}
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="transition-opacity duration-300 group-hover:opacity-80"
        />
        <circle cx="32" cy="32" r="5" className="fill-neon" />
        <circle cx="32" cy="32" r="11" fill="none" className="stroke-neon" strokeOpacity="0.35" strokeWidth="1.5" />
        <path d="M20 26v12M44 26v12" className="stroke-electric" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      </svg>
      <span className={`font-display text-lg font-bold tracking-[0.3em] text-ink${compact ? ' hidden sm:inline' : ''}`}>
        {label.slice(0, 5)}
        <span className="text-neon">{label.slice(5)}</span>
      </span>
    </a>
  )
}

export function StatusDot({ tone = 'neon', className = '' }: { tone?: 'neon' | 'amber' | 'plasma'; className?: string }) {
  const color = tone === 'neon' ? 'text-neon' : tone === 'amber' ? 'text-amber' : 'text-plasma'
  return (
    <span
      aria-hidden="true"
      className={`anim-pulse inline-block size-2 rounded-full bg-current shadow-[0_0_10px_currentColor] ${color} ${className}`}
    />
  )
}

export function StatusPill({ children, tone = 'neon' }: { children: ReactNode; tone?: 'neon' | 'amber' | 'plasma' }) {
  const toneClass =
    tone === 'neon'
      ? 'border-neon/35 text-neon'
      : tone === 'amber'
        ? 'border-amber/40 text-amber'
        : 'border-plasma/40 text-plasma'
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border bg-void/60 px-3 py-1 font-mono text-[0.625rem] tracking-[0.2em] uppercase ${toneClass}`}
    >
      <StatusDot tone={tone} />
      {children}
    </span>
  )
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'center',
}: {
  kicker: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
}) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`${eyebrow} ${align === 'center' ? 'justify-center' : ''}`}>
        <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-neon/70" />
        {kicker}
      </p>
      <h2 className="mt-5 text-4xl text-ink sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base text-steel sm:text-lg">{description}</p> : null}
    </div>
  )
}
