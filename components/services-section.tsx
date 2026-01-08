"use client"

import { Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef } from "react"

export function ServicesSection() {
  const services = [
    {
      title: "Website Development",
      description: "Custom, high-performance websites built with modern technologies to capture your brand's essence and convert visitors.",
      image: "https://ik.imagekit.io/2lax2ytm2/Website%20Developemt.svg",
    },
    {
      title: "UI/UX design",
      description: "User-centric design that blends aesthetics with functionality, creating intuitive and engaging digital experiences.",
      image: "https://ik.imagekit.io/2lax2ytm2/thursday.social%20(1).svg",
    },
    {
      title: "Mobile app development",
      description: "Scalable, native and cross-platform mobile applications engineered for seamless performance and user retention.",
      image: "https://ik.imagekit.io/2lax2ytm2/Mobile%20Deve%20(1).svg",
    },
    {
      title: "AI Agent & Automation",
      description: "Custom AI solutions and intelligent automation to streamline operations, optimize workflows, and scale your business efficiency.",
      image: "https://ik.imagekit.io/2lax2ytm2/agent%20(1).svg",
    },
    {
      title: "Branding",
      description: "Strategic brand identity design that communicates your core values, resonates with your audience, and creates lasting market impact.",
      image: "https://ik.imagekit.io/2lax2ytm2/Frame%20427319390.png",
    },
  ]

  return (
    <section className="bg-white py-16 md:py-24" style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }}>
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
              Our broad <span className="bg-[#FF4A60] text-white px-3 py-1 inline-block rounded-lg -rotate-2 mx-2 transform">set of services</span>
            </h2>
            <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
              We craft bespoke web, mobile, and AI solutions that transform ambitious brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}

            <div className="bg-[#6E35FF] border-[3px] border-black rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-center text-center hover:translate-y-[-4px] transition-transform aspect-square relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-6 bg-white w-20 h-20 rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  src="/images/get-in-touch.svg"
                  alt="Get in touch"
                  width={64}
                  height={64}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-[28px] leading-[40px] font-bold mb-4 text-white" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>Get in touch</h3>
              <p className="text-[18px] leading-[30px] font-medium text-white/90 mb-6" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                Looking for another service? Get in touch with us!
              </p>
              <Button className="bg-black text-white hover:bg-gray-900 rounded-[16px] px-12 py-4 font-medium text-[18px] w-full max-w-[340px] h-[52px]" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                <Mail className="w-5 h-5 mr-2" />
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: any }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch((e) => console.log("Autoplay blocked:", e))
    }
  }, [])

  return (
    <div className="bg-[#A085F3] border-[3px] border-black rounded-[32px] overflow-hidden hover:translate-y-[-4px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 aspect-square flex flex-col group">
      <div className="h-[65%] -mx-[3px] -mt-[3px] overflow-hidden rounded-t-[29px] relative bg-[#F3F4F6]">
        {service.video ? (
          <video
            ref={videoRef}
            src={service.video}
            autoPlay
            loop
            muted
            playsInline={true}
            preload="auto"
            className="w-full h-full rounded-t-[29px] group-hover:scale-110 transition-transform duration-500 ease-out object-contain block"
          />
        ) : (
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover rounded-t-[29px] group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        )}
      </div>
      <div className="p-2 flex flex-col h-[35%]">
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl px-4 py-2 flex flex-col gap-1 h-full justify-center border border-white/10">
          <h3 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>{service.title}</h3>
          <p className="text-xs leading-relaxed font-medium text-white/80 line-clamp-3" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{service.description}</p>
        </div>
      </div>
    </div>
  )
}
