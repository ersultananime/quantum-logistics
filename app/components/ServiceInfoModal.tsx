'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, Loader2, CheckCircle2, Plane, Ship, Box } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

interface ServiceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceKey: 'air' | 'sea' | 'warehouse' | null;
}

const serviceIcons = {
  air: Plane,
  sea: Ship,
  warehouse: Box,
};

const serviceColors = {
  air: 'from-blue-500/20 to-cyan-500/20',
  sea: 'from-teal-500/20 to-emerald-500/20',
  warehouse: 'from-violet-500/20 to-purple-500/20',
};

const serviceLabels: Record<string, { en: string; ru: string }> = {
  air: { en: 'Air Freight', ru: 'Авиаперевозки' },
  sea: { en: 'Sea Logistics', ru: 'Морская логистика' },
  warehouse: { en: 'Smart Warehousing', ru: 'Умные склады' },
};

const serviceHighlights: Record<string, { en: string[]; ru: string[] }> = {
  air: {
    en: ['48-hour delivery', '180+ countries', 'Full insurance', 'GPS tracking'],
    ru: ['Доставка за 48ч', '180+ стран', 'Полное страхование', 'GPS трекинг'],
  },
  sea: {
    en: ['FCL & LCL options', 'AI-optimized routes', 'Carbon-neutral', 'Door-to-door'],
    ru: ['FCL и LCL', 'ИИ-маршруты', 'Эко-перевозки', 'Доставка до двери'],
  },
  warehouse: {
    en: ['8 strategic hubs', 'Robotic systems', 'Zero error rate', 'Cold storage'],
    ru: ['8 складских хабов', 'Роботизация', 'Нулевой % ошибок', 'Холодный склад'],
  },
};

export default function ServiceInfoModal({ isOpen, onClose, serviceKey }: ServiceInfoModalProps) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEmail('');
      setIsSent(false);
      setPreviewUrl(null);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !serviceKey) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/send-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, serviceKey, lang: language }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send');

      setIsSent(true);
      if (data.previewUrl) setPreviewUrl(data.previewUrl);
      toast.success(language === 'ru' ? 'Информация отправлена на ваш email!' : 'Info sent to your email!');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!serviceKey) return null;

  const Icon = serviceIcons[serviceKey];
  const label = serviceLabels[serviceKey][language];
  const highlights = serviceHighlights[serviceKey][language];
  const gradient = serviceColors[serviceKey];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg glass rounded-[32px] border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`} />
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#22D3EE]/10 blur-[80px] pointer-events-none" />

            <div className="relative p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#22D3EE]/15 border border-[#22D3EE]/30 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{label}</h2>
                    <p className="text-[#94A3B8] text-sm mt-0.5">
                      {language === 'ru' ? 'Получить подробную информацию' : 'Get detailed information'}
                    </p>
                  </div>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-[#94A3B8]" />
                </button>
              </div>

              {/* Highlights chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] rounded-full"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {!isSent ? (
                <>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                    {language === 'ru'
                      ? 'Введите ваш email и мы пришлём полное описание услуги, тарифы и условия работы.'
                      : 'Enter your email and we\'ll send you the full service description, pricing, and terms.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={language === 'ru' ? 'Ваш email адрес' : 'Your email address'}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-[#22D3EE]/50 transition-colors text-white placeholder:text-[#94A3B8]/50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full py-4 bg-[#22D3EE] text-[#0B1120] font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl shadow-[#22D3EE]/20 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {language === 'ru' ? 'Отправка...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          {language === 'ru' ? 'Получить на email' : 'Send to Email'}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[#475569] text-xs text-center mt-4">
                    {language === 'ru'
                      ? 'Мы не передаём ваши данные третьим лицам.'
                      : 'We never share your data with third parties.'}
                  </p>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 bg-[#22D3EE]/15 border border-[#22D3EE]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#22D3EE]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {language === 'ru' ? 'Письмо отправлено!' : 'Email Sent!'}
                  </h3>
                  <p className="text-[#94A3B8] text-sm mb-6">
                    {language === 'ru'
                      ? `Подробная информация об услуге "${label}" отправлена на ${email}`
                      : `Detailed info about "${label}" has been sent to ${email}`}
                  </p>

                  {previewUrl && (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#22D3EE] text-sm font-semibold hover:underline mb-6"
                    >
                      <Mail className="w-4 h-4" />
                      {language === 'ru' ? 'Просмотреть письмо (тест)' : 'Preview Email (test)'}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={handleClose}
                    className="w-full py-3.5 border border-white/10 rounded-2xl text-[#94A3B8] hover:bg-white/5 transition-colors font-semibold"
                  >
                    {language === 'ru' ? 'Закрыть' : 'Close'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
