"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Upload, X, Link as LinkIcon, Image as ImageIcon, Video, User, Check, Layout, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Project = {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    video?: string;
    gallery?: string[];
    tags: string[];
    techStack?: string[];
    features?: string[];
    link: string;
    goal?: string;
    category?: string;
    role?: string;
    duration?: string;
    challenge?: string;
    solution?: string;
    outcome?: string;
    testimonial?: {
        text: string;
        author: string;
        role: string;
    };
    content?: string; // Markdown
};

const CATEGORIES = [
    "SaaS (Software as a Service)",
    "AI & Machine Learning",
    "Generative AI & LLMs",
    "FinTech (Financial Technology)",
    "EdTech (Educational Technology)",
    "HealthTech & MedTech",
    "E-commerce & Retail",
    "Real Estate & PropTech",
    "Web3, Blockchain & Crypto",
    "Cybersecurity & Privacy",
    "Marketing, AdTech & MarTech",
    "UI/UX Design & Research",
    "Brand Identity & Strategy",
    "Mobile App Development (iOS/Android)",
    "Enterprise Software & B2B",
    "Social Media & Community Platforms",
    "Travel, Hospitality & Tourism",
    "Logistics, Supply Chain & Delivery",
    "GreenTech, CleanTech & Sustainability",
    "Non-Profit, NGO & Social Impact",
    "Entertainment, Media & Streaming",
    "Gaming & Esports",
    "AR / VR / XR (Immersive Tech)",
    "IoT (Internet of Things)",
    "Cloud Computing & DevOps",
    "Data Science & Analytics"
];

