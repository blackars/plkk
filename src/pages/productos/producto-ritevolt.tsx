import { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Globe, Sun,
  Zap, Award, Battery, Settings, Shield
} from 'lucide-react';

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

interface ProductData {
  name: string;
  subtitle: string;
  tag: string;
  potencia: string;
  eficiencia: string;
  aplicacion: string;
  garantia: string;
  description: string;
  features: string[];
}

interface ProductItem extends ProductData {
  id: string;
  imgSlot: string;
  tagBg: string;
}

const PRODUCT_PRESENTATION: Omit<ProductItem, keyof ProductData>[] = [
  {
    id: 'paneles',
    imgSlot: '/assets/mezcaljoven.jpeg',
    tagBg: 'bg-[#FFF8EE] text-[#92400E]'
  },
  {
    id: 'inversores',
    imgSlot: '/assets/mezcalanejo.jpeg',
    tagBg: 'bg-[#EEF2F8] text-[#1B3A6B]'
  },
  {
    id: 'baterias',
    imgSlot: '/assets/mezcalrose.jpeg',
    tagBg: 'bg-[#F0F7EE] text-[#2D6A4F]'
  },
  {
    id: 'sistemas',
    imgSlot: '/assets/mezcalcoco.jpeg',
    tagBg: 'bg-[#1B3A6B]/10 text-[#1B3A6B]'
  }
];

const pillIcons = [Sun, Battery, Settings, Shield];

