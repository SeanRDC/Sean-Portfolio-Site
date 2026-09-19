# Sean's Personal Portfolio V5

A highly interactive, performant, and deeply animated personal portfolio built for a Full-Stack Agentic AI Automation Developer. This project leverages React, Vite, TypeScript, and Tailwind CSS, featuring seamless page transitions, custom WebGL shaders, smooth scrolling, and complex GSAP scroll animations.

## ✨ Key Features

* **Custom WebGL Shaders:** Native WebGL implementations for dynamic backgrounds (`StoneCanvas`) and visual effects (`FilmGrain`) without the overhead of heavy 3D libraries.
* **Advanced Animations:** Scroll-driven narratives, character wave reveals, and seamless layout morphs powered by GSAP (`ScrollTrigger`, `useGSAP`).
* **Smooth Scrolling:** Integrated Lenis smooth scroll for a premium, fluid browsing experience.
* **Interactive 3D Carousel:** A mathematics-driven 3D cylinder sequence for showcasing certificates (`RingScene`), complete with a dedicated archive view.
* **Analytics Tracking:** Built-in Google Analytics (`gtag`) integration and Core Web Vitals reporting.
* **Responsive Editorial Design:** A meticulously crafted design system utilizing CSS variables (`--paper`, `--ink`) for light/dark mode inversions and cohesive typography (Archivo, Instrument Serif, Space Mono).

## 🛠️ Tech Stack & Dependencies

### Core Frameworks
* **[React](https://react.dev/)** (`react`, `react-dom`) - UI Library
* **[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling
* **[TypeScript](https://www.typescriptlang.org/)** - Static typing

### Libraries & Tools
* **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
* **[React Router](https://reactrouter.com/)** (`react-router-dom`) - Client-side routing
* **[GSAP](https://gsap.com/)** (`gsap`, `@gsap/react`) - Core animation engine
* **[Lenis](https://lenis.studiofreight.com/)** (`lenis`) - Smooth scrolling
* **[Web Vitals](https://github.com/GoogleChrome/web-vitals)** (`web-vitals`) - Performance metrics

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on a fresh machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

### 2. Install Dependencies
If your repository already includes the `package.json` and `package-lock.json` files, simply run:
```bash
npm install
```

**Missing `package.json`? Manual Installation:**
If you ever need to reconstruct the project dependencies from scratch, run the following commands:

*Install Production Dependencies:*
```bash
npm install react react-dom react-router-dom gsap @gsap/react lenis web-vitals
```

*Install Development Dependencies:*
```bash
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer
```

*Initialize Tailwind CSS (if `tailwind.config.js` is missing):*
```bash
npx tailwindcss init -p
```
*(Ensure the content array in `tailwind.config.js` includes `"./src/**/*.{js,ts,jsx,tsx}"`)*

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` (or the port provided in your terminal).

## 📁 Project Structure

```text
src/
├── components/        # Reusable UI components (Nav, SmoothScroll, FilmGrain, StoneCanvas)
│   └── scenes/        # Major page sections (Aperture, Profile, Projects, TechStack, Ring, Contact)
├── data/              # Static data structures (certificates.ts)
├── lib/               # Utility functions (webgl.ts)
├── screens/           # Main page routes (HomeView.tsx, certificatesArchive.tsx)
├── App.tsx            # Root application component
├── AnalyticsTracker.tsx # Google Analytics integration
├── routes.tsx         # React Router configuration
├── index.css          # Global styles, fonts, and Tailwind directives
└── main.tsx           # Entry point
```

## 📜 Scripts

* `npm run dev`: Starts the Vite development server.
* `npm run build`: Compiles TypeScript and builds the app for production into the `dist` folder.
* `npm run preview`: Bootstraps a local web server to preview your production build.

## 🤝 Maintenance Notes
* **GSAP MatchMedia:** Make sure to test GSAP animations thoroughly if adjusting breakpoints, as many scenes use `gsap.matchMedia()` to disable or alter heavy animations on mobile devices.
* **WebGL Contexts:** The `FilmGrain` and `StoneCanvas` components manage their own WebGL contexts directly. They include `IntersectionObserver` logic to pause the `requestAnimationFrame` loop when out of view to save battery and CPU.