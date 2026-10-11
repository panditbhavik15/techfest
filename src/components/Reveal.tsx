import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '../hooks'

type RevealProps = {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
