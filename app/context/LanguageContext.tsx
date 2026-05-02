'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru' | 'kk';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  nav_solutions: { en: 'Solutions', ru: 'Решения', kk: 'Шешімдер' },
  nav_network: { en: 'Network', ru: 'Сеть', kk: 'Желі' },
  nav_intelligence: { en: 'Intelligence', ru: 'Интеллект', kk: 'Интеллект' },
  nav_company: { en: 'Company', ru: 'О нас', kk: 'Біз туралы' },
  nav_client_portal: { en: 'Client Portal', ru: 'Портал клиента', kk: 'Клиент порталы' },
  nav_get_quote: { en: 'Get a Quote', ru: 'Получить расчет', kk: 'Баға алу' },
  hero_tag: { en: 'Next-Gen Logistics', ru: 'Логистика нового поколения', kk: 'Жаңа буын логистика' },
  hero_title_1: { en: 'Logistics at the', ru: 'Логистика со', kk: 'Жарық жылдамдығымен' },
  hero_title_2: { en: 'Speed of Light', ru: 'Скоростью Света', kk: 'Логистика' },
  hero_desc: { en: 'We leverage AI and quantum routing to move your cargo across the globe with unprecedented precision and speed.', ru: 'Мы используем ИИ и квантовую маршрутизацию для перемещения ваших грузов по всему миру с беспрецедентной точностью и скоростью.', kk: 'Біз жүктеріңізді бүкіл әлем бойынша ЖИ және кванттық маршруттау арқылы тасымалдаймыз.' },
  hero_track_placeholder: { en: 'Enter tracking number...', ru: 'Введите номер отслеживания...', kk: 'Бақылау нөмірін енгізіңіз...' },
  hero_track_btn: { en: 'Track Cargo', ru: 'Отследить груз', kk: 'Жүкті бақылау' },
  hero_tracking_btn: { en: 'Searching...', ru: 'Поиск...', kk: 'Іздеу...' },
  sol_title_1: { en: 'Innovative', ru: 'Инновационные', kk: 'Инновациялық' },
  sol_title_2: { en: 'Solutions', ru: 'Решения', kk: 'Шешімдер' },
  sol_desc: { en: 'From autonomous routing to green energy logistics, we redefine how the world moves.', ru: 'От автономной маршрутизации до зеленой энергетики — мы меняем способы передвижения в мире.', kk: 'Автономды маршруттаудан жасыл энергетикалық логистикаға дейін — дүниенің қозғалу тәсілін өзгертеміз.' },
  sol_air: { en: 'Air Freight', ru: 'Авиаперевозки', kk: 'Әуе тасымалы' },
  sol_air_desc: { en: '48-hour global delivery via our premium aerial network.', ru: 'Глобальная доставка за 48 часов через нашу премиальную сеть.', kk: 'Премиум әуе желісі арқылы 48 сағаттық жаһандық жеткізу.' },
  sol_sea: { en: 'Sea Logistics', ru: 'Морская логистика', kk: 'Теңіз логистикасы' },
  sol_sea_desc: { en: 'Sustainable maritime shipping with AI-optimized routes.', ru: 'Экологичные морские перевозки с оптимизацией маршрутов ИИ.', kk: 'ЖИ оңтайландырылған маршруттармен тұрақты теңіз тасымалы.' },
  sol_warehouse: { en: 'Smart Warehousing', ru: 'Умные склады', kk: 'Ақылды қоймалар' },
  sol_warehouse_desc: { en: 'Fully automated fulfillment centers with zero error rate.', ru: 'Полностью автоматизированные центры без права на ошибку.', kk: 'Қателіксіз толық автоматтандырылған орындалу орталықтары.' },
  sol_explore: { en: 'Explore More', ru: 'Узнать больше', kk: 'Толығырақ' },
  calc_title_1: { en: 'Calculate Your', ru: 'Рассчитайте Вашу', kk: 'Тиімділікті' },
  calc_title_2: { en: 'Efficiency', ru: 'Эффективность', kk: 'Есептеңіз' },
  calc_feat_1: { en: 'Fully insured global transit', ru: 'Полностью застрахованный глобальный транзит', kk: 'Толық сақтандырылған жаһандық транзит' },
  calc_feat_2: { en: 'AI-driven route optimization', ru: 'Оптимизация маршрутов с помощью ИИ', kk: 'ЖИ негізіндегі маршрутты оңтайландыру' },
  calc_feat_3: { en: 'Last-mile autonomous delivery', ru: 'Автономная доставка последней мили', kk: 'Автономды соңғы миль жеткізілімі' },
  calc_origin: { en: 'Origin', ru: 'Откуда', kk: 'Қайдан' },
  calc_dest: { en: 'Destination', ru: 'Куда', kk: 'Қайда' },
  calc_city: { en: 'City or Port', ru: 'Город или Порт', kk: 'Қала немесе порт' },
  calc_type: { en: 'Service Type', ru: 'Тип сервиса', kk: 'Қызмет түрі' },
  calc_btn: { en: 'Calculate Instant Quote', ru: 'Моментальный расчет', kk: 'Лезде баға есептеу' },
  calc_opt_ftl: { en: 'FTL (Full Truckload)', ru: 'FTL (Полная фура)', kk: 'FTL (Толық жүк)' },
  calc_opt_ltl: { en: 'LTL (Less Than Truckload)', ru: 'LTL (Сборный груз)', kk: 'LTL (Жинақ жүк)' },
  calc_opt_fcl: { en: 'FCL (Full Container)', ru: 'FCL (Полный контейнер)', kk: 'FCL (Толық контейнер)' },
  calc_opt_air: { en: 'Air Freight Express', ru: 'Авиа Экспресс', kk: 'Әуе экспрессі' },
  calc_opt_contract: { en: 'Contract Logistics', ru: 'Складская логистика', kk: 'Контрактілік логистика' },

  // Stats
  stats_years: { en: 'Years on the market', ru: 'Лет на рынке', kk: 'Нарықтағы жылдар' },
  stats_countries: { en: 'Countries of operation', ru: 'Стран присутствия', kk: 'Қызмет ететін елдер' },
  stats_fleet: { en: 'Trucks in own fleet', ru: 'Собственных грузовиков', kk: 'Меншікті жүк көліктері' },
  stats_hubs: { en: 'Warehouse hubs', ru: 'Складских комплексов', kk: 'Қойма хабтары' },

  // Industries
  ind_title: { en: 'Solutions for', ru: 'Решения для', kk: 'Салалар үшін' },
  ind_subtitle: { en: 'Industries', ru: 'Отраслей', kk: 'Шешімдер' },
  ind_1: { en: 'Electronics', ru: 'Электроники', kk: 'Электроника' },
  ind_2: { en: 'Pharmaceuticals', ru: 'Фармацевтики', kk: 'Фармацевтика' },
  ind_3: { en: 'FMCG & Retail', ru: 'FMCG и Ритейла', kk: 'FMCG және Ритейл' },
  ind_4: { en: 'E-commerce', ru: 'E-commerce', kk: 'E-commerce' },

  // Full Cycle Section
  full_cycle_title: { en: 'Full Cycle', ru: 'Полный цикл', kk: 'Толық цикл' },
  full_cycle_subtitle: { en: 'Logistics', ru: 'логистики', kk: 'логистика' },
  full_cycle_desc_1: { en: 'Quantum Logistics is a strategic partner and key element of the global supply chain.', ru: 'Quantum Logistics — стратегический партнёр и ключевой элемент глобальной цепи поставок.', kk: 'Quantum Logistics — жаһандық жеткізу тізбегінің стратегиялық серіктесі және негізгі элементі.' },
  full_cycle_desc_2: { en: 'We offer national and international level solutions: not just delivery, but comprehensive logistics for businesses of any scale.', ru: 'Мы предлагаем решения национального и международного уровня: не только доставка, но и комплексная логистика для бизнеса любого масштаба.', kk: 'Ұлттық және халықаралық деңгейдегі шешімдерді ұсынамыз: тек жеткізу емес, кез келген масштабтағы бизнес үшін кешенді логистика.' },
  full_cycle_desc_3: { en: 'Modern technologies and a systematic approach help us maintain the stability and growth of the largest marketplaces.', ru: 'Современные технологии и системный подход помогают нам поддерживать стабильность и рост крупнейших маркетплейсов.', kk: 'Заманауи технологиялар мен жүйелі тәсіл ірі маркетплейстердің тұрақтылығы мен өсуін қамтамасыз етуге көмектеседі.' },
  btn_leave_request: { en: 'Leave a Request', ru: 'ОСТАВИТЬ ЗАЯВКУ', kk: 'ӨТІНІМ ҚАЛДЫРУ' },

  // Request Modal
  req_modal_title: { en: 'Leave a Request', ru: 'Оставить заявку', kk: 'Өтінім қалдыру' },
  req_modal_desc: { en: 'Fill out the form below and our manager will contact you shortly.', ru: 'Заполните форму ниже, и наш менеджер свяжется с вами в ближайшее время.', kk: 'Төмендегі форманы толтырыңыз, менеджеріміз жақын арада хабарласады.' },
  req_name: { en: 'Your Name', ru: 'Ваше имя', kk: 'Атыңыз' },
  req_phone: { en: 'Phone Number', ru: 'Номер телефона', kk: 'Телефон нөмірі' },
  req_email: { en: 'Email (Optional)', ru: 'Email (необязательно)', kk: 'Email (міндетті емес)' },
  req_service: { en: 'Service of Interest', ru: 'Интересующая услуга', kk: 'Қызығушылық қызмет' },
  req_comment: { en: 'Comments', ru: 'Комментарий', kk: 'Пікір' },
  req_btn_submit: { en: 'Submit Request', ru: 'Отправить заявку', kk: 'Өтінім жіберу' },
  req_btn_submitting: { en: 'Submitting...', ru: 'Отправка...', kk: 'Жіберілуде...' },
  toast_req_success: { en: 'Request sent successfully! We will contact you soon.', ru: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', kk: 'Өтінім сәтті жіберілді! Жақын арада хабарласамыз.' },

  // Map Modal
  map_modal_title: { en: 'Find a Hub', ru: 'Найди свой Пункт Приема', kk: 'Хабты табу' },
  map_modal_desc: { en: 'Select a city to see the exact location of our hubs.', ru: 'Выберите город, чтобы увидеть точное расположение наших хабов.', kk: 'Хабтарымыздың нақты орналасуын көру үшін қаланы таңдаңыз.' },
  map_hub_1_city: { en: 'Almaty, Hub 1', ru: 'Алматы, Пункт приема 1', kk: 'Алматы, Хаб 1' },
  map_hub_1_addr: { en: 'Turgut Ozal st., 101a', ru: 'ул. Тургут Озала, 101а', kk: 'Тургут Озал к-сі, 101а' },
  map_hub_2_city: { en: 'Almaty, Hub 2', ru: 'Алматы, Пункт приема 2', kk: 'Алматы, Хаб 2' },
  map_hub_2_addr: { en: 'Al-Farabi ave., 13 k2v', ru: 'Проспект Аль-Фараби, 13 к2в', kk: 'Әл-Фараби даңғылы, 13 к2в' },
  map_hub_3_city: { en: 'Astana, Hub 1', ru: 'Астана, Пункт приема 1', kk: 'Астана, Хаб 1' },
  map_hub_3_addr: { en: 'Mangilik El ave., 53', ru: 'пр. Мангилик Ел, 53', kk: 'Мәңгілік Ел даңғылы, 53' },
  map_hub_4_city: { en: 'Shymkent, Hub 1', ru: 'Шымкент, Пункт приема 1', kk: 'Шымкент, Хаб 1' },
  map_hub_4_addr: { en: 'Tole Bi st., 12', ru: 'ул. Толе Би, 12', kk: 'Төле Би к-сі, 12' },

  net_title: { en: 'Global Network Map', ru: 'Глобальная Карта Сети', kk: 'Жаһандық желі картасы' },
  net_desc: { en: 'Expanding horizons with 150+ operational hubs worldwide.', ru: 'Расширяем горизонты с более чем 150 хабами по всему миру.', kk: '150+ жедел хабтармен горизонтты кеңейту.' },
  net_btn: { en: 'View Hub Locations', ru: 'Посмотреть хабы', kk: 'Хаб орналасуларын қарау' },
  footer_text: { en: '© 2026 QUANTUM LOGISTICS. Engineered for Efficiency.', ru: '© 2026 QUANTUM LOGISTICS. Создано для эффективности.', kk: '© 2026 QUANTUM LOGISTICS. Тиімділік үшін жасалған.' },

  // Auth Modal
  auth_login_title: { en: 'Quantum Access', ru: 'Доступ Quantum', kk: 'Quantum қатынасы' },
  auth_login_desc: { en: 'Secure login to your dashboard', ru: 'Безопасный вход в панель управления', kk: 'Басқару панеліне қауіпсіз кіру' },
  auth_reg_title: { en: 'Join the Network', ru: 'Присоединиться к сети', kk: 'Желіге қосылу' },
  auth_reg_desc: { en: 'Create your secure account', ru: 'Создайте безопасный аккаунт', kk: 'Қауіпсіз аккаунт жасаңыз' },
  auth_client: { en: 'Client', ru: 'Клиент', kk: 'Клиент' },
  auth_courier: { en: 'Courier', ru: 'Курьер', kk: 'Курьер' },
  auth_name: { en: 'Full Name', ru: 'Полное Имя', kk: 'Толық аты-жөні' },
  auth_email: { en: 'Email Address', ru: 'Email адрес', kk: 'Email мекенжайы' },
  auth_password: { en: 'Password', ru: 'Пароль', kk: 'Құпия сөз' },
  auth_btn_login: { en: 'Access Dashboard', ru: 'Войти в панель', kk: 'Панельге кіру' },
  auth_btn_reg: { en: 'Register Now', ru: 'Зарегистрироваться', kk: 'Тіркелу' },
  auth_toggle_login: { en: "Don't have an account? Register", ru: 'Нет аккаунта? Зарегистрироваться', kk: 'Аккаунтыңыз жоқ па? Тіркелу' },
  auth_toggle_reg: { en: 'Already have an account? Login', ru: 'Уже есть аккаунт? Войти', kk: 'Аккаунтыңыз бар ма? Кіру' },

  // Toasts
  toast_track_err: { en: 'Please enter a tracking number', ru: 'Пожалуйста, введите номер отслеживания', kk: 'Бақылау нөмірін енгізіңіз' },
  toast_track_load: { en: 'Connecting to Quantum Network...', ru: 'Подключение к сети Quantum...', kk: 'Quantum желісіне қосылуда...' },
  toast_track_succ: { en: 'Cargo located: In Transit (Singapore Hub)', ru: 'Груз найден: В пути (Хаб Сингапур)', kk: 'Жүк табылды: Жолда (Сингапур хабы)' },
  toast_maint: { en: 'Intelligence Center under maintenance', ru: 'Центр Интеллекта на техническом обслуживании', kk: 'Интеллект орталығы техникалық қызмет көрсетуде' },
  toast_comp: { en: 'Company profile coming soon', ru: 'Профиль компании скоро появится', kk: 'Компания профилі жақын арада' },
  toast_details: { en: 'Details sent to your email', ru: 'Детали отправлены на ваш email', kk: 'Мәліметтер email-ге жіберілді' },
  toast_calc: { en: 'Calculating... Result will appear shortly!', ru: 'Рассчитываем... Результат скоро появится!', kk: 'Есептелуде... Нәтиже жақын арада!' },
  toast_map: { en: 'Interactive Map loading...', ru: 'Загрузка интерактивной карты...', kk: 'Интерактивті карта жүктелуде...' },
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
    if (saved && (saved === 'en' || saved === 'ru' || saved === 'kk')) {
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
