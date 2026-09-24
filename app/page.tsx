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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50/90">
      <DataStreamBg />
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
