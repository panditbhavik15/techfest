import { Bot, Brain, Cpu, Dna } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './ui'
import { hudLabel } from '../lib/styles'

const MODULES = [
  {
    id: 'MOD-01',
    code: 'NEURAL',
    icon: Brain,
    title: 'Neural Integration',
    description:
      'Explore the connection between human cognition and intelligent machine systems through direct signal interfaces.',
    status: 'Link calibrated',
  },
  {
    id: 'MOD-02',
    code: 'KINETIC',
    icon: Bot,
    title: 'Cybernetic Robotics',
    description:
      'Discover advanced robotic systems inspired by human movement, balance and mechanical adaptability.',
    status: 'Servos synced',
  },
  {
    id: 'MOD-03',
    code: 'COGNITION',
    icon: Cpu,
    title: 'Artificial Intelligence',
    description:
      'Experience predictive interfaces, adaptive reasoning and machine learning concepts rendered as live systems.',
    status: 'Model online',
  },
  {
    id: 'MOD-04',
    code: 'AUGMENT',
    icon: Dna,
    title: 'Human Augmentation',
    description:
      'Explore fictional concepts that expand the possibilities of human-machine interaction and perception.',
    status: 'Bench active',
  },
]

export function Technology() {
  return (
    <section id="technology" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="glow-top absolute inset-x-0 top-0 -z-10 h-96"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="Core modules"
            title={
              <>
                Engineered for the{' '}
                <span className="bg-gradient-to-r from-neon to-plasma bg-clip-text text-transparent">future</span>
              </>
            }
            description="Four subsystems form the CYBERCORE experience — each one a fictional interpretation of where human-machine engineering is heading next."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {MODULES.map((module, index) => (
            <Reveal key={module.id} delay={index * 90} className="h-full">
              <ModuleCard module={module} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ModuleCard({ module }: { module: (typeof MODULES)[number] }) {
  const Icon = module.icon
  return (
    <article className="tech-card hud-panel group flex h-full flex-col p-7">
      <header className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center border border-neon/30 bg-neon/5 text-neon">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <p className="text-right font-mono text-[0.625rem] leading-relaxed tracking-[0.18em] text-steel uppercase">
          {module.id}
          <span className="block text-plasma">{module.code}</span>
        </p>
      </header>

      <h3 className="mt-7 text-xl text-ink">{module.title}</h3>
      <p className="mt-3 grow text-[0.9375rem] leading-relaxed text-steel">{module.description}</p>

      <footer className="mt-7 flex items-center justify-between border-t border-line/70 pt-4">
        <span className={hudLabel}>{module.status}</span>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-neon/60 shadow-[0_0_10px_currentColor] transition-transform duration-500 group-hover:scale-150"
        />
      </footer>
    </article>
  )
}
