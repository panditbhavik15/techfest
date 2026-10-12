import { useEffect, useRef } from 'react'
import { Infinity as InfinityIcon, Layers, ShieldCheck, Timer } from 'lucide-react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { hudLabel } from '../lib/styles'

type Metric = {
  icon: typeof ShieldCheck
  label: string
  value?: string
  unit?: string
  counter?: { target: number; decimals?: number }
}

const METRICS: Metric[] = [
  { icon: ShieldCheck, value: '99.9', unit: '%', label: 'System integrity', counter: { target: 99.9, decimals: 1 } },
  { icon: Timer, value: '24', unit: '/7', label: 'Neural processing', counter: { target: 24 } },
  { icon: Layers, value: 'AI-CORE', label: 'Intelligence engine' },
  { icon: InfinityIcon, value: '∞', label: 'Human potential' },
]

export function Stats() {
  const ref = useRef<HTMLUListElement>(null)
  const active = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section aria-label="Interface telemetry" className="relative border-y border-line bg-abyss/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ul ref={ref} className="grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <MetricCell key={metric.label} metric={metric} active={active} />
          ))}
        </ul>
        <p className="border-t border-line/60 py-3 text-center font-mono text-[0.5625rem] tracking-[0.2em] text-steel uppercase">
          Illustrative interface telemetry — fictional diagnostics, not real-world performance claims
        </p>
      </div>
    </section>
  )
}

function MetricCell({ metric, active }: { metric: Metric; active: boolean }) {
  const { icon: Icon, counter } = metric

  return (
    <li className="flex flex-col items-center gap-2 border-line/60 px-4 py-8 text-center max-lg:even:border-l max-lg:nth-[n+3]:border-t lg:border-l lg:first:border-l-0 lg:py-10">
      <Icon className="size-5 text-neon/70" aria-hidden="true" />
      <span className="font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
        {counter ? <Counter {...counter} active={active} /> : metric.value}
        {metric.unit ? <span className="text-neon">{metric.unit}</span> : null}
      </span>
      <span className={hudLabel}>{metric.label}</span>
    </li>
  )
}

/** Rendered as a motion value so the count-up never re-renders React per frame. */
function Counter({ target, decimals = 0, active }: { target: number; decimals?: number; active: boolean }) {
  const reduced = useReducedMotion()
  const value = useMotionValue(0)
  const display = useTransform(value, (current) => current.toFixed(decimals))

  useEffect(() => {
    if (!active) return
    if (reduced) {
      value.set(target)
      return
    }
    const controls = animate(value, target, { duration: 1.6, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [active, reduced, target, value])

  return <motion.span>{display}</motion.span>
}
