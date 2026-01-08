"use client"

import { ArrowRight, Mail, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function ServicesListSection() {
    const services = [
        {
            title: "Website Development",
            description: "From high-performance Fintech and Medical platforms to immersive 3D, EdTech, and animated web experiences. We build complex, modern solutions that drive impact.",
            tags: ["Next.js", "Django", "React", "3D Web", "Fintech", "HealthTech"],
            image: "https://ik.imagekit.io/2lax2ytm2/Website%20Developemt.svg",
        },
        {
            title: "UI/UX Design",
            description: "User-centric design that blends aesthetics with functionality, creating intuitive and engaging digital experiences.",
            tags: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Figma"],
            image: "https://ik.imagekit.io/2lax2ytm2/thursday.social%20(1).svg",
        },
        {
            title: "Mobile App Development",
            description: "Scalable, native and cross-platform mobile applications engineered for seamless performance and user retention.",
            tags: ["React Native", "iOS", "Android", "Flutter", "App Store Optimization"],
            image: "https://ik.imagekit.io/2lax2ytm2/Mobile%20Deve%20(1).svg",
        },
        {
            title: "AI Agent & Automation",
            description: "Custom AI solutions and intelligent automation to streamline operations, optimize workflows, and scale your business efficiency.",
            tags: ["LLMs", "Chatbots", "Workflow Automation", "Python", "Data Analysis"],
            image: "https://ik.imagekit.io/2lax2ytm2/agent%20(1).svg",
        },
        {
            title: "Branding",
            description: "Strategic brand identity design that communicates your core values, resonates with your audience, and creates lasting market impact.",
            tags: ["Logo Design", "Brand Strategy", "Visual Identity", "Guidelines", "Marketing Assets"],
            image: "https://ik.imagekit.io/2lax2ytm2/Frame%20427319390.png",
        },
    ]

    return (
        <section className="bg-white pb-16 pt-8 md:pb-32 md:pt-16 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Dot Pattern */}
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
                        backgroundSize: '24px 24px',
                        maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
                    }}
                />
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#8B5DFF]/20 blur-[120px] rounded-full mix-blend-multiply" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-4xl mx-auto mb-16 md:mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center mb-8 md:mb-12"
                    >
                        {/* Icon & Title Container */}
                        <div className="flex items-center gap-6 md:gap-8 mb-6 md:mb-8">
                            <motion.div
                                initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
                                whileInView={{ rotate: -12, scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="border-2 border-black border-dashed rounded-[12px] p-2 md:p-3"
                            >
                                <Scan className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
                            </motion.div>

                            <h1 className="text-5xl md:text-8xl font-bold text-black tracking-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                                Our Services
                            </h1>
                        </div>

                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed text-center" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                            Comprehensive digital solutions tailored to elevate your<br className="hidden md:block" /> business in the modern era.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {services.map((service, index) => (
                        <ServiceRow key={index} service={service} index={index} />
                    ))}
                </div>

                {/* CPA Section */}
                <div className="mt-20 md:mt-32 border-t border-gray-100 pt-16 md:pt-24 text-center">
                    <div className="max-w-3xl mx-auto bg-gray-50 rounded-[24px] md:rounded-[32px] p-8 md:p-16">
                        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-black" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                            Need something specific?
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                            If you don't see exactly what you're looking for, let's talk. We love solving unique challenges.
                        </p>
                        <Link href="/contact">
                            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-4 md:px-10 md:py-6 text-base md:text-lg font-medium transition-all duration-300 h-auto" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                <Mail className="w-5 h-5 mr-2" />
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ServiceRow({ service, index }: { service: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 lg:gap-20 items-center`}>
            {/* Image Side */}
            <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 group">
                    <div className="absolute inset-0 p-8 md:p-12 flex items-center justify-center">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                <div className="flex flex-col gap-3 md:gap-4">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-[#8B5DFF] uppercase" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        0{index + 1}
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                        {service.title}
                    </h2>
                </div>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                    {service.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3">
                    {service.tags.map((tag: string, i: number) => (
                        <span
                            key={i}
                            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-50 border border-gray-200 text-xs md:text-sm font-medium text-gray-700"
                            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <Link href="/contact" className="inline-block w-full max-w-[280px]">
                    <button className="group/btn relative flex items-center justify-between bg-[#1C1C1C] text-white rounded-full p-2 pl-6 md:pl-8 pr-2 w-full hover:scale-[1.02] transition-transform duration-300">
                        <span className="text-base md:text-lg font-medium" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Start Project</span>
                        <div className="bg-white rounded-full p-3 md:p-4 text-black group-hover/btn:rotate-[-45deg] transition-transform duration-300">
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    )
}
