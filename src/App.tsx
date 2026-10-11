import { useEffect, useRef } from 'react'
import { CallToAction } from './components/CallToAction'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Stats } from './components/Stats'
import { SystemInterface } from './components/SystemInterface'
import { Technology } from './components/Technology'
import { useFinePointer, useReducedMotion } from './hooks'

export default function App() {
  const glowRef = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!finePointer || reducedMotion) return
    let frame = 0
    let point = { x: 0, y: 0 }

    const apply = () => {
      frame = 0
      const node = glowRef.current
      if (!node) return
      node.style.setProperty('--mx', `${point.x}px`)
      node.style.setProperty('--my', `${point.y}px`)
    }

    const onPointerMove = (event: PointerEvent) => {
      point = { x: event.clientX, y: event.clientY }
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [finePointer, reducedMotion])

  return (
    <div className="relative min-h-svh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:border focus:border-neon focus:bg-void focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-[0.2em] focus:text-neon focus:uppercase"
      >
        Skip to content
      </a>

      <div
        ref={glowRef}
        aria-hidden="true"
        className={`pointer-glow pointer-events-none fixed inset-0 z-0 hidden lg:block ${
          finePointer && !reducedMotion ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <Stats />
        <Technology />
        <SystemInterface />
        <Experience />
        <CallToAction />
      </main>

      <Footer />
    </div>
  )
}
