"use client"

import { ArrowRight, Mail } from 'lucide-react'
import Link from "next/link"

export function ServicesSection() {
  const services = [
    {
      id: "01",
      title: "Website Development",
      description: "Custom, high-performance websites built with modern technologies (Next.js, React) to capture your brand's essence and convert visitors.",
      capabilities: ["Next.js / React", "Performance Optimization", "SEO Architecture", "CMS Integration"]
    },
    {
      id: "02",
      title: "UI/UX Design",
      description: "User-centric design that blends aesthetics with functionality, creating intuitive and engaging digital experiences.",
      capabilities: ["User Research", "Wireframing & Prototyping", "Design Systems", "Interaction Design"]
    },
    {
      id: "03",
      title: "Mobile App Development",
      description: "Scalable, native and cross-platform mobile applications engineered for seamless performance and user retention.",
      capabilities: ["React Native", "iOS & Android", "App Store Optimization", "Offline-First Architecture"]
    },
    {
      id: "04",
      title: "AI Agent & Automation",
      description: "Custom AI solutions and intelligent automation to streamline operations, optimize workflows, and scale your business efficiency.",
      capabilities: ["LLM Integration", "Workflow Automation", "Chatbot Development", "Data Analysis"]
    },
    {
      id: "05",
      title: "Branding & Strategy",
      description: "Strategic brand identity design that communicates your core values, resonates with your audience, and creates lasting market impact.",
      capabilities: ["Brand Identity", "Visual Language", "Market Positioning", "Content Strategy"]
    },
  ]

  return (
    <section className="bg-[#fffff3] py-24 md:py-32 border-t border-[#414042]/10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {services.map((service, index) => (
            <div key={index} className="group flex flex-col items-start">
              {/* Number */}
              <span
                className="text-sm font-mono text-[#8B5DFF] mb-6 border-b border-[#8B5DFF]/30 pb-2 w-full"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {service.id}
              </span>

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
                {service.capabilities.map((cap, i) => (
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
