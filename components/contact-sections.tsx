"use client"
import { useState } from "react"

import { ArrowRight, Mail, Phone, MapPin, ChevronDown, Check, Video, MessageCircle, Facebook, Linkedin, Twitter, Dribbble, Upload, Youtube, Plus, Minus } from "lucide-react"
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

export function ContactHero() {
    return (
        <section className="py-20 md:py-32 bg-[#FFFBF5] text-center px-4">
            <div className="max-w-4xl mx-auto pt-10">
                <h1 className="text-5xl md:text-8xl font-bold mb-8 text-[#0B0B0B]" style={{ fontFamily: "var(--font-owners-medium)" }}>
                    Let's Build Your Digital<br />Existence.
                </h1>
                <p className="text-lg md:text-2xl text-[#393939] font-medium leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "var(--font-inter-regular)" }}>
                    Whether it’s a website, web app, mobile app, or an intelligent AI solution — tell us what you want to create.
                </p>
            </div>
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
        <section className="py-12 md:py-20 px-4 bg-white border-b-4 border-black">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
                {options.map((opt, i) => {
                    const content = (
                        <div className="h-full">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <opt.icon className="w-8 h-8 text-gray-700" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-owners-medium)" }}>{opt.label}</h3>
                            <div className="mb-4">
                                {Array.isArray(opt.value) ? (
                                    opt.value.map((v, idx) => (
                                        <p key={idx} className="text-lg font-bold text-[#6E35FF]" style={{ fontFamily: "var(--font-inter-regular)" }}>{v}</p>
                                    ))
                                ) : (
                                    <p className="text-lg font-bold text-[#6E35FF]" style={{ fontFamily: "var(--font-inter-regular)" }}>{opt.value}</p>
                                )}
                            </div>
                            <p className="text-gray-500 font-medium" style={{ fontFamily: "var(--font-inter-regular)" }}>{opt.desc}</p>
                        </div>
                    );

                    const className = "bg-white border-4 border-black rounded-[24px] p-8 text-center hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow block h-full";

                    if (opt.link) {
                        return (
                            <Link key={i} href={opt.link} target={opt.link.startsWith("http") ? "_blank" : undefined} className={className}>
                                {content}
                            </Link>
                        )
                    }

                    return (
                        <div key={i} className={className}>
                            {content}
                        </div>
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

    const contactDetails = [
        {
            icon: Mail,
            label: "Email",
            value: "contact@foxmenstudio.com",
            link: "mailto:contact@foxmenstudio.com"
        },
        {
            icon: Phone,
            label: "Phone / WhatsApp",
            value: "+880 1753973892",
            link: "https://wa.me/8801753973892"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Dhaka, Bangladesh",
            link: "https://maps.google.com/?q=Dhaka,Bangladesh"
        }
    ]

    return (
        <section className="py-12 md:py-20 px-4 bg-white" id="contact-split">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                {/* Left Column: Form (Takes 2 columns) */}
                <div className="lg:col-span-2 bg-white rounded-[32px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-owners-medium)" }}>Start a Project</h2>
                        <p className="text-lg text-gray-500 font-medium" style={{ fontFamily: "var(--font-inter-regular)" }}>Tell us about your goals and let's craft something unique.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-black pl-1" style={{ fontFamily: "var(--font-owners-medium)" }}>Full Name</label>
                                <Input id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="h-12 md:h-14 rounded-xl border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-black focus-visible:border-4 transition-all text-base md:text-lg px-4 bg-gray-50/50" required style={{ fontFamily: "var(--font-inter-regular)" }} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-black pl-1" style={{ fontFamily: "var(--font-owners-medium)" }}>Email Address</label>
                                <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="h-12 md:h-14 rounded-xl border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-black focus-visible:border-4 transition-all text-base md:text-lg px-4 bg-gray-50/50" required style={{ fontFamily: "var(--font-inter-regular)" }} />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-black pl-1" style={{ fontFamily: "var(--font-owners-medium)" }}>Phone (Whatsapp)</label>
                                <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="h-12 md:h-14 rounded-xl border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-black focus-visible:border-4 transition-all text-base md:text-lg px-4 bg-gray-50/50" style={{ fontFamily: "var(--font-inter-regular)" }} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-black pl-1" style={{ fontFamily: "var(--font-owners-medium)" }}>Company (Optional)</label>
                                <Input id="company" value={formData.company} onChange={handleChange} placeholder="Acme Inc." className="h-12 md:h-14 rounded-xl border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-black focus-visible:border-4 transition-all text-base md:text-lg px-4 bg-gray-50/50" style={{ fontFamily: "var(--font-inter-regular)" }} />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-black pl-1" style={{ fontFamily: "var(--font-owners-medium)" }}>Project Type</label>
                                <Select onValueChange={(val) => handleSelectChange("projectType", val)}>
                                    <SelectTrigger className="h-12 md:h-14 rounded-xl border-2 border-gray-200 focus:ring-0 focus:border-black focus:border-4 transition-all text-base md:text-lg px-4 bg-gray-50/50" style={{ fontFamily: "var(--font-inter-regular)" }}>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Website">Website</SelectItem>
                                        <SelectItem value="Web App">Web App</SelectItem>
                                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                                        <SelectItem value="AI Solution">AI Solution</SelectItem>
                                        <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                                        <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-black pl-1" style={{ fontFamily: "var(--font-owners-medium)" }}>Country</label>
                                <Input id="country" value={formData.country} onChange={handleChange} placeholder="Your Country" className="h-12 md:h-14 rounded-xl border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-black focus-visible:border-4 transition-all text-base md:text-lg px-4 bg-gray-50/50" required style={{ fontFamily: "var(--font-inter-regular)" }} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-black pl-1" style={{ fontFamily: "var(--font-owners-medium)" }}>Tell us What you Need</label>
                            <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project goals..." className="min-h-[140px] rounded-xl border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-black focus-visible:border-4 transition-all text-base md:text-lg p-4 bg-gray-50/50 resize-y" required style={{ fontFamily: "var(--font-inter-regular)" }} />
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={status === "sending"} className="w-full h-14 md:h-16 text-xl font-bold rounded-full bg-[#6E35FF] hover:bg-black text-white hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all uppercase tracking-wide" style={{ fontFamily: "var(--font-owners-medium)" }}>
                                {status === "sending" ? "Sending..." : "Start Your Project"} <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                            {status === "success" && <p className="text-green-600 mt-4 text-center text-lg font-bold">Message sent successfully!</p>}
                            {status === "error" && <p className="text-red-600 mt-4 text-center text-lg font-bold">Something went wrong. Please try again.</p>}
                        </div>
                    </form>
                </div>

                {/* Right Column: Contact Details (Takes 1 column) */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {contactDetails.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            target="_blank"
                            className="flex-1 bg-white rounded-[24px] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all p-6 md:p-8 flex flex-col items-center justify-center text-center group"
                        >
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#6E35FF] group-hover:text-white transition-colors">
                                <item.icon className="w-7 h-7 text-black group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-owners-medium)" }}>{item.label}</h3>
                            <p className="text-lg font-medium text-gray-600 break-words w-full" style={{ wordBreak: 'break-word', fontFamily: "var(--font-inter-regular)" }}>{item.value}</p>
                        </Link>
                    ))}
                </div>
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
        <section className="py-20 md:py-32 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#6E35FF]"></div>
                    <span className="text-sm font-medium text-gray-400 font-mono">FAQ</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-bold mb-16 md:mb-24 text-center text-[#0B0B0B]" style={{ fontFamily: "var(--font-owners-medium)" }}>Got Questions?</h2>

                <div className="space-y-6">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className="border border-gray-200 rounded-[24px] px-6 md:px-8 bg-white transition-all data-[state=open]:border-[#6E35FF] data-[state=open]:shadow-sm"
                            >
                                <AccordionTrigger className="hover:no-underline py-6 md:py-8 [&>svg]:hidden flex justify-between items-center group">
                                    <div className="flex items-start text-left gap-4 md:gap-6">
                                        <span className="text-lg md:text-xl font-medium text-gray-400 font-mono mt-1">{`0${i + 1}/`}</span>
                                        <span className="text-xl md:text-2xl font-bold text-[#0B0B0B]" style={{ fontFamily: "var(--font-owners-medium)" }}>{faq.q}</span>
                                    </div>
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
                                        <Plus className="w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-lg md:text-xl text-[#393939] font-medium leading-relaxed pl-0 md:pl-[3.5rem] pr-4 md:pr-12 pb-8" style={{ fontFamily: "var(--font-inter-regular)" }}>
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
        <section className="py-12 md:py-24 px-4 bg-[#FFFBF5] border-b-4 border-black">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-3xl font-bold mb-10 md:mb-16 text-center" style={{ fontFamily: "var(--font-owners-medium)" }}>How It Starts</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center relative">
                    <div className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-1 bg-gray-200 z-0"></div>
                    {[
                        { title: "Share Your Idea", desc: "Tell us what you want to build." },
                        { title: "We Plan", desc: "We design the approach and timeline." },
                        { title: "We Build", desc: "Your digital existence comes to life." }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                                {i + 1}
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-owners-medium)" }}>{step.title}</h3>
                            <p className="text-gray-600 font-medium px-8" style={{ fontFamily: "var(--font-inter-regular)" }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function QuickActions() {
    return (
        <section className="py-12 md:py-24 px-4 bg-white border-b-4 border-black">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12" style={{ fontFamily: "var(--font-owners-medium)" }}>Need Answers Faster?</h2>
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                    <button className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full bg-[#6E35FF] text-white border-4 border-black text-lg md:text-xl font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all" style={{ fontFamily: "var(--font-owners-medium)" }}>
                        <Video className="w-5 h-5 md:w-6 md:h-6" /> Book a Meeting
                    </button>
                    <a href="https://wa.me/8801753973892" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full bg-white text-black border-4 border-black text-lg md:text-xl font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all" style={{ fontFamily: "var(--font-owners-medium)" }}>
                        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" /> Chat on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    )
}

export function SocialConnect() {
    const socials = [
        { icon: Facebook, name: "Facebook", color: "hover:bg-[#1877F2] hover:text-white", link: "https://www.facebook.com/profile.php?id=61579940840061&sk=about" },
        { icon: Linkedin, name: "LinkedIn", color: "hover:bg-[#0A66C2] hover:text-white", link: "https://www.linkedin.com/company/foxmen-studio/" },
        { icon: Twitter, name: "Twitter", color: "hover:bg-[#000000] hover:text-white", link: "https://x.com/FoxmenStudio" },
        { icon: Youtube, name: "Youtube", color: "hover:bg-[#FF0000] hover:text-white", link: "https://www.youtube.com/@Foxmen-Studio" },
        { icon: Dribbble, name: "Dribbble", color: "hover:bg-[#EA4C89] hover:text-white", link: "https://dribbble.com/foxmen-studio" },
    ]
    return (
        <section className="py-12 md:py-24 px-4 bg-[#F3F4F6] border-b-4 border-black">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-10 md:mb-16" style={{ fontFamily: "var(--font-owners-medium)" }}>Stay Connected</h2>
                <div className="flex justify-center gap-4 md:gap-10 flex-wrap">
                    {socials.map((soc, i) => (
                        <a
                            key={i}
                            href={soc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group cursor-pointer bg-white w-20 h-20 md:w-32 md:h-32 rounded-[20px] md:rounded-[24px] border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all ${soc.color}`}
                        >
                            <soc.icon className="w-8 h-8 md:w-12 md:h-12 transition-colors duration-300" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function LocationMap() {
    return (
        <section className="py-12 md:py-24 px-4 bg-white border-b-4 border-black">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 md:mb-12 text-center" style={{ fontFamily: "var(--font-owners-medium)" }}>Visit Us</h2>
                <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-[24px] md:rounded-[32px] border-4 border-black overflow-hidden flex items-center justify-center">
                    <p className="text-xl font-bold text-gray-500" style={{ fontFamily: "var(--font-inter-regular)" }}>Google Map Embed Placeholder</p>
                </div>
            </div>
        </section>
    )
}

export function ContactCTA() {
    return (
        <section className="py-20 md:py-32 px-4 bg-[#FFFBF5] text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: "var(--font-owners-medium)" }}>Ready to Build Your Digital Presence?</h2>
                <Link href="#contact-split" className="inline-flex items-center justify-center bg-[#6E35FF] text-white border-4 border-black rounded-full px-8 md:px-12 py-5 md:py-6 text-xl font-bold hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1" style={{ fontFamily: "var(--font-owners-medium)" }}>
                    Start Your Project <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
            </div>
        </section>
    )
}