const BRAND_COLOR = "#8B5DFF";

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        tags: [],
        gallery: [],
        techStack: [],
        features: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [techStackInput, setTechStackInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const router = useRouter();

    const fetchProjects = async () => {
        try {
            const res = await fetch(`/api/projects`);
            const data = await res.json();
            if (Array.isArray(data)) setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const uploadToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const apiKey = "7eab2a6a17e2b25079c27dc0b2a0f6ef";
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (!data.data || !data.data.url) throw new Error(data.error?.message || "Upload failed");
        return data.data.url;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const imageUrl = await uploadToImgBB(file);
            setCurrentProject(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            alert("Upload failed: " + error);
        } finally {
            setUploading(false);
        }
    };

    const handleGalleryUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const imageUrl = await uploadToImgBB(file);
            const newGallery = [...(currentProject.gallery || [])];
            newGallery[index] = imageUrl;
            setCurrentProject(prev => ({ ...prev, gallery: newGallery }));
        } catch (error) {
            alert("Upload failed: " + error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        const payload = {
            ...currentProject,
            gallery: currentProject.gallery?.filter(Boolean) || [],
            category: selectedCategory
        };

        try {
            const url = isEditing ? `/api/projects/${currentProject.id}` : `/api/projects`;
            const method = isEditing ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setIsDialogOpen(false);
                fetchProjects();
                setCurrentProject({ tags: [], gallery: [], techStack: [], features: [] });
            } else {
                const err = await res.json();
                alert(`Error: ${err.error || "Failed to save"}`);
            }
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) fetchProjects();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const openDialog = (project?: Project) => {
        if (project) {
            setCurrentProject(project);
            setSelectedCategory(project.category || "");
            setIsEditing(true);
        } else {
            setCurrentProject({
                tags: [],
                gallery: [],
                techStack: [],
                features: [],
                testimonial: { text: "", author: "", role: "" }
            });
            setSelectedCategory("");
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12 min-h-screen bg-[#F5F5F7]">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-6xl font-black uppercase tracking-tighter text-black flex items-center gap-4">
                        Studio <Sparkles className="w-12 h-12 text-[#8B5DFF]" />
                    </h1>
                    <p className="text-xl font-bold text-gray-400 mt-2">PROJECT MANAGEMENT INTERFACE v2.0</p>
                </div>
                <Button
                    onClick={() => openDialog()}
                    className="bg-[#8B5DFF] text-white border-4 border-black font-black text-xl px-10 py-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase"
                >
                    <Plus className="mr-2 h-8 w-8" strokeWidth={3} /> New Case Study
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center gap-4 text-2xl font-black text-gray-300 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-gray-200" /> LOADING_VAULT...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white border-4 border-black rounded-[40px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(139,93,255,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(139,93,255,0.3)] transition-all group">
                            <div className="relative h-64 bg-gray-100 border-b-4 border-black overflow-hidden">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="flex items-center justify-center h-full"><ImageIcon className="w-16 h-16 text-gray-200" /></div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button onClick={() => openDialog(project)} className="p-4 bg-white border-4 border-black rounded-2xl hover:bg-[#8B5DFF] hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Edit className="w-6 h-6" /></button>
                                    <button onClick={() => handleDelete(project.id)} className="p-4 bg-white border-4 border-black rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Trash2 className="w-6 h-6" /></button>
                                </div>
                            </div>
                            <div className="p-8">
                                <span className="text-xs font-black uppercase tracking-widest text-[#8B5DFF] mb-2 block">{project.category || "Uncategorized"}</span>
                                <h3 className="text-3xl font-black mb-4 leading-none uppercase">{project.title}</h3>
                                <p className="text-gray-500 font-bold line-clamp-2 mb-6 text-sm leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags?.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="text-[10px] font-black uppercase bg-gray-50 border-2 border-black px-2 py-1 rounded-lg">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[1400px] h-[90vh] bg-white border-8 border-black rounded-[40px] p-0 overflow-hidden shadow-[32px_32px_0px_0px_rgba(0,0,0,0.1)]">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Project Editor</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="meta" className="flex-row h-[85vh]">
                        <div className="w-64 bg-black p-8 flex flex-col gap-4 border-r-4 border-black">
                            <h2 className="text-2xl font-black text-white uppercase mb-8 tracking-tighter">Editor</h2>
                            <TabsList className="flex flex-col bg-transparent h-auto gap-2 p-0">
                                <TabsTrigger value="meta" className="w-full justify-start gap-3 py-4 text-white/40 data-[state=active]:text-white data-[state=active]:bg-[#8B5DFF] rounded-2xl font-black uppercase text-xs border-2 border-transparent data-[state=active]:border-black transition-all"><Layout className="w-4 h-4" /> Identity</TabsTrigger>
                                <TabsTrigger value="media" className="w-full justify-start gap-3 py-4 text-white/40 data-[state=active]:text-white data-[state=active]:bg-[#8B5DFF] rounded-2xl font-black uppercase text-xs border-2 border-transparent data-[state=active]:border-black transition-all"><ImageIcon className="w-4 h-4" /> Assets</TabsTrigger>
                                <TabsTrigger value="content" className="w-full justify-start gap-3 py-4 text-white/40 data-[state=active]:text-white data-[state=active]:bg-[#8B5DFF] rounded-2xl font-black uppercase text-xs border-2 border-transparent data-[state=active]:border-black transition-all"><Plus className="w-4 h-4" /> Case Study</TabsTrigger>
                            </TabsList>
                            <div className="mt-auto pt-8">
                                <Button onClick={handleSubmit} className="w-full bg-[#8B5DFF] text-white border-4 border-white font-black py-8 rounded-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none transition-all uppercase">Save Sync</Button>
                            </div>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto bg-[#FFFFF5] p-12 overscroll-contain"
                            data-lenis-prevent
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            <TabsContent value="meta" className="mt-0 space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest text-[#8B5DFF]">Project Title</Label>
                                        <Input value={currentProject.title || ""} onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') })} className="h-16 border-4 border-black rounded-2xl text-xl font-black bg-white" placeholder="BOUTIQ..." />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Unique Slug</Label>
                                        <Input value={currentProject.slug || ""} onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })} className="h-16 border-4 border-black rounded-2xl font-bold bg-gray-50 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Industry Sector</Label>
                                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full h-16 border-4 border-black rounded-2xl px-4 font-black uppercase text-sm bg-white">
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Short Pitch</Label>
                                    <Textarea value={currentProject.description || ""} onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })} className="h-32 border-4 border-black rounded-2xl p-4 font-bold bg-white" placeholder="Brief summary of the work..." />
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Duration</Label><Input value={currentProject.duration || ""} onChange={(e) => setCurrentProject({ ...currentProject, duration: e.target.value })} className="border-4 border-black rounded-xl h-12 font-bold" /></div>
                                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Our Role</Label><Input value={currentProject.role || ""} onChange={(e) => setCurrentProject({ ...currentProject, role: e.target.value })} className="border-4 border-black rounded-xl h-12 font-bold" /></div>
                                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-gray-400">Live Link</Label><Input value={currentProject.link || ""} onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })} className="border-4 border-black rounded-xl h-12 font-bold" /></div>
                                </div>
                            </TabsContent>



                            <TabsContent value="media" className="mt-0 space-y-12">
                                <div className="space-y-4">
                                    <Label className="text-xs font-black uppercase tracking-widest text-[#8B5DFF]">Master Cover</Label>
                                    <div className="relative h-64 border-4 border-black border-dashed rounded-3xl overflow-hidden flex items-center justify-center bg-white group transition-all hover:bg-gray-50">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                                        {currentProject.image ? (
                                            <img src={currentProject.image} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center"><Upload className="w-12 h-12 mx-auto text-gray-200 mb-2" /><span className="font-black text-gray-300 uppercase">Drop Key Visual</span></div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Gallery Stream (Max 8)</Label>
                                    <div className="grid grid-cols-4 gap-4">
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                                            <div key={i} className="aspect-square border-4 border-black border-dashed rounded-2xl relative bg-white overflow-hidden group">
                                                <input type="file" onChange={(e) => handleGalleryUpload(i, e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                {currentProject.gallery?.[i] ? (
                                                    <img src={currentProject.gallery[i]} className="w-full h-full object-cover" />
                                                ) : <Plus className="w-8 h-8 text-gray-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-black transition-colors" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Reel URL (YouTube/MP4)</Label>
                                    <Input value={currentProject.video || ""} onChange={(e) => setCurrentProject({ ...currentProject, video: e.target.value })} className="h-14 border-4 border-black rounded-2xl font-bold bg-white" placeholder="https://youtube.com/watch?v=..." />
                                </div>
                            </TabsContent>

                            <TabsContent value="content" className="mt-0 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <Label className="text-xs font-black uppercase tracking-widest text-[#8B5DFF]">
                                            Technical Narrative (Markdown)
                                        </Label>

                                        {/* Quick Insert from Gallery */}
                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        try {
                                                            const url = await uploadToImgBB(file);
                                                            const imageMarkdown = `\n![Project Image](${url})\n`;
                                                            setCurrentProject(prev => ({ ...prev, content: (prev.content || "") + imageMarkdown }));
                                                        } catch (err) {
                                                            alert("Failed to upload content image");
                                                        }
                                                    }}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                />
                                                <Button size="sm" variant="outline" className="text-[10px] h-7 bg-white border-2 border-black hover:bg-black hover:text-white uppercase font-bold">
                                                    <ImageIcon className="w-3 h-3 mr-2" /> Upload New
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gallery Picker Strip */}
                                    {currentProject.gallery && currentProject.gallery.length > 0 && (
                                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-3 flex gap-3 overflow-x-auto">
                                            {currentProject.gallery.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group cursor-pointer hover:border-[#8B5DFF] hover:ring-2 ring-[#8B5DFF]/20"
                                                    onClick={() => setCurrentProject(prev => ({ ...prev, content: (prev.content || "") + `\n![Gallery ${idx + 1}](${img})\n` }))}
                                                    title="Click to insert into text"
                                                >
                                                    <img src={img} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <Plus className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-center w-20 h-20 text-[10px] text-gray-400 font-mono text-center leading-tight">
                                                Click to<br />Inject
                                            </div>
                                        </div>
                                    )}

                                    <Textarea
                                        value={currentProject.content || ""}
                                        onChange={(e) => setCurrentProject({ ...currentProject, content: e.target.value })}
                                        className="h-[500px] border-4 border-black rounded-3xl p-8 font-mono text-sm leading-relaxed bg-white focus:bg-gray-50 transition-colors placeholder:text-gray-300"
                                        placeholder="## Architecture\nDescribe the technical layout...\n\n(Click gallery images above to insert them into the story)"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Services / Tech Stack</Label>
                                        <div className="flex gap-2">
                                            <Input value={techStackInput} onChange={e => setTechStackInput(e.target.value)} onKeyDown={e => {
                                                if (e.key === "Enter" && techStackInput.trim()) {
                                                    e.preventDefault();
                                                    setCurrentProject({ ...currentProject, techStack: [...(currentProject.techStack || []), techStackInput] });
                                                    setTechStackInput("");
                                                }
                                            }} className="border-4 border-black rounded-xl h-12 font-bold" />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentProject.techStack?.map((t, i) => (
                                                <span key={i} className="px-3 py-1 bg-black text-white rounded-lg text-xs font-black flex items-center gap-2">{t} <X className="w-3 h-3 cursor-pointer" onClick={() => setCurrentProject({ ...currentProject, techStack: currentProject.techStack?.filter((_, idx) => idx !== i) })} /></span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Tags</Label>
                                        <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => {
                                            if (e.key === "Enter" && tagInput.trim()) {
                                                e.preventDefault();
                                                setCurrentProject({ ...currentProject, tags: [...(currentProject.tags || []), tagInput] });
                                                setTagInput("");
                                            }
                                        }} className="border-4 border-black rounded-xl h-12 font-bold" />
                                        <div className="flex flex-wrap gap-2">
                                            {currentProject.tags?.map((t, i) => (
                                                <span key={i} className="px-3 py-1 bg-[#8B5DFF] text-white rounded-lg text-xs font-black flex items-center gap-2">{t} <X className="w-3 h-3 cursor-pointer" onClick={() => setCurrentProject({ ...currentProject, tags: currentProject.tags?.filter((_, idx) => idx !== i) })} /></span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    );
}
