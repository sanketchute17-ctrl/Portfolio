import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sanket Chute | AI/ML Engineer & Full-Stack Developer',
  description: 'Personal portfolio of Sanket Chute featuring AI/ML Engineering projects, full-stack web applications, and interactive liquid glass experience.',
  authors: [{ name: 'Sanket Chute' }],
  keywords: ['Sanket Chute', 'Portfolio', 'AI Engineer', 'Machine Learning', 'Next.js', 'React'],
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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-950">
        {children}
      </body>
    </html>
  );
}
