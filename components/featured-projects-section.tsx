"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

export function FeaturedProjectsSection() {
    const projects = [
        {
            id: "01",
            title: "Vast Space",
            description: "A comprehensive management platform for an aerospace company, handling logistics and orbital trajectories.",
            tag: "SYSTEM_ARCH",
            year: "2025",
            video: "https://ik.imagekit.io/2lax2ytm2/Screen%20Recording%202025-12-16%20at%204.13.24%20PM%20(1)%20(1).mp4",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1765916680/Screen_Recording_2025-12-16_at_4.13.24_PM_1_1_vtucjo.jpg",
            displayUrl: "vastspace.com",
        },
        {
            id: "02",
            title: "Jeskojets",
            description: "Exclusive private jet charter platform offering seamless booking and premium travel experiences.",
            tag: "AVIATION_UI",
            year: "2025",
            video: "https://ik.imagekit.io/hkhhsyhak/Screen%20Recording%202026-02-09%20at%203.07.50%20PM%20(2)%20(1).mp4",
            displayUrl: "jeskojets.com",
        },
        {
            id: "03",
            title: "Coinbase Identity",
            description: "Futuristic 3D brand identity and visual language system for the next generation of crypto exchange.",
            tag: "VISUAL_SYS",
            year: "2024",
            video: "https://ik.imagekit.io/2lax2ytm2/coinbase_brand_film%20(1080p).mp4",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1766061712/coinbase_brand_film_1080p_ym70u6.jpg",
            displayUrl: "coinbase.com",
        },
        {
            id: "04",
            title: "Wefunder App",
            description: "Secure investment platform for funders, featuring real-time equity tracking and verified portfolios.",
            tag: "MOBILE_ENG",
            year: "2024",
            video: "https://ik.imagekit.io/2lax2ytm2/Screen%20Recording%202025-12-18%20at%203.23.38%20PM%20(1).mov",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1766050597/Screen_Recording_2025-12-18_at_3.23.38_PM_1_b0becr.jpg",
            displayUrl: "wefunder.com",
        },
        {
            id: "05",
            title: "LMS Platform",
            description: "Interactive learning management system with AI-driven curriculum adaptation and progress tracking.",
            tag: "EDTECH_AI",
            year: "2023",
            video: "https://ik.imagekit.io/2lax2ytm2/Screen%20Recording%202025-12-18%20at%202.32.23%20PM%20(1).mov",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1766047326/Screen_Recording_2025-12-18_at_2.32.23_PM_nmuegb.jpg",
            displayUrl: "pluralsight.com",
        },
    ]

    return (
        <section className="bg-[#fffff3] py-16 md:py-32 relative border-t border-[#414042]/10">
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header - Technical/Brutalist */}
                <div className="mb-12 md:mb-24 border-b border-[#414042] pb-6 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span
                            className="block font-mono text-xs text-[#8B5DFF] mb-2 tracking-widest uppercase"
                            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        >
                            /// System Output_01
                        </span>
                        <h2
                            className="text-5xl md:text-7xl font-bold text-[#414042] tracking-tight leading-[0.9]"
                            style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                        >
                            SELECTED<br /><span className="text-[#8B5DFF]">WORKS</span>
                        </h2>
                    </div>
                    <div className="md:text-right max-w-sm">
                        <p
                            className="text-[#414042]/80 text-sm leading-relaxed"
                            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        >
                            [ARCHIVE]: A curated index of digital experiences, architectural systems, and visual languages engineered by Foxmen Studio.
                        </p>
                    </div>
                </div>

                {/* Vertical Editorial Stack */}
                <div className="flex flex-col gap-32">
                    {projects.map((project, index) => (
                        <ProjectItem key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

import { cn } from "@/lib/utils"

function ProjectItem({ project, index }: { project: any, index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Mobile InView Detection (Center of Screen)
    // margin: "-45% 0px -45% 0px" triggers when the element is in the middle 10% of the viewport
    const isInView = useInView(containerRef, { margin: "-45% 0px -45% 0px" })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Subtle parallax for the image
    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch((e) => console.log("Autoplay blocked:", e))
        }
    }, [])

    return (
        <div ref={containerRef} className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start border-t border-[#414042]/10 pt-8 relative">
            {/* Left: Meta Data (Sticky on Desktop) */}
            <div className="w-full md:w-1/3 md:sticky md:top-32 self-start flex flex-col gap-6">
                <div className="flex items-baseline justify-between border-b border-[#414042]/20 pb-2">
                    <span
                        className="text-6xl font-bold text-[#414042]/10 group-hover:text-[#8B5DFF]/20 transition-colors duration-500"
                        style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                    >
                        {project.id}
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-[#414042] group-hover:text-[#8B5DFF] group-hover:rotate-45 transition-all duration-300" />
                </div>

                <div>
                    <h3
                        className="text-3xl md:text-4xl font-bold text-[#414042] mb-3 leading-tight group-hover:text-[#8B5DFF] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                    >
                        {project.title}
                    </h3>

                    <div
                        className="flex flex-wrap gap-3 my-4 text-xs font-bold uppercase tracking-wider text-[#414042]/60"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                        <span className="bg-[#414042]/5 px-2 py-1 rounded-sm">[{project.tag}]</span>
                        <span className="bg-[#414042]/5 px-2 py-1 rounded-sm">[{project.year}]</span>
                    </div>

                    <p
                        className="text-[#414042]/80 text-sm leading-relaxed max-w-xs"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Right: Visual (Large) */}
            <div className="w-full md:w-2/3">
                <motion.div
                    className="relative w-full aspect-[16/10] overflow-hidden bg-[#e5e5e5] shadow-sm transform transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                // style={{ y }} // Optional: Enable for parallax if desired, keeping it static for now for clean look
                >
                    {/* Overlay Grid Line */}
                    <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {project.video ? (
                        <video
                            ref={videoRef}
                            src={project.video}
                            poster={project.poster}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={cn(
                                "w-full h-full object-cover transition-all duration-700",
                                // Mobile: Color when in center view (isInView). Desktop: Color on hover.
                                isInView ? "grayscale-0" : "grayscale",
                                "md:grayscale md:group-hover:grayscale-0"
                            )}
                        />
                    ) : (
                        <Image
                            src={project.illustration || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className={cn(
                                "object-cover transition-all duration-700",
                                // Mobile: Color when in center view (isInView). Desktop: Color on hover.
                                isInView ? "grayscale-0" : "grayscale",
                                "md:grayscale md:group-hover:grayscale-0"
                            )}
                        />
                    )}

                    {/* Corner Markers */}
                    <div className="absolute top-4 left-4 w-4 h-[1px] bg-white z-20" />
                    <div className="absolute top-4 left-4 w-[1px] h-4 bg-white z-20" />
                    <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-white z-20" />
                    <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-white z-20" />
                </motion.div>

                <div className="mt-2 flex justify-between items-center px-1">
                    <span
                        className="text-[10px] text-[#414042]/40 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                        {project.displayUrl}
                    </span>
                    <span
                        className="text-[10px] text-[#414042]/40 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                        SECURE_CONNECTION
                    </span>
                </div>
            </div>
        </div>
    )
}
