"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FolderKanban, FileText, MessageSquare, LogOut, Layers, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const links = [
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/dashboard", label: "AI Chats", icon: LayoutDashboard },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [username, setUsername] = useState("Admin");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("adminUser");
        if (stored) {
            try { setUsername(JSON.parse(stored).username || "Admin"); } catch {}
        }
    }, []);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    if (pathname === "/admin/login") return null;

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="px-5 py-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Layers size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">Studio Admin</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                {links.map(({ href, label, icon: Icon }) => {
                    const active = pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                active
                                    ? "bg-white/10 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                        {username[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate capitalize">{username}</p>
                        <p className="text-xs text-slate-500">Administrator</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <LogOut size={16} />
                    Sign out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-56 min-h-screen bg-slate-900 flex-col flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed bottom-5 right-5 z-50 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>

            {/* Mobile drawer */}
            {mobileOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
                    <aside className="fixed top-0 left-0 h-full w-56 bg-slate-900 z-50 flex flex-col lg:hidden">
                        <SidebarContent />
                    </aside>
                </>
            )}
        </>
    );
}
