'use client';

import { X, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestModal({ isOpen, onClose }: RequestModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'FTL (Full Truckload)',
    comment: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast.success(t('toast_req_success'));
    
    // Reset and close
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'FTL (Full Truckload)',
      comment: ''
    });
    onClose();
  };

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
              className="glass border border-white/10 w-full max-w-md rounded-3xl overflow-hidden pointer-events-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{t('req_modal_title')}</h2>
                    <p className="text-[#94A3B8] text-sm mt-1">{t('req_modal_desc')}</p>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      required
                      placeholder={t('req_name')} 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-[#22D3EE]/50 transition-colors text-white"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      required
                      placeholder={t('req_phone')} 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-[#22D3EE]/50 transition-colors text-white"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder={t('req_email')} 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-[#22D3EE]/50 transition-colors text-white"
                    />
                  </div>
                  <div>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-[#22D3EE]/50 transition-colors appearance-none text-[#94A3B8]"
                    >
                      <option value="FTL">{t('calc_opt_ftl')}</option>
                      <option value="LTL">{t('calc_opt_ltl')}</option>
                      <option value="FCL">{t('calc_opt_fcl')}</option>
                      <option value="Air">{t('calc_opt_air')}</option>
                      <option value="Contract">{t('calc_opt_contract')}</option>
                    </select>
                  </div>
                  <div>
                    <textarea 
                      rows={3}
                      placeholder={t('req_comment')} 
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-[#22D3EE]/50 transition-colors text-white resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 mt-2 bg-[#22D3EE] text-[#0B1120] font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 glow-cyan"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> {t('req_btn_submit')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
