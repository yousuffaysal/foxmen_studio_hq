"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminAutoLock } from "@/components/admin-auto-lock";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/admin/login") return;
        const token = localStorage.getItem("adminToken");
        if (!token) router.push("/admin/login");
    }, [router, pathname]);

    return (
        <div className="min-h-screen flex bg-slate-50 text-slate-900">
            <AdminAutoLock />
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
