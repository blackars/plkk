import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import HomePage from '@/pages/index'
import NosotrosPage from '@/pages/nosotros'
import ServiciosPage from '@/pages/servicios'
import CasosPage from '@/pages/casos'
import ProductosPage from '@/pages/productos'
import GaleriasPage from '@/pages/galerias'
import ContactoPage from '@/pages/contacto'
import LegalPage from '@/pages/legal'
import NotFoundPage from '@/pages/_404'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[#0D1B2E]">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/casos" element={<CasosPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/galerias" element={<GaleriasPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/asociaciones" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
