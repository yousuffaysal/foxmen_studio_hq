"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { HeroBookingButton } from "./hero-booking-button"
import { ViewProjectsButton } from "@/components/view-projects-button"
import { Globe, Smartphone, Cpu, Rocket, ArrowRight } from "lucide-react"

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
    { title: "Design &\nBranding", icon: Globe, desc: "UI/UX, Identity & Systems", detail: "Figma / Framer / Motion" },
    { title: "Web\nPlatforms", icon: Rocket, desc: "Fintech, EdTech & Medical", detail: "Next.js / React / Node" },
    { title: "AI\nEngineering", icon: Cpu, desc: "LLMs, Agents & SaaS", detail: "Python / OpenAI / RAG" },
    { title: "Mobile\nEcosystems", icon: Smartphone, desc: "iOS, Android & Native", detail: "React Native / Swift" },
  ]

  return (
    <section className="relative w-full min-h-screen bg-[#fffff3] pt-12 md:pt-16 pb-12 overflow-hidden flex flex-col">

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, #414042 1px, transparent 1px), linear-gradient(to bottom, #414042 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-4 md:px-8 flex-grow flex flex-col relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-block py-1 px-3 border border-[#414042]/20 rounded-full text-xs font-bold uppercase tracking-widest text-[#8B5DFF] mb-6 bg-white"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Foxmen Studio • Est. 2020
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold text-[#414042] leading-[1.1] mb-8"
              style={{ fontFamily: 'var(--font-ibm-plex-sans-medium)' }}
            >
              We build for the <br className="hidden md:block" />
              <span className="italic font-light text-[#8B5DFF]">future</span> of digital.
            </h1>
            <div className="flex justify-center gap-4">
              <HeroBookingButton />
              <ViewProjectsButton />
            </div>
          </motion.div>
        </div>

        {/* The Four Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
          {pillars.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.15) }}
              className="group relative bg-white border border-[#414042]/10 p-8 flex flex-col justify-between h-[300px] md:h-[400px] hover:border-[#414042] hover:shadow-[8px_8px_0px_0px_rgba(65,64,66,1)] transition-all duration-300"
            >
              {/* Top: Icon & Detail */}
              <div className="flex justify-between items-start">
                <div className="p-3 bg-[#fffff3] rounded-lg border border-[#414042]/5 group-hover:bg-[#8B5DFF] group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#414042]/40 uppercase text-right leading-tight">
                  {item.detail}
                </span>
              </div>

              {/* Bottom: Title & Desc */}
              <div>
                <h3
                  className="text-2xl font-bold text-[#414042] mb-3 whitespace-pre-line leading-tight group-hover:text-[#8B5DFF] transition-colors"
                  style={{ fontFamily: 'var(--font-ibm-plex-sans-medium)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#414042]/60 font-medium mb-6">
                  {item.desc}
                </p>

                <div className="w-full h-px bg-[#414042]/10 group-hover:bg-[#414042]/30 transition-colors" />

                <div className="pt-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#414042] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
