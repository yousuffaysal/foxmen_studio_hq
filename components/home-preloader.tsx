"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLoading } from "@/components/loading-context"

export function HomePreloader() {
    const { isLoading, setIsLoading } = useLoading()
    // No local state needed for isLoading, but if we need unique logic we can keep it.
    // However, the goal is to sync with other components.

    useEffect(() => {
        // If we are not loading (e.g. navigated back), this might still run if mounted.
        // But LoadingProvider handles initial state. 
        // We only want to run the timer if we are currently loading.
        if (!isLoading) return

        // Lock scroll
        document.body.style.overflow = "hidden"

        // Timer to finish loading
        const timer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = "unset"
        }, 2500) // Total duration: 2.5s

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = "unset"
        }
    }, [isLoading, setIsLoading])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fffff0]"
                >
                    {/* Main Container */}
                    <div className="relative w-[360px] h-[120px] md:w-[600px] md:h-[180px]">
                        {/* Background Layer (30% Opacity) */}
                        <div className="absolute inset-0 opacity-30">
                            <Image
                                src="/images/navlogo.svg"
                                alt="Foxmen Studio"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Foreground Layer (Fills from Left to Right) */}
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0 overflow-hidden"
                        >
                            <div className="relative w-[360px] h-[120px] md:w-[600px] md:h-[180px]">
                                <Image
                                    src="/images/navlogo.svg"
                                    alt="Foxmen Studio"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
