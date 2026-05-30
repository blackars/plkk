import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import { Globe, ExternalLink, Image as ImageIcon, Film, FileText } from 'lucide-react';

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function InView({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface CompanyEntry {
  id: string;
  name: string;
  tag: string;
  desc: string;
  website: string | null;
  logoSlot: string;
  logoImg: string;
  color: string;
  imagesLink: string;
  videosLink: string;
  docsLink: string;
}

const COMPANIES: CompanyEntry[] = [
  {
    id: 'elixir-del-alma',
    name: 'ELIXIR DEL ALMA',
    tag: 'México',
    desc: 'Tradición, esencia y autenticidad mexicana en una propuesta de experiencia premium.',
    website: null,
    logoSlot: '/airo-assets/images/logos/elixir',
    logoImg: '/assets/images/logos/elixir-del-alma.png',
    color: 'bg-[#241b6b]',
    imagesLink: '#',
    videosLink: '#',
    docsLink: '#',
  },
  {
    id: 'kanan',
    name: 'KANAN',
    tag: 'México',
    desc: 'Preservación del valor cultural del mezcal a través de procesos tradicionales.',
    website: null,
    logoSlot: '/airo-assets/images/logos/kanan',
    logoImg: '/assets/images/logos/kanan.png',
    color: 'bg-[#2D6A4F]',
    imagesLink: '#',
    videosLink: '#',
    docsLink: '#',
  },
  {
    id: 'palenkke-mezcal',
    name: 'PALENKKE MEZCAL',
    tag: 'México',
    desc: 'Tradición artesanal, identidad mexicana y expansión comercial nacional e internacional.',
    website: null,
    logoSlot: '/airo-assets/images/logos/palenkke-mezcal',
    logoImg: '/assets/images/logos/palenkke-mezcal.png',
    color: 'bg-[#7B3F00]',
    imagesLink: '#',
    videosLink: '#',
    docsLink: '#',
  },
  {
    id: 'san-rojo',
    name: 'SAN ROJO',
    tag: 'México',
    desc: 'Diseño, identidad visual y experiencias de marca contemporáneas.',
    website: 'https://sanrojo.com',
    logoSlot: '/airo-assets/images/logos/san-rojo',
    logoImg: '/assets/images/logos/san-rojo.png',
    color: 'bg-[#8B1A1A]',
    imagesLink: '#',
    videosLink: '#',
    docsLink: '#',
  },
  {
    id: 'koldvolt',
    name: 'KOLDVOLT',
    tag: 'Asia',
    desc: 'Innovación, desarrollo comercial y posicionamiento estratégico en nuevos mercados.',
    website: 'https://koldvolt.com',
    logoSlot: '/airo-assets/images/logos/koldvolt',
    logoImg: '/assets/images/logos/koldvolt.png',
    color: 'bg-[#1B3A6B]',
    imagesLink: '#',
    videosLink: '#',
    docsLink: '#',
  },
  {
    id: 'ritevolt',
    name: 'RITEVOLT',
    tag: 'Asia',
    desc: 'Evolución comercial, expansión estratégica y visión nacional e internacional.',
    website: 'https://ritevolt.net',
    logoSlot: '/airo-assets/images/logos/ritevolt',
    logoImg: '/assets/images/logos/ritevolt.png',
    color: 'bg-[#241b6b]',
    imagesLink: '#',
    videosLink: '#',
    docsLink: '#',
  },
  {
    id: 'heartfulcraft',
    name: 'HEARTFULCRAFT',
    tag: 'India',
    desc: 'Creatividad, autenticidad y desarrollo de productos con identidad y valor humano.',
    website: 'https://heartfulcraft.com',
    logoSlot: '/airo-assets/images/logos/heartfulcraft',
    logoImg: '/assets/images/logos/heartfulcraft.png',
    color: 'bg-[#2D6A4F]',
    imagesLink: '#',
    videosLink: '#',
    docsLink: '#',
  },
];

const TAG_COLORS: Record<string, string> = {
  'México': 'bg-[#EEF2F8] text-[#1B3A6B]',
  'Asia':   'bg-[#FFF8EE] text-[#92400E]',
  'India':  'bg-[#FFF3E0] text-[#B45309]',
};

// ─── Logo box ─────────────────────────────────────────────────────────────────
function CompanyLogo({ company }: { company: CompanyEntry }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-sm shrink-0 flex items-center justify-center bg-white border border-[#E8EDF5] shadow-sm overflow-hidden">
        <img
          src={company.logoImg}
          alt={`${company.name} logo`}
          className="w-full h-full object-contain p-2"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  const initials = company.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-sm shrink-0 flex items-center justify-center ${company.color}`}>
      <span className="text-white font-bold text-xl tracking-wider select-none">{initials}</span>
    </div>
  );
}

// ─── Media button ─────────────────────────────────────────────────────────────
function MediaButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase border border-[#D4DCE8] text-[#5A7099] rounded-sm hover:border-[#1B3A6B] hover:text-[#1B3A6B] hover:bg-[#F4F7FB] transition-all duration-200 whitespace-nowrap"
    >
      <Icon size={12} strokeWidth={1.8} />
      {label}
    </a>
  );
}

// ─── Company Media Card ───────────────────────────────────────────────────────
function CompanyMediaCard({ company }: { company: CompanyEntry }) {
  const tagColor = TAG_COLORS[company.tag] ?? 'bg-[#EEF2F8] text-[#1B3A6B]';

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(27,58,107,0.10)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white border border-[#E8EDF5] rounded-sm overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">

        {/* ── Logo ── */}
        <CompanyLogo company={company} />

        {/* ── Info ── */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h2 className="font-heading font-bold text-[#0D1B2E] text-lg md:text-xl tracking-wide leading-tight">
              {company.name}
            </h2>
            <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase rounded-sm ${tagColor}`}>
              {company.tag}
            </span>
          </div>

          <p className="text-[#5A7099] text-sm leading-relaxed mb-3 max-w-md">
            {company.desc}
          </p>

          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1B3A6B] text-xs font-semibold hover:text-[#C9A84C] transition-colors duration-200"
            >
              <Globe size={11} />
              {company.website.replace('https://', '')}
              <ExternalLink size={9} />
            </a>
          ) : (
            <span className="text-[#B0BCCC] text-xs">Website en construcción</span>
          )}
        </div>

        {/* ── Buttons ── */}
        <div className="flex flex-row md:flex-col gap-2 shrink-0">
          <MediaButton href={company.imagesLink} icon={ImageIcon} label="Imágenes" />
          <MediaButton href={company.videosLink} icon={Film}      label="Videos"   />
          <MediaButton href={company.docsLink}   icon={FileText}  label="Documentos" />
        </div>

      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1B3A6B]/10 to-transparent" />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GaleriasPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Recursos de Marca — Grupo Palenkke</title>
        <meta name="description" content="Directorio de recursos multimedia corporativos de las marcas integradas al ecosistema de Grupo Palenkke." />
        <link rel="canonical" href="https://palenkke.org/galerias" />
        <meta property="og:title" content="Recursos de Marca — Grupo Palenkke" />
        <meta property="og:description" content="Directorio de recursos multimedia corporativos de las marcas de Grupo Palenkke." />
        <meta property="og:url" content="https://palenkke.org/galerias" />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-white border-b border-[#E8EDF5]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="max-w-2xl">
            <motion.div variants={fadeUp} className="h-px w-10 bg-[#C9A84C] mb-6" />
            <motion.span variants={fadeUp} className="block text-[11px] font-semibold tracking-[0.22em] uppercase mb-4 text-[#2E5FA3]">
              {t('nav.galleries', 'Recursos de Marca')}
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-[clamp(32px,4.5vw,56px)] font-bold text-[#0D1B2E] leading-tight mb-5">
              Directorio de Recursos
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-base leading-relaxed">
              Acceso rápido a imágenes, videos y documentos corporativos de cada marca del ecosistema Palenkke.
            </motion.p>
          </InView>
        </div>
      </section>

      {/* ── CARDS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="flex flex-col gap-4">
            {COMPANIES.map(company => (
              <CompanyMediaCard key={company.id} company={company} />
            ))}
          </InView>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#E8EDF5]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div variants={fadeUp}>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C9A84C] mb-2">Colaboración</p>
              <h2 className="font-heading font-bold text-[#0D1B2E] text-xl md:text-2xl">
                ¿Tienes material para agregar?
              </h2>
              <p className="text-[#5A7099] text-sm mt-1.5 max-w-md">
                Contacta al equipo de Grupo Palenkke para subir recursos corporativos de tu compañía.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="shrink-0">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#1B3A6B] text-white text-sm font-semibold tracking-wide rounded-sm hover:bg-[#142d54] transition-colors duration-300 shadow-[0_4px_20px_rgba(27,58,107,0.20)]"
              >
                Contactar Equipo
              </a>
            </motion.div>
          </InView>
        </div>
      </section>
    </>
  );
}
