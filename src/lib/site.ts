export type NavItem = { label: string; href: string; sectionId: string }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'Technology', href: '#technology', sectionId: 'technology' },
  { label: 'Features', href: '#features', sectionId: 'features' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

export const REPO_URL = 'https://github.com/panditbhavik15/techfest'

export const SECTIONS = NAV_ITEMS.map((item) => item.sectionId)
