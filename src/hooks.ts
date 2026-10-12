import { useEffect, useState, useSyncExternalStore } from 'react'

const FINE_POINTER = '(pointer: fine)'

function subscribeFinePointer(onStoreChange: () => void) {
  const query = window.matchMedia(FINE_POINTER)
  query.addEventListener('change', onStoreChange)
  return () => query.removeEventListener('change', onStoreChange)
}

/** Desktop-style pointer, so cursor-reactive lighting is worth rendering. */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  )
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
