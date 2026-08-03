import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Award, Globe, Leaf,
  Flame, Droplets, Star, Package, MapPin
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

interface VariantData {
  name: string;
  subtitle: string;
  tag: string;
  abv: string;
  agave: string;
  region: string;
  process: string;
  tasting: string;
  sizes: string[];
  description: string;
}

interface VariantItem extends VariantData {
  id: string;
  imgSlot: string;
  featured: boolean;
  tagBg: string;
  color: string;
  accentColor: string;
}

const VARIANT_PRESENTATION: Omit<VariantItem, keyof VariantData>[] = [
  {
    id: 'joven',
    imgSlot: '/assets/mezcaljoven.jpeg',
    featured: false,
    tagBg: 'bg-[#EEF2F8] text-[#1B3A6B]',
    color: '#EEF2F8',
    accentColor: '#1B3A6B'
  },
  {
    id: 'rose',
    imgSlot: '/assets/mezcalrose.jpeg',
    featured: true,
    tagBg: 'bg-pink-50 text-pink-700',
    color: '#FFF0F3',
    accentColor: '#C9A84C'
  },
  {
    id: 'anejo',
    imgSlot: '/assets/mezcalanejo.jpeg',
    featured: false,
    tagBg: 'bg-[#C9A84C]/15 text-[#8B6914]',
    color: '#FDF6E3',
    accentColor: '#C9A84C'
  }
];

const specs = [
  { Icon: Leaf, labelKey: 'agave', key: 'agave' },
  { Icon: MapPin, labelKey: 'region', key: 'region' },
  { Icon: Flame, labelKey: 'process', key: 'process' },
  { Icon: Droplets, labelKey: 'abv', key: 'abv' }];

const pillIcons = [Leaf, Globe, Flame, Award];

