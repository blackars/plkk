import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView, type Variants } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ChevronRight, Mail, Phone, MapPin,
  Linkedin, Instagram, Facebook,
  CheckCircle2, Send, Clock, Globe, Users, Loader2,
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/socialConfig';
import { usePlausible } from '@/lib/usePlausible';

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
};

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

// ─── Data ─────────────────────────────────────────────────────────────────────
const interests = [
  'Desarrollo de Marca',
  'Incubación de Producto',
  'Comercialización',
  'Expansión Internacional',
  'Alianza Estratégica',
  'Inversión',
  'Distribución',
  'Consultoría',
  'Otro',
];

const contactInfo = [
  {
    Icon: Mail,
    label: 'Correo Electrónico',
    value: 'palenkke.mkt@gmail.com',
    href: 'mailto:palenkke.mkt@gmail.com',
    flag: null,
  },
  {
    Icon: Phone,
    label: '🇺🇸 +1 (703) 981-2991',
    value: '+1 (703) 981-2991',
    href: 'tel:+17039812991',
    flag: '🇺🇸',
  },
  {
    Icon: Phone,
    label: '🇲🇽 +52 228 144 7372',
    value: '+52 228 144 7372',
    href: 'tel:+522281447372',
    flag: '🇲🇽',
  },
  {
    Icon: MapPin,
    label: 'Oficinas',
    value: 'Estados Unidos · México',
    href: null,
    flag: null,
  },
];

const socialLinks = SOCIAL_LINKS;

