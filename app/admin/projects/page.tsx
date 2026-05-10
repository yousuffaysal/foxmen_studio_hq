"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit, X, ImageIcon, ExternalLink, Search, ChevronRight } from "lucide-react";

type Project = {
    id: string;
    title: string;
    slug: string;
    description: string;
    image?: string;
    video?: string;
    gallery?: string[];
    tags: string[];
    techStack?: string[];
    features?: string[];
    link?: string;
    goal?: string;
    category?: string;
    client?: string;
    role?: string;
    duration?: string;
    challenge?: string;
    solution?: string;
    outcome?: string;
    testimonial?: { text: string; author: string; role: string };
    content?: string;
};

const CATEGORIES = [
    "SaaS", "AI & Machine Learning", "FinTech", "EdTech", "HealthTech",
    "E-commerce", "Web3 & Blockchain", "Cybersecurity", "Marketing & AdTech",
    "UI/UX Design", "Brand Identity", "Mobile App", "Enterprise Software",
    "Social Media", "Travel & Hospitality", "Logistics", "GreenTech",
    "Non-Profit", "Entertainment & Media", "Gaming", "AR / VR / XR",
    "IoT", "Cloud & DevOps", "Data Science",
];

const TABS = [
    { key: "info", label: "Info" },
    { key: "media", label: "Media" },
    { key: "content", label: "Content" },
];

type Tab = "info" | "media" | "content";

function tag(token: string, setProject: React.Dispatch<React.SetStateAction<Partial<Project>>>, field: "tags" | "techStack", project: Partial<Project>) {
    const arr = (project[field] || []) as string[];
    if (!arr.includes(token)) setProject(p => ({ ...p, [field]: [...arr, token] }));
}

