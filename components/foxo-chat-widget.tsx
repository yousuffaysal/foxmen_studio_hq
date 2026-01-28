"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLoading } from "@/components/loading-context";

type Message = {
    role: "user" | "assistant";
    content: string;
};



export function FoxoChatWidget() {
    const { isLoading: isGlobalLoading } = useLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hey there! 👋 I'm **Foxo**, your AI guide at Foxmen Studio. Whether you're dreaming up your next big project or just curious about what we do — I'm here to help! What brings you by today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    conversationId,
                }),
            });

            if (!response.ok) {
                if (response.status === 429) {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", content: "AI is busy. Please wait a moment and try again." }
                    ]);
                    return;
                }
                const errText = await response.text();
                console.error("Backend error:", response.status, errText);
                throw new Error(`Failed to send message (${response.status})`);
            }

            const data = await response.json();
            setConversationId(data.conversationId);

            const assistantMsg: Message = { role: "assistant", content: data.content };
            setMessages((prev) => [...prev, assistantMsg]);
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Sorry, I encountered an error. Please try again.";

            // Handle 429 specifically (Rate Limit)
            if (error.message.includes("429")) {
                errorMessage = "I'm receiving too many requests right now. Please try again in a moment.";
            }

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: errorMessage },
            ]);
        } finally {
            // Simple debounce/rate protection
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    };

    if (isGlobalLoading) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Mobile Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 z-[9998] md:hidden backdrop-blur-[2px]"
                        />

                        {/* Chat Window */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed z-[9999] bottom-0 left-0 right-0 w-full h-[85dvh] bg-[#ffffff] shadow-2xl flex flex-col overflow-hidden rounded-t-[32px] md:rounded-2xl md:right-6 md:left-auto md:bottom-24 md:w-[480px] md:h-[700px] md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                        >
                            {/* Header (Minimal) */}
                            <div className="px-6 py-4 bg-[#36454F] border-b border-white/10 flex items-center justify-between z-10 sticky top-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8B5DFF] to-[#bca4ff] flex items-center justify-center p-0.5">
                                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                                                <img src="https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png" alt="Foxo Logo" className="w-5 h-5 object-contain" />
                                            </div>
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white leading-tight">Foxo AI</h3>
                                        <p className="text-[11px] text-[#bca4ff] font-medium tracking-wide">ALWAYS ONLINE</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages Container */}
                            <div
                                ref={scrollRef}
                                className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6 bg-white scroll-smooth overscroll-y-contain"
                            >
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={idx}
                                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        {/* Avatar for AI */}
                                        {msg.role === "assistant" && (
                                            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                                                <img src="https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png" alt="AI" className="w-5 h-5 object-contain opacity-80" />
                                            </div>
                                        )}

                                        {/* Message Bubble/Text */}
                                        <div
                                            className={`max-w-[85%] text-[15px] leading-7 ${msg.role === "user"
                                                ? "bg-[#f4f4f5] text-gray-900 px-5 py-3 rounded-[24px] rounded-tr-sm"
                                                : "text-gray-800 pr-2"
                                                }`}
                                        >
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    a: ({ node, ...props }) => (
                                                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-[#8B5DFF] font-medium hover:underline break-all" />
                                                    ),
                                                    p: ({ node, ...props }) => (
                                                        <p {...props} className="mb-2 last:mb-0" />
                                                    ),
                                                    ul: ({ node, ...props }) => (
                                                        <ul {...props} className="list-disc pl-4 mb-2 space-y-1" />
                                                    ),
                                                    ol: ({ node, ...props }) => (
                                                        <ol {...props} className="list-decimal pl-4 mb-2 space-y-1" />
                                                    ),
                                                    li: ({ node, ...props }) => (
                                                        <li {...props} className="leading-6" />
                                                    ),
                                                    h3: ({ node, ...props }) => (
                                                        <h3 {...props} className="font-bold text-gray-900 text-lg mb-2 mt-4 first:mt-0" />
                                                    ),
                                                    strong: ({ node, ...props }) => (
                                                        <strong {...props} className="font-semibold text-gray-900" />
                                                    ),
                                                    code: ({ node, ...props }) => (
                                                        <code {...props} className="bg-gray-100 text-sm px-1 py-0.5 rounded font-mono text-gray-800" />
                                                    ),
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                                            <img src="https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png" alt="AI" className="w-5 h-5 object-contain opacity-80" />
                                        </div>
                                        <div className="flex items-center gap-1.5 h-8">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75" />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-50 shrink-0 pb-safe z-20">
                                <form
                                    onSubmit={handleSubmit}
                                    className="relative flex items-center bg-[#f4f4f5] rounded-full ring-1 ring-transparent focus-within:ring-[#8B5DFF]/20 focus-within:bg-white transition-all shadow-sm group"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Message Foxo..."
                                        className="flex-1 bg-transparent px-5 py-3.5 text-sm md:text-[15px] focus:outline-none placeholder:text-gray-400 text-gray-900"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-2 p-2 bg-[#8B5DFF] text-white rounded-full hover:bg-[#7a4ee0] disabled:opacity-0 disabled:scale-75 transition-all shadow-sm"
                                    >
                                        <Send size={16} className={isLoading ? "hidden" : "block"} />
                                        {isLoading && (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        )}
                                    </button>
                                </form>
                                <div className="text-center mt-2">
                                    <p className="text-[10px] text-gray-400">Foxo can make mistakes. Check important info.</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed bottom-6 right-6 z-[9990] w-14 h-14 md:w-20 md:h-20 bg-[#8B5DFF] text-white rounded-full shadow-[0_8px_30px_rgba(139,93,255,0.3)] flex items-center justify-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,93,255,0.4)] ${isOpen ? 'rotate-90' : 'rotate-0'}`}
            >
                {isOpen ? <X className="w-7 h-7 md:w-10 md:h-10" /> : <MessageCircle className="w-7 h-7 md:w-10 md:h-10" strokeWidth={2} />}
            </motion.button>
        </>
    );
}
