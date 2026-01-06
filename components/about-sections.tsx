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
        { title: "Mobile App Development", icon: Smartphone, desc: "Native and cross-platform apps that feel seamless.", className: "md:col-span-2" },
        { title: "Web & Web App Dev", icon: Globe, desc: "Scalable, high-performance web solutions.", className: "md:col-span-1" },
        { title: "AI & Automation", icon: Zap, desc: "Smart integrations to power up your workflow.", className: "md:col-span-1" },
        { title: "Digital Product Dev", icon: Code, desc: "End-to-end product lifecycle management.", className: "md:col-span-2" },
        { title: "UI/UX Design", icon: Layout, desc: "Interfaces that users love to touch and explore.", className: "md:col-span-2" },
        { title: "Digital Marketing", icon: Users, desc: "Strategic growth and brand positioning.", className: "md:col-span-1" },
    ]

    return (
        <section className="py-24 md:py-32 bg-white px-4 md:px-8 text-[#0a0a0a]">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-16 md:mb-24">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                        OUR <br /><span className="text-[#8B5DFF]">CRAFT</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-sm mb-12" style={{ fontFamily: "var(--font-sans)" }}>
                        Comprehensive digital solutions tailored to elevate your brand above the noise.
                    </p>
                    <div className="w-16 h-1 bg-[#8B5DFF]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative bg-[#f4f4f4] hover:bg-[#0a0a0a] hover:text-white p-8 md:p-10 rounded-[2rem] transition-all duration-500 overflow-hidden flex flex-col justify-between ${service.className}`}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <MoveRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                            </div>

                            <div className="w-12 h-12 bg-white text-black group-hover:bg-[#8B5DFF] group-hover:text-white rounded-full flex items-center justify-center transition-colors duration-500">
                                <service.icon className="w-6 h-6" />
                            </div>

                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                                <p className="text-gray-500 group-hover:text-gray-300 font-medium transition-colors text-lg" style={{ fontFamily: "var(--font-sans)" }}>{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function AboutApproach() {
    const steps = [
        { title: "Discovery", desc: "We immerse ourselves in your world to uncover deep insights." },
        { title: "Strategy", desc: "Crafting a roadmap that aligns business goals with user needs." },
        { title: "Design", desc: "Visualizing the solution with high-fidelity, interactive prototypes." },
        { title: "Development", desc: "Building robust, scalable foundations with clean code." },
        { title: "Launch & Scale", desc: "Deploying to the world and iterating for continuous growth." }
    ]

    return (
        <section className="py-32 bg-[#050505] text-white overflow-hidden relative">
            {/* Background Logo Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none select-none">
                <Image
                    src="https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png"
                    alt="Background Logo"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="w-16 h-16 mb-8 relative">
                        <Image
                            src="https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png"
                            alt="Foxmen Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-[#8B5DFF] font-mono mb-4 text-sm tracking-widest uppercase">The Process</span>
                    <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        From Chaos to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5DFF] to-white">Clarity</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
                    {steps.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="relative p-6 pt-12 border border-white/10 rounded-3xl hover:border-[#8B5DFF]/50 hover:bg-white/5 transition-all duration-500 group flex flex-col items-center text-center"
                        >
                            <div className="text-6xl font-bold text-white/20 absolute top-4 left-4 group-hover:text-[#8B5DFF]/30 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                                0{i + 1}
                            </div>

                            <div className="w-3 h-3 rounded-full bg-[#8B5DFF] mb-6 shadow-[0_0_15px_#8B5DFF]" />

                            <h3 className="text-xl font-bold mb-4 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                            <p className="text-gray-400 font-light text-sm relative z-10 leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>{item.desc}</p>
                        </motion.div>
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
        <section className="py-8 bg-[#050505] overflow-hidden whitespace-nowrap border-y border-white/10">
            <div className="flex items-center gap-16 animate-marquee">
                {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 transition-opacity duration-300 hover:opacity-80">
                        <span className="text-5xl md:text-7xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</span>
                        <span className="text-sm md:text-base text-[#8B5DFF] font-mono uppercase tracking-wider">{stat.label}</span>
                        <div className="relative w-16 h-16 ml-8">
                            <Image
                                src="https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png"
                                alt="Separator"
                                fill
                                className="object-contain"
                            />
                        </div>
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
