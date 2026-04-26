"use client";

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from "framer-motion"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUpRight, Github, X, Clock, Target, Layers, ExternalLink } from "lucide-react"
import { HeroImageWrapper } from "./hero-image-wrapper";

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll();

    // Top-level hooks for background effects
    const plasmaX1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const plasmaY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const plasmaX2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const plasmaY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/by-slug/${slug}`);
                if (!res.ok) {
                    if (res.status === 404) setProject(null);
                    throw new Error("Project not found");
                }
                const data = await res.json();
                setProject(data);
            } catch (e) {
                console.error("Fetch failed:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (loading) return (
        <div className="h-screen bg-[#050505] flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-12 h-12 border-2 border-[#B86CF9]/20 border-t-[#B86CF9] rounded-full animate-spin" />
                <div className="text-[10px] font-medium text-[#B86CF9] font-mono tracking-[0.3em] uppercase">
                    Initializing [ {slug} ]
                </div>
            </motion.div>
        </div>
    );

    if (!project) notFound();

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-[#F0F0F0] selection:bg-[#B86CF9] selection:text-white overflow-x-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Owners';
                    src: url('/fonts/OwnersTRIAL-Medium-BF64361ef81f92b.otf') format('opentype');
                }
                
                .font-owners { font-family: var(--font-owners-medium), 'Owners', sans-serif; }
                .font-montreal { font-family: var(--font-neue-montreal), sans-serif; }
                .font-mono { font-family: var(--font-ibm-plex-mono), monospace; }
                
                /* Noise Texture */
                .noise {
                    position: fixed;
                    inset: -200%;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.04;
                    pointer-events: none;
                    z-index: 100;
                }

                /* Custom Scrollbar */
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #050505; }
                ::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #B86CF9; }

                /* Prose Refinement */
                .prose { 
                    max-width: 100%; 
                    color: #A1A1A1;
                    font-family: var(--font-neue-montreal), sans-serif;
                }
                .prose p { 
                    font-size: 1.125rem; 
                    line-height: 1.7; 
                    margin-bottom: 2rem;
                }
                .prose h1, .prose h2, .prose h3 { 
                    color: #FFFFFF;
                    font-family: var(--font-owners-medium), sans-serif;
                    text-transform: uppercase;
                    margin-top: 4rem;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                }
                .prose h2 { font-size: 2.5rem; }
                .prose h3 { font-size: 1.75rem; }
                
                .prose blockquote {
                    border-left: 2px solid #B86CF9;
                    padding-left: 2rem;
                    font-family: var(--font-owners-medium), sans-serif;
                    font-size: 2rem;
                    color: #FFFFFF;
                    font-style: italic;
                    margin: 4rem 0;
                    line-height: 1.2;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .glow-text {
                    text-shadow: 0 0 20px rgba(184, 108, 249, 0.3);
                }
            `}} />

            <div className="noise" />
            
            {/* Background Plasma Glows */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div 
                    style={{ 
                        x: plasmaX1,
                        y: plasmaY1
                    }}
                    className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-[#B86CF9]/10 blur-[120px] rounded-full"
                />
                <motion.div 
                    style={{ 
                        x: plasmaX2,
                        y: plasmaY2
                    }}
                    className="absolute -bottom-[10%] -left-[5%] w-[50vw] h-[50vw] bg-[#B86CF9]/5 blur-[100px] rounded-full"
                />
            </div>

            <Navigation />

            <main className="relative z-10">
                
                {/* HERO SECTION: TYPOGRAPHIC EXPLOSION */}
                <section className="min-h-screen flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-24">
                    <div className="max-w-[1800px] mx-auto w-full">
                        <div className="flex flex-col gap-8 md:gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="font-mono text-[10px] md:text-xs text-[#B86CF9] uppercase tracking-[0.5em] mb-4 block glow-text">
                                    Project Case Study No. {project.id || "01"}
                                </span>
                                <h1 className="font-owners text-[18vw] md:text-[14vw] leading-[0.8] tracking-[-0.05em] uppercase text-white break-all">
                                    {project.title.split('').map((char: string, i: number) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.02 + 0.3, duration: 0.8, ease: "easeOut" }}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </h1>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end mt-12">
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="md:col-span-5"
                                >
                                    <p className="font-montreal text-lg md:text-xl text-[#A1A1A1] leading-relaxed max-w-xl">
                                        {project.description}
                                    </p>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2, duration: 1 }}
                                    className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4"
                                >
                                    <MetadataBox label="Role" value={project.role || "Lead Designer"} icon={<Target className="w-3 h-3" />} />
                                    <MetadataBox label="Sector" value={project.category || "Selected Work"} icon={<Layers className="w-3 h-3" />} />
                                    <MetadataBox label="Duration" value={project.duration || "4 Months"} icon={<Clock className="w-3 h-3" />} />
                                    <div className="flex flex-col justify-end">
                                        {project.link && (
                                            <Link 
                                                href={project.link} 
                                                target="_blank" 
                                                className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white hover:text-[#B86CF9] transition-colors"
                                            >
                                                Launch Site <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HERO IMAGE */}
                <HeroImageWrapper project={project} />

                {/* CONTENT GRID */}
                <section className="px-6 md:px-12 pt-8 md:pt-16 pb-24 md:pb-48 max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
                        
                        {/* SIDEBAR METADATA */}
                        <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-40 h-fit">
                            <div className="space-y-8">
                                <div className="glass-card p-8 rounded-2xl">
                                    <h3 className="font-mono text-[10px] text-[#B86CF9] uppercase tracking-widest mb-6 block">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack?.map((t: string, i: number) => (
                                            <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/80 uppercase tracking-wider">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card p-8 rounded-2xl">
                                    <h3 className="font-mono text-[10px] text-[#B86CF9] uppercase tracking-widest mb-6 block">Project Deliverables</h3>
                                    <div className="space-y-4">
                                        {["UI/UX Research", "System Architecture", "Visual Identity", "Full-Stack Development"].map((d, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                                                <div className="w-1 h-1 rounded-full bg-[#B86CF9]" />
                                                <span className="font-montreal">{d}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {project.github && (
                                    <Link 
                                        href={project.github} 
                                        target="_blank"
                                        className="flex items-center justify-between p-6 rounded-2xl bg-[#B86CF9] text-black font-owners uppercase tracking-wider group hover:bg-white transition-colors duration-500"
                                    >
                                        <span>View Codebase</span>
                                        <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </aside>

                        {/* MAIN CONTENT ARTICLE */}
                        <article className="lg:col-span-8">
                            <div className="prose prose-invert prose-lg">
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]} 
                                    components={{
                                        p: ({ children }: any) => <p className="mb-8">{children}</p>,
                                        h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-owners mb-8">{children}</h1>,
                                        h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-owners mb-6">{children}</h2>,
                                        img: (props) => (
                                            <figure className="my-16 md:my-24 relative aspect-video rounded-3xl overflow-hidden glass-card group">
                                                {props.src && (
                                                    <Image
                                                        src={props.src}
                                                        alt={props.alt || "Project Visual"}
                                                        fill
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent pointer-events-none" />
                                            </figure>
                                        )
                                    }}
                                >
                                    {project.content || ""}
                                </ReactMarkdown>
                            </div>
                        </article>
                    </div>
                </section>

                {/* VISUAL INDEX / GALLERY */}
                {project.gallery && project.gallery.length > 0 && (
                    <section className="px-6 md:px-12 pb-48 max-w-[1800px] mx-auto">
                        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
                            <h2 className="font-owners text-[8vw] md:text-[5vw] uppercase text-white leading-none">Visual Index</h2>
                            <div className="font-mono text-[10px] text-[#B86CF9] uppercase tracking-widest">
                                [{project.gallery.length} Shots]
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {project.gallery.map((img: string, i: number) => (
                                <GalleryItem 
                                    key={i} 
                                    src={img} 
                                    index={i} 
                                    onClick={() => setSelectedImage(img)} 
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* LIGHTBOX */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="relative max-w-6xl w-full h-full flex items-center justify-center"
                            >
                                <button className="absolute top-0 right-0 p-4 text-white/40 hover:text-white transition-colors z-10">
                                    <X className="w-8 h-8" />
                                </button>
                                <img
                                    src={selectedImage}
                                    alt="Selected visualization"
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
            
            <Footer />
        </div>
    );
}

function MetadataBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="space-y-1">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                {icon} {label}
            </span>
            <div className="font-owners text-xl text-white uppercase tracking-tight">
                {value}
            </div>
        </div>
    );
}

function GalleryItem({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-card cursor-zoom-in"
            onClick={onClick}
        >
            <Image
                src={src}
                alt={`Gallery visual ${index + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-[#B86CF9]/0 group-hover:bg-[#B86CF9]/10 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="font-mono text-[9px] text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                    Shot {String(index + 1).padStart(2, '0')}
                </span>
            </div>
        </motion.div>
    );
}
