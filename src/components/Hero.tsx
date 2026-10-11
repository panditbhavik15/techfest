import { useState } from 'react'
import { ArrowRight, ChevronDown, Cpu, Radio, ScanLine } from 'lucide-react'
import heroLarge from '../assets/hero-cyborg-1024w.webp'
import heroSmall from '../assets/hero-cyborg-640w.webp'
import { btnGhost, btnPrimary, hudLabel } from '../lib/styles'
import { Reveal } from './Reveal'
import { StatusPill } from './ui'

const PARTICLES = [
  { top: '16%', left: '6%', delay: '0s', duration: '9s' },
  { top: '72%', left: '12%', delay: '1.4s', duration: '11s' },
  { top: '34%', left: '28%', delay: '2.6s', duration: '8.5s' },
  { top: '84%', left: '42%', delay: '0.8s', duration: '12s' },
  { top: '22%', left: '62%', delay: '3.2s', duration: '10s' },
  { top: '58%', left: '78%', delay: '1.9s', duration: '9.5s' },
  { top: '12%', left: '90%', delay: '4.1s', duration: '13s' },
  { top: '88%', left: '88%', delay: '2.2s', duration: '8s' },
]

const READOUTS = [
  { icon: Cpu, label: 'AI core active' },
  { icon: Radio, label: 'Neural link stable' },
  { icon: ScanLine, label: 'Optical array nominal' },
]

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="home" className="relative isolate flex min-h-svh items-center overflow-clip pt-28 pb-24">
      <div aria-hidden="true" className="cyber-grid absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden="true" className="vignette absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {PARTICLES.map((particle) => (
          <span
            key={`${particle.top}-${particle.left}`}
            className="particle"
            style={{
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <StatusPill>System online</StatusPill>
              <p className={hudLabel}>Node 07 · Sector NEON-14 · Build 2.4.1</p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-8 text-[clamp(2.9rem,9vw,5.75rem)] leading-[0.92] font-bold tracking-[-0.02em] text-white">
              <span className="block">Humanity</span>
              <span className="relative block bg-gradient-to-r from-neon via-electric to-plasma bg-clip-text text-transparent">
                Redefined.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl font-display text-lg tracking-wide text-neon/90 sm:text-xl">
              Beyond the limits of biology. Enter the age of cybernetic evolution.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-4 max-w-xl text-base text-steel sm:text-lg">
              Where artificial intelligence meets human potential. Discover a new frontier of robotics, immersive
              technology, and machine intelligence.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#features" className={btnPrimary}>
                Initialize experience
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a href="#technology" className={btnGhost}>
                Explore technology
              </a>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line/70 pt-6">
              {READOUTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon className="size-4 text-neon/70" aria-hidden="true" />
                  <span className={hudLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-[34rem]">
          <div className="relative aspect-4/5">
            {/* Targeting interface */}
            <div
              aria-hidden="true"
              className="anim-spin-slow absolute inset-[-6%] rounded-full border border-dashed border-neon/25"
            />
            <div
              aria-hidden="true"
              className="anim-spin-rev absolute inset-[6%] rounded-full border border-plasma/20"
              style={{ borderStyle: 'dotted' }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-[-4%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent lg:block"
            />

            <div className="hud-panel hud-corner absolute inset-0 overflow-hidden">
              {imageFailed ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgb(46_230_255/0.35),transparent_60%),radial-gradient(ellipse_at_60%_80%,rgb(168_85_247/0.35),transparent_55%)]"
                />
              ) : (
                <img
                  src={heroLarge}
                  srcSet={`${heroSmall} 640w, ${heroLarge} 1024w`}
                  sizes="(max-width: 1024px) 90vw, 520px"
                  alt="Chrome-plated cyborg portrait with a glowing cyan optical eye and exposed biomechanical neck servos"
                  width={1024}
                  height={1280}
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setImageFailed(true)}
                  className="absolute inset-0 size-full object-cover object-center"
                />
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent"
              />
              <div
                aria-hidden="true"
                className="anim-scan absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-neon/20 to-transparent"
              />
            </div>

            {/* HUD annotations */}
            <div className="absolute -top-3 -left-3 hidden bg-void/80 px-3 py-1.5 ring-1 ring-neon/30 sm:block">
              <p className={hudLabel}>SYS · ONLINE</p>
            </div>
            <div className="absolute right-0 bottom-6 -left-4 flex items-center gap-3 sm:-left-8">
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-neon/50" />
              <p className={hudLabel}>Target lock · 98.4%</p>
            </div>
            <div className="absolute -right-3 top-16 hidden lg:block">
              <p className={`${hudLabel} [writing-mode:vertical-rl]`}>Neural link · stable</p>
            </div>
          </div>
        </Reveal>
      </div>

      <a
        href="#technology"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-steel transition-colors hover:text-neon md:flex"
      >
        <span className={hudLabel}>Scroll</span>
        <ChevronDown className="anim-bob size-5" aria-hidden="true" />
      </a>
    </section>
  )
}
