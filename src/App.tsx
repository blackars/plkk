import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import HomePage from '@/pages/index'
import NosotrosPage from '@/pages/nosotros'
import ServiciosPage from '@/pages/servicios'
import CasosPage from '@/pages/casos'
import ProductosPage from '@/pages/productos'
import ProductoElixirPage from '@/pages/productos/producto-elixir'
import ProductoKananPage from '@/pages/productos/producto-kanan'
import ProductoPalenkkePage from '@/pages/productos/producto-palenkke'
import ProductoSanRojoPage from '@/pages/productos/producto-san-rojo'
import ProductoKoldvoltPage from '@/pages/productos/producto-koldvolt'
import ProductoRitevoltPage from '@/pages/productos/producto-ritevolt'
import ProductoHeartfulcraftPage from '@/pages/productos/producto-heartfulcraft'
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
          <Route path="/productos/elixir" element={<ProductoElixirPage />} />
          <Route path="/productos/kanan" element={<ProductoKananPage />} />
          <Route path="/productos/palenkke" element={<ProductoPalenkkePage />} />
          <Route path="/productos/san-rojo" element={<ProductoSanRojoPage />} />
          <Route path="/productos/koldvolt" element={<ProductoKoldvoltPage />} />
          <Route path="/productos/ritevolt" element={<ProductoRitevoltPage />} />
          <Route path="/productos/heartfulcraft" element={<ProductoHeartfulcraftPage />} />
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
