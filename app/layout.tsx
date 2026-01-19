import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Geist_Mono as Geist_Mono_Font } from "next/font/google"
import localFont from "next/font/local"
import TargetCursor from "@/components/target-cursor"
import { FoxoChatWidget } from "@/components/foxo-chat-widget"
import { LoadingProvider } from "@/components/loading-context"
import { SmoothScroller } from "@/components/smooth-scroller"

// Initialize fonts
const _geistMono = Geist_Mono_Font({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})



const ownersMediumFont = localFont({
  src: "./fonts/OwnersTRIAL-Medium-BF64361ef81f92b.otf",
  variable: "--font-owners-medium",
})
const ownersRegularFont = localFont({
  src: "./fonts/OwnersTRIAL-Regular-BF64361ef86ac54.otf",
  variable: "--font-owners-regular",
})

const interSemiBoldFont = localFont({
  src: "./fonts/Inter-SemiBold.otf",
  variable: "--font-inter-semibold",
})

const interRegularFont = localFont({
  src: "./fonts/Inter-Regular.otf",
  variable: "--font-inter-regular",
})

const interLightFont = localFont({
  src: "./fonts/Inter-Light-BETA.otf",
  variable: "--font-inter-light",
})

const interThinFont = localFont({
  src: "./fonts/Inter-Thin-BETA.otf",
  variable: "--font-inter-thin",
})

const neueMontrealFont = localFont({
  src: "./fonts/neue-montreal-regular.otf",
  variable: "--font-neue-montreal",
})

const ibmPlexSansRegularFont = localFont({
  src: "./fonts/ibm-plex-sans-3/IBMPlexSans-Regular.ttf",
  variable: "--font-ibm-plex-sans",
})

const ibmPlexSansMediumFont = localFont({
  src: "./fonts/ibm-plex-sans-3/IBMPlexSans-Medium.ttf",
  variable: "--font-ibm-plex-sans-medium",
})

const ibmPlexSansBoldFont = localFont({
  src: "./fonts/ibm-plex-sans-3/IBMPlexSans-Bold.ttf",
  variable: "--font-ibm-plex-sans-bold",
})

const ibmPlexMonoRegularFont = localFont({
  src: "./fonts/IBMPlexMono-Regular.ttf",
  variable: "--font-ibm-plex-mono",
})


export const metadata: Metadata = {
  metadataBase: new URL("https://www.foxmen.studio"),
  title: {
    default: "Foxmen Studio | Building End-to-End Premium Web, Mobile, UI/UX & SaaS Experiences",
    template: "%s | Foxmen Studio",
  },
  description:
    "We are a full-service creative agency specializing in custom web development, mobile apps, UI/UX design, and scalable SaaS solutions. We build digital products that drive growth.",
  keywords: [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "SaaS Development",
    "Next.js",
    "Tailwind CSS",
    "React Native",
    "Foxmen Studio",
  ],
  authors: [{ name: "Foxmen Studio" }],
  creator: "Foxmen Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.foxmen.studio",
    title: "Foxmen Studio | Premium Digital Product Development",
    description:
      "From idea to launch, we build high-performance websites and mobile apps. Expert developers & designers for your next big project.",
    siteName: "Foxmen Studio",
    images: [
      {
        url: "https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png",
        width: 1200,
        height: 630,
        alt: "Foxmen Studio - Building the Future of Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foxmen Studio | Premium Digital Product Development",
    description:
      "Expert web & mobile app development. We turn complex ideas into elegant digital solutions.",
    images: ["https://res.cloudinary.com/dk2txf8o3/image/upload/v1767629242/on_Logo_gma5n0.png"],
    creator: "@foxmenstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.foxmen.studio",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

import type { Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${ownersMediumFont.variable} ${ownersRegularFont.variable} ${interSemiBoldFont.variable} ${interRegularFont.variable} ${interLightFont.variable} ${interThinFont.variable} ${neueMontrealFont.variable} ${ibmPlexSansRegularFont.variable} ${ibmPlexSansMediumFont.variable} ${ibmPlexSansBoldFont.variable} ${ibmPlexMonoRegularFont.variable} font-sans antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Foxmen Studio",
              url: "https://www.foxmen.studio",
              logo: "https://www.foxmen.studio/logo.png",
              sameAs: [
                "https://x.com/FoxmenStudio",
                "https://www.linkedin.com/company/foxmen-studio/",
                "https://www.facebook.com/profile.php?id=61579940840061&sk=about",
                "https://dribbble.com/foxmen-studio",
                "https://www.youtube.com/@Foxmen-Studio",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-0123",
                contactType: "sales",
                areaServed: "Worldwide",
                availableLanguage: "English",
              },
            }),
          }}
        />
        <LoadingProvider>
          <SmoothScroller>
            <TargetCursor
              spinDuration={2}
              hideDefaultCursor={true}
              parallaxOn={true}
              targetSelector="a, button, input, textarea, .cursor-pointer, .cursor-target, [role='button'], [data-cal-link]"
            />
            <FoxoChatWidget />
            {children}
          </SmoothScroller>
        </LoadingProvider>
      </body>
    </html>
  )
}
