import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, type Variants } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Globe, TrendingUp,
  Award, Users, Target, Handshake, Lightbulb, Shield } from
'lucide-react';

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } }
};
const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
};
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
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

function InViewSingle({ children, variant = fadeUp, className = ''



}: {children: React.ReactNode;variant?: Variants;className?: string;}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={variant} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>);

}

// ─── Data ─────────────────────────────────────────────────────────────────────
const milestones = [
{ year: '2008', titleKey: 'Fundación', descKey: 'Grupo Palenkke nace en México con la visión de conectar marcas locales con mercados internacionales.' },
{ year: '2012', titleKey: 'Expansión Regional', descKey: 'Consolidamos presencia en Latinoamérica y establecemos alianzas estratégicas en EE.UU.' },
{ year: '2016', titleKey: 'Portafolio Diversificado', descKey: 'Ampliamos nuestro portafolio a tecnología, bebidas premium, artesanías y soluciones comerciales.' },
{ year: '2020', titleKey: 'Visión Global', descKey: 'Lanzamos Palenkke Mezcal y consolidamos operaciones en mercados internacionales exigentes.' },
{ year: '2024', titleKey: 'Ecosistema Premium', descKey: 'Más de 7 marcas desarrolladas, presencia en 7 regiones nacionales e internacionales y 17 años de resultados comprobados.' }];


const valueIcons = [Shield, Lightbulb, Handshake, Globe, Target, TrendingUp];



