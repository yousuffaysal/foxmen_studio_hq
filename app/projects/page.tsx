import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import {
    ProjectsHero,
    ProjectGrid,
    ProjectTech,
    ProjectCTA
} from "@/components/project-sections"
import { FeaturedProjectsSection } from "@/components/featured-projects-section"
import {
    ProjectStats,
    IndustryCategories,
    BeforeAfter,
    ProjectProcess,
    ProjectTimeline,
    ProjectAwards,
    ClientLogos,
    FeaturedCaseStudyLong,
    AnimationShowcase,
    TechFilter,
    ImpactStories,
    BehindTheScenes,
    ProjectReel,
    ClosingCTA
} from "@/components/project-premium-sections"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Our Work | Foxmen Studio Case Studies",
    description: "Explore our portfolio of delivered projects. From fintech platforms to e-commerce, see how we build scalable digital products.",
    openGraph: {
        title: "Our Work | Foxmen Studio Case Studies",
        description: "Explore our portfolio of delivered projects. From fintech platforms to e-commerce, see how we build scalable digital products.",
    }
}

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-[#050505] font-sans selection:bg-[#8B5DFF] selection:text-white">
            <Navigation />
            <main>
                <ProjectsHero />
                <FeaturedProjectsSection />
                <ProjectGrid />
                <ProjectTech />

                {/* Premium Sections */}
                <ProjectStats />
                <IndustryCategories />
                <BeforeAfter />
                <ProjectProcess />
                <ProjectTimeline />
                <ProjectAwards />
                <ClientLogos />
                <FeaturedCaseStudyLong />
                <AnimationShowcase />
                <TechFilter />
                <ImpactStories />
                <BehindTheScenes />
                <ProjectReel />
                <ClosingCTA />
            </main>
            <Footer />
        </div>
    )
}
