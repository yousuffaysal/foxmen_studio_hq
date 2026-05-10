"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, MessageSquare, Clock } from "lucide-react";

type Conversation = {
    id: string;
    startedAt: string;
    lastMessage: string;
    escalated: boolean;
    escalationStatus: string;
};

export default function AdminDashboard() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/conversations")
            .then(r => r.json())
            .then(d => { setConversations(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const escalated = conversations.filter(c => c.escalated).length;
    const normal = conversations.length - escalated;

    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-slate-900">AI Conversations</h1>
                <p className="text-sm text-slate-500 mt-0.5">Monitor Foxo chat sessions and escalations</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Total", value: conversations.length, icon: MessageSquare, color: "text-slate-600", bg: "bg-slate-100" },
                    { label: "Normal", value: normal, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Escalated", value: escalated, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className={`inline-flex w-9 h-9 rounded-lg ${bg} items-center justify-center mb-3`}>
                            <Icon size={16} className={color} />
                        </div>
                        <p className="text-2xl font-semibold text-slate-900">{loading ? "—" : value}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-900">Recent Sessions</h2>
                </div>

                {loading ? (
                    <div className="py-16 text-center text-sm text-slate-400">Loading...</div>
                ) : conversations.length === 0 ? (
                    <div className="py-16 text-center text-sm text-slate-400">No conversations yet.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Started</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Last Message</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {conversations.map(conv => (
                                <tr key={conv.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3.5">
                                        {conv.escalated ? (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1">
                                                <AlertTriangle size={11} /> Escalated
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                                                <CheckCircle size={11} /> Normal
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={12} className="text-slate-400" />
                                            {new Date(conv.startedAt).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-700 max-w-xs truncate">{conv.lastMessage}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">{conv.id.slice(0, 8)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
