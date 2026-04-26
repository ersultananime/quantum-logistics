'use client';

import { X, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MapModal({ isOpen, onClose }: MapModalProps) {
  const { t } = useLanguage();

  const hubs = [
    { city: t('map_hub_1_city'), addr: t('map_hub_1_addr'), lat: 43.2389, lon: 76.8897 },
    { city: t('map_hub_2_city'), addr: t('map_hub_2_addr'), lat: 43.2220, lon: 76.8512 },
    { city: t('map_hub_3_city'), addr: t('map_hub_3_addr'), lat: 51.1693, lon: 71.4490 },
    { city: t('map_hub_4_city'), addr: t('map_hub_4_addr'), lat: 42.3417, lon: 69.5901 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1120]/80 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass border border-white/10 w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden pointer-events-auto flex flex-col bg-[#0B1120]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div>
                  <h2 className="text-2xl font-bold">{t('map_modal_title')}</h2>
                  <p className="text-[#94A3B8] text-sm mt-1">{t('map_modal_desc')}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                {/* List of Hubs */}
                <div className="w-full md:w-1/3 border-r border-white/10 overflow-y-auto bg-white/5">
                  <div className="p-4 space-y-2">
                    {hubs.map((hub, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-[#22D3EE]/30 group"
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#22D3EE] mt-0.5 group-hover:scale-110 transition-transform" />
                          <div>
                            <h4 className="font-bold text-white text-sm">{hub.city}</h4>
                            <p className="text-xs text-[#94A3B8] mt-1">{hub.addr}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Area (OpenStreetMap iframe centered on Kazakhstan) */}
                <div className="w-full md:w-2/3 h-full bg-[#0B1120] relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=50.0%2C40.0%2C85.0%2C55.0&amp;layer=mapnik" 
                    className="border-none filter invert-[90%] hue-rotate-[180deg] opacity-80"
                    title="Map"
                  />
                  {/* Subtle overlay to fit the dark theme */}
                  <div className="absolute inset-0 bg-[#22D3EE]/5 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
