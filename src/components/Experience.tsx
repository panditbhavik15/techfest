import { ArrowRight, CircuitBoard, Network, Sparkles } from 'lucide-react'
import experienceLarge from '../assets/experience-neural-1280w.webp'
import experienceSmall from '../assets/experience-neural-768w.webp'
import { useState } from 'react'
import { btnPrimary, hudLabel } from '../lib/styles'
import { Reveal } from './Reveal'
import { SectionHeading } from './ui'

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: 'Adaptive Intelligence',
    text: 'Interfaces that learn intent and respond before the command is finished.',
  },
  {
    icon: Network,
    title: 'Connected Systems',
    text: 'Every module shares one signal bus — vision, motion and reasoning in sync.',
  },
  {
    icon: CircuitBoard,
    title: 'Future-Ready Design',
    text: 'Modular hardware thinking, built to be extended instead of replaced.',
  },
]

export function Experience() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="experience" className="relative overflow-clip border-t border-line/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-first lg:order-none">
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-3 border border-line/50" />
            <div className="hud-panel hud-corner relative aspect-5/4 overflow-hidden">
              {imageFailed ? (
                <div
                  aria-hidden="true"
                  className="art-wash-alt absolute inset-0"
                />
              ) : (
                <img
                  src={experienceLarge}
                  srcSet={`${experienceSmall} 768w, ${experienceLarge} 1280w`}
                  sizes="(max-width: 1024px) 92vw, 560px"
                  alt="A hand with a chrome exoskeleton reaching toward a lattice of glowing cyan data nodes"
                  width={1280}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImageFailed(true)}
                  className="absolute inset-0 size-full object-cover"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent"
              />
              <div
                aria-hidden="true"
                className="anim-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-plasma/20 to-transparent"
              />
              <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4">
                <p className={hudLabel}>Link · 0.42 ms latency</p>
                <p className={hudLabel}>Cortex mesh v9</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              align="left"
              kicker="Immersive experience"
              title={
                <>
                  The next evolution{' '}
                  <span className="bg-gradient-to-r from-neon to-electric bg-clip-text text-transparent">
                    starts here
                  </span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-base text-steel sm:text-lg">
              Technology is no longer just a tool. It is becoming an extension of how we think, create, communicate,
              and experience the world.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-6">
            {HIGHLIGHTS.map((highlight, index) => (
              <Reveal key={highlight.title} delay={180 + index * 90}>
                <li className="group flex gap-5 border-l border-line pl-5 transition-colors duration-300 hover:border-neon/70">
                  <span className="mt-0.5 grid size-10 shrink-0 place-items-center border border-line bg-ink/5 text-neon transition-colors duration-300 group-hover:border-neon/50">
                    <highlight.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg text-ink">{highlight.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-steel">{highlight.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={460}>
            <a href="#technology" className={`${btnPrimary} mt-11`}>
              Discover the system
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
