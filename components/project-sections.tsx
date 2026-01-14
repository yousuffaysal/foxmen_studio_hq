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
    const categories = ["All", "Mobile Apps", "Web Apps", "AI Projects", "Digital Products", "UI/UX Design"]
    const [activeCategory, setActiveCategory] = useState("All")
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data)
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
        : projects.filter(p => p.tags && p.tags.some((tag: string) => tag.toLowerCase() === activeCategory.toLowerCase() || tag.includes(activeCategory)))

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
            <span className="animate-pulse">Loading Experience...</span>
        </div>
    )

    return (
        <section className="bg-[#050505] min-h-screen py-20 px-4 md:px-8 relative z-20">
            {/* Filter */}
            <div className="container mx-auto mb-20 overflow-x-auto">
                <div className="flex justify-center min-w-max gap-2 md:gap-4 px-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 relative ${activeCategory === cat ? "text-black" : "text-gray-400 hover:text-white"}`}
                            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                        >
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activePill"
                                    className="absolute inset-0 bg-white rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`group relative ${index % 3 === 0 ? "lg:col-span-2 aspect-[2/1]" : "aspect-[4/3]"} rounded-[20px] overflow-hidden`}
                    >
                        <Link href={`/projects/${project.slug}`} className="block w-full h-full relative cursor-none-target">
                            {/* Image */}
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
                                    <span className="text-4xl font-bold text-gray-800">{project.title.substring(0, 2)}</span>
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                        {project.tags?.[0] || 'Showcase'}
                                    </span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                                        {project.title}
                                    </h3>
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                        <ArrowUpRight className="w-6 h-6 text-black" />
                                    </div>
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