export default function ProductoRitevoltPage() {
  const { t } = useTranslation();

  const products = useMemo(() => {
    const data = t('brand_pages.ritevolt.products', { returnObjects: true }) as ProductData[];
    return data.map((d, i) => ({ ...d, ...(PRODUCT_PRESENTATION[i] ?? PRODUCT_PRESENTATION[0]) }));
  }, [t]);

  const pills = t('brand_pages.ritevolt.pills', { returnObjects: true }) as string[];

  const stats = t('brand_pages.ritevolt.stats', { returnObjects: true }) as { value: string; label: string }[];

  return (
    <>
      <Helmet>
        <title>{t('brand_pages.ritevolt.meta_title')}</title>
        <meta name="description" content={t('brand_pages.ritevolt.meta_desc')} />
        <meta name="keywords" content={t('brand_pages.ritevolt.meta_keywords')} />
        <link rel="canonical" href="https://www.palenkke.org/productos/ritevolt" />
        <meta property="og:title" content={t('brand_pages.ritevolt.meta_title')} />
        <meta property="og:url" content="https://www.palenkke.org/productos/ritevolt" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
      </Helmet>

      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-[#0D1B2E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2E] via-[#1a3a2e] to-[#0D1B2E]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-transparent" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#22C55E]/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rv-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#22C55E" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rv-grid)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-24 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <Link to="/productos" className="hover:text-white/60 transition-colors">{t('nav.products')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('brand_pages.ritevolt.short_name')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#22C55E]" />
              <span className="text-[#22C55E] text-xs font-semibold tracking-[0.3em] uppercase">{t('brand_pages.ritevolt.eyebrow')}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-heading text-[clamp(44px,7vw,92px)] font-bold text-white leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: t('brand_pages.ritevolt.hero_heading') }} />
            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-lg mb-10">
              {t('brand_pages.ritevolt.hero_sub')}
            </motion.p>

            <motion.div variants={stagger} className="flex flex-wrap gap-4">
              {pills.map((label, i) => {
                const Icon = pillIcons[i] ?? Sun;
                return (
                <motion.div key={label} variants={fadeUp}
                  className="flex items-center gap-2 px-4 py-2 border border-white/15 text-white/60 text-xs rounded-sm hover:border-white/30 hover:text-white/80 transition-all duration-200">
                  <Icon size={12} className="text-[#22C55E]" /> {label}
                </motion.div>);
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <InView>
              <AccentLine />
              <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">{t('productPage.the_brand')}</motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-6">{t('brand_pages.ritevolt.hero_heading').replace(/<br\/?>/gi, ' ').trim()}</motion.h2>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-5">
                {t('brand_pages.ritevolt.intro_p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-8">
                {t('brand_pages.ritevolt.intro_p2')}
              </motion.p>
            </InView>

            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }} className="relative">
              <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(27,58,107,0.12)] group">
                <motion.img src="/assets/agave-fields.jpg" alt={t('brand_pages.ritevolt.img_alt')}
                  whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: 'easeOut' as const }}
                  className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-[#22C55E] text-white p-5 rounded-sm shadow-xl">
                <span className="block font-heading text-2xl font-bold">{t('brand_pages.ritevolt.origin_badge')}</span>
                <span className="block text-white/70 text-xs mt-0.5">{t('brand_pages.ritevolt.origin_sub')}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-14">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">{t('brand_pages.ritevolt.products_eyebrow')}</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-black leading-tight">{t('brand_pages.ritevolt.products_heading')}</motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-lg mt-3 max-w-xl">{t('brand_pages.ritevolt.products_sub')}</motion.p>
          </InView>
          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((p) => (
                <motion.div key={p.id} variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(34,197,94,0.12)' }}
                  transition={{ duration: 0.28 }}
                  className="group rounded-sm overflow-hidden border border-[#D4DCE8] hover:border-[#22C55E]/40 transition-all duration-300 bg-white">
                  <div className="relative h-56 overflow-hidden bg-[#F7F9FC]">
                    <motion.img src={p.imgSlot} alt={p.name}
                      whileHover={{ scale: 1.07 }} transition={{ duration: 0.6, ease: 'easeOut' as const }}
                      className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm ${p.tagBg}`}>{p.tag}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[#5A7099] text-xs tracking-wide mb-1">{p.subtitle}</p>
                    <h3 className="font-heading font-bold text-[#0D1B2E] text-xl mb-3 group-hover:text-[#22C55E] transition-colors">{p.name}</h3>
                    <p className="text-[#5A7099] text-sm leading-relaxed mb-4">{p.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-[#F7F9FC] p-2 rounded-sm">
                        <span className="text-[#9AAAC0] text-[10px] uppercase tracking-wider">{t('brand_pages.ritevolt.potencia_label')}</span>
                        <p className="text-[#0D1B2E] text-sm font-medium">{p.potencia}</p>
                      </div>
                      <div className="bg-[#F7F9FC] p-2 rounded-sm">
                        <span className="text-[#9AAAC0] text-[10px] uppercase tracking-wider">{t('brand_pages.ritevolt.eficiencia_label')}</span>
                        <p className="text-[#0D1B2E] text-sm font-medium">{p.eficiencia}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.features.map((f) => <span key={f} className="px-2 py-0.5 bg-[#EEF2F8] text-[#5A7099] text-[10px] rounded-sm">{f}</span>)}
                    </div>
                    <Link to="/contacto"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] text-white font-semibold text-xs tracking-wide uppercase hover:bg-[#142d54] transition-all duration-300 rounded-sm">
                      {t('productPage.request_info')} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </div>
      </section>

      <section className="py-24 bg-[#0D1B2E] relative overflow-hidden">
        <div className="relative container mx-auto px-6 lg:px-10">
          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
              {stats.map(({ value, label }) => (
                <motion.div key={label} variants={fadeUp}>
                  <span className="block font-heading text-4xl font-bold text-[#22C55E] mb-2">{value}</span>
                  <span className="block text-white/50 text-xs tracking-[0.2em] uppercase">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </div>
      </section>

      <section className="py-24 bg-[#1B3A6B] relative overflow-hidden">
        <div className="relative container mx-auto px-6 lg:px-10 text-center">
          <InView>
            <motion.div variants={fadeUp} className="flex justify-center mb-5"><div className="h-0.5 w-12 bg-[#22C55E]" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight mb-5 max-w-2xl mx-auto">
              {t('brand_pages.ritevolt.cta_heading')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
              {t('brand_pages.ritevolt.cta_sub')}
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link to="/contacto"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5">
                  {t('brand_pages.ritevolt.cta_button')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link to="/productos"
                  className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm">
                  {t('productPage.see_all_brands')}
                </Link>
              </motion.div>
            </motion.div>
          </InView>
        </div>
      </section>
    </>
  );
}
