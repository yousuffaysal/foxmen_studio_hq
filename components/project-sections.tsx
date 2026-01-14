"use client"

import { ArrowRight, ArrowUpRight, Play, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ProjectsHero() {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -100])

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center bg-[#050505] text-white overflow-hidden pt-20">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseFilter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                    </svg>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#8B5DFF]/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[4000ms]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#2a2a2a]/40 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs md:text-sm font-medium tracking-widest uppercase mb-6 text-gray-400 backdrop-blur-md" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        Selected Works 2024-25
                    </span>
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                        Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">Excellence.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        We craft immersive digital experiences, high-performance applications, and brand identities that define the future.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export function ProjectGrid() {
    // Dynamic categories state
    const [categories, setCategories] = useState<string[]>(["All"])
    const [activeCategory, setActiveCategory] = useState("All")
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data)
                    // Extract unique categories from projects
                    const uniqueCats = Array.from(new Set(data.map((p: any) => p.category).filter(Boolean))) as string[];
                    setCategories(["All", ...uniqueCats.sort()])
                } else {
                    console.error("API Error:", data)
                    setProjects([])
                }
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory)

    if (loading) return (
        <div className="min-h-screen bg-[#fffff0] flex items-center justify-center text-black" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
            <span className="animate-pulse tracking-widest uppercase text-xs">Loading Archive...</span>
        </div>
    )

    return (
        <section className="bg-[#fffff0] min-h-screen py-32 px-4 md:px-12 relative z-20">
            {/* Header & Filter */}
            <div className="container mx-auto mb-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-black" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                        Projects
                    </h2>
                    <p className="max-w-md text-sm md:text-base text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        Every project we deliver is a reflection of our commitment to quality, designed to inspire and drive success.
                    </p>
                </div>

                <div className="flex flex-wrap gap-6 md:gap-8 border-b border-black/10 pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-sm md:text-base font-medium transition-colors duration-300 relative ${activeCategory === cat ? "text-black" : "text-gray-400 hover:text-black"}`}
                            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto grid md:grid-cols-2 gap-x-8 gap-y-20">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group block"
                    >
                        <Link href={`/projects/${project.slug}`} className="block w-full cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 mb-6">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-gray-300">{project.title.substring(0, 2)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Content Below Image */}
                            <div className="flex flex-col items-start">
                                <h3 className="text-xl md:text-2xl font-bold text-black mb-2 group-hover:underline decoration-2 underline-offset-4" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 max-w-md mb-4 leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {(project.category) && (
                                        <span className="px-3 py-1 border border-black/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-gray-600 bg-white">
                                            {project.category}
                                        </span>
                                    )}
                                    {project.tags?.slice(0, 2).map((tag: string) => (
                                        <span key={tag} className="px-3 py-1 border border-black/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-gray-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

import ChainCarousel, { ChainItem } from "@/components/ui/chain-carousel"
import { TrendingUp } from "lucide-react"

export function ProjectTech() {
    const techs: ChainItem[] = [
        { id: 1, name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg", details: "Backend Framework", icon: TrendingUp },
        { id: 2, name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", details: "React Framework", icon: TrendingUp },
        { id: 3, name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", details: "Programming Language", icon: TrendingUp },
        { id: 4, name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", details: "UI Library", icon: TrendingUp },
        { id: 5, name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", details: "3D Graphics", icon: TrendingUp },
        { id: 6, name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", details: "Cloud Infrastructure", icon: TrendingUp },
        { id: 7, name: "Framer", logo: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg", details: "Motion Library", icon: TrendingUp },
        { id: 8, name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", details: "Design Tool", icon: TrendingUp },
        { id: 9, name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", details: "Containerization", icon: TrendingUp },
        { id: 10, name: "Golang", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg", details: "Backend Language", icon: TrendingUp },
        { id: 11, name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", details: "Runtime Environment", icon: TrendingUp },
        { id: 12, name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", details: "Web Framework", icon: TrendingUp },
    ]

    return (
        <section className="py-24 bg-[#080808] border-t border-white/5 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none"></div>

            <div className="w-full px-4 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                    Powered by Modern<br /><span className="text-[#8B5DFF]">Engineering</span>
                </h2>
                <p className="text-gray-400 text-base md:text-lg max-w-xl mt-6 md:mt-0 text-right" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                    We leverage the bleeding edge of tech to build scalable, secure, and high-performance digital solutions.
                </p>
            </div>

            <div className="w-full">
                <ChainCarousel items={techs} className="w-full max-w-none" />
            </div>
        </section>
    )
}

export function ProjectCTA() {
    return (
        <section className="py-32 px-4 bg-[#050505] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[#8B5DFF]/5"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5DFF]/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-8xl font-bold mb-8 text-white tracking-tight"
                    style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}
                >
                    Have a vision?
                </motion.h2>
                <div className="flex justify-center">
                    <Link href="/contact" className="group relative">
                        <div className="absolute inset-0 bg-[#8B5DFF] rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <button className="relative bg-white text-black text-xl md:text-2xl font-bold px-12 py-5 rounded-full flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                            Let's Build It <ArrowRight size={24} />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
