'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Box, Plane, Ship, Menu, CheckCircle2, ArrowRight, Calculator, Truck, ShieldCheck, Zap, Smartphone, Pill, ShoppingCart, Briefcase, BarChart3, Building2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import AuthModal from './components/AuthModal';
import RequestModal from './components/RequestModal';
import MapModal from './components/MapModal';
import { useLanguage } from './context/LanguageContext';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isReqModalOpen, setIsReqModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleTrack = () => {
    if (!trackingId) {
      toast.error('Please enter a tracking number');
      return;
    }
    setIsTracking(true);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: t('toast_track_load'),
      success: () => {
        setIsTracking(false);
        return t('toast_track_succ');
      },
      error: 'Connection failed',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen relative bg-[#0B1120] text-white overflow-hidden scroll-smooth">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <RequestModal isOpen={isReqModalOpen} onClose={() => setIsReqModalOpen(false)} />
      <MapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} />

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsReqModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#22D3EE] text-[#0B1120] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#22D3EE]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#22D3EE]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-[#22D3EE] rounded-lg flex items-center justify-center">
              <Box className="w-5 h-5 text-[#0B1120]" />
            </div>
            <span className="text-xl font-bold tracking-tight">QUANTUM<span className="text-[#22D3EE]">LOGISTICS</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
            <button onClick={() => scrollToSection('solutions')} className="hover:text-[#22D3EE] transition-colors">{t('nav_solutions')}</button>
            <button onClick={() => scrollToSection('network')} className="hover:text-[#22D3EE] transition-colors">{t('nav_network')}</button>
            <button onClick={() => toast.info(t('toast_maint'))} className="hover:text-[#22D3EE] transition-colors">{t('nav_intelligence')}</button>
            <button onClick={() => toast.info(t('toast_comp'))} className="hover:text-[#22D3EE] transition-colors">{t('nav_company')}</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (language === 'en') setLanguage('ru');
                else if (language === 'ru') setLanguage('kk');
                else setLanguage('en');
              }}
              className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] hover:text-white transition-colors"
            >
              {language === 'en' ? 'RU' : language === 'ru' ? 'ҚАЗ' : 'EN'}
            </button>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden md:block px-5 py-2 text-sm font-semibold border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
            >
              {t('nav_client_portal')}
            </button>
            <button 
              onClick={() => scrollToSection('quote')}
              className="px-5 py-2 text-sm font-semibold bg-[#22D3EE] text-[#0B1120] rounded-xl hover:scale-105 transition-transform glow-cyan"
            >
              {t('nav_get_quote')}
            </button>
            <Menu className="md:hidden w-6 h-6" />
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="relative pt-44 pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-xs font-bold tracking-widest uppercase mb-6">
              <Globe className="w-3 h-3" /> {t('hero_tag')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              {t('hero_title_1')} <br />
              <span className="text-gradient">{t('hero_title_2')}</span>
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-lg mb-10 leading-relaxed">
              {t('hero_desc')}
            </p>

            {/* Tracking Input */}
            <div className="glass p-2 rounded-2xl flex items-center gap-2 max-w-md group focus-within:border-[#22D3EE]/50 transition-colors">
              <div className="pl-4 text-[#94A3B8] group-focus-within:text-[#22D3EE] transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder={t('hero_track_placeholder')}
                className="bg-transparent border-none outline-none py-3 px-2 w-full text-white placeholder:text-[#94A3B8]/50"
              />
              <button 
                onClick={handleTrack}
                disabled={isTracking}
                className="bg-[#22D3EE] text-[#0B1120] font-bold py-3 px-6 rounded-xl hover:bg-[#22D3EE]/90 transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {isTracking ? t('hero_tracking_btn') : t('hero_track_btn')}
              </button>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square glass rounded-full relative flex items-center justify-center p-12 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/20 to-transparent opacity-50" />
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border border-dashed border-[#22D3EE]/30 rounded-full flex items-center justify-center p-10"
               >
                 <div className="w-full h-full border border-[#22D3EE]/20 rounded-full flex items-center justify-center p-10">
                    <div className="w-full h-full border border-[#22D3EE]/10 rounded-full" />
                 </div>
               </motion.div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Globe className="w-48 h-48 text-[#22D3EE] opacity-20 blur-[1px]" />
               </div>
               
               {/* Floating Icon Cards */}
               <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 glass p-4 rounded-2xl border border-[#22D3EE]/20 glow-cyan"
               >
                  <Plane className="w-8 h-8 text-[#22D3EE]" />
               </motion.div>
               <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 glass p-4 rounded-2xl border border-[#22D3EE]/20 glow-cyan"
               >
                  <Ship className="w-8 h-8 text-[#22D3EE]" />
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section (Zammler Inspired) */}
      <section className="py-16 px-6 lg:px-12 border-t border-white/5 bg-[#22D3EE]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '17', label: t('stats_years'), icon: BarChart3 },
            { value: '4', label: t('stats_countries'), icon: Globe },
            { value: '170+', label: t('stats_fleet'), icon: Truck },
            { value: '8', label: t('stats_hubs'), icon: Building2 }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#22D3EE]/30 transition-colors group"
            >
              <stat.icon className="w-8 h-8 text-[#22D3EE] mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industries Section (Zammler Inspired) */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('ind_title')} <span className="text-[#22D3EE]">{t('ind_subtitle')}</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {[
            { name: t('ind_1'), icon: Smartphone },
            { name: t('ind_2'), icon: Pill },
            { name: t('ind_3'), icon: ShoppingCart },
            { name: t('ind_4'), icon: Briefcase }
          ].map((ind, i) => (
            <div key={i} className="glass p-6 lg:p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform cursor-pointer border border-[#22D3EE]/10 hover:border-[#22D3EE]/30 group">
              <ind.icon className="w-10 h-10 text-[#22D3EE] mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="font-bold text-[#94A3B8] group-hover:text-white transition-colors">{ind.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('sol_title_1')} <span className="text-[#22D3EE]">{t('sol_title_2')}</span></h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">{t('sol_desc')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Plane, title: t('sol_air'), desc: t('sol_air_desc') },
            { icon: Ship, title: t('sol_sea'), desc: t('sol_sea_desc') },
            { icon: Box, title: t('sol_warehouse'), desc: t('sol_warehouse_desc') }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl group hover:border-[#22D3EE]/30 transition-all"
            >
              <div className="w-14 h-14 bg-[#22D3EE]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">{item.desc}</p>
              <button onClick={() => toast.success(t('toast_details'))} className="flex items-center gap-2 text-[#22D3EE] font-bold text-sm">
                {t('sol_explore')} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote/Calculator Section */}
      <section id="quote" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
         <div className="glass rounded-[40px] overflow-hidden border border-[#22D3EE]/20 p-10 lg:p-20 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">{t('calc_title_1')} <br /> <span className="text-[#22D3EE]">{t('calc_title_2')}</span></h2>
              <ul className="space-y-6">
                {[
                  { icon: ShieldCheck, text: t('calc_feat_1') },
                  { icon: Zap, text: t('calc_feat_2') },
                  { icon: Truck, text: t('calc_feat_3') }
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#22D3EE]/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <span className="text-[#94A3B8] font-medium">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-[#94A3B8] uppercase block mb-2">{t('calc_origin')}</label>
                    <input type="text" placeholder={t('calc_city')} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-[#22D3EE]/50" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#94A3B8] uppercase block mb-2">{t('calc_dest')}</label>
                    <input type="text" placeholder={t('calc_city')} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-[#22D3EE]/50" />
                  </div>
               </div>
               <div className="mb-8">
                  <label className="text-xs font-bold text-[#94A3B8] uppercase block mb-2">{t('calc_type')}</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-[#22D3EE]/50 appearance-none text-[#94A3B8]">
                    <option>{t('calc_opt_ftl')}</option>
                    <option>{t('calc_opt_ltl')}</option>
                    <option>{t('calc_opt_fcl')}</option>
                    <option>{t('calc_opt_air')}</option>
                    <option>{t('calc_opt_contract')}</option>
                  </select>
               </div>
               <button 
                onClick={() => toast.success(t('toast_calc'))}
                className="w-full py-4 bg-[#22D3EE] text-[#0B1120] font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl shadow-[#22D3EE]/20"
               >
                 <Calculator className="w-5 h-5" /> {t('calc_btn')}
               </button>
            </div>
         </div>
      </section>

      {/* Network Section */}
      <section id="network" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto text-center border-t border-white/5">
         <Globe className="w-20 h-20 text-[#22D3EE] mx-auto mb-8 animate-pulse opacity-50" />
         <h2 className="text-3xl font-bold mb-4">{t('net_title')}</h2>
         <p className="text-[#94A3B8] mb-12">{t('net_desc')}</p>
         <button onClick={() => setIsMapModalOpen(true)} className="glass px-8 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors">
            {t('net_btn')}
         </button>
      </section>

      {/* Full Cycle Logistics Section (Zammler Inspired) */}
      <section className="py-24 px-6 lg:px-12 border-t border-white/5 bg-[#22D3EE]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#22D3EE]/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-[40px] overflow-hidden border border-white/10 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80" 
              alt="Logistics Fleet" 
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#22D3EE]">
              {t('full_cycle_title')} <br />
              <span className="text-white">{t('full_cycle_subtitle')}</span>
            </h2>
            <div className="space-y-4 text-[#94A3B8] leading-relaxed mb-10 text-lg">
              <p>{t('full_cycle_desc_1')}</p>
              <p>{t('full_cycle_desc_2')}</p>
              <p>{t('full_cycle_desc_3')}</p>
            </div>
            <button 
              onClick={() => setIsReqModalOpen(true)}
              className="px-8 py-4 bg-[#22D3EE] text-[#0B1120] font-bold rounded-2xl hover:scale-105 transition-transform glow-cyan tracking-wider uppercase text-sm"
            >
              {t('btn_leave_request')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-[#94A3B8] text-sm">
        <p>{t('footer_text')}</p>
      </footer>
    </main>
  );
}
