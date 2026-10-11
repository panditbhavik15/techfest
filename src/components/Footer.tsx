import { ArrowUpRight, Terminal } from 'lucide-react'
import { NAV_ITEMS, REPO_URL } from '../lib/site'
import { hudLabel } from '../lib/styles'
import { Logo, StatusDot } from './ui'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-abyss/80">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-steel">
            CYBERCORE is a concept technology-festival interface exploring cybernetic design, machine intelligence and
            the human-machine frontier — built as a front-end showcase, not a live service.
          </p>
          <p className={`${hudLabel} mt-6 flex items-center gap-2`}>
            <StatusDot />
            System status · all modules nominal
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs tracking-[0.24em] text-white uppercase">Navigation</h2>
          <ul className="mt-5 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center font-mono text-xs tracking-[0.16em] text-steel uppercase transition-colors hover:text-neon"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs tracking-[0.24em] text-white uppercase">Uplink</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-steel transition-colors hover:text-neon"
              >
                <Terminal className="size-4 shrink-0" aria-hidden="true" />
                github.com/panditbhavik15/techfest
                <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="#home"
                className="inline-flex min-h-11 items-center font-mono text-xs tracking-[0.16em] text-steel uppercase transition-colors hover:text-neon"
              >
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-xs tracking-wide text-steel/70">
            © {year} CYBERCORE · A fictional cybernetic interface concept. All rights reserved.
          </p>
          <p className={hudLabel}>Build 2.4.1 · Node 07</p>
        </div>
      </div>
    </footer>
  )
}
