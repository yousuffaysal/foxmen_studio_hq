"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin, ChevronDown, Check, Video, MessageCircle, Facebook, Linkedin, Twitter, Dribbble, Upload, Youtube, Plus, Minus, Scan } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
}

export function ContactHero() {
    return (
        <section className="py-24 md:py-32 bg-[#fffff0] text-center px-4 relative overflow-hidden">
            <motion.div
                className="max-w-5xl mx-auto pt-10 relative z-10"
                initial="hidden"
                animate="show"
                variants={containerVariants}
            >
                <motion.h1
                    className="text-[12vw] md:text-[8rem] font-bold mb-8 text-[#0B0B0B] leading-[0.8] tracking-tight"
                    style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                    variants={itemVariants}
                >
                    Let's Build<br />
                    <span className="text-[#8B5DFF]">Together.</span>
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl text-[#393939] font-medium leading-relaxed max-w-2xl mx-auto"
                    style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                    variants={itemVariants}
                >
                    Whether it’s a website, web app, mobile app, or an intelligent AI solution — tell us what you want to create.
                </motion.p>
            </motion.div>

            {/* Ambient Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-radial-gradient from-[rgba(139,93,255,0.08)] to-transparent opacity-50 pointer-events-none blur-3xl" />
        </section>
    )
}

export function ContactOptions() {
    const options = [
        {
            icon: Mail,
            label: "Emails",
            value: ["contact@foxmenstudio.com", "info@foxmenstudio.com"],
            desc: "Best for project inquiries and collaboration.",
            link: "mailto:contact@foxmenstudio.com"
        },
        {
            icon: Phone,
            label: "Phone / WhatsApp",
            value: "+880 1753973892",
            desc: "Fast communication, quick clarifications.",
            link: "https://wa.me/8801753973892"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Dhaka, Bangladesh",
            desc: "Meetings, consultations, and presentations.",
            link: null
        },
    ]
    return (
        <section className="py-12 md:py-20 px-4 bg-[#fffff0] border-b border-[#000000]/10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#000000]/10">
                {options.map((opt, i) => {
                    const content = (
                        <div className="h-full px-8 py-8 md:py-0 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-white border border-[#000000]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out shadow-sm">
                                <opt.icon className="w-6 h-6 text-[#0B0B0B]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#0B0B0B]" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>{opt.label}</h3>
                            <div className="mb-4 space-y-1">
                                {Array.isArray(opt.value) ? (
                                    opt.value.map((v, idx) => (
                                        <p key={idx} className="text-base font-bold text-[#8B5DFF] hover:underline decoration-1 underline-offset-4" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{v}</p>
                                    ))
                                ) : (
                                    <p className="text-base font-bold text-[#8B5DFF] hover:underline decoration-1 underline-offset-4" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{opt.value}</p>
                                )}
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{opt.desc}</p>
                        </div>
                    );

                    const className = "block h-full transition-colors hover:bg-white/50";

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="relative"
                        >
                            {opt.link ? (
                                <Link href={opt.link} target={opt.link.startsWith("http") ? "_blank" : undefined} className={className}>
                                    {content}
                                </Link>
                            ) : (
                                <div className={className}>{content}</div>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}



export function ContactSplitSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        country: "",
        message: ""
    })
    const [status, setStatus] = useState("")

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name || e.target.id]: e.target.value })
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setStatus("sending")

        try {
            const res = await fetch(`/api/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    projectType: formData.projectType,
                    country: formData.country,
                    subject: `${formData.projectType || 'Inquiry'} from ${formData.name}`,
                    message: formData.message
                })
            })
            if (res.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", phone: "", company: "", projectType: "", country: "", message: "" })
            } else {
                setStatus("error")
            }
        } catch (error) {
            console.error(error)
            setStatus("error")
        }
    }

    return (
        <section className="py-20 md:py-32 px-4 bg-[#fffff0]" id="contact-split">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <motion.h2
                        className="text-4xl md:text-7xl font-bold mb-6 text-[#0B0B0B] leading-tight"
                        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Start a Project
                    </motion.h2>
                    <motion.p
                        className="text-xl text-[#393939] font-medium max-w-2xl"
                        style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Tell us about your goals and let's craft something unique.
                    </motion.p>
                </div>

                <motion.form
                    className="space-y-12"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-600 group-focus-within:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Full Name</label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="h-14 bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 text-xl md:text-2xl text-[#0B0B0B] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#8B5DFF] transition-colors"
                                required
                                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-600 group-focus-within:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Email Address</label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className="h-14 bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 text-xl md:text-2xl text-[#0B0B0B] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#8B5DFF] transition-colors"
                                required
                                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-600 group-focus-within:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Phone (Optional)</label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                className="h-14 bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 text-xl md:text-2xl text-[#0B0B0B] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#8B5DFF] transition-colors"
                                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-600 group-focus-within:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Company (Optional)</label>
                            <Input
                                id="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Acme Inc."
                                className="h-14 bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 text-xl md:text-2xl text-[#0B0B0B] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#8B5DFF] transition-colors"
                                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-600 group-focus-within:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Project Type</label>
                            <Select onValueChange={(val) => handleSelectChange("projectType", val)}>
                                <SelectTrigger className="h-14 bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 text-xl md:text-2xl text-left text-[#0B0B0B] focus:ring-0 focus:border-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#fffff0] border border-[#000000]/10 rounded-xl shadow-xl">
                                    <SelectItem value="Website" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Website</SelectItem>
                                    <SelectItem value="Web App" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Web App</SelectItem>
                                    <SelectItem value="Mobile App" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Mobile App</SelectItem>
                                    <SelectItem value="AI Solution" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>AI Solution</SelectItem>
                                    <SelectItem value="UI/UX Design" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>UI/UX Design</SelectItem>
                                    <SelectItem value="Digital Marketing" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Digital Marketing</SelectItem>
                                    <SelectItem value="Other" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-600 group-focus-within:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Country</label>
                            <Input
                                id="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Your Country"
                                className="h-14 bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 text-xl md:text-2xl text-[#0B0B0B] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#8B5DFF] transition-colors"
                                required
                                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 group pt-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-600 group-focus-within:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Tell us What you Need</label>
                        <Textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project goals, timeline, and budget..."
                            className="min-h-[150px] bg-transparent border-0 border-b-2 border-gray-300 rounded-none px-0 text-xl md:text-2xl text-[#0B0B0B] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#8B5DFF] transition-colors resize-y leading-relaxed"
                            required
                            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group cursor-pointer bg-gradient-to-b from-[#8B5DFF] to-[#7040e0] shadow-[0px_4px_32px_0_rgba(139,93,255,0.5)] px-8 py-4 rounded-full border-[1px] border-white/20 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto overflow-hidden relative"
                            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                        >
                            <div className="relative overflow-hidden">
                                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center gap-3 text-lg">
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                    {status !== "sending" && <ArrowRight className="w-5 h-5" />}
                                </p>
                                <p className="absolute top-7 left-0 w-full group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center gap-3 text-lg">
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                    {status !== "sending" && <ArrowRight className="w-5 h-5" />}
                                </p>
                            </div>
                        </button>
                        {status === "success" && <p className="text-[#8B5DFF] mt-6 text-lg font-bold flex items-center gap-2"><Check className="w-5 h-5" /> Message sent successfully!</p>}
                        {status === "error" && <p className="text-red-500 mt-6 text-lg font-medium">Something went wrong. Please try again.</p>}
                    </div>
                </motion.form>
            </div >
        </section >
    )
}

export function ContactFAQ() {
    const faqs = [
        { q: "How long does it take to build a website?", a: "Typically 2-6 weeks depending on complexity. We work in agile sprints to ensure rapid delivery throughout the process." },
        { q: "What is the cost of a mobile app?", a: "It varies greatly based on features, but usually starts from $5k for an MVP. We provide transparent pricing after our initial discovery call." },
        { q: "Do you provide ongoing support?", a: "Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, and content updates." },
        { q: "Can you redesign an existing system?", a: "Absolutely. We specialize in modernizing legacy apps, improving UI/UX, and refactoring codebases for better performance." },
        { q: "Do you work with startups?", a: "We love startups! We have special packages designed to help early-stage companies launch quickly and scale effectively." },
    ]
    return (
        <section className="py-20 md:py-32 px-4 bg-[#fffff0]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B5DFF]"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>FAQ</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-[#0B0B0B]" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>Common Questions</h2>

                <div className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className="border-b border-[#000000]/10"
                            >
                                <AccordionTrigger className="hover:no-underline py-8 md:py-10 [&>svg]:hidden flex justify-between items-start group text-left">
                                    <div className="flex gap-6 md:gap-8">
                                        <span className="text-lg md:text-xl font-medium text-gray-300 font-mono pt-1">{`0${i + 1}`}</span>
                                        <span className="text-2xl md:text-3xl font-medium text-[#0B0B0B] group-hover:text-[#8B5DFF] transition-colors leading-tight" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>{faq.q}</span>
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 relative">
                                        <Plus className="w-6 h-6 text-gray-400 absolute transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" />
                                        <Minus className="w-6 h-6 text-[#8B5DFF] absolute transition-all duration-300 opacity-0 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0" />
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-lg md:text-xl text-[#393939] leading-relaxed pl-[3rem] md:pl-[4.5rem] pr-4 md:pr-12 pb-10" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export function StartProcess() {
    return (
        <section className="py-20 md:py-32 px-4 bg-[#ffffff]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                    <div className="md:w-1/3 sticky top-24">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B0B0B]" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>How We Work</h2>
                        <p className="text-lg text-[#393939] leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                            A simple, transparent process to take your idea from concept to reality.
                        </p>
                    </div>

                    <div className="md:w-2/3 space-y-12">
                        {[
                            { title: "Discovery", desc: "We listen to your ideas, understand your goals, and define the project scope." },
                            { title: "Strategy & Design", desc: "We create a roadmap and design the visual experience tailored to your brand." },
                            { title: "Development", desc: "Our engineers build the solution with clean code and modern technologies." },
                            { title: "Launch & Scale", desc: "We help you launch successfully and provide support for future growth." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1 }}
                                className="pl-8 border-l-2 border-[#000000]/10 pb-8 last:pb-0 last:border-0 relative"
                            >
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#8B5DFF]" />
                                <span className="text-sm font-bold text-[#8B5DFF] uppercase tracking-widest mb-2 block" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Step 0{i + 1}</span>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#0B0B0B]" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>{step.title}</h3>
                                <p className="text-lg text-gray-500 max-w-lg" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function QuickActions() {
    return (
        <section className="relative py-24 md:py-40 px-4 bg-[#fffff0] overflow-hidden border-b border-[#0B0B0B]/10">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                {/* Subtle Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B5DFF]/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFC224]/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDelay: "1s" }} />

                {/* Rotating Geometric Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] border border-[#0B0B0B]/5 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] border border-[#0B0B0B]/10 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-[#0B0B0B]/5 rounded-full"
                />
            </div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-[#8B5DFF]"></div>
                    <span className="text-[#8B5DFF] font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Quick Actions</span>
                    <div className="w-12 h-[1px] bg-[#8B5DFF]"></div>
                </div>
                <h2 className="text-5xl md:text-8xl font-bold mb-12 text-[#0B0B0B] tracking-tight leading-none" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>
                    Need Answers <span className="opacity-40">Faster?</span>
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                    <button className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#0B0B0B] text-white text-lg font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Video className="w-6 h-6 relative z-10" />
                        <span className="relative z-10">Book a Meeting</span>
                    </button>
                    <a href="https://wa.me/8801753973892" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-[#0B0B0B] border-2 border-gray-100 text-lg font-bold hover:border-[#0B0B0B] hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    )
}

export function SocialConnect() {
    const socials = [
        {
            icon: Facebook,
            name: "Facebook",
            handle: "@foxmenstudio",
            color: "#1877F2",
            link: "https://www.facebook.com/profile.php?id=61579940840061&sk=about",
            desc: "Follow our updates & news"
        },
        {
            icon: Linkedin,
            name: "LinkedIn",
            handle: "/company/foxmen-studio",
            color: "#0A66C2",
            link: "https://www.linkedin.com/company/foxmen-studio/",
            desc: "Professional insights & jobs"
        },
        {
            icon: Twitter,
            name: "Twitter (X)",
            handle: "@FoxmenStudio",
            color: "#000000",
            link: "https://x.com/FoxmenStudio",
            desc: "Thoughts & threads"
        },
        {
            icon: Youtube,
            name: "Youtube",
            handle: "@Foxmen-Studio",
            color: "#FF0000",
            link: "https://www.youtube.com/@Foxmen-Studio",
            desc: "Tutorials & process videos"
        },
        {
            icon: Dribbble,
            name: "Dribbble",
            handle: "foxmen-studio",
            color: "#EA4C89",
            link: "https://dribbble.com/foxmen-studio",
            desc: "Design portfolio & shots"
        },
    ]

    return (
        <section className="py-20 md:py-32 bg-[#fffff0]">
            <div className="w-full px-4 md:px-8">
                <div className="mb-16 md:mb-24 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-[1px] bg-[#8B5DFF]"></div>
                        <span className="text-[#8B5DFF] font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Socials</span>
                        <div className="w-12 h-[1px] bg-[#8B5DFF]"></div>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 text-[#0B0B0B]" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>Follow Our Journey</h2>
                    <p className="text-xl text-[#393939] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        Connect with us across platforms. We share our process, insights, and latest work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {socials.map((soc, i) => (
                        <motion.a
                            key={i}
                            href={soc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-[450px] bg-white border border-[#000000]/10 rounded-3xl overflow-hidden p-10 flex flex-col justify-between transition-all duration-500 hover:border-transparent hover:shadow-2xl"
                        >
                            {/* Hover Gradient Background */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(135deg, ${soc.color} 0%, ${soc.color}dd 100%)` }}
                            />

                            {/* Abstract Geometric Patterns */}
                            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 overflow-hidden pointer-events-none">
                                <svg width="100%" height="100%" className="absolute inset-0 w-full h-full text-black group-hover:text-white transition-colors duration-500">
                                    <pattern id={`grid-${i}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                                    <circle cx="90%" cy="10%" r="100" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-70" />
                                    <path d="M0 450 L400 0" stroke="currentColor" strokeWidth="1" className="opacity-50" />
                                </svg>
                            </div>

                            {/* Icon */}
                            <div
                                className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center relative z-10 group-hover:bg-white transition-colors duration-500"
                                style={{ color: soc.color }}
                            >
                                <soc.icon
                                    className="w-8 h-8 text-[#0B0B0B] group-hover:text-current transition-colors duration-500"
                                    style={{ color: "currentColor" }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 text-[#0B0B0B] group-hover:text-white transition-colors duration-500" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>
                                    {soc.name}
                                </h3>
                                <p className="text-sm font-bold opacity-60 mb-4 group-hover:text-white group-hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                    {soc.handle}
                                </p>
                                <div className="flex items-center justify-between border-t border-[#000000]/10 group-hover:border-white/20 pt-6 transition-colors duration-500">
                                    <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                        {soc.desc}
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-[#0B0B0B] group-hover:bg-white flex items-center justify-center ml-4 transform group-hover:rotate-[-45deg] transition-all duration-500">
                                        <ArrowRight className="w-4 h-4 text-white group-hover:text-[#0B0B0B]" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}

                    {/* "Join Us" Placeholder Card to fill grid if needed, or just keep as purely social links. 
                        Since we have 5 items, a 6th card makes a perfect 3x2 grid. */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="group relative h-[450px] bg-[#0B0B0B] rounded-3xl overflow-hidden p-10 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 opacity-30 pointer-events-none">
                            <svg width="100%" height="100%" className="absolute inset-0 w-full h-full text-white">
                                <pattern id="grid-join" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#grid-join)" />
                                <circle cx="90%" cy="10%" r="100" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-70" />
                                <path d="M0 450 L400 0" stroke="currentColor" strokeWidth="1" className="opacity-50" />
                            </svg>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center relative z-10">
                            <Upload className="w-8 h-8 text-white" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-white" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>
                                Join the Team
                            </h3>
                            <p className="text-sm font-bold opacity-60 mb-4 text-white" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                careers@foxmenstudio.com
                            </p>
                            <div className="flex items-center justify-between border-t border-white/20 pt-6">
                                <span className="text-sm font-medium text-white/60" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                                    We are always hiring
                                </span>
                                <Link href="mailto:careers@foxmenstudio.com" className="w-10 h-10 rounded-full bg-white flex items-center justify-center ml-4 hover:scale-110 transition-transform">
                                    <ArrowRight className="w-4 h-4 text-black" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export function LocationMap() {
    const locations = [
        { name: "North America", top: "30%", left: "18%" },
        { name: "South America", top: "65%", left: "28%" },
        { name: "Europe", top: "25%", left: "54%" },
        { name: "Africa", top: "50%", left: "54%" },
        { name: "Asia", top: "30%", left: "72%" },
        { name: "Australia", top: "75%", left: "86%" },
        { name: "Antarctica", top: "90%", left: "55%" },
    ]

    return (
        <section className="py-20 md:py-32 px-4 bg-[#fffff0] overflow-hidden bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="w-full max-w-[1400px] mx-auto relative group">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-[1px] bg-[#8B5DFF]"></div>
                        <span className="text-[#8B5DFF] font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>Global Reach</span>
                        <div className="w-12 h-[1px] bg-[#8B5DFF]"></div>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold text-[#0B0B0B]" style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>All Over the Internet</h2>
                </div>

                {/* Map Container */}
                <div className="relative w-full aspect-[16/9] md:aspect-[2.2/1] bg-white rounded-[40px] shadow-sm border border-[#0B0B0B]/5 overflow-hidden">
                    {/* World Map Background Image */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none select-none">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                            alt="World Map"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-40 mix-blend-overlay" />

                    {/* Pins */}
                    {locations.map((loc, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ top: loc.top, left: loc.left }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <div className="relative group/pin cursor-pointer">
                                {/* Pulse Effect */}
                                <div className="absolute -inset-6 bg-[#8B5DFF] rounded-full opacity-10 animate-[ping_3s_ease-in-out_infinite]" />
                                <div className="absolute -inset-2 bg-[#8B5DFF] rounded-full opacity-30 blur-md group-hover/pin:opacity-60 transition-opacity" />

                                {/* Pin Head */}
                                <div className="relative w-3 h-3 md:w-5 md:h-5 bg-[#8B5DFF] rounded-full border-[3px] border-white shadow-xl z-10 transition-transform duration-300 group-hover/pin:scale-125" />

                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0B0B0B] text-white text-[10px] md:text-sm font-bold px-3 py-1.5 rounded-full opacity-0 group-hover/pin:opacity-100 transition-all duration-300 translate-y-4 group-hover/pin:-translate-y-2 whitespace-nowrap z-20 pointer-events-none shadow-xl">
                                    {loc.name}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Decorative Connection Curve */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
                        <path d="M100,500 Q500,200 900,500 T1500,400" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="10,10" />
                    </svg>

                    {/* Floating Badge */}
                    <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#0B0B0B]/5 shadow-lg hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="relative w-2 h-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </div>
                            <span className="text-sm font-bold text-[#0B0B0B] tracking-wide" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>7 Continents Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


