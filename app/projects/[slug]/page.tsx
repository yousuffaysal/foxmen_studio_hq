"use client";

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUpRight, Github, X } from "lucide-react"
import { HeroImageWrapper } from "./hero-image-wrapper";

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    const found = data.find((p: any) => p.slug === slug);
                    if (found) setProject(found);
                    else setProject(null);
                }
            } catch (e) {
                console.error("Fetch failed:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (loading) return (
        <div className="h-screen bg-[#F9F9F8] flex items-center justify-center">
            <div className="text-[10px] md:text-xs font-medium animate-pulse text-black/50 font-mono tracking-widest uppercase">
                Loading [ {slug} ]
            </div>
        </div>
    );

    if (!project) notFound();

    return (
        <div className="min-h-screen bg-[#fffff0] text-[#1a1a1a] selection:bg-[#EAEAEA] selection:text-[#000]">
            <style dangerouslySetInnerHTML={{
                __html: `
                /* Geometric Layout Background */
                .bg-geometric-layout {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 0;
                    pointer-events: none;
                }
                
                /* 1. Dotted Pattern */
                .bg-dots {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(#e5e5e5 1.5px, transparent 1.5px);
                    background-size: 24px 24px;
                    opacity: 0.6;
                }

                /* 2. Geometric Shapes */
                .bg-shape-1 {
                    position: absolute;
                    top: -10%;
                    right: -5%;
                    width: 60vw;
                    height: auto;
                    opacity: 0.15;
                    mix-blend-mode: multiply;
                }
                .bg-shape-2 {
                    position: absolute;
                    bottom: 0%;
                    left: -10%;
                    width: 50vw;
                    height: auto;
                    opacity: 0.08;
                    mix-blend-mode: multiply;
                }
                
                /* Keep Header Font */
                .font-header { font-family: var(--font-owners-medium), serif; }
                .font-title-bold { font-family: var(--font-ibm-plex-sans-bold), sans-serif; }
                .font-mono { font-family: var(--font-ibm-plex-mono), monospace; }
                
                /* Refined Editorial Prose */
                .prose { max-width: 100%; }
                .prose p { 
                    margin-bottom: 2rem; 
                    font-family: var(--font-ibm-plex-mono), monospace; 
                    font-size: 1.0rem; 
                    line-height: 1.8; 
                    color: #444; 
                    letter-spacing: -0.01em;
                }
                .prose h1, .prose h2, .prose h3, .prose h4 { 
                    font-family: var(--font-ibm-plex-sans-bold), sans-serif; 
                    color: #000; 
                    margin-top: 5rem; 
                    margin-bottom: 1.5rem; 
                    line-height: 1.1; 
                    letter-spacing: -0.02em;
                    text-transform: uppercase; 
                }
                .prose h1 { font-size: 3rem; border-bottom: 2px solid #000; padding-bottom: 1rem; }
                .prose h2 { font-size: 2.25rem; }
                .prose h3 { font-size: 1.5rem; color: #333; }
                
                /* List Styling */
                .prose ul, .prose ol { 
                    margin-bottom: 2.5rem; 
                    padding-left: 1.5rem; 
                    font-family: var(--font-ibm-plex-mono), monospace; 
                }
                .prose li { margin-bottom: 0.5rem; color: #444; marker: #000; }
                .prose strong { font-weight: 700; color: #000; }
                
                /* Table Styling */
                .prose table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 3rem 0;
                    font-family: var(--font-ibm-plex-mono), monospace;
                    font-size: 0.9rem;
                    border: 1px solid #e5e5e5;
                }
                .prose thead {
                    background-color: #f5f5f5;
                    border-bottom: 2px solid #000;
                }
                .prose th {
                    text-align: left;
                    padding: 1rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-size: 0.8rem;
                }
                .prose td {
                    padding: 1rem;
                    border-bottom: 1px solid #eee;
                    vertical-align: top;
                }
                .prose tr:last-child td { border-bottom: none; }
                
                /* Blockquote */
                .prose blockquote {
                    border-left: 4px solid #8B5DFF; /* Brand Accent */
                    padding-left: 2rem;
                    margin-left: 0;
                    margin-top: 3rem;
                    margin-bottom: 3rem;
                    font-family: var(--font-owners-medium), serif;
                    font-size: 1.5rem;
                    line-height: 1.4;
                    font-style: italic;
                    color: #000;
                    background: #fdfdfd;
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                }
                
                /* Image handling in Markdown */
                .prose img { 
                    width: 100%; 
                    height: auto; 
                    border-radius: 8px; 
                    margin-top: 3rem; 
                    margin-bottom: 3rem; 
                    display: block; 
                    border: 1px solid rgba(0,0,0,0.05);
                }
                @media (min-width: 1024px) {
                    .prose img { width: 115%; margin-left: -7.5%; }
                }
            `}} />
            {/* Geometric Background Layer (Dots + Shapes) */}
            <div className="bg-geometric-layout">
                <div className="bg-dots" />
                <img src="/images/Frame.svg" className="bg-shape-1" alt="" />
                <img src="/images/Group 1 (1).svg" className="bg-shape-2" alt="" />
            </div>

            {/* Minimal Nav Overlay */}
            {/* Minimal Nav Overlay - Removed per request */}
            {/* <div className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-[#fffff0] to-transparent h-24 pointer-events-none" /> */}
            <Navigation />

            <main className="relative z-10 pt-32 md:pt-48 pb-24">

                {/* 1. HEADER - Massive Typographic Layout */}
                <section className="px-4 md:px-12 max-w-[1700px] mx-auto mb-20 md:mb-32">

                    {/* Top: Giant Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-title-bold text-[14vw] leading-[0.8] text-[#111] uppercase tracking-[-0.07em] mb-16 md:mb-24 break-all"
                    >
                        {project.title}
                    </motion.h1>

                    {/* Bottom: Abstract Offset */}
                    <div className="flex flex-col md:flex-row md:justify-between items-start gap-12">
                        {/* New Metadata Header Block (Left Side) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="hidden md:grid grid-cols-2 gap-x-12 gap-y-8 w-full md:w-1/2"
                        >
                            <div>
                                <span className="font-mono text-xs text-black/60 uppercase tracking-widest block mb-2 font-medium">Our Role</span>
                                <div className="font-header text-2xl leading-none">{project.role || "Lead Designer"}</div>
                            </div>
                            <div>
                                <span className="font-mono text-xs text-black/60 uppercase tracking-widest block mb-2 font-medium">Duration</span>
                                <div className="font-header text-2xl leading-none">{project.duration || "Ongoing"}</div>
                            </div>
                            <div>
                                <span className="font-mono text-xs text-black/60 uppercase tracking-widest block mb-2 font-medium">Sector</span>
                                <div className="font-header text-2xl leading-none">{project.category || "Selected Work"}</div>
                            </div>
                            <div>
                                <span className="font-mono text-xs text-black/60 uppercase tracking-widest block mb-2 font-medium">Tech Stack</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack?.slice(0, 3).map((t: string, i: number) => (
                                        <span key={i} className="font-mono text-xs border border-black/20 px-2.5 py-1 rounded-full uppercase bg-white/50">{t}</span>
                                    ))}
                                    {project.techStack?.length > 3 && <span className="font-mono text-xs text-gray-500 self-center">+{project.techStack.length - 3}</span>}
                                </div>
                            </div>
                            {project.link && (
                                <div className="col-span-2 pt-2 border-t border-black/10">
                                    <Link href={project.link} target="_blank" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:text-[#8B5DFF] transition-colors group font-semibold">
                                        Live Project <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-2xl md:w-1/2"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-8 h-[1px] bg-gray-300"></span>
                                <h2 className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.25em]">
                                    Abstract
                                </h2>
                            </div>

                            <p className="font-header text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-[#222]">
                                {project.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. HERO IMAGE (Now Second) */}
                {/* Scroll-triggered Animation Wrapper */}
                <HeroImageWrapper project={project} />

                <div className="max-w-[1600px] mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* 3. SIDEBAR - "Blueprint" Metadata (Sticky) */}
                        <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden order-2 lg:order-1 scrollbar-hide p-1">

                            {/* Role - Renamed to "Our Role" */}
                            <div className="border-t border-black/20 pt-6">
                                <span className="font-mono text-xs text-[#8B5DFF] block mb-3 uppercase tracking-widest font-semibold">Our Role</span>
                                <div className="font-header text-xl md:text-2xl leading-relaxed text-black">
                                    {project.role || "Lead Designer"}
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="border-t border-black/20 pt-6">
                                <span className="font-mono text-xs text-[#8B5DFF] block mb-3 uppercase tracking-widest font-semibold">Duration</span>
                                <div className="font-header text-xl md:text-2xl leading-relaxed text-black">
                                    {project.duration || "Ongoing"}
                                </div>
                            </div>

                            {/* Sector */}
                            <div className="border-t border-black/20 pt-6">
                                <span className="font-mono text-xs text-[#8B5DFF] block mb-3 uppercase tracking-widest font-semibold">Sector</span>
                                <div className="font-header text-xl md:text-2xl leading-relaxed text-black">
                                    {project.category || "Selected Work"}
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="border-t border-black/20 pt-6">
                                <span className="font-mono text-xs text-[#8B5DFF] block mb-4 uppercase tracking-widest font-semibold">Tech Stack</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack?.map((t: string, i: number) => (
                                        <span key={i} className="font-mono text-[10px] md:text-xs border border-black px-4 py-2 rounded-full uppercase bg-white text-black hover:bg-black hover:text-white transition-all cursor-default tracking-wider font-medium">
                                            {t}
                                        </span>
                                    ))}
                                    {(!project.techStack || project.techStack.length === 0) && (
                                        <span className="font-mono text-sm text-gray-400 italic">Not specified</span>
                                    )}
                                </div>
                            </div>

                            {project.tags && project.tags.length > 0 && (
                                <div className="border-t border-black/20 pt-6">
                                    <span className="font-mono text-xs text-[#8B5DFF] block mb-4 uppercase tracking-widest font-semibold">Tags</span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((t: string, i: number) => (
                                            <span key={i} className="font-mono text-[10px] md:text-xs text-gray-500 bg-gray-100/50 border border-transparent px-3 py-1.5 rounded-md hover:border-gray-300 hover:text-black transition-all cursor-default">
                                                #{t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-black/20 pt-6 space-y-4">
                                {project.link && (
                                    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="font-mono text-sm flex items-center justify-between group border-b border-transparent hover:border-[#8B5DFF] hover:text-[#8B5DFF] pb-1 transition-all">
                                        <span className="uppercase tracking-wider font-medium">Live Project</span>
                                        <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                                {project.github && (
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm flex items-center justify-between group border-b border-transparent hover:border-[#8B5DFF] hover:text-[#8B5DFF] pb-1 transition-all text-gray-600">
                                        <span className="uppercase tracking-wider font-medium">View Source</span>
                                        <Github className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        </aside>

                        {/* 4. MAIN CONTENT - "Editorial Essay" */}
                        <article className="lg:col-span-9 order-1 lg:order-2">
                            {/* Markdown render (Abstract removed from here) */}
                            <div className="prose prose-lg prose-neutral max-w-3xl mx-auto lg:ml-24">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                                    p: ({ node, children }: any) => {
                                        // Check if any child is an image tag
                                        const hasImage = node?.children?.some((child: any) =>
                                            child.type === 'element' && child.tagName === 'img'
                                        );

                                        if (hasImage) {
                                            // Render as div (valid parent for figure) but keep spacing
                                            return <div className="mb-8">{children}</div>;
                                        }
                                        return <p>{children}</p>;
                                    },
                                    img: (props) => (
                                        <figure className="my-16 md:-ml-24 md:w-[130%]">
                                            <img {...props} className="w-full h-auto shadow-2xl shadow-black/5" />
                                            {props.alt && <figcaption className="font-mono text-xs text-gray-400 mt-4 text-center uppercase tracking-widest">{props.alt}</figcaption>}
                                        </figure>
                                    )
                                }}>
                                    {project.content || ""}
                                </ReactMarkdown>
                            </div>
                        </article>
                    </div>

                    {/* 4. GALLERY - "Contact Sheet" Grid */}
                    {project.gallery && project.gallery.length > 0 && (
                        <section className="mt-32 md:mt-48 border-t border-black pt-12">
                            <div className="flex items-baseline justify-between mb-12">
                                <h3 className="font-header text-4xl md:text-6xl uppercase">Visual Index</h3>
                                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">({project.gallery.length} Images)</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
                                {project.gallery.map((img: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        className="relative aspect-video group cursor-zoom-in overflow-hidden bg-gray-100"
                                        whileHover={{ scale: 0.98 }}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <Image src={img} alt={`Gallery ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* LIGHTBOX */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                                <X className="w-8 h-8" />
                            </button>
                            <motion.img
                                layoutId={selectedImage}
                                src={selectedImage}
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
            <Footer />
        </div>
    );
}
