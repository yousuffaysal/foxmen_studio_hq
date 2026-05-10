"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X, ImageIcon, Search, FileText, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

type Post = {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    author?: string;
    authorRole?: string;
    authorBio?: string;
    authorImage?: string;
    authorTwitter?: string;
    authorLinkedin?: string;
    date: string;
    coverImage?: string;
    tags?: string[];
    references?: string[];
};

const TABS = [
    { key: "info", label: "Info" },
    { key: "author", label: "Author" },
    { key: "content", label: "Content" },
];
type Tab = "info" | "author" | "content";

export default function BlogAdmin() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("info");
    const [post, setPost] = useState<Partial<Post>>({ tags: [], references: [] });
    const [tagInput, setTagInput] = useState("");
    const [refInput, setRefInput] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            if (Array.isArray(data)) setPosts(data);
        } catch {}
        finally { setLoading(false); }
    };

    useEffect(() => { fetchPosts(); }, []);

    const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.author || "").toLowerCase().includes(search.toLowerCase())
    );

    const openNew = () => {
        setPost({ tags: [], references: [], date: new Date().toISOString().split("T")[0] });
        setIsEditing(false);
        setActiveTab("info");
        setPanelOpen(true);
    };

    const openEdit = (p: Post) => {
        setPost({ ...p, date: p.date ? new Date(p.date).toISOString().split("T")[0] : "" });
        setIsEditing(true);
        setActiveTab("info");
        setPanelOpen(true);
    };

    const uploadToImgBB = async (file: File): Promise<string> => {
        const fd = new FormData();
        fd.append("image", file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, { method: "POST", body: fd });
        const data = await res.json();
        if (!data.data?.url) throw new Error("Upload failed");
        return data.data.url;
    };

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        try { const url = await uploadToImgBB(file); setPost(p => ({ ...p, coverImage: url })); }
        catch { alert("Upload failed"); }
        finally { setUploading(false); }
    };

    const handleSave = async () => {
        const token = localStorage.getItem("adminToken");
        setSaving(true);
        try {
            const url = isEditing ? `/api/posts/${post.id}` : `/api/posts`;
            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(post),
            });
            if (res.ok) { setPanelOpen(false); fetchPosts(); }
            else { const err = await res.json(); alert(err.error || "Save failed"); }
        } finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this post?")) return;
        const token = localStorage.getItem("adminToken");
        await fetch(`/api/posts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        fetchPosts();
    };

    const addTag = () => {
        if (!tagInput.trim()) return;
        setPost(p => ({ ...p, tags: [...(p.tags || []), tagInput.trim()] }));
        setTagInput("");
    };

    const addRef = () => {
        if (!refInput.trim()) return;
        setPost(p => ({ ...p, references: [...(p.references || []), refInput.trim()] }));
        setRefInput("");
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Main */}
            <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${panelOpen ? "lg:mr-[520px]" : ""}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white">
                    <div>
                        <h1 className="text-lg font-semibold text-slate-900">Blog</h1>
                        <p className="text-sm text-slate-500">{posts.length} posts</p>
                    </div>
                    <button onClick={openNew} className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        <Plus size={15} /> New Post
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 py-4 bg-white border-b border-slate-100">
                    <div className="relative max-w-sm">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-6 space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse flex gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0" />
                                    <div className="flex-1 space-y-2 pt-1">
                                        <div className="h-4 bg-slate-100 rounded w-2/3" />
                                        <div className="h-3 bg-slate-100 rounded w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                            <FileText size={40} strokeWidth={1} className="mb-3" />
                            <p className="text-sm font-medium">No posts found</p>
                        </div>
                    ) : (
                        <div className="p-6 space-y-2">
                            {filtered.map(p => (
                                <div key={p.id} className="group flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all">
                                    <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                                        {p.coverImage ? (
                                            <img src={p.coverImage} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full"><ImageIcon size={18} className="text-slate-300" /></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-slate-900 truncate">{p.title}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                            {p.author && <span>{p.author}</span>}
                                            {p.date && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={11} />
                                                    {format(new Date(p.date), "MMM d, yyyy")}
                                                </span>
                                            )}
                                        </div>
                                        {p.tags && p.tags.length > 0 && (
                                            <div className="flex items-center gap-1 mt-2">
                                                <Tag size={10} className="text-slate-400" />
                                                <div className="flex gap-1 flex-wrap">
                                                    {p.tags.slice(0, 4).map((t, i) => (
                                                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                        <button onClick={() => openEdit(p)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
                                            <Edit size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-500 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Slide-over panel */}
            {panelOpen && (
                <>
                    <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setPanelOpen(false)} />
                    <aside className="fixed top-0 right-0 h-full w-full max-w-[520px] bg-white border-l border-slate-200 z-40 flex flex-col shadow-xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                            <h2 className="text-sm font-semibold text-slate-900">{isEditing ? "Edit Post" : "New Post"}</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors disabled:opacity-60">
                                    {saving ? "Saving..." : "Save"}
                                </button>
                                <button onClick={() => setPanelOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex border-b border-slate-200 px-6">
                            {TABS.map(t => (
                                <button key={t.key} onClick={() => setActiveTab(t.key as Tab)} className={`text-sm font-medium px-1 py-3 mr-5 border-b-2 transition-colors ${activeTab === t.key ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                            {activeTab === "info" && (
                                <>
                                    <Field label="Title">
                                        <input
                                            value={post.title || ""}
                                            onChange={e => setPost(p => ({ ...p, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") }))}
                                            className={inp} placeholder="Post title"
                                        />
                                    </Field>
                                    <Field label="Slug">
                                        <input value={post.slug || ""} onChange={e => setPost(p => ({ ...p, slug: e.target.value }))} className={inp} />
                                    </Field>
                                    <Field label="Date">
                                        <input type="date" value={post.date || ""} onChange={e => setPost(p => ({ ...p, date: e.target.value }))} className={inp} />
                                    </Field>
                                    <Field label="Excerpt">
                                        <textarea value={post.excerpt || ""} onChange={e => setPost(p => ({ ...p, excerpt: e.target.value }))} className={`${inp} h-20 resize-none`} placeholder="Short summary..." />
                                    </Field>
                                    <Field label="Cover Image">
                                        <label className="relative block h-32 border-2 border-dashed border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-slate-400 transition-colors bg-slate-50">
                                            <input type="file" accept="image/*" onChange={handleCoverUpload} className="sr-only" />
                                            {post.coverImage ? (
                                                <img src={post.coverImage} alt="Cover" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full gap-1">
                                                    {uploading ? <span className="text-sm text-slate-400">Uploading...</span> : <>
                                                        <ImageIcon size={20} className="text-slate-300" />
                                                        <span className="text-xs text-slate-400">Click to upload cover</span>
                                                    </>}
                                                </div>
                                            )}
                                        </label>
                                    </Field>
                                    <Field label="Tags">
                                        <div className="flex gap-2 mb-2">
                                            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} className={`${inp} flex-1`} placeholder="Add tag, press Enter" />
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(post.tags || []).map((t, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                                                    {t} <button onClick={() => setPost(p => ({ ...p, tags: p.tags?.filter((_, idx) => idx !== i) }))}><X size={11} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="References (URLs)">
                                        <div className="flex gap-2 mb-2">
                                            <input value={refInput} onChange={e => setRefInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addRef(); } }} className={`${inp} flex-1`} placeholder="Add URL, press Enter" />
                                        </div>
                                        <div className="space-y-1">
                                            {(post.references || []).map((r, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                                    <span className="flex-1 truncate">{r}</span>
                                                    <button onClick={() => setPost(p => ({ ...p, references: p.references?.filter((_, idx) => idx !== i) }))} className="text-slate-400 hover:text-red-500"><X size={11} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </Field>
                                </>
                            )}

                            {activeTab === "author" && (
                                <>
                                    <Field label="Name"><input value={post.author || ""} onChange={e => setPost(p => ({ ...p, author: e.target.value }))} className={inp} /></Field>
                                    <Field label="Role / Title"><input value={post.authorRole || ""} onChange={e => setPost(p => ({ ...p, authorRole: e.target.value }))} className={inp} /></Field>
                                    <Field label="Bio">
                                        <textarea value={post.authorBio || ""} onChange={e => setPost(p => ({ ...p, authorBio: e.target.value }))} className={`${inp} h-24 resize-none`} />
                                    </Field>
                                    <Field label="Avatar URL"><input value={post.authorImage || ""} onChange={e => setPost(p => ({ ...p, authorImage: e.target.value }))} className={inp} placeholder="https://..." /></Field>
                                    <Field label="Twitter"><input value={post.authorTwitter || ""} onChange={e => setPost(p => ({ ...p, authorTwitter: e.target.value }))} className={inp} placeholder="@handle" /></Field>
                                    <Field label="LinkedIn"><input value={post.authorLinkedin || ""} onChange={e => setPost(p => ({ ...p, authorLinkedin: e.target.value }))} className={inp} placeholder="https://linkedin.com/in/..." /></Field>
                                </>
                            )}

                            {activeTab === "content" && (
                                <Field label="Content (Markdown)">
                                    <textarea
                                        value={post.content || ""}
                                        onChange={e => setPost(p => ({ ...p, content: e.target.value }))}
                                        className={`${inp} h-[500px] resize-none font-mono text-xs leading-relaxed`}
                                        placeholder="## Introduction&#10;&#10;Write your article in Markdown..."
                                    />
                                </Field>
                            )}
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600">{label}</label>
            {children}
        </div>
    );
}

const inp = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all";