const profiles = [
  { Icon: Users, title: 'Inversionistas', desc: 'Oportunidades de inversión en marcas con alto potencial.' },
  { Icon: Globe, title: 'Distribuidores', desc: 'Acceso a portafolio premium para distribución nacional e internacional.' },
  { Icon: CheckCircle2, title: 'Socios', desc: 'Alianzas estratégicas para co-desarrollar y co-distribuir.' },
  { Icon: ArrowRight, title: 'Productores', desc: 'Incubación y comercialización de productos con visión global.' },
];

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', interest: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const trackEvent = usePlausible();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Error al enviar. Por favor intenta de nuevo.');
        setStatus('error');
        trackEvent('Contact Form Error', { props: { reason: data.error ?? 'unknown' } });
      } else {
        setStatus('success');
        trackEvent('Contact Form Submit', { props: { interest: form.interest || 'none' } });
        setForm({ name: '', email: '', phone: '', company: '', interest: '', message: '' });
      }
    } catch {
      setErrorMsg('Error de conexión. Por favor intenta de nuevo.');
      setStatus('error');
      trackEvent('Contact Form Error', { props: { reason: 'network' } });
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-16 h-16 bg-[#EEF2F8] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={28} className="text-[#1B3A6B]" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-[#0D1B2E] mb-3">¡Mensaje Enviado!</h3>
        <p className="text-[#5A7099] text-base leading-relaxed mb-8 max-w-sm">
          Gracias por contactarnos. Nuestro equipo revisará tu mensaje y se pondrá en contacto contigo en menos de 24 horas.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-semibold text-[#1B3A6B] hover:underline transition-all"
        >
          Enviar otro mensaje
        </button>
      </motion.div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm text-[#0D1B2E] text-sm placeholder:text-[#9AAAC0] focus:outline-none focus:border-[#1B3A6B] focus:bg-white transition-all duration-200";
  const labelClass = "block text-xs font-semibold text-[#5A7099] tracking-wide uppercase mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Nombre completo *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Correo electrónico *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>Teléfono / WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+52 55 0000 0000"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>Empresa / Marca</label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
            className={inputClass}
          />
        </div>
      </div>

      {/* Interest */}
      <div>
        <label htmlFor="interest" className={labelClass}>¿En qué podemos ayudarte?</label>
        <select
          id="interest"
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Selecciona una opción</option>
          {interests.map(i => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Mensaje *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Cuéntanos sobre tu proyecto, marca o idea. ¿Qué quieres lograr?"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-sm px-4 py-3"
        >
          {errorMsg}
        </motion.p>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#1B3A6B] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#142d54] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 rounded-sm shadow-[0_4px_20px_rgba(27,58,107,0.25)] hover:shadow-[0_8px_32px_rgba(27,58,107,0.35)]"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar Mensaje
            <Send size={15} />
          </>
        )}
      </motion.button>

      <p className="text-[#9AAAC0] text-xs text-center">
        Al enviar este formulario aceptas que nos pongamos en contacto contigo.
      </p>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactoPage() {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hash === '#form' && formSectionRef.current) {
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [hash]);
  return (
    <>
      <Helmet>
        <title>{t('contacto.meta_title')}</title>
        <meta name="description" content={t('contacto.meta_desc')} />
        <meta name="keywords" content="contacto Grupo Palenkke, inversión marcas México, distribución productos, alianzas estratégicas, socios comerciales, contact Palenkke" />
        <link rel="canonical" href="https://www.palenkke.org/contacto" />
        <meta property="og:title" content={t('contacto.meta_title')} />
        <meta property="og:description" content={t('contacto.meta_desc')} />
        <meta property="og:image" content="https://www.palenkke.org/airo-assets/images/pages/nosotros/historia" />
        <meta property="og:url" content="https://www.palenkke.org/contacto" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupo Palenkke" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('contacto.meta_title')} />
        <meta name="twitter:description" content={t('contacto.meta_desc')} />
        <meta name="twitter:image" content="https://www.palenkke.org/airo-assets/images/pages/nosotros/historia" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t('contacto.meta_title'),
          description: t('contacto.meta_desc'),
          url: 'https://www.palenkke.org/contacto',
          publisher: {
            '@type': 'Organization',
            name: 'Grupo Palenkke',
            url: 'https://www.palenkke.org',
            email: 'palenkke.mkt@gmail.com',
          },
        })}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-[#0D1B2E]">
        <div className="absolute inset-0">
          <img
            src="/airo-assets/images/pages/nosotros/historia"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/90 to-[#0D1B2E]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-[#0D1B2E]/60" />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ct-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2E5FA3" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ct-grid)" />
          </svg>
        </div>

        {/* Glows */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] rounded-full bg-[#1B3A6B]/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-[#241b6b]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-20 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/30 text-xs mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{t('nav.contact')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">
                {t('contacto.hero_eyebrow')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[clamp(44px,7vw,92px)] font-bold text-white leading-tight mb-6"
            >
              {t('contacto.hero_heading').split(' ').slice(0, -1).join(' ')}<br />
              <span className="text-[#C9A84C]">{t('contacto.hero_heading').split(' ').slice(-1)[0]}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed max-w-xl">
              {t('contacto.hero_sub')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTACT SECTION ──────────────────────────────────────────── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* ── Left: Info Panel (2/5) ── */}
            <InViewSingle variant={fadeLeft} className="lg:col-span-2">
              <div className="space-y-6">

                {/* Intro card */}
                <div className="bg-[#0D1B2E] rounded-sm p-8 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="info-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#info-grid)" />
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#1B3A6B]/30 blur-[60px] rounded-full pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-px w-8 bg-[#C9A84C]" />
                      <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase">Información</span>
                    </div>
                    <h2 className="font-heading text-xl font-bold text-white mb-3">Información de Contacto</h2>
                    <p className="text-white/45 text-sm leading-relaxed">
                      Estamos disponibles para atender tu consulta. Nuestro equipo responde en menos de 24 horas hábiles.
                    </p>
                  </div>
                </div>

                {/* Contact details */}
                <div className="bg-white border border-[#D4DCE8] rounded-sm overflow-hidden">
                  {contactInfo.map(({ Icon, label, value, href }, i) => (
                    <div
                      key={label}
                      className={`flex items-start gap-4 p-5 group hover:bg-[#F7F9FC] transition-colors duration-200 ${i < contactInfo.length - 1 ? 'border-b border-[#D4DCE8]' : ''}`}
                    >
                      <div className="w-9 h-9 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0 group-hover:bg-[#1B3A6B] transition-colors duration-300">
                        <Icon size={14} className="text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-[#9AAAC0] text-xs tracking-wide mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-[#0D1B2E] text-sm font-medium hover:text-[#1B3A6B] transition-colors duration-200">
                            {value}
                          </a>
                        ) : (
                          <p className="text-[#0D1B2E] text-sm font-medium">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Response time */}
                <div className="bg-white border border-[#D4DCE8] rounded-sm p-5 flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#EEF2F8] rounded-sm flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-[#1B3A6B]" />
                  </div>
                  <div>
                    <p className="text-[#0D1B2E] text-sm font-semibold">Tiempo de respuesta</p>
                    <p className="text-[#5A7099] text-xs">Menos de 24 horas hábiles</p>
                  </div>
                </div>

                {/* Social links */}
                <div className="bg-white border border-[#D4DCE8] rounded-sm p-6">
                  <p className="text-[#9AAAC0] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Síguenos</p>
                  <div className="flex gap-3">
                    {socialLinks.map(({ platform, label, href }) => {
                      const Icon = PLATFORM_ICONS[platform];
                      return (
                        <motion.a
                          key={platform}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          whileHover={{ y: -3, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="w-10 h-10 bg-[#EEF2F8] rounded-sm flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-colors duration-300"
                        >
                          <Icon size={16} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

              </div>
            </InViewSingle>

            {/* ── Right: Form (3/5) ── */}
            <InViewSingle variant={fadeRight} className="lg:col-span-3">
              <div id="form" ref={formSectionRef} className="bg-white border border-[#D4DCE8] rounded-sm shadow-[0_4px_32px_rgba(27,58,107,0.08)] overflow-hidden">
                {/* Form header */}
                <div className="px-8 pt-8 pb-6 border-b border-[#D4DCE8]">
                  <h2 className="font-heading text-2xl font-bold text-[#0D1B2E] mb-1">Envíanos un Mensaje</h2>
                  <p className="text-[#5A7099] text-sm">Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo.</p>
                </div>
                <div className="p-8">
                  <ContactForm />
                </div>
              </div>
            </InViewSingle>

          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-[#D4DCE8]">
        <div className="container mx-auto px-6 lg:px-10">
          <InView className="mb-12 text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#1B3A6B]" />
            </motion.div>
            <motion.span variants={fadeUp} className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-[#2E5FA3]">
              Audiencias
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(24px,3vw,40px)] font-bold text-[#0D1B2E] leading-tight">
              ¿Quién Puede Contactarnos?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#5A7099] text-base mt-3 max-w-lg mx-auto">
              Trabajamos con cuatro perfiles estratégicos. Si encajas en alguno, hay una oportunidad esperándote.
            </motion.p>
          </InView>

          <InView>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {profiles.map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(27,58,107,0.11)' }}
                  transition={{ duration: 0.25 }}
                  className="group bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm p-7 hover:border-[#1B3A6B]/30 hover:bg-white transition-all duration-300 cursor-default"
                >
                  <div className="w-11 h-11 bg-[#EEF2F8] rounded-sm flex items-center justify-center mb-5 group-hover:bg-[#1B3A6B] transition-colors duration-300">
                    <Icon size={18} className="text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-[#0D1B2E] text-base mb-2 group-hover:text-[#1B3A6B] transition-colors duration-300">{title}</h3>
                  <p className="text-[#5A7099] text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1B3A6B] relative overflow-hidden">
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
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <div className="h-0.5 w-12 bg-[#C9A84C]" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(24px,3.5vw,44px)] font-bold text-white leading-tight mb-4 max-w-2xl mx-auto">
              ¿Prefieres conocer más antes de escribirnos?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-base mb-10 max-w-lg mx-auto">
              Explora nuestros casos de éxito, servicios y productos para entender cómo trabajamos.
            </motion.p>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={fadeUp}>
                <Link
                  to="/casos"
                  className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-[#1B3A6B] font-semibold text-sm tracking-wider uppercase hover:bg-[#EEF2F8] transition-all duration-300 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                >
                  Casos de Éxito
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm"
                >
                  Nuestros Servicios
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-sm"
                >
                  Productos
                </Link>
              </motion.div>
            </motion.div>
          </InView>
        </div>
      </section>
    </>
  );
}
