import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import {
    ContactHero,
    ContactOptions,
    ContactSplitSection,
    ContactFAQ,
    StartProcess,
    QuickActions,
    SocialConnect,
    LocationMap,
} from "@/components/contact-sections"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us | Foxmen Studio",
    description: "Get in touch with Foxmen Studio. Let's discuss your project and how we can help you build premium web and mobile experiences.",
    openGraph: {
        title: "Contact Us | Foxmen Studio",
        description: "Get in touch with Foxmen Studio. Let's discuss your project and how we can help you build premium web and mobile experiences.",
        url: 'https://www.foxmen.studio/contact',
        siteName: 'Foxmen Studio',
        locale: 'en_US',
        type: 'website',
    }
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#FFC224] selection:text-black">
            <Navigation />
            <main>
                <ContactHero />
                <ContactOptions />
                <ContactSplitSection />
                <ContactFAQ />
                <StartProcess />
                <QuickActions />
                <SocialConnect />
                <LocationMap />
            </main>
            <Footer />
        </div>
    )
}
