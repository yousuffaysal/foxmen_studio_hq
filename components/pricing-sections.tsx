"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, ArrowRight, Zap, Star, Crown } from "lucide-react"
import Link from "next/link"

// ── helpers ──────────────────────────────────────────────────────────────────

const BRAND_PURPLE = "#8B5DFF"
const BRAND_DARK   = "#414042"
const BRAND_BG     = "#FFFFF3"
const BRAND_YELLOW = "#8B5DFF"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

// ── data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "starter",
    icon: Zap,
    label: "Starter",
    name: "Launch",
    tagline: "A professional website, delivered fast.",
    price: { monthly: 1200, annual: 960 },
    currency: "$",
    badge: null,
    features: [
      "Up to 5-page website",
      "Mobile-friendly design",
      "Search engine optimisation (SEO)",
      "2 rounds of feedback & revisions",
      "Delivered in 2 weeks",
      "1 month of post-launch support",
    ],
    cta: "Get Started",
    accent: BRAND_DARK,
    cardClass: "border border-[#414042]/15 bg-[#FFFFF3]",
    ctaClass: "bg-[#414042] text-white hover:bg-[#8B5DFF]",
  },
  {
    id: "studio",
    icon: Star,
    label: "Most Popular",
    name: "Studio",
    tagline: "Everything you need to grow your business online.",
    price: { monthly: 3800, annual: 3040 },
    currency: "$",
    badge: "Most Popular",
    features: [
      "Fully custom website or web application",
      "Complete UI/UX design & visual identity",
      "Advanced search engine optimisation",
      "Content management system (CMS)",
      "4 rounds of feedback & revisions",
      "Delivered in 4 weeks",
      "3 months of priority support",
      "Speed & performance optimisation",
    ],
    cta: "Choose This Plan",
    accent: BRAND_PURPLE,
    cardClass: "border border-[#8B5DFF] bg-[#1a0b3b]",
    ctaClass: "bg-[#8B5DFF] text-white hover:bg-[#7040e0]",
    dark: true,
  },
  {
    id: "enterprise",
    icon: Crown,
    label: "Enterprise",
    name: "Enterprise",
    tagline: "Large-scale projects, tailored to your goals.",
    price: { monthly: null, annual: null },
    currency: "$",
    badge: null,
    features: [
      "Custom project plan & timeline",
      "Website, mobile app & AI solutions",
      "Full brand identity & design guide",
      "Dedicated project manager",
      "Unlimited feedback & revisions",
      "Long-term partnership (6+ months)",
      "Round-the-clock support",
      "Built to scale as your business grows",
    ],
    cta: "Schedule a Call",
    accent: BRAND_PURPLE,
    cardClass: "border border-[#414042]/15 bg-[#FFFFF3]",
    ctaClass: "bg-[#8B5DFF] text-white hover:bg-[#7040e0]",
  },
]

const addons = [
  { name: "Extra Revision Round",       price: "$200" },
  { name: "Content Writing (per page)", price: "$120" },
  { name: "Logo & Brand Kit",           price: "$800" },
  { name: "Monthly Maintenance",        price: "$180/mo" },
  { name: "AI Chatbot Integration",     price: "$600" },
  { name: "Analytics Dashboard",        price: "$400" },
]

const faqs = [
  {
    q: "Can I pay in instalments?",
    a: "Yes. We ask for 50% upfront to begin the project and the remaining 50% upon final delivery. For larger, long-term projects, we can also arrange monthly payment schedules.",
  },
  {
    q: "What does post-launch support include?",
    a: "Support covers fixing any issues that arise, making small text or image updates, and keeping an eye on site performance. Any new features or major changes would be quoted separately.",
  },
  {
    q: "Can I change or upgrade my plan during the project?",
    a: "Absolutely. If your needs change, we will adjust the project plan and pricing accordingly — you only pay the difference.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — we work with clients all over the world and are fully comfortable collaborating remotely across different time zones.",
  },
  {
    q: "How does the feedback and revision process work?",
    a: "After each design or development milestone, we share a preview for your review. You provide your feedback, we apply the changes — it is a straightforward, collaborative process from start to finish.",
  },
]

// ── sub-components ────────────────────────────────────────────────────────────

