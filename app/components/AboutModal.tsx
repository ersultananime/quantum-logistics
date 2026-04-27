'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Truck, Building2, BarChart3, Users, Award, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stats = [
  { icon: BarChart3, valueKey: 'about_stat1_val', labelKey: 'about_stat1_label' },
  { icon: Globe,    valueKey: 'about_stat2_val', labelKey: 'about_stat2_label' },
  { icon: Truck,    valueKey: 'about_stat3_val', labelKey: 'about_stat3_label' },
  { icon: Building2,valueKey: 'about_stat4_val', labelKey: 'about_stat4_label' },
];

const values = [
  { icon: ShieldCheck, titleKey: 'about_val1_title', descKey: 'about_val1_desc' },
  { icon: Zap,         titleKey: 'about_val2_title', descKey: 'about_val2_desc' },
  { icon: Users,       titleKey: 'about_val3_title', descKey: 'about_val3_desc' },
  { icon: Award,       titleKey: 'about_val4_title', descKey: 'about_val4_desc' },
];

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-[32px] border border-white/10 shadow-2xl"
          >
            {/* Glow effects */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#22D3EE]/10 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#22D3EE]/5 blur-[80px] pointer-events-none rounded-full" />

            <div className="relative p-8 lg:p-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-xs font-bold tracking-widest uppercase mb-3">
                    <Globe className="w-3 h-3" /> {t('about_tag')}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{t('about_title')}</h2>
                  <p className="text-[#94A3B8] text-sm mt-1">{t('about_subtitle')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0 ml-4"
                >
                  <X className="w-5 h-5 text-[#94A3B8]" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-4 text-[#94A3B8] leading-relaxed mb-10">
                <p>{t('about_desc1')}</p>
                <p>{t('about_desc2')}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-[#22D3EE]/30 transition-colors group"
                  >
                    <s.icon className="w-6 h-6 text-[#22D3EE] mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="text-2xl font-bold text-white">{t(s.valueKey)}</div>
                    <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1 leading-tight">{t(s.labelKey)}</div>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 mb-8" />

              {/* Values */}
              <h3 className="text-sm font-bold text-[#22D3EE] uppercase tracking-widest mb-6">{t('about_values_title')}</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {values.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#22D3EE]/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#22D3EE]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <v.icon className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{t(v.titleKey)}</div>
                      <div className="text-[#94A3B8] text-xs leading-relaxed">{t(v.descKey)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-full py-3.5 border border-white/10 rounded-2xl text-[#94A3B8] hover:bg-white/5 hover:text-white transition-all font-semibold text-sm"
              >
                {t('about_close_btn')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
