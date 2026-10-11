import { useState } from 'react'
import { Activity, Gauge, Power, Radar, Terminal } from 'lucide-react'
import { hudLabel } from '../lib/styles'
import { Reveal } from './Reveal'
import { SectionHeading, StatusDot } from './ui'

const BARS = [
  { label: 'Neural bandwidth', idle: 24, active: 96 },
  { label: 'Core throughput', idle: 18, active: 88 },
  { label: 'Signal integrity', idle: 42, active: 99 },
  { label: 'Thermal balance', idle: 30, active: 74 },
]

const INDICATORS = [
  { label: 'Power bus', standby: 'Idle', active: 'Nominal' },
  { label: 'Neural link', standby: 'Offline', active: 'Synced' },
  { label: 'Thermal', standby: 'Passive', active: 'Regulated' },
]

const LOG_STANDBY = [
  'boot sequence complete',
  'operator input required',
  'subsystems in low-power hold',
]

const LOG_ACTIVE = [
  'activation accepted',
  'neural link established',
  'cortex mesh synchronised',
  'all subsystems nominal',
]

export function SystemInterface() {
  const [active, setActive] = useState(false)

  return (
    <section id="features" className="relative border-t border-line/60 bg-abyss/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="Feature module // live interface"
            title={
              <>
                Interactive{' '}
                <span className="bg-gradient-to-r from-plasma to-neon bg-clip-text text-transparent">
                  cyber interface
                </span>
              </>
            }
            description="A working control panel — no mock data feeding you a story. Toggle the system and watch the diagnostics, telemetry and link graph respond."
          />
        </Reveal>

        <Reveal delay={140}>
          <div className="hud-panel hud-corner mt-14 grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <div className="flex flex-col items-center gap-8">
              <div className="radar relative size-64 shrink-0" data-active={active}>
                <div aria-hidden="true" className="absolute inset-0 rounded-full border border-line" />
                <div aria-hidden="true" className="absolute inset-[14%] rounded-full border border-line/80" />
                <div aria-hidden="true" className="absolute inset-[30%] rounded-full border border-line/60" />
                <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
                <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-line" />
                <div aria-hidden="true" className="radar-sweep absolute inset-0 rounded-full" />
                <div aria-hidden="true" className="absolute inset-[8%] rounded-full ring-1 ring-neon/20" />
                {[
                  { top: '22%', left: '62%' },
                  { top: '58%', left: '30%' },
                  { top: '70%', left: '68%' },
                  { top: '38%', left: '44%' },
                ].map((blip) => (
                  <span
                    key={`${blip.top}-${blip.left}`}
                    aria-hidden="true"
                    className={`anim-pulse absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      active ? 'bg-neon shadow-[0_0_12px_#2ee6ff]' : 'bg-steel/50'
                    }`}
                    style={{ top: blip.top, left: blip.left }}
                  />
                ))}
                <span className="absolute inset-x-0 bottom-[8%] text-center">
                  <Radar className={`mx-auto size-5 ${active ? 'text-neon' : 'text-steel/60'}`} aria-hidden="true" />
                </span>
              </div>

              <ul className="w-full space-y-3">
                {INDICATORS.map((indicator) => (
                  <li
                    key={indicator.label}
                    className="flex items-center justify-between border border-line/70 bg-void/50 px-4 py-2.5"
                  >
                    <span className={hudLabel}>{indicator.label}</span>
                    <span
                      className={`flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase ${
                        active ? 'text-neon' : 'text-amber'
                      }`}
                    >
                      <StatusDot tone={active ? 'neon' : 'amber'} />
                      {active ? indicator.active : indicator.standby}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="flex items-center gap-2 font-mono text-xs tracking-[0.24em] text-white uppercase">
                    <Gauge className="size-4 text-neon" aria-hidden="true" />
                    Diagnostics
                  </h3>
                  <p className={hudLabel}>{active ? 'Load: nominal' : 'Load: standby'}</p>
                </div>
                <div className="mt-5 space-y-5">
                  {BARS.map((bar) => {
                    const value = active ? bar.active : bar.idle
                    return (
                      <div key={bar.label}>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className={hudLabel}>{bar.label}</span>
                          <span className="font-mono text-xs text-mist tabular-nums">{value}%</span>
                        </div>
                        <div
                          role="progressbar"
                          aria-label={bar.label}
                          aria-valuenow={value}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          className="mt-2 h-2 overflow-hidden border border-line/70 bg-void/70"
                        >
                          <div
                            className={`h-full bg-gradient-to-r transition-[width] duration-1000 ease-out ${
                              active ? 'from-neon to-electric' : 'from-steel/40 to-steel/20'
                            }`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <LinkGraph active={active} />

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActive((value) => !value)}
                  className={`inline-flex min-h-12 items-center gap-3 border px-7 py-3 font-mono text-xs tracking-[0.22em] uppercase transition-colors duration-300 ${
                    active
                      ? 'border-neon bg-neon/15 text-neon shadow-[0_0_34px_-10px_rgb(46_230_255/0.9)]'
                      : 'border-line bg-white/[0.02] text-mist hover:border-neon/60 hover:text-neon'
                  }`}
                >
                  <Power className="size-4" aria-hidden="true" />
                  {active ? 'System active' : 'Activate system'}
                </button>
                <p
                  aria-live="polite"
                  className={`flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase ${
                    active ? 'text-neon' : 'text-steel'
                  }`}
                >
                  <Activity className="size-4" aria-hidden="true" />
                  {active
                    ? 'Status: cybernetic core online — all subsystems responding.'
                    : 'Status: standby — awaiting operator authorisation.'}
                </p>
              </div>

              <div className="border border-line/70 bg-void/60 p-4 font-mono text-xs leading-relaxed text-steel">
                <p className="flex items-center gap-2 text-[0.625rem] tracking-[0.2em] text-steel/70 uppercase">
                  <Terminal className="size-3.5" aria-hidden="true" />
                  system log
                </p>
                <ul className="mt-3 space-y-1">
                  {(active ? LOG_ACTIVE : LOG_STANDBY).map((line, index) => (
                    <li key={line}>
                      <span className="text-neon/70">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-steel/40"> › </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function LinkGraph({ active }: { active: boolean }) {
  const nodes = [
    { x: 40, y: 60, label: 'CORE' },
    { x: 160, y: 24, label: 'VIS' },
    { x: 160, y: 96, label: 'MOT' },
    { x: 280, y: 60, label: 'LINK' },
  ]
  const stroke = active ? '#2ee6ff' : '#1c2a45'

  return (
    <figure className="border border-line/70 bg-void/50 p-4">
      <figcaption className={hudLabel}>Connection topology</figcaption>
      <svg viewBox="0 0 320 120" className="mt-3 h-28 w-full" role="img" aria-label="Four node diagram linking the core to vision, motion and uplink modules">
        <g stroke={stroke} strokeWidth="1.5" fill="none" className={active ? 'anim-dash' : ''}>
          <path d="M40 60 L160 24" />
          <path d="M40 60 L160 96" />
          <path d="M160 24 L280 60" />
          <path d="M160 96 L280 60" />
        </g>
        {nodes.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r="7"
              fill={active ? '#2ee6ff' : '#0f1728'}
              stroke={active ? '#2ee6ff' : '#8ea3c4'}
              strokeWidth="1.5"
              className="transition-all duration-700"
            />
            <text
              x={node.x}
              y={node.y + 22}
              textAnchor="middle"
              className="font-mono"
              fontSize="9"
              letterSpacing="1.5"
              fill={active ? '#cfdcf0' : '#8ea3c4'}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
