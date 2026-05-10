"use client";

import { useState, useEffect } from "react";
import { Trash2, Mail, Calendar, User, Inbox, ChevronLeft, Phone, Building, Tag } from "lucide-react";
import { format } from "date-fns";

type Message = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    projectType?: string;
    country?: string;
    subject?: string;
    message: string;
    createdAt: string;
};

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch("/api/messages", { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 401) { window.location.href = "/admin/login"; return; }
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
                if (data.length > 0) setSelectedId(data[0].id);
            }
        } catch {}
        finally { setLoading(false); }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this message?")) return;
        setDeleting(true);
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`/api/messages/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
            const remaining = messages.filter(m => m.id !== id);
            setMessages(remaining);
            setSelectedId(remaining.length > 0 ? remaining[0].id : null);
        } finally { setDeleting(false); }
    };

    const selected = messages.find(m => m.id === selectedId);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Left: message list */}
            <div className={`flex flex-col w-full lg:w-72 xl:w-80 flex-shrink-0 border-r border-slate-200 bg-white ${selectedId ? "hidden lg:flex" : "flex"}`}>
                <div className="px-5 py-5 border-b border-slate-200">
                    <h1 className="text-lg font-semibold text-slate-900">Inbox</h1>
                    <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <Inbox size={13} /> {messages.length} messages
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 space-y-2">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="p-3 rounded-lg animate-pulse space-y-1.5">
                                    <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-16 text-slate-400 px-4 text-center">
                            <Mail size={32} strokeWidth={1} className="mb-3" />
                            <p className="text-sm">No messages yet</p>
                        </div>
                    ) : (
                        <div className="p-2 space-y-0.5">
                            {messages.map(msg => (
                                <button
                                    key={msg.id}
                                    onClick={() => setSelectedId(msg.id)}
                                    className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${selectedId === msg.id ? "bg-slate-900 text-white" : "hover:bg-slate-50 text-slate-900"}`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className={`text-xs font-medium truncate ${selectedId === msg.id ? "text-slate-300" : "text-slate-500"}`}>
                                            {msg.subject || "No Subject"}
                                        </span>
                                        <span className={`text-xs flex-shrink-0 ${selectedId === msg.id ? "text-slate-400" : "text-slate-400"}`}>
                                            {format(new Date(msg.createdAt), "MMM d")}
                                        </span>
                                    </div>
                                    <p className={`text-sm font-medium mt-0.5 truncate ${selectedId === msg.id ? "text-white" : "text-slate-900"}`}>
                                        {msg.name}
                                    </p>
                                    <p className={`text-xs mt-0.5 truncate ${selectedId === msg.id ? "text-slate-400" : "text-slate-500"}`}>
                                        {msg.email}
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right: detail view */}
            <div className={`flex-1 overflow-y-auto ${selectedId ? "flex" : "hidden lg:flex"} flex-col`}>
                {selected ? (
                    <div className="flex-1 p-6 lg:p-8 max-w-2xl mx-auto w-full">
                        {/* Mobile back */}
                        <button onClick={() => setSelectedId(null)} className="lg:hidden flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-5 transition-colors">
                            <ChevronLeft size={16} /> Back to inbox
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-slate-900">{selected.subject || "No Subject"}</h2>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                                    <User size={14} className="text-slate-400" /> {selected.name}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                                    <Calendar size={14} className="text-slate-400" />
                                    {format(new Date(selected.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                </span>
                            </div>
                        </div>

                        {/* Meta cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            <MetaCard icon={Mail} label="Email">
                                <a href={`mailto:${selected.email}`} className="text-indigo-600 hover:underline text-sm">{selected.email}</a>
                            </MetaCard>
                            {selected.phone && (
                                <MetaCard icon={Phone} label="Phone">
                                    <span className="text-sm text-slate-900">{selected.phone}</span>
                                </MetaCard>
                            )}
                            {selected.company && (
                                <MetaCard icon={Building} label="Company">
                                    <span className="text-sm text-slate-900">{selected.company}</span>
                                </MetaCard>
                            )}
                            {selected.projectType && (
                                <MetaCard icon={Tag} label="Project Type">
                                    <span className="text-sm text-slate-900">{selected.projectType}</span>
                                </MetaCard>
                            )}
                            {selected.country && (
                                <MetaCard icon={User} label="Country">
                                    <span className="text-sm text-slate-900">{selected.country}</span>
                                </MetaCard>
                            )}
                        </div>

                        {/* Message body */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Message</p>
                            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <a
                                href={`mailto:${selected.email}?subject=Re: ${selected.subject || ""}`}
                                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                            >
                                <Mail size={14} /> Reply
                            </a>
                            <button
                                onClick={() => handleDelete(selected.id)}
                                disabled={deleting}
                                className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 px-4 py-2 rounded-lg border border-red-200 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-60"
                            >
                                <Trash2 size={14} /> {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                        <Mail size={40} strokeWidth={1} className="mb-3" />
                        <p className="text-sm">Select a message to view</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function MetaCard({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <Icon size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
                <p className="text-xs font-medium text-slate-500 mb-0.5">{label}</p>
                {children}
            </div>
        </div>
    );
}
