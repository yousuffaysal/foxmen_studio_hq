"use client"
import React from 'react';
import { ArrowRight, Calendar, Share2, Facebook, Twitter, Linkedin, MessageSquare, Send, Link as LinkIcon, User, Tag, FileText, Layers, Hash } from "lucide-react"
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
        <section className="pt-32 pb-12 px-6 md:px-12 bg-[#fffff3] relative border-b border-[#414042]/10">
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#414042 1px, transparent 1px), linear-gradient(90deg, #414042 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

            <div className="max-w-[1200px] mx-auto relative z-10 w-full text-left">
                <div className="flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest text-[#414042]/60">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#6E35FF] rounded-full animate-pulse" />
                        System_Log_Entry
                    </span>
                    <span className="w-px h-3 bg-[#414042]/20" />
                    <span>{post.tags?.[0] || "Update"}</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold mb-10 leading-[0.9] text-[#414042] tracking-tight" style={{ fontFamily: "var(--font-owners-medium)" }}>
                    {post.title}
                </h1>

                <p className="text-lg md:text-xl text-[#414042]/70 leading-relaxed mb-10 max-w-3xl font-mono border-l-2 border-[#6E35FF] pl-6">
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[#414042]/10">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#414042]">
                        <div className="p-2 border border-[#414042]/20 rounded-full">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="block text-[#414042]/40 text-[10px]">Date_Stamp</span>
                            {new Date(post.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                    {post.author && (
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#414042]">
                            <div className="p-2 border border-[#414042]/20 rounded-full">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="block text-[#414042]/40 text-[10px]">Authored_By</span>
                                {post.author}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export function PostHero({ image }: { image: string }) {
    return (
        <div className="mb-16 relative group">
            <div className="absolute -inset-2 border border-[#414042]/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-4 right-4 z-10 bg-[#fffff3] border border-[#414042] px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                Fig. 01 — Visual_Data
            </div>

            <div className="aspect-[1073/663] w-full bg-[#e5e5e5] overflow-hidden relative border border-[#414042]/10">
                {image ? (
                    <Image
                        src={image}
                        alt="Hero"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 75vw"
                        quality={85}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#414042]/20 text-sm font-bold uppercase tracking-widest bg-[url('/grid-pattern.svg')]">
                        [ No_Visual_Signal_Detected ]
                    </div>
                )}
            </div>
        </div>
    )
}

export function PostBody({ content }: { content: string }) {
    return (
        <div className="prose prose-lg md:prose-xl max-w-none tracking-wide
            prose-headings:text-[#414042] prose-headings:font-bold prose-headings:font-owners 
            prose-p:text-[#414042] prose-p:leading-loose prose-p:font-mono prose-p:text-base md:prose-p:text-lg
            prose-a:text-[#6E35FF] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-[#6E35FF] prose-blockquote:bg-[#414042]/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-[#414042]
            prose-code:text-[#6E35FF] prose-code:bg-[#414042]/5 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-ul:list-square prose-li:marker:text-[#6E35FF]
            prose-img:border prose-img:border-[#414042]/10 prose-img:p-2 prose-img:bg-white">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ ...props }) => <h1 className="text-3xl md:text-5xl border-b border-[#414042]/10 pb-4 mb-8 mt-16" style={{ fontFamily: "var(--font-owners-medium)" }} {...props} />,
                    h2: ({ ...props }) => <h2 className="text-2xl md:text-4xl mb-6 mt-12 flex items-center gap-3" style={{ fontFamily: "var(--font-owners-medium)" }} {...props}><span className="text-[#6E35FF]/50 text-xl">#</span> {props.children}</h2>,
                    h3: ({ ...props }) => <h3 className="text-xl md:text-2xl mb-4 mt-8 font-bold text-[#414042]" style={{ fontFamily: "var(--font-owners-medium)" }} {...props} />,
                    code({ inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <div className="relative my-8 group">
                                <div className="absolute -top-3 left-4 bg-[#1E1E1E] text-[#6E35FF] text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-[#6E35FF]/20">
                                    {match[1]}
                                </div>
                                <SyntaxHighlighter
                                    {...props}
                                    style={dracula}
                                    language={match[1]}
                                    PreTag="div"
                                    className="!bg-[#1E1E1E] !p-6 !rounded-lg !border !border-[#414042]/20 shadow-xl !m-0 text-sm font-mono overflow-x-auto"
                                >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                            </div>
                        ) : (
                            <code {...props} className="bg-[#414042]/5 text-[#6E35FF] px-1.5 py-0.5 rounded text-sm font-bold font-mono border border-[#414042]/10">
                                {children}
                            </code>
                        )
                    },
                    table: ({ ...props }) => <div className="overflow-x-auto my-8"><table className="w-full border-collapse border border-[#414042]/10 text-sm font-mono" {...props} /></div>,
                    thead: ({ ...props }) => <thead className="bg-[#414042]/5" {...props} />,
                    tbody: ({ ...props }) => <tbody className="divide-y divide-[#414042]/10" {...props} />,
                    tr: ({ ...props }) => <tr className="hover:bg-[#414042]/5 transition-colors" {...props} />,
                    th: ({ ...props }) => <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[#414042] border border-[#414042]/10" {...props} />,
                    td: ({ ...props }) => <td className="px-4 py-3 text-[#414042]/80 border border-[#414042]/10" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}

export function SidebarAuthorBio({ post }: { post: any }) {
    return (
        <div className="bg-white p-8 border border-[#414042]/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#8B5DFF]" />

            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#f0f0f0] border border-[#414042]/10 relative overflow-hidden">
                    {post.authorImage ? (
                        <Image src={post.authorImage} alt={post.author} width={80} height={80} sizes="80px" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#f0f0f0] font-bold text-xl text-[#414042]/30">
                            {post.author?.[0]?.toUpperCase()}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[#414042] leading-none mb-1 uppercase tracking-wide">{post.author || "Admin"}</h3>
                    <p className="text-[#6E35FF] text-xs font-bold uppercase tracking-widest">
                        {post.authorRole || "Operator"}
                    </p>
                </div>
            </div>

            <p className="text-[#414042]/70 text-sm leading-relaxed mb-6 font-mono border-t border-[#414042]/10 pt-4">
                {post.authorBio || "System operator and technical documentation specialist."}
            </p>

            <div className="flex gap-2">
                {post.authorTwitter && (
                    <a href={post.authorTwitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-[#414042]/20 text-[#414042] hover:bg-[#414042] hover:text-[#fffff3] transition-all">
                        <Twitter className="w-4 h-4" />
                    </a>
                )}
                {post.authorLinkedin && (
                    <a href={post.authorLinkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-[#414042]/20 text-[#414042] hover:bg-[#414042] hover:text-[#fffff3] transition-all">
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
        <div className="bg-white p-6 border border-[#414042]/10">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-[#414042]/40 flex items-center gap-2">
                <Tag className="w-3 h-3" /> Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-[#414042]/5 border border-[#414042]/10 text-[#414042] hover:bg-[#6E35FF] hover:text-white hover:border-[#6E35FF] transition-all cursor-pointer text-xs font-mono lowercase">
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
        <div className="bg-[#414042] p-6 text-[#fffff3]">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-[#fffff3]/60 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Resources
            </h4>
            <div className="space-y-3">
                {references.map((ref, i) => (
                    <a
                        key={i}
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-xs md:text-sm font-mono text-[#fffff3]/80 hover:text-[#00FF00] transition-colors group"
                    >
                        <span className="text-[#fffff3]/20 group-hover:text-[#00FF00]">0{i + 1}</span>
                        <span className="truncate border-b border-[#fffff3]/20 pb-0.5">{ref}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

export function SidebarRelated({ posts }: { posts?: any[] }) {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="bg-white border border-[#414042]/10 p-6">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-[#414042]/40 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Related_Logs
            </h4>
            <div className="space-y-6">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                        <div className="aspect-[1073/663] bg-[#f0f0f0] mb-3 overflow-hidden relative border border-[#414042]/10">
                            {post.coverImage ? (
                                <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#f0f0f0] text-[#414042]/20 font-bold uppercase text-xs">No Signal</div>
                            )}
                        </div>
                        <h4 className="font-bold text-sm leading-snug text-[#414042] group-hover:text-[#6E35FF] transition-colors" style={{ fontFamily: "var(--font-owners-medium)" }}>
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
        <section className="py-8 md:py-12 border-t border-[#414042]/10" id="comments">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 md:mb-12">
                <div className="bg-[#414042] text-[#fffff3] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                    Discussion_Thread
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#414042]" style={{ fontFamily: "var(--font-owners-medium)" }}>Community_Thoughts ({comments.length})</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-16">
                {/* Comments List */}
                <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                    {loading ? (
                        <div className="p-6 md:p-8 text-center bg-white border border-[#414042]/10">
                            <p className="text-[#414042]/40 font-mono text-xs animate-pulse">Loading discussion...</p>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="p-8 md:p-12 text-center bg-white border border-dashed border-[#414042]/20">
                            <p className="text-[#414042]/40 italic font-mono text-sm">No thoughts shared yet. Start the conversation.</p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="bg-white p-4 md:p-8 border-l-2 border-[#414042]/10 hover:border-[#6E35FF] transition-colors shadow-sm">
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-8 h-8 bg-[#414042] flex items-center justify-center font-bold text-[#fffff3] text-xs font-mono flex-shrink-0">
                                            {comment.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#414042] text-xs md:text-sm uppercase tracking-wider">{comment.name}</div>
                                            <div className="text-[10px] text-[#414042]/40 font-mono uppercase">
                                                TIMESTAMP: {new Date(comment.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[#414042]/80 leading-relaxed font-mono text-xs md:text-sm">{comment.content}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Comment Form */}
                <div className="order-1 lg:order-2">
                    <div className="bg-[#1C1C1C] p-6 md:p-8 text-[#fffff3] lg:sticky lg:top-32 border-2 border-[#414042]">
                        <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-[#6E35FF]" style={{ fontFamily: "var(--font-owners-regular)" }}>
                            <span className="w-2 h-2 bg-[#6E35FF] rounded-full animate-pulse" />
                            Share Your Thoughts
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <Input
                                    placeholder="YOUR_NAME"
                                    required
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    className="h-10 md:h-12 bg-transparent border-b border-[#fffff3]/20 rounded-none px-0 focus:border-[#6E35FF] focus-visible:ring-0 placeholder:text-[#fffff3]/30 font-mono text-xs md:text-sm"
                                />
                                <Input
                                    placeholder="CONTACT_EMAIL"
                                    type="email"
                                    required
                                    value={newItem.email}
                                    onChange={e => setNewItem({ ...newItem, email: e.target.value })}
                                    className="h-10 md:h-12 bg-transparent border-b border-[#fffff3]/20 rounded-none px-0 focus:border-[#6E35FF] focus-visible:ring-0 placeholder:text-[#fffff3]/30 font-mono text-xs md:text-sm"
                                />
                            </div>
                            <Textarea
                                placeholder="YOUR_PERSPECTIVE..."
                                required
                                value={newItem.content}
                                onChange={e => setNewItem({ ...newItem, content: e.target.value })}
                                className="min-h-[100px] md:min-h-[120px] bg-[#fffff3]/5 border-0 rounded-none focus:ring-1 focus:ring-[#6E35FF] p-3 md:p-4 font-mono text-xs md:text-sm resize-y placeholder:text-[#fffff3]/30"
                            />
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="h-10 md:h-12 w-full rounded-none bg-[#6E35FF] text-white font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-[#ffffff] hover:text-[#6E35FF] transition-all"
                            >
                                {submitting ? "Posting..." : "Post_Comment"}
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
        <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-12 bg-[#fffff3] text-center border-t border-[#414042]/10">
            <div className="max-w-4xl mx-auto">
                <span className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#414042]/40 mb-6 md:mb-8 animate-pulse">
                    /// System Ready
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-12 text-[#414042] leading-[0.9] md:leading-[0.85] px-2" style={{ fontFamily: "var(--font-owners-medium)" }}>
                    INITIATE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E35FF] to-[#FF4A60]">COLLABORATION</span>
                </h2>
                <Link href="/contact" className="inline-block relative group">
                    <div className="absolute inset-0 bg-[#414042] transform translate-y-1 translate-x-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    <div className="relative border-2 border-[#414042] bg-[#fffff3] px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider md:tracking-widest text-[#414042] group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform">
                        Start Project
                    </div>
                </Link>
            </div>
        </section>
    )
}

export function SidebarShare() {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleShare = (platform: string) => {
        if (typeof window === 'undefined') return;
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        let shareUrl = '';

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="bg-white p-6 border border-[#414042]/10">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-[#414042]/40 flex items-center gap-2">
                <Hash className="w-3 h-3" /> Share_Protocol
            </h4>
            <div className="grid grid-cols-4 gap-2">
                <button
                    onClick={handleCopy}
                    className={`flex flex-col items-center justify-center gap-2 p-3 border border-[#414042]/10 transition-all group ${copied ? 'bg-[#6E35FF] text-white border-[#6E35FF]' : 'hover:border-[#414042] hover:bg-[#414042]/5'}`}
                    title="Copy Link"
                >
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">{copied ? 'Copied' : 'Link'}</span>
                </button>
                <button
                    onClick={() => handleShare('twitter')}
                    className="flex flex-col items-center justify-center gap-2 p-3 border border-[#414042]/10 hover:border-[#414042] hover:bg-[#414042]/5 transition-all group"
                    title="Share on Twitter"
                >
                    <Twitter className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">X</span>
                </button>
                <button
                    onClick={() => handleShare('linkedin')}
                    className="flex flex-col items-center justify-center gap-2 p-3 border border-[#414042]/10 hover:border-[#414042] hover:bg-[#414042]/5 transition-all group"
                    title="Share on LinkedIn"
                >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">IN</span>
                </button>
                <button
                    onClick={() => handleShare('facebook')}
                    className="flex flex-col items-center justify-center gap-2 p-3 border border-[#414042]/10 hover:border-[#414042] hover:bg-[#414042]/5 transition-all group"
                    title="Share on Facebook"
                >
                    <Facebook className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">FB</span>
                </button>
            </div>
        </div>
    )
}
