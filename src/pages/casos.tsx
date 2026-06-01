import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, type Variants } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Globe, MapPin, Sparkles,
  Rocket, Target, Award, Star, TrendingUp, Layers,
  Users, Handshake, BarChart3,
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

// ─── Market tag colour map ─────────────────────────────────────────────────
const MARKET_COLORS: Record<string, string> = {
  'México': 'bg-[#EEF2F8] text-[#1B3A6B]',
  'Mexico': 'bg-[#EEF2F8] text-[#1B3A6B]',
  'Sudamérica': 'bg-[#F0F7EE] text-[#2D6A4F]',
  'South America': 'bg-[#F0F7EE] text-[#2D6A4F]',
  'Asia': 'bg-[#FFF8EE] text-[#92400E]',
  'India': 'bg-[#FFF3E0] text-[#B45309]',
  'España': 'bg-[#FEF2F2] text-[#991B1B]',
  'Spain': 'bg-[#FEF2F2] text-[#991B1B]'
};

const LOGOS_BASE = '/assets/images/logos';

function resolveCompanyLogoSrc(name: string, logoId?: string): string | null {
  if (logoId) return `${LOGOS_BASE}/${logoId}.png`;
  return null;
}

// ─── CompanyLogo ─────────────────────────────────────────────────────────
function CompanyLogo({ name, logoId }: { name: string; logoId?: string }) {
  const logoImg = resolveCompanyLogoSrc(name, logoId);
  const [imgFailed, setImgFailed] = useState(false);

  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  if (logoImg && !imgFailed) {
    return (
      <motion.img
        src={logoImg}
        alt={`${name} logo`}
        className="max-h-56 max-w-full w-auto h-auto object-contain"
        onError={() => setImgFailed(true)}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1,
          transition: { duration: 0.3 }
        }}
      />
    );
  }

  return (
    <motion.span
      className="font-heading font-bold text-[clamp(2.5rem,8vw,4.5rem)] tracking-wider select-none text-[#1B3A6B]/25"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1,
        transition: { duration: 0.3 }
      }}
    >
      {initials}
    </motion.span>
  );
}