const teamRoles = [
{ Icon: Users, roleKey: 'Dirección General', subKey: 'Liderazgo Estratégico', descKey: 'Visión de largo plazo, relaciones internacionales y desarrollo de ecosistema de marcas premium.' },
{ Icon: Globe, roleKey: 'Desarrollo Comercial', subKey: 'Expansión de Mercados', descKey: 'Identificación de oportunidades, apertura de canales y negociación con distribuidores globales.' },
{ Icon: Award, roleKey: 'Branding & Diseño', subKey: 'Identidad de Marca', descKey: 'Creación de identidades visuales premium con posicionamiento diferenciado en mercados competitivos.' },
{ Icon: Target, roleKey: 'Operaciones', subKey: 'Ejecución y Logística', descKey: 'Coordinación de cadena de suministro, distribución y operaciones internacionales.' }];


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NosotrosPage() {
  const { t } = useTranslation();

  const valoresItems: Array<{title: string;desc: string;}> = t('nosotros.valores', { returnObjects: true }) as Array<{title: string;desc: string;}>;


  return (
    <>
      <Helmet>
        <title>{t('nosotros.meta_title')}</title>
        <meta name="description" content={t('nosotros.meta_desc')} />
        <meta name="keywords" content="Grupo Palenkke historia, equipo Palenkke, empresa mexicana marcas, 17 años experiencia, visión internacional, sobre nosotros" />
        <link rel="canonical" href="https://www.palenkke.org/nosotros" />
        <meta property="og:title" content={t('nosotros.meta_title')} />
        <meta property="og:description" content={t('nosotros.meta_desc')} />
        <meta property="og:image" content="https://www.palenkke.org/airo-assets/images/pages/nosotros/hero" />
        <meta property="og:url" content="https://www.palenkke.org/nosotros" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('nosotros.meta_title')} />
        <meta name="twitter:description" content={t('nosotros.meta_desc')} />
        <meta name="twitter:image" content="https://www.palenkke.org/airo-assets/images/pages/nosotros/hero" />
        <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: t('nosotros.meta_title'),
            description: t('nosotros.meta_desc'),
            url: 'https://www.palenkke.org/nosotros',
            publisher: {
              '@type': 'Organization',
              name: 'Grupo Palenkke',
              url: 'https://www.palenkke.org'
            }
          })}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-[#0D1B2E]">
        <div className="absolute inset-0">
          <img src="/assets/somos.webp" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/85 to-[#0D1B2E]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-[#0D1B2E]/50" />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="nos-grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2E5FA3" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#nos-grid)" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] rounded-full bg-[#1B3A6B]/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-[#241b6b]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-24 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('nav.about')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">{t('nosotros.hero_eyebrow')}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-heading text-[clamp(44px,7vw,92px)] font-bold text-white leading-tight mb-6">
              {t('nosotros.hero_heading').split(' ').slice(0, -1).join(' ')}<br />
              <span className="text-[#C9A84C]">{t('nosotros.hero_heading').split(' ').slice(-1)[0]}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
              {t('nosotros.hero_sub')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── HISTORIA ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <InViewSingle variant={fadeLeft}>
              <div className="relative">
                <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(27,58,107,0.13)] group">
                  <motion.img src="/assets/nuestrahistoria.jpeg" alt={t('nosotros.historia_heading')} whileHover={{ scale: 1.04 }} transition={{ duration: 0.6, ease: 'easeOut' as const }} className="w-full h-[480px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }} className="absolute -bottom-6 -right-6 bg-[#1B3A6B] text-white p-6 rounded-sm shadow-xl">
                  <span className="block font-heading text-3xl font-bold text-[#C9A84C]">2007</span>
                  <span className="block text-white/70 text-xs mt-0.5 tracking-wide">{t('about.founded')}</span>
                </motion.div>
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#C9A84C]/30 rounded-tl-sm pointer-events-none" />
              </div>
            </InViewSingle>

            <InView>
              <motion.div variants={fadeUp} className="h-0.5 w-12 bg-[#1B3A6B] mb-5" />
              <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">{t('nosotros.historia_eyebrow')}</motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-6">{t('nosotros.historia_heading')}</motion.h2>
              <motion.div variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-5 flex flex-col gap-4">
                {t('nosotros.historia_p1').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </motion.div>
              <motion.div variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-8 flex flex-col gap-4">
                {t('nosotros.historia_p2').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link to="/casos" className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#1B3A6B] text-white font-semibold text-sm tracking-wide uppercase hover:bg-[#142d54] transition-all duration-300 rounded-sm shadow-[0_4px_16px_rgba(27,58,107,0.25)] hover:-translate-y-0.5">
                  {t('nosotros.cta_contact')} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </InView>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-16 text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-5"><div className="h-0.5 w-12 bg-[#1B3A6B]" /></motion.div>
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">{t('nosotros.historia_eyebrow')}</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight">{t('nosotros.historia_heading')}</motion.h2>
          </InView>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#D4DCE8] -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {milestones.map(({ year, titleKey, descKey }, i) =>
              <InViewSingle key={year} variant={i % 2 === 0 ? fadeLeft : fadeRight}>
                  <div className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <motion.div whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(27,58,107,0.12)' }} transition={{ duration: 0.25 }} className="flex-1 bg-white border border-[#D4DCE8] rounded-sm p-7 hover:border-[#1B3A6B]/30 transition-all duration-300 group cursor-default">
                      <span className="block text-[#C9A84C] font-mono text-xs tracking-widest mb-2">{year}</span>
                      <h3 className="font-heading font-bold text-[#0D1B2E] text-lg mb-2 group-hover:text-[#1B3A6B] transition-colors duration-300">{titleKey}</h3>
                      <p className="text-[#5A7099] text-sm leading-relaxed">{descKey}</p>
                    </motion.div>
                    <div className="hidden md:flex w-10 h-10 rounded-full bg-[#1B3A6B] border-4 border-white shadow-[0_0_0_2px_#D4DCE8] items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </InViewSingle>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN ───────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D1B2E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="mv-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2E5FA3" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#mv-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#1B3A6B]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <InViewSingle variant={fadeLeft}>
              <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.3)] group">
                <motion.img src="/assets/mision.webp" alt={t('nosotros.vision_heading')} whileHover={{ scale: 1.04 }} transition={{ duration: 0.6, ease: 'easeOut' as const }} className="w-full h-[420px] object-cover" />
              </div>
            </InViewSingle>

            <InView>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">{t('nosotros.mision_eyebrow')}</span>
              </motion.div>

              <motion.div variants={fadeUp} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#1B3A6B] rounded-sm flex items-center justify-center shrink-0"><Target size={14} className="text-[#C9A84C]" /></div>
                  <h3 className="font-heading text-white font-bold text-xl">{t('nosotros.mision_heading')}</h3>
                </div>
                <div className="text-white/50 text-base leading-relaxed pl-11 flex flex-col gap-3">
                  {t('nosotros.mision_text').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#241b6b] rounded-sm flex items-center justify-center shrink-0"><Globe size={14} className="text-[#C9A84C]" /></div>
                  <h3 className="font-heading text-white font-bold text-xl">{t('nosotros.vision_heading')}</h3>
                </div>
                <div className="text-white/50 text-base leading-relaxed pl-11 flex flex-col gap-3">
                  {t('nosotros.vision_p1').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-[#1B3A6B]/30 border border-[#2E5FA3]/30 rounded-sm p-6">
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">{t('nosotros.vision_eyebrow')}</p>
                <div className="text-white/70 text-sm leading-relaxed italic flex flex-col gap-3">
                  {t('nosotros.vision_p2').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </motion.div>
            </InView>
          </div>
        </div>
      </section>

      {/* ── VALORES ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-16 text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-5"><div className="h-0.5 w-12 bg-[#C9A84C]" /></motion.div>
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">{t('nosotros.valores_eyebrow')}</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight">{t('nosotros.valores_heading')}</motion.h2>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {valoresItems.map(({ title, desc }, i) => {
                const Icon = valueIcons[i] ?? Shield;
                return (
                  <motion.div key={title} variants={fadeUp} whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(27,58,107,0.11)' }} transition={{ duration: 0.25 }} className="group bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm p-7 hover:border-[#1B3A6B]/30 hover:bg-white transition-all duration-300 cursor-default">
                    <div className="w-11 h-11 bg-[#EEF2F8] rounded-sm flex items-center justify-center mb-5 group-hover:bg-[#1B3A6B] transition-colors duration-300">
                      <Icon size={18} className="text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-heading font-bold text-[#0D1B2E] text-base mb-2 group-hover:text-[#1B3A6B] transition-colors duration-300">{title}</h3>
                    <p className="text-[#5A7099] text-sm leading-relaxed">{desc}</p>
                    <div className="mt-5 h-0.5 bg-[#1B3A6B]/0 group-hover:bg-[#1B3A6B]/20 transition-all duration-500 w-0 group-hover:w-full" />
                  </motion.div>);

              })}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── EQUIPO ────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <InView>
              <motion.div variants={fadeUp} className="h-0.5 w-12 bg-[#1B3A6B] mb-5" />
              <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">{t('nosotros.equipo_eyebrow')}</motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-6">{t('nosotros.equipo_heading')}</motion.h2>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-8">{t('nosotros.equipo_sub')}</motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {teamRoles.map(({ Icon, roleKey, subKey, descKey }) =>
                <motion.div key={roleKey} variants={fadeUp} className="flex gap-4 p-5 bg-white border border-[#D4DCE8] rounded-sm hover:border-[#1B3A6B]/30 hover:shadow-[0_4px_20px_rgba(27,58,107,0.08)] transition-all duration-300 group cursor-default">
                    <div className="w-10 h-10 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0 group-hover:bg-[#1B3A6B] transition-colors duration-300">
                      <Icon size={14} className="text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0D1B2E] text-sm group-hover:text-[#1B3A6B] transition-colors duration-300">{roleKey}</p>
                      <p className="text-[#C9A84C] text-xs tracking-wide mb-1">{subKey}</p>
                      <p className="text-[#5A7099] text-xs leading-relaxed">{descKey}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </InView>

            <InViewSingle variant={fadeRight}>
              <div className="relative">
                <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(27,58,107,0.12)] group">
                  <motion.img
                      src="/assets/WhatsApp Image 2026-05-27 at 12.54.29 PM.jpeg"
                      alt={t('nosotros.equipo_img_alt')}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: 'easeOut' as const }}
                      className="w-full h-auto object-contain"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} className="absolute -bottom-6 -left-6 bg-white border border-[#D4DCE8] p-5 rounded-sm shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#EEF2F8] rounded-sm flex items-center justify-center"><Award size={18} className="text-[#C9A84C]" /></div>
                    <div>
                      <span className="block font-heading text-lg font-bold text-[#1B3A6B]">{t('nosotros.equipo_eyebrow')}</span>
                      <span className="block text-[#5A7099] text-xs">{t('nosotros.equipo_sub').split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#1B3A6B]/20 rounded-tr-sm pointer-events-none" />
              </div>
            </InViewSingle>
          </div>
        </div>
      </section>

      {/* ── MAPA INTERNACIONAL ────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D1B2E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="25%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="8%" y1="0" x2="33%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="100%" y1="0" x2="75%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="92%" y1="0" x2="67%" y2="100%" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="relative container mx-auto px-6 lg:px-10">
          <InView className="mb-16 text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-5"><div className="h-0.5 w-12 bg-[#C9A84C]" /></motion.div>
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#C9A84C]">Expansión Global</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-white leading-tight">
              Presencia Internacional
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-base mt-4 max-w-xl mx-auto">
              7 regiones nacionales e internacionales con compromiso 100% en cada mercado.
            </motion.p>
          </InView>

          {/* SVG World Map (simplified) */}
          <InView>
            <motion.div variants={fadeUp} className="relative w-full max-w-4xl mx-auto">
              <svg viewBox="0 0 900 450" className="w-full opacity-20" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* North America */}
                <path d="M80 80 L180 60 L220 90 L200 150 L160 180 L120 160 L80 130 Z" fill="#2E5FA3" stroke="#3B6FBF" strokeWidth="1" />
                {/* Mexico */}
                <path d="M120 160 L200 150 L220 190 L180 210 L140 200 Z" fill="#2E5FA3" stroke="#3B6FBF" strokeWidth="1" />
                {/* Central America */}
                <path d="M180 210 L220 190 L230 230 L200 240 Z" fill="#1B3A6B" stroke="#2E5FA3" strokeWidth="1" />
                {/* South America */}
                <path d="M160 250 L240 230 L280 260 L300 340 L260 400 L200 390 L160 340 L140 290 Z" fill="#2E5FA3" stroke="#3B6FBF" strokeWidth="1" />
                {/* Europe */}
                <path d="M380 60 L460 50 L480 90 L440 110 L400 100 Z" fill="#1B3A6B" stroke="#2E5FA3" strokeWidth="1" />
                {/* Africa */}
                <path d="M380 120 L460 110 L490 160 L480 260 L420 290 L370 250 L360 180 Z" fill="#1B3A6B" stroke="#2E5FA3" strokeWidth="1" />
                {/* Asia */}
                <path d="M500 50 L700 40 L740 100 L720 160 L640 180 L560 170 L500 130 Z" fill="#2E5FA3" stroke="#3B6FBF" strokeWidth="1" />
                {/* Southeast Asia */}
                <path d="M640 180 L720 160 L740 220 L700 240 L650 230 Z" fill="#1B3A6B" stroke="#2E5FA3" strokeWidth="1" />
                {/* Australia */}
                <path d="M680 280 L780 270 L800 340 L760 380 L700 370 L670 330 Z" fill="#1B3A6B" stroke="#2E5FA3" strokeWidth="1" />
              </svg>

              {/* Location dots with glow */}
              {[
              { cx: '18%', cy: '38%', label: 'México', sub: 'Sede Principal', color: '#C9A84C', size: 'lg' },
              { cx: '14%', cy: '36%', label: 'EE.UU', sub: 'Norteamérica', color: '#C9A84C', size: 'lg' },
              { cx: '68%', cy: '30%', label: 'Asia', sub: 'Mercados Asiáticos', color: '#C9A84C', size: 'lg' },
              { cx: '57%', cy: '42%', label: 'India', sub: 'Asia del Sur', color: '#C9A84C', size: 'md' },
              { cx: '47%', cy: '22%', label: 'España', sub: 'Europa', color: '#2E5FA3', size: 'md' },
              ].map(({ cx, cy, label, sub, color, size }) =>
              <motion.div
                key={label}
                className="absolute"
                style={{ left: cx, top: cy, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                
                  {/* Pulse ring */}
                  <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }} />
                
                  {/* Dot */}
                  <div
                  className={`relative rounded-full ${size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} shadow-lg`}
                  style={{ backgroundColor: color, boxShadow: `0 0 16px ${color}80` }} />
                
                  {/* Label */}
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap">
                    <p className="text-white text-xs font-semibold leading-none">{label}</p>
                    <p className="text-white/40 text-[9px] mt-0.5">{sub}</p>
                  </div>
                </motion.div>
              )}

              {/* Connection lines (SVG overlay) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
                {/* Mexico to USA */}
                <motion.path d="M126 162 L108 162" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4 3" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
                {/* Mexico to Colombia */}
                <motion.path d="M198 171 Q210 210 198 252" stroke="#2E5FA3" strokeWidth="1" strokeDasharray="4 3" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.7 }} />
                {/* Colombia to Brazil */}
                <motion.path d="M216 252 Q220 280 216 315" stroke="#2E5FA3" strokeWidth="1" strokeDasharray="4 3" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.9 }} />
                {/* Brazil to Argentina */}
                <motion.path d="M216 315 Q210 340 189 360" stroke="#2E5FA3" strokeWidth="1" strokeDasharray="4 3" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.1 }} />
                {/* Mexico to Asia */}
                <motion.path d="M198 171 Q450 80 612 135" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.8 }} />
                {/* Mexico to India */}
                <motion.path d="M198 171 Q380 100 513 189" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 1.0 }} />
                {/* Mexico to Spain */}
                <motion.path d="M198 171 Q320 60 423 99" stroke="#2E5FA3" strokeWidth="1" strokeDasharray="4 3" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 1.2 }} />
              </svg>
            </motion.div>
          </InView>

          {/* Region cards */}
          <InView className="mt-16">
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
              {[
              { region: 'México', detail: 'Sede Principal', flag: '🇲🇽', color: 'border-[#C9A84C]/40' },
              { region: 'EE.UU', detail: 'Norteamérica', flag: '🇺🇸', color: 'border-[#C9A84C]/40' },
              { region: 'Centroamérica', detail: 'C. América', flag: '◉', color: 'border-[#2E5FA3]/40' },
              { region: 'Asia', detail: 'Mercados Asiáticos', flag: '◉', color: 'border-[#C9A84C]/40' },
              { region: 'India', detail: 'Asia del Sur', flag: '🇮🇳', color: 'border-[#C9A84C]/40' },
              { region: 'España', detail: 'Europa', flag: '🇪🇸', color: 'border-[#2E5FA3]/40' },
              ].map(({ region, detail, flag, color }) => (
                <motion.div key={region} variants={fadeUp}
                className={`bg-white/5 border ${color} rounded-sm p-4 text-center hover:bg-white/10 transition-colors duration-300`}>
                  <span className="text-2xl mb-2 block">{flag}</span>
                  <p className="text-white font-semibold text-xs">{region}</p>
                  <p className="text-white/40 text-[9px] mt-0.5">{detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── EQUIPO GLOBAL ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-white border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-14 max-w-2xl">
            <motion.div variants={fadeUp} className="h-0.5 w-12 bg-[#1B3A6B] mb-5" />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">Equipo Global</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight">
              Liderazgo Internacional
            </motion.h2>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* MX */}
              <motion.div variants={fadeUp}
              className="group bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm p-7 hover:border-[#1B3A6B]/30 hover:bg-white hover:shadow-[0_8px_32px_rgba(27,58,107,0.10)] transition-all duration-300">
                <div className="w-14 h-14 bg-[#1B3A6B] rounded-sm flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(27,58,107,0.20)] group-hover:shadow-[0_0_28px_rgba(27,58,107,0.35)] transition-shadow duration-300">
                  <span className="text-white font-heading font-bold text-xl tracking-wider select-none">JF</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl" role="img" aria-label="México">🇲🇽</span>
                </div>
                <p className="text-[#C9A84C] text-xs font-semibold tracking-wide uppercase mb-3">Dirección General · México</p>
                <a href="tel:+522281447372" className="text-[#1B3A6B] text-sm font-medium hover:text-[#C9A84C] transition-colors duration-300">+52 228 144 7372</a>
                <p className="text-[#5A7099] text-sm leading-relaxed mt-3">Liderazgo estratégico, relaciones internacionales y desarrollo del ecosistema de marcas premium de Grupo Palenkke.</p>
                <div className="mt-5 h-0.5 bg-[#1B3A6B]/0 group-hover:bg-[#1B3A6B]/20 transition-all duration-500 w-0 group-hover:w-full" />
              </motion.div>

              {/* US */}
              <motion.div variants={fadeUp}
              className="group bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm p-7 hover:border-[#1B3A6B]/30 hover:bg-white hover:shadow-[0_8px_32px_rgba(27,58,107,0.10)] transition-all duration-300">
                <div className="w-14 h-14 bg-[#241b6b] rounded-sm flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(36,27,107,0.20)] group-hover:shadow-[0_0_28px_rgba(36,27,107,0.35)] transition-shadow duration-300">
                  <span className="text-white font-heading font-bold text-xl tracking-wider select-none">OH</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl" role="img" aria-label="EE.UU">🇺🇸</span>
                </div>
                <p className="text-[#C9A84C] text-xs font-semibold tracking-wide uppercase mb-3">Desarrollo Comercial · EE.UU</p>
                <a href="tel:+17039812991" className="text-[#1B3A6B] text-sm font-medium hover:text-[#C9A84C] transition-colors duration-300">+1 (703) 981-2991</a>
                <p className="text-[#5A7099] text-sm leading-relaxed mt-3">Expansión de mercados en Norteamérica, apertura de canales y negociación con distribuidores en el mercado estadounidense.</p>
                <div className="mt-5 h-0.5 bg-[#1B3A6B]/0 group-hover:bg-[#1B3A6B]/20 transition-all duration-500 w-0 group-hover:w-full" />
              </motion.div>

              {/* Asia — Próximamente */}
              <motion.div variants={fadeUp}
              className="group bg-[#F7F9FC] border border-dashed border-[#D4DCE8] rounded-sm p-7 opacity-70">
                <div className="w-14 h-14 bg-[#EEF2F8] border-2 border-dashed border-[#D4DCE8] rounded-sm flex items-center justify-center mb-5">
                  <span className="text-[#9AAAC0] text-2xl" role="img" aria-label="Asia">🌏</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-[#9AAAC0] text-base italic">Próximamente</h3>
                </div>
                <p className="text-[#C9A84C]/60 text-xs font-semibold tracking-wide uppercase mb-3">Representación Asia</p>
                <p className="text-[#9AAAC0] text-sm leading-relaxed">Espacio reservado para el representante de Grupo Palenkke en los mercados asiáticos.</p>
              </motion.div>
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
            <line x1="92%" y1="0" x2="67%" y2="100%" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-[#2E5FA3]/30 blur-[80px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-6 lg:px-10 text-center">
          <InView>
            <motion.div variants={fadeUp} className="flex justify-center mb-5"><div className="h-0.5 w-12 bg-[#C9A84C]" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight mb-5 max-w-2xl mx-auto">{t('nosotros.cta_heading')}</motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg mb-10 max-w-lg mx-auto">{t('nosotros.cta_sub')}</motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link to="/contacto" className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5">
                  {t('nosotros.cta_contact')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link to="/servicios" className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm">
                  {t('nosotros.cta_services')}
                </Link>
              </motion.div>
            </motion.div>
          </InView>
        </div>
      </section>
    </>);

}