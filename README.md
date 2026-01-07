# Foxmen Studio HQ

> **A high-performance implementation portfolio and agency platform built for the future.**
> Featuring a custom Neo-Brutalist Admin Dashboard, dynamic content management, and a cutting-edge AI assistant powered by Groq.

![Project Status](https://img.shields.io/badge/Status-Active_Development-FFC224?style=for-the-badge&logoColor=black&labelColor=black)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_16_%7C_React_19_%7C_Tailwind_4-000000?style=for-the-badge)
![AI Power](https://img.shields.io/badge/AI-Groq_Llama_3-f55036?style=for-the-badge)
![License](https://img.shields.io/badge/License-Private-gray?style=for-the-badge)

---

## ✨ Key Features

### 🤖 Foxo AI Assistant (Powered by Groq)
-   **Ultra-Fast Responses**: Integrated **Groq AI (Llama 3.3 70B)** for near-instant chat interactions.
-   **Rate-Limit Proof**: Migrated from Google Gemini to Groq to bypass strict free-tier rate limits.
-   **Smart Context**: Awareness of Foxmen Studio's services, branding, and escalation protocols.
-   **Resilient Architecture**: "Soft Fail" database logic ensures the chat works even in read-only environments (like Vercel serverless functions).

### 🎨 Neo-Brutalist Design System
-   **Bold Aesthetics**: High-contrast, thick borders, and vibrant colors (Yellow/Black) defining the Foxmen brand.
-   **Premium UI/UX**: Glassmorphism overlays, smooth transitions, and marquee effects.
-   **Responsive Layouts**: Mobile-first approach ensuring a flawless experience across all devices.

### ⚡ Cutting-Edge Tech Stack
-   **Next.js 16 (Turbopack)**: Leveraging the latest App Router and server actions.
-   **React 19**: Utilizing the newest React features for concurrent rendering.
-   **Tailwind CSS 4.0**: Alpha build for blazing fast styles.
-   **Prisma & SQLite**: Lightweight, file-based database for development.

---

## 🚀 Getting Started

Follow these steps to set up the **Foxmen Studio** local development environment.

### Prerequisites
-   **Node.js**: v18 or higher
-   **Groq API Key**: Get one for free at [groq.com](https://groq.com).

### Quick Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env.local` file in the root:
    ```env
    DATABASE_URL="file:./dev.db"
    GROQ_API_KEY="your_groq_api_key_here"
    ```

3.  **Initialize Database**
    ```bash
    npx prisma db push
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    > **Status**: Running on `http://localhost:3000`

---

## 📦 Deployment Guide (Vercel)

This project is optimized for Vercel, but requires specific settings due to the SQLite database.

### 1. Build Command
Override the Build Command in Vercel settings or use the `package.json` default:
```bash
prisma generate && next build
```
*Why?* Vercel caches dependencies, so we must explicitly generate the Prisma Client on every build.

### 2. Environment Variables
Add the following in Vercel Project Settings:
-   `GROQ_API_KEY`: Your production API key.
-   `DATABASE_URL`: `file:./dev.db` (or a remote Postgres URL if you need persistent history).

### ❗ Important Note on Database
Vercel Serverless Functions have a **read-only file system**. 
-   **Effect**: The app **cannot** save chat history to the SQLite file in production.
-   **Solution**: The app implements a **"Soft Fail"** strategy. If the database write fails, it logs a warning but **allows the chat to proceed**. The user gets their AI response, but the conversation is not saved to the DB.
-   **For Persistent History**: Switch `DATABASE_URL` to a remote Postgres provider (e.g., Neon, Supabase) and update `prisma/schema.prisma` provider to `postgresql`.

---

## 📅 Development Log

### Latest Update: **Groq AI Migration** (Jan 07, 2026)
We successfully migrated the chat backend to **Groq AI** to solve rate-limiting issues.
-   ✅ **Provider Switch**: Replaced Google Gemini with Groq (Llama 3).
-   ✅ **Production Stability**: Implemented "Soft Fail" DB logic to prevent Vercel crashes.
-   ✅ **Frontend Protection**: Added simple debounce (1.5s) to prevent double-submit spam.

### Previous Update: **Dynamic Content Overhaul** (Dec 13, 2025)
-   ✅ **Dynamic Project Details**: Case studies now pull Challenge, Solution, and Outcome data directly from the DB.
-   ✅ **Media Galleries**: Support for multiple project images and video links.

---

<p align="center">
  <strong>Foxmen Studio</strong> &copy; 2026. All rights reserved.<br>
  <em>Built with precision, designed for impact.</em>
</p>
