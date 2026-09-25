'use client';

import { Navbar } from '@/components/navbar';
import { GlassHero } from '@/components/glass-hero';
import { AboutSection } from '@/components/about-section';
import { WorkSection } from '@/components/work-section';
import { ExperienceSection } from '@/components/experience-section';
import { CertificationsSection } from '@/components/certifications-section';
import { SkillsSection } from '@/components/skills-section';
import { ProcessSection } from '@/components/process-section';
import { ExperimentsSection } from '@/components/experiments-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { SocialDock } from '@/components/social-dock';
import { DataStreamBg } from '@/components/data-stream-bg';
import { useTheme } from '@/components/theme-context';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className={`relative min-h-screen transition-colors duration-500 selection:bg-orange-500 selection:text-slate-950 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Navbar />
      <GlassHero />
      <AboutSection />
      <WorkSection />
      <ExperienceSection />
      <CertificationsSection />
      <SkillsSection />
      <ProcessSection />
      <ExperimentsSection />
      <ContactSection />
      <Footer />
      <SocialDock />
    </main>
  );
}
