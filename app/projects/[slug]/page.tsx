"use client";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUpRight, X, ArrowLeft, Clock, User, Layers, Globe, CheckCircle } from "lucide-react";

/* ─── helpers ─────────────────────────────────────────────── */

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
            {children}
        </motion.div>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return <p className="font-mono text-[10px] text-[#B86CF9] uppercase tracking-[0.35em]">{children}</p>;
}

/* ─── main page ───────────────────────────────────────────── */

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState<string | null>(null);
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.25], ["0%", "25%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

    useEffect(() => {
        fetch(`/api/projects/by-slug/${slug}`)
            .then(r => r.ok ? r.json() : Promise.reject(r.status))
            .then(setProject)
            .catch(() => setProject(null))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <div className="h-screen bg-[#050505] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-[#B86CF9]/20 border-t-[#B86CF9] rounded-full animate-spin" />
                <p className="text-[10px] font-mono text-[#B86CF9] uppercase tracking-[0.4em]">Loading</p>
            </div>
        </div>
    );

    if (!project) notFound();

    const hasChallenge = project.challenge || project.solution || project.outcome;
    const hasTech = project.techStack?.length > 0;
    const hasFeatures = project.features?.length > 0;
    const hasGallery = project.gallery?.filter(Boolean).length > 0;
    const hasResults = Array.isArray(project.results) && project.results.length > 0;
    const hasTestimonial = project.testimonial?.text;
    const hasProcess = Array.isArray(project.process) && project.process.length > 0;

    return (
        <div className="min-h-screen bg-[#050505] text-[#F0F0F0] selection:bg-[#B86CF9]/30">
            <style dangerouslySetInnerHTML={{ __html: `
                .case-prose { color: #888; font-size: 1.0625rem; line-height: 1.8; }
                .case-prose p { margin-bottom: 1.75rem; }
                .case-prose h1, .case-prose h2, .case-prose h3 { color: #fff; letter-spacing: -0.02em; margin-top: 3.5rem; margin-bottom: 1.25rem; line-height: 1.15; }
                .case-prose h1 { font-size: 2.5rem; font-weight: 700; }
                .case-prose h2 { font-size: 1.875rem; font-weight: 700; }
                .case-prose h3 { font-size: 1.375rem; font-weight: 600; }
                .case-prose blockquote { border-left: 2px solid #B86CF9; padding: 0.5rem 0 0.5rem 1.75rem; margin: 3rem 0; color: #ccc; font-size: 1.25rem; font-style: italic; }
                .case-prose ul { list-style: none; padding: 0; margin-bottom: 1.75rem; }
                .case-prose ul li { padding-left: 1.25rem; position: relative; margin-bottom: 0.5rem; }
                .case-prose ul li::before { content: ""; position: absolute; left: 0; top: 0.65rem; width: 5px; height: 5px; border-radius: 50%; background: #B86CF9; }
                .case-prose strong { color: #fff; font-weight: 600; }
                .case-prose a { color: #B86CF9; text-decoration: underline; text-underline-offset: 3px; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: #050505; }
                ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #B86CF9; }
            `}} />

            <Navigation />

            {/* ── HERO ── */}
            <section className="relative h-[92vh] overflow-hidden">
                {project.image ? (
                    <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
                        <Image src={project.image} alt={project.title} fill className="object-cover object-center" priority sizes="100vw" />
                    </motion.div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B86CF9]/20 via-[#050505]/60 to-[#050505]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />

                <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-14 md:pb-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="font-mono text-[10px] text-[#B86CF9] uppercase tracking-[0.5em] mb-5"
                        >
                            Case Study
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] text-white leading-[0.9] mb-8 max-w-4xl"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap items-center gap-x-8 gap-y-3"
                        >
                            {[
                                { Icon: Layers, label: project.category },
                                { Icon: User, label: project.role },
                                { Icon: Clock, label: project.duration },
                                { Icon: Globe, label: project.client },
                            ].filter(m => m.label).map(({ Icon, label }, i) => (
                                <span key={i} className="flex items-center gap-2 text-sm text-white/60">
                                    <Icon size={13} className="text-[#B86CF9]" /> {label}
                                </span>
                            ))}
                            {project.link && (
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#B86CF9] transition-colors ml-auto"
                                >
                                    Visit site <ArrowUpRight size={15} />
                                </Link>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <main className="max-w-7xl mx-auto px-6 md:px-16">

                {/* ── OVERVIEW ── */}
                <section className="py-16 md:py-24 border-b border-white/[0.06]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
                        <Fade className="lg:col-span-7">
                            <Label>Overview</Label>
                            <p className="text-xl md:text-2xl text-white/75 leading-relaxed font-light mt-5 max-w-2xl">
                                {project.description}
                            </p>
                        </Fade>
                        <Fade delay={0.1} className="lg:col-span-5">
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Client", value: project.client },
                                    { label: "Role", value: project.role },
                                    { label: "Duration", value: project.duration },
                                    { label: "Sector", value: project.category },
                                ].filter(m => m.value).map(({ label, value }) => (
                                    <div key={label} className="border border-white/[0.07] rounded-xl p-5 bg-white/[0.02] hover:border-white/[0.12] transition-colors">
                                        <p className="font-mono text-[9px] text-[#B86CF9] uppercase tracking-widest mb-2">{label}</p>
                                        <p className="text-white text-sm font-medium leading-snug">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </Fade>
                    </div>
                </section>

                {/* ── CHALLENGE / SOLUTION / OUTCOME ── */}
                {hasChallenge && (
                    <section className="py-16 md:py-24 border-b border-white/[0.06]">
                        <Fade><Label>The Brief</Label></Fade>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                            {[
                                { num: "01", heading: "Challenge", body: project.challenge },
                                { num: "02", heading: "Solution", body: project.solution },
                                { num: "03", heading: "Outcome", body: project.outcome },
                            ].filter(s => s.body).map((s, i) => (
                                <Fade key={s.num} delay={i * 0.08}>
                                    <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 h-full overflow-hidden group hover:border-[#B86CF9]/25 transition-colors duration-500">
                                        <span className="font-mono text-[10px] text-[#B86CF9]/40 tracking-widest mb-5 block">{s.num}</span>
                                        <h3 className="text-base font-semibold text-white mb-4">{s.heading}</h3>
                                        <p className="text-[#888] text-sm leading-relaxed">{s.body}</p>
                                    </div>
                                </Fade>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── PROCESS STEPS ── */}
                {hasProcess && (
                    <section className="py-16 md:py-24 border-b border-white/[0.06]">
                        <Fade><Label>Our Process</Label></Fade>
                        <div className="mt-10">
                            {(project.process as any[]).map((step: any, i: number) => (
                                <Fade key={i} delay={i * 0.06}>
                                    <div className="flex gap-6 md:gap-10 py-7 border-b border-white/[0.05] group last:border-b-0">
                                        <span className="font-mono text-[10px] text-[#B86CF9]/40 w-7 flex-shrink-0 pt-0.5">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm mb-2 group-hover:text-[#B86CF9] transition-colors duration-300">{step.title}</h4>
                                            <p className="text-[#888] text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </Fade>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── TECH + FEATURES ── */}
                {(hasTech || hasFeatures) && (
                    <section className="py-16 md:py-24 border-b border-white/[0.06]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                            {hasTech && (
                                <Fade>
                                    <Label>Tech Stack</Label>
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {project.techStack.map((t: string, i: number) => (
                                            <span key={i} className="text-xs font-mono text-white/60 border border-white/[0.08] rounded-full px-4 py-1.5 hover:border-[#B86CF9]/40 hover:text-white transition-all duration-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </Fade>
                            )}
                            {hasFeatures && (
                                <Fade delay={0.1}>
                                    <Label>Key Features</Label>
                                    <ul className="mt-6 space-y-3">
                                        {project.features.map((f: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-[#888]">
                                                <CheckCircle size={14} className="text-[#B86CF9] mt-0.5 flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </Fade>
                            )}
                        </div>
                    </section>
                )}

                {/* ── MAIN CONTENT (MARKDOWN) ── */}
                {project.content && (
                    <section className="py-16 md:py-24 border-b border-white/[0.06]">
                        <Fade><Label>Full Case Study</Label></Fade>
                        <div className="mt-10 max-w-3xl">
                            <div className="case-prose">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p: ({ children }: any) => {
                                            const hasImg = Array.isArray(children)
                                                ? children.some((c: any) => c?.type === "img" || c?.props?.src)
                                                : (children as any)?.type === "img" || (children as any)?.props?.src;
                                            return hasImg ? <div>{children}</div> : <p>{children}</p>;
                                        },
                                        img: (props: any) => (
                                            <figure className="my-12 relative aspect-video rounded-2xl overflow-hidden cursor-zoom-in" onClick={() => props.src && setLightbox(props.src)}>
                                                {props.src && (
                                                    <Image
                                                        src={props.src}
                                                        alt={props.alt || ""}
                                                        fill
                                                        className="object-cover hover:scale-[1.02] transition-transform duration-700"
                                                        sizes="(max-width: 1024px) 100vw, 56rem"
                                                    />
                                                )}
                                            </figure>
                                        ),
                                    }}
                                >
                                    {project.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── GALLERY ── */}
                {hasGallery && (
                    <section className="py-16 md:py-24 border-b border-white/[0.06]">
                        <div className="flex items-center justify-between mb-10">
                            <Fade><Label>Gallery</Label></Fade>
                            <span className="font-mono text-[10px] text-[#B86CF9]/50 uppercase tracking-widest">
                                {project.gallery.filter(Boolean).length} images
                            </span>
                        </div>
                        <GalleryGrid images={project.gallery.filter(Boolean)} onOpen={setLightbox} />
                    </section>
                )}

                {/* ── RESULTS ── */}
                {hasResults && (
                    <section className="py-16 md:py-24 border-b border-white/[0.06]">
                        <Fade><Label>Impact & Results</Label></Fade>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-10 border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.04]">
                            {(project.results as any[]).map((r: any, i: number) => (
                                <Fade key={i} delay={i * 0.07}>
                                    <div className="bg-[#050505] px-8 py-10">
                                        <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">{r.value}</p>
                                        <p className="font-mono text-[10px] text-[#B86CF9] uppercase tracking-widest mt-3">{r.label}</p>
                                    </div>
                                </Fade>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── TESTIMONIAL ── */}
                {hasTestimonial && (
                    <section className="py-16 md:py-24 border-b border-white/[0.06]">
                        <Fade>
                            <div className="max-w-2xl mx-auto text-center px-4">
                                <div className="text-6xl text-[#B86CF9]/20 font-serif leading-none mb-6 select-none">"</div>
                                <blockquote className="text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-8">
                                    {project.testimonial.text}
                                </blockquote>
                                <div className="flex flex-col items-center gap-1 pt-4 border-t border-white/[0.06]">
                                    <span className="text-white font-semibold text-sm">{project.testimonial.author}</span>
                                    <span className="text-xs text-[#888]">{project.testimonial.role}</span>
                                </div>
                            </div>
                        </Fade>
                    </section>
                )}

                {/* ── CTA ── */}
                <section className="py-16 md:py-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors group">
                        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                        All Projects
                    </Link>
                    {project.link && (
                        <Link
                            href={project.link}
                            target="_blank"
                            className="group inline-flex items-center gap-3 bg-[#B86CF9] hover:bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300"
                        >
                            View Live Site
                            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    )}
                </section>

            </main>

            <Footer />

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative max-w-6xl w-full flex items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 p-2 text-white/40 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                            <img src={lightbox} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Gallery Grid ───────────────────────────────────────── */

function GalleryGrid({ images, onOpen }: { images: string[]; onOpen: (s: string) => void }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {images.map((src, i) => {
                const wide = i === 0 || i % 5 === 3;
                return <GalleryImage key={i} src={src} index={i} wide={wide} onOpen={onOpen} />;
            })}
        </div>
    );
}

function GalleryImage({ src, index, wide, onOpen }: { src: string; index: number; wide: boolean; onOpen: (s: string) => void }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: index * 0.04 }}
            className={`group relative rounded-2xl overflow-hidden cursor-zoom-in bg-white/[0.03] ${wide ? "md:col-span-8" : "md:col-span-4"}`}
            style={{ aspectRatio: wide ? "16/9" : "4/3" }}
            onClick={() => onOpen(src)}
        >
            <Image
                src={src}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[9px] text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full tracking-widest uppercase">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>
        </motion.div>
    );
}
