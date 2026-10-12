import { motion, useReducedMotion, type Transition, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
}

type RevealProps = {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const reduced = useReducedMotion()
  const transition: Transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
    delay: delay / 1000,
  }

  return (
    <motion.div
      className={className}
      variants={VARIANTS}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
