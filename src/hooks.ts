import { useEffect, useRef, useState, type RefObject } from 'react'

function subscribeQuery(query: string, onChange: (matches: boolean) => void) {
  const mql = window.matchMedia(query)
  const handler = (event: MediaQueryListEvent) => onChange(event.matches)
  onChange(mql.matches)
  mql.addEventListener('change', handler)
  return () => mql.removeEventListener('change', handler)
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => subscribeQuery('(prefers-reduced-motion: reduce)', setReduced), [])
  return reduced
}

export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false)
  useEffect(() => subscribeQuery('(pointer: fine)', setFine), [])
  return fine
}

/** Fires once when the element scrolls into view; falls back to visible without IO support. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.15, rootMargin = '0px 0px -8% 0px' }: { threshold?: number; rootMargin?: string } = {},
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return inView
}

/** Eased count-up used by the telemetry strip. Snaps to the value when motion is reduced. */
export function useCountUp(target: number, { active, duration = 1600, decimals = 0 }: { active: boolean; duration?: number; decimals?: number }) {
  const [value, setValue] = useState(0)
  const reduced = useReducedMotion()
  const frame = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Number((target * eased).toFixed(decimals)))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [active, decimals, duration, reduced, target])

  return value.toFixed(decimals)
}

/** Tracks which section owns the viewport so the nav can highlight it. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)
    if (!nodes.length) return

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best) setActive(best)
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-15% 0px -35% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export const THEME_KEY = 'cybercore-theme'
export type Theme = 'light' | 'dark'

function storedTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

/** Light is the product default; only an explicit stored choice can start dark. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(storedTheme)

  useEffect(() => {
    const root = document.documentElement
    const dark = theme === 'dark'
    root.classList.toggle('dark', dark)
    root.style.colorScheme = theme
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#04060c' : '#ffffff')
    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* storage disabled — the theme still applies for this visit */
    }
  }, [theme])

  return {
    theme,
    toggleTheme: () => setTheme((value) => (value === 'dark' ? 'light' : 'dark')),
  }
}
