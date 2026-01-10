"use client"
import { useLoading } from "@/components/loading-context";

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

interface TargetCursorProps {
    targetSelector?: string;
    spinDuration?: number;
    hideDefaultCursor?: boolean;
    hoverDuration?: number;
    parallaxOn?: boolean;
}

const TargetCursor = ({
    targetSelector = '.cursor-target',
    spinDuration = 2,
    hideDefaultCursor = true,
    hoverDuration = 0.2,
    parallaxOn = true
}: TargetCursorProps) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cornersRef = useRef<NodeListOf<Element> | null>(null);
    const spinTl = useRef<gsap.core.Timeline | null>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    const isActiveRef = useRef(false);
    const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
    const tickerFnRef = useRef<(() => void) | null>(null);
    const activeStrengthRef = useRef({ current: 0 });

    const isMobile = useMemo(() => {
        if (typeof window === 'undefined') return false;
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
        return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
    }, []);

    const constants = useMemo(
        () => ({
            borderWidth: 1.5,
            cornerSize: 5
        }),
        []
    );

    const moveCursor = useCallback((x: number, y: number) => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
            x,
            y,
            duration: 0.1,
            ease: 'power3.out'
        });
    }, []);

    useEffect(() => {
        // Initial check
        if (typeof window === 'undefined') return;

        // We use a mutable ref to track if we should be active based on resize
        const shouldBeActive = () => window.innerWidth >= 768 && !isMobile;

        if (!shouldBeActive() || !cursorRef.current) return;

        const originalCursor = document.body.style.cursor;
        if (hideDefaultCursor) {
            document.body.style.cursor = 'none';
        }

        const cursor = cursorRef.current;
        cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

        let activeTarget: Element | null = null;
        let currentLeaveHandler: (() => void) | null = null;
        let resumeTimeout: NodeJS.Timeout | null = null;

        const cleanupTarget = (target: Element) => {
            if (currentLeaveHandler) {
                target.removeEventListener('mouseleave', currentLeaveHandler);
            }
            currentLeaveHandler = null;
        };

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        const createSpinTimeline = () => {
            if (spinTl.current) {
                spinTl.current.kill();
            }
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        };

        createSpinTimeline();

        const tickerFn = () => {
            if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
                return;
            }
            const strength = activeStrengthRef.current.current;
            if (strength === 0) return;
            const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
            const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;
            const corners = Array.from(cornersRef.current);
            corners.forEach((corner, i) => {
                const currentX = gsap.getProperty(corner, 'x') as number;
                const currentY = gsap.getProperty(corner, 'y') as number;
                const targetX = targetCornerPositionsRef.current![i].x - cursorX;
                const targetY = targetCornerPositionsRef.current![i].y - cursorY;
                const finalX = currentX + (targetX - currentX) * strength;
                const finalY = currentY + (targetY - currentY) * strength;
                const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
                gsap.to(corner, {
                    x: finalX,
                    y: finalY,
                    duration: duration,
                    ease: duration === 0 ? 'none' : 'power1.out',
                    overwrite: 'auto'
                });
            });
        };

        tickerFnRef.current = tickerFn;

        const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
        window.addEventListener('mousemove', moveHandler);

        const scrollHandler = () => {
            if (!activeTarget || !cursorRef.current) return;
            const mouseX = gsap.getProperty(cursorRef.current, 'x') as number;
            const mouseY = gsap.getProperty(cursorRef.current, 'y') as number;
            const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
            const isStillOverTarget =
                elementUnderMouse &&
                (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
            if (!isStillOverTarget) {
                if (currentLeaveHandler) {
                    currentLeaveHandler();
                }
            }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

        const mouseDownHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
        };

        const mouseUpHandler = () => {
            if (!dotRef.current) return;
            gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        const enterHandler = (e: MouseEvent) => {
            const directTarget = e.target as HTMLElement;
            const allTargets: Element[] = [];
            let current: HTMLElement | null = directTarget;
            while (current && current !== document.body) {
                if (current.matches(targetSelector)) {
                    allTargets.push(current);
                }
                current = current.parentElement;
            }
            const target = allTargets[0] || null;
            if (!target || !cursorRef.current || !cornersRef.current) return;
            if (activeTarget === target) return;
            if (activeTarget) {
                cleanupTarget(activeTarget);
            }
            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }

            activeTarget = target;
            const corners = Array.from(cornersRef.current);
            corners.forEach(corner => gsap.killTweensOf(corner));
            gsap.killTweensOf(cursorRef.current, 'rotation');
            spinTl.current?.pause();
            gsap.set(cursorRef.current, { rotation: 0 });

            const rect = target.getBoundingClientRect();
            const { borderWidth, cornerSize } = constants;
            const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
            const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;

            targetCornerPositionsRef.current = [
                { x: rect.left - borderWidth, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
                { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
                { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
            ];

            isActiveRef.current = true;
            gsap.ticker.add(tickerFnRef.current!);

            gsap.to(activeStrengthRef.current, { current: 1, duration: hoverDuration, ease: 'power2.out' });

            corners.forEach((corner, i) => {
                gsap.to(corner, {
                    x: targetCornerPositionsRef.current![i].x - cursorX,
                    y: targetCornerPositionsRef.current![i].y - cursorY,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            const leaveHandler = () => {
                if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
                isActiveRef.current = false;
                targetCornerPositionsRef.current = null;
                gsap.set(activeStrengthRef.current, { current: 0, overwrite: true });
                activeTarget = null;
                if (cornersRef.current) {
                    const corners = Array.from(cornersRef.current);
                    gsap.killTweensOf(corners);
                    const { cornerSize } = constants;
                    const positions = [
                        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
                        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
                        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
                        { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
                    ];
                    const tl = gsap.timeline();
                    corners.forEach((corner, index) => {
                        tl.to(corner, { x: positions[index].x, y: positions[index].y, duration: 0.3, ease: 'power3.out' }, 0);
                    });
                }
                resumeTimeout = setTimeout(() => {
                    if (!activeTarget && cursorRef.current && spinTl.current) {
                        const currentRotation = gsap.getProperty(cursorRef.current, 'rotation') as number;
                        const normalizedRotation = currentRotation % 360;
                        spinTl.current.kill();
                        spinTl.current = gsap
                            .timeline({ repeat: -1 })
                            .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
                        gsap.to(cursorRef.current, {
                            rotation: normalizedRotation + 360,
                            duration: spinDuration * (1 - normalizedRotation / 360),
                            ease: 'none',
                            onComplete: () => {
                                spinTl.current?.restart();
                            }
                        });
                    }
                    resumeTimeout = null;
                }, 50);
                cleanupTarget(target);
            };
            currentLeaveHandler = leaveHandler;
            target.addEventListener('mouseleave', leaveHandler);
        };

        window.addEventListener('mouseover', enterHandler, { passive: true });

        const checkResize = () => {
            // If we drop below 768px, we should kill the cursor logic
            if (window.innerWidth < 768 && isActiveRef.current) {
                if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
                document.body.style.cursor = originalCursor;
                isActiveRef.current = false;
                // Hide the dot/cursor visually as well just in case (though CSS handles this too)
                if (cursorRef.current) gsap.set(cursorRef.current, { opacity: 0 });
            } else if (window.innerWidth >= 768 && !isActiveRef.current && !isMobile) {
                // Re-enable if moving back to desktop
                if (cursorRef.current) gsap.set(cursorRef.current, { opacity: 1 });
                // Note: Full re-initialization might be needed here, but for now we ensure it stops on mobile.
            }
        };

        window.addEventListener('resize', checkResize);

        return () => {
            if (tickerFnRef.current) {
                gsap.ticker.remove(tickerFnRef.current);
            }
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseover', enterHandler);
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
            window.removeEventListener('resize', checkResize);
            if (activeTarget) {
                cleanupTarget(activeTarget);
            }
            spinTl.current?.kill();
            document.body.style.cursor = originalCursor;
            isActiveRef.current = false;
            targetCornerPositionsRef.current = null;
            activeStrengthRef.current.current = 0;
        };
    }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

    useEffect(() => {
        if (isMobile || !cursorRef.current || !spinTl.current) return;
        if (spinTl.current.isActive()) {
            spinTl.current.kill();
            spinTl.current = gsap
                .timeline({ repeat: -1 })
                .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
        }
    }, [spinDuration, isMobile]);

    const { isLoading } = useLoading();

    // if (isMobile) {
    //     return null;
    // }

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 w-0 h-0 pointer-events-none z-[99999] hidden md:block ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{ willChange: 'transform', mixBlendMode: 'difference' }}
        >
            <div
                ref={dotRef}
                className="absolute top-1/2 left-1/2 w-[2px] h-[2px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: 'transform' }}
            />
            <div
                className="target-cursor-corner absolute top-1/2 left-1/2 w-[5px] h-[5px] border-[1.5px] border-white -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"
                style={{ willChange: 'transform' }}
            />
            <div
                className="target-cursor-corner absolute top-1/2 left-1/2 w-[5px] h-[5px] border-[1.5px] border-white translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"
                style={{ willChange: 'transform' }}
            />
            <div
                className="target-cursor-corner absolute top-1/2 left-1/2 w-[5px] h-[5px] border-[1.5px] border-white translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"
                style={{ willChange: 'transform' }}
            />
            <div
                className="target-cursor-corner absolute top-1/2 left-1/2 w-[5px] h-[5px] border-[1.5px] border-white -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"
                style={{ willChange: 'transform' }}
            />
        </div>
    );
};

export default TargetCursor;
