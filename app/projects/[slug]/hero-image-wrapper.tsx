"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function HeroImageWrapper({ project }: { project: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll specifically for this image container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"] // Starts when top of img hits bottom of screen, ends when center hits center
    });

    // "Come from zoom in to actual size" -> Scale starts large (1.2) and settles to 1
    const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

    // "Come slowly" -> Fade in
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    // Existing Parallax for the inner image content
    // We Map global scroll for parallax or just use the local one? 
    // Let's use local for self-contained effect, but for true parallax often global is used.
    // However, mixing transforms can be tricky. Let's apply Scale to a wrapper and Parallax to the img if needed.
    // But the user specifically asked for "zoom in to actual size".

    if (!project.image) return null;

    return (
        <div ref={containerRef} className="relative w-full h-[50vh] md:h-[90vh] overflow-hidden mb-24 md:mb-32">
            <motion.div
                style={{ scale, opacity }}
                className="w-full h-full origin-center will-change-transform"
            >
                <div className="relative w-full h-full">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale-[0.1]"
                        priority
                    />
                </div>
            </motion.div>
        </div>
    );
}
