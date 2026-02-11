"use client"
import { useState, useEffect } from "react"

import { ArrowRight, Search, ChevronRight, ChevronLeft, Mail, Clock, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function stripMarkdown(text: string) {
    if (!text) return "";
    return text
        // Remove headers
        .replace(/^#+\s+/gm, '')
        // Remove bold/italic
        .replace(/(\*\*|__|\*|_)/g, '')
        // Remove images
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
        // Remove links (keep text)
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        // Remove blockquotes
        .replace(/^>\s+/gm, '')
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove inline code
        .replace(/`([^`]+)`/g, '$1')
        // Remove HTML tags
        .replace(/<[^>]*>?/gm, '')
        // Remove extra newlines
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

export function BlogHero() {
    return (
        <section className="pt-10 pb-16 md:pt-14 md:pb-24 px-4 md:px-8 bg-[#fffff3] relative overflow-hidden">
            {/* Decorative Grid Lines - Creating distinct structure */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-[#414042]/10" />
            <div className="absolute inset-y-0 left-8 md:left-12 w-[1px] bg-[#414042]/10" />

            <div className="max-w-[1800px] mx-auto relative z-10 pl-4 md:pl-12">
                <div className="grid lg:grid-cols-[0.8fr_1fr] gap-12 lg:gap-24 items-end">
                    <div>
                        <div className="inline-flex items-center gap-3 mb-6 mix-blend-multiply">
                            <span className="w-2 h-2 bg-[#8B5DFF] rounded-full animate-pulse" />
                            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#414042]/60">
                                Foxmen Studio / Log / 01
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] font-bold text-[#414042] mb-8 tracking-tight" style={{ fontFamily: "var(--font-owners-medium)" }}>
                            DESIGN<br />
                            <span className="italic font-light ml-8 text-[#6E35FF]" style={{ fontFamily: "var(--font-owners-medium)" }}>&</span> CODEX
                        </h1>
                    </div>

                    <div className="lg:mb-4 border-l border-[#414042]/20 pl-8 lg:pl-12 max-w-xl">
                        <p className="text-sm md:text-base leading-relaxed text-[#414042]/80 font-normal">
                            [ SYSTEM_LOG ]: Traversing the void between aesthetic theory and raw technical implementation. We document the process of building scalable digital ecosystems.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function SearchFilter() {
    const filters = ["All", "UI/UX Design", "Product Saas", "Design System", "Mobile & Product Design", "Branding Design"]
    return (
        <section className="py-8 md:py-12 px-4 md:px-8 bg-white sticky top-0 z-20 shadow-sm">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-6 justify-center">
                <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide justify-start md:justify-center">
                    {filters.map((filter, i) => (
                        <button key={i} className={`px-6 py-3 rounded-full font-medium text-sm md:text-base whitespace-nowrap border border-gray-200 transition-all ${i === 0 ? 'bg-[#003C43] text-white border-[#003C43]' : 'bg-white hover:border-black text-gray-700'}`} style={{ fontFamily: "var(--font-neue-montreal)" }}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function FeaturedArticle() {
    return (
        <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
            <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="bg-gray-200 aspect-[1073/663] lg:aspect-auto lg:h-[450px] rounded-[32px] md:rounded-[48px] border-4 border-black relative overflow-hidden group cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-[#FFC224] px-4 py-2 md:px-6 md:py-3 rounded-full border-2 border-black font-bold uppercase text-xs md:text-base">AI Systems</div>
                </div>
                <div>
                    <div className="text-gray-500 font-bold mb-4 md:mb-6 uppercase tracking-wider text-sm md:text-lg" style={{ fontFamily: "var(--font-neue-montreal)" }}>Featured Story</div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight hover:underline decoration-4 decoration-[#FF4A60] cursor-pointer" style={{ fontFamily: "var(--font-owners-regular)" }}>The Future of Generative AI in Web Design</h2>
                    <p className="text-base md:text-lg text-[#333333] mb-8 md:mb-12 leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                        How AI algorithms are reshaping the way we conceptualize, build, and deploy digital experiences in 2025.
                    </p>
                    <Link href="/blog/post-1" className="inline-flex items-center text-lg md:text-2xl font-bold text-black border-b-4 border-[#FF4A60] pb-2 hover:text-[#FF4A60] transition-colors" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                        Read More <ArrowRight className="ml-3 w-6 h-6 md:w-8 md:h-8" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export function ArticleGrid() {
    const [articles, setArticles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched articles:", data)
                setArticles(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <div className="min-h-[50vh] flex items-center justify-center bg-[#fffff3]">
            <div className="flex flex-col items-center gap-4 text-[#414042]">
                <div className="w-4 h-4 border-2 border-[#414042] border-t-transparent rounded-full animate-spin" />
                <span className="uppercase text-xs tracking-widest">[ LOADING_DATA ]</span>
            </div>
        </div>
    )

    return (
        <section className="pb-24 px-4 md:px-8 bg-[#fffff3]">
            <div className="max-w-[1800px] mx-auto pl-4 md:pl-12">
                <div className="grid gap-y-24">
                    {articles.map((art, i) => {
                        const isFeatured = i === 0;

                        if (isFeatured) {
                            return (
                                <Link href={`/blog/${art.slug}`} key={art.id} className="group block relative">
                                    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-16 items-start">
                                        {/* Featured Image - Raw & Bold */}
                                        <div className="relative aspect-[1073/663] overflow-hidden bg-[#e5e5e5] border border-[#414042]/10">
                                            {art.coverImage && (
                                                <Image
                                                    src={art.coverImage}
                                                    alt={art.title}
                                                    fill
                                                    unoptimized
                                                    className="object-cover transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105 group-hover:contrast-110 grayscale-[20%] group-hover:grayscale-0"
                                                />
                                            )}
                                            <div className="absolute top-4 left-4 bg-[#fffff3] px-3 py-1 text-xs font-bold uppercase tracking-wider border border-[#414042]">
                                                Feature_01
                                            </div>
                                        </div>

                                        {/* Featured Content - Editorial Style */}
                                        <div className="flex flex-col h-full pt-4">
                                            <div className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#414042]/60 border-b border-[#414042]/10 pb-4 w-full">
                                                <span>{new Date(art.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                                <span className="w-px h-3 bg-[#414042]/20" />
                                                <span>Editorial</span>
                                            </div>

                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] text-[#414042] mb-6 group-hover:text-[#6E35FF] transition-colors duration-300" style={{ fontFamily: "var(--font-owners-medium)" }}>
                                                {art.title}
                                            </h2>

                                            <p className="text-sm md:text-base leading-relaxed text-[#414042]/80 max-w-md mb-8">
                                                {art.content ? stripMarkdown(art.content).substring(0, 180) + "..." : "System detailed analysis..."}
                                            </p>

                                            <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider group/btn">
                                                <span className="group-hover/btn:underline decoration-2 underline-offset-4">Read Transmission</span>
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }

                        // Standard List Items - Minimalist / Technical
                        return (
                            <Link href={`/blog/${art.slug}`} key={art.id} className="group grid md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] gap-8 md:gap-16 border-t border-[#414042]/10 pt-12 items-start">
                                <div className="aspect-[1073/663] bg-[#f0f0f0] relative overflow-hidden border border-[#414042]/10">
                                    {art.coverImage && (
                                        <Image
                                            src={art.coverImage}
                                            alt={art.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-wider text-[#414042]/50">
                                            <span>0{i + 1}</span>
                                            <span>/</span>
                                            <span>{new Date(art.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-bold leading-[1] text-[#414042] mb-4 group-hover:text-[#6E35FF] transition-colors" style={{ fontFamily: "var(--font-owners-medium)" }}>
                                            {art.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-[#414042]/70 max-w-lg line-clamp-2">
                                            {art.content ? stripMarkdown(art.content).substring(0, 150) + "..." : ""}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                        <span className="w-2 h-2 bg-[#6E35FF] rounded-full" />
                                        <span>Access File</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export function Pagination() {
    return (
        <section className="py-12 md:py-20 px-4 md:px-8 bg-[#fffff3] border-t border-[#414042]/10">
            <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                <button className="text-sm font-bold uppercase tracking-widest text-[#414042]/40 hover:text-[#414042] transition-colors flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> PREV_PAGE
                </button>
                <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#414042] text-[#fffff3] border border-[#414042]">01</span>
                    <span className="w-8 h-8 flex items-center justify-center text-[#414042] hover:bg-[#414042]/5 cursor-pointer border border-transparent hover:border-[#414042]/20">02</span>
                    <span className="text-[#414042]/40">...</span>
                    <span className="w-8 h-8 flex items-center justify-center text-[#414042] hover:bg-[#414042]/5 cursor-pointer border border-transparent hover:border-[#414042]/20">09</span>
                </div>
                <button className="text-sm font-bold uppercase tracking-widest text-[#414042] hover:text-[#6E35FF] transition-colors flex items-center gap-2">
                    NEXT_PAGE <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    )
}



export function EmailSubscribe() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubscribe = async () => {
        if (!email) return;
        setLoading(true);
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            setMessage(data.message || data.error);
            if (res.ok) setEmail("");
        } catch (error) {
            setMessage("Connection failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 px-4 md:px-8 bg-[#414042] text-[#fffff3] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

            <div className="max-w-4xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="w-12 h-12 bg-[#fffff3]/10 backdrop-blur-sm border border-[#fffff3]/20 flex items-center justify-center rounded-none mb-8">
                        <Mail className="w-6 h-6 text-[#fffff3]" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium mb-6 leading-[0.9]" style={{ fontFamily: "var(--font-owners-regular)" }}>
                        JOIN THE <br /> <span className="text-[#6E35FF]">NETWORK</span>
                    </h2>
                    <p className="text-sm text-[#fffff3]/60 max-w-sm mb-8">
                        Receive encrypted transmissions about design theory, code architecture, and digital alchemy.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <div className="absolute top-0 right-0 p-1">
                            <span className={`w-2 h-2 rounded-full block box-content border-2 border-[#414042] ${loading ? 'bg-yellow-400 animate-spin' : 'bg-[#6E35FF] animate-pulse'}`} />
                        </div>
                        <Input
                            placeholder="EMAIL_ADDRESS"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="bg-transparent border-b-2 border-[#fffff3]/20 rounded-none px-0 py-4 h-14 text-xl placeholder:text-[#fffff3]/20 focus-visible:ring-0 focus-visible:border-[#fffff3] transition-colors"
                        />
                    </div>
                    <button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className="w-full bg-[#fffff3] text-[#414042] h-14 font-bold uppercase tracking-widest hover:bg-[#6E35FF] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "INITIALIZING..." : "INITIALISE"}
                    </button>
                    {message && (
                        <p className="text-xs font-mono text-[#6E35FF] mt-2 uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
                            [ SERVER_RESPONSE ]: {message}
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}

export function RecommendedReads() {
    return (
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
            <div className="max-w-[1600px] mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12" style={{ fontFamily: "var(--font-owners-regular)" }}>You May Also Like</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden relative shadow-sm border border-gray-100"></div>
                            <h4 className="font-bold text-lg md:text-xl leading-tight group-hover:text-[#6E35FF] transition-colors" style={{ fontFamily: "var(--font-owners-regular)" }}>Understanding Headless CMS Architecture</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}



export function BlogCTA() {
    return (
        <section className="py-24 md:py-32 px-4 md:px-8 bg-[#fffff3] text-center border-t border-[#414042]/10">
            <div className="max-w-4xl mx-auto">
                <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#414042]/40 mb-8 animate-pulse">
                    /// System Ready
                </span>
                <h2 className="text-5xl md:text-8xl font-bold mb-12 text-[#414042] leading-[0.8]" style={{ fontFamily: "var(--font-owners-medium)" }}>
                    LET'S BUILD <br /> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E35FF] to-[#FF4A60]">FUTURE</span>
                </h2>
                <Link href="/contact" className="inline-block relative group">
                    <div className="absolute inset-0 bg-[#414042] transform translate-y-1 translate-x-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    <div className="relative border-2 border-[#414042] bg-[#fffff3] px-12 py-6 text-xl font-bold uppercase tracking-widest text-[#414042] group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform">
                        Start Project
                    </div>
                </Link>
            </div>
        </section>
    )
}
