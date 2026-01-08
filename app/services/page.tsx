import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ServicesListSection } from "@/components/services-list-section"

export const metadata = {
    title: "Our Services | Foxmen Studio",
    description: "Explore our comprehensive range of services including Website Development, UI/UX Design, Mobile App Development, AI Agents, and Branding.",
}

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#FFC224] selection:text-black">
            <Navigation />
            <main>
                <ServicesListSection />
            </main>
            <Footer />
        </div>
    )
}
