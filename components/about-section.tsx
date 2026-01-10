"use client"

import { AboutButton } from "./about-button"
import Image from "next/image"
import { motion } from "framer-motion"

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  }

  return (
    <motion.section
      className="bg-[#414042] py-16 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Minimal Image Container */}
          <motion.div
            className="flex justify-center md:justify-start"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-lg aspect-square overflow-hidden bg-[#2D2D2D]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5DFF]/20 to-transparent z-10" />
              <Image src="/images/about-me.svg" alt="About Foxmen Studio" fill className="object-cover opacity-90" />
              {/* Technical Overlay */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-[#8B5DFF]" />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#8B5DFF]" />
            </div>
          </motion.div>

          <div className="space-y-8">
            <div>
              <motion.span
                className="block font-mono text-xs text-[#8B5DFF] mb-4 tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                variants={itemVariants}
              >
                    /// THE_STUDIO
              </motion.span>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
                style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                variants={itemVariants}
              >
                Who's behind all this <span className="text-[#8B5DFF]">great work?</span>
              </motion.h2>
              <motion.p
                className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                variants={itemVariants}
              >
                Foxmen Studio is a premier Creative Company specializing in building high-performance digital products. We combine strategic insight with world-class engineering to launch brands that dominate their markets.
              </motion.p>
            </div>

            <motion.div
              className="space-y-6 pt-4 border-t border-white/10"
              variants={containerVariants}
            >
              <motion.div
                className="flex gap-4 items-start"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-[#8B5DFF] mt-2.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-white" style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}>5+ Years Experience</h3>
                  <p className="text-white/50 text-sm font-mono" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                    Proven expertise in crafting award-winning web and mobile experiences.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4 items-start"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-[#8B5DFF] mt-2.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-white" style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}>200+ Projects Delivered</h3>
                  <p className="text-white/50 text-sm font-mono" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                    Successfully executed high-end solutions for startups and global enterprises.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <AboutButton />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
