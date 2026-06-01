import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, Globe, TrendingUp, MapPin,
  ChevronDown, Mail, Instagram, Linkedin, Facebook,
  Phone } from
'lucide-react';
import ShareBar from '@/components/ShareBar';
import { SOCIAL_LINKS } from '@/lib/socialConfig';
import { usePlausible } from '@/lib/usePlausible';

// ─── Cinematic phrases for hero ───────────────────────────────────────────────
function CinematicPhrase() {
  const { t } = useTranslation();
  const phrases: string[] = t('hero.phrases', { returnObjects: true }) as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 3800);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases.length]);

  return (
    <div className="h-7 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.7, ease: 'easeInOut' as const }}
          className="text-white/35 text-sm tracking-[0.18em] uppercase font-light absolute inset-0 flex items-center">
          
          {phrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>);

}

// ─── Palette ──────────────────────────────────────────────────────────────────
const BLUE_MID = '#2E5FA3';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const slideRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
};

// ─── InView Section ───────────────────────────────────────────────────────────
function InView({ children, className = '', variants = stagger













}: {children: React.ReactNode;className?: string; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants?: Record<string, any>;}) {const ref = useRef(null);const inView = useInView(ref, { once: true, margin: '-80px' });return <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      
      {children}
    </motion.div>;
}

// ─── Blue Accent Line ─────────────────────────────────────────────────────────
function AccentLine({ light = false }: {light?: boolean;}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' as const }}
      style={{ originX: 0 }}
      className={`h-0.5 w-12 mb-5 ${light ? 'bg-white/40' : 'bg-[#1B3A6B]'}`} />);


}

// ─── Eyebrow Label ────────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }: {children: React.ReactNode;light?: boolean;}) {
  return (
    <motion.span
      variants={fadeUp}
      className={`block text-xs font-semibold tracking-[0.25em] uppercase mb-3 ${light ? 'text-white/50' : `text-[${BLUE_MID}]`}`}
      style={{ color: light ? undefined : BLUE_MID }}>
      
      {children}
    </motion.span>);

}

