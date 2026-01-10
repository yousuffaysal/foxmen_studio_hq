"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function ViewProjectsButton() {
    return (
        <Link href="/projects">
            <motion.button
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#414042] bg-transparent px-8 h-[60px] sm:h-[72px] text-lg font-medium text-[#414042] transition-all w-full sm:w-auto min-w-[280px] sm:min-w-[300px]"
                whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(65, 64, 66, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
            >
                View Projects
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
        </Link>
    )
}
