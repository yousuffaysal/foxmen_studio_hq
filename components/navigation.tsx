"use client"

import Link from "next/link"
import { useState } from "react"
import { Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedHamburgerButton } from "@/components/animated-hamburger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ContactButton } from "@/components/contact-button"


interface NavigationProps {
  delay?: number
}

export function Navigation({ delay = 0 }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className="w-full relative z-50 bg-[#fffff0]/80 backdrop-blur-md border-b border-black/30"
    >
      <nav className="flex items-center justify-between px-6 py-4 md:py-10 w-full">
        <Link href="/" className="h-12 md:h-[70px] w-auto flex items-center justify-center flex-shrink-0 cursor-pointer">
          <img src="/images/navlogo.svg" alt="Foxmen Studio Logo" className="h-full w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 flex-1 justify-center">

          <Link href="/about" className="text-[18px] font-normal leading-[22px] hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
            About Us
          </Link>
          <Link href="/services" className="text-[18px] font-normal leading-[22px] hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
            Services
          </Link>
          <Link href="/projects" className="text-[18px] font-normal leading-[22px] hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
            Projects
          </Link>
          <Link href="/blog" className="text-[18px] font-normal leading-[22px] hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
            Blogs
          </Link>
        </div>

        {/* Desktop Contact Button */}
        <ContactButton className="hidden md:flex" />


        {/* Mobile Navigation (Menu Icon) */}
        <div className="md:hidden">
          <AnimatedHamburgerButton active={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-[calc(100vh-100%)] bg-[#ffffff] border-t border-black/10 flex flex-col p-6 z-40 md:hidden animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-8 flex-1">
            <Link href="/about" className="text-3xl font-bold hover:underline" style={{ fontFamily: "var(--font-ibm-plex-mono)" }} onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link href="/services" className="text-3xl font-bold hover:underline" style={{ fontFamily: "var(--font-ibm-plex-mono)" }} onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/projects" className="text-3xl font-bold hover:underline" style={{ fontFamily: "var(--font-ibm-plex-mono)" }} onClick={() => setIsOpen(false)}>
              Projects
            </Link>
            <Link href="/blog" className="text-3xl font-bold hover:underline" style={{ fontFamily: "var(--font-ibm-plex-mono)" }} onClick={() => setIsOpen(false)}>
              Blogs
            </Link>
          </div>

          {/* Mobile Contact Option */}
          <div className="mt-auto pt-8 border-t border-black/10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-xs text-black/40 uppercase tracking-widest text-center font-medium" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                Get in touch
              </p>
              <a
                href="mailto:info@foxmenstudio.com"
                className="group flex items-center justify-center gap-3 p-4 rounded-2xl bg-gray-50 border border-black/5 hover:border-black/10 hover:bg-gray-100 transition-all duration-300"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-4 h-4 text-black/70" />
                </div>
                <span className="text-sm font-medium text-black/80 group-hover:text-black tracking-tight" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                  info@foxmenstudio.com
                </span>
              </a>
            </div>
            <ContactButton className="w-full" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </motion.div>
  )
}
