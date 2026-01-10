"use client"

import { motion, useSpring, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const stats = [
    {
        number: "200+",
        label: "Completed Projects",
    },
    {
        number: "120+",
        label: "Assisted Projects",
    },
    {
        number: "300+",
        label: "Served Brands",
    },
]

function Counter({ value }: { value: string }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-100px" })
    const motionValue = useSpring(0, {
        damping: 30,
        stiffness: 100,
        duration: 2,
    })

    const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0
    const suffix = value.replace(/[0-9]/g, "")

    useEffect(() => {
        if (inView) {
            motionValue.set(numericValue)
        }
    }, [inView, motionValue, numericValue])

    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const unsubscribe = motionValue.on("change", (latest) => {
            setDisplayValue(Math.round(latest))
        })
        return unsubscribe
    }, [motionValue])

    return (
        <span ref={ref}>
            {displayValue}{suffix}
        </span>
    )
}

export function StatsSection() {
    return (
        <section className="bg-[#414042] pt-16 md:pt-32 pb-16 border-b border-white/10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center justify-center text-center p-8 md:p-12"
                            >
                                <h3
                                    className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight tabular-nums"
                                    style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                                >
                                    <Counter value={stat.number} />
                                </h3>
                                <p
                                    className="text-sm md:text-base text-[#8B5DFF] uppercase tracking-widest font-mono"
                                    style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                                >
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
