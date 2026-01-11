import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import {
    AboutHero,
    AboutServices,
    AboutApproach,
    AboutTech,
    AboutStatsMarquee,
    AboutCTA
} from "@/components/about-sections"
import { AboutTeam } from "@/components/about-team-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About Us | Foxmen Studio",
    description: "Learn about Foxmen Studio, a collective of digital alchemists transforming ideas into reality through code, design, and innovation.",
    openGraph: {
        title: "About Us | Foxmen Studio",
        description: "Learn about Foxmen Studio, a collective of digital alchemists transforming ideas into reality through code, design, and innovation.",
    }
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#6E35FF] selection:text-white">
            <Navigation />
            <main>
                <AboutHero />
                <AboutServices />
                <AboutApproach />
                <AboutTeam />
                <AboutTech />
                <AboutStatsMarquee />
                <AboutCTA />
            </main>
            <Footer />
        </div>
    )
}
