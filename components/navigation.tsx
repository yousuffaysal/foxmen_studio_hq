"use client"

import Link from "next/link"
import { useState } from "react"
import { Phone } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedHamburgerButton } from "@/components/animated-hamburger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ContactButton } from "@/components/contact-button"


export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="w-full relative z-50 bg-white/80 backdrop-blur-md border-b border-black/30"
    >
      <nav className="flex items-center justify-between px-6 py-4 md:py-10 w-full">
        <Link href="/" className="h-12 md:h-[70px] w-auto flex items-center justify-center flex-shrink-0 cursor-pointer">
          <img src="https://iili.io/fN1cOhu.png" alt="Foxmen Studio Logo" className="h-full w-auto object-contain" />
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
        <div className="absolute top-full left-0 w-full h-[calc(100vh-100%)] bg-white/80 backdrop-blur-md border-t border-black/10 flex flex-col p-6 z-40 md:hidden animate-in slide-in-from-top-2 duration-300">
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
          <div className="mt-auto pt-8 border-t border-black/10">
            <ContactButton className="w-full" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </motion.div>
  )
}
