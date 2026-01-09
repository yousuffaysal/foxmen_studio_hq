import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import {
    BlogHero,
    SearchFilter,
    FeaturedArticle,
    ArticleGrid,
    Pagination,
    EmailSubscribe,
    BlogCTA
} from "@/components/blog-sections"
import { Metadata } from "next"
import { HomePreloader } from "@/components/home-preloader"
import { ScrollAnimation } from "@/components/scroll-animation"

export const metadata: Metadata = {
    title: "Blog & Insights",
    description: "Explore the latest insights, trends, and articles on web development, UI/UX design, and SaaS product strategies from Foxmen Studio.",
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#FFC224] selection:text-black">
            <Navigation />
            <main>
                <HomePreloader />
                <ScrollAnimation>
                    <BlogHero />
                </ScrollAnimation>

                {/* SearchFilter and FeaturedArticle removed for new layout */}
                {/* <SearchFilter /> */}
                {/* <FeaturedArticle /> */}

                <ScrollAnimation delay={0.2}>
                    <ArticleGrid />
                </ScrollAnimation>

                <ScrollAnimation delay={0.3}>
                    <Pagination />
                </ScrollAnimation>

                <ScrollAnimation delay={0.4}>
                    <EmailSubscribe />
                </ScrollAnimation>

                <ScrollAnimation delay={0.5}>
                    <BlogCTA />
                </ScrollAnimation>
            </main>
            <Footer />
        </div>
    )
}
