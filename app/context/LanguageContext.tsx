'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  nav_solutions: { en: 'Solutions', ru: 'Решения' },
  nav_network: { en: 'Network', ru: 'Сеть' },
  nav_intelligence: { en: 'Intelligence', ru: 'Интеллект' },
  nav_company: { en: 'Company', ru: 'О нас' },
  nav_client_portal: { en: 'Client Portal', ru: 'Портал клиента' },
  nav_get_quote: { en: 'Get a Quote', ru: 'Получить расчет' },
  hero_tag: { en: 'Next-Gen Logistics', ru: 'Логистика нового поколения' },
  hero_title_1: { en: 'Logistics at the', ru: 'Логистика со' },
  hero_title_2: { en: 'Speed of Light', ru: 'Скоростью Света' },
  hero_desc: { en: 'We leverage AI and quantum routing to move your cargo across the globe with unprecedented precision and speed.', ru: 'Мы используем ИИ и квантовую маршрутизацию для перемещения ваших грузов по всему миру с беспрецедентной точностью и скоростью.' },
  hero_track_placeholder: { en: 'Enter tracking number...', ru: 'Введите номер отслеживания...' },
  hero_track_btn: { en: 'Track Cargo', ru: 'Отследить груз' },
  hero_tracking_btn: { en: 'Searching...', ru: 'Поиск...' },
  sol_title_1: { en: 'Innovative', ru: 'Инновационные' },
  sol_title_2: { en: 'Solutions', ru: 'Решения' },
  sol_desc: { en: 'From autonomous routing to green energy logistics, we redefine how the world moves.', ru: 'От автономной маршрутизации до зеленой энергетики — мы меняем способы передвижения в мире.' },
  sol_air: { en: 'Air Freight', ru: 'Авиаперевозки' },
  sol_air_desc: { en: '48-hour global delivery via our premium aerial network.', ru: 'Глобальная доставка за 48 часов через нашу премиальную сеть.' },
  sol_sea: { en: 'Sea Logistics', ru: 'Морская логистика' },
  sol_sea_desc: { en: 'Sustainable maritime shipping with AI-optimized routes.', ru: 'Экологичные морские перевозки с оптимизацией маршрутов ИИ.' },
  sol_warehouse: { en: 'Smart Warehousing', ru: 'Умные склады' },
  sol_warehouse_desc: { en: 'Fully automated fulfillment centers with zero error rate.', ru: 'Полностью автоматизированные центры без права на ошибку.' },
  sol_explore: { en: 'Explore More', ru: 'Узнать больше' },
  calc_title_1: { en: 'Calculate Your', ru: 'Рассчитайте Вашу' },
  calc_title_2: { en: 'Efficiency', ru: 'Эффективность' },
  calc_feat_1: { en: 'Fully insured global transit', ru: 'Полностью застрахованный глобальный транзит' },
  calc_feat_2: { en: 'AI-driven route optimization', ru: 'Оптимизация маршрутов с помощью ИИ' },
  calc_feat_3: { en: 'Last-mile autonomous delivery', ru: 'Автономная доставка последней мили' },
  calc_origin: { en: 'Origin', ru: 'Откуда' },
  calc_dest: { en: 'Destination', ru: 'Куда' },
  calc_city: { en: 'City or Port', ru: 'Город или Порт' },
  calc_type: { en: 'Service Type', ru: 'Тип сервиса' },
  calc_btn: { en: 'Calculate Instant Quote', ru: 'Моментальный расчет' },
  calc_opt_ftl: { en: 'FTL (Full Truckload)', ru: 'FTL (Полная фура)' },
  calc_opt_ltl: { en: 'LTL (Less Than Truckload)', ru: 'LTL (Сборный груз)' },
  calc_opt_fcl: { en: 'FCL (Full Container)', ru: 'FCL (Полный контейнер)' },
  calc_opt_air: { en: 'Air Freight Express', ru: 'Авиа Экспресс' },
  calc_opt_contract: { en: 'Contract Logistics', ru: 'Складская логистика' },
  
  // Stats
  stats_years: { en: 'Years on the market', ru: 'Лет на рынке' },
  stats_countries: { en: 'Countries of operation', ru: 'Стран присутствия' },
  stats_fleet: { en: 'Trucks in own fleet', ru: 'Собственных грузовиков' },
  stats_hubs: { en: 'Warehouse hubs', ru: 'Складских комплексов' },
  
  // Industries
  ind_title: { en: 'Solutions for', ru: 'Решения для' },
  ind_subtitle: { en: 'Industries', ru: 'Отраслей' },
  ind_1: { en: 'Electronics', ru: 'Электроники' },
  ind_2: { en: 'Pharmaceuticals', ru: 'Фармацевтики' },
  ind_3: { en: 'FMCG & Retail', ru: 'FMCG и Ритейла' },
  ind_4: { en: 'E-commerce', ru: 'E-commerce' },
  
  // Full Cycle Section
  full_cycle_title: { en: 'Full Cycle', ru: 'Полный цикл' },
  full_cycle_subtitle: { en: 'Logistics', ru: 'логистики' },
  full_cycle_desc_1: { en: 'Quantum Logistics is a strategic partner and key element of the global supply chain.', ru: 'Quantum Logistics — стратегический партнёр и ключевой элемент глобальной цепи поставок.' },
  full_cycle_desc_2: { en: 'We offer national and international level solutions: not just delivery, but comprehensive logistics for businesses of any scale.', ru: 'Мы предлагаем решения национального и международного уровня: не только доставка, но и комплексная логистика для бизнеса любого масштаба.' },
  full_cycle_desc_3: { en: 'Modern technologies and a systematic approach help us maintain the stability and growth of the largest marketplaces.', ru: 'Современные технологии и системный подход помогают нам поддерживать стабильность и рост крупнейших маркетплейсов.' },
  btn_leave_request: { en: 'Leave a Request', ru: 'ОСТАВИТЬ ЗАЯВКУ' },
  
  // Request Modal
  req_modal_title: { en: 'Leave a Request', ru: 'Оставить заявку' },
  req_modal_desc: { en: 'Fill out the form below and our manager will contact you shortly.', ru: 'Заполните форму ниже, и наш менеджер свяжется с вами в ближайшее время.' },
  req_name: { en: 'Your Name', ru: 'Ваше имя' },
  req_phone: { en: 'Phone Number', ru: 'Номер телефона' },
  req_email: { en: 'Email (Optional)', ru: 'Email (необязательно)' },
  req_service: { en: 'Service of Interest', ru: 'Интересующая услуга' },
  req_comment: { en: 'Comments', ru: 'Комментарий' },
  req_btn_submit: { en: 'Submit Request', ru: 'Отправить заявку' },
  req_btn_submitting: { en: 'Submitting...', ru: 'Отправка...' },
  toast_req_success: { en: 'Request sent successfully! We will contact you soon.', ru: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' },
  
  // Map Modal
  map_modal_title: { en: 'Find a Hub', ru: 'Найди свой Пункт Приема' },
  map_modal_desc: { en: 'Select a city to see the exact location of our hubs.', ru: 'Выберите город, чтобы увидеть точное расположение наших хабов.' },
  map_hub_1_city: { en: 'Almaty, Hub 1', ru: 'Алматы, Пункт приема 1' },
  map_hub_1_addr: { en: 'Turgut Ozal st., 101a', ru: 'ул. Тургут Озала, 101а' },
  map_hub_2_city: { en: 'Almaty, Hub 2', ru: 'Алматы, Пункт приема 2' },
  map_hub_2_addr: { en: 'Al-Farabi ave., 13 k2v', ru: 'Проспект Аль-Фараби, 13 к2в' },
  map_hub_3_city: { en: 'Astana, Hub 1', ru: 'Астана, Пункт приема 1' },
  map_hub_3_addr: { en: 'Mangilik El ave., 53', ru: 'пр. Мангилик Ел, 53' },
  map_hub_4_city: { en: 'Shymkent, Hub 1', ru: 'Шымкент, Пункт приема 1' },
  map_hub_4_addr: { en: 'Tole Bi st., 12', ru: 'ул. Толе Би, 12' },
  
  net_title: { en: 'Global Network Map', ru: 'Глобальная Карта Сети' },
  net_desc: { en: 'Expanding horizons with 150+ operational hubs worldwide.', ru: 'Расширяем горизонты с более чем 150 хабами по всему миру.' },
  net_btn: { en: 'View Hub Locations', ru: 'Посмотреть хабы' },
  footer_text: { en: '© 2026 QUANTUM LOGISTICS. Engineered for Efficiency.', ru: '© 2026 QUANTUM LOGISTICS. Создано для эффективности.' },
  
  // Auth Modal
  auth_login_title: { en: 'Quantum Access', ru: 'Доступ Quantum' },
  auth_login_desc: { en: 'Secure login to your dashboard', ru: 'Безопасный вход в панель управления' },
  auth_reg_title: { en: 'Join the Network', ru: 'Присоединиться к сети' },
  auth_reg_desc: { en: 'Create your secure account', ru: 'Создайте безопасный аккаунт' },
  auth_client: { en: 'Client', ru: 'Клиент' },
  auth_courier: { en: 'Courier', ru: 'Курьер' },
  auth_name: { en: 'Full Name', ru: 'Полное Имя' },
  auth_email: { en: 'Email Address', ru: 'Email адрес' },
  auth_password: { en: 'Password', ru: 'Пароль' },
  auth_btn_login: { en: 'Access Dashboard', ru: 'Войти в панель' },
  auth_btn_reg: { en: 'Register Now', ru: 'Зарегистрироваться' },
  auth_toggle_login: { en: "Don't have an account? Register", ru: 'Нет аккаунта? Зарегистрироваться' },
  auth_toggle_reg: { en: 'Already have an account? Login', ru: 'Уже есть аккаунт? Войти' },
  
  // Toasts
  toast_track_err: { en: 'Please enter a tracking number', ru: 'Пожалуйста, введите номер отслеживания' },
  toast_track_load: { en: 'Connecting to Quantum Network...', ru: 'Подключение к сети Quantum...' },
  toast_track_succ: { en: 'Cargo located: In Transit (Singapore Hub)', ru: 'Груз найден: В пути (Хаб Сингапур)' },
  toast_details: { en: 'Details sent to your email', ru: 'Детали отправлены на ваш email' },
  toast_calc: { en: 'Calculating... Result will appear shortly!', ru: 'Рассчитываем... Результат скоро появится!' },
  toast_map: { en: 'Interactive Map loading...', ru: 'Загрузка интерактивной карты...' },

  // About Modal
  about_tag: { en: 'About Us', ru: 'О нас' },
  about_title: { en: 'Quantum Logistics', ru: 'Quantum Logistics' },
  about_subtitle: { en: 'Strategic partner in global supply chains', ru: 'Стратегический партнёр в глобальных цепях поставок' },
  about_desc1: {
    en: 'Quantum Logistics was founded in 2009 and has grown into one of Central Asia\'s leading logistics companies. We combine cutting-edge technology with 17 years of expertise to deliver unmatched freight solutions for businesses of any scale.',
    ru: 'Quantum Logistics основана в 2009 году и выросла в одну из ведущих логистических компаний Центральной Азии. Мы объединяем передовые технологии с 17-летним опытом для предоставления непревзойдённых логистических решений для бизнеса любого масштаба.',
  },
  about_desc2: {
    en: 'Our mission is to make global trade seamless, sustainable and smart — powered by AI-driven routing, a 170+ truck fleet, and 8 strategically located warehouse hubs across Kazakhstan and beyond.',
    ru: 'Наша миссия — сделать глобальную торговлю бесшовной, устойчивой и умной, используя маршрутизацию на базе ИИ, флот из 170+ грузовиков и 8 стратегически расположенных складских комплексов по Казахстану и за его пределами.',
  },
  about_stat1_val: { en: '17', ru: '17' },
  about_stat1_label: { en: 'Years on market', ru: 'Лет на рынке' },
  about_stat2_val: { en: '4', ru: '4' },
  about_stat2_label: { en: 'Countries', ru: 'Страны' },
  about_stat3_val: { en: '170+', ru: '170+' },
  about_stat3_label: { en: 'Own trucks', ru: 'Собственных грузовиков' },
  about_stat4_val: { en: '8', ru: '8' },
  about_stat4_label: { en: 'Warehouse hubs', ru: 'Складских хабов' },
  about_values_title: { en: 'Our Values', ru: 'Наши ценности' },
  about_val1_title: { en: 'Reliability', ru: 'Надёжность' },
  about_val1_desc: { en: 'Full cargo insurance and zero tolerance for delays.', ru: 'Полное страхование груза и нулевая терпимость к задержкам.' },
  about_val2_title: { en: 'Innovation', ru: 'Инновации' },
  about_val2_desc: { en: 'AI-driven routing and robotic warehouse systems.', ru: 'ИИ-маршрутизация и роботизированные складские системы.' },
  about_val3_title: { en: 'Partnership', ru: 'Партнёрство' },
  about_val3_desc: { en: 'Long-term relationships built on trust and transparency.', ru: 'Долгосрочные отношения, основанные на доверии и прозрачности.' },
  about_val4_title: { en: 'Excellence', ru: 'Превосходство' },
  about_val4_desc: { en: 'Award-winning logistics certified to ISO 9001 standards.', ru: 'Отмеченная наградами логистика, сертифицированная по ISO 9001.' },
  about_close_btn: { en: 'Close', ru: 'Закрыть' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('ql_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ru')) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('ql_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
