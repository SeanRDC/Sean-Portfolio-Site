# Sean Dela Cruz | Developer & Engineer Portfolio

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-GreenSock-88CE02.svg)](https://gsap.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)

> A highly interactive, production-ready developer portfolio built to bridge the gap between solid engineering and high-end UX. Features cinematic scroll sequences, 3D spatial UI elements, and meticulously optimized mobile layouts.

**[View Live Demo](#)**

---

## Key Features

### Cinematic Scroll Sequences
* **Aperture Intro:** Custom GSAP timelines controlling a fluid, locked-scroll text shuffle animation upon entry, creating a cinematic opening sequence.
* **Seamless Transitions:** Scrubbing animations powered by ScrollTrigger that smoothly link the Index, Profile, Projects, Stack, and Contact scenes.

### 3D Spatial UI & Interactions
* **Certificate Ring Gallery:** A custom-built 3D orbit sequence utilizing `preserve-3d` and `translateZ` depth calculations to render a rotating, interactive gallery of technical milestones.
* **Depth & Illusion Handling:** Aggressive mobile offset calculations to counteract 3D spatial shrinking, ensuring background elements perfectly hug and bleed off the edges of mobile screens.

### Immersive Resume Viewer
* **Paper Format Modal:** A custom scrollable resume modal that aggressively locks the background viewport (preventing scroll-bleed) while rendering high-quality static pages over a blurred overlay.
* **Instant Download:** Native PDF download integration directly from the floating modal UI.

### Responsive Architecture
* **Dynamic Typography:** Fluid text scaling using CSS `clamp()` to guarantee perfect proportions and readability from small phones to ultrawide monitors.
* **Context-Aware Navigation:** A dynamic header that reacts to scroll depth, mobile viewpoints, and active scenes (e.g., dynamically switching to a "Back" action when inside a project case study).

---

## Tech Stack

### Frontend Architecture
* **Framework:** React 18 (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS

### Animation & Interactivity
* **Engine:** GSAP (GreenSock Animation Platform)
* **Plugins:** ScrollTrigger, `@gsap/react` (`useGSAP` hook)
* **DOM Rendering:** Custom WebGL-like 3D manipulation using native CSS spatial properties.

### Design, Build & Deployment
* **UI/UX Prototyping:** Figma
* **Version Control:** GitHub
* **Deployment & Hosting:** Vercel
