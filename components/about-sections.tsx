"use client"

import { ArrowRight, Code, Cpu, Globe, Layout, Smartphone, Users, Zap, Star, MoveRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function AboutHero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 overflow-hidden bg-[#050505] text-[#f0f0f0]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#8B5DFF] opacity-20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[10s]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#6E35FF] opacity-10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <div className="max-w-[1800px] mx-auto w-full relative z-10 pt-20">
                <div className="flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-[#8B5DFF]" />
                        <span className="text-[#8B5DFF] font-medium tracking-widest uppercase text-sm" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                            Who We Are
                        </span>
                    </motion.div>

                    <h1 className="text-[clamp(3.5rem,8vw,9rem)] leading-[0.9] font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                DIGITAL
                            </motion.span>
                        </div>
                        <div className="overflow-hidden text-[#8B5DFF]">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                ALCHEMY
                            </motion.span>
                        </div>
                        <div className="overflow-hidden ml-[2vw]">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50"
                            >
                                STUDIO.
                            </motion.span>
                        </div>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-2xl mt-8 ml-auto mr-[5vw]"
                    >
                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light" style={{ fontFamily: "var(--font-sans)" }}>
                            We fuse creative chaos with engineering precision. Not just another agency, but your partner in crafting digital experiences that <span className="text-white font-medium">defy expectations</span>.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export function AboutServices() {
    const services = [
        { title: "Mobile Evolution", icon: Smartphone, desc: "Native apps that feel alive." },
        { title: "Web Architectures", icon: Globe, desc: "Scalable, high-performance ecosystems." },
        { title: "Intelligent Systems", icon: Zap, desc: "AI integrations that power growth." },
        { title: "Product Strategy", icon: Code, desc: "From napking sketch to market leader." },
        { title: "Immersive UI/UX", icon: Layout, desc: "Interfaces that demand interaction." },
        { title: "Growth Engine", icon: Users, desc: "Data-driven marketing campaigns." },
    ]

    return (
        <section className="py-24 md:py-32 bg-white px-4 md:px-8 text-[#0a0a0a]">
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4 sticky top-24 h-fit">
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                            OUR <br /><span className="text-[#8B5DFF]">CRAFT</span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-sm mb-12" style={{ fontFamily: "var(--font-sans)" }}>
                            Comprehensive digital solutions tailored to elevate your brand above the noise.
                        </p>
                        <div className="w-16 h-1 bg-[#8B5DFF]" />
                    </div>

                    <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-[#f4f4f4] hover:bg-[#0a0a0a] hover:text-white p-8 md:p-10 rounded-[2rem] transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <MoveRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                </div>

                                <div className="mb-8 w-12 h-12 bg-white text-black group-hover:bg-[#8B5DFF] group-hover:text-white rounded-full flex items-center justify-center transition-colors duration-500">
                                    <service.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                                <p className="text-gray-500 group-hover:text-gray-300 font-medium transition-colors" style={{ fontFamily: "var(--font-sans)" }}>{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function AboutApproach() {
    return (
        <section className="py-32 bg-[#050505] text-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center text-center mb-24">
                    <span className="text-[#8B5DFF] font-mono mb-4 text-sm tracking-widest uppercase">The Process</span>
                    <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        From Chaos to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5DFF] to-white">Clarity</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { step: "01", title: "Dissect", desc: "We break down the problem to its core molecules." },
                        { step: "02", title: "Synthesize", desc: "Reassembling ideas into coherent, powerful designs." },
                        { step: "03", title: "Amplify", desc: "Engineering solutions that scale infinitely." }
                    ].map((item, i) => (
                        <div key={i} className="relative p-8 border border-white/10 rounded-3xl hover:border-[#8B5DFF]/50 hover:bg-white/5 transition-all duration-500 group">
                            <div className="text-[8rem] font-bold text-white/5 absolute -top-10 -right-4 group-hover:text-[#8B5DFF]/10 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                                {item.step}
                            </div>
                            <h3 className="text-3xl font-bold mb-4 mt-8 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                            <p className="text-gray-400 font-light relative z-10" style={{ fontFamily: "var(--font-sans)" }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function AboutTech() {
    const techs = ["Django", "MERN", "Next.js", "Nest.js", "Python", "React", "Figma", "Framer", "AI Tools"]
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <p className="text-[#8B5DFF] font-mono mb-6 text-sm">Powered By</p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                    {techs.map((tech, i) => (
                        <span key={i} className="px-6 py-3 rounded-full border border-black/10 text-lg md:text-xl font-medium hover:bg-[#8B5DFF] hover:text-white hover:border-[#8B5DFF] transition-all duration-300 cursor-default" style={{ fontFamily: "var(--font-heading)" }}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function AboutStatsMarquee() {
    const stats = [
        { label: "Satisfied Clients", value: "100%" },
        { label: "Projects Shipped", value: "3.5k+" },
        { label: "Active Orders", value: "10+" },
        { label: "Years Experience", value: "05+" },
        { label: "Team Strength", value: "20+" },
    ]

    return (
        <section className="py-16 bg-[#050505] overflow-hidden whitespace-nowrap border-y border-white/10">
            <div className="flex items-center gap-16 animate-marquee">
                {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-5xl md:text-7xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</span>
                        <span className="text-sm md:text-base text-[#8B5DFF] font-mono uppercase tracking-wider">{stat.label}</span>
                        <div className="w-2 h-2 rounded-full bg-white/20 ml-8" />
                    </div>
                ))}
            </div>
            <style jsx>{`
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    )
}

export function AboutCTA() {
    return (
        <section className="py-32 md:py-48 px-4 md:px-8 bg-[#8B5DFF] text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                    READY TO <br /> BREAK THE MOLD?
                </h2>
                <Link href="/contact" className="inline-flex items-center gap-4 text-2xl md:text-3xl font-medium hover:gap-8 transition-all duration-300 border-b-2 border-white pb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Start Your Project <ArrowRight className="w-8 h-8" />
                </Link>
            </div>
        </section>
    )
}