function removeTag(i: number, setProject: React.Dispatch<React.SetStateAction<Partial<Project>>>, field: "tags" | "techStack", project: Partial<Project>) {
    setProject(p => ({ ...p, [field]: ((p[field] || []) as string[]).filter((_, idx) => idx !== i) }));
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("info");
    const [project, setProject] = useState<Partial<Project>>({ tags: [], techStack: [], gallery: [] });
    const [tagInput, setTagInput] = useState("");
    const [techInput, setTechInput] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            if (Array.isArray(data)) setProjects(data);
        } catch {}
        finally { setLoading(false); }
    };

    useEffect(() => { fetchProjects(); }, []);

    const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(search.toLowerCase())
    );

    const openNew = () => {
        setProject({ tags: [], techStack: [], gallery: [] });
        setIsEditing(false);
        setActiveTab("info");
        setPanelOpen(true);
    };

    const openEdit = (p: Project) => {
        setProject(p);
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        try { setProject(p => ({ ...p, image: "" })); const url = await uploadToImgBB(file); setProject(p => ({ ...p, image: url })); }
        catch (err) { alert("Upload failed: " + err); }
        finally { setUploading(false); }
    };

    const handleGalleryUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToImgBB(file);
            setProject(p => {
                const g = [...(p.gallery || [])];
                g[index] = url;
                return { ...p, gallery: g };
            });
        } catch (err) { alert("Upload failed: " + err); }
        finally { setUploading(false); }
    };

    const handleSave = async () => {
        const token = localStorage.getItem("adminToken");
        setSaving(true);
        try {
            const payload = { ...project, gallery: (project.gallery || []).filter(Boolean) };
            const url = isEditing ? `/api/projects/${project.id}` : `/api/projects`;
            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload),
            });
            if (res.ok) { setPanelOpen(false); fetchProjects(); }
            else { const err = await res.json(); alert(err.error || "Save failed"); }
        } finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        const token = localStorage.getItem("adminToken");
        await fetch(`/api/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        fetchProjects();
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Main list */}
            <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${panelOpen ? "lg:mr-[520px]" : ""}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white">
                    <div>
                        <h1 className="text-lg font-semibold text-slate-900">Projects</h1>
                        <p className="text-sm text-slate-500">{projects.length} total</p>
                    </div>
                    <button onClick={openNew} className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        <Plus size={15} /> New Project
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 py-4 bg-white border-b border-slate-100">
                    <div className="relative max-w-sm">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
                                    <div className="h-44 bg-slate-100" />
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 bg-slate-100 rounded w-3/4" />
                                        <div className="h-3 bg-slate-100 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                            <ImageIcon size={40} strokeWidth={1} className="mb-3" />
                            <p className="text-sm font-medium">No projects found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filtered.map(p => (
                                <div key={p.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all">
                                    <div className="relative h-44 bg-slate-100">
                                        {p.image ? (
                                            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <ImageIcon size={28} className="text-slate-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                            <button onClick={() => openEdit(p)} className="p-2 bg-white rounded-lg shadow text-slate-700 hover:text-slate-900 transition-colors">
                                                <Edit size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="p-2 bg-white rounded-lg shadow text-red-500 hover:text-red-600 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                            {p.link && (
                                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg shadow text-slate-700 hover:text-slate-900 transition-colors">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        {p.category && <p className="text-xs font-medium text-indigo-600 mb-1">{p.category}</p>}
                                        <h3 className="text-sm font-semibold text-slate-900 truncate">{p.title}</h3>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                                        {p.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {p.tags.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                                                ))}
                                                {p.tags.length > 3 && <span className="text-xs text-slate-400">+{p.tags.length - 3}</span>}
                                            </div>
                                        )}
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
                        {/* Panel header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                            <h2 className="text-sm font-semibold text-slate-900">{isEditing ? "Edit Project" : "New Project"}</h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                                <button onClick={() => setPanelOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 px-6">
                            {TABS.map(t => (
                                <button
                                    key={t.key}
                                    onClick={() => setActiveTab(t.key as Tab)}
                                    className={`text-sm font-medium px-1 py-3 mr-5 border-b-2 transition-colors ${activeTab === t.key ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Panel body */}
                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                            {activeTab === "info" && (
                                <>
                                    <Field label="Title">
                                        <input
                                            value={project.title || ""}
                                            onChange={e => setProject(p => ({ ...p, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") }))}
                                            className={input}
                                            placeholder="Project name"
                                        />
                                    </Field>
                                    <Field label="Slug">
                                        <input value={project.slug || ""} onChange={e => setProject(p => ({ ...p, slug: e.target.value }))} className={input} placeholder="project-slug" />
                                    </Field>
                                    <Field label="Category">
                                        <select value={project.category || ""} onChange={e => setProject(p => ({ ...p, category: e.target.value }))} className={input}>
                                            <option value="">Select category</option>
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="Description">
                                        <textarea value={project.description || ""} onChange={e => setProject(p => ({ ...p, description: e.target.value }))} className={`${input} h-24 resize-none`} placeholder="Short description..." />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Client"><input value={project.client || ""} onChange={e => setProject(p => ({ ...p, client: e.target.value }))} className={input} /></Field>
                                        <Field label="Role"><input value={project.role || ""} onChange={e => setProject(p => ({ ...p, role: e.target.value }))} className={input} /></Field>
                                        <Field label="Duration"><input value={project.duration || ""} onChange={e => setProject(p => ({ ...p, duration: e.target.value }))} className={input} /></Field>
                                        <Field label="Live URL"><input value={project.link || ""} onChange={e => setProject(p => ({ ...p, link: e.target.value }))} className={input} placeholder="https://..." /></Field>
                                    </div>
                                    <Field label="Tags">
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                value={tagInput}
                                                onChange={e => setTagInput(e.target.value)}
                                                onKeyDown={e => { if (e.key === "Enter" && tagInput.trim()) { e.preventDefault(); tag(tagInput.trim(), setProject, "tags", project); setTagInput(""); } }}
                                                className={`${input} flex-1`}
                                                placeholder="Add tag, press Enter"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(project.tags || []).map((t, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                                                    {t} <button onClick={() => removeTag(i, setProject, "tags", project)}><X size={11} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Tech Stack">
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                value={techInput}
                                                onChange={e => setTechInput(e.target.value)}
                                                onKeyDown={e => { if (e.key === "Enter" && techInput.trim()) { e.preventDefault(); tag(techInput.trim(), setProject, "techStack", project); setTechInput(""); } }}
                                                className={`${input} flex-1`}
                                                placeholder="Add tech, press Enter"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(project.techStack || []).map((t, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                                                    {t} <button onClick={() => removeTag(i, setProject, "techStack", project)}><X size={11} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </Field>
                                </>
                            )}

                            {activeTab === "media" && (
                                <>
                                    <Field label="Cover Image">
                                        <label className="relative block h-40 border-2 border-dashed border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-slate-400 transition-colors bg-slate-50">
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
                                            {project.image ? (
                                                <img src={project.image} alt="Cover" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full gap-1">
                                                    {uploading ? <div className="text-sm text-slate-400">Uploading...</div> : <>
                                                        <ImageIcon size={24} className="text-slate-300" />
                                                        <span className="text-xs text-slate-400">Click to upload</span>
                                                    </>}
                                                </div>
                                            )}
                                        </label>
                                    </Field>
                                    <Field label="Video URL (YouTube / MP4)">
                                        <input value={project.video || ""} onChange={e => setProject(p => ({ ...p, video: e.target.value }))} className={input} placeholder="https://youtube.com/..." />
                                    </Field>
                                    <Field label="Gallery (up to 8)">
                                        <div className="grid grid-cols-4 gap-2">
                                            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                                                <label key={i} className="relative aspect-square border-2 border-dashed border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-slate-400 transition-colors bg-slate-50">
                                                    <input type="file" accept="image/*" onChange={e => handleGalleryUpload(i, e)} className="sr-only" />
                                                    {project.gallery?.[i] ? (
                                                        <img src={project.gallery[i]} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full"><Plus size={16} className="text-slate-300" /></div>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </Field>
                                </>
                            )}

                            {activeTab === "content" && (
                                <>
                                    <Field label="Challenge">
                                        <textarea value={project.challenge || ""} onChange={e => setProject(p => ({ ...p, challenge: e.target.value }))} className={`${input} h-20 resize-none`} placeholder="What was the problem?" />
                                    </Field>
                                    <Field label="Solution">
                                        <textarea value={project.solution || ""} onChange={e => setProject(p => ({ ...p, solution: e.target.value }))} className={`${input} h-20 resize-none`} placeholder="How did you solve it?" />
                                    </Field>
                                    <Field label="Outcome">
                                        <textarea value={project.outcome || ""} onChange={e => setProject(p => ({ ...p, outcome: e.target.value }))} className={`${input} h-20 resize-none`} placeholder="Results and impact..." />
                                    </Field>
                                    <Field label="Case Study (Markdown)">
                                        {project.gallery && project.gallery.length > 0 && (
                                            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
                                                {project.gallery.filter(Boolean).map((img, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        title="Insert into content"
                                                        onClick={() => setProject(p => ({ ...p, content: (p.content || "") + `\n![Image](${img})\n` }))}
                                                        className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border border-slate-200 hover:border-indigo-400 transition-colors"
                                                    >
                                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                                    </button>
                                                ))}
                                                <span className="text-xs text-slate-400 self-center ml-1 flex-shrink-0">Click to insert</span>
                                            </div>
                                        )}
                                        <textarea
                                            ref={contentRef}
                                            value={project.content || ""}
                                            onChange={e => setProject(p => ({ ...p, content: e.target.value }))}
                                            className={`${input} h-64 resize-none font-mono text-xs`}
                                            placeholder="## Overview&#10;Write your case study in Markdown..."
                                        />
                                    </Field>
                                </>
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

const input = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all";
