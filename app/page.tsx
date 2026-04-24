import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LogoMarquee } from "@/components/logo-marquee"
import { FeaturedProjectsSection } from "@/components/featured-projects-section"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"

import { TestimonialsSection } from "@/components/testimonials-section"
import { ArticlesSection } from "@/components/articles-section"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"

import { HomePreloader } from "@/components/home-preloader"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Foxmen Studio | Web, Mobile & AI Agents Development Agency",
  description: "Foxmen Studio is a premier digital agency building high-performance websites, mobile apps, and AI agents. We turn complex ideas into elegant digital solutions.",
  openGraph: {
    title: "Foxmen Studio | Web, Mobile & AI Agents Development Agency",
    description: "Foxmen Studio is a premier digital agency building high-performance websites, mobile apps, and AI agents. We turn complex ideas into elegant digital solutions.",
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffff0] w-full overflow-x-hidden">
      <HomePreloader />
      <Navigation delay={5.7} />
      <HeroSection />

      <ScrollAnimation>
        <LogoMarquee />
      </ScrollAnimation>

      <ScrollAnimation>
        <FeaturedProjectsSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <ServicesSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <StatsSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <AboutSection />
      </ScrollAnimation>



      <ScrollAnimation>
        <TestimonialsSection />
      </ScrollAnimation>

      <ScrollAnimation>
        <ArticlesSection />
      </ScrollAnimation>

      <Footer />
    </main>
  )
}
