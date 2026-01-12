"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Upload, X, Link as LinkIcon, Github, Image as ImageIcon, Video, Layers, List, User } from "lucide-react";
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
    DialogFooter
} from "@/components/ui/dialog";

type Project = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    video?: string;
    gallery?: string[];
    tags: string[];
    techStack?: string[]; // Dynamic Tech Stack
    features?: string[];
    link: string;
    // github removed
    goal?: string;
    category?: string;
    role?: string;
    duration?: string;
    challenge?: string;
    solution?: string;
    outcome?: string;
    process?: any; // JSON
    results?: any; // JSON
    testimonial?: any; // JSON
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
    "Data Science & Analytics",
    "LegalTech",
    "HRTech (Human Resources)",
    "AgriTech (Agriculture)",
    "Automotive & Mobility",
    "Other"
];

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [techStackInput, setTechStackInput] = useState(""); // For tech stack input
    // Category state
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [customCategory, setCustomCategory] = useState<string>("");

    // Admin helper state (text areas for lists)
    const [featuresText, setFeaturesText] = useState("");

    const router = useRouter();

    const fetchProjects = async () => {
        try {
            const res = await fetch(`/api/projects`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setProjects(data);
            } else {
                console.error("Failed to load projects:", data);
                setProjects([]);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Sync fields to local state when editing
    useEffect(() => {
        if (currentProject.features && Array.isArray(currentProject.features)) {
            setFeaturesText(currentProject.features.join("\n"));
        } else {
            setFeaturesText("");
        }

        // Init Category
        if (currentProject.category) {
            if (CATEGORIES.includes(currentProject.category)) {
                setSelectedCategory(currentProject.category);
                setCustomCategory("");
            } else {
                setSelectedCategory("Other");
                setCustomCategory(currentProject.category);
            }
        } else {
            setSelectedCategory("");
            setCustomCategory("");
        }
    }, [currentProject]);

    const uploadToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data.data.url;
    };

    const handleGalleryUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const imageUrl = await uploadToImgBB(file);
            const newGallery = currentProject.gallery ? [...currentProject.gallery] : [];
            newGallery[index] = imageUrl;
            setCurrentProject(prev => ({ ...prev, gallery: newGallery }));
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const imageUrl = await uploadToImgBB(file);
            setCurrentProject(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    // ... (helper functions)

    // In Render, Media Tab:
    /*
                            <TabsContent value="media" className="p-8 space-y-6 pt-4">
                                <div className="space-y-4">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Project Cover Image (Main)</Label>
                                    <div className="border-4 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 hover:border-black transition-all group relative cursor-pointer">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        {currentProject.image ? (
                                            <div className="relative h-48 rounded-lg overflow-hidden border-2 border-black">
                                                <img src={currentProject.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="py-8"><Upload className="w-12 h-12 mx-auto text-gray-300 mb-2"/><p className="font-bold text-gray-400">Upload Cover</p></div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t-2 border-dashed border-gray-200">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Bento Grid Images</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[0, 1, 2].map((idx) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="text-[10px] font-bold uppercase text-gray-400">
                                                    {idx === 0 ? "Main (Large)" : idx === 1 ? "Top (Mobile)" : "Bottom (System)"}
                                                </div>
                                                <div className="aspect-square border-4 border-dashed border-gray-200 rounded-xl flex items-center justify-center relative hover:border-black transition-all group overflow-hidden bg-gray-50">
                                                    <input type="file" accept="image/*" onChange={(e) => handleGalleryUpload(idx, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                    {currentProject.gallery && currentProject.gallery[idx] ? (
                                                        <img src={currentProject.gallery[idx]} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Plus className="text-gray-300 group-hover:text-black" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Video URL</Label>
                                    <Input value={currentProject.video || ""} onChange={(e) => setCurrentProject({ ...currentProject, video: e.target.value })} className="border-2" placeholder="e.g. YouTube or mp4 link" />
                                </div>
                            </TabsContent>
    */

    // Tech Stack Handlers
    const handleAddTech = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && techStackInput.trim()) {
            e.preventDefault();
            const newStack = currentProject.techStack ? [...currentProject.techStack, techStackInput.trim()] : [techStackInput.trim()];
            setCurrentProject({ ...currentProject, techStack: newStack });
            setTechStackInput("");
        }
    };

    const handleRemoveTech = (index: number) => {
        const newStack = currentProject.techStack?.filter((_, i) => i !== index);
        setCurrentProject({ ...currentProject, techStack: newStack });
    };

    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        const currentTags = Array.isArray(currentProject.tags) ? currentProject.tags : [];
        if (!currentTags.includes(tagInput.trim())) {
            setCurrentProject({ ...currentProject, tags: [...currentTags, tagInput.trim()] });
        }
        setTagInput("");
    };

    const removeTag = (tagToRemove: string) => {
        const currentTags = Array.isArray(currentProject.tags) ? currentProject.tags : [];
        setCurrentProject({ ...currentProject, tags: currentTags.filter(t => t !== tagToRemove) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");

        // Process Features (split by line)
        const featuresArray = featuresText.split("\n").map(f => f.trim()).filter(f => f !== "");

        // Determine final category
        let finalCategory = selectedCategory;
        if (selectedCategory === "Other") {
            finalCategory = customCategory;
        }

        const payload = {
            ...currentProject,
            tags: Array.isArray(currentProject.tags) ? currentProject.tags : [],
            features: featuresArray,
            category: finalCategory
        };

        try {
            const url = isEditing
                ? `/api/projects/${currentProject._id}`
                : `/api/projects`;

            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("adminToken");
                router.push("/admin/login");
                return;
            }

            const data = await res.json();

            if (res.ok) {
                setIsDialogOpen(false);
                setCurrentProject({});
                setIsEditing(false);
                fetchProjects();
            } else {
                alert(`Failed to save project: ${data.message}`);
            }
        } catch (error) {
            console.error("Failed to save project", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const token = localStorage.getItem("adminToken");

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("adminToken");
                router.push("/admin/login");
                return;
            }

            if (!res.ok) {
                const data = await res.text(); // Parse text in case JSON fails or is empty
                try {
                    const json = JSON.parse(data);
                    alert(`Failed to delete: ${json.message}`);
                } catch {
                    alert(`Failed to delete: ${res.statusText}`);
                }
                return;
            }

            // Success
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project", error);
            alert("An error occurred while deleting the project");
        }
    };

    const openEdit = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const openDialog = (project?: Project) => {
        if (project) {
            setCurrentProject(project);
            setIsEditing(true);
        } else {
            setCurrentProject({
                tags: [],
                gallery: [],
                features: [],
                techStack: []
            });
            setFeaturesText("");
            setSelectedCategory("");
            setCustomCategory("");
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-5xl font-black uppercase tracking-tight mb-2">Projects</h1>
                    <p className="text-gray-500 font-bold text-lg">Manage your creative portfolio.</p>
                </div>
                <Button
                    onClick={() => { openDialog(); }}
                    className="bg-[#FF4A60] text-white border-4 border-black hover:bg-black font-bold text-xl px-8 py-6 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                >
                    <Plus className="mr-2 h-6 w-6" /> Add Project
                </Button>
            </div>

            {loading ? (
                <div className="text-xl font-bold text-gray-400">Loading projects...</div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white border-4 border-black rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group flex flex-col">
                            {/* Image Area */}
                            <div className="relative h-48 bg-gray-100 border-b-4 border-black overflow-hidden">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300">
                                        <ImageIcon className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(project)} className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FFC224] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(project._id)} className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FF4A60] hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-2xl font-black mb-2 leading-tight">{project.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags?.map((tag, i) => (
                                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded border border-black">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 font-medium line-clamp-2 mb-6 flex-1 text-sm">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[800px] bg-white border-4 border-black rounded-[32px] shadow-[16px_16px_0px_0px_rgba(0,0,0,0.2)] p-0 overflow-hidden max-h-[90vh]">
                    <DialogHeader className="p-8 pb-4 border-b-2 border-gray-100">
                        <DialogTitle className="text-3xl font-black uppercase tracking-tight">
                            {isEditing ? "Edit Project" : "New Project"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="overflow-y-auto max-h-[70vh]">
                        <Tabs defaultValue="overview" className="w-full">
                            <div className="px-8 pt-4">
                                <TabsList className="bg-gray-100 p-1 rounded-xl w-full grid grid-cols-4">
                                    <TabsTrigger value="overview" className="rounded-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white">Overview</TabsTrigger>
                                    <TabsTrigger value="story" className="rounded-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white">Story</TabsTrigger>
                                    <TabsTrigger value="media" className="rounded-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white">Media</TabsTrigger>
                                    <TabsTrigger value="details" className="rounded-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white">Details</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="overview" className="p-8 space-y-6 pt-4">
                                <div className="space-y-2">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Category</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="" disabled>Select a Category</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {selectedCategory === "Other" && (
                                        <Input
                                            placeholder="Type custom category..."
                                            value={customCategory}
                                            onChange={(e) => setCustomCategory(e.target.value)}
                                            className="mt-2 border-2"
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Tech Stack</Label>
                                    <div className="flex gap-2 flex-wrap mb-2">
                                        {currentProject.techStack?.map((tech, index) => (
                                            <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center border border-black">
                                                {tech}
                                                <button onClick={() => handleRemoveTech(index)} className="ml-2 hover:text-red-500">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <Input
                                        placeholder="Type tech (e.g. React) and press Enter"
                                        value={techStackInput}
                                        onChange={(e) => setTechStackInput(e.target.value)}
                                        onKeyDown={handleAddTech}
                                        className="border-2 border-black rounded-xl"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase text-xs text-gray-500">Title</Label>
                                        <Input
                                            value={currentProject.title || ""}
                                            onChange={(e) => {
                                                const title = e.target.value;
                                                const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                                setCurrentProject({ ...currentProject, title, slug: currentProject.slug ? currentProject.slug : slug });
                                            }}
                                            className="font-bold border-2"
                                            placeholder="Project Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase text-xs text-gray-500">Slug</Label>
                                        <Input
                                            value={currentProject.slug || ""}
                                            onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                                            className="font-mono text-sm border-2"
                                            placeholder="project-slug"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Description</Label>
                                    <Textarea
                                        value={currentProject.description || ""}
                                        onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                        className="h-24 border-2"
                                        placeholder="Brief description..."
                                    />
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase text-xs text-gray-500">Goal</Label>
                                        <Input value={currentProject.goal || ""} onChange={(e) => setCurrentProject({ ...currentProject, goal: e.target.value })} className="border-2" placeholder="Project Goal" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase text-xs text-gray-500">Role</Label>
                                        <Input value={currentProject.role || ""} onChange={(e) => setCurrentProject({ ...currentProject, role: e.target.value })} className="border-2" placeholder="e.g. Lead Dev" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase text-xs text-gray-500">Duration</Label>
                                        <Input value={currentProject.duration || ""} onChange={(e) => setCurrentProject({ ...currentProject, duration: e.target.value })} className="border-2" placeholder="e.g. 3 Months" />
                                    </div>
                                </div>



                                <div className="grid md:grid-cols-2 gap-6 pb-2">
                                    <div className="space-y-2">
                                        <Label className="font-bold uppercase text-xs text-gray-500">Live Site URL</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                            <Input value={currentProject.link || ""} onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })} className="pl-10 border-2" placeholder="https://example.com" />
                                        </div>
                                    </div>
                                    {/* GitHub URL section removed */}
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Tags (Tech Stack)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                            className="border-2"
                                            placeholder="Type tag & Enter"
                                        />
                                        <Button type="button" onClick={handleAddTag} className="bg-[#FFC224] text-black hover:bg-black hover:text-[#FFC224] border-2 border-black"><Plus className="w-5 h-5" /></Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {currentProject.tags?.map((tag, i) => (
                                            <span key={i} className="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">{tag} <button onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button></span>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>



                            <TabsContent value="story" className="p-8 space-y-6 pt-4">
                                <div className="space-y-2">
                                    <Label className="font-bold uppercase text-xs text-gray-500 text-[#FF4A60]">The Challenge</Label>
                                    <Textarea value={currentProject.challenge || ""} onChange={(e) => setCurrentProject({ ...currentProject, challenge: e.target.value })} className="min-h-[100px] border-2" placeholder="What was the problem?" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold uppercase text-xs text-gray-500 text-[#FFC224]">The Solution</Label>
                                    <Textarea value={currentProject.solution || ""} onChange={(e) => setCurrentProject({ ...currentProject, solution: e.target.value })} className="min-h-[100px] border-2" placeholder="How did you solve it?" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold uppercase text-xs text-gray-500 text-[#4AFF93]">The Outcome</Label>
                                    <Textarea value={currentProject.outcome || ""} onChange={(e) => setCurrentProject({ ...currentProject, outcome: e.target.value })} className="min-h-[100px] border-2" placeholder="What were the results?" />
                                </div>
                                <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl space-y-4">
                                    <Label className="font-bold uppercase text-xs text-gray-500 flex items-center gap-2"><User className="w-4 h-4" /> Client Testimonial</Label>
                                    <Textarea
                                        value={currentProject.testimonial?.text || ""}
                                        onChange={(e) => setCurrentProject({
                                            ...currentProject,
                                            testimonial: { ...currentProject.testimonial, text: e.target.value }
                                        })}
                                        className="h-24 border-2 bg-white"
                                        placeholder="Quote..."
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            value={currentProject.testimonial?.author || ""}
                                            onChange={(e) => setCurrentProject({
                                                ...currentProject,
                                                testimonial: { ...currentProject.testimonial, author: e.target.value }
                                            })}
                                            className="border-2 bg-white"
                                            placeholder="Author Name"
                                        />
                                        <Input
                                            value={currentProject.testimonial?.role || ""}
                                            onChange={(e) => setCurrentProject({
                                                ...currentProject,
                                                testimonial: { ...currentProject.testimonial, role: e.target.value }
                                            })}
                                            className="border-2 bg-white"
                                            placeholder="Author Role"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="media" className="p-8 space-y-6 pt-4">
                                <div className="space-y-4">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Project Cover Image (Main)</Label>
                                    <div className="border-4 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 hover:border-black transition-all group relative cursor-pointer">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        {currentProject.image ? (
                                            <div className="relative h-48 rounded-lg overflow-hidden border-2 border-black">
                                                <img src={currentProject.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="py-8"><Upload className="w-12 h-12 mx-auto text-gray-300 mb-2" /><p className="font-bold text-gray-400">Upload Cover</p></div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t-2 border-dashed border-gray-200">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Bento Grid Images</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[0, 1, 2].map((idx) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="text-[10px] font-bold uppercase text-gray-400">
                                                    {idx === 0 ? "Main (Large)" : idx === 1 ? "Top (Mobile)" : "Bottom (System)"}
                                                </div>
                                                <div className="aspect-square border-4 border-dashed border-gray-200 rounded-xl flex items-center justify-center relative hover:border-black transition-all group overflow-hidden bg-gray-50">
                                                    <input type="file" accept="image/*" onChange={(e) => handleGalleryUpload(idx, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                    {currentProject.gallery && currentProject.gallery[idx] ? (
                                                        <img src={currentProject.gallery[idx]} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Plus className="text-gray-300 group-hover:text-black" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Video URL</Label>
                                    <Input value={currentProject.video || ""} onChange={(e) => setCurrentProject({ ...currentProject, video: e.target.value })} className="border-2" placeholder="e.g. YouTube or mp4 link" />
                                </div>
                            </TabsContent>

                            <TabsContent value="details" className="p-8 space-y-6 pt-4">
                                <div className="space-y-2">
                                    <Label className="font-bold uppercase text-xs text-gray-500">Features List (One per line)</Label>
                                    <Textarea
                                        value={featuresText}
                                        onChange={(e) => setFeaturesText(e.target.value)}
                                        className="min-h-[150px] border-2 font-mono text-sm"
                                        placeholder="Real-time Analytics&#10;Dark Mode&#10;Mobile Responsive"
                                    />
                                </div>
                                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl text-sm font-medium text-yellow-800">
                                    <p>Advanced fields like <strong>Process</strong> and <strong>Results</strong> are currently editable via raw JSON inputs in database or future updates.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="p-8 border-t-2 border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-12 px-6 font-bold text-gray-500">Cancel</Button>
                        <Button onClick={handleSubmit} className="h-12 px-8 bg-black text-white rounded-xl font-bold uppercase hover:bg-[#FF4A60] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                            {isEditing ? "Update Project" : "Create Project"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
}