// ─── Projects data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'incubacion',
    Icon: Rocket,
    number: '01',
    title: 'Incubación de Productos Premium',
    subtitle: 'De la idea al mercado global',
    desc: 'Acompañamos productos desde la validación hasta su lanzamiento en mercados nacionales e internacionales, con metodología probada y red de distribución activa.',
    tag: 'Activo',
    imgSlot: '/assets/incubacionproductospremium.png',
  },
  {
    id: 'expansion',
    Icon: Globe,
    number: '02',
    title: 'Expansión Comercial Internacional',
    subtitle: 'Marcas mexicanas en el mundo',
    desc: 'Llevamos marcas a mercados estratégicos: EE.UU., Sudamérica, Europa y Asia. Gestión regulatoria, distribución y posicionamiento local.',
    tag: 'Activo',
    imgSlot: '/assets/expansioncomercialinternacional.png',
  },
  {
    id: 'branding',
    Icon: Sparkles,
    number: '03',
    title: 'Desarrollo de Marcas Premium',
    subtitle: 'Identidad y posicionamiento',
    desc: 'Construimos marcas con identidad sólida, diferenciación estratégica y presencia premium. Desde el naming hasta la activación comercial.',
    tag: 'Activo',
    imgSlot: '/assets/desarrollodemarcaspremium.png',
  },
  {
    id: 'alianzas',
    Icon: Handshake,
    number: '04',
    title: 'Alianzas Estratégicas',
    subtitle: 'Sinergias de alto impacto',
    desc: 'Conectamos productores, inversionistas y distribuidores para crear ecosistemas de negocio sostenibles con proyección internacional.',
    tag: 'En Desarrollo',
    imgSlot: '/assets/alianzasestrategicas.png',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CasosPage() {
  const { t } = useTranslation();

  const companyItems: Array<{ name: string; logo?: string; tag: string; desc: string; website?: string | null; websiteLabel?: string | null; }> =
    t('companies.items', { returnObjects: true }) as Array<{ name: string; logo?: string; tag: string; desc: string; website?: string | null; websiteLabel?: string | null; }>;

  return (
    <>
      <Helmet>
        <title>{t('casos.meta_title', 'Marcas y Proyectos — Grupo Palenkke')}</title>
        <meta name="description" content={t('casos.meta_desc', 'Conoce las marcas y proyectos de Grupo Palenkke: Elixír del Alma, San Rojo, Kanan, Palenkke Mezcal y más. Desarrollo, incubación y expansión internacional.')} />
        <meta name="keywords" content="Grupo Palenkke, marcas, proyectos, Elixír del Alma, San Rojo, Kanan, Palenkke Mezcal, Koldvolt, Ritevolt, Heartfulcraft, incubación, expansión internacional" />
        <link rel="canonical" href="https://www.palenkke.org/casos" />
        <meta property="og:title" content="Marcas y Proyectos — Grupo Palenkke" />
        <meta property="og:description" content="Conoce las marcas y proyectos de Grupo Palenkke." />
        <meta property="og:image" content="https://www.palenkke.org/airo-assets/images/pages/home/hero" />
        <meta property="og:url" content="https://www.palenkke.org/casos" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Marcas y Proyectos — Grupo Palenkke" />
        <meta name="twitter:description" content="Conoce las marcas y proyectos de Grupo Palenkke." />
        <meta name="twitter:image" content="https://www.palenkke.org/airo-assets/images/pages/home/hero" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Marcas y Proyectos — Grupo Palenkke',
          description: 'Portafolio de marcas y proyectos incubados, desarrollados y distribuidos por Grupo Palenkke.',
          url: 'https://www.palenkke.org/casos',
          publisher: {
            '@type': 'Organization',
            name: 'Grupo Palenkke',
            url: 'https://www.palenkke.org',
          },
        })}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-[#0D1B2E]">
        <div className="absolute inset-0">
          <img
            src="/airo-assets/images/pages/home/hero"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/90 to-[#0D1B2E]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-[#0D1B2E]/60" />
        </div>

        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[120px] pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="casos-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#casos-grid)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-20 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('nav.casos', 'Marcas y Proyectos')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">
                Portafolio
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[clamp(44px,7vw,92px)] font-bold text-white leading-tight mb-6"
            >
              Nuestras Marcas<br />
              <span className="text-[#C9A84C]">y Proyectos</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
              Conoce el portafolio de marcas y proyectos que forman parte de Grupo Palenkke. Innovación, tradición y expansión global.
            </motion.p>

            <motion.div variants={stagger} className="flex flex-wrap gap-4">
              {[
                { Icon: Award, label: 'Marcas Premium' },
                { Icon: Globe, label: 'Proyección Global' },
                { Icon: Rocket, label: 'Incubación Activa' },
                { Icon: Users, label: 'Equipo Estratégico' },
              ].map(({ Icon, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-2 px-4 py-2 border border-white/15 text-white/60 text-xs rounded-sm hover:border-white/30 hover:text-white/80 transition-all duration-200"
                >
                  <Icon size={12} className="text-[#C9A84C]" />
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── NUESTRAS MARCAS ───────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-16 max-w-2xl">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              Marcas Integradas
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(32px,4.5vw,56px)] font-bold text-[#0D1B2E] leading-tight">
              {t('companies.heading', 'Compañías del Grupo')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-base mt-4 leading-relaxed">
              Cada marca representa una historia de calidad, identidad y visión. Conoce las empresas que integran nuestro portafolio.
            </motion.p>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyItems.map((co, idx) => {
                const tagColor = MARKET_COLORS[co.tag] ?? 'bg-[#EEF2F8] text-[#1B3A6B]';
                const hasWebsite = co.website && co.website !== null;
                const isComingSoon = !co.website && co.websiteLabel !== null && co.websiteLabel !== undefined;

                const CardContent = (
                  <motion.div
                    key={co.name}
                    variants={fadeUp}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`group relative flex flex-col min-h-[300px] overflow-hidden rounded-sm bg-white transition-all duration-300 ${
                      hasWebsite || isComingSoon
                        ? 'cursor-pointer'
                        : 'cursor-default'
                    }`}
                  >
                    <div className="flex-[2] min-h-[160px] flex items-center justify-center px-5 pt-5 pb-2">
                      <motion.div
                        whileHover={{
                          y: -8,
                          scale: 1.05,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <CompanyLogo name={co.name} logoId={co.logo} />
                      </motion.div>
                    </div>

                    <div className="flex-[1] flex flex-col px-5 pb-5 pt-1 min-h-0">
                      <span className={`inline-block self-start px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-sm mb-2 ${tagColor}`}>
                        {co.tag}
                      </span>

                      <h3 className="font-heading font-bold text-base leading-snug mb-1.5 text-[#0D1B2E] group-hover:text-[#1B3A6B] transition-colors duration-300">
                        {co.name}
                      </h3>

                      <p className="text-xs leading-relaxed flex-1 text-[#5A7099] line-clamp-3">
                        {co.desc}
                      </p>

                      {(hasWebsite || isComingSoon) && (
                        <div className={`mt-3 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                          hasWebsite ? 'text-[#1B3A6B] group-hover:text-[#C9A84C]' : 'text-[#9AAAC0]'
                        }`}>
                          <Globe size={10} />
                          <span className="truncate max-w-[160px]">{co.websiteLabel}</span>
                          {hasWebsite && <ArrowRight size={9} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />}
                        </div>
                      )}

                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="mt-3 h-px bg-[#1B3A6B]/20"
                      />
                    </div>
                  </motion.div>
                );

                return hasWebsite ? (
                  <a key={co.name} href={co.website!} target="_blank" rel="noopener noreferrer" className="block no-underline">
                    {CardContent}
                  </a>
                ) : (
                  <div key={co.name}>{CardContent}</div>
                );
              })}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── PROYECTOS ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-16">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              Iniciativas
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight">
              Proyectos Destacados
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-lg mt-3 max-w-xl">
              Proyectos estratégicos en desarrollo, incubación y expansión internacional.
            </motion.p>
          </InView>

          <div className="space-y-8">
            {projects.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <InViewSingle key={p.id} variant={fadeUp}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-[#D4DCE8] shadow-[0_4px_24px_rgba(27,58,107,0.07)] hover:shadow-[0_12px_48px_rgba(27,58,107,0.13)] transition-shadow duration-400 group`}>
                    <InViewSingle variant={reverse ? fadeRight : fadeLeft} className={reverse ? 'lg:order-2' : ''}>
                      <div className="relative h-72 lg:h-full min-h-[320px] overflow-hidden">
                        <motion.img
                          src={p.imgSlot}
                          alt={p.title}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6, ease: 'easeOut' as const }}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/50 via-transparent to-transparent" />
                        <div className="absolute top-5 left-5">
                          <span className="font-mono text-white/20 text-5xl font-bold leading-none select-none">{p.number}</span>
                        </div>
                        <div className="absolute bottom-5 left-5">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm border border-white/20 ${
                            p.tag === 'Activo'
                              ? 'bg-[#2D6A4F]/80 text-white backdrop-blur-sm'
                              : 'bg-[#C9A84C]/80 text-[#0D1B2E] backdrop-blur-sm'
                          }`}>
                            {p.tag}
                          </span>
                        </div>
                      </div>
                    </InViewSingle>

                    <InViewSingle variant={reverse ? fadeLeft : fadeRight} className="bg-white p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0 group-hover:bg-[#1B3A6B] transition-colors duration-300">
                          <p.Icon size={16} className="text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-[#9AAAC0] text-xs font-mono tracking-widest">{p.number}</span>
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-[#0D1B2E] mb-2 group-hover:text-[#1B3A6B] transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-[#5A7099] text-sm mb-4">{p.subtitle}</p>
                      <div className="h-px bg-[#D4DCE8] mb-4" />
                      <p className="text-[#5A7099] text-sm leading-relaxed">{p.desc}</p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="mt-6 h-px bg-[#1B3A6B]/20"
                      />
                    </InViewSingle>
                  </div>
                </InViewSingle>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CIFRAS ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0D1B2E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stats-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#1B3A6B]/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-10">
          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto justify-items-center">
              {[
                { value: '7', label: 'Marcas en Portafolio' },
                { value: '17+', label: 'Años de Experiencia' },
                { value: '7', label: 'Mercados Internacionales' },
              ].map(({ value, label }) => (
                <motion.div key={label} variants={fadeUp} className="p-6 w-full max-w-[220px]">
                  <span className="block font-heading text-5xl font-bold text-[#C9A84C] mb-2">{value}</span>
                  <span className="block text-white/50 text-xs tracking-[0.2em] uppercase">{label}</span>
                </motion.div>
              ))}
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
              ¿Tienes una Marca o Proyecto que Quieras Impulsar?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
              En Grupo Palenkke convertimos ideas en negocios globales. Contáctanos para explorar cómo podemos colaborar.
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                >
                  Impulsar Proyecto
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm"
                >
                  Ver Servicios
                </Link>
              </motion.div>
            </motion.div>
          </InView>
        </div>
      </section>
    </>
  );
}
