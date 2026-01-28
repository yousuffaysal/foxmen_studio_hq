"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const LOCK_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export function AdminAutoLock() {
    const router = useRouter();

    const checkForInactivity = useCallback(() => {
        const lastActive = localStorage.getItem("adminLastActive");
        if (lastActive) {
            const now = Date.now();
            if (now - parseInt(lastActive, 10) > LOCK_TIMEOUT_MS) {
                // Time expired, lock it
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminLastActive");
                router.push("/admin/login");
            }
        } else {
            // First run or cleared, set current
            localStorage.setItem("adminLastActive", Date.now().toString());
        }
    }, [router]);

    const updateActivity = useCallback(() => {
        localStorage.setItem("adminLastActive", Date.now().toString());
    }, []);

    useEffect(() => {
        // Initial check
        checkForInactivity();

        const events = [
            "mousedown",
            "mousemove",
            "keypress",
            "scroll",
            "touchstart",
            "click"
        ];

        // Optimize by throttling updates? 
        // For simplicity and effectiveness, we update timestamp on event, 
        // and check periodically. Or simpler: just reset a timeout.

        // Let's go with the Timeout Reset approach for cleaner in-memory behavior, 
        // with LocalStorage as backup for page reloads.

        let timeoutId: NodeJS.Timeout;

        const resetTimer = () => {
            updateActivity();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                localStorage.removeItem("adminToken");
                router.push("/admin/login");
            }, LOCK_TIMEOUT_MS);
        };

        // Start timer
        resetTimer();

        // Add listeners
        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        // Interval check (optional, but good for cross-tab or sleep wake)
        const intervalId = setInterval(checkForInactivity, 60000); // Check every minute

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [router, updateActivity, checkForInactivity]);

    return null; // This component handles side-effects only
}
