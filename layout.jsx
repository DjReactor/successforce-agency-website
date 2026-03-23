import './globals.css';

export const metadata = {
  title: 'SuccessForce — AI-Powered Revenue Automation for Service Businesses',
  description: 'SuccessForce builds custom Voice AI agents and N8N automation systems that capture leads, book appointments, and follow up 24/7 — without adding headcount. From $497/month.',
  keywords: 'Voice AI agent, business automation, RetellAI, N8N automation, lead follow-up, appointment booking AI, service business automation',
  openGraph: {
    title: 'SuccessForce — Your Business. Automated. Revenue-Ready.',
    description: 'Custom AI-powered systems that scale revenue, increase efficiency, and eliminate the manual work draining your team. Live in 2–4 weeks.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
