"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { HeroBookingButton } from "./hero-booking-button"
import { ViewProjectsButton } from "@/components/view-projects-button"
import { Globe, Smartphone, Cpu, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {

  useEffect(() => {
    // Cal.com embed initialization (Keep existing logic)
    ; (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar)
      }
      let d = C.document
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal
          let ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement("script")).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments)
            }
            const namespace = ar[1]
            api.q = api.q || []
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api
              p(cal.ns[namespace], ar)
              p(cal, ["initNamespace", namespace])
            } else p(cal, ar)
            return
          }
          p(cal, ar)
        }
    })(window, "https://app.cal.com/embed/embed.js", "init")
    const cal = (window as any).Cal
    cal("init", "discussion-call", { origin: "https://app.cal.com" })

    cal.ns["discussion-call"]("ui", {
      cssVarsPerTheme: { dark: { "cal-brand": "#755ed2" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    })
  }, [])

  const pillars = [
    { title: "Web\nDevelopments", icon: Rocket, desc: "Fintech, EdTech & Medical", detail: "Next.js / React / Node" },
    { title: "Mobile App\nDevelopments", icon: Smartphone, desc: "iOS, Android & Native", detail: "React Native / Swift" },
    { title: "AI Agents &\nSaaS Products", icon: Cpu, desc: "LLMs, Automations & Scale", detail: "Python / OpenAI / RAG" },
    { title: "Design&\nBranding", icon: Globe, desc: "UI/UX, Identity & Systems", detail: "Figma / Framer / Motion" },
  ]

  return (
    <section className="relative w-full min-h-screen bg-[#fffff3] pt-20 md:pt-32 pb-12 overflow-hidden flex flex-col">

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, #414042 1px, transparent 1px), linear-gradient(to bottom, #414042 1px, transparent 1px)',
          backgroundSize: '40px 40px md:backgroundSize:80px 80px'
        }}
      />

      {/* Background Map Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.40]"
        style={{
          backgroundImage: 'url("https://ik.imagekit.io/8fky5hetz/Map=Default.svg")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex-grow flex flex-col relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16 mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-block py-1 px-3 border border-[#414042]/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8B5DFF] mb-4 md:mb-6 bg-white"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Foxmen Studio • Est. 2020
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#414042] leading-[1.1] mb-6 md:mb-8"
              style={{ fontFamily: 'var(--font-ibm-plex-sans-medium)' }}
            >
              We build for the <br className="hidden md:block" />
              <span className="italic font-light text-[#8B5DFF]">future</span> of your brand.
            </h1>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 sm:px-0">
              <HeroBookingButton />
              <ViewProjectsButton />
            </div>
          </motion.div>
        </div>

        {/* The Four Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 h-full pb-8 md:pb-0">
          {pillars.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.15) }}
              className="group relative bg-white border border-[#414042]/10 p-5 md:p-8 flex flex-col justify-between h-[240px] md:h-[400px] hover:border-[#414042] hover:shadow-[8px_8px_0px_0px_rgba(65,64,66,1)] transition-all duration-300 overflow-hidden"
            >
              {/* Decorative Geometric Lines - Different for each card */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.08] group-hover:opacity-20 transition-opacity duration-300">
                {index === 0 && (
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    <circle cx="80" cy="20" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="0.5" />
                    <rect x="15" y="75" width="10" height="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                )}
                {index === 3 && (
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 50 Q 50 0 100 50 T 200 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>
                )}
              </div>

              {/* Top: Icon & Detail */}
              <div className="flex justify-between items-start relative z-10">
                <div className="p-2 md:p-3 bg-[#fffff3] rounded-lg border border-[#414042]/5 group-hover:bg-[#8B5DFF] group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-mono text-[#414042]/70 uppercase text-right leading-tight max-w-[50%]">
                  {item.detail}
                </span>
              </div>

              {/* Bottom: Title & Desc */}
              <div>
                <h3
                  className="text-lg md:text-2xl font-bold text-[#414042] mb-2 md:mb-3 whitespace-pre-line leading-tight group-hover:text-[#8B5DFF] transition-colors"
                  style={{ fontFamily: 'var(--font-ibm-plex-sans-medium)' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#414042]/80 font-medium mb-4 md:mb-6 leading-relaxed">
                  {item.desc}
                </p>

                <div className="w-full h-px bg-[#414042]/10 group-hover:bg-[#414042]/30 transition-colors" />

                <Link href="/contact" className="pt-3 md:pt-4 flex items-center justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#414042] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
