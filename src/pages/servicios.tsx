
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, type Variants } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Sparkles, Globe, TrendingUp,
  Package, Handshake, BarChart3, Layers, CheckCircle2,
  Rocket, Users, Target,
} from 'lucide-react';

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function InView({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

function InViewSingle({ children, variant = fadeUp, className = '' }: {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={variant} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
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
      className="h-0.5 w-12 mb-5 bg-[#1B3A6B]"
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    id: 'desarrollo-marcas',
    Icon: Sparkles,
    number: '01',
    title: 'Desarrollo de Marcas',
    subtitle: 'Brand Building Premium',
    desc: 'Creamos y posicionamos marcas con identidad sólida, diferenciación estratégica y presencia premium en mercados nacionales e internacionales.',
    features: [
      'Diagnóstico y estrategia de marca',
      'Identidad visual y naming',
      'Posicionamiento competitivo',
      'Arquitectura de marca',
      'Guías de estilo y manuales',
      'Lanzamiento y activación',
    ],
    imgSlot: '/assets/desarrollodemarca.png',
    color: '#EEF2F8',
    accent: '#1B3A6B',
    tag: 'Estrategia',
  },
  {
    id: 'incubacion',
    Icon: Rocket,
    number: '02',
    title: 'Incubación de Productos',
    subtitle: 'Product Incubation',
    desc: 'Acompañamos el ciclo completo de un producto: desde la idea hasta el mercado. Validamos, desarrollamos y lanzamos con metodología probada.',
    features: [
      'Validación de concepto y mercado',
      'Desarrollo de producto mínimo viable',
      'Prototipado y pruebas piloto',
      'Estrategia de go-to-market',
      'Financiamiento y estructura',
      'Escalamiento y crecimiento',
    ],
    imgSlot: '/assets/incubaciondeproducto.jpeg',
    color: '#FDF6E3',
    accent: '#C9A84C',
    tag: 'Innovación',
  },
  {
    id: 'comercializacion',
    Icon: TrendingUp,
    number: '03',
    title: 'Comercialización',
    subtitle: 'Sales & Market Access',
    desc: 'Abrimos canales de venta nacionales e internacionales. Conectamos marcas con distribuidores, retailers y plataformas de alto impacto.',
    features: [
      'Estrategia comercial multicanal',
      'Apertura de canales de distribución',
      'Negociación con retailers premium',
      'E-commerce y marketplaces',
      'Fuerza de ventas especializada',
      'Métricas y optimización continua',
    ],
    imgSlot: '/assets/comercializacion.jpeg',
    color: '#EEF2F8',
    accent: '#1B3A6B',
    tag: 'Ventas',
  },
  {
    id: 'expansion-internacional',
    Icon: Globe,
    number: '04',
    title: 'Expansión Internacional',
    subtitle: 'Global Market Entry',
    desc: 'Llevamos marcas mexicanas a los mercados más exigentes del mundo. Estrategia, regulación, distribución y posicionamiento en EE.UU., Sudamérica y Europa.',
    features: [
      'Análisis de mercados objetivo',
      'Cumplimiento regulatorio y legal',
      'Red de distribuidores internacionales',
      'Adaptación cultural y de producto',
      'Estrategia de precios internacionales',
      'Representación y alianzas locales',
    ],
    imgSlot: '/assets/expansion itnernacional.png',
    color: '#F0F0F8',
    accent: '#241b6b',
    tag: 'Global',
  },
  {
    id: 'alianzas-estrategicas',
    Icon: Handshake,
    number: '05',
    title: 'Alianzas Estratégicas',
    subtitle: 'Strategic Partnerships',
    desc: 'Conectamos empresas, inversionistas, productores y distribuidores para crear sinergias que generan valor sostenible y crecimiento compartido.',
    features: [
      'Identificación de socios estratégicos',
      'Estructuración de alianzas',
      'Negociación y acuerdos comerciales',
      'Joint ventures y co-inversiones',
      'Red de inversionistas calificados',
      'Gestión de relaciones de largo plazo',
    ],
    imgSlot: '/assets/mision.webp',
    color: '#FDF6E3',
    accent: '#C9A84C',
    tag: 'Alianzas',
  },
  {
    id: 'consultoria',
    Icon: BarChart3,
    number: '06',
    title: 'Consultoría Empresarial',
    subtitle: 'Business Consulting',
    desc: 'Diagnóstico profundo, estrategia personalizada y acompañamiento ejecutivo para empresas que buscan crecer, transformarse o internacionalizarse.',
    features: [
      'Diagnóstico organizacional',
      'Planeación estratégica',
      'Reestructura comercial',
      'Modelos de negocio y monetización',
      'Gestión del cambio',
      'Mentoría ejecutiva',
    ],
    imgSlot: '/assets/consultoria empresarial.jpeg',
    color: '#EEF2F8',
    accent: '#1B3A6B',
    tag: 'Consultoría',
  },
];

const process = [
  { num: '01', Icon: Target, title: 'Diagnóstico', desc: 'Análisis profundo de la marca, producto o empresa: mercado, competencia, fortalezas y oportunidades.' },
  { num: '02', Icon: Layers, title: 'Estrategia', desc: 'Diseño de un plan personalizado con objetivos claros, métricas definidas y hoja de ruta ejecutable.' },
  { num: '03', Icon: Users, title: 'Ejecución', desc: 'Implementación con equipo especializado, seguimiento continuo y ajustes ágiles según resultados.' },
  { num: '04', Icon: TrendingUp, title: 'Escalamiento', desc: 'Consolidación de resultados, expansión de canales y crecimiento sostenible a largo plazo.' },
];

const audiences = [
  { title: 'Inversionistas', desc: 'Oportunidades de inversión en marcas con alto potencial de crecimiento y retorno comprobado.', Icon: BarChart3 },
  { title: 'Socios Estratégicos', desc: 'Alianzas para co-desarrollar, co-distribuir o co-invertir en proyectos de alto impacto.', Icon: Handshake },
  { title: 'Distribuidores', desc: 'Acceso a un portafolio de marcas premium listas para distribución nacional e internacional.', Icon: Package },
  { title: 'Productores', desc: 'Incubación, desarrollo y comercialización de productos con visión global desde el origen.', Icon: Rocket },
];

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ s, reverse }: { s: typeof services[0]; reverse: boolean }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-[#D4DCE8] shadow-[0_4px_24px_rgba(27,58,107,0.07)] hover:shadow-[0_12px_48px_rgba(27,58,107,0.13)] transition-shadow duration-400 group`}>
      {/* Image side */}
      <InViewSingle variant={reverse ? fadeRight : fadeLeft} className={reverse ? 'lg:order-2' : ''}>
        <div className="relative h-72 lg:h-full min-h-[320px] overflow-hidden">
          <motion.img
            src={s.imgSlot}
            alt={s.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/50 via-transparent to-transparent" />
          {/* Number overlay */}
          <div className="absolute top-5 left-5">
            <span className="font-mono text-white/20 text-5xl font-bold leading-none select-none">{s.number}</span>
          </div>
          {/* Tag */}
          <div className="absolute bottom-5 left-5">
            <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase rounded-sm border border-white/20">
              {s.tag}
            </span>
          </div>
        </div>
      </InViewSingle>

      {/* Content side */}
      <InViewSingle variant={reverse ? fadeLeft : fadeRight} className={reverse ? 'lg:order-1' : ''}>
        <div className="bg-white p-8 lg:p-10 flex flex-col justify-center h-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.accent}15` }}>
              <s.Icon size={18} style={{ color: s.accent }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: s.accent }}>
              {s.subtitle}
            </span>
          </div>

          <h3 className="font-heading text-[clamp(22px,2.5vw,32px)] font-bold text-[#0D1B2E] leading-tight mb-4 group-hover:text-[#1B3A6B] transition-colors duration-300">
            {s.title}
          </h3>
          <p className="text-[#5A7099] text-base leading-relaxed mb-7">{s.desc}</p>

          {/* Features */}
          <ul className="space-y-2.5 mb-8">
            {s.features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#5A7099]">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: s.accent }} />
                {f}
              </li>
            ))}
          </ul>

          <Link
            to="/contacto"
            className="group/btn inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
            style={{ color: s.accent }}
          >
            Solicitar este servicio
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </InViewSingle>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiciosPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('servicios.meta_title')}</title>
        <meta name="description" content={t('servicios.meta_desc')} />
        <meta name="keywords" content="servicios Grupo Palenkke, desarrollo de marcas México, incubación productos, comercialización nacional, expansión internacional, estrategia de retail, marcas privadas" />
        <link rel="canonical" href="https://www.palenkke.org/servicios" />
        <meta property="og:title" content={t('servicios.meta_title')} />
        <meta property="og:description" content={t('servicios.meta_desc')} />
        <meta property="og:image" content="https://www.palenkke.org/airo-assets/images/pages/nosotros/hero" />
        <meta property="og:url" content="https://www.palenkke.org/servicios" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('servicios.meta_title')} />
        <meta name="twitter:description" content={t('servicios.meta_desc')} />
        <meta name="twitter:image" content="https://www.palenkke.org/airo-assets/images/pages/nosotros/hero" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Servicios de Desarrollo de Marcas',
          provider: {
            '@type': 'Organization',
            name: 'Grupo Palenkke',
            url: 'https://www.palenkke.org',
          },
          description: t('servicios.meta_desc'),
          url: 'https://www.palenkke.org/servicios',
          areaServed: ['MX', 'US', 'SA'],
          serviceType: ['Brand Development', 'Product Incubation', 'International Distribution', 'Retail Strategy'],
        })}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-[#0D1B2E]">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/somos.webp"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/88 to-[#0D1B2E]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-[#0D1B2E]/50" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="srv-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#srv-grid)" />
          </svg>
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] rounded-full bg-[#1B3A6B]/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#241b6b]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-24 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('nav.services')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">
                {t('servicios.hero_eyebrow')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[clamp(44px,7vw,92px)] font-bold text-white leading-tight mb-6"
            >
              {t('servicios.hero_heading').split(' ').slice(0, -1).join(' ')}<br />
              <span className="text-[#C9A84C]">{t('servicios.hero_heading').split(' ').slice(-1)[0]}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
              {t('servicios.hero_sub')}
            </motion.p>

            {/* Service pills */}
            <motion.div variants={stagger} className="flex flex-wrap gap-3">
              {['Desarrollo de Marcas', 'Incubación', 'Comercialización', 'Expansión Global', 'Alianzas', 'Consultoría'].map(label => (
                <motion.span
                  key={label}
                  variants={fadeUp}
                  className="px-4 py-2 border border-white/15 text-white/60 text-xs rounded-sm hover:border-white/30 hover:text-white/80 transition-all duration-200 cursor-default"
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* ── SERVICES LIST ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#F7F9FC]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-16">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              Portafolio de Servicios
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,52px)] font-bold text-[#0D1B2E] leading-tight">
              Soluciones para Cada Etapa
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-lg mt-3 max-w-xl">
              Trabajamos con marcas, productos y empresas en cualquier etapa de su desarrollo — desde la idea hasta la expansión global.
            </motion.p>
          </InView>

          <div className="space-y-8">
            {services.map((s, i) => (
              <ServiceCard key={s.id} s={s} reverse={i % 2 !== 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D1B2E] relative overflow-hidden">
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
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#1B3A6B]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-10">
          <InView className="mb-16 text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#C9A84C]" />
            </motion.div>
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              {t('servicios.methodology_eyebrow')}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-white leading-tight">
              {t('servicios.methodology_heading')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-lg mt-3 max-w-xl mx-auto">
              {t('servicios.methodology_sub')}
            </motion.p>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map(({ num, Icon, title, desc }, i) => (
                <motion.div
                  key={num}
                  variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(27,58,107,0.3)' }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-[#0D1B2E] border border-[#1B3A6B]/40 rounded-sm p-7 hover:border-[#2E5FA3]/60 transition-all duration-300 cursor-default overflow-hidden"
                >
                  {/* Step connector line */}
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-[#1B3A6B]/40 z-10" />
                  )}
                  <span className="block text-[#C9A84C]/20 font-mono text-4xl font-bold mb-5 group-hover:text-[#C9A84C]/40 transition-colors duration-300 leading-none">{num}</span>
                  <div className="w-10 h-10 bg-[#1B3A6B]/40 rounded-sm flex items-center justify-center mb-5 group-hover:bg-[#1B3A6B] transition-colors duration-300">
                    <Icon size={16} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2 group-hover:text-[#C9A84C] transition-colors duration-300">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── PARA QUIÉN ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-16 text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#1B3A6B]" />
            </motion.div>
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              {t('servicios.audiences_eyebrow')}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight">
              {t('servicios.audiences_heading')}
            </motion.h2>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {audiences.map(({ title, desc, Icon }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(27,58,107,0.11)' }}
                  transition={{ duration: 0.25 }}
                  className="group bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm p-7 hover:border-[#1B3A6B]/30 hover:bg-white transition-all duration-300 cursor-default"
                >
                  <div className="w-12 h-12 bg-[#EEF2F8] rounded-sm flex items-center justify-center mb-5 group-hover:bg-[#1B3A6B] transition-colors duration-300">
                    <Icon size={20} className="text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-[#0D1B2E] text-lg mb-3 group-hover:text-[#1B3A6B] transition-colors duration-300">{title}</h3>
                  <p className="text-[#5A7099] text-sm leading-relaxed">{desc}</p>
                  <div className="mt-5 h-0.5 bg-[#1B3A6B]/0 group-hover:bg-[#1B3A6B]/20 transition-all duration-500 w-0 group-hover:w-full" />
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <InView>
              <AccentLine />
              <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
                {t('servicios.cta_eyebrow')}
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-5">
                {t('servicios.cta_heading')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-8">
                {t('servicios.cta_sub')}
              </motion.p>
              <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4">
                <motion.div variants={fadeUp}>
                  <Link
                    to="/contacto"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1B3A6B] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#142d54] transition-all duration-300 rounded-sm shadow-[0_4px_20px_rgba(27,58,107,0.25)] hover:-translate-y-0.5"
                  >
                    {t('servicios.cta_button')}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Link
                    to="/casos"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-[#D4DCE8] text-[#5A7099] font-semibold text-sm tracking-wider uppercase hover:border-[#1B3A6B] hover:text-[#1B3A6B] transition-all duration-300 rounded-sm"
                  >
                    {t('servicios.cta_cases')}
                  </Link>
                </motion.div>
              </motion.div>
            </InView>

            {/* Right: Checklist */}
            <InView>
              <motion.div variants={fadeUp} className="bg-white border border-[#D4DCE8] rounded-sm p-8 shadow-[0_4px_24px_rgba(27,58,107,0.07)]">
                <p className="text-[#1B3A6B] text-xs font-semibold tracking-[0.2em] uppercase mb-6">Lo que incluye nuestra consulta inicial</p>
                <ul className="space-y-4">
                  {[
                    'Diagnóstico rápido de tu marca o producto',
                    'Identificación de oportunidades de mercado',
                    'Revisión de canales de distribución actuales',
                    'Análisis de posicionamiento competitivo',
                    'Propuesta de servicios personalizada',
                    'Hoja de ruta preliminar sin costo',
                  ].map(item => (
                    <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#5A7099]">
                      <CheckCircle2 size={15} className="text-[#1B3A6B] mt-0.5 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[#D4DCE8]">
                  <p className="text-[#5A7099] text-xs italic">
                    "La consulta inicial es completamente gratuita y sin compromiso. Nuestro objetivo es entender tu situación antes de proponer cualquier solución."
                  </p>
                </div>
              </motion.div>
            </InView>
          </div>
        </div>
      </section>
    </>
  );
}
