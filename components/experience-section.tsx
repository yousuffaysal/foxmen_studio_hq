import { Briefcase, Flag, Globe, Rocket, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ExperienceSection() {
  const experiences = [
    {
      period: "Jan 2024 - Present",
      title: "Leading with AI & Automation",
      description:
        "Integrating advanced AI solutions and automation into digital products, pushing the boundaries of what's possible in web and mobile experiences.",
      Icon: Zap,
    },
    {
      period: "2022 - 2023",
      title: "Global Expansion",
      description:
        "Reached a major milestone of 120+ successful projects, partnering with over 50 clients worldwide to deliver impactful digital solutions.",
      Icon: Globe,
    },
    {
      period: "2021 - 2022",
      title: "Service Diversification",
      description:
        "Expanded our capabilities to offer full-cycle mobile app development and comprehensive UI/UX design services for startups and enterprises.",
      Icon: Rocket,
    },
    {
      period: "2019 - 2020",
      title: "Inception & Vision",
      description:
        "Foxmen Studio was founded with a clear mission: to bridge the gap between rigid engineering and fluid, emotional design.",
      Icon: Flag,
    },
  ]

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="text-white pt-0 md:pt-12 md:sticky md:top-24 self-start">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
              Our Journey & <span className="text-[#6366F1] inline-block">Milestones</span>
            </h2>
            <p className="text-gray-400 mb-8 md:mb-10 leading-relaxed text-lg md:text-xl max-w-xl" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              From a small team of visionaries to a full-service digital section. We've been building the future of digital experiences, one project at a time.
            </p>
            <Link href="/services">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full py-6 px-8 text-base md:text-lg font-medium transition-colors duration-300" style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}>
                <Briefcase className="w-5 h-5 mr-2.5" />
                View Services
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white border-4 border-transparent hover:border-[#6366F1] transition-colors duration-300 rounded-[32px] p-8 md:p-10 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-sm md:text-base font-bold text-[#6366F1] uppercase tracking-wider bg-[#6366F1]/10 px-4 py-2 rounded-full" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                    {exp.period}
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <exp.Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
