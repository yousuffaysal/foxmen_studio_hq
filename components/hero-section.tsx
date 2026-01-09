"use client"

import { Mail, FolderOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { HeroBookingButton } from "./hero-booking-button"
import { ViewProjectsButton } from "@/components/view-projects-button"


import { MorphingText } from "@/components/ui/liquid-text";

export function HeroSection() {

  useEffect(() => {
    // Cal.com embed initialization
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

  return (
    <section className="relative w-full px-4 py-16 md:py-24">

      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
          className="space-y-6 relative z-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A886FF] opacity-75 duration-1000"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A886FF] shadow-[0_0_8px_2px_rgba(168,134,255,0.5)]"></span>
            </span>
            <span className="font-mono text-sm md:text-base font-medium text-[#393939]" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              Available for new projects
            </span>
          </div>
          <h1
            className="text-[32px] leading-[40px] sm:text-[44px] sm:leading-[52px] md:text-[92px] md:leading-[104px] text-[#414042] -tracking-[0.02em] md:-tracking-[0.04em]"
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            Welcome to <br className="block md:hidden" />
            <span className="inline-block md:inline md:my-0">
              <span className="whitespace-nowrap"><span className="bg-[#6E35FF] text-white px-2 py-0.5 md:px-3 md:py-1 inline-block rounded-md md:rounded-none">Foxmen Studio</span>,</span>
            </span>
            <br className="block md:hidden" />
            <span className="inline-block md:inline md:mb-0 mt-1 md:mt-0">
              <span className="whitespace-normal md:whitespace-nowrap bg-white/20 backdrop-blur-md border border-white/20 rounded-lg px-0 md:px-2 md:py-1 inline-block">A creative agency for Building</span>
            </span>
            <br className="max-md:hidden" />
            <div className="max-w-[85vw] sm:max-w-full overflow-hidden">
              <MorphingText
                className="!text-[32px] sm:!text-[44px] md:!text-[92px] !leading-[40px] sm:!leading-[52px] md:!leading-[104px] !text-left !mx-0 w-full md:w-auto h-[40px] sm:h-28 md:h-[112px] !whitespace-nowrap !max-w-none mt-1 md:mt-0 block"
                texts={['Web Platforms', 'Mobile Apps', 'Global UI/UX', '3D Website', 'AI Agents', 'Digital Marketing', 'Branding']}
              />
            </div>
          </h1>



          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4 items-start">
            <HeroBookingButton />
            <ViewProjectsButton />
          </div>
        </motion.div>

        <div className="flex justify-center md:justify-end">
          {/* Video removed as per request */}
        </div>
      </div>
    </section>
  )
}
