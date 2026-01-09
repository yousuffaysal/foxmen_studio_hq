"use client";

import { useState, useEffect } from "react";
import { Trash2, Mail, Calendar, User, MessageSquare, Phone, Building, Wallet, Quote, Inbox, ChevronRight } from "lucide-react";
import { format } from "date-fns";

type Message = {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
};

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch("https://paperfolio-backend.vercel.app/api/messages", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                if (res.status === 401) {
                    console.error("Unauthorized. Redirecting to login.");
                    window.location.href = "/admin"; // Redirect to login
                    return;
                }
                throw new Error(`API Error: ${res.status}`);
            }

            const data = await res.json();

            if (Array.isArray(data)) {
                setMessages(data);
                if (data.length > 0 && !selectedMessageId) {
                    setSelectedMessageId(data[0]._id);
                }
            } else {
                console.error("API returned non-array:", data);
                setMessages([]);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`https://paperfolio-backend.vercel.app/api/messages/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            // Refetch and adjust selection
            const remaining = messages.filter(m => m._id !== id);
            setMessages(remaining);
            if (selectedMessageId === id) {
                setSelectedMessageId(remaining.length > 0 ? remaining[0]._id : null);
            }
        } catch (error) {
            console.error("Failed to delete message", error);
        }
    };

    const selectedMessage = messages.find(m => m._id === selectedMessageId);

    // Helper to parse the message content
    const renderMessageContent = (rawMessage: string) => {
        // Check if message looks structured (has multiple colons and newlines)
        if (!rawMessage.includes(':') || !rawMessage.includes('\n')) {
            return (
                <div className="flex-grow bg-[#F8F9FA] rounded-[20px] border-2 border-gray-200 p-8 mb-8 relative">
                    <Quote className="absolute top-6 left-6 w-8 h-8 text-gray-200" />
                    <div className="relative z-10 pl-8">
                        <p className="text-lg font-medium text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {rawMessage}
                        </p>
                    </div>
                </div>
            );
        }

        const lines = rawMessage.split('\n');
        const details: Record<string, string> = {};
        let actualMessage = "";

        lines.forEach(line => {
            const splitIndex = line.indexOf(':');
            if (splitIndex !== -1) {
                const key = line.substring(0, splitIndex).trim().toLowerCase();
                const value = line.substring(splitIndex + 1).trim();

                if (key === 'message') {
                    actualMessage = value;
                } else if (['phone', 'company', 'budget', 'name'].includes(key)) {
                    details[key] = value;
                } else {
                    if (actualMessage) actualMessage += "\n" + line;
                }
            } else {
                if (actualMessage) actualMessage += "\n" + line;
            }
        });

        if (Object.keys(details).length === 0 && !actualMessage) {
            actualMessage = rawMessage;
        }

        return (
            <div className="space-y-6 mb-6">
                {/* Structured Data Grid */}
                {Object.keys(details).length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {details['phone'] && (
                            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-200 flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg border border-gray-200 text-black">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Phone</p>
                                    <p className="font-bold text-gray-900 text-sm truncate">{details['phone']}</p>
                                </div>
                            </div>
                        )}
                        {details['company'] && (
                            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-200 flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg border border-gray-200 text-black">
                                    <Building className="w-4 h-4" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Company</p>
                                    <p className="font-bold text-gray-900 text-sm truncate">{details['company']}</p>
                                </div>
                            </div>
                        )}
                        {details['budget'] && (
                            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-200 flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg border border-gray-200 text-black">
                                    <Wallet className="w-4 h-4" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Budget</p>
                                    <p className="font-bold text-gray-900 text-sm truncate">{details['budget']}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Actual Message Area */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-[24px] border-4 border-black p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                    {/* Watermark Quote Icon - Top Right */}
                    <Quote className="absolute -top-6 -right-6 w-48 h-48 text-gray-100/50 -rotate-12 pointer-events-none" />

                    <div className="relative z-10">
                        <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-6 inline-block bg-[#FFC224] px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Message
                        </h4>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed whitespace-pre-wrap font-heading">
                            {actualMessage || rawMessage}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full lg:h-[calc(100vh-100px)]">
            <div className={`mb-8 ${selectedMessageId ? "hidden lg:block" : "block"}`}>
                <h1 className="text-5xl font-bold mb-2">Inbox</h1>
                <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
                    <Inbox className="w-5 h-5" />
                    {messages.length} queries
                </p>
            </div>

            {loading ? (
                <div className="text-xl font-bold text-gray-400">Loading messages...</div>
            ) : messages.length === 0 ? (
                <div className="bg-gray-100 rounded-[24px] border-4 border-black p-12 text-center text-gray-500 font-bold text-xl">
                    No messages found.
                </div>
            ) : (
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden min-h-0 relative">

                    {/* LEFT COLUMN: Message List */}
                    <div className={`
                        lg:col-span-4 overflow-y-auto pr-2 space-y-3 pb-8 transition-all duration-300
                        ${selectedMessageId ? "hidden lg:block" : "block w-full"}
                    `}>
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                onClick={() => setSelectedMessageId(msg._id)}
                                className={`
                                    cursor-pointer p-5 rounded-2xl border-2 transition-all group relative
                                    ${selectedMessageId === msg._id
                                        ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(80,80,80,1)]"
                                        : "bg-white border-gray-200 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] text-gray-900"
                                    }
                                `}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${selectedMessageId === msg._id ? "bg-white/20 border-transparent text-white" : "bg-gray-100 border-gray-200 text-gray-500"}`}>
                                        {format(new Date(msg.createdAt), 'MMM dd')}
                                    </span>
                                    {selectedMessageId === msg._id && <ChevronRight className="w-5 h-5 text-[#FFC224]" />}
                                </div>
                                <h4 className="font-bold text-lg leading-tight mb-1 truncate">{msg.subject || "No Subject"}</h4>
                                <p className={`text-sm truncate ${selectedMessageId === msg._id ? "text-gray-300" : "text-gray-500"}`}>
                                    {msg.name}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Detail View */}
                    <div className={`
                        lg:col-span-8 overflow-y-auto pb-8 min-h-[500px] transition-all duration-300
                        ${selectedMessageId ? "block w-full animate-slide-in-right lg:animate-none" : "hidden lg:block"}
                    `}>
                        {selectedMessage ? (
                            <div className="bg-white border-4 border-black rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden h-full">

                                {/* Mobile Back Button */}
                                <div className="lg:hidden mb-6">
                                    <button
                                        onClick={() => setSelectedMessageId(null)}
                                        className="flex items-center gap-2 text-gray-500 font-bold hover:text-black transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5 rotate-180" /> Back to Inbox
                                    </button>
                                </div>

                                {/* Decorative Top Accent */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>

                                {/* Header: Date & Sender Badge */}
                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                        <Calendar className="w-4 h-4" />
                                        {format(new Date(selectedMessage.createdAt), 'MMM dd, yyyy, h:mm a')}
                                    </div>
                                    <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFC224] text-black border-2 border-black text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                        <User className="w-4 h-4" />
                                        {selectedMessage.name}
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="flex items-center gap-3 mb-8 pb-8 border-b-2 border-dashed border-gray-200">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-black shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">Reply To</p>
                                        <a href={`mailto:${selectedMessage.email}`} className="text-lg font-bold hover:underline decoration-2 underline-offset-4 break-all">{selectedMessage.email}</a>
                                    </div>
                                </div>

                                {/* Subject */}
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 leading-tight">
                                    {selectedMessage.subject || "No Subject"}
                                </h3>

                                {/* Render Smart Content */}
                                <div className="flex-grow">
                                    {renderMessageContent(selectedMessage.message)}
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-8 border-t-2 border-gray-100 flex justify-end mt-auto">
                                    <button
                                        onClick={() => handleDelete(selectedMessage._id)}
                                        className="w-full md:w-auto inline-flex justify-center items-center px-8 py-4 rounded-2xl bg-white text-[#FF4A60] border-4 border-[#FF4A60] hover:bg-[#FF4A60] hover:text-white font-bold text-lg transition-all hover:shadow-[6px_6px_0px_0px_rgba(255,74,96,0.3)] hover:-translate-y-1"
                                    >
                                        <Trash2 className="w-5 h-5 mr-3" />
                                        Delete Message
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full hidden lg:flex flex-col items-center justify-center text-gray-400 border-4 border-dashed border-gray-200 rounded-[32px]">
                                <Mail className="w-16 h-16 mb-4 opacity-20" />
                                <p className="text-xl font-bold">Select a message to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
