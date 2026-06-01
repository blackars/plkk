import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Handshake, Truck, Store, Star, Calendar, Sparkles, Send, CheckCircle, ChevronDown } from 'lucide-react';

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICONS = [Truck, Store, Star, Calendar, Sparkles];

// ─── Eyebrow ─────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-0.5 w-10 bg-[#C9A84C]" />
      <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.18em] uppercase">{children}</span>
    </div>
  );
}

// ─── Partnership Card ─────────────────────────────────────────────────────────
function PartnerCard({ icon: Icon, title, desc, index }: { icon: React.ElementType; title: string; desc: string; index: number }) {
  const [open, setOpen] = useState(false);
  const paragraphs = desc.split('\n\n');

  return (
    <motion.div
      variants={fadeUp}
      className="group border border-[#D4DCE8] rounded-sm bg-white hover:border-[#1B3A6B]/30 hover:shadow-[0_8px_40px_rgba(27,58,107,0.10)] transition-all duration-400"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-5 p-7 text-left"
        aria-expanded={open}
      >
        {/* Number + Icon */}
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-sm bg-[#EEF2F8] group-hover:bg-[#1B3A6B] transition-colors duration-300 flex items-center justify-center">
            <Icon size={20} className="text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-[#1B3A6B]/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title + chevron */}
        <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
          <h3 className="text-[#0D1B2E] font-semibold text-lg leading-snug group-hover:text-[#1B3A6B] transition-colors duration-200">
            {title}
          </h3>
          <ChevronDown
            size={18}
            className={`shrink-0 text-[#1B3A6B]/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expandable body */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-7 pb-7 pl-24 space-y-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[#0D1B2E]/65 text-sm leading-relaxed">{p}</p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', interest: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: `Oportunidad de Asociación: ${form.interest || 'General'}` }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = "w-full px-4 py-3 text-sm border border-[#D4DCE8] rounded-sm bg-white text-[#0D1B2E] placeholder:text-[#0D1B2E]/35 focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20 transition-all duration-200";
  const labelClass = "block text-xs font-semibold tracking-wide text-[#0D1B2E]/60 uppercase mb-1.5";

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#EEF2F8] flex items-center justify-center">
          <CheckCircle size={32} className="text-[#1B3A6B]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0D1B2E] mb-2">{t('legal.form.success_title')}</h3>
          <p className="text-[#0D1B2E]/60 text-sm max-w-xs">{t('legal.form.success_msg')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t('legal.form.name')}</label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder={t('legal.form.name_placeholder')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('legal.form.email')}</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder={t('legal.form.email_placeholder')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('legal.form.phone')}</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder={t('legal.form.phone_placeholder')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('legal.form.company')}</label>
          <input name="company" value={form.company} onChange={handleChange} placeholder={t('legal.form.company_placeholder')} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t('legal.form.interest')}</label>
        <select name="interest" value={form.interest} onChange={handleChange} className={inputClass}>
          <option value="">{t('legal.form.select_default')}</option>
          {(t('legal.form.options', { returnObjects: true }) as string[]).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{t('legal.form.message')}</label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={t('legal.form.message_placeholder')}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{t('legal.form.error_msg')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#1B3A6B] hover:bg-[#142d54] disabled:opacity-60 text-white text-sm font-semibold tracking-wide rounded-sm shadow-[0_4px_16px_rgba(27,58,107,0.25)] hover:shadow-[0_6px_24px_rgba(27,58,107,0.35)] hover:-translate-y-0.5 transition-all duration-300"
      >
        <Send size={15} />
        {status === 'sending' ? '...' : t('legal.form.submit')}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LegalPage() {
  const { t } = useTranslation();
  const items = t('legal.items', { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <>
      <Helmet>
        <title>{t('legal.meta_title')}</title>
        <meta name="description" content={t('legal.meta_desc')} />
        <link rel="canonical" href="https://palenkke.org/asociaciones" />
        <meta property="og:title" content={t('legal.meta_title')} />
        <meta property="og:description" content={t('legal.meta_desc')} />
        <meta property="og:url" content="https://palenkke.org/asociaciones" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 bg-[#0D1B2E] overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <div className="container mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>{t('legal.hero_eyebrow')}</Eyebrow>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              {t('legal.hero_heading')}
            </motion.h1>
            <motion.div variants={fadeUp} className="space-y-4">
              {t('legal.hero_sub').split('\n\n').map((p, i) => (
                <p key={i} className="text-white/65 text-lg leading-relaxed">{p}</p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Partnership Items ── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {items.map((item, i) => (
              <PartnerCard
                key={i}
                index={i}
                icon={ICONS[i] ?? Handshake}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </motion.div>

          {/* CTA text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 max-w-3xl mx-auto text-center space-y-3"
          >
            <p className="text-[#0D1B2E]/60 text-sm leading-relaxed">{t('legal.cta_text')}</p>
            <p className="text-[#1B3A6B] font-semibold text-sm">{t('legal.cta_closing')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-10"
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>{t('legal.form_eyebrow')}</Eyebrow>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0D1B2E] mb-3">
                {t('legal.form_heading')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#0D1B2E]/55 text-base">
                {t('legal.form_sub')}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-[#F7F9FC] border border-[#D4DCE8] rounded-sm p-8 md:p-10"
            >
              <ContactForm />
            </motion.div>

            {/* Email direct */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mt-6 text-center text-sm text-[#0D1B2E]/50"
            >
              O escríbenos directamente a{' '}
              <a href="mailto:contact@palenkke.org" className="text-[#1B3A6B] font-medium hover:text-[#C9A84C] transition-colors duration-200">
                contact@palenkke.org
              </a>
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}
