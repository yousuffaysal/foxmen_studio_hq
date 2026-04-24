"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ArticlesSection() {
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

  if (loading) {
    return null // or a minimal skeleton
  }

  // Display top 3 articles
  const displayArticles = articles.slice(0, 3)

  return (
    <section className="bg-[#fffff3] py-16 md:py-32 relative overflow-hidden">
      {/* Atmosphere: Technical Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#414042 1px, transparent 1px), linear-gradient(90deg, #414042 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Atmosphere: Radial Gradient for Depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#8B5DFF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-12 md:mb-24">
          <div className="max-w-2xl">
            <span
              className="block font-mono text-xs text-[#8B5DFF] mb-6 tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
                    /// Insights & Intelligence
            </span>
            <h2
              className="text-6xl md:text-8xl font-bold text-[#414042] tracking-tighter leading-[0.85]"
              style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
            >
              LATEST<br />THINKING
            </h2>
          </div>

          <Link href="/blog" className="group hidden md:flex items-center gap-2 border-b border-[#414042] pb-1">
            <span className="text-sm font-bold uppercase tracking-widest text-[#414042]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
              View Archive
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Main Feature - Spans 7 columns */}
          {displayArticles[0] && (
            <Link href={`/blog/${displayArticles[0].slug}`} className="lg:col-span-7 group cursor-pointer">
              <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-sm bg-[#e5e5e5] mb-8">
                {displayArticles[0].coverImage && (
                  <Image
                    src={displayArticles[0].coverImage}
                    alt={displayArticles[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority
                    unoptimized
                    className="object-cover transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                  />
                )}
                <div className="absolute top-4 left-4 bg-[#fffff3] px-3 py-1 border border-[#414042]/10 text-[10px] font-bold uppercase tracking-widest text-[#414042] z-10">
                  Featured
                </div>
              </div>

              <div className="space-y-4 pr-12">
                <div className="flex items-center gap-4 text-xs font-mono text-[#8B5DFF] uppercase tracking-wider">
                  <span>{new Date(displayArticles[0].date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <span className="w-2 h-px bg-[#8B5DFF]" />
                  <span>Editorial</span>
                </div>
                <h3
                  className="text-3xl md:text-5xl font-bold text-[#414042] leading-[1.1] group-hover:text-[#8B5DFF] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                >
                  {displayArticles[0].title}
                </h3>
              </div>
            </Link>
          )}

          {/* Side Column - Stacked List - Spans 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:pl-8 lg:border-l border-[#414042]/10">
            {displayArticles.slice(1, 4).map((article, index) => (
              <Link href={`/blog/${article.slug}`} key={index} className="group grid grid-cols-[1fr_2fr] gap-6 items-start">
                {/* Thumbnail */}
                <div className="aspect-square w-full relative overflow-hidden rounded-sm bg-[#f0f0f0]">
                  {article.coverImage && (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 33vw, 20vw"
                      unoptimized
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col h-full justify-between py-1">
                  <div>
                    <span className="block text-[10px] font-mono text-[#414042]/50 uppercase tracking-widest mb-3">
                      0{index + 2} / {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <h4
                      className="text-xl md:text-2xl font-bold text-[#414042] leading-tight group-hover:text-[#8B5DFF] transition-colors"
                      style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                    >
                      {article.title}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#414042] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    Read Article <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Mobile View Archive Link */}
            <Link href="/blog" className="md:hidden flex items-center gap-2 pt-8 border-t border-[#414042]/10 mt-auto">
              <span className="text-sm font-bold uppercase tracking-widest text-[#414042]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                View Archive
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
