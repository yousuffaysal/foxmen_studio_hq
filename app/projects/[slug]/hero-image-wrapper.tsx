"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function HeroImageWrapper({ project }: { project: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smooth physics-based spring for the zoom
    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const scale = useTransform(springScroll, [0, 0.5, 1], [1.05, 1, 1.05]);
    const translateY = useTransform(springScroll, [0, 1], [-20, 20]);

    if (!project.image) return null;

    return (
        <section ref={containerRef} className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden mt-16 md:mt-32 mb-0 px-4 md:px-8">
            <motion.div 
                style={{ scale }}
                className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5"
            >
                <motion.div 
                    style={{ y: translateY }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center transition-opacity duration-1000"
                        priority
                        sizes="100vw"
                    />
                </motion.div>
                
                {/* Gradient Overlays - Subtler */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[#B86CF9]/5 mix-blend-overlay pointer-events-none" />
            </motion.div>
        </section>
    );
}
