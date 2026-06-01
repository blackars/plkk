import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
  }

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/nosotros', label: t('nav.about') },
    { to: '/servicios', label: t('nav.services') },
    { to: '/casos', label: t('nav.cases') },
    { to: '/productos', label: t('nav.products') },
    { to: '/galerias', label: t('nav.galleries') },
    { to: '/contacto', label: t('nav.contact') },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2E]/90 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="group shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A84C] focus-visible:outline-offset-2"
          >
            <img
              src="/assets/images/logos/palenkke-logo.png"
              alt="Grupo Palenkke"
              className="h-10 w-10 object-contain transition-all duration-300 ease-out group-hover:scale-110 group-hover:brightness-125 group-hover:drop-shadow-[0_0_14px_rgba(201,168,76,0.55)] active:scale-95"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors duration-200 rounded-sm ${
                  isActive(to)
                    ? 'text-[#C9A84C] bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-sm transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe size={13} />
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <Link
              to="/contacto#form"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0D1B2E] text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-[#b8983f] transition-colors"
            >
              {t('nav.cta')}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0D1B2E] border-t border-white/5">
          <nav className="container mx-auto px-6 py-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-sm font-semibold tracking-wide rounded-sm transition-colors ${
                  isActive(to)
                    ? 'text-[#C9A84C] bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => { toggleLang(); setOpen(false) }}
              className="flex items-center justify-center gap-2 mt-3 px-4 py-3 border border-white/15 text-white/60 text-sm font-semibold tracking-wider uppercase rounded-sm hover:border-white/30 hover:text-white transition-all"
            >
              <Globe size={14} />
              {i18n.language === 'es' ? 'English' : 'Español'}
            </button>
            <Link
              to="/contacto#form"
              onClick={() => setOpen(false)}
              className="block mt-3 px-4 py-3 bg-[#C9A84C] text-[#0D1B2E] text-sm font-bold tracking-wider uppercase rounded-sm text-center"
            >
              {t('nav.cta')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
