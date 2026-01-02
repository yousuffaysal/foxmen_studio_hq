# Foxmen Studio HQ

> **A high-performance implementation portfolio and agency platform built for the future.**
> Featuring a custom Neo-Brutalist Admin Dashboard, dynamic content management, and a cutting-edge tech stack.

![Project Status](https://img.shields.io/badge/Status-Active_Development-FFC224?style=for-the-badge&logoColor=black&labelColor=black)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_15_%7C_React_19_%7C_Tailwind_4-000000?style=for-the-badge)
![License](https://img.shields.io/badge/License-Private-gray?style=for-the-badge)

---

## ✨ Key Features

### 🎨 Neo-Brutalist Design System
-   **Bold Aesthetics**: High-contrast, thick borders, and vibrant colors (Yellow/Black) defining the Foxmen brand.
-   **Premium UI/UX**: Glassmorphism overlays, smooth transitions, and marquee effects.
-   **Responsive Layouts**: Mobile-first approach ensuring a flawless experience across all devices.

### ⚡ Cutting-Edge Tech Stack
-   **Next.js 15**: Leveraging the latest App Router, Server Actions, and Partial Prerendering.
-   **React 19 RC**: Utilizing the newest React features for concurrent rendering and state management.
-   **Tailwind CSS 4.0**: Alpha build for blazing fast styles and zero-runtime overhead.
-   **PostgreSQL (Neon)**: Serverless Postgres for robust, scalable data storage.

### 🛠️ Powerful Admin Dashboard
-   **CMS Capabilities**: Full CRUD for Projects, Blogs, and Messages.
-   **Secure Auth**: Custom middleware protection with smart session handling.
-   **Media Management**: Drag-and-drop image uploads with instant previews and gallery management.

---

## 🚀 Getting Started

Follow these steps to set up the **Foxmen Studio** local development environment.

### Prerequisites
-   **Node.js**: v18 or higher
-   **Database**: PostgreSQL connection string (Neon DB recommended)

### 1. Backend Setup
The backend service manages authentication, API routes, and database interactions.

```bash
cd backend
npm install
npm run dev
```
> **Status**: Running on `http://localhost:5001`

### 2. Frontend Setup
The main Next.js application powering the public portfolio and admin panel.

```bash
# In the root directory
npm install
npm run dev
```
> **Status**: Running on `http://localhost:3000`

---

## 📂 Project Structure

```bash
├── 📁 app              # Next.js App Router pages (Frontend & Admin)
│   ├── 📁 admin        # Protected Admin Dashboard routes
│   │   ├── 📁 blog     # Blog management
│   │   ├── 📁 projects # Project case studies
│   │   └── 📁 messages # Contact form submissions
│   └── 📁 (public)     # Public facing pages (Home, Portfolio, Contact)
├── 📁 components       # Reusable UI components (Neo-Brutalist style)
├── 📁 backend          # Express.js Server & API Routes
│   ├── 📁 config       # Database & Environment config
│   ├── 📁 controllers  # Business logic
│   └── 📁 routes       # API Endpoints
└── 📁 public           # Static assets, images, and icons
```

---

## 📅 Development Log

### Latest Update: **Dynamic Content Overhaul** (Dec 13, 2025)
We have successfully transitioned from static templates to a fully dynamic, database-driven content system.

-   ✅ **Dynamic Project Details**: Case studies now pull Challenge, Solution, and Outcome data directly from the DB.
-   ✅ **Media Galleries**: Support for multiple project images, mobile views, and video links (Cloudinary integration).
-   ✅ **Admin Polish**: Redesigned "Add Project" flow with tabbed interfaces and better form validation.
-   ✅ **Security**: Enhanced session expiry handling and robust error feedback.

### Previous Update: **Admin Redesign** (Dec 12, 2025)
-   ✅ Complete visual overhaul of the Admin Panel to match the **Foxmen Studio** brand.
-   ✅ Integrated `multer` for local file uploads.
-   ✅ Fixed SSL and connection stability issues with Neon DB.

---

## 🗺️ Roadmap

-   [ ] **Blog Integration**: Connect public Blog pages to live database data.
-   [ ] **Rich Text Editor**: Implement a WYSIWYG editor for writing blog posts in Admin.
-   [ ] **Cloud Storage**: Migrate from local uploads to AWS S3/Cloudinary for production.
-   [ ] **CI/CD**: Automate deployment pipelines for Vercel and Render.

---

<p align="center">
  <strong>Foxmen Studio</strong> &copy; 2026. All rights reserved.<br>
  <em>Built with precision, designed for impact.</em>
</p>
