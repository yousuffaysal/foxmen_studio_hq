"use client";


import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, FileText, Calendar, ArrowRight, X, Upload, Link as LinkIcon, Image as ImageIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Post = {
    id: string;
    title: string;
    slug: string;
    content?: string;
    excerpt?: string;
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

export default function BlogAdmin() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [referencesText, setReferencesText] = useState("");

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Sync references to text area
    useEffect(() => {
        if (currentPost.references && Array.isArray(currentPost.references)) {
            setReferencesText(currentPost.references.join("\n"));
        } else {
            setReferencesText("");
        }
    }, [currentPost]);

    const uploadToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const apiKey = "7eab2a6a17e2b25079c27dc0b2a0f6ef";
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data.data.url;
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const imageUrl = await uploadToImgBB(file);
            setCurrentPost((prev) => ({ ...prev, coverImage: imageUrl }));
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");

        const tags = typeof currentPost.tags === 'string'
            ? (currentPost.tags as string).split(',').map((t: string) => t.trim())
            : currentPost.tags;

        const references = referencesText.split("\n").map(r => r.trim()).filter(r => r !== "");

        const payload = {
            ...currentPost,
            tags,
            references,
            author: currentPost.author || "Admin",
            date: currentPost.date || new Date().toISOString()
        };

        try {
            const url = isEditing
                ? `/api/posts/${currentPost.id}`
                : "/api/posts";

            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setIsDialogOpen(false);
                setCurrentPost({});
                setIsEditing(false);
                fetchPosts();
                alert("Post saved successfully!");
            } else {
                const errorData = await res.json();
                alert(`Error saving post: ${errorData.error}`);
                console.error("Server error:", errorData);
            }
        } catch (error: any) {
            console.error("Failed to save post", error);
            alert(`Network or Logic error: ${error.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts();
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const openEdit = (post: Post) => {
        setCurrentPost({
            ...post,
            tags: post.tags,
            references: post.references
        });
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    // Comment Management State
    const [managingComments, setManagingComments] = useState<Post | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editCommentContent, setEditCommentContent] = useState("");

    const fetchComments = async (postId: string) => {
        try {
            const res = await fetch(`/api/posts/${postId}/comments`);
            const data = await res.json();
            setComments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const openCommentsManager = (post: Post) => {
        setManagingComments(post);
        fetchComments(post.id);
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!confirm("Delete this comment?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`/api/comments/${commentId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (managingComments) fetchComments(managingComments.id);
        } catch (error) {
            console.error("Failed to delete comment", error);
        }
    };

    const handleUpdateComment = async (commentId: string) => {
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`/api/comments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ content: editCommentContent })
            });
            setEditingCommentId(null);
            if (managingComments) fetchComments(managingComments.id);
        } catch (error) {
            console.error("Failed to update comment", error);
        }
    };

    return (
        <div className="space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-black pb-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-2">Blog Posts</h2>
                    <p className="text-lg font-bold text-gray-500">Manage your thoughts and articles.</p>
                </div>
                <Button
                    onClick={() => { setCurrentPost({}); setIsEditing(false); setIsDialogOpen(true); }}
                    className="h-14 px-8 bg-black text-white border-4 border-black hover:bg-[#FFC224] hover:text-black rounded-xl font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
                >
                    <Plus className="mr-2 h-6 w-6" strokeWidth={3} /> NEW POST
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64 border-4 border-dashed border-gray-300 rounded-[32px]">
                    <p className="text-2xl font-bold text-gray-400 animate-pulse">Loading posts...</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-12">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="group relative border-4 border-black rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 aspect-square"
                        >
                            {/* Full Background Image */}
                            {post.coverImage ? (
                                <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                            ) : (
                                <div className="absolute inset-0 bg-[#FFC224] flex items-center justify-center z-0">
                                    <FileText size={100} className="opacity-20" />
                                </div>
                            )}

                            {/* Glass Overlay Content */}
                            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <div className="bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-[24px] text-white shadow-lg space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-black/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                            {(post.tags && post.tags[0]) || 'Article'}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold opacity-80">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black leading-tight line-clamp-2 drop-shadow-md">
                                        {post.title}
                                    </h3>

                                    {/* Actions */}
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => openEdit(post)}
                                            className="flex-1 h-10 flex items-center justify-center gap-2 rounded-lg bg-white/90 text-black font-bold uppercase text-xs hover:bg-[#FFC224] transition-colors shadow-sm"
                                        >
                                            <Edit className="w-3 h-3" /> Edit
                                        </button>
                                        <button
                                            onClick={() => openCommentsManager(post)}
                                            className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/90 text-black hover:bg-[#FFC224] transition-colors shadow-sm"
                                            title="Comments"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/90 text-[#FF4A60] hover:bg-black hover:text-white transition-colors shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card (Empty State) */}
                    {posts.length === 0 && (
                        <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-300 rounded-[32px]">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <FileText className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-300 uppercase mb-2">No Posts Yet</h3>
                            <p className="text-gray-400 font-bold">Start writing your first blog post!</p>
                        </div>
                    )}
                </div>
            )}

            {/* Comments Manager Dialog */}
            <Dialog open={!!managingComments} onOpenChange={(open) => !open && setManagingComments(null)}>
                <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 gap-0 sm:rounded-[32px]">
                    <DialogHeader className="p-8 border-b-4 border-black bg-[#FFC224] relative">
                        <div className="absolute top-6 right-6">
                            <DialogClose className="rounded-full p-2 hover:bg-black/10 transition-colors">
                                <X className="w-6 h-6" />
                            </DialogClose>
                        </div>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Comments</DialogTitle>
                        <DialogDescription className="text-black/70 font-bold">
                            Managing comments for "{managingComments?.title}"
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        {comments.length === 0 ? (
                            <p className="text-center text-gray-400 font-bold py-8">No comments yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-50 border-2 border-black rounded-xl p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="font-bold text-sm">{comment.name} <span className="text-gray-400 font-normal">({comment.email})</span></div>
                                                <div className="text-xs text-gray-400 font-bold">{new Date(comment.createdAt).toLocaleDateString()}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => { setEditingCommentId(comment.id); setEditCommentContent(comment.content); }}
                                                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4 text-black" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 text-[#FF4A60]" />
                                                </button>
                                            </div>
                                        </div>

                                        {editingCommentId === comment.id ? (
                                            <div className="mt-2 space-y-2">
                                                <Textarea
                                                    value={editCommentContent}
                                                    onChange={(e) => setEditCommentContent(e.target.value)}
                                                    className="min-h-[80px] border-2 border-black rounded-lg p-2 text-sm"
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                                                    <Button size="sm" onClick={() => handleUpdateComment(comment.id)}>Save</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm font-medium text-gray-700">{comment.content}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit/Add Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[800px] overflow-y-auto max-h-[90vh] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 gap-0 sm:rounded-[32px]">
                    <DialogHeader className="p-8 border-b-4 border-black bg-[#FFC224] relative">
                        <div className="absolute top-6 right-6">
                            <DialogClose className="rounded-full p-2 hover:bg-black/10 transition-colors">
                                <X className="w-6 h-6" />
                            </DialogClose>
                        </div>
                        <DialogTitle className="text-3xl font-black uppercase tracking-tight">{isEditing ? "Edit Post" : "New Entry"}</DialogTitle>
                        <DialogDescription className="text-black/70 font-bold">
                            {isEditing ? "Refine your thoughts and update content." : "Share something new with the world."}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="font-black uppercase text-xs tracking-widest pl-1">Title</Label>
                                <Input
                                    id="title"
                                    value={currentPost.title || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                    required
                                    className="h-14 border-4 border-black rounded-xl text-lg font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="Enter a catchy title..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug" className="font-black uppercase text-xs tracking-widest pl-1">Slug</Label>
                                <Input
                                    id="slug"
                                    value={currentPost.slug || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                    required
                                    className="h-14 border-4 border-black rounded-xl text-lg font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="url-friendly-slug"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt" className="font-black uppercase text-xs tracking-widest pl-1">Excerpt</Label>
                            <Input
                                id="excerpt"
                                value={currentPost.excerpt || ""}
                                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                className="h-14 border-4 border-black rounded-xl text-lg font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                placeholder="A brief summary..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage" className="font-black uppercase text-xs tracking-widest pl-1">Cover Image</Label>
                            <div className="border-4 border-dashed border-black rounded-xl p-4 text-center hover:bg-gray-50 transition-colors relative cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {currentPost.coverImage ? (
                                    <div className="relative h-48 rounded-lg overflow-hidden border-2 border-black">
                                        <img src={currentPost.coverImage} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white font-bold">
                                            Change Image
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-8">
                                        {uploading ? (
                                            <p className="font-bold text-gray-400 animate-pulse">Uploading...</p>
                                        ) : (
                                            <>
                                                <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                                                <p className="font-bold text-gray-400">Click to Upload Cover</p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="font-black uppercase text-xs tracking-widest pl-1">Content (Markdown)</Label>
                            <Textarea
                                id="content"
                                className="min-h-[250px] border-4 border-black rounded-xl text-lg font-mono focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50 p-6"
                                value={currentPost.content || ""}
                                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                required
                                placeholder="# Start writing..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="tags" className="font-black uppercase text-xs tracking-widest pl-1">Tags (comma separated)</Label>
                                <Input
                                    id="tags"
                                    value={Array.isArray(currentPost.tags) ? currentPost.tags.join(', ') : currentPost.tags || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value.split(',') })}
                                    className="h-14 border-4 border-black rounded-xl text-lg font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="Design, Code, Life..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="references" className="font-black uppercase text-xs tracking-widest pl-1 flex items-center gap-2"><LinkIcon className="w-3 h-3" /> References (one per line)</Label>
                                <Textarea
                                    id="references"
                                    value={referencesText}
                                    onChange={(e) => setReferencesText(e.target.value)}
                                    className="h-32 border-4 border-black rounded-xl text-sm font-mono focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="https://example.com&#10;https://source.org"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-4 border-black border-dashed">
                            <h3 className="col-span-full font-black uppercase text-xl">Author Details</h3>

                            <div className="space-y-2">
                                <Label htmlFor="author" className="font-black uppercase text-xs tracking-widest pl-1">Author Name</Label>
                                <Input
                                    id="author"
                                    value={currentPost.author || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                                    className="h-14 border-4 border-black rounded-xl text-lg font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="e.g. Alex Fox"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="authorRole" className="font-black uppercase text-xs tracking-widest pl-1">Role / Job Title</Label>
                                <Input
                                    id="authorRole"
                                    value={currentPost.authorRole || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, authorRole: e.target.value })}
                                    className="h-14 border-4 border-black rounded-xl text-lg font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="e.g. Lead Engineer"
                                />
                            </div>

                            <div className="space-y-2 col-span-full">
                                <Label htmlFor="authorBio" className="font-black uppercase text-xs tracking-widest pl-1">Mini Bio</Label>
                                <Textarea
                                    id="authorBio"
                                    value={currentPost.authorBio || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, authorBio: e.target.value })}
                                    className="h-24 border-4 border-black rounded-xl text-sm font-medium focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="Short bio about the author..."
                                />
                            </div>

                            <div className="space-y-2 col-span-full">
                                <Label className="font-black uppercase text-xs tracking-widest pl-1">Author Image</Label>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-24 h-24 bg-gray-100 rounded-full border-4 border-black overflow-hidden shrink-0">
                                        {currentPost.authorImage ? (
                                            <img src={currentPost.authorImage} alt="Author" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                setUploading(true);
                                                try {
                                                    const url = await uploadToImgBB(file);
                                                    setCurrentPost(prev => ({ ...prev, authorImage: url }));
                                                } finally {
                                                    setUploading(false);
                                                }
                                            }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="text-sm text-gray-500 font-bold">
                                        {uploading ? "Uploading..." : "Click circle to upload photo"}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="authorTwitter" className="font-black uppercase text-xs tracking-widest pl-1">Twitter URL</Label>
                                <Input
                                    id="authorTwitter"
                                    value={currentPost.authorTwitter || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, authorTwitter: e.target.value })}
                                    className="h-14 border-4 border-black rounded-xl text-sm font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="authorLinkedin" className="font-black uppercase text-xs tracking-widest pl-1">LinkedIn URL</Label>
                                <Input
                                    id="authorLinkedin"
                                    value={currentPost.authorLinkedin || ""}
                                    onChange={(e) => setCurrentPost({ ...currentPost, authorLinkedin: e.target.value })}
                                    className="h-14 border-4 border-black rounded-xl text-sm font-bold focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50"
                                    placeholder="https://linkedin.com/..."
                                />
                            </div>
                        </div>

                        <DialogFooter className="pt-4 border-t-4 border-black border-dashed">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto h-14 px-8 bg-black text-white text-lg font-bold rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all uppercase tracking-wider"
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
