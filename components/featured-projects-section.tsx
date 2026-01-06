"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function FeaturedProjectsSection() {
    const projects = [
        {
            title: "Business Management Website",
            description: "A comprehensive management platform for an aerospace company.",
            tag: "Commercial",
            logo: "/logos/company.svg",
            bgColor: "bg-[#FFC224]",
            illustration: "/images/studio-workspace.svg",
            video: "https://res.cloudinary.com/dk2txf8o3/video/upload/v1767674182/Screen_Recording_2025-12-16_at_4.13.24_PM_1_1_fcn7rj.mp4",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1765916680/Screen_Recording_2025-12-16_at_4.13.24_PM_1_1_vtucjo.jpg",
            displayUrl: "vastspace.com",
        },
        {
            title: "Digital Wallet",
            description: "Seamless money transfers and payments.",
            tag: "Fintech",
            logo: "/logos/startup.svg",
            bgColor: "bg-[#4F46E5]",
            illustration: "/images/studio-workspace.svg",
            video: "https://res.cloudinary.com/dk2txf8o3/video/upload/v1767674056/From_KlickPin_CF_UI_Design_for_money_transfer_and_digital_payment_services_Payoneer_Interactive_web_design_Mobile_app_design_inspiration_Banking_app_bazz7f.mp4",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1766068763/From_KlickPin_CF_UI_Design_for_money_transfer_and_digital_payment_services_Payoneer_Interactive_web_design_Mobile_app_design_inspiration_Banking_app_b58lz8.jpg",
            displayUrl: "app store",
        },
        {
            title: "Coinbase Visuals",
            description: "Futuristic 3D brand identity for Coinbase.",
            tag: "Branding",
            logo: "/logos/agency.svg",
            bgColor: "bg-[#FF5F56]",
            illustration: "/images/venture-workspace.svg",
            video: "https://res.cloudinary.com/dk2txf8o3/video/upload/v1767674035/coinbase_brand_film_1080p_poh7aq.mp4",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1766061712/coinbase_brand_film_1080p_ym70u6.jpg",
            displayUrl: "coinbase.com",
        },
        {
            title: "Wefunder App",
            description: "Secure investment platform for funders.",
            tag: "Fintech",
            logo: "/logos/healthcare.svg",
            bgColor: "bg-[#27C93F]",
            illustration: "/images/studio-workspace.svg",
            video: "https://res.cloudinary.com/dk2txf8o3/video/upload/v1767674222/Screen_Recording_2025-12-18_at_3.23.38_PM_1_rmj7bp.mov",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1766050597/Screen_Recording_2025-12-18_at_3.23.38_PM_1_b0becr.jpg",
            displayUrl: "wefunder.com",
        },
        {
            title: "LMS Platform",
            description: "Interactive learning management system.",
            tag: "EdTech",
            logo: "/logos/startup.svg",
            bgColor: "bg-[#FF90E8]",
            illustration: "/images/venture-workspace.svg",
            video: "https://res.cloudinary.com/dk2txf8o3/video/upload/v1767674245/Screen_Recording_2025-12-18_at_2.32.23_PM_1_onkxfj.mov",
            poster: "https://res.cloudinary.com/duh7c5x99/video/upload/so_0,f_jpg,q_auto/v1766047326/Screen_Recording_2025-12-18_at_2.32.23_PM_nmuegb.jpg",
            displayUrl: "pluralsight.com",
        },
    ]

    const getSpanClass = (index: number) => {
        switch (index) {
            case 0: return "md:col-span-2 aspect-square md:aspect-[16/10]"
            case 1: return "md:col-span-1 aspect-square md:aspect-auto"
            case 2: return "md:col-span-1 aspect-square md:aspect-auto"
            case 3: return "md:col-span-2 aspect-square md:aspect-[16/10]"
            case 4: return "md:col-span-3 aspect-square md:aspect-video"
            default: return "md:col-span-1 aspect-square"
        }
    }

    return (
        <section className="container mx-auto px-4 py-8 md:py-16">
            <div className="w-full max-w-[95%] mx-auto">
                {/* Header */}
                <div className="mb-12 md:mb-16 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
                    <div>
                        <motion.h2
                            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.9] mb-6"
                            style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Featured <br />
                            <span className="text-[#6E35FF]">Work</span>
                        </motion.h2>
                        <motion.p
                            className="text-xl text-[#393939] font-medium leading-relaxed max-w-lg"
                            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Highlights from our recent work in digital product design, branding, and engineering.
                        </motion.p>
                    </div>

                    <motion.a
                        href="#"
                        className="inline-flex items-center gap-2 font-bold hover:gap-4 transition-all text-xl group whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="border-b-2 border-black pb-0.5">View all case studies</span>
                        <ArrowRight className="w-6 h-6 transform group-hover:-rotate-45 transition-transform duration-300" />
                    </motion.a>
                </div>

                {/* Bento Grid with MacOS Windows */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <FeaturedProjectCard
                            key={index}
                            project={project}
                            index={index}
                            className={getSpanClass(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function FeaturedProjectCard({ project, index, className = "" }: { project: any, index: number, className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch((e) => console.log("Autoplay blocked:", e))
        }
    }, [])

    return (
        <motion.div
            // Mobile: Sticky with stacking top offset
            style={{
                top: `calc(6rem + ${index * 1}rem)`, // Staggered top for visible stacking
                zIndex: index + 1
            }}
            className={`
                group flex flex-col rounded-xl overflow-hidden ${className} bg-white shadow-2xl ring-1 ring-black/5 
                hover:ring-black/10 transition-all duration-300 hover:shadow-3xl hover:-translate-y-2
                sticky md:relative md:top-0 md:z-auto w-full
            `}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* MacOS Window Header */}
            <div className="bg-[#f3f4f6] px-4 py-3 border-b border-[#e5e7eb] flex items-center gap-4 shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
                </div>
                {/* Address Bar */}
                <div className="flex-1 max-w-[200px] md:max-w-xs mx-auto bg-white rounded flex items-center justify-center px-3 py-1 shadow-sm border border-[#e5e7eb]">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 font-medium" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                        <span className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-gray-400 opacity-50" />
                        {project.displayUrl}
                    </div>
                </div>
                <div className="w-[52px]" /> {/* Spacer to center the address bar */}
            </div>

            {/* Window Content */}
            <div className="relative flex-1 bg-white overflow-hidden">
                {project.video ? (
                    <video
                        ref={videoRef}
                        src={project.video}
                        poster={project.poster}
                        autoPlay
                        loop
                        muted
                        playsInline={true}
                        preload="metadata"
                        className="w-full h-full object-cover object-top"
                    />
                ) : (
                    <Image
                        src={project.illustration || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                )}

                {/* Hover Content Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-[0.16,1,0.3,1] text-center p-6 text-white" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider mb-3">
                            {project.tag}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                            {project.title}
                        </h3>
                        <p className="text-white/80 max-w-sm mx-auto text-sm md:text-base">
                            {project.description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
