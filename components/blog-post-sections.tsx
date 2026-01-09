"use client"
import React from 'react';
import { ArrowRight, Clock, Calendar, Share2, Facebook, Twitter, Linkedin, MessageSquare, Send, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function PostHeader({ post }: { post: any }) {
    return (
        <section className="pt-32 pb-16 px-6 md:px-12 bg-[#F8F8F8]">
            <div className="max-w-[1000px] mx-auto relative z-10 w-full text-left">
                <div className="inline-block bg-[#6E35FF] px-4 py-1.5 rounded-full text-white font-medium text-sm tracking-wide mb-8">
                    {post.tags?.[0] || "Blog"}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] capitalize" style={{ fontFamily: "var(--font-owners-regular)" }}>
                    {post.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    {post.author && (
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6E35FF]"></span>
                            By {post.author}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export function PostHero({ image }: { image: string }) {
    return (
        <div className="mb-12">
            <div className="aspect-video w-full bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm">
                {image ? (
                    <Image src={image} alt="Hero" fill className="object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-lg font-medium uppercase">
                        No Hero Image
                    </div>
                )}
            </div>
        </div>
    )
}

export function PostBody({ content }: { content: string }) {
    return (
        <div className="prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:text-black prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#6E35FF] prose-img:rounded-2xl max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-12 capitalize leading-tight" style={{ fontFamily: "var(--font-owners-regular)" }} {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-10 leading-snug" style={{ fontFamily: "var(--font-owners-regular)" }} {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-bold mb-4 mt-8" style={{ fontFamily: "var(--font-owners-regular)" }} {...props} />,
                    p: ({ node, ...props }) => <p className="mb-6 text-lg leading-relaxed text-gray-700" style={{ fontFamily: "var(--font-neue-montreal)" }} {...props} />,
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-[#6E35FF] pl-6 py-1 my-8 italic text-xl text-gray-800 bg-gray-50/50 rounded-r-lg" {...props} />
                    ),
                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700" style={{ fontFamily: "var(--font-neue-montreal)" }} {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700" style={{ fontFamily: "var(--font-neue-montreal)" }} {...props} />,
                    li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                    a: ({ node, ...props }) => <a className="text-[#6E35FF] hover:text-[#5a2bd9] font-medium transition-colors underline decoration-1 underline-offset-4" {...props} />,
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-xl !bg-[#1E1E1E] shadow-sm my-8 text-sm md:text-base border border-gray-800"
                            >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                        ) : (
                            <code {...props} className={`${className} bg-gray-100 px-1.5 py-0.5 rounded text-[#6E35FF] font-medium text-sm`}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}

export function SidebarAuthorBio({ post }: { post: any }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start gap-4 mb-6">
                <div className="text-left">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-owners-regular)" }}>{post.author || "Admin"}</h3>
                    <p className="inline-block bg-[#6E35FF]/10 text-[#6E35FF] px-3 py-1 rounded-full font-medium text-xs">
                        {post.authorRole || "Editor"}
                    </p>
                </div>
                <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden relative shrink-0">
                    {post.authorImage ? (
                        <Image src={post.authorImage} alt={post.author} width={80} height={80} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 font-bold text-2xl text-gray-400">
                            {post.author?.[0]?.toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-left" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                {post.authorBio || "Passionate about technology and design."}
            </p>

            <div className="flex gap-3 justify-start">
                {post.authorTwitter && (
                    <a href={post.authorTwitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-[#6E35FF] hover:text-white transition-all">
                        <Twitter className="w-4 h-4" />
                    </a>
                )}
                {post.authorLinkedin && (
                    <a href={post.authorLinkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-[#6E35FF] hover:text-white transition-all">
                        <Linkedin className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>
    )
}

export function SidebarTags({ tags }: { tags: string[] }) {
    if (!tags || tags.length === 0) return null;
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "var(--font-owners-regular)" }}>Tags</h4>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-[#6E35FF] hover:text-white transition-all cursor-pointer text-xs" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    )
}

export function SidebarReferences({ references }: { references: string[] }) {
    if (!references || references.length === 0) return null;
    return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-owners-regular)" }}>
                <LinkIcon className="w-4 h-4" /> References
            </h4>
            <div className="space-y-3">
                {references.map((ref, i) => (
                    <a
                        key={i}
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#6E35FF] transition-colors truncate"
                    >
                        <ArrowRight className="w-3 h-3 shrink-0" />
                        <span className="truncate underline decoration-1 underline-offset-2">{ref}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

export function SidebarRelated({ posts }: { posts?: any[] }) {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-lg mb-6" style={{ fontFamily: "var(--font-owners-regular)" }}>Other Blogs</h4>
            <div className="space-y-6">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="block group cursor-pointer">
                        <div className="aspect-[4/3] bg-gray-100 rounded-2xl mb-3 overflow-hidden relative shadow-sm border border-gray-100">
                            {post.coverImage ? (
                                <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 font-bold uppercase">No Image</div>
                            )}
                        </div>
                        <h4 className="font-semibold text-base leading-snug group-hover:text-[#6E35FF] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-neue-montreal)" }}>
                            {post.title}
                        </h4>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function CommentsSection({ postId }: { postId: string }) {
    const [comments, setComments] = React.useState<any[]>([]);
    const [newItem, setNewItem] = React.useState({ name: "", email: "", content: "" });
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (!postId) return;
        fetch(`/api/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => {
                setComments(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem)
            });
            if (res.ok) {
                const newComment = await res.json();
                setComments(prev => [newComment, ...prev]);
                setNewItem({ name: "", email: "", content: "" });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-16" id="comments">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-[#6E35FF]/10 p-2.5 rounded-xl text-[#6E35FF]">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-owners-regular)" }}>Discussion ({comments.length})</h2>
            </div>

            <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Comments List */}
                <div className="space-y-6 order-2 lg:order-1">
                    {loading ? (
                        <div className="p-8 text-center bg-gray-50 rounded-2xl">
                            <p className="text-gray-400 animate-pulse">Loading comments...</p>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#6E35FF] rounded-full flex items-center justify-center font-bold text-white text-sm">
                                            {comment.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{comment.name}</div>
                                            <div className="text-xs text-gray-400">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{comment.content}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Comment Form */}
                <div className="order-1 lg:order-2">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-32">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-owners-regular)" }}>
                            Leave a Comment
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <Input
                                    placeholder="Your Name"
                                    required
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    className="h-12 rounded-xl border-gray-200 focus:border-[#6E35FF] focus-visible:ring-[#6E35FF]"
                                />
                                <Input
                                    placeholder="Your Email"
                                    type="email"
                                    required
                                    value={newItem.email}
                                    onChange={e => setNewItem({ ...newItem, email: e.target.value })}
                                    className="h-12 rounded-xl border-gray-200 focus:border-[#6E35FF] focus-visible:ring-[#6E35FF]"
                                />
                            </div>
                            <Textarea
                                placeholder="What's on your mind?"
                                required
                                value={newItem.content}
                                onChange={e => setNewItem({ ...newItem, content: e.target.value })}
                                className="min-h-[120px] rounded-xl border-gray-200 focus:border-[#6E35FF] focus-visible:ring-[#6E35FF] p-4 resize-y"
                            />
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="h-12 w-full rounded-xl bg-black text-white font-bold hover:bg-[#6E35FF] transition-all"
                            >
                                {submitting ? "Posting..." : "Post Comment"} <Send className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function PostCTA() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#F8F8F8] text-center border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-owners-regular)" }}>Have an Idea?</h2>
                <p className="text-xl md:text-2xl text-gray-500 mb-10" style={{ fontFamily: "var(--font-neue-montreal)" }}>Let's create something extraordinary.</p>
                <Link href="/contact" className="inline-flex items-center justify-center bg-[#6E35FF] text-white rounded-full px-10 py-5 text-lg font-bold hover:bg-[#5a2bd9] transition-all hover:-translate-y-1 shadow-lg shadow-[#6E35FF]/30">
                    Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </div>
        </section>
    )
}
