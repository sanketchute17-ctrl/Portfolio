import { Navbar } from '@/components/navbar';
import { GlassHero } from '@/components/glass-hero';
import { AboutSection } from '@/components/about-section';
import { WorkSection } from '@/components/work-section';
import { ExperienceSection } from '@/components/experience-section';
import { CertificationsSection } from '@/components/certifications-section';
import { ProcessSection } from '@/components/process-section';
import { ExperimentsSection } from '@/components/experiments-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50">
      <Navbar />
      <GlassHero />
      <AboutSection />
      <WorkSection />
      <ExperienceSection />
      <CertificationsSection />
      <ProcessSection />
      <ExperimentsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
