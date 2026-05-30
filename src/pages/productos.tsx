import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Award, Globe, Leaf,
  Flame, Droplets, Star, Package, MapPin } from
'lucide-react';

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

function InView({ children, className = '' }: {children: React.ReactNode;className?: string;}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>);

}

function AccentLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' as const }}
      style={{ originX: 0 }}
      className="h-0.5 w-12 mb-5 bg-[#1B3A6B]" />);


}

// ─── Data ─────────────────────────────────────────────────────────────────────
const variants = [
{
  id: 'joven',
  name: 'Elixír del Alma Mezcal Joven',
  subtitle: 'Mezcal Artesanal',
  tag: 'Joven',
  tagBg: 'bg-[#EEF2F8] text-[#1B3A6B]',
  imgSlot: '/assets/mezcaljoven.jpeg',
  abv: '40% Alc. Vol.',
  agave: 'Agave Espadín',
  region: 'Michoacán, México',
  process: 'Destilación artesanal en alambique de cobre',
  tasting: 'Notas de agave fresco, cítricos suaves y un final ahumado elegante.',
  sizes: ['375 ml', '750 ml'],
  featured: false,
  description: 'Expresión pura del agave Espadín oaxaqueño. Transparente, fresco y con un ahumado sutil que refleja la tradición mezcalera de México.',
  color: '#EEF2F8',
  accentColor: '#1B3A6B'
},
{
  id: 'anejo',
  name: 'Elixír del Alma Mezcal Añejo',
  subtitle: 'Mezcal Artesanal Reposado',
  tag: 'Añejo',
  tagBg: 'bg-[#C9A84C]/15 text-[#8B6914]',
  imgSlot: '/assets/mezcalanejo.jpeg',
  abv: '42% Alc. Vol.',
  agave: 'Agave Tobalá',
  region: 'Michoacán, México',
  process: 'Reposado en barricas de roble americano',
  tasting: 'Notas de vainilla, caramelo, madera tostada y agave maduro con final largo.',
  sizes: ['750 ml', 'Edición Especial 1L'],
  featured: true,
  description: 'Envejecido en barricas de roble americano, el Añejo desarrolla una complejidad excepcional. Ideal para conocedores que buscan profundidad y elegancia.',
  color: '#FDF6E3',
  accentColor: '#C9A84C'
},
{
  id: 'rose',
  name: 'Elixír del Alma Mezcal Rosé',
  subtitle: 'Mezcal Artesanal Premium',
  tag: 'Rosé',
  tagBg: 'bg-pink-50 text-pink-700',
  imgSlot: '/assets/mezcalrose.jpeg',
  abv: '38% Alc. Vol.',
  agave: 'Agave Espadín & Tobalá',
  region: 'Michoacán, México',
  process: 'Maceración con frutos rojos seleccionados',
  tasting: 'Notas florales, frutos rojos, agave suave y un final fresco y elegante.',
  sizes: ['375 ml', '750 ml'],
  featured: false,
  description: 'Una expresión contemporánea y sofisticada del mezcal artesanal. La maceración con frutos rojos crea un perfil único, moderno y visualmente impactante.',
  color: '#FFF0F3',
  accentColor: '#C9A84C'
},
{
  id: 'coco',
  name: 'Elíxir del alma Mezcal Coco Blend',
  subtitle: 'Mezcal Artesanal Premium',
  tag: 'Coco Blend',
  tagBg: 'bg-pink-50 text-pink-700',
  imgSlot: '/assets/mezcalcoco.jpeg',
  abv: '38% Alc. Vol.',
  agave: 'Agave Espadín & Tobalá',
  region: 'Michoacán, México',
  process: 'Maceración con frutos rojos seleccionados',
  tasting: 'Notas florales, frutos rojos, agave suave y un final fresco y elegante.',
  sizes: ['375 ml', '750 ml'],
  featured: false,
  description: 'Una expresión contemporánea y sofisticada del mezcal artesanal. La maceración con frutos rojos crea un perfil único, moderno y visualmente impactante.',
  color: '#FFF0F3',
  accentColor: '#C9A84C'

}];


