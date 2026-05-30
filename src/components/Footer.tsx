import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Instagram, Linkedin, Facebook, Mail, Globe, MapPin, Phone } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/socialConfig'

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
}

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0D1B2E] border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src="/assets/images/logos/palenkke-logo.png"
                alt="Grupo Palenkke"
                className="h-9 w-9 object-contain shrink-0"
              />
              <span className="text-white font-heading font-bold text-sm tracking-wide">Grupo Palenkke</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-5">{t('footer.tagline')}</p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ platform, label, href }) => {
                const Icon = PLATFORM_ICONS[platform]
                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 border border-white/10 rounded-sm flex items-center justify-center text-white/40 hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B] transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs tracking-wider uppercase mb-5">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li><Link to="/nosotros" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.about')}</Link></li>
              <li><Link to="/casos" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.cases')}</Link></li>
              <li><Link to="/productos" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.products')}</Link></li>
              <li><Link to="/galerias" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('nav.galleries')}</Link></li>
              <li><Link to="/legal" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.partnerships')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs tracking-wider uppercase mb-5">{t('footer.services_label')}</h4>
            <ul className="space-y-3">
              <li><Link to="/servicios" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.branding')}</Link></li>
              <li><Link to="/servicios" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.incubation')}</Link></li>
              <li><Link to="/servicios" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.distribution')}</Link></li>
              <li><Link to="/servicios" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">{t('footer.links.expansion')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs tracking-wider uppercase mb-5">{t('footer.contact_label')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-[#C9A84C] shrink-0" />
                <a href="mailto:contact@palenkke.org" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">contact@palenkke.org</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe size={13} className="text-[#C9A84C] shrink-0" />
                <a href="https://www.palenkke.org" target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">www.palenkke.org</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <span className="text-white/40 text-sm">México · USA · Centroamérica</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-[#C9A84C] shrink-0" />
                <a href="tel:+522281447372" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors">+52 228 144 7372</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            &copy; {year} Grupo Palenkke. {t('footer.rights')}
          </p>
          <div className="flex gap-4">
            <Link to="/legal" className="text-white/25 text-xs hover:text-white/50 transition-colors">Política de Privacidad</Link>
            <Link to="/legal" className="text-white/25 text-xs hover:text-white/50 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
