import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PricingSections } from "@/components/pricing-sections"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | Foxmen Studio",
  description:
    "Transparent, fixed pricing for web development, UI/UX design, mobile apps, and AI solutions. No hidden fees — just great digital products.",
  openGraph: {
    title: "Pricing | Foxmen Studio",
    description:
      "Transparent, fixed pricing for web development, UI/UX design, mobile apps, and AI solutions.",
    url: "https://www.foxmen.studio/pricing",
    siteName: "Foxmen Studio",
    locale: "en_US",
    type: "website",
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFF3] font-sans selection:bg-[#8B5DFF] selection:text-white">
      <Navigation />
      <main>
        <PricingSections />
      </main>
      <Footer />
    </div>
  )
}
