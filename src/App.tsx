import { useEffect } from 'react'
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { CallToAction } from './components/CallToAction'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Stats } from './components/Stats'
import { SystemInterface } from './components/SystemInterface'
import { Technology } from './components/Technology'
import { useFinePointer } from './hooks'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Page />
    </MotionConfig>
  )
}

function Page() {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion() ?? false
  const lit = finePointer && !reducedMotion

  const pointerX = useMotionValue(-999)
  const pointerY = useMotionValue(-999)
  const glowX = useSpring(pointerX, { stiffness: 140, damping: 30, mass: 0.4 })
  const glowY = useSpring(pointerY, { stiffness: 140, damping: 30, mass: 0.4 })
  const glow = useMotionTemplate`radial-gradient(340px circle at ${glowX}px ${glowY}px, var(--glow-soft), transparent 70%)`

  useEffect(() => {
    if (!lit) return
    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [lit, pointerX, pointerY])

  return (
    <div className="relative min-h-svh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:border focus:border-neon focus:bg-void focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-[0.2em] focus:text-neon focus:uppercase"
      >
        Skip to content
      </a>

      <motion.div
        aria-hidden="true"
        style={{ background: glow, opacity: lit ? 1 : 0 }}
        className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
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
