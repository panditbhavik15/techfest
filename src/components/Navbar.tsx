import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS, SECTIONS } from '../lib/site'
import { btnPrimary } from '../lib/styles'
import { useActiveSection } from '../hooks'
import { Logo, StatusPill } from './ui'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTIONS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-line bg-void/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Logo compact />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.sectionId
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-4 py-2 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive ? 'text-neon' : 'text-steel hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-neon to-transparent transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden xl:inline-flex">
            <StatusPill>System online</StatusPill>
          </span>
          {/* Wrapped rather than given `hidden sm:inline-flex`: btnPrimary already sets
              inline-flex, and Tailwind resolves that conflict by stylesheet order, not class order. */}
          <span className="hidden sm:inline-flex">
            <a href="#contact" className={btnPrimary}>
              Enter the system
            </a>
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-11 shrink-0 items-center justify-center border border-line bg-ink/5 text-mist transition-colors hover:border-neon/60 hover:text-neon lg:hidden"
          >
            <span className="sr-only">{open ? 'Close navigation menu' : 'Open navigation menu'}</span>
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        inert={!open}
        className={`border-t border-line bg-abyss/95 backdrop-blur-xl transition-[opacity,transform] duration-300 lg:hidden ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex min-h-12 items-center justify-between border-b border-line/60 py-3 font-mono text-sm tracking-[0.2em] uppercase transition-colors ${
                active === item.sectionId ? 'text-neon' : 'text-steel hover:text-ink'
              }`}
            >
              {item.label}
              <span aria-hidden="true" className="text-[0.625rem] text-steel">
                {item.sectionId.toUpperCase()}
              </span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`${btnPrimary} mt-5 w-full`}
          >
            Enter the system
          </a>
        </nav>
      </div>
    </header>
  )
}
