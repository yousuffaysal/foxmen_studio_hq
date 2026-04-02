"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLoading } from "@/components/loading-context"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    style: ["italic", "normal"],
})

// ── SVG analysis: viewBox="0 0 528 107"
// Icon rect: 0,0 → 107,107  →  20.3% of total width, center at 10.15%
// Text starts at x≈128
// So erase clip keeps left 20.3% → inset(0 79.7% 0 0) ≈ inset(0 80% 0 0)
// V2 x-offset from screen center
type Phase = "fill" | "erase" | "move" | "cinematic" | "done"

const V2_LOGO = "https://res.cloudinary.com/dduyaqvk3/image/upload/v1775132274/on_Logo_kaxstn.png"
const PURPLE  = "#8B5DFF"
const CREAM   = "#fffff1"

export function HomePreloader() {
    const { isLoading, setIsLoading } = useLoading()
    const [phase,   setPhase]   = useState<Phase>("fill")
    const [showV2,  setShowV2]  = useState(false)
    const [iconX,   setIconX]   = useState(-239)
    const [iconSize, setIconSize] = useState(122)

    useEffect(() => {
        const logoDisplayW = window.innerWidth < 768 ? 360 : 600
        const logoDisplayH = window.innerWidth < 768 ? 120 : 180
        const iconFraction  = 107 / 528
        const iconW = logoDisplayW * iconFraction
        const iconH = logoDisplayH
        const iconSize = Math.min(iconW, iconH)
        const iconCenterFromLeft = logoDisplayW * (53.5 / 528)
        const offsetFromCenter   = iconCenterFromLeft - logoDisplayW * 0.5
        setIconX(offsetFromCenter)
        setIconSize(iconSize)
    }, [])

    useEffect(() => {
        if (!isLoading) { setPhase("fill"); setShowV2(false); return }
        document.body.style.overflow = "hidden"

        const t1 = setTimeout(() => { setPhase("erase"); setShowV2(true) }, 2000)
        const t2 = setTimeout(() => setPhase("move"),  3200)
        const t3 = setTimeout(() => setPhase("cinematic"),  4000)
        const t4 = setTimeout(() => {
            setPhase("done")
            setIsLoading(false)
            document.body.style.overflow = "unset"
        }, 5400)

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
            document.body.style.overflow = "unset"
        }
    }, [isLoading, setIsLoading])

    const v2Opacity = (phase === "erase" || phase === "move" || phase === "cinematic") ? 1 : 0
    const v2X      = phase === "erase" ? iconX : 0
    const v2Rotate = phase === "cinematic" ? 360 : 0
    const v2Scale  = phase === "cinematic" ? 45 : 1

    const v2Transition = {
        opacity: { duration: 0.3 },
        x: phase === "move"
            ? { duration: 0.75, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
            : { duration: 0 },
        scale: phase === "cinematic"
            ? { duration: 1.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
            : { duration: 0.25 },
        rotate: phase === "cinematic"
            ? { duration: 1.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
            : { duration: 0 },
    }

    return (
        <AnimatePresence>
            {isLoading && phase !== "done" && (
                <motion.div
                    key="preloader-bg"
                    initial={{ opacity: 1 }}
                    animate={{ backgroundColor: phase === "cinematic" ? PURPLE : CREAM }}
                    exit={{ opacity: 0 }}
                    transition={{
                        backgroundColor: { duration: 0.8, delay: 0.3, ease: "easeInOut" },
                        opacity:         { duration: 0.5, ease: "easeInOut" },
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fffff0]"
                >
                    <AnimatePresence mode="wait">
                        {(phase === "fill" || phase === "erase") && (
                            <motion.div
                                key="v1-logo-container"
                                animate={{
                                    clipPath: phase === "erase"
                                        ? "inset(0 79.7% 0 0)"
                                        : "inset(0 0% 0 0)",
                                }}
                                exit={{ opacity: 0, transition: { duration: 0.35 } }}
                                transition={{
                                    clipPath: { duration: 1.15, ease: "linear" },
                                }}
                                className="relative w-[360px] h-[120px] md:w-[600px] md:h-[180px]"
                            >
                                <div className="absolute inset-0 opacity-30">
                                    <Image src="/images/navlogo.svg" alt="Foxmen Studio" fill className="object-contain" priority />
                                </div>
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="absolute inset-0 overflow-hidden"
                                >
                                    <div className="relative w-[360px] h-[120px] md:w-[600px] md:h-[180px]">
                                        <Image src="/images/navlogo.svg" alt="Foxmen Studio" fill className="object-contain" priority />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {showV2 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: iconX, rotate: 0 }}
                            animate={{
                                opacity: v2Opacity,
                                scale:   v2Scale,
                                x:       v2X,
                                rotate:  v2Rotate,
                            }}
                            transition={v2Transition}
                            className="absolute flex items-center justify-center"
                            style={{ width: iconSize, height: iconSize }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={V2_LOGO}
                                    alt="Foxmen icon"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Welcome Text Overlay */}
                    <AnimatePresence>
                        {phase === "cinematic" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="absolute bottom-8 right-8 text-right z-[110]"
                            >
                                <h2 
                                    className={`${cormorant.className} text-white italic text-3xl md:text-5xl font-light tracking-wide opacity-80`}
                                >
                                    Welcome To ...
                                </h2>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
