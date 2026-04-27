import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const serviceDetails: Record<string, { en: object; ru: object }> = {
  air: {
    en: {
      title: 'Air Freight — Quantum Logistics',
      heading: 'Air Freight Services',
      intro: 'Our premium Air Freight service delivers your cargo anywhere in the world within 48 hours.',
      features: [
        '✈️ Global coverage to 180+ countries',
        '⚡ Express delivery within 24–48 hours',
        '📦 Suitable for high-value and time-sensitive cargo',
        '🛡️ Full cargo insurance included',
        '📡 Real-time GPS tracking',
        '🌡️ Temperature-controlled options available',
      ],
      pricing: 'Starting from $350 per 100 kg',
      contact: 'To get an exact quote, reply to this email or visit quantumlogistics.kz',
    },
    ru: {
      title: 'Авиаперевозки — Quantum Logistics',
      heading: 'Услуги авиаперевозок',
      intro: 'Наш премиальный сервис авиаперевозок доставит ваш груз в любую точку мира за 48 часов.',
      features: [
        '✈️ Охват 180+ стран мира',
        '⚡ Экспресс-доставка за 24–48 часов',
        '📦 Для ценных и срочных грузов',
        '🛡️ Полное страхование груза включено',
        '📡 Отслеживание GPS в реальном времени',
        '🌡️ Опции с температурным контролем',
      ],
      pricing: 'От $350 за 100 кг',
      contact: 'Для точного расчёта ответьте на это письмо или посетите quantumlogistics.kz',
    },
  },
  sea: {
    en: {
      title: 'Sea Logistics — Quantum Logistics',
      heading: 'Sea Logistics Services',
      intro: 'Sustainable, AI-optimized maritime shipping for large-volume cargo across the globe.',
      features: [
        '🚢 FCL & LCL shipping options',
        '🌿 Carbon-neutral sea routes available',
        '🤖 AI-optimized route planning',
        '📦 Containers from 20ft to 40ft HQ',
        '🛡️ Full marine cargo insurance',
        '🔗 Door-to-door delivery solutions',
      ],
      pricing: 'FCL from $2,500 per container | LCL from $150 per CBM',
      contact: 'To get an exact quote, reply to this email or visit quantumlogistics.kz',
    },
    ru: {
      title: 'Морская логистика — Quantum Logistics',
      heading: 'Услуги морской логистики',
      intro: 'Экологичные морские перевозки с ИИ-оптимизацией маршрутов для больших объёмов грузов.',
      features: [
        '🚢 Варианты FCL и LCL',
        '🌿 Маршруты с нулевым углеродным следом',
        '🤖 Планирование маршрутов с ИИ',
        '📦 Контейнеры от 20ft до 40ft HQ',
        '🛡️ Полное морское страхование груза',
        '🔗 Решения доставки от двери до двери',
      ],
      pricing: 'FCL от $2500 за контейнер | LCL от $150 за куб. м',
      contact: 'Для точного расчёта ответьте на это письмо или посетите quantumlogistics.kz',
    },
  },
  warehouse: {
    en: {
      title: 'Smart Warehousing — Quantum Logistics',
      heading: 'Smart Warehousing & Fulfillment',
      intro: 'Fully automated fulfillment centers powered by robotics and AI — zero error rate guaranteed.',
      features: [
        '🏭 8 strategic warehouse hubs across Kazakhstan',
        '🤖 Robotic picking and packing systems',
        '📊 Real-time inventory management dashboard',
        '📦 B2B and B2C fulfillment solutions',
        '🔄 Returns processing and quality control',
        '🌡️ Cold storage and special condition zones',
      ],
      pricing: 'Contract logistics from $45 per pallet/month',
      contact: 'To get an exact quote, reply to this email or visit quantumlogistics.kz',
    },
    ru: {
      title: 'Умные склады — Quantum Logistics',
      heading: 'Умные склады и фулфилмент',
      intro: 'Полностью автоматизированные центры выполнения заказов на базе роботизации и ИИ — нулевой процент ошибок.',
      features: [
        '🏭 8 стратегических складских комплексов в Казахстане',
        '🤖 Роботизированные системы комплектации',
        '📊 Дашборд управления запасами в реальном времени',
        '📦 B2B и B2C решения фулфилмента',
        '🔄 Обработка возвратов и контроль качества',
        '🌡️ Холодное хранение и зоны особых условий',
      ],
      pricing: 'Складская логистика от $45 за паллет/месяц',
      contact: 'Для точного расчёта ответьте на это письмо или посетите quantumlogistics.kz',
    },
  },
};

