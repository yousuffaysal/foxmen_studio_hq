"use client"

import { ArrowRight, Mail } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export function ServicesSection() {
  const services = [
    {
      id: "01",
      title: "Website Development",
      description: "Custom, high-performance websites built with modern technologies (Next.js, React) to capture your brand's essence and convert visitors.",
      capabilities: ["Next.js / React", "Performance Optimization", "SEO Architecture", "CMS Integration"],
      image: "https://ik.imagekit.io/2lax2ytm2/Website%20Developemt.svg"
    },
    {
      id: "02",
      title: "UI/UX Design",
      description: "User-centric design that blends aesthetics with functionality, creating intuitive and engaging digital experiences.",
      capabilities: ["User Research", "Wireframing & Prototyping", "Design Systems", "Interaction Design"],
      image: "https://ik.imagekit.io/2lax2ytm2/thursday.social%20(1).svg"
    },
    {
      id: "03",
      title: "Mobile App Development",
      description: "Scalable, native and cross-platform mobile applications engineered for seamless performance and user retention.",
      capabilities: ["React Native", "iOS & Android", "App Store Optimization", "Offline-First Architecture"],
      image: "https://ik.imagekit.io/2lax2ytm2/Mobile%20Deve%20(1).svg"
    },
    {
      id: "04",
      title: "AI Agent & Automation",
      description: "Custom AI solutions and intelligent automation to streamline operations, optimize workflows, and scale your business efficiency.",
      capabilities: ["LLM Integration", "Workflow Automation", "Chatbot Development", "Data Analysis"],
      image: "https://ik.imagekit.io/2lax2ytm2/agent%20(1).svg"
    },
    {
      id: "05",
      title: "Branding & Strategy",
      description: "Strategic brand identity design that communicates your core values, resonates with your audience, and creates lasting market impact.",
      capabilities: ["Brand Identity", "Visual Language", "Market Positioning", "Content Strategy"],
      image: "https://ik.imagekit.io/2lax2ytm2/Frame%20427319390.png"
    },
  ]

  return (
    <section className="bg-[#fffff3] py-12 md:py-32 border-t border-[#414042]/10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8">
          <div>
            <span
              className="block font-mono text-xs text-[#8B5DFF] mb-4 tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
                            /// Service_Index
            </span>
            <h2
              className="text-5xl md:text-7xl font-bold text-[#414042] tracking-tight leading-[0.9]"
              style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
            >
              OUR<br />CAPABILITIES
            </h2>
          </div>

          <Link href="/contact" className="group flex items-center gap-4 border-b border-[#414042] pb-1">
            <span
              className="text-lg font-medium text-[#414042]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Start a Project
            </span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-45" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-24">
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} />
          ))}

          {/* Minimal "Get in Touch" Card */}
          <div className="flex flex-col items-start justify-between min-h-[300px]">
            <span
              className="text-sm font-mono text-[#414042]/30 mb-6 border-b border-[#414042]/10 pb-2 w-full"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              06
            </span>

            <div>
              <h3
                className="text-3xl font-bold text-[#414042] mb-4 leading-tight"
                style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
              >
                Need something<br />custom?
              </h3>
              <p
                className="text-[#414042]/70 text-sm leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                We define, design, and develop digital products for startups and Fortune 500 companies.
              </p>
            </div>

            <Link href="/contact" className="w-full">
              <button
                className="w-full py-4 border border-[#414042] text-[#414042] hover:bg-[#414042] hover:text-white transition-all duration-300 font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-3"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceItem({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Mobile InView Detection (Center of Screen)
  const isInView = useInView(containerRef, { margin: "-45% 0px -45% 0px" })

  return (
    <div ref={containerRef} className="group flex flex-col items-start bg-transparent">
      {/* Number */}
      <span
        className="text-sm font-mono text-[#8B5DFF] mb-6 border-b border-[#8B5DFF]/30 pb-2 w-full"
        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        {service.id}
      </span>

      {/* Service Identity Image - Creative/Minimal */}
      <div className="w-full aspect-[1728/1117] mb-6 overflow-hidden rounded-sm bg-[#e5e5e5] relative border border-[#414042]/5">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-out group-hover:scale-105",
            // Mobile: Color when in center (isInView). Desktop: Color on hover.
            // Default: grayscale opacity-80
            // Active/Hover: grayscale-0 opacity-100
            isInView ? "grayscale-0 opacity-100" : "grayscale opacity-80",
            "md:grayscale md:opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-100"
          )}
        />
        {/* Overlay Grid Line */}
        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Title */}
      <h3
        className="text-3xl font-bold text-[#414042] mb-4 leading-tight group-hover:text-[#8B5DFF] transition-colors duration-300"
        style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-[#414042]/70 text-sm leading-relaxed mb-8"
        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        {service.description}
      </p>

      {/* Capabilities List */}
      <ul className="mt-auto space-y-2">
        {service.capabilities.map((cap: string, i: number) => (
          <li
            key={i}
            className="text-xs text-[#414042]/50 font-mono uppercase tracking-wide flex items-center gap-2"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            <span className="w-1 h-1 bg-[#8B5DFF] rounded-full" />
            {cap}
          </li>
        ))}
      </ul>
    </div>
  )
}
