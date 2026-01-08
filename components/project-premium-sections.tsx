"use client"

import { ArrowRight, Play, Check, ChevronRight, Award, Zap, Layout, Search, Code, Smartphone, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export function ProjectStats() {
    const stats = [
        { label: "Projects Delivered", value: "120+" },
        { label: "Industries Served", value: "50+" },
        { label: "Repeat Clients", value: "95%" },
        { label: "Years of Expertise", value: "5+" },
    ]
    return (
        <section className="py-24 px-4 bg-[#050505] border-t border-white/5">
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {stats.map((stat, i) => (
                    <motion.div key={i} variants={fadeInUp} className="text-center group cursor-default">
                        <div className="text-6xl md:text-8xl font-black mb-4 text-white group-hover:text-[#8B5DFF] transition-colors duration-500" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                            {stat.value}
                        </div>
                        <div className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-widest border-t border-white/10 pt-4" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export function IndustryCategories() {
    const industries = ["Fintech", "Health & Medical", "Education", "E-commerce", "Real Estate", "SaaS Products", "Logistics", "Entertainment"]
    return (
        <section className="py-24 px-4 bg-[#080808] border-t border-white/5">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold mb-12 text-white"
                    style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}
                >
                    Industries We <span className="text-[#8B5DFF]">Transform</span>
                </motion.h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {industries.map((ind, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-8 py-4 bg-[#111] border border-white/10 rounded-full font-bold text-gray-300 hover:text-white hover:border-[#8B5DFF] hover:bg-[#8B5DFF]/10 transition-all duration-300"
                            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                        >
                            {ind}
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function BeforeAfter() {
    return (
        <section className="py-32 px-4 bg-[#050505] border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center text-white"
                    style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}
                >
                    Transforming <span className="text-gray-500">Digital Experiences</span>
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#111] p-12 rounded-[32px] border border-white/5 relative min-h-[400px] flex items-center justify-center group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-red-900/5 group-hover:bg-red-900/10 transition-colors"></div>
                        <div className="absolute top-8 left-8 bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-xs font-bold border border-red-500/20 uppercase tracking-wider" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Before</div>
                        <div className="text-gray-500 font-bold text-3xl text-center relative z-10" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                            Cluttered & <br />Confusing UI
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#0A2012] p-12 rounded-[32px] border border-green-500/20 relative min-h-[400px] flex items-center justify-center group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 to-transparent"></div>
                        <div className="absolute top-8 left-8 bg-[#D9FF00] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>After</div>
                        <div className="text-white font-bold text-3xl md:text-4xl text-center relative z-10 shadow-black drop-shadow-lg" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                            Clean, Intuitive <br />& Engaging
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export function ProjectProcess() {
    const steps = [
        { icon: Search, label: "Discovery" },
        { icon: Layout, label: "UX/UI" },
        { icon: Code, label: "Engineering" },
        { icon: Smartphone, label: "Testing" },
        { icon: Rocket, label: "Launch" },
    ]
    return (
        <section className="py-24 px-4 bg-[#080808] border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl font-bold mb-16 text-center text-white"
                    style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}
                >
                    Our Process
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-px bg-white/10 -z-0"></div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center group relative z-10"
                        >
                            <div className="w-20 h-20 bg-[#111] border border-white/20 rounded-full flex items-center justify-center mb-6 group-hover:border-[#8B5DFF] group-hover:scale-110 transition-all duration-300">
                                <step.icon className="w-8 h-8 text-gray-400 group-hover:text-white" />
                            </div>
                            <span className="font-bold text-lg text-gray-300" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{step.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function ProjectTimeline() {
    return (
        <section className="py-24 px-4 bg-[#050505] border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-16 text-center text-white" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Typical Timeline</h2>
                <div className="relative border border-white/10 rounded-[32px] p-8 md:p-12 bg-[#0a0a0a] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B5DFF] to-[#D9FF00] opacity-20"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { time: "2 weeks", label: "Research", color: "bg-blue-500" },
                            { time: "3 weeks", label: "UX/UI Design", color: "bg-[#D9FF00]" },
                            { time: "4 weeks", label: "Development", color: "bg-[#8B5DFF]" },
                            { time: "1 week", label: "QA Testing", color: "bg-red-500" }
                        ].map((item, i) => (
                            <div key={i} className="relative p-6 rounded-2xl bg-[#111] border border-white/5 text-center hover:bg-[#161616] transition-colors">
                                <div className={`w-2 h-2 rounded-full mx-auto mb-4 ${item.color} shadow-[0_0_10px_currentColor]`}></div>
                                <div className="text-xl font-bold mb-2 text-white" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>{item.time}</div>
                                <div className="text-gray-500 font-medium text-sm" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function ProjectAwards() {
    const awards = [
        "Top App Developers 2024",
        "Recognized by Local Startups",
        "Featured in Tech Community",
        "Best UI/UX Design 2024"
    ]
    return (
        <section className="py-20 px-4 bg-[#080808] border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl font-bold mb-12 text-center text-gray-500 uppercase tracking-widest font-mono">Recognition</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {awards.map((award, i) => (
                        <div key={i} className="bg-[#111] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center hover:border-[#8B5DFF]/30 transition-colors group">
                            <Award className="w-8 h-8 text-[#FFC224] mb-4 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-gray-300 group-hover:text-white" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>{award}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function ClientLogos() {
    return (
        <section className="py-20 px-4 bg-[#050505] border-t border-white/5">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-xl font-bold mb-12 text-gray-600 uppercase tracking-widest font-mono">Trusted By</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-12 bg-white/5 rounded-lg flex items-center justify-center font-bold text-white border border-white/5">
                            CLIENT {i}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function FeaturedCaseStudyLong() {
    return (
        <section className="bg-[#050505] text-white py-32 px-4 overflow-hidden border-t border-white/5 relative">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5"></div>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block bg-[#FF4A60] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-8 tracking-wider">Featured Case Study</div>
                    <h2 className="text-6xl md:text-8xl font-bold mb-8 leading-none" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                        Reinventing <br /> <span className="text-outline-white text-transparent" style={{ WebkitTextStroke: "2px white" }}>Fintech</span>
                    </h2>
                    <div className="space-y-8 text-xl text-gray-400 font-medium max-w-lg mb-12">
                        <p style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>User retention was dropping. We stepped in to reimagine the entire onboarding flow, resulting in a 300% increase in sign-ups.</p>
                        <div className="flex gap-12 border-t border-white/10 pt-8">
                            <div>
                                <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>300%</div>
                                <div className="text-xs uppercase tracking-widest text-[#D9FF00]">Growth</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>2M+</div>
                                <div className="text-xs uppercase tracking-widest text-[#D9FF00]">Users</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="relative">
                    {/* Abstract Mockup */}
                    <motion.div
                        initial={{ rotate: 5, scale: 0.9, opacity: 0 }}
                        whileInView={{ rotate: 3, scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        whileHover={{ rotate: 0 }}
                        className="w-full h-[600px] bg-[#1a1a1a] rounded-[32px] border border-white/10 relative shadow-[0_0_100px_rgba(139,93,255,0.15)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-7xl font-black uppercase tracking-tighter">
                            UI Mockup
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export function AnimationShowcase() {
    return (
        <section className="py-32 px-4 bg-[#080808] text-white overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Motion & <br /><span className="text-[#8B5DFF]">Interaction</span></h2>
                    <p className="text-gray-400 max-w-md text-right mt-6 md:mt-0 leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        We believe motion isn't just decoration. It's communication. Every interaction should feel responsive and alive.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square bg-[#111] rounded-[24px] border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5DFF]/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-white/50">
                                <Play className="w-8 h-8 fill-white text-white ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function TechFilter() {
    // Hidden as it's redundant with ProjectTech, but keeping function for safety if reused
    return null;
}

export function ImpactStories() {
    const stories = [
        { val: "60%", desc: "Increase in conversions after redesign." },
        { val: "40%", desc: "Reduction in customer support load using AI." },
        { val: "70%", desc: "Of total workflow processes automated." }
    ]
    return (
        <section className="py-24 px-4 bg-[#D9FF00] border-t border-black">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12 text-black">
                {stories.map((s, i) => (
                    <div key={i} className="bg-black/5 p-8 rounded-[24px] border border-black/10">
                        <div className="text-6xl font-black mb-4 tracking-tighter" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>{s.val}</div>
                        <p className="text-xl font-bold leading-tight uppercase opacity-80" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export function BehindTheScenes() {
    return (
        <section className="py-32 px-4 bg-[#050505] border-t border-white/5 text-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Behind the Scenes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-[3/4] bg-[#111] rounded-2xl overflow-hidden relative group border border-white/5">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold font-mono">
                                RAW_FOOTAGE_{i}
                            </div>
                            <div className="absolute inset-0 bg-[#8B5DFF]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="font-bold text-white uppercase tracking-widest text-sm">View</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function ProjectReel() {
    return (
        <section className="h-[60vh] md:h-[80vh] bg-black relative border-t border-white/10 flex items-center justify-center group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('/images/noise.png')]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>

            <motion.div
                whileHover={{ scale: 1.1 }}
                className="z-10 text-center"
            >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 mx-auto border border-white/20 group-hover:bg-white/20 transition-all">
                    <Play className="w-10 h-10 md:w-12 md:h-12 ml-2 fill-white text-white" />
                </div>
                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-widest uppercase" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Watch Showreel</h2>
            </motion.div>
        </section>
    )
}

export function ClosingCTA() {
    return (
        <section className="py-32 px-4 bg-[#050505] text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5DFF]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="text-5xl md:text-8xl font-bold mb-12 leading-tight text-white" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                    Ready to build <br /> the <span className="text-[#8B5DFF]">extraordinary?</span>
                </h2>
                <Link href="/contact" className="inline-flex items-center justify-center bg-white text-black border border-transparent rounded-full px-12 py-6 text-xl font-bold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    Start Your Project <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
            </div>
        </section>
    )
}
