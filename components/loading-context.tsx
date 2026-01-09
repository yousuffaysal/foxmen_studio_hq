"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface LoadingContextType {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    // Only start as loading if we are on the home page
    const [isLoading, setIsLoading] = useState(true)

    // We need to handle the initial state carefully because pathname might not be available immediately during SSR correctly matching client
    // However, for this specific request "when in home page", we want to ensure we catch the home page visit.
    // We can use an effect to set it, but that might cause a flash. 
    // Better approach: Initialize simply as false, but the HomePreloader (which only mounts on home page or we check pathname) will set it to true immediately? 
    // OR: Initialize based on window check if possible, but simpler is:
    // Let's rely on HomePreloader to drive the logic, OR initialize `true` only if we can determine we are on home. 
    // Since `usePathname` is available, let's use it relative to client hydration.

    // Actually, the requirement creates a small issue: if we duplicate state, we might have sync issues.
    // Let's assume we start false, and if we are on home page, we might want to start true.
    // But doing `useState(pathname === "/")` causes hydration mismatch because server doesn't know pathname the same way sometimes. 
    // Let's stick to `false` and let the Preloader component (which is on the home page) trigger the loading state, 
    // BUT the preloader *itself* needs to delay the showing of other elements.

    // Revised plan for Provider:
    // Just hold the state. The PAGE itself or Layout will determine initial value?
    // Actually, to avoid hydration errors, we usually start with true or false consistent with server.
    // Let's initialize `true` ONLY if we want to default to hidden, but that hides things on other pages.
    // Let's initialize `true` strictly, then set to false immediately if not home?
    // No, better to initialize `false` and have the HomePage component immediately set it to `true`? No, that causes flash.

    // Let's try to infer from pathname in a `useEffect` to avoid hydration error, 
    // but that means first render is "not loading" -> visible -> then hidden -> then visible. That's a flash.

    // Best approach for Next.js app router:
    // Initialize `true`.
    // inside `useEffect`: if pathname !== '/', setIsLoading(false).
    // This means non-home pages *might* flicker hidden for a split second.
    // Alternatively: The user only asked for Home Page.

    // Let's try:
    // State: `isLoading`
    // `usePathname` key to reset?

    // Let's keep it simple:
    // The state is just a tailored boolean.

    useEffect(() => {
        // If we navigate away from home or blog, ensure loading is false
        // But if we navigate TO home or blog, we want to trigger the animation
        if (pathname === "/" || pathname?.startsWith("/blog")) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [pathname])

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider")
    }
    return context
}
