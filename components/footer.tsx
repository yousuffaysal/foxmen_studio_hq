import { Facebook, Twitter, Youtube, Linkedin, Mail, Phone, Dribbble } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-24 relative overflow-hidden flex flex-col h-full">
      <div className="w-full px-4 md:px-12 relative z-10 flex-1 flex flex-col">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-12">
          {/* Left: Email */}
          <div className="flex flex-col gap-4 max-w-2xl w-full">
            <span className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              Uncover the potency of Foxmen Studio at
            </span>
            <a href="mailto:contact@foxmenstudio.com" className="text-[6vw] md:text-5xl lg:text-7xl font-bold border-b border-gray-700 pb-2 hover:text-[#8B5DFF] hover:border-[#8B5DFF] transition-colors break-words" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
              contact@foxmenstudio.com
            </a>
          </div>

          {/* Right: Get Started Card */}
          <div className="bg-[#D9FF00] p-6 md:p-8 rounded-[24px] md:rounded-[32px] w-full md:w-[320px] text-black shrink-0 relative overflow-hidden group">
            <h3 className="text-2xl md:text-3xl font-bold mb-12 md:mb-16 relative z-10" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
              Get Started
            </h3>
            <a href="#" className="flex items-center justify-between bg-black text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full relative z-10 group-hover:scale-105 transition-transform duration-300">
              <span className="font-medium">Go</span>
              <span className="text-xl">→</span>
            </a>
            {/* Decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 blur-[40px] rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-16 md:mb-24">
          {/* Nav Links */}
          <div className="flex flex-col gap-4">
            <a href="/services" className="text-2xl md:text-2xl font-bold hover:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
              Services
            </a>
            <a href="/blog" className="text-2xl md:text-2xl font-bold hover:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
              Blogs
            </a>
            <a href="/contact" className="text-2xl md:text-2xl font-bold hover:text-[#8B5DFF] transition-colors" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
              Contact Us
            </a>
          </div>

          {/* Office Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Office</h4>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              Dhaka, Bangladesh<br />
              Road 12, Block B<br />
              1212
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Contact</h4>
            <div className="flex flex-col gap-2 text-gray-400 text-sm" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              <a href="mailto:contact@foxmenstudio.com" className="hover:text-white transition-colors break-words">contact@foxmenstudio.com</a>
              <a href="mailto:info@foxmenstudio.com" className="hover:text-white transition-colors break-words">info@foxmenstudio.com</a>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Phone</h4>
            <a href="tel:+8801753973892" className="text-gray-400 text-sm hover:text-white transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              +880 1753973892
            </a>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Socials</h4>
            <div className="flex flex-col gap-2 text-gray-400 text-sm" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              <a href="https://www.linkedin.com/company/foxmen-studio/" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://x.com/FoxmenStudio" target="_blank" className="hover:text-white transition-colors">Twitter</a>
              <a href="https://dribbble.com/foxmen-studio" target="_blank" className="hover:text-white transition-colors">Dribbble</a>
              <a href="https://www.facebook.com/profile.php?id=61579940840061&sk=about" target="_blank" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>

        {/* Large Logo */}
        <div className="mt-auto flex justify-center mb-8">
          <div className="relative w-full h-[20vw] max-w-[90vw]">
            <Image
              src="/images/footer-logo.svg"
              alt="Foxmen Studio"
              fill
              className="object-contain transition-all duration-500 hover:drop-shadow-[0_0_35px_rgba(139,93,255,0.6)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#8B5DFF] py-6 px-4 md:px-12">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-black font-medium text-sm" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
          <p>Copyright © Foxmen Studio 2026</p>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-70 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
