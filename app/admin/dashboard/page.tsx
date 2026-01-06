"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, MessageSquare } from "lucide-react";

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
            .then((res) => res.json())
            .then((data) => {
                setConversations(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Foxo Admin Dashboard</h1>
                        <p className="text-gray-500">Monitor AI conversations and escalations</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <span className="font-bold text-[#8B5DFF]">{conversations.length}</span> Total Conversations
                    </div>
                </header>

                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="grid gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Last Message</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">ID</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {conversations.map((conv) => (
                                        <tr key={conv.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                {conv.escalated ? (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                                                        <AlertTriangle size={14} />
                                                        Escalated
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                                        <CheckCircle size={14} />
                                                        Normal
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(conv.startedAt).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 max-w-md truncate text-gray-700">
                                                {conv.lastMessage}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono text-gray-400">
                                                {conv.id.slice(0, 8)}...
                                            </td>
                                        </tr>
                                    ))}
                                    {conversations.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                                No conversations recorded yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