function buildEmailHtml(details: any, lang: string): string {
  const featuresList = details.features
    .map((f: string) => `<li style="margin-bottom:10px; color:#94a3b8;">${f}</li>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#0B1120; font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="max-width:600px; margin:40px auto; background:#111827; border-radius:24px; overflow:hidden; border:1px solid rgba(34,211,238,0.2);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg, #0B1120 0%, #0e1a2e 100%); padding:40px 40px 30px; border-bottom:1px solid rgba(34,211,238,0.15);">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
        <div style="width:36px; height:36px; background:#22D3EE; border-radius:10px; display:flex; align-items:center; justify-content:center;">
          <span style="font-size:18px;">📦</span>
        </div>
        <span style="color:#fff; font-size:20px; font-weight:800; letter-spacing:-0.5px;">QUANTUM<span style="color:#22D3EE;">LOGISTICS</span></span>
      </div>
      <h1 style="color:#ffffff; font-size:28px; font-weight:800; margin:0 0 8px; line-height:1.2;">${details.heading}</h1>
      <p style="color:#94a3b8; margin:0; font-size:15px; line-height:1.6;">${details.intro}</p>
    </div>

    <!-- Features -->
    <div style="padding:36px 40px;">
      <h2 style="color:#22D3EE; font-size:14px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0 0 20px;">${lang === 'ru' ? 'Что включено' : 'What\'s Included'}</h2>
      <ul style="list-style:none; padding:0; margin:0 0 32px;">
        ${featuresList}
      </ul>

      <!-- Pricing -->
      <div style="background:rgba(34,211,238,0.08); border:1px solid rgba(34,211,238,0.25); border-radius:16px; padding:20px 24px; margin-bottom:32px;">
        <p style="color:#22D3EE; font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0 0 8px;">${lang === 'ru' ? 'Стоимость' : 'Pricing'}</p>
        <p style="color:#ffffff; font-size:18px; font-weight:700; margin:0;">${details.pricing}</p>
      </div>

      <!-- CTA -->
      <div style="text-align:center; margin-bottom:24px;">
        <a href="mailto:info@quantumlogistics.kz" style="display:inline-block; background:#22D3EE; color:#0B1120; font-weight:800; font-size:14px; padding:16px 36px; border-radius:14px; text-decoration:none; letter-spacing:0.5px;">
          ${lang === 'ru' ? '📩 Получить точный расчёт' : '📩 Get Exact Quote'}
        </a>
      </div>

      <p style="color:#64748b; font-size:13px; text-align:center; margin:0;">${details.contact}</p>
    </div>

    <!-- Footer -->
    <div style="background:#0B1120; padding:24px 40px; border-top:1px solid rgba(255,255,255,0.05); text-align:center;">
      <p style="color:#475569; font-size:12px; margin:0;">© 2026 QUANTUM LOGISTICS. ${lang === 'ru' ? 'Создано для эффективности.' : 'Engineered for Efficiency.'}</p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const { email, serviceKey, lang } = await req.json();

    if (!email || !serviceKey) {
      return NextResponse.json({ error: 'Email and service key are required' }, { status: 400 });
    }

    const service = serviceDetails[serviceKey];
    if (!service) {
      return NextResponse.json({ error: 'Unknown service' }, { status: 400 });
    }

    const langKey = (lang === 'ru' ? 'ru' : 'en') as 'en' | 'ru';
    const details = service[langKey] as any;

    let transporter: nodemailer.Transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Use real SMTP from .env
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Create a fresh Ethereal test account and transporter
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const info = await transporter.sendMail({
      from: `"Quantum Logistics" <noreply@quantumlogistics.kz>`,
      to: email,
      subject: details.title,
      html: buildEmailHtml(details, langKey),
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('Email preview URL:', previewUrl);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      previewUrl: previewUrl || null,
    });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
