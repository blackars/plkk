import { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import { Globe, ExternalLink, Image as ImageIcon, Film, FileText, X, Download } from 'lucide-react';

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

// ─── Build-time file scanner ──────────────────────────────────────────────────
const GALLERY_FILES = import.meta.glob('/src/assets/gallery/**/*', { eager: true });

type MediaType = 'images' | 'videos' | 'documents';

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
}

const COMPANIES: CompanyEntry[] = [
  {
    id: 'elixir-del-alma',
    name: 'ELIXIR DEL ALMA',
    tag: 'México',
    desc: 'Tradición, esencia y autenticidad mexicana en una propuesta de experiencia premium.',
    website: 'https://mezcalelixirdelalma.com',
    logoSlot: '/airo-assets/images/logos/elixir',
    logoImg: '/assets/images/logos/elixir-del-alma.png',
    color: 'bg-[#241b6b]',
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
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase border border-[#D4DCE8] text-[#5A7099] rounded-sm hover:border-[#1B3A6B] hover:text-[#1B3A6B] hover:bg-[#F4F7FB] transition-all duration-200 whitespace-nowrap"
    >
      <Icon size={12} strokeWidth={1.8} />
      {label}
    </button>
  );
}

// ─── Company Media Card ───────────────────────────────────────────────────────
function CompanyMediaCard({ company, onOpenMedia }: { company: CompanyEntry; onOpenMedia: (type: MediaType) => void }) {
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
          <MediaButton onClick={() => onOpenMedia('images')}    icon={ImageIcon} label="Imágenes"   />
          <MediaButton onClick={() => onOpenMedia('videos')}    icon={Film}      label="Videos"    />
          <MediaButton onClick={() => onOpenMedia('documents')} icon={FileText}  label="Documentos" />
        </div>

      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1B3A6B]/10 to-transparent" />
    </motion.div>
  );
}

// ─── Gallery Modal ────────────────────────────────────────────────────────────
function GalleryModal({
  company,
  mediaType,
  onClose,
}: {
  company: CompanyEntry;
  mediaType: MediaType;
  onClose: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const files = useMemo(() => {
    return Object.entries(GALLERY_FILES)
      .filter(([key]) => {
        const name = key.split('/').pop() ?? '';
        if (name.startsWith('.')) return false;
        const normalized = key.replace(/\\/g, '/');
        return normalized.includes(`/src/assets/gallery/${company.id}/${mediaType}/`);
      })
      .map(([, mod]) => (mod as { default: string }).default)
      .filter((v): v is string => typeof v === 'string');
  }, [company.id, mediaType]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const label = mediaType === 'images' ? 'Imágenes' : mediaType === 'videos' ? 'Videos' : 'Documentos';
  const Icon = mediaType === 'images' ? ImageIcon : mediaType === 'videos' ? Film : FileText;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-sm shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EDF5] shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <Icon size={18} className="text-[#1B3A6B] shrink-0" />
              <h3 className="font-heading font-bold text-[#0D1B2E] text-lg truncate">
                {company.name}
              </h3>
              <span className="text-[#B0BCCC] hidden sm:inline">—</span>
              <span className="text-[#5A7099] text-sm font-medium hidden sm:inline whitespace-nowrap">{label}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm text-[#5A7099] hover:text-[#0D1B2E] hover:bg-[#F4F7FB] transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Content ── */}
          <div className="flex-1 overflow-y-auto p-6">
            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Icon size={48} className="text-[#D4DCE8] mb-4" />
                <p className="text-[#5A7099] text-sm">No hay archivos disponibles en esta categoría.</p>
                <p className="text-[#B0BCCC] text-xs mt-1">
                  Agrega archivos a <code className="text-[#1B3A6B] bg-[#F4F7FB] px-1 py-0.5 rounded text-[10px]">
                  assets/gallery/{company.id}/{mediaType}/</code>
                </p>
              </div>
            ) : mediaType === 'images' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {files.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(url)}
                    className="group relative aspect-square rounded-sm overflow-hidden border border-[#E8EDF5] bg-[#F7F9FC] hover:border-[#1B3A6B] transition-colors"
                  >
                    <img
                      src={url}
                      alt={`${company.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </button>
                ))}
              </div>
            ) : mediaType === 'videos' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((url, i) => (
                  <div key={i} className="rounded-sm overflow-hidden border border-[#E8EDF5] bg-black">
                    <video
                      src={url}
                      controls
                      className="w-full aspect-video"
                    >
                      Tu navegador no soporta la reproducción de video.
                    </video>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {files.map((url, i) => {
                  const name = url.split('/').pop() ?? `archivo-${i + 1}`;
                  return (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-sm border border-[#E8EDF5] hover:border-[#1B3A6B] hover:bg-[#F4F7FB] transition-all group"
                    >
                      <FileText size={22} className="text-[#5A7099] shrink-0" />
                      <span className="flex-1 text-sm text-[#0D1B2E] truncate">{name}</span>
                      <Download size={14} className="text-[#B0BCCC] group-hover:text-[#1B3A6B] shrink-0" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Image lightbox ── */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
          >
            <X size={28} />
          </button>
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GaleriasPage() {
  const { t } = useTranslation();
  const [modal, setModal] = useState<{ company: CompanyEntry; mediaType: MediaType } | null>(null);

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
              <CompanyMediaCard key={company.id} company={company} onOpenMedia={(type) => setModal({ company, mediaType: type })} />
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
