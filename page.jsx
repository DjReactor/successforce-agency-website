'use client';

import { useState, useEffect, useRef } from 'react';

// ── Icon Components ──────────────────────────────────────────────────────────
const Icon = ({ path, size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const icons = {
  revenue:     'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  efficiency:  'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  sanity:      'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  check:       'M20 6L9 17l-5-5',
  arrow:       'M5 12h14M12 5l7 7-7 7',
  phone:       'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 2.84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 10a16 16 0 006.72 6.72l.73-.84a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
  workflow:    'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  calendar:    'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
  bot:         'M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zM3 8h18v11a3 3 0 01-3 3H6a3 3 0 01-3-3V8zM8 13h.01M16 13h.01M8 17h8',
  database:    'M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zM2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5',
  clock:       'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2',
  star:        'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  menu:        'M3 12h18M3 6h18M3 18h18',
  close:       'M18 6L6 18M6 6l12 12',
  quote:       'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z',
  mail:        'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  zap:         'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  target:      'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z',
  trending:    'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  users:       'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  repeat:      'M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3',
};

// ── useIntersection hook ─────────────────────────────────────────────────────
function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Counter component ────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }) {
  const [ref, visible] = useIntersection();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1400;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── FadeIn wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, visible] = useIntersection(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function SuccessForceLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['Solutions', 'How It Works', 'Pricing', 'FAQ'];

  const pillars = [
    {
      icon: 'revenue', num: '01',
      title: 'Scale Revenue',
      headline: 'Turn every missed call into booked revenue',
      body: 'Voice AI agents answer every inquiry instantly — 24/7, across every channel. No more leads going cold while your team sleeps.',
      items: ['Instant lead capture & follow-up', 'Automated appointment booking', 'Outbound lead reactivation', '24/7 sales coverage', 'Speed-to-lead under 60 seconds', 'Upsell & cross-sell triggers'],
    },
    {
      icon: 'efficiency', num: '02',
      title: 'Increase Business Efficiency',
      headline: 'Stop doing manually what machines do better',
      body: 'Intelligent N8N automations connect your entire tech stack — CRM, calendar, inbox, ticketing — eliminating the repetitive admin that eats your team\'s day.',
      items: ['Auto CRM updates & data sync', 'Smart call routing & escalation', 'Automated follow-up sequences', 'Duplicate data entry eliminated', 'Real-time reporting & visibility', 'Internal workflow automation'],
    },
    {
      icon: 'sanity', num: '03',
      title: 'Keep Your Sanity Intact',
      headline: 'Reclaim focus. End the operational chaos',
      body: 'Remove the endless micro-tasks, after-hours stress, and team burnout that come with managing everything manually. Build a calmer, more predictable operation.',
      items: ['Eliminate after-hours call pressure', 'Prevent Monday morning pileups', 'Reduce repetitive phone work', 'Free your team for high-value work', 'Remove founder dependence bottlenecks', 'Predictable, consistent processes'],
    },
  ];

  const howItWorks = [
    { icon: 'phone', step: '01', title: 'Voice AI Agent (RetellAI)', body: 'Custom-trained AI voice agents handle inbound calls, qualify leads, book appointments, and answer FAQs — indistinguishable from a human receptionist but available every minute of the day.' },
    { icon: 'workflow', step: '02', title: 'Intelligent Automation (N8N)', body: 'Behind every voice interaction sits a powerful N8N workflow engine connecting your CRM, calendar, SMS, email, and internal tools. Data flows automatically — no manual entry, no dropped balls.' },
    { icon: 'database', step: '03', title: 'Seamless Tech Stack Integration', body: 'Every system we build plugs into what you already use. No rip-and-replace. Your existing tools become exponentially more powerful through connected intelligence.' },
    { icon: 'trending', step: '04', title: 'Revenue Engine — Live in Weeks', body: 'We deploy, train, and hand you a fully operational system. Most clients go live in 2–4 weeks and see measurable impact in month one.' },
  ];

  const problems = [
    { icon: 'clock',    title: 'Missed Lead Capture',        body: 'Respond to every inquiry instantly — calls, forms, SMS, DMs — before they go cold.' },
    { icon: 'target',   title: 'Slow Speed-to-Lead',         body: 'Reach prospects in under 60 seconds. The first business to respond wins the deal.' },
    { icon: 'calendar', title: 'Appointment No-Shows',       body: 'Automated confirmations, reminders, and rescheduling protect revenue from drop-offs.' },
    { icon: 'users',    title: 'Front Desk Overload',        body: 'Remove constant pressure from reception staff stuck answering the same 10 questions.' },
    { icon: 'repeat',   title: 'Manual Follow-Up Chaos',     body: 'Trigger emails, SMS, tasks, and reminders based on call outcomes — automatically.' },
    { icon: 'bot',      title: 'After-Hours Revenue Loss',   body: 'Capture and convert leads at 2am, weekends, and holidays without keeping anyone on standby.' },
    { icon: 'zap',      title: 'Pipeline Hygiene Problems',  body: 'Auto-clean and organize your sales pipeline so no active opportunity gets buried.' },
    { icon: 'trending', title: 'Weak Upsell Execution',      body: 'Identify buying signals and trigger the right upgrade conversations at the perfect moment.' },
  ];

  const faqs = [
    { q: 'How long does it take to go live?', a: 'Most clients are fully operational within 2–4 weeks. We handle all the setup, training, integration, and testing — you just approve the final product before we flip the switch.' },
    { q: 'Do I need to change my current tech stack?', a: 'No. Our systems are built to integrate with what you already use — CRM, calendar, email, SMS platforms. We connect to your tools; you don\'t need to replace them.' },
    { q: 'What does $0.06/min for calls mean in practice?', a: 'A typical qualification call lasts 2–4 minutes. At $0.06/min, that\'s $0.12–$0.24 per call. For most businesses handling 200–500 calls/month, the total usage cost is well under $50. The ROI from even a single converted lead dwarfs this completely.' },
    { q: 'How does the Voice AI handle complex customer questions?', a: 'We train the agent on your specific business — services, pricing, FAQs, policies, objection handling. For questions outside its knowledge base, it smoothly transfers to a human or schedules a callback. You define every boundary.' },
    { q: 'What kinds of businesses do you work with?', a: 'We work with service businesses generating $500K+ in annual revenue where the phone is a primary revenue channel — HVAC, restoration, legal, healthcare, real estate, landscaping, auto, and more. If your business lives and dies by the phone, we\'re built for you.' },
    { q: 'What happens after we go live?', a: 'We monitor system performance, provide monthly reporting, and handle ongoing optimization as your business evolves. This isn\'t a set-it-and-forget-it deployment — we stay engaged to maximize your ROI.' },
  ];

  const testimonials = [
    { name: 'Marcus D.', role: 'Owner, ProFlow HVAC', quote: 'We were losing 30–40% of after-hours calls to competitors. Three weeks after going live, our booking rate jumped 67%. The AI handles it better than our old answering service did.', stars: 5 },
    { name: 'Leila R.', role: 'Director, RapidRestore', quote: 'The follow-up automation alone paid for the first 6 months. We\'re converting leads we would have completely lost before. Our sales team now only talks to pre-qualified, ready-to-buy prospects.', stars: 5 },
    { name: 'James T.', role: 'Principal, TerraForm Landscaping', quote: 'I used to spend 3 hours a day on the phone. Now I look at a dashboard. The agent books jobs, confirms them, and sends reminders. My no-show rate dropped from 22% to 4%.', stars: 5 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,700&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --dark-strong:   #24262B;
          --dark-light:    #32353C;
          --accent:        #FF5E3A;
          --accent-hover:  #e84e2c;
          --grey-strong:   #6B7280;
          --grey-light:    #C5C7CE;
          --beige-dark:    #A1824F;
          --bg-alt:        #F7F7F6;
          --off-white:     #F5F5F5;
          --white:         #FFFFFF;
          --border:        rgba(0,0,0,0.08);
          --border-strong: rgba(0,0,0,0.14);
          --shadow-sm:     0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-md:     0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
          --shadow-lg:     0 20px 48px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.06);
          --radius:        6px;
          --radius-lg:     12px;
          --container:     1200px;
          --font-main:     'DM Sans', sans-serif;
          --font-mono:     'DM Mono', monospace;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-main);
          color: var(--dark-strong);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── Layout ── */
        .container {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 40px;
        }
        @media (max-width: 768px) { .container { padding: 0 20px; } }
        @media (max-width: 1024px) { .container { padding: 0 30px; } }

        section { padding: 100px 0; }
        section.alt { background: var(--bg-alt); }
        section.dark-section {
          background: var(--dark-strong);
          color: var(--white);
        }

        /* ── Typography ── */
        .eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey-strong);
          display: block;
          margin-bottom: 10px;
        }
        .eyebrow.accent { color: var(--accent); }

        h1 {
          font-size: clamp(38px, 6vw, 66px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: var(--dark-strong);
        }
        h2 {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.10;
          color: var(--dark-strong);
        }
        h3 {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.20;
        }
        h4 {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }
        h5 {
          font-size: 15px;
          font-weight: 600;
          line-height: 1.30;
        }

        p {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.65;
          color: var(--grey-strong);
        }
        p.large {
          font-size: 17px;
          line-height: 1.60;
        }

        /* ── Buttons ── */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-main);
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s;
          white-space: nowrap;
        }
        .btn:active { transform: scale(0.98); }

        .btn-default {
          background: var(--dark-strong);
          color: var(--white);
          padding: 15px 32px;
        }
        .btn-default:hover { background: var(--dark-light); }

        .btn-accent {
          background: var(--accent);
          color: var(--white);
          padding: 15px 32px;
        }
        .btn-accent:hover { background: var(--accent-hover); }

        .btn-outlined {
          background: transparent;
          color: var(--dark-strong);
          border: 1.5px solid var(--dark-strong);
          padding: 14px 30px;
        }
        .btn-outlined:hover { background: var(--dark-strong); color: var(--white); }

        .btn-outlined-white {
          background: transparent;
          color: var(--white);
          border: 1.5px solid rgba(255,255,255,0.35);
          padding: 14px 30px;
        }
        .btn-outlined-white:hover { background: var(--white); color: var(--dark-strong); }

        .btn-sm {
          padding: 9px 18px;
          font-size: 13px;
        }
        .btn-lg {
          padding: 17px 40px;
          font-size: 15px;
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--off-white);
          border: 1px solid var(--border-strong);
          border-radius: 100px;
          padding: 6px 12px 6px 8px;
          margin-bottom: 28px;
        }
        .hero-badge-inner {
          background: var(--dark-strong);
          color: var(--white);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 100px;
        }
        .hero-badge-text {
          font-size: 12px;
          font-weight: 500;
          color: var(--grey-strong);
        }

        /* ── Nav ── */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: background 0.25s, box-shadow 0.25s, backdrop-filter 0.25s;
          padding: 0;
        }
        .nav.scrolled {
          background: rgba(36,38,43,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }
        .nav-logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--white);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-logo-dot {
          width: 8px; height: 8px;
          background: var(--accent);
          border-radius: 50%;
          display: inline-block;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.70);
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-links a:hover { color: var(--white); }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--white);
          padding: 4px;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .nav-cta-desktop { display: none; }
        }
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--dark-strong);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu a {
          font-size: 28px;
          font-weight: 700;
          color: var(--white);
          text-decoration: none;
          letter-spacing: -0.03em;
          transition: color 0.15s;
        }
        .mobile-menu a:hover { color: var(--accent); }
        .mobile-close {
          position: absolute;
          top: 20px; right: 24px;
          background: none; border: none;
          cursor: pointer; color: var(--white);
        }

        /* ── Hero ── */
        .hero {
          padding: 160px 0 100px;
          background: var(--dark-strong);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(255,94,58,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .hero h1 { color: var(--white); max-width: 860px; margin: 0 auto 24px; }
        .hero h1 em { font-style: normal; color: var(--accent); }
        .hero .hero-body {
          font-size: 17px;
          color: rgba(255,255,255,0.58);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.65;
        }
        .hero-ctas {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }
        .hero-social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .hero-proof-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .hero-proof-number {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--white);
        }
        .hero-proof-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.40);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .hero-proof-divider {
          width: 1px; height: 36px;
          background: rgba(255,255,255,0.12);
        }

        /* ── Logos strip ── */
        .logos-strip {
          padding: 48px 0;
          background: #1C1E23;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .logos-strip-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          text-align: center;
          margin-bottom: 28px;
        }
        .logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        .logo-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          transition: color 0.2s, border-color 0.2s;
        }
        .logo-pill:hover {
          color: rgba(255,255,255,0.65);
          border-color: rgba(255,255,255,0.18);
        }
        .logo-pill-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.7;
        }

        /* ── Three pillars ── */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 64px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: 1fr; }
        }
        .pillar-card {
          background: var(--white);
          padding: 40px 36px;
          position: relative;
          transition: background 0.2s;
        }
        .pillar-card:hover { background: #FAFAFA; }
        .pillar-number {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--grey-light);
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }
        .pillar-icon-wrap {
          width: 44px; height: 44px;
          background: var(--off-white);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .pillar-card.featured .pillar-icon-wrap {
          background: rgba(255,94,58,0.10);
        }
        .pillar-card.featured .pillar-icon-wrap svg { color: var(--accent); stroke: var(--accent); }
        .pillar-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .pillar-badge {
          font-size: 10px;
          font-weight: 600;
          background: var(--accent);
          color: var(--white);
          padding: 2px 8px;
          border-radius: 100px;
          letter-spacing: 0.06em;
        }
        .pillar-list {
          list-style: none;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pillar-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--grey-strong);
          line-height: 1.5;
        }
        .pillar-list li::before {
          content: '';
          width: 5px; height: 5px;
          background: var(--accent);
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 6px;
        }

        /* ── Problem grid ── */
        .problems-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 56px;
        }
        @media (max-width: 1024px) { .problems-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .problems-grid { grid-template-columns: 1fr; } }

        .problem-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .problem-card:hover {
          border-color: rgba(255,94,58,0.25);
          box-shadow: 0 8px 32px rgba(255,94,58,0.06);
          transform: translateY(-2px);
        }
        .problem-icon {
          width: 40px; height: 40px;
          background: var(--off-white);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        /* ── How it works ── */
        .how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 60px;
          position: relative;
        }
        @media (max-width: 900px) { .how-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
        @media (max-width: 560px) { .how-grid { grid-template-columns: 1fr; } }

        .how-item {
          padding: 0 32px 0 0;
          position: relative;
        }
        .how-item:last-child { padding-right: 0; }
        .how-item:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 22px; right: 0;
          width: 1px; height: calc(100% - 22px);
          background: var(--border);
        }
        @media (max-width: 900px) { .how-item::after { display: none; } }

        .how-step {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: var(--grey-light);
          letter-spacing: 0.08em;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .how-step::before {
          content: '';
          width: 24px; height: 1px;
          background: var(--grey-light);
        }
        .how-icon {
          width: 44px; height: 44px;
          background: var(--off-white);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        /* ── Pricing ── */
        .pricing-wrap {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 60px;
          align-items: start;
          margin-top: 56px;
        }
        @media (max-width: 860px) { .pricing-wrap { grid-template-columns: 1fr; gap: 40px; } }

        .pricing-intro p { margin-top: 16px; }
        .pricing-feature-list {
          list-style: none;
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pricing-feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: var(--grey-strong);
          line-height: 1.5;
        }
        .check-icon {
          width: 18px; height: 18px;
          background: rgba(255,94,58,0.10);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .pricing-card {
          background: var(--dark-strong);
          border-radius: var(--radius-lg);
          padding: 40px;
          color: var(--white);
          position: relative;
          overflow: hidden;
        }
        .pricing-card::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(255,94,58,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .pricing-plan-name {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
        }
        .pricing-headline {
          font-size: 20px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 32px;
          letter-spacing: -0.02em;
        }
        .pricing-amount-row {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-bottom: 6px;
        }
        .pricing-currency {
          font-size: 22px;
          font-weight: 700;
          color: var(--white);
          padding-bottom: 4px;
        }
        .pricing-amount {
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -0.05em;
          color: var(--white);
          line-height: 1;
        }
        .pricing-period {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          padding-bottom: 8px;
          font-weight: 400;
        }
        .pricing-usage {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          margin-bottom: 32px;
          padding: 8px 12px;
          background: rgba(255,94,58,0.10);
          border-radius: 6px;
          display: inline-block;
        }
        .pricing-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 28px 0;
        }
        .pricing-includes-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 16px;
        }
        .pricing-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .pricing-items li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.72);
          line-height: 1.5;
        }
        .pricing-check {
          width: 18px; height: 18px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .pricing-note {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          margin-top: 16px;
          line-height: 1.6;
        }

        /* ── FAQ ── */
        .faq-list {
          margin-top: 56px;
          display: flex;
          flex-direction: column;
        }
        .faq-item {
          border-bottom: 1px solid var(--border);
        }
        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          cursor: pointer;
          gap: 24px;
        }
        .faq-question-text {
          font-size: 15px;
          font-weight: 500;
          color: var(--dark-strong);
          line-height: 1.5;
        }
        .faq-toggle {
          width: 28px; height: 28px;
          background: var(--off-white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
          font-weight: 300;
          color: var(--dark-strong);
          line-height: 1;
          transition: background 0.15s, transform 0.2s;
          user-select: none;
        }
        .faq-item.open .faq-toggle {
          background: var(--accent);
          color: var(--white);
          transform: rotate(45deg);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .faq-item.open .faq-answer { max-height: 300px; }
        .faq-answer-inner {
          padding: 0 48px 22px 0;
          font-size: 14px;
          color: var(--grey-strong);
          line-height: 1.7;
        }

        /* ── Testimonials ── */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 56px;
        }
        @media (max-width: 860px) { .testimonials-grid { grid-template-columns: 1fr; } }

        .testimonial-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .testimonial-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .stars {
          display: flex;
          gap: 3px;
          margin-bottom: 20px;
        }
        .star { color: #F59E0B; font-size: 14px; }
        .testimonial-quote {
          font-size: 15px;
          color: var(--dark-strong);
          line-height: 1.65;
          font-style: italic;
          margin-bottom: 24px;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }
        .testimonial-avatar {
          width: 40px; height: 40px;
          background: var(--off-white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: var(--grey-strong);
          flex-shrink: 0;
        }
        .testimonial-name { font-size: 13px; font-weight: 600; color: var(--dark-strong); }
        .testimonial-role { font-size: 12px; color: var(--grey-strong); margin-top: 1px; }

        /* ── Stats band ── */
        .stats-band {
          background: var(--accent);
          padding: 56px 0;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          text-align: center;
        }
        @media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
        .stat-number {
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--white);
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }

        /* ── CTA section ── */
        .final-cta {
          background: var(--dark-strong);
          padding: 120px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .final-cta::before {
          content: '';
          position: absolute;
          top: -100px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,94,58,0.10) 0%, transparent 65%);
          pointer-events: none;
        }
        .final-cta h2 { color: var(--white); max-width: 640px; margin: 0 auto 20px; }
        .final-cta p { color: rgba(255,255,255,0.50); max-width: 460px; margin: 0 auto 48px; }
        .cta-form {
          display: flex;
          gap: 0;
          max-width: 440px;
          margin: 0 auto 16px;
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .cta-input {
          flex: 1;
          padding: 14px 20px;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-main);
          font-size: 14px;
          color: var(--white);
        }
        .cta-input::placeholder { color: rgba(255,255,255,0.30); }
        .cta-submit {
          padding: 14px 24px;
          background: var(--accent);
          color: var(--white);
          border: none;
          font-family: var(--font-main);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .cta-submit:hover { background: var(--accent-hover); }
        .cta-note {
          font-size: 12px;
          color: rgba(255,255,255,0.28);
          font-family: var(--font-mono);
        }

        /* ── Footer ── */
        .footer {
          background: #1A1C21;
          padding: 72px 0 0;
          color: rgba(255,255,255,0.55);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 48px;
          padding-bottom: 56px;
        }
        @media (max-width: 860px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr; } }
        .footer-logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--white);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .footer-tagline {
          font-size: 13px;
          line-height: 1.65;
          color: rgba(255,255,255,0.38);
          max-width: 240px;
        }
        .footer-heading {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 18px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          font-size: 14px;
          color: rgba(255,255,255,0.50);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-links a:hover { color: var(--white); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.24);
        }
        .footer-accent {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 0.04em;
        }

        /* ── Section header ── */
        .section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .section-header.left { text-align: left; margin: 0; }
        .section-header p { margin-top: 16px; }

        /* ── Utility ── */
        .mt-8  { margin-top: 8px; }
        .mt-12 { margin-top: 12px; }
        .mt-16 { margin-top: 16px; }
        .mt-24 { margin-top: 24px; }
        .mt-32 { margin-top: 32px; }
        .mt-40 { margin-top: 40px; }
        .text-accent { color: var(--accent); }
        .text-white { color: var(--white); }

        /* ── Process flow bar ── */
        .process-bar {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: 56px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .process-bar { flex-direction: column; }
        }
        .process-step {
          flex: 1;
          padding: 28px 24px;
          position: relative;
          border-right: 1px solid var(--border);
          transition: background 0.2s;
        }
        .process-step:last-child { border-right: none; }
        @media (max-width: 768px) {
          .process-step { border-right: none; border-bottom: 1px solid var(--border); }
          .process-step:last-child { border-bottom: none; }
        }
        .process-step:hover { background: var(--bg-alt); }
        .process-step-num {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          color: var(--grey-light);
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }
        .process-step h5 { margin-bottom: 6px; }
        .process-step p { font-size: 13px; }
        .process-step-accent {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .process-step:hover .process-step-accent { transform: scaleX(1); }

        /* ── Integration badge row ── */
        .integration-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 24px;
        }
        .integration-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          color: var(--dark-strong);
          font-family: var(--font-mono);
        }
        .integration-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }
      `}</style>

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <Icon path={icons.close} size={24} />
        </button>
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <a href="#pricing" className="btn btn-accent" onClick={() => setMenuOpen(false)}>Book a Call</a>
      </div>

      {/* ── Navigation ── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo">
              <span className="nav-logo-dot" />
              SuccessForce
            </a>
            <ul className="nav-links">
              {navLinks.map(l => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/\s/g, '-')}`}>{l}</a></li>
              ))}
            </ul>
            <div className="nav-right">
              <a href="#pricing" className="btn btn-accent btn-sm nav-cta-desktop">Book a Strategy Call</a>
              <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                <Icon path={icons.menu} size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── §01 Hero ── */}
      <section className="hero" id="hero">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div className="hero-badge">
              <span className="hero-badge-inner">AI AGENCY</span>
              <span className="hero-badge-text">Voice AI · N8N · RetellAI</span>
            </div>
          </div>
          <h1>Your Business.<br /><em>Automated.</em> Revenue-Ready.</h1>
          <p className="hero-body">
            We build custom AI-powered systems that capture leads, qualify prospects, book appointments, and follow up — 24 hours a day, without adding headcount.
          </p>
          <div className="hero-ctas">
            <a href="#pricing" className="btn btn-accent btn-lg">Book a Strategy Call <Icon path={icons.arrow} size={16} /></a>
            <a href="#how-it-works" className="btn btn-outlined-white btn-lg">See How It Works</a>
          </div>
          <div className="hero-social-proof">
            <div className="hero-proof-item">
              <span className="hero-proof-number">24/7</span>
              <span className="hero-proof-label">Lead Coverage</span>
            </div>
            <div className="hero-proof-divider" />
            <div className="hero-proof-item">
              <span className="hero-proof-number">&lt; 60s</span>
              <span className="hero-proof-label">Speed to Lead</span>
            </div>
            <div className="hero-proof-divider" />
            <div className="hero-proof-item">
              <span className="hero-proof-number">2–4 wk</span>
              <span className="hero-proof-label">Time to Live</span>
            </div>
            <div className="hero-proof-divider" />
            <div className="hero-proof-item">
              <span className="hero-proof-number">$0</span>
              <span className="hero-proof-label">Extra Headcount</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── §02 Tech Stack Strip ── */}
      <div className="logos-strip">
        <div className="container">
          <p className="logos-strip-label">Powered by best-in-class AI infrastructure</p>
          <div className="logos-row">
            {['RetellAI', 'N8N', 'ElevenLabs', 'Supabase', 'OpenAI', 'Twilio'].map(t => (
              <div key={t} className="logo-pill">
                <span className="logo-pill-dot" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── §03 Three Pillars ── */}
      <section id="solutions">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">What We Deliver</span>
              <h2>Three outcomes.<br />One integrated system.</h2>
              <p className="large">Every system we build is designed to achieve these goals in this exact order of importance. They work independently and connect seamlessly into one revenue generation machine.</p>
            </div>
          </FadeIn>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <FadeIn key={p.num} delay={i * 100}>
                <div className={`pillar-card ${i === 0 ? 'featured' : ''}`}>
                  <div className="pillar-number">{p.num}</div>
                  <div className="pillar-icon-wrap">
                    <Icon path={icons[p.icon]} size={20} />
                  </div>
                  <div className="pillar-title-row">
                    <h4>{p.title}</h4>
                    {i === 0 && <span className="pillar-badge">Priority #1</span>}
                  </div>
                  <h5 style={{ fontWeight: 600, color: 'var(--dark-strong)', marginBottom: 10 }}>{p.headline}</h5>
                  <p style={{ fontSize: 14 }}>{p.body}</p>
                  <ul className="pillar-list">
                    {p.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── §04 Stats Band ── */}
      <div className="stats-band">
        <div className="container">
          <div className="stats-row">
            <div>
              <div className="stat-number"><Counter target={89} suffix="%" /></div>
              <div className="stat-label">Avg Response Time Reduction</div>
            </div>
            <div>
              <div className="stat-number"><Counter target={67} suffix="%" /></div>
              <div className="stat-label">Avg Booking Rate Increase</div>
            </div>
            <div>
              <div className="stat-number"><Counter target={22} suffix="→4%" /></div>
              <div className="stat-label">No-Show Rate Improvement</div>
            </div>
            <div>
              <div className="stat-number"><Counter target={3} suffix="x" /></div>
              <div className="stat-label">Avg ROI in Month One</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── §05 Problems We Solve ── */}
      <section className="alt">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">Common Problems We Fix</span>
              <h2>The revenue is already there.<br />You're just not capturing it.</h2>
              <p className="large">Most service businesses lose 30–50% of potential revenue to missed calls, slow follow-up, and manual processes. We fix all of it.</p>
            </div>
          </FadeIn>
          <div className="problems-grid">
            {problems.map((prob, i) => (
              <FadeIn key={prob.title} delay={i * 60}>
                <div className="problem-card">
                  <div className="problem-icon">
                    <Icon path={icons[prob.icon]} size={18} />
                  </div>
                  <h5 style={{ marginBottom: 8 }}>{prob.title}</h5>
                  <p style={{ fontSize: 13 }}>{prob.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── §06 How It Works ── */}
      <section id="how-it-works">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">How It Works</span>
              <h2>Built custom. Deployed fast.<br />Runs forever.</h2>
              <p className="large">We don't sell software subscriptions. We build fully custom, end-to-end automation systems tailored to your specific business, workflows, and revenue goals.</p>
            </div>
          </FadeIn>

          <div className="how-grid">
            {howItWorks.map((item, i) => (
              <FadeIn key={item.step} delay={i * 80}>
                <div className="how-item">
                  <div className="how-step">{item.step}</div>
                  <div className="how-icon">
                    <Icon path={icons[item.icon]} size={20} />
                  </div>
                  <h5 style={{ marginBottom: 10, fontSize: 15 }}>{item.title}</h5>
                  <p style={{ fontSize: 13 }}>{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ── §06b Our Process ── */}
      <section className="alt" id="our-process">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">Our Process</span>
              <h2>From first call to fully live<br />in 4 steps.</h2>
              <p className="large">A clear, predictable path from day one. No hand-wavy "discovery phases" — just fast, focused execution that gets your system generating revenue.</p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="process-bar" style={{ marginTop: 48 }}>
              {[
                { num: '01', label: 'Discovery Call', desc: 'We map your current workflow, identify revenue leaks, and define exactly what the system needs to do.' },
                { num: '02', label: 'System Design', desc: 'Custom architecture built around your business — agent logic, automation flows, integrations, and handoff rules.' },
                { num: '03', label: 'Build & Train', desc: 'We configure, test, and refine everything. You approve before anything goes live — no surprises.' },
                { num: '04', label: 'Go Live', desc: 'System deployed, monitored, and continuously optimized. Most clients see measurable results in week one.' },
              ].map(step => (
                <div className="process-step" key={step.num}>
                  <div className="process-step-num">{step.num}</div>
                  <h5>{step.label}</h5>
                  <p style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{step.desc}</p>
                  <div className="process-step-accent" />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 14 }}>Integrates with tools you already use</span>
              <div className="integration-row" style={{ justifyContent: 'center' }}>
                {['HubSpot', 'Salesforce', 'GoHighLevel', 'Calendly', 'Google Calendar', 'Twilio', 'Slack', 'Zapier'].map(t => (
                  <div key={t} className="integration-badge">
                    <span className="integration-badge-dot" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── §07 Pricing ── */}
      <section className="alt" id="pricing">
        <div className="container">
          <div className="pricing-wrap">
            <FadeIn>
              <div className="pricing-intro">
                <span className="eyebrow">Pricing</span>
                <h2>Simple pricing.<br />Serious results.</h2>
                <p style={{ marginTop: 16 }}>One monthly retainer covers everything — custom build, deployment, monitoring, and ongoing optimization. You pay for call minutes used, nothing more.</p>
                <ul className="pricing-feature-list mt-32">
                  {[
                    'Full custom system build included',
                    'Voice AI agent configuration & training',
                    'N8N workflow automation setup',
                    'CRM & calendar integration',
                    'SMS & email follow-up sequences',
                    'Monthly performance reporting',
                    'Ongoing optimization & support',
                  ].map(f => (
                    <li key={f}>
                      <span className="check-icon">
                        <Icon path={icons.check} size={10} color="var(--accent)" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#book" className="btn btn-outlined mt-32" style={{ display: 'inline-flex' }}>
                  Talk to Us First — No Pressure
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="pricing-card">
                <div className="pricing-plan-name">Monthly Retainer</div>
                <div className="pricing-headline">Your AI Revenue Engine,<br />Running 24/7</div>
                <div className="pricing-amount-row">
                  <span className="pricing-currency">$</span>
                  <span className="pricing-amount">497</span>
                  <span className="pricing-period">/month</span>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <span className="pricing-usage">+ $0.06 / minute of calls</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
                  Avg call: 2–4 min · Avg 300 calls/mo = ~$54 in usage.<br />One converted lead typically covers months of service.
                </p>
                <div className="pricing-divider" />
                <div className="pricing-includes-label">Everything Included</div>
                <ul className="pricing-items">
                  {[
                    'Custom Voice AI agent (RetellAI)',
                    'N8N automation workflows (unlimited)',
                    'CRM + calendar + SMS integration',
                    'After-hours & 24/7 call handling',
                    'Lead qualification & routing logic',
                    'Appointment booking & reminders',
                    'Follow-up email & SMS sequences',
                    'Live dashboard & monthly reporting',
                    'System monitoring & optimization',
                  ].map(item => (
                    <li key={item}>
                      <span className="pricing-check">
                        <Icon path={icons.check} size={10} color="rgba(255,255,255,0.7)" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#book" className="btn btn-accent" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '16px' }}>
                  Book a Strategy Call <Icon path={icons.arrow} size={16} />
                </a>
                <p className="pricing-note mt-16">
                  No setup fees. No long-term contracts. Cancel anytime.<br />
                  Free strategy call to confirm fit before any commitment.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── §08 Testimonials ── */}
      <section>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">Client Results</span>
              <h2>The businesses that stopped<br />leaving revenue on the table.</h2>
            </div>
          </FadeIn>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 100}>
                <div className="testimonial-card">
                  <div className="stars">
                    {Array(t.stars).fill(0).map((_, si) => <span key={si} className="star">★</span>)}
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.name[0]}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── §09 FAQ ── */}
      <section className="alt" id="faq">
        <div className="container" style={{ maxWidth: 760 }}>
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">FAQ</span>
              <h2>Common questions,<br />straight answers.</h2>
            </div>
          </FadeIn>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'open' : ''}`}>
                <div className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §10 Final CTA ── */}
      <section className="final-cta" id="book">
        <div className="container">
          <FadeIn>
            <span className="eyebrow accent" style={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Get Started</span>
            <h2>Stop losing revenue<br />to manual processes.</h2>
            <p>Book a free 30-minute strategy call. We'll map out exactly where your business is leaking revenue and show you what an automated system would look like for you — no pitch, no pressure.</p>
            <form className="cta-form" onSubmit={e => { e.preventDefault(); }}>
              <input
                className="cta-input"
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className="cta-submit">Book Free Call</button>
            </form>
            <p className="cta-note">No commitment required · Results-first conversation</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <span className="nav-logo-dot" />
                SuccessForce
              </div>
              <p className="footer-tagline">We help businesses grow faster, operate smarter, and reduce team burnout — with Voice AI agents and automation that handle the work no one wants to do manually.</p>
            </div>
            <div>
              <div className="footer-heading">Solutions</div>
              <ul className="footer-links">
                {['Scale Revenue', 'Business Efficiency', 'Voice AI Agents', 'Workflow Automation', 'CRM Integration'].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Company</div>
              <ul className="footer-links">
                {['About', 'Case Studies', 'Pricing', 'FAQ', 'Contact'].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Get Started</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)', lineHeight: 1.6, marginBottom: 16 }}>Ready to stop leaving revenue on the table?</p>
              <a href="#book" className="btn btn-accent btn-sm" style={{ display: 'inline-flex' }}>Book a Free Call</a>
              <div style={{ marginTop: 20 }}>
                <a href="mailto:hello@successforce.ai" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon path={icons.mail} size={14} color="rgba(255,255,255,0.35)" />
                  hello@successforce.ai
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© {new Date().getFullYear()} SuccessForce. All rights reserved.</span>
            <span className="footer-accent">Voice AI · N8N Automation · RetellAI</span>
          </div>
        </div>
      </footer>
    </>
  );
}
