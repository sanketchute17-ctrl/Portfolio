import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | Liquid Glass Reveal',
  description: 'Personal creative engineering portfolio featuring an interactive Liquid Glass portrait reveal experience.',
  authors: [{ name: 'Creative Tech Engineer' }],
  keywords: ['Portfolio', 'Creative Technologist', 'Liquid Glass', 'Next.js', 'UI/UX Engineer'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fragment+Mono&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-cyan-100 selection:text-cyan-900">
        {children}
      </body>
    </html>
  );
}
