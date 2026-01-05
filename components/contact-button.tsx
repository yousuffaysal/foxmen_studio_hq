"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ContactButtonProps {
    className?: string
    onClick?: () => void
}

export function ContactButton({ className, onClick }: ContactButtonProps) {
    return (
        <Link href="/contact" className={className} onClick={onClick}>
            <div className="contact-btn-wrapper">
                <style jsx>{`
                    .button {
                        --main-size: 1.8em; /* Slightly adjusted for navbar fit */
                        --color-text: #ffffff;
                        --color-background: #000000; /* Black background */
                        --color-brand-primary: #6E35FF; /* Original Brand Purple */
                        --color-brand-dark: #5a2bd9; /* Original Darker Purple */
                        --color-outline: #6e35ff40;
                        --color-shadow: #00000040;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-decoration: none;
                        border: none;
                        border-radius: calc(var(--main-size) * 100);
                        padding: 0.33em 1em; /* Initial padding */
                        padding-right: 0.8em; /* Less padding on right initially */
                        gap: 0.3em; /* Tighter gap initially */
                        font-family: inherit;
                        font-weight: 600;
                        font-size: var(--main-size);
                        color: var(--color-text);
                        background: var(--color-background);
                        box-shadow: 0 0 0.2em 0 var(--color-background);
                        transition: 1s;
                        position: relative;
                        overflow: visible;
                        width: auto; /* Dynamic width */
                        min-width: unset; /* Remove fixed width */
                        height: 70px;
                    }

                    .button:active {
                        transform: scale(0.95);
                    }

                    .button:hover {
                        outline: 0.1em solid transparent;
                        outline-offset: 0.2em;
                        box-shadow: 0 0 1em 0 var(--color-brand-primary);
                        animation: ripple 1s linear infinite, colorize 1s infinite;
                        padding-right: 1.2em; /* Increase padding on hover */
                        gap: 0.6em; /* Increase gap on hover */
                        transition: 0.5s;
                    }

                    .button span {
                        margin-right: 0;
                        transition: 0.5s;
                        font-size: 20px;
                        text-transform: uppercase;
                    }

                    .button:hover span {
                        text-shadow: 5px 5px 5px var(--color-shadow);
                    }

                    .button:active span {
                        text-shadow: none;
                    }

                    .button svg {
                        height: 1em;
                        fill: var(--color-text);
                        margin-right: 0;
                        position: relative;
                        transition: 0.5s;
                    }

                    .button:hover svg {
                        margin-right: 0;
                        transition: 0.5s;
                        filter: drop-shadow(5px 5px 2.5px var(--color-shadow));
                    }

                    .button:active svg {
                        filter: none;
                    }

                    .button svg polygon:nth-child(1) {
                        transition: 0.4s;
                        transform: translateX(-60%);
                    }

                    .button svg polygon:nth-child(2) {
                        transition: 0.5s;
                        transform: translateX(-30%);
                    }

                    .button:hover svg polygon:nth-child(1) {
                        transform: translateX(0%);
                        animation: opacity 1s infinite 0.6s;
                    }

                    .button:hover svg polygon:nth-child(2) {
                        transform: translateX(0%);
                        animation: opacity 1s infinite 0.4s;
                    }

                    .button:hover svg polygon:nth-child(3) {
                        animation: opacity 1s infinite 0.2s;
                    }

                    @keyframes opacity {
                        0% { opacity: 1; }
                        50% { opacity: 0; }
                        100% { opacity: 1; }
                    }

                    @keyframes colorize {
                        0% { background: var(--color-brand-primary); }
                        50% { background: var(--color-brand-dark); }
                        100% { background: var(--color-brand-primary); }
                    }

                    @keyframes ripple {
                        0% {
                            outline: 0em solid transparent;
                            outline-offset: -0.1em;
                        }
                        50% {
                            outline: 0.2em solid var(--color-outline);
                            outline-offset: 0.2em;
                        }
                        100% {
                            outline: 0.4em solid transparent;
                            outline-offset: 0.4em;
                        }
                    }
                `}</style>
                <button className="button">
                    <span>CONTACT US</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                        <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                        <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                        <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                    </svg>
                </button>
            </div>
        </Link>
    )
}
