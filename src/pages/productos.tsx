import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, type Variants } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Award, Globe, Star,
  Package, Sparkles
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
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

const MARKET_COLORS: Record<string, string> = {
  'México': 'bg-[#EEF2F8] text-[#1B3A6B]',
  'Mexico': 'bg-[#EEF2F8] text-[#1B3A6B]',
  'Sudamérica': 'bg-[#F0F7EE] text-[#2D6A4F]',
  'South America': 'bg-[#F0F7EE] text-[#2D6A4F]',
  'Asia': 'bg-[#FFF8EE] text-[#92400E]',
  'India': 'bg-[#FFF3E0] text-[#B45309]',
};

const LOGOS_BASE = '/assets/images/logos';

function CompanyLogo({ name, logoId }: { name: string; logoId?: string }) {
  const logoImg = logoId ? `${LOGOS_BASE}/${logoId}.png` : null;
  const [imgFailed, setImgFailed] = useState(false);

  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  if (logoImg && !imgFailed) {
    return (
      <motion.img
        src={logoImg}
        alt={`${name} logo`}
        className="max-h-56 max-w-full w-auto h-auto object-contain"
        onError={() => setImgFailed(true)}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1, transition: { duration: 0.3 } }}
      />
    );
  }

  return (
    <span className="font-heading font-bold text-[clamp(2.5rem,8vw,4.5rem)] tracking-wider select-none text-[#1B3A6B]/25">
      {initials}
    </span>
  );
}

export default function ProductosPage() {
  const { t } = useTranslation();

  const companyItems: Array<{ name: string; logo?: string; route?: string; tag: string; desc: string; }> =
    t('companies.items', { returnObjects: true }) as Array<{ name: string; logo?: string; route?: string; tag: string; desc: string; }>;

  const heroPills: string[] = t('productos_landing.pills', { returnObjects: true }) as string[];
  const pillIcons = [Award, Globe, Package, Star];

  return (
    <>
      <Helmet>
        <title>{t('productos_landing.meta_title')}</title>
        <meta name="description" content={t('productos_landing.meta_desc')} />
        <meta name="keywords" content={t('productos_landing.meta_keywords')} />
        <link rel="canonical" href="https://www.palenkke.org/productos" />
        <meta property="og:title" content={t('productos_landing.meta_title')} />
        <meta property="og:description" content={t('productos_landing.meta_desc')} />
        <meta property="og:url" content="https://www.palenkke.org/productos" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('productos_landing.meta_title')} />
        <meta name="twitter:description" content={t('productos_landing.meta_desc')} />
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
              <pattern id="prod-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#prod-grid)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-20 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('nav.products')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">
                {t('productos_landing.hero_eyebrow')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[clamp(44px,7vw,92px)] font-bold text-white leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: t('productos_landing.hero_heading') }}
            />

            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
              {t('productos_landing.hero_sub')}
            </motion.p>

            <motion.div variants={stagger} className="flex flex-wrap gap-4">
              {heroPills.map((label, i) => {
                const Icon = pillIcons[i] ?? Award;
                return (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-2 px-4 py-2 border border-white/15 text-white/60 text-xs rounded-sm hover:border-white/30 hover:text-white/80 transition-all duration-200"
                >
                  <Icon size={12} className="text-[#C9A84C]" />
                  {label}
                </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND GRID ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-16 max-w-2xl">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              {t('productos_landing.section_eyebrow')}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(32px,4.5vw,56px)] font-bold text-[#0D1B2E] leading-tight">
              {t('productos_landing.section_heading')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-base mt-4 leading-relaxed">
              {t('productos_landing.section_sub')}
            </motion.p>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyItems.map((co) => {
                const tagColor = MARKET_COLORS[co.tag] ?? 'bg-[#EEF2F8] text-[#1B3A6B]';
                const route = co.route ?? co.name.toLowerCase().replace(/\s+/g, '-');

                return (
                  <Link key={co.name} to={`/productos/${route}`} className="block no-underline group">
                    <motion.div
                      variants={fadeUp}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative flex flex-col min-h-[300px] overflow-hidden rounded-sm bg-white border border-[#D4DCE8] transition-all duration-300 hover:border-[#1B3A6B]/40 hover:shadow-[0_12px_48px_rgba(27,58,107,0.12)]"
                    >
                      <div className="flex-[2] min-h-[160px] flex items-center justify-center px-5 pt-5 pb-2">
                        <motion.div
                          whileHover={{ y: -8, scale: 1.05 }}
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

                        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-[#1B3A6B] group-hover:text-[#C9A84C] transition-all duration-300">
                          <Package size={10} />
                          <span>{t('productos_landing.view_products')}</span>
                          <ArrowRight size={9} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>

                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="mt-3 h-px bg-[#1B3A6B]/20"
                        />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
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
              {t('productos_landing.cta_heading')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
              {t('productos_landing.cta_sub')}
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                >
                  {t('productos_landing.cta_button')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/casos"
                  className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm"
                >
                  <Sparkles size={15} />
                  {t('productos_landing.cta_secondary')}
                </Link>
              </motion.div>
            </motion.div>
          </InView>
        </div>
      </section>
    </>
  );
}
