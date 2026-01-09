"use client"

import { useState, useRef, useEffect } from "react"
import { Copy, Mail, Check, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function FooterEmail() {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle clicks outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText("contact@foxmenstudio.com")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }



    // Toggle for mobile tap / desktop click
    const toggleOpen = (e: React.MouseEvent) => {
        // Prevent default mailto behavior if we want to show menu first
        // If it's a click, we toggle the menu.
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    return (
        <div
            ref={containerRef}
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <a
                href="mailto:contact@foxmenstudio.com"
                onClick={toggleOpen}
                className="text-[5vw] md:text-4xl lg:text-6xl font-bold border-b border-gray-700 pb-2 hover:text-[#8B5DFF] hover:border-[#8B5DFF] transition-colors whitespace-nowrap cursor-pointer block"
                style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}
            >
                contact@foxmenstudio.com
            </a>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 bottom-full mb-4 flex gap-2 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 min-w-[200px]"
                    >
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors text-white group"
                        >
                            <div className="p-2 bg-black/50 rounded-full group-hover:scale-110 transition-transform">
                                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">{copied ? "Copied!" : "Copy"}</span>
                        </button>

                        <div className="w-px bg-white/20 my-2" />

                        <a
                            href="mailto:contact@foxmenstudio.com"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors text-white group"
                        >
                            <div className="p-2 bg-[#8B5DFF] rounded-full group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">Send</span>
                        </a>

                        {/* Pointy Arrow */}
                        <div className="absolute left-8 -bottom-2 w-4 h-4 bg-white/10 border-r border-b border-white/20 transform rotate-45 backdrop-blur-md" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