function PricingHero({ billing, setBilling }: { billing: "monthly" | "annual"; setBilling: (v: "monthly" | "annual") => void }) {
  return (
    <section className="relative bg-[#FFFFF3] pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden border-b border-[#414042]/10">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#414042 1px,transparent 1px),linear-gradient(90deg,#414042 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.span
          {...fadeUp(0.05)}
          className="block font-mono text-xs text-[#8B5DFF] mb-6 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          Our Plans
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1
              {...fadeUp(0.12)}
              className="text-6xl md:text-[7.5rem] font-bold text-[#414042] leading-[0.88] tracking-tight"
              style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
            >
              PLANS BUILT<br />FOR GROWTH.
            </motion.h1>
            <motion.p
              {...fadeUp(0.22)}
              className="mt-6 max-w-lg text-[#414042]/60 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              Clear, straightforward pricing with no hidden fees.<br />
              Choose the plan that fits your goals and let&apos;s get to work.
            </motion.p>
          </div>

          {/* Toggle */}
          <motion.div {...fadeUp(0.28)} className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setBilling("monthly")}
              className={`text-xs font-mono uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-[#414042] text-white border-[#414042]"
                  : "text-[#414042]/50 border-[#414042]/20 hover:border-[#414042]/50"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`text-xs font-mono uppercase tracking-widest px-4 py-2 border transition-all duration-200 relative ${
                billing === "annual"
                  ? "bg-[#414042] text-white border-[#414042]"
                  : "text-[#414042]/50 border-[#414042]/20 hover:border-[#414042]/50"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              Annual
              <span className="absolute -top-3 -right-3 bg-[#8B5DFF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                −20%
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PricingCards({ billing }: { billing: "monthly" | "annual" }) {
  return (
    <section className="bg-[#FFFFF3] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#414042]/10">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            const priceVal = plan.price[billing]

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col p-8 md:p-10 relative ${plan.cardClass} ${
                  i < plans.length - 1 ? "border-b md:border-b-0 md:border-r border-[#414042]/10" : ""
                }`}
              >
                {plan.badge && (
                  <div
                    className="absolute top-0 right-8 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest px-3 py-1"
                    style={{ backgroundColor: BRAND_PURPLE, color: "#fff", fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Label + Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: plan.accent, fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {plan.label}
                  </span>
                  <Icon className="w-4 h-4" style={{ color: plan.accent }} />
                </div>

                {/* Name */}
                <h2
                  className={`text-4xl md:text-5xl font-bold leading-tight mb-2 ${plan.dark ? "text-white" : "text-[#414042]"}`}
                  style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                >
                  {plan.name}
                </h2>
                <p
                  className={`text-xs mb-8 ${plan.dark ? "text-white/50" : "text-[#414042]/50"}`}
                  style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                >
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-10">
                  {priceVal !== null ? (
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-5xl md:text-6xl font-bold leading-none ${plan.dark ? "text-white" : "text-[#414042]"}`}
                        style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                      >
                        ${priceVal.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs mb-2 ${plan.dark ? "text-white/40" : "text-[#414042]/40"}`}
                        style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                      >
                        / project
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`text-3xl font-bold ${plan.dark ? "text-white" : "text-[#414042]"}`}
                      style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                    >
                      Custom
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className={`h-px mb-8 ${plan.dark ? "bg-white/10" : "bg-[#414042]/10"}`} />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: plan.accent }} />
                      <span
                        className={`text-xs leading-relaxed ${plan.dark ? "text-white/70" : "text-[#414042]/70"}`}
                        style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/contact">
                  <button
                    className={`w-full py-4 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 group ${plan.ctaClass}`}
                    style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                  >
                    {plan.cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AddonsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="bg-[#111111] py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <motion.span
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="block font-mono text-xs text-[#8B5DFF] mb-6 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          Optional Services
        </motion.span>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
          >
            ENHANCE<br />YOUR PLAN.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.18 }}
            className="max-w-xs text-white/40 text-xs leading-relaxed"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            Add any of these services to your chosen plan for a fully tailored solution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {addons.map((addon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="flex justify-between items-center py-5 px-2 border-b border-white/5 group hover:bg-white/[0.03] transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-[#8B5DFF]" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                  {addon.name}
                </span>
              </div>
              <span className="text-sm font-bold text-[#8B5DFF]" style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}>
                {addon.price}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="bg-[#FFFFF3] py-16 md:py-28 border-t border-[#414042]/10">
      <div className="container mx-auto px-4 md:px-8">
        <motion.span
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="block font-mono text-xs text-[#8B5DFF] mb-6 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          Common Questions
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-6xl font-bold text-[#414042] mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
        >
          COMMON<br />QUESTIONS.
        </motion.h2>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="border-b border-[#414042]/10"
            >
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="text-sm md:text-base font-medium text-[#414042] group-hover:text-[#8B5DFF] transition-colors"
                  style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
                >
                  {faq.q}
                </span>
                <span
                  className={`text-xl text-[#8B5DFF] shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open === i ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p
                  className="text-xs md:text-sm text-[#414042]/60 leading-relaxed"
                  style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                >
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCTA() {
  return (
    <section className="bg-[#050505] py-20 md:py-32 relative overflow-hidden">
      {/* Purple glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5DFF 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="block font-mono text-xs text-[#8B5DFF] mb-6 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          Start Your Project
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl font-bold text-white leading-[0.9] mb-8"
          style={{ fontFamily: "var(--font-ibm-plex-sans-medium)" }}
        >
          YOUR VISION,<br />OUR<br />
          <span style={{ color: "#8B5DFF" }}>EXPERTISE.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-sm mb-12 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          Choose a plan above or contact us — we will work together to find the right solution for your project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/contact">
            <button
              className="inline-flex items-center gap-4 bg-[#8B5DFF] text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#7040e0] transition-colors duration-200 group"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              Book a Free Call
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ── main export ───────────────────────────────────────────────────────────────

export function PricingSections() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")

  return (
    <>
      <PricingHero billing={billing} setBilling={setBilling} />
      <PricingCards billing={billing} />
      <AddonsSection />
      <FaqSection />
      <PricingCTA />
    </>
  )
}
