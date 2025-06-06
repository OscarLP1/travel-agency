import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { SocialProof } from '@/components/social-proof'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SocialProof />
    </main>
  )
} 