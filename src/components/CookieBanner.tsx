import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    // Load Plausible after consent
    const script = document.createElement('script')
    script.defer = true
    script.dataset.domain = 'palenkke.org'
    script.src = 'https://plausible.io/js/script.tagged-events.js'
    document.head.appendChild(script)
  }

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#0D1B2E] border border-[#1B3A6B]/40 rounded-sm p-6 shadow-[0_-8px_40px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-white text-sm font-semibold mb-1">Cookies & Privacidad</p>
            <p className="text-white/50 text-xs leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Al aceptar, cargamos Google Analytics y Plausible para métricas de uso.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={reject}
              className="px-4 py-2 text-xs font-semibold text-white/60 border border-white/15 rounded-sm hover:text-white hover:border-white/30 transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-xs font-semibold text-[#0D1B2E] bg-[#C9A84C] rounded-sm hover:bg-[#b8983f] transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
