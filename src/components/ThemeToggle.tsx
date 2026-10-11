import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const label = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-line bg-ink/5 px-3 font-mono text-[0.625rem] tracking-[0.16em] text-mist uppercase transition-colors hover:border-neon/60 hover:text-neon sm:px-4"
    >
      {dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
      {/* `aria-label` carries the sentence at every width; the visible text shrinks so the
          fixed header never pushes the mobile menu button off screen. */}
      <span className="hidden md:inline">{label}</span>
      <span className="hidden sm:inline md:hidden">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
