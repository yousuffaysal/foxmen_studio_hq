"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Dribbble, Github, Facebook } from "lucide-react"
import Image from "next/image"

const teamMembers = [
    {
        name: "Yousuf H Faysal",
        role: "Founder & Lead Alchemist",
        bio: "Visionary traversing the void between design and code.",
        image: "/images/Gemini_Generated_Image_ug8ze2ug8ze2ug8z (1).png",
        socials: { twitter: "https://x.com/yousuf_faysal_", linkedin: "https://www.linkedin.com/in/yusuf-faysal/", github: "https://github.com/yousuffaysal" }
    },
    {
        name: "Rayhan Ahmed",
        role: "Principal Software Engineer",
        bio: "(Core architecture, complex systems, clean code)",
        image: "/images/rhn (1).png",
        socials: { twitter: "#", linkedin: "https://www.linkedin.com/in/rayhan-ahmed-0ab5aa33a", facebook: "#" }
    },
    {
        name: "Aziz Ashfak",
        role: "Technology & Solutions Architect",
        bio: "High trust role for clients—AI, SaaS, scalable systems",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        socials: { twitter: "https://x.com/AzizAshfak80449", linkedin: "https://www.linkedin.com/in/aziz-ashfak-", facebook: "https://www.facebook.com/profile.php?id=100076654500103" }
    },
    {
        name: "Elena Vostok",
        role: "Design Systems Lead",
        bio: "Building the atomic structures of digital alchemy.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        socials: { twitter: "#", github: "#", dribbble: "#" }
    }
]

export function AboutTeam() {
    return (
        <section className="py-16 md:py-32 px-4 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            {/* Ambient Background Noise/Glow */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#8B5DFF] opacity-30 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[15s]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-900 opacity-20 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                <div className="mb-12 md:mb-32 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <div className="h-[1px] w-12 bg-[#8B5DFF]" />
                            <span className="text-[#8B5DFF] font-medium tracking-widest uppercase text-xs md:text-sm" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                The Minds Behind
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-7xl font-bold text-white leading-none"
                            style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}
                        >
                            DIGITAL <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5DFF] to-white">ALCHEMISTS</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-400 max-w-md text-base md:text-lg leading-relaxed md:text-right md:text-left"
                        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                    >
                        A collective of engineers, designers, and visionaries obsessed with pushing the boundaries of what is possible on the web.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {teamMembers.map((member, i) => (
                        <TeamCard key={i} member={member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TeamCard({ member, index }: { member: typeof teamMembers[number], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="group relative h-[400px] md:h-[500px] w-full overflow-hidden bg-[#111] border border-white/5 cursor-pointer"
        >
            {/* Image Container with Zoom Effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </div>

            {/* Content Content - Always visible at bottom, slides up slightly on hover */}
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="overflow-hidden">
                    <h3 className="text-2xl font-bold text-white mb-1 transform translate-y-0 transition-transform duration-500" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                        {member.name}
                    </h3>
                </div>
                <p className="text-[#8B5DFF] text-sm uppercase tracking-wider font-medium mb-4" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                    {member.role}
                </p>

                {/* Bio - Revealing on hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                        <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {member.bio}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            {member.socials.linkedin && (
                                <a href={member.socials.linkedin} className="text-white/60 hover:text-[#8B5DFF] transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {member.socials.twitter && (
                                <a href={member.socials.twitter} className="text-white/60 hover:text-[#8B5DFF] transition-colors">
                                    <Twitter size={20} />
                                </a>
                            )}
                            {member.socials.dribbble && (
                                <a href={member.socials.dribbble} className="text-white/60 hover:text-[#8B5DFF] transition-colors">
                                    <Dribbble size={20} />
                                </a>
                            )}
                            {member.socials.github && (
                                <a href={member.socials.github} className="text-white/60 hover:text-[#8B5DFF] transition-colors">
                                    <Github size={20} />
                                </a>
                            )}
                            {member.socials.facebook && (
                                <a href={member.socials.facebook} className="text-white/60 hover:text-[#8B5DFF] transition-colors">
                                    <Facebook size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Frame/Border Effect */}
            <div className="absolute inset-0 border border-[#8B5DFF]/0 group-hover:border-[#8B5DFF]/50 transition-colors duration-500 pointer-events-none" />
        </motion.div>
    )
}
