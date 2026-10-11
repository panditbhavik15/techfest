import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowUpRight, Sparkles, X } from 'lucide-react'
import { btnPrimary } from '../lib/styles'
import { REPO_URL } from '../lib/site'
import { Reveal } from './Reveal'
import { StatusPill } from './ui'

export function CallToAction() {
  const [open, setOpen] = useState(false)

  return (
    <section id="contact" className="relative overflow-clip py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="glow-center absolute inset-0 -z-10"
      />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="hud-panel hud-corner px-7 py-14 text-center sm:px-14">
            <div className="flex justify-center">
              <StatusPill tone="plasma">Uplink ready</StatusPill>
            </div>
            <h2 className="mt-8 text-[clamp(2.1rem,6vw,3.5rem)] text-ink">
              The future is{' '}
              <span className="bg-gradient-to-r from-neon via-electric to-plasma bg-clip-text text-transparent">
                not waiting.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-steel sm:text-lg">
              Step beyond conventional boundaries and explore the possibilities of a cybernetic world.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={() => setOpen(true)} className={btnPrimary}>
                <Sparkles className="size-4" aria-hidden="true" />
                Begin your evolution
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {open ? <EvolutionDialog onClose={() => setOpen(false)} /> : null}
    </section>
  )
}

function EvolutionDialog({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const opener = useRef<Element | null>(null)

  useEffect(() => {
    opener.current = document.activeElement
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      if (opener.current instanceof HTMLElement) opener.current.focus()
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button')
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  return (
    <div
      className="fixed inset-0 z-60 grid place-items-center bg-void/85 p-5 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="evolution-title"
        className="hud-panel hud-corner w-full max-w-lg p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-[0.625rem] tracking-[0.28em] text-neon uppercase">Transmission received</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 inline-flex size-10 items-center justify-center border border-line text-steel transition-colors hover:border-neon/60 hover:text-neon"
          >
            <span className="sr-only">Close dialog</span>
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <h3 id="evolution-title" className="mt-5 text-2xl text-ink sm:text-3xl">
          Welcome to CYBERCORE.
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel">
          This page is a concept landing experience for a futuristic technology festival — every readout you see is a
          design prototype. No account is created, no payment is taken and no data leaves your browser.
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel">
          Explore the interface, or read the source to see how it was built.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href={REPO_URL} target="_blank" rel="noreferrer" className={btnPrimary}>
            Open repository
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button type="button" onClick={onClose} className="inline-flex min-h-12 items-center px-2 font-mono text-xs tracking-[0.2em] text-steel uppercase transition-colors hover:text-ink">
            Return to interface
          </button>
        </div>
      </div>
    </div>
  )
}