const specs = [
{ Icon: Leaf, label: 'Tipo de Agave', key: 'agave' },
{ Icon: MapPin, label: 'Región', key: 'region' },
{ Icon: Flame, label: 'Proceso', key: 'process' },
{ Icon: Droplets, label: 'Graduación', key: 'abv' }];


const awards = [
{ year: '', title: 'Actualizando', org: '' },
{ year: '', title: 'Actualizando', org: '' },
{ year: '', title: 'Actualizando', org: '' }];


const distributors = [
{ region: 'México', channels: 'Retail especializado, restaurantes premium, bares de autor' },
{ region: 'Estados Unidos', channels: 'Importadores especializados, on-trade premium, e-commerce' },
{ region: 'Sudamérica', channels: 'Distribuidores regionales, duty-free, hoteles boutique' },
{ region: 'Europa', channels: 'En desarrollo — contactar para oportunidades' }];


// ─── Variant Card ─────────────────────────────────────────────────────────────
function VariantCard({ v, isActive, onClick



}: {v: typeof variants[0];isActive: boolean;onClick: () => void;}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(27,58,107,0.14)' }}
      transition={{ duration: 0.28 }}
      onClick={onClick}
      className={`group cursor-pointer rounded-sm overflow-hidden border transition-all duration-300 ${
      isActive ?
      'border-[#1B3A6B] shadow-[0_8px_40px_rgba(27,58,107,0.18)]' :
      'border-[#D4DCE8] hover:border-[#1B3A6B]/40'}`
      }>
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[#F7F9FC]">
        <motion.img
          src={v.imgSlot}
          alt={v.name}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/50 via-transparent to-transparent" />
        {v.featured &&
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#C9A84C] text-[#0D1B2E] px-3 py-1 text-xs font-bold tracking-wide rounded-sm">
            <Star size={10} />
            Premium
          </div>
        }
        <div className="absolute bottom-4 left-4">
          <span className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm ${v.tagBg}`}>
            {v.tag}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white p-6">
        <p className="text-[#5A7099] text-xs tracking-wide mb-1">{v.subtitle}</p>
        <h3 className="font-heading font-bold text-[#0D1B2E] text-xl mb-3 group-hover:text-[#1B3A6B] transition-colors duration-300">
          {v.name}
        </h3>
        <p className="text-[#5A7099] text-sm leading-relaxed mb-4 line-clamp-2">{v.description}</p>

        {/* Sizes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {v.sizes.map((s) =>
          <span key={s} className="px-3 py-1 border border-[#D4DCE8] text-[#5A7099] text-xs rounded-sm">
              {s}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#5A7099] text-xs">{v.abv}</span>
          <span className={`flex items-center gap-1 text-xs font-semibold transition-colors duration-200 ${isActive ? 'text-[#1B3A6B]' : 'text-[#5A7099] group-hover:text-[#1B3A6B]'}`}>
            Ver detalle <ChevronRight size={12} />
          </span>
        </div>
        <div className={`mt-4 h-0.5 bg-[#1B3A6B] transition-all duration-400 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
      </div>
    </motion.div>);

}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductosPage() {
  const { t } = useTranslation();
  const [activeVariant, setActiveVariant] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleVariantClick = (id: string) => {
    setActiveVariant((prev) => prev === id ? null : id);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const active = variants.find((v) => v.id === activeVariant);

  return (
    <>
      <Helmet>
        <title>{t('productos.meta_title')}</title>
        <meta name="description" content={t('productos.meta_desc')} />
        <meta name="keywords" content="Elixír del Alma Mezcal, mezcal artesanal mexicano, mezcal premium Michoacán, mezcal joven añejo rosé, mezcal exportación, Grupo Palenkke productos" />
        <link rel="canonical" href="https://www.palenkke.org/productos" />
        <meta property="og:title" content={t('productos.meta_title')} />
        <meta property="og:description" content={t('productos.meta_desc')} />
        <meta property="og:image" content="https://www.palenkke.org/airo-assets/images/pages/productos/hero" />
        <meta property="og:url" content="https://www.palenkke.org/productos" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('productos.meta_title')} />
        <meta name="twitter:description" content={t('productos.meta_desc')} />
        <meta name="twitter:image" content="https://www.palenkke.org/airo-assets/images/pages/productos/hero" />
        <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Palenkke Mezcal',
            description: t('productos.meta_desc'),
            brand: {
              '@type': 'Brand',
              name: 'Palenkke Mezcal'
            },
            manufacturer: {
              '@type': 'Organization',
              name: 'Grupo Palenkke',
              url: 'https://www.palenkke.org'
            },
            countryOfOrigin: 'MX',
            image: 'https://www.palenkke.org/airo-assets/images/pages/productos/hero',
            url: 'https://www.palenkke.org/productos'
          })}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-[#0D1B2E]">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/mezcalesbg.png"
            alt=""
            className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/80 to-[#0D1B2E]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-[#0D1B2E]/50" />
        </div>

        {/* Warm amber glow */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[120px] pointer-events-none" />

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="prod-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#prod-grid)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-24 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('nav.products')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">
                {t('productos.hero_eyebrow')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-7xl font-heading text-white leading-tight mb-4" style={{ color: "#c9a84c" }}>
              {t('productos.hero_heading_line1')}<br />
              <span className="text-white">{t('productos.hero_heading_line2')}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-lg mb-10">
              {t('productos.hero_sub')}
            </motion.p>

            <motion.div variants={stagger} className="flex flex-wrap gap-4">
              {[
              { Icon: Leaf, label: 'Agave Seleccionado' },
              { Icon: Flame, label: 'Proceso Artesanal' },
              { Icon: Globe, label: 'Distribución Internacional' },
              { Icon: Award, label: 'Reconocimiento Premium' }].
              map(({ Icon, label }) =>
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-2 px-4 py-2 border border-white/15 text-white/60 text-xs rounded-sm hover:border-white/30 hover:text-white/80 transition-all duration-200">
                
                  <Icon size={12} className="text-[#C9A84C]" />
                  {label}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND INTRO ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <InView>
              <AccentLine />
              <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
                La Marca
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-6">
                {t('productos.about_heading')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-5">
                {t('productos.about_p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-8">
                {t('productos.about_p2')}
              </motion.p>
              <motion.div variants={stagger} className="grid grid-cols-3 gap-4">
                {[
                { value: '100%', label: 'Artesanal' },
                { value: 'Michoacán', label: 'Origen' },
                { value: '3', label: 'Variantes' }].
                map(({ value, label }) =>
                <motion.div key={label} variants={fadeUp} className="text-center p-4 bg-[#EEF2F8] rounded-sm">
                    <span className="block font-heading text-2xl font-bold text-[#1B3A6B] mb-1">{value}</span>
                    <span className="block text-[#5A7099] text-xs">{label}</span>
                  </motion.div>
                )}
              </motion.div>
            </InView>

            {/* Right: Agave field */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }}
              className="relative">
              
              <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(27,58,107,0.12)] group">
                <motion.img
                  src="/airo-assets/images/pages/productos/agave-field"
                  alt="Campos de agave en Michoacán"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' as const }}
                  className="w-full h-[420px] object-cover object-[center_70%]" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/40 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-[#C9A84C] text-[#0D1B2E] p-5 rounded-sm shadow-xl">
                
                <span className="block font-heading text-2xl font-bold">Michoacán</span>
                <span className="block text-[#0D1B2E]/70 text-xs mt-0.5">México · Origen</span>
              </motion.div>
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#1B3A6B]/20 rounded-tl-sm pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-14">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              Colección
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-white leading-tight">Variantes

            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-lg mt-3 max-w-xl">
              Selecciona una variante para explorar sus características, notas de cata y presentaciones disponibles.
            </motion.p>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {variants.map((v) =>
              <VariantCard
                key={v.id}
                v={v}
                isActive={activeVariant === v.id}
                onClick={() => handleVariantClick(v.id)} />

              )}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── VARIANT DETAIL ────────────────────────────────────────────────── */}
      <div ref={detailRef}>
        {active &&
        <motion.section
          key={active.id}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="py-24 bg-white border-t border-[#D4DCE8]">
          
            <div className="container mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left: Image */}
                <div>
                  <div className="overflow-hidden rounded-sm shadow-[0_16px_64px_rgba(27,58,107,0.12)] group mb-6">
                    <motion.img
                    src={active.imgSlot}
                    alt={active.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeOut' as const }}
                    className="w-full h-80 object-cover" />
                  
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Tasting notes */}
                  <div className="bg-[#EEF2F8] rounded-sm p-6 border-l-4 border-[#1B3A6B]">
                    <p className="text-[#1B3A6B] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Notas de Cata</p>
                    <p className="text-[#0D1B2E] text-sm leading-relaxed italic">"{active.tasting}"</p>
                  </div>
                </div>

                {/* Right: Detail */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm ${active.tagBg}`}>
                      {active.tag}
                    </span>
                    {active.featured &&
                  <span className="flex items-center gap-1 text-xs text-[#C9A84C] font-semibold">
                        <Star size={11} /> Premium
                      </span>
                  }
                  </div>

                  <h2 className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-2">
                    {active.name}
                  </h2>
                  <p className="text-[#5A7099] text-sm mb-6">{active.subtitle}</p>

                  <div className="h-px bg-[#D4DCE8] mb-8" />

                  <p className="text-[#5A7099] text-base leading-relaxed mb-8">{active.description}</p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {specs.map(({ Icon, label, key }) =>
                  <div key={key} className="flex items-start gap-3 p-4 bg-[#F7F9FC] rounded-sm border border-[#D4DCE8]">
                        <div className="w-8 h-8 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-[#1B3A6B]" />
                        </div>
                        <div>
                          <p className="text-[#5A7099] text-xs tracking-wide mb-0.5">{label}</p>
                          <p className="text-[#0D1B2E] text-sm font-medium">{active[key as keyof typeof active] as string}</p>
                        </div>
                      </div>
                  )}
                  </div>

                  {/* Sizes */}
                  <div className="mb-8">
                    <p className="text-[#5A7099] text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                      <Package size={12} className="text-[#1B3A6B]" />
                      Presentaciones Disponibles
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {active.sizes.map((s) =>
                    <motion.span
                      key={s}
                      whileHover={{ backgroundColor: '#1B3A6B', color: 'white', borderColor: '#1B3A6B' }}
                      transition={{ duration: 0.2 }}
                      className="px-5 py-2.5 border border-[#D4DCE8] text-[#0D1B2E] text-sm font-medium rounded-sm cursor-default">
                      
                          {s}
                        </motion.span>
                    )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                    to="/contacto"
                    className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#1B3A6B] text-white font-semibold text-sm tracking-wide uppercase hover:bg-[#142d54] transition-all duration-300 rounded-sm shadow-[0_4px_16px_rgba(27,58,107,0.25)] hover:-translate-y-0.5">
                    
                      Solicitar Información
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                    onClick={() => setActiveVariant(null)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#D4DCE8] text-[#5A7099] font-semibold text-sm tracking-wide uppercase hover:border-[#1B3A6B] hover:text-[#1B3A6B] transition-all duration-300 rounded-sm">
                    
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        }
      </div>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0D1B2E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="proc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#proc-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#C9A84C]/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Process image */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }}
              className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.3)] group">
              
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="overflow-hidden">

              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[420px] object-cover">
                
                <source src="/assets/mezcal-process.mp4" type="video/mp4" />
              </video>
            </motion.div>
              
            </motion.div>

            {/* Right: Process steps */}
            <InView>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">Proceso Artesanal</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-white leading-tight mb-8">
                Del Agave a la Botella
              </motion.h2>

              <motion.div variants={stagger} className="space-y-5">
                {[
                { num: '01', title: 'Selección del Agave', desc: 'Agaves maduros seleccionados a mano en los campos de Michoacán, respetando los tiempos naturales de la planta.' },
                { num: '02', title: 'Cocción Tradicional', desc: 'Las piñas se cuecen en hornos de tierra con leña de encino, proceso que define el carácter ahumado único.' },
                { num: '03', title: 'Molienda y Fermentación', desc: 'Molienda en tahona de piedra y fermentación natural en tinas de madera con levaduras silvestres.' },
                { num: '04', title: 'Destilación en Cobre', desc: 'Doble destilación en alambiques de cobre artesanales para obtener un mezcal limpio y expresivo.' }].
                map(({ num, title, desc }) =>
                <motion.div
                  key={num}
                  variants={fadeUp}
                  className="flex gap-5 group">
                  
                    <span className="text-[#C9A84C]/40 text-xs font-mono tracking-widest mt-1 shrink-0 group-hover:text-[#C9A84C]/70 transition-colors">{num}</span>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#C9A84C] transition-colors duration-300">{title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </InView>
          </div>
        </div>
      </section>

      {/* ── AWARDS ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-14 text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#C9A84C]" />
            </motion.div>
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              Reconocimientos
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,44px)] font-bold text-[#0D1B2E] leading-tight">
              Premios y Distinciones
            </motion.h2>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {awards.map((_award, idx) =>
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(201,168,76,0.12)' }}
                transition={{ duration: 0.25 }}
                className="group bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm p-6 text-center hover:border-[#C9A84C]/40 transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 bg-[#C9A84C]/10 rounded-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Award size={18} className="text-[#C9A84C]" />
                  </div>
                  <h4 className="text-[#5A7099] font-medium text-sm italic tracking-wide">Actualizando</h4>
                </motion.div>
              )}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── DISTRIBUTION ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-14">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              Distribución
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,44px)] font-bold text-[#0D1B2E] leading-tight">
              Presencia Internacional
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-lg mt-3 max-w-xl">
              Elixír del Alma Mezcal está disponible en mercados clave a través de canales especializados.
            </motion.p>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {distributors.map(({ region, channels }) =>
              <motion.div
                key={region}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(27,58,107,0.10)' }}
                transition={{ duration: 0.25 }}
                className="group bg-white border border-[#D4DCE8] rounded-sm p-6 hover:border-[#1B3A6B]/30 transition-all duration-300 cursor-default">
                
                  <div className="flex items-center gap-2 mb-4">
                    <Globe size={14} className="text-[#1B3A6B]" />
                    <h4 className="text-[#0D1B2E] font-semibold text-sm group-hover:text-[#1B3A6B] transition-colors duration-300">{region}</h4>
                  </div>
                  <p className="text-[#5A7099] text-sm leading-relaxed">{channels}</p>
                  <div className="mt-5 h-0.5 bg-[#1B3A6B]/0 group-hover:bg-[#1B3A6B]/20 transition-all duration-500 w-0 group-hover:w-full" />
                </motion.div>
              )}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#1B3A6B] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="25%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="8%" y1="0" x2="33%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="100%" y1="0" x2="75%" y2="100%" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[200px] bg-[#2E5FA3]/40 blur-[80px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-6 lg:px-10 text-center">
          <InView>
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#C9A84C]" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight mb-5 max-w-2xl mx-auto">
              ¿Interesado en distribuir Palenkke Mezcal?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
              Buscamos distribuidores y socios estratégicos en mercados internacionales. Contáctanos para conocer las oportunidades disponibles.
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5">
                  
                  Ser Distribuidor
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/casos"
                  className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm">
                  
                  Ver Casos de Éxito
                </Link>
              </motion.div>
            </motion.div>
          </InView>
        </div>
      </section>
    </>);

}