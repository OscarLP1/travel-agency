import Link from 'next/link'
import { Menu } from 'lucide-react'

const menuItems = [
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navigation() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Adventure Travel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="p-2 md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  )
} 