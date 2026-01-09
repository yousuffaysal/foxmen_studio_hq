"use client"
import { useState, useEffect } from "react"

import { ArrowRight, Search, ChevronRight, ChevronLeft, Mail, Clock, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BlogHero() {
    return (
        <section className="py-16 md:py-24 bg-[#f8f8f8] px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#6E35FF]"></div>
                    <span className="text-gray-500 font-medium text-lg md:text-xl" style={{ fontFamily: "var(--font-neue-montreal)" }}>&#123;01&#125; — Our Blogs</span>
                </div>

                <p className="text-lg md:text-2xl lg:text-3xl text-[#333333] font-medium leading-relaxed max-w-3xl" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                    We share our thoughts on technology, AI, development, and digital experiences, helping you stay ahead in the digital world.
                </p>
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
                <div className="bg-gray-200 aspect-video lg:aspect-auto lg:h-[450px] rounded-[32px] md:rounded-[48px] border-4 border-black relative overflow-hidden group cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
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
                setArticles(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    if (loading) return <div className="py-20 text-center" style={{ fontFamily: "var(--font-neue-montreal)" }}>Loading Articles...</div>

    return (
        <section className="pb-12 md:pb-20 px-4 md:px-8 bg-[#f8f8f8]">
            <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((art, i) => {
                    const isFeatured = i === 0;

                    if (isFeatured) {
                        return (
                            <Link href={`/blog/${art.slug}`} key={art._id} className="block group md:col-span-2 row-span-1 h-full">
                                <div className="bg-[#6E35FF] text-white rounded-2xl w-full relative overflow-hidden transition-all duration-300 hover:shadow-xl aspect-video">
                                    {/* Background Image */}
                                    {art.coverImage && <Image src={art.coverImage} alt={art.title} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* Top Row: Date & Arrow */}
                                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                                        <span className="text-white/90 text-sm font-medium uppercase tracking-wide bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                                            {new Date(art.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Bottom Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col justify-end z-10">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] mb-3 max-w-2xl drop-shadow-lg" style={{ fontFamily: "var(--font-owners-regular)" }}>
                                            {art.title}
                                        </h3>
                                        <p className="text-white/90 text-sm md:text-base line-clamp-2 max-w-xl font-medium drop-shadow-md" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                                            {art.content ? art.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + "..." : "Explore the latest insights."}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    }

                    return (
                        <Link href={`/blog/${art.slug}`} key={art._id} className="block group">
                            <div className="bg-white rounded-2xl p-5 h-full border border-transparent hover:border-black/5 hover:shadow-lg transition-all duration-300 flex flex-col">

                                {/* Top Row: Image & Plus Icon */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-sm bg-gray-100">
                                        {art.coverImage && <Image src={art.coverImage} alt={art.title} fill className="object-cover" />}
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#6E35FF] transition-colors ml-4 shrink-0">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="mb-2 text-gray-400 text-xs font-medium" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                                    {new Date(art.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg md:text-xl font-bold mb-2 leading-[1.2] text-black group-hover:text-[#6E35FF] transition-colors" style={{ fontFamily: "var(--font-owners-regular)" }}>
                                    {art.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[#666666] text-xs md:text-sm leading-relaxed line-clamp-3 mt-auto" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                                    {art.content ? art.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + "..." : "Explore the latest insights and trends."}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export function Pagination() {
    return (
        <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                <button className="flex items-center font-bold text-lg md:text-xl text-gray-400 hover:text-black transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Previous
                </button>
                <div className="flex gap-2 md:gap-3">
                    <button className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#6E35FF] text-white text-base md:text-lg font-bold flex items-center justify-center shadow-lg shadow-[#6E35FF]/30" style={{ fontFamily: "var(--font-neue-montreal)" }}>1</button>
                    <button className="w-10 h-10 md:w-14 md:h-14 rounded-full hover:bg-gray-50 text-base md:text-lg font-bold flex items-center justify-center text-gray-500 transition-colors" style={{ fontFamily: "var(--font-neue-montreal)" }}>2</button>
                    <button className="w-10 h-10 md:w-14 md:h-14 rounded-full hover:bg-gray-50 text-base md:text-lg font-bold flex items-center justify-center text-gray-500 transition-colors" style={{ fontFamily: "var(--font-neue-montreal)" }}>3</button>
                </div>
                <button className="flex items-center font-bold text-lg md:text-xl text-black hover:opacity-70 transition-colors" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                    Next <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                </button>
            </div>
        </section>
    )
}



export function EmailSubscribe() {
    return (
        <section className="py-24 md:py-32 px-4 md:px-8 bg-[#F8F8F8]">
            <div className="max-w-3xl mx-auto text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#6E35FF]/10 rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10 text-[#6E35FF]">
                    <Mail className="w-8 h-8 md:w-12 md:h-12" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-black" style={{ fontFamily: "var(--font-owners-regular)" }}>Get the Latest Insights</h2>
                <p className="text-gray-500 text-lg md:text-xl font-medium mb-8 md:mb-12" style={{ fontFamily: "var(--font-neue-montreal)" }}>Updates, stories, and trends from FOXMEN Studio.</p>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <Input placeholder="Enter your email" className="h-16 md:h-20 rounded-full bg-white border-gray-200 text-black text-lg md:text-xl px-8 md:px-10 focus:border-[#6E35FF] focus-visible:ring-[#6E35FF]" style={{ fontFamily: "var(--font-neue-montreal)" }} />
                    <Button className="h-16 md:h-20 rounded-full px-8 md:px-12 bg-[#6E35FF] text-white text-lg md:text-xl font-bold hover:bg-[#6E35FF]/90 shadow-lg shadow-[#6E35FF]/20" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                        Subscribe
                    </Button>
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

export function AuthorSpotlight() {
    return (
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#F3F4F6]">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16" style={{ fontFamily: "var(--font-owners-regular)" }}>Meet the Writers</h2>
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {['Alex Fox', 'Sarah Chen', 'Mike Ross'].map((name, i) => (
                        <div key={i} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full mx-auto mb-4 md:mb-6 overflow-hidden relative"></div>
                            <h3 className="font-bold text-xl md:text-2xl mb-1" style={{ fontFamily: "var(--font-owners-regular)" }}>{name}</h3>
                            <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-wide opacity-60" style={{ fontFamily: "var(--font-neue-montreal)" }}>Tech Lead</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function BlogCTA() {
    return (
        <section className="py-24 md:py-40 px-4 md:px-8 bg-white text-center border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-10 leading-none" style={{ fontFamily: "var(--font-owners-regular)" }}>Ready to Build Your Website or App?</h2>
                <p className="text-xl md:text-2xl text-gray-500 font-medium mb-12 md:mb-16" style={{ fontFamily: "var(--font-neue-montreal)" }}>Let's create something meaningful together.</p>
                <Link href="/contact" className="inline-flex items-center justify-center bg-[#6E35FF] text-white rounded-full px-10 py-6 md:px-12 md:py-6 text-xl md:text-2xl font-bold hover:shadow-[0px_10px_25px_-5px_rgba(110,53,255,0.4)] transition-all hover:-translate-y-1" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                    Start Your Project <ArrowRight className="ml-3 w-6 h-6 md:w-7 md:h-7" />
                </Link>
            </div>
        </section>
    )
}