function ProductCard({ p, isActive, onClick }: {p: VariantItem;isActive: boolean;onClick: () => void;}) {
  const { t } = useTranslation();
  return (
    <motion.div variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(27,58,107,0.14)' }}
      transition={{ duration: 0.28 }} onClick={onClick}
      className={`group cursor-pointer rounded-sm overflow-hidden border transition-all duration-300 ${
      isActive ? 'border-[#1B3A6B] shadow-[0_8px_40px_rgba(27,58,107,0.18)]' : 'border-[#D4DCE8] hover:border-[#1B3A6B]/40'}`
      }>
      <div className="relative h-64 overflow-hidden bg-[#F7F9FC]">
        <motion.img src={p.imgSlot} alt={p.name}
          whileHover={{ scale: 1.07 }} transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/50 via-transparent to-transparent" />
        {p.featured &&
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#C9A84C] text-[#0D1B2E] px-3 py-1 text-xs font-bold tracking-wide rounded-sm">
          <Star size={10} /> {t('productPage.premium')}
        </div>}
        <div className="absolute bottom-4 left-4">
          <span className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm ${p.tagBg}`}>{p.tag}</span>
        </div>
      </div>
      <div className="bg-white p-6">
        <p className="text-[#5A7099] text-xs tracking-wide mb-1">{p.subtitle}</p>
        <h3 className="font-heading font-bold text-[#0D1B2E] text-xl mb-3 group-hover:text-[#1B3A6B] transition-colors duration-300">{p.name}</h3>
        <p className="text-[#5A7099] text-sm leading-relaxed mb-4 line-clamp-2">{p.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {p.sizes.map((s) => <span key={s} className="px-3 py-1 border border-[#D4DCE8] text-[#5A7099] text-xs rounded-sm">{s}</span>)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#5A7099] text-xs">{p.abv}</span>
          <span className={`flex items-center gap-1 text-xs font-semibold transition-colors duration-200 ${isActive ? 'text-[#1B3A6B]' : 'text-[#5A7099] group-hover:text-[#1B3A6B]'}`}>
            {t('productPage.view_detail')} <ChevronRight size={12} />
          </span>
        </div>
        <div className={`mt-4 h-0.5 bg-[#1B3A6B] transition-all duration-400 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
      </div>
    </motion.div>
  );
}

export default function ProductoPalenkkePage() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const products = useMemo(() => {
    const data = t('brand_pages.palenkke.variants', { returnObjects: true }) as VariantData[];
    return data.map((d, i) => ({ ...d, ...(VARIANT_PRESENTATION[i] ?? VARIANT_PRESENTATION[0]) }));
  }, [t]);

  const pills = t('brand_pages.palenkke.pills', { returnObjects: true }) as string[];

  const activeProduct = products.find((p) => p.id === active);

  return (
    <>
      <Helmet>
        <title>{t('brand_pages.palenkke.meta_title')}</title>
        <meta name="description" content={t('brand_pages.palenkke.meta_desc')} />
        <meta name="keywords" content={t('brand_pages.palenkke.meta_keywords')} />
        <link rel="canonical" href="https://www.palenkke.org/productos/palenkke" />
        <meta property="og:title" content={t('brand_pages.palenkke.meta_title')} />
        <meta property="og:url" content="https://www.palenkke.org/productos/palenkke" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
      </Helmet>

      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-[#0D1B2E]">
        <div className="absolute inset-0">
          <img src="/assets/mezcalesbg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/80 to-[#0D1B2E]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-[#0D1B2E]/50" />
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

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-24 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <Link to="/productos" className="hover:text-white/60 transition-colors">{t('nav.products')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('brand_pages.palenkke.short_name')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">{t('brand_pages.palenkke.eyebrow')}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-heading text-[clamp(44px,7vw,92px)] font-bold text-white leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: t('brand_pages.palenkke.hero_heading') }} />
            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-lg mb-10">
              {t('brand_pages.palenkke.hero_sub')}
            </motion.p>

            <motion.div variants={stagger} className="flex flex-wrap gap-4">
              {pills.map((label, i) => {
                const Icon = pillIcons[i] ?? Leaf;
                return (
                <motion.div key={label} variants={fadeUp}
                  className="flex items-center gap-2 px-4 py-2 border border-white/15 text-white/60 text-xs rounded-sm hover:border-white/30 hover:text-white/80 transition-all duration-200">
                  <Icon size={12} className="text-[#C9A84C]" /> {label}
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
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-6">{t('brand_pages.palenkke.hero_heading').replace(/<br\/?>/gi, ' ').trim()}</motion.h2>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-5">
                {t('brand_pages.palenkke.intro_p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed mb-8">
                {t('brand_pages.palenkke.intro_p2')}
              </motion.p>
            </InView>

            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }} className="relative">
              <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(27,58,107,0.12)] group">
                <motion.img src="/assets/agave-fields.jpg" alt={t('brand_pages.palenkke.img_alt')}
                  whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: 'easeOut' as const }}
                  className="w-full h-[420px] object-cover object-[center_70%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-[#C9A84C] text-[#0D1B2E] p-5 rounded-sm shadow-xl">
                <span className="block font-heading text-2xl font-bold">{t('brand_pages.palenkke.origin_badge')}</span>
                <span className="block text-[#0D1B2E]/70 text-xs mt-0.5">{t('brand_pages.palenkke.origin_sub')}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F7F9FC] border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-14">
            <AccentLine />
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">{t('productPage.collection')}</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-black leading-tight">{t('productPage.variants')}</motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-lg mt-3 max-w-xl">{t('brand_pages.palenkke.variants_sub')}</motion.p>
          </InView>
          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) =>
              <ProductCard key={p.id} p={p} isActive={active === p.id} onClick={() => {
                setActive((prev) => prev === p.id ? null : p.id);
                setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
              }} />)}
            </motion.div>
          </InView>
        </div>
      </section>

      <div ref={detailRef}>
        {activeProduct &&
        <motion.section key={activeProduct.id} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="py-24 bg-white border-t border-[#D4DCE8]">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="overflow-hidden rounded-sm shadow-[0_16px_64px_rgba(27,58,107,0.12)] group mb-6">
                  <motion.img src={activeProduct.imgSlot} alt={activeProduct.name}
                    whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: 'easeOut' as const }}
                    className="w-full h-80 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="bg-[#EEF2F8] rounded-sm p-6 border-l-4 border-[#1B3A6B]">
                  <p className="text-[#1B3A6B] text-xs font-semibold tracking-[0.2em] uppercase mb-2">{t('productPage.tasting_notes')}</p>
                  <p className="text-[#0D1B2E] text-sm leading-relaxed italic">"{activeProduct.tasting}"</p>
                </div>
              </div>
              <div>
                <h2 className="font-heading text-[clamp(28px,3.5vw,48px)] font-bold text-[#0D1B2E] leading-tight mb-2">{activeProduct.name}</h2>
                <p className="text-[#5A7099] text-sm mb-6">{activeProduct.subtitle}</p>
                <div className="h-px bg-[#D4DCE8] mb-8" />
                <p className="text-[#5A7099] text-base leading-relaxed mb-8">{activeProduct.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {specs.map(({ Icon, labelKey, key }) =>
                  <div key={key} className="flex items-start gap-3 p-4 bg-[#F7F9FC] rounded-sm border border-[#D4DCE8]">
                    <div className="w-8 h-8 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-[#1B3A6B]" />
                    </div>
                    <div>
                      <p className="text-[#5A7099] text-xs tracking-wide mb-0.5">{t(`productPage.specs.${labelKey}`)}</p>
                      <p className="text-[#0D1B2E] text-sm font-medium">{activeProduct[key as keyof VariantItem] as string}</p>
                    </div>
                  </div>)}
                </div>
                <Link to="/contacto"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#1B3A6B] text-white font-semibold text-sm tracking-wide uppercase hover:bg-[#142d54] transition-all duration-300 rounded-sm shadow-[0_4px_16px_rgba(27,58,107,0.25)] hover:-translate-y-0.5">
                  {t('productPage.request_info')} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>}
      </div>

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
            <motion.div variants={fadeUp} className="flex justify-center mb-5"><div className="h-0.5 w-12 bg-[#C9A84C]" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight mb-5 max-w-2xl mx-auto">
              {t('brand_pages.palenkke.cta_heading')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
              {t('brand_pages.palenkke.cta_sub')}
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link to="/contacto"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5">
                  {t('brand_pages.palenkke.cta_button')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
