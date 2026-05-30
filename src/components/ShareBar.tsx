import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Facebook } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/socialConfig'

interface ShareBarProps {
  url: string
  text: string
  theme?: 'dark' | 'light'
  label?: string
}

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
}

export default function ShareBar({ url, text, theme = 'light', label }: ShareBarProps) {
  const isDark = theme === 'dark'

  return (
    <div className="flex items-center gap-4">
      {label && (
        <span className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-white/40' : 'text-[#5A7099]'}`}>
          {label}
        </span>
      )}
      <div className="flex gap-2">
        {SOCIAL_LINKS.map(({ platform, label: socialLabel, href }) => {
          const Icon = PLATFORM_ICONS[platform]
          return (
            <a
              key={platform}
              href={`${href}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLabel}
              className={`w-9 h-9 rounded-sm flex items-center justify-center transition-colors duration-200 ${
                isDark
                  ? 'border border-white/15 text-white/50 hover:bg-white/10 hover:text-white'
                  : 'border border-[#D4DCE8] text-[#5A7099] hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B]'
              }`}
            >
              <Icon size={14} />
            </a>
          )
        })}
      </div>
    </div>
  )
}
