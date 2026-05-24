import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { CommunityPreview } from '../components/CommunityPreview';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <CommunityPreview />
      <CTA />
      <Footer />
    </>
  );
}
