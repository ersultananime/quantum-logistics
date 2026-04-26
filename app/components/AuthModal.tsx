'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Truck, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'client' | 'courier'>('client');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email, password, role } 
      : { name, email, password, role };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success(data.message || 'Success!');
      onClose();
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md glass rounded-[32px] border border-white/10 p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#22D3EE]/10 blur-[50px] -z-10" />
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">{isLogin ? t('auth_login_title') : t('auth_reg_title')}</h2>
                <p className="text-[#94A3B8] text-sm">{isLogin ? t('auth_login_desc') : t('auth_reg_desc')}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                type="button"
                onClick={() => setRole('client')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                  role === 'client' 
                    ? 'bg-[#22D3EE]/10 border-[#22D3EE] text-[#22D3EE]' 
                    : 'bg-white/5 border-transparent text-[#94A3B8] hover:bg-white/10'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">{t('auth_client')}</span>
              </button>
              <button 
                type="button"
                onClick={() => setRole('courier')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                  role === 'courier' 
                    ? 'bg-[#22D3EE]/10 border-[#22D3EE] text-[#22D3EE]' 
                    : 'bg-white/5 border-transparent text-[#94A3B8] hover:bg-white/10'
                }`}
              >
                <Truck className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">{t('auth_courier')}</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('auth_name')} 
                    required={!isLogin}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#22D3EE]/50 transition-colors"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth_email')} 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#22D3EE]/50 transition-colors"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth_password')} 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#22D3EE]/50 transition-colors"
                />
              </div>

              <button 
                disabled={isLoading}
                className="w-full py-4 bg-[#22D3EE] text-[#0B1120] font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl shadow-[#22D3EE]/20 mt-4 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? t('auth_btn_login') : t('auth_btn_reg')} <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-[#94A3B8] hover:text-white transition-colors"
              >
                {isLogin ? t('auth_toggle_login') : t('auth_toggle_reg')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
