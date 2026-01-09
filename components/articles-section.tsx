"use client"

import Link from "next/link"
import { Pencil, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter-signup"
import Image from "next/image"
import { useEffect, useState } from "react"

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
    return (
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-xl text-gray-400" style={{ fontFamily: "var(--font-neue-montreal)" }}>Loading Articles...</p>
        </div>
      </section>
    )
  }

  const featuredArticle = articles[0]
  const sideArticles = articles.slice(1, 3)

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "var(--font-sfpro)" }}>Articles & News</h2>
          <Button
            asChild
            variant="outline"
            className="border-[3px] border-black rounded-xl px-4 md:px-6 py-4 md:py-6 hover:bg-gray-50 bg-white font-semibold text-sm md:text-base w-full sm:w-auto"
          >
            <Link href="/blog">
              <Pencil className="w-4 h-4 mr-2" />
              Browse all articles
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-6 mb-16">
          {/* Large featured article card */}
          {featuredArticle && (
            <Link href={`/blog/${featuredArticle.slug}`} className="group bg-white border-[3px] border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 block">
              <div className="bg-[#EDEDED] relative min-h-[220px] md:min-h-[320px] m-3 md:m-4 rounded-2xl overflow-hidden">
                <span className="absolute top-3 right-3 md:top-4 md:right-4 inline-block bg-black text-white text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-lg z-10">
                  Featured
                </span>
                {featuredArticle.coverImage && (
                  <Image
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                )}
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 line-clamp-2" style={{ fontFamily: "var(--font-sfpro)" }}>
                  {featuredArticle.title}
                </h3>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FDB927] border-2 border-black rounded-full overflow-hidden flex-shrink-0 relative">
                    {/* Placeholder Avatar or Author Image if available */}
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-xl">FS</span>
                  </div>
                  <div>
                    <div className="font-bold text-base md:text-lg text-[#0B0B0B]">Foxmen Studio</div>
                    <div className="text-sm md:text-base text-gray-600">
                      {new Date(featuredArticle.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Right side - Two smaller article cards */}
          <div className="space-y-6 md:space-y-8">
            {sideArticles.map((article, index) => (
              <Link href={`/blog/${article.slug}`} key={article._id || index} className="group bg-white border-[3px] border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 block">
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image area */}
                  <div className="bg-[#EDEDED] min-w-full sm:min-w-[200px] md:min-w-[280px] min-h-[180px] sm:min-h-[200px] relative m-0 sm:m-3 md:m-4 rounded-none sm:rounded-2xl overflow-hidden flex-shrink-0">
                    <span className="absolute top-3 right-3 md:top-4 md:right-4 inline-block bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg z-10">
                      Article
                    </span>
                    {article.coverImage && (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover sm:object-contain p-0 sm:p-3 md:p-4 rounded-none sm:rounded-2xl transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    )}
                  </div>
                  {/* Content area */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 line-clamp-3" style={{ fontFamily: "var(--font-sfpro)" }}>
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                      {article.content ? article.content.replace(/<[^>]*>?/gm, '') : "Read more..."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <NewsletterSignup />
      </div>
    </section>
  )
}