// ─── Image with hover effects ─────────────────────────────────────────────────
function HoverImage({ src, alt, className = '' }: {src: string;alt: string;className?: string;}) {
  return (
    <div className={`overflow-hidden group relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="w-full h-full object-cover" />
      
      {/* Hover overlay shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1B3A6B]/0 to-[#2E5FA3]/0 group-hover:from-[#1B3A6B]/10 group-hover:to-[#2E5FA3]/5 transition-all duration-500 pointer-events-none" />
      {/* Bottom depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/40 via-transparent to-transparent pointer-events-none" />
    </div>);

}

// ─── Data ─────────────────────────────────────────────────────────────────────

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useTranslation();
  const trackEvent = usePlausible();


  const whyItems: Array<{num: string;title: string;desc: string;}> = t('why.items', { returnObjects: true }) as Array<{num: string;title: string;desc: string;}>;
  const headlineWords: string[] = t('hero.headline', { returnObjects: true }) as string[];



  const siteUrl = 'https://www.palenkke.org';
  const homeTitle = `Grupo Palenkke — ${t('hero.slogan')}`;
  const homeDesc = t('hero.description');
  const homeOgImage = `${siteUrl}/airo-assets/images/pages/home/hero`;

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Grupo Palenkke',
    url: siteUrl,
    logo: `${siteUrl}/airo-assets/images/logo/horizontal`,
    description: homeDesc,
    foundingDate: '2008',
    areaServed: ['MX', 'US', 'SA'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@palenkke.org',
      contactType: 'customer service'
    },
    sameAs: [
    'https://www.instagram.com/grupopalenkke',
    'https://www.linkedin.com/company/grupopalenkke']

  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Grupo Palenkke',
    url: siteUrl
  };

  return (
    <>
      <Helmet>
        <title>{homeTitle}</title>
        <meta name="description" content={homeDesc} />
        <meta name="keywords" content="Grupo Palenkke, desarrollo de marcas, comercialización, incubación de productos, expansión internacional, mezcal, distribución México, brand development Mexico" />
        <link rel="canonical" href={`${siteUrl}/`} />
        <meta property="og:title" content={homeTitle} />
        <meta property="og:description" content={homeDesc} />
        <meta property="og:image" content={homeOgImage} />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homeTitle} />
        <meta name="twitter:description" content={homeDesc} />
        <meta name="twitter:image" content={homeOgImage} />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      </Helmet>

      {/* ── HERO VIDEO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1B2E]">

        {/* ── Video background ── */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/airo-assets/images/pages/home/hero"
            className="w-full h-full object-cover">
            
            <source src="/airo-assets/videos/pages/home/hero" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0D1B2E]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E]/80 via-[#0D1B2E]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-[#0D1B2E]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,27,46,0.55)_100%)]" />
        </div>

        {/* ── Animated grid overlay ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] rounded-full bg-[#1B3A6B]/15 blur-[140px]" />
          <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#C9A84C]/5 blur-[100px]" />
        </div>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: 'easeOut' as const }}
          style={{ originY: 0 }}
          className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent pointer-events-none" />
        

            <motion.div variants={fadeUp} className="mb-5">
              <CinematicPhrase />
            </motion.div>

                    {/* ── HERO CONTENT ───────────────────────────────────────────── */}
          <div className="relative container mx-auto px-6 lg:px-10 pt-32 pb-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-5xl">



            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#C9A84C] shrink-0" />
              <span className="text-[#C9A84C] text-lg font-large semibold md:text-xl leading-relaxed">
                {t('hero.slogan')}
              </span>
            </motion.div>

            <motion.h1
              variants={stagger}
              className="font-heading text-[clamp(44px,7.5vw,108px)] font-bold leading-[0.93] tracking-tight text-white mb-4">
              
              {headlineWords.map((word, i) =>
              <motion.span
                key={i}
                variants={fadeUp}
                className={`block ${i === 2 ? 'text-[#C9A84C]' : ''}`}>
                
                  {word}
                </motion.span>
              )}
            </motion.h1>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 min-w-0 overflow-x-auto">
              <div className="h-px w-8 bg-[#FFFFFF] shrink-0" />
              <span className="text-[#FFFFFF] text-xs font-semibold tracking-[0.3em] uppercase whitespace-nowrap">
                {t('hero.geo')}
              </span>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="text-white/35 text-base md:text-lg leading-relaxed max-w-2xl mb-10 flex flex-col gap-5"
            >
              <p>
                Grupo PALENKKE es una plataforma nacional e internacional enfocada
                en el desarrollo de marcas, expansión comercial y posicionamiento
                estratégico en mercados nacionales e internacionales.
              </p>

              <p>
                Con más de 17 años de experiencia en retail nacional e internacional
                y desarrollo comercial, conectamos productos, productores y
                oportunidades con canales reales de crecimiento y distribución.
              </p>

              <p>
                Nuestra visión combina tradición, estrategia y expansión global
                para construir proyectos sólidos con identidad y proyección
                nacional e internacional.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="flex flex-col sm:flex-row flex-wrap gap-3 mb-12">
              {[
              { key: 'cta_primary', to: '/contacto', primary: true },
              { key: 'cta_opportunities', to: '/servicios', primary: false },
              { key: 'cta_brand', to: '/servicios', primary: false }].
              map(({ key, to, primary }) =>
              <motion.div key={key} variants={fadeUp}>
                  <Link
                  to={to}
                  onClick={() => trackEvent('CTA Click', { props: { label: key, page: '/', destination: to } })}
                  className={
                  primary ?
                  'group inline-flex items-center gap-3 px-8 py-4 bg-[#1B3A6B] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#2E5FA3] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(27,58,107,0.45)] hover:shadow-[0_12px_40px_rgba(27,58,107,0.55)] hover:-translate-y-0.5' :
                  'inline-flex items-center gap-3 px-6 py-4 border border-white/20 text-white/70 font-semibold text-sm tracking-wider uppercase hover:border-white/45 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-sm'
                  }>
                  
                    {t(`hero.${key}`)}
                    {primary && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </Link>
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-3">
              {[
              { key: 'cta_expand', to: '/servicios' },
              { key: 'cta_partner', to: '/contacto' }].
              map(({ key, to }) =>
              <motion.div key={key} variants={fadeUp}>
                  <Link
                  to={to}
                  className="inline-flex items-center gap-2 text-white/40 text-xs tracking-[0.15em] uppercase hover:text-[#C9A84C] transition-colors duration-300 group">
                  
                    <span className="w-4 h-px bg-current group-hover:w-6 transition-all duration-300" />
                    {t(`hero.${key}`)}
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Share bar */}
            <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-white/10">
              <ShareBar
                url="https://www.palenkke.org/"
                text="Grupo Palenkke — Impulsando marcas hacia el éxito global"
                theme="dark"
                label="Compartir" />
              
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          
          <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' as const }}>
            <ChevronDown size={16} className="text-white/25" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3.8, ease: 'linear' as const, repeat: Infinity }}
          style={{ originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent pointer-events-none" />
        
      </section>

      {/* ── SOBRE NOSOTROS ────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <InView>
              <AccentLine />
              <Eyebrow>{t('about.eyebrow')}</Eyebrow>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(32px,4.5vw,56px)] font-bold text-[#0D1B2E] leading-tight mb-6">
                {t('about.heading')}
              </motion.h2>
              <motion.div variants={fadeUp} className="text-[#5A7099] text-justify text-base leading-relaxed mb-5 flex flex-col gap-4">
                {t('about.p1').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </motion.div>
              <motion.div variants={fadeUp} className="text-[#5A7099] text-justify text-base leading-relaxed mb-10 flex flex-col gap-4">
                {t('about.p2').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </motion.div>
              <motion.div variants={stagger} className="flex flex-wrap gap-4">
                {[
                { label: 'México', Icon: MapPin },
                { label: 'USA', Icon: Globe },
                { label: 'Centroamérica', Icon: Globe },
                { label: 'Sudamérica', Icon: Globe },
                { label: 'Asia', Icon: TrendingUp },
                { label: 'España', Icon: TrendingUp },
                { label: 'India', Icon: TrendingUp }].
                map(({ label, Icon }) =>
                <motion.div key={label} variants={fadeUp} className="flex items-center gap-2 px-4 py-2 bg-[#EEF2F8] rounded-sm">
                    <Icon size={13} className="text-[#1B3A6B]" />
                    <span className="text-[#1B3A6B] text-sm font-medium">{label}</span>
                  </motion.div>
                )}
              </motion.div>
            </InView>

            <InView variants={slideRight}>
              <motion.div variants={fadeIn} className="relative">
                <HoverImage
                  src="/assets/diferenciadosres.webp"
                  alt={t('about.img_alt')}
                  className="w-full h-[480px] rounded-sm shadow-[0_24px_80px_rgba(27,58,107,0.15)]" />                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-[#1B3A6B] text-white p-6 shadow-xl rounded-sm">
                  
                  <span className="block font-heading text-4xl font-bold text-[#C9A84C]">2007</span>
                  <span className="block text-white/60 text-xs tracking-wide mt-1">{t('about.founded')}</span>
                </motion.div>
                <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#1B3A6B]/20 rounded-tr-sm pointer-events-none" />
              </motion.div>
            </InView>
          </div>
        </div>
      </section>


      {/* ── ¿POR QUÉ GRUPO PALENKKE? ──────────────────────────────────────── */}
      <section className="py-28 bg-[#0D1B2E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="why-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#why-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1B3A6B]/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-10">
          <InView className="text-center mb-16">
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#C9A84C]" />
            </motion.div>
            <Eyebrow light>{t('why.eyebrow')}</Eyebrow>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(32px,4.5vw,56px)] font-bold text-white leading-tight">
              {t('why.heading')}
            </motion.h2>
            <motion.div variants={fadeUp} className="text-white/45 text-base mt-4 max-w-xl mx-auto flex flex-col gap-3 text-center">
              {t('why.sub').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </motion.div>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden">
              {whyItems.map((pt) =>
              <motion.div
                key={pt.num}
                variants={fadeUp}
                whileHover={{ backgroundColor: 'rgba(27,58,107,0.5)', y: -2 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0D1B2E] p-8 group cursor-default">
                
                  <span className="block text-[#C9A84C]/40 text-xs font-mono tracking-widest mb-4 group-hover:text-[#C9A84C]/70 transition-colors">{pt.num}</span>
                  <h3 className="text-white font-semibold text-base mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">{pt.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{pt.desc}</p>
                  <motion.div initial={{ width: 0 }} whileHover={{ width: '100%' }} transition={{ duration: 0.4 }} className="mt-6 h-px bg-[#C9A84C]/30" />
                </motion.div>
              )}
            </motion.div>

          </InView>
        </div>
      </section>


      {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="relative py-32 bg-[#1B3A6B] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="30%" y2="100%" stroke="white" strokeWidth="1" />
          <line x1="8%" y1="0" x2="38%" y2="100%" stroke="white" strokeWidth="1" />
          <line x1="100%" y1="0" x2="70%" y2="100%" stroke="white" strokeWidth="1" />
          <line x1="92%" y1="0" x2="62%" y2="100%" stroke="white" strokeWidth="1" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-[#2E5FA3]/40 blur-[80px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-6 lg:px-10 text-center">
          <InView>
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#C9A84C]" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(32px,4.5vw,64px)] font-bold text-white leading-tight mb-6 max-w-3xl mx-auto">
              {t('cta_section.heading')}
            </motion.h2>
            <motion.div variants={fadeUp} className="text-white/55 text-lg mb-12 max-w-xl mx-auto flex flex-col gap-4 text-center">
              {t('cta_section.sub').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </motion.div>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5">
                  
                  {t('cta_section.cta_partner')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm">
                  
                  {t('cta_section.cta_expand')}
                </Link>
              </motion.div>
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── CONTACT SECTION ───────────────────────────────────────────────── */}
      <section className="py-28 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <InView>
              <motion.div variants={stagger} className="space-y-5 mb-10">
                {[
                { Icon: Mail, labelKey: 'email_label', value: 'contact@palenkke.org', href: 'mailto:contact@palenkke.org' },
                { Icon: Globe, labelKey: 'web_label', value: 'www.palenkke.org', href: 'https://www.palenkke.org' },
                { Icon: MapPin, labelKey: 'office_label', value: t('contact_section.office_value'), href: null }].
                map(({ Icon, labelKey, value, href }) =>
                <motion.div key={labelKey} variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-[#1B3A6B]" />
                    </div>
                    <div>
                      <p className="text-[#5A7099] text-xs tracking-wide uppercase mb-1">{t(`contact_section.${labelKey}`)}</p>
                      {href ?
                    <a href={href} className="text-[#0D1B2E] text-sm font-medium hover:text-[#1B3A6B] transition-colors">{value}</a> :

                    <p className="text-[#0D1B2E] text-sm font-medium">{value}</p>
                    }
                    </div>
                  </motion.div>
                )}
                {/* Phone numbers with flags */}
                <motion.div variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-[#1B3A6B]" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#5A7099] text-xs tracking-wide uppercase mb-1">{t('contact_section.phones_label')}</p>
                    <a href="tel:+17039812991" className="flex items-center gap-2.5 text-[#0D1B2E] text-sm font-medium hover:text-[#1B3A6B] transition-colors">
                      <img
                        src="https://flagcdn.com/w40/us.png"
                        srcSet="https://flagcdn.com/w80/us.png 2x"
                        width="22"
                        height="14"
                        alt="USA"
                        className="rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] object-cover shrink-0" />
                      
                      
                      <span>+1 (703) 981-2909</span>
                    </a>
                    <a href="tel:+522281447372" className="flex items-center gap-2.5 text-[#0D1B2E] text-sm font-medium hover:text-[#1B3A6B] transition-colors">
                      <img
                        src="https://flagcdn.com/w40/mx.png"
                        srcSet="https://flagcdn.com/w80/mx.png 2x"
                        width="22"
                        height="14"
                        alt="México"
                        className="rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] object-cover shrink-0" />
                      
                      <span>+52 228 144 7372</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex gap-3">
                {SOCIAL_LINKS.map(({ platform, label, href }) => {
                  const Icon = platform === 'instagram' ? Instagram : platform === 'linkedin' ? Linkedin : Facebook;
                  return (
                    <motion.a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ y: -2, backgroundColor: '#1B3A6B', color: 'white' }}
                      transition={{ duration: 0.2 }}
                      className="w-10 h-10 border border-[#D4DCE8] rounded-sm flex items-center justify-center text-[#5A7099] transition-colors duration-200">
                      
                      <Icon size={15} />
                    </motion.a>);

                })}
              </motion.div>
            </InView>

            <InView>
              <motion.form
                variants={stagger}
                className="bg-white rounded-sm shadow-[0_4px_32px_rgba(27,58,107,0.08)] p-8 space-y-5"
                onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div variants={fadeUp}>
                    <label className="block text-[#5A7099] text-xs tracking-[0.15em] uppercase mb-2">{t('contact_section.form.name')}</label>
                    <input type="text" placeholder={t('contact_section.form.name_placeholder')} className="w-full bg-[#F7F9FC] border border-[#D4DCE8] text-[#0D1B2E] placeholder-[#5A7099]/40 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20 transition-all" />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <label className="block text-[#5A7099] text-xs tracking-[0.15em] uppercase mb-2">{t('contact_section.form.company')}</label>
                    <input type="text" placeholder={t('contact_section.form.company_placeholder')} className="w-full bg-[#F7F9FC] border border-[#D4DCE8] text-[#0D1B2E] placeholder-[#5A7099]/40 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20 transition-all" />
                  </motion.div>
                </div>
                <motion.div variants={fadeUp}>
                  <label className="block text-[#5A7099] text-xs tracking-[0.15em] uppercase mb-2">{t('contact_section.form.email')}</label>
                  <input type="email" placeholder={t('contact_section.form.email_placeholder')} className="w-full bg-[#F7F9FC] border border-[#D4DCE8] text-[#0D1B2E] placeholder-[#5A7099]/40 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20 transition-all" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className="block text-[#5A7099] text-xs tracking-[0.15em] uppercase mb-2">{t('contact_section.form.help')}</label>
                  <select className="w-full bg-[#F7F9FC] border border-[#D4DCE8] text-[#5A7099] px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20 transition-all appearance-none">
                    <option value="">{t('contact_section.form.select_default')}</option>
                    {(t('contact_section.form.options', { returnObjects: true }) as string[]).map((opt) =>
                    <option key={opt}>{opt}</option>
                    )}
                  </select>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className="block text-[#5A7099] text-xs tracking-[0.15em] uppercase mb-2">{t('contact_section.form.message')}</label>
                  <textarea rows={5} placeholder={t('contact_section.form.message_placeholder')} className="w-full bg-[#F7F9FC] border border-[#D4DCE8] text-[#0D1B2E] placeholder-[#5A7099]/40 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20 transition-all resize-none" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01, boxShadow: '0 8px 32px rgba(27,58,107,0.25)' }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1B3A6B] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#142d54] transition-colors duration-300 rounded-sm">
                    
                    {t('contact_section.form.submit')}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </motion.form>
            </InView>
          </div>
        </div>
      </section>
    </>);

}