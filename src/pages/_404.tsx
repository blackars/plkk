import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1B2E]">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white/90 font-heading">404</h1>
            <h2 className="text-2xl font-semibold text-white/90">
              Página No Encontrada
            </h2>
            <p className="text-white/60">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-3 bg-white text-[#1B3A6B] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Ir al Inicio
            </Link>
            <button
              className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-white/20"
              onClick={() => window.history.back()}
            >
              ← Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
