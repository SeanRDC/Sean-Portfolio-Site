<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![WebGL](https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![GSAP](https://img.shields.io/badge/gsap-%230AE448.svg?style=for-the-badge&logo=gsap&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Sean Dela Cruz | Developer & Engineer Portfolio</h3>

  <p align="center">
    A highly interactive, production-ready developer portfolio built to bridge the gap between solid engineering and high-end UX. Features cinematic scroll sequences, 3D spatial UI elements, and meticulously optimized mobile layouts.
    <br />
    <br />
    <a href="https://www.seandelacruz.com"><strong>View Live Demo »</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#live-preview">Live Preview</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This repository contains the source code for my personal developer portfolio. It was engineered from the ground up to serve as a bridge between solid technical architecture and high-end user experience. Rather than a simple static site, this portfolio acts as an interactive application that demonstrates advanced DOM manipulation, complex animation sequencing, and spatial 3D rendering directly in the browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* **Frontend Architecture:** React 18 (Vite), TypeScript, Tailwind CSS
* **Animation & Interactivity:** GSAP (GreenSock Animation Platform), ScrollTrigger, `@gsap/react` (`useGSAP` hook)
* **Design & Deployment:** Figma (UI/UX Prototyping), GitHub (Version Control), Vercel (Hosting)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE PREVIEW -->
## Live Preview

This portfolio is a fully deployed frontend application. There is no need to clone the repository or set up a local development environment. 

You can explore the interactive elements, 3D certificate gallery, and project case studies directly in your browser:

* 🔗 **[Visit the Live Portfolio: www.seandelacruz.com](https://www.seandelacruz.com)**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- KEY FEATURES -->
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Sean Rhani Jarin Dela Cruz

Project Link: [https://github.com/SeanRDC/portfolio-repo-name](https://github.com/SeanRDC/portfolio-repo-name) <br />
LinkedIn Link: [https://www.linkedin.com/in/sean-rhani-dela-cruz-834573334/](https://www.linkedin.com/in/sean-rhani-dela-cruz-834573334/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
