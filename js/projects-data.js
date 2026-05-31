// js/projects-data.js
const projectsDatabase = {
    "beaded": {
        title: "Beaded by Unknown E-Commerce",
        subtitle: "A full-stack MERN platform dedicated to handcrafted beaded bracelets, offering a seamless boutique shopping experience with an interactive custom designer, secure PayMongo checkout, and robust 2FA security.",
        role: "Full-Stack Developer",
        year: "2026",
        platform: "E-Commerce Web App",
        overviewHtml: `
            <p>The Beaded by Unknown platform is a comprehensive online boutique designed specifically for artisan handcrafted beaded jewelry. It combines elegant visual merchandising with a powerful MERN stack backend to create a secure, engaging shopping experience tailored to the Philippine market.</p>
            <p>A major standout feature is the interactive custom bracelet visualizer, allowing customers to become the designer. Users can select specific bead collections, string types, hardware, and charms to build and visualize a completely personalized piece in real-time, complete with dynamic pricing and sizing suggestions.</p>
            <p>The platform is engineered for security and efficiency. It includes a robust shopping cart system, secure PayMongo payment integration (supporting GCash, Maya, and cards), OTP-based Two-Factor Authentication for user accounts, and a dedicated Admin Dashboard for managing inventory, blogs, and custom order pipelines.</p>
        `,
        images: [
            "assets/images/bead-showcase-1.png",
            "assets/images/bead-showcase-2.png",
            "assets/images/bead-showcase-3.png",
            "assets/images/bead-showcase-4.png"
        ],
        links: [
            { text: "View High-Fidelity Prototype", url: "#", type: "primary" },
            { text: "Visit Live Website", url: "https://www.beadedbyunknown.shop", type: "secondary" }
        ],
        detailBlocks: [
            {
                title: "E-Commerce Features",
                items: ["Product catalog with dynamic filtering", "Secure PayMongo checkout", "2FA/OTP user authentication", "Real-time order tracking", "Cloudinary image management", "Google OAuth integration"]
            },
            {
                title: "Custom Features",
                items: ["Interactive bracelet visualizer", "Custom order approval pipeline", "Comprehensive Admin dashboard", "Automated email notifications", "Dynamic UI theme engine", "Journal/Blog CMS system"]
            },
            {
                title: "Technologies Used",
                items: ["React.js (Vite)", "Node.js & Express", "MongoDB Atlas", "PayMongo API", "Tailwind CSS", "Nodemailer"]
            }
        ],
        goalsHtml: `
            <div class="project-description" style="grid-column: 1 / -1; margin-top: var(--spacing-md);">
                <h4>Project Goals</h4>
                <p>The platform aims to provide artisan jewelry makers with a professional online storefront while giving customers a highly personalized shopping experience. The focus was on building a secure, scalable backend capable of handling custom product data and local Philippine payment gateways, matched with a luxurious frontend aesthetic.</p>
            </div>
        `,
        achievementsHtml: `
            <section class="project-section">
                <h2 class="section-heading">Key Achievements</h2>
                <div class="project-description">
                    <p>Successfully integrated PayMongo to handle local Philippine payment methods (GCash, Maya, QR Ph), establishing a seamless and secure transaction pipeline. Designed a dynamic email templating system using Nodemailer to automatically send premium, branded receipts and shipping updates to customers.</p>
                    <p>Engineered a highly secure user authentication flow featuring OTP-based Two-Factor Authentication, protecting user data while allowing for secure account creation, password resets, and account deletions.</p>
                    <p>Developed a dedicated Admin Dashboard capable of managing real-time inventory, processing custom design requests, tracking sales metrics via interactive charts, and publishing journal articles, significantly streamlining store operations.</p>
                </div>
            </section>
        `
    },

    "flower": {
        title: "Peony - Full-Stack Flower Catalogue",
        subtitle: "A dynamic, full-stack web application featuring 200 botanically classified flowers, advanced multi-parameter filtering, and secure user authentication for personalized collections.",
        role: "Full-Stack Web Developer",
        year: "2026",
        platform: "Full-Stack Web Application",
        overviewHtml: `
            <p><strong>Peony</strong> is a comprehensive full-stack digital catalogue that brings the beauty and diversity of flowers to users' fingertips. Designed with a seamless user interface and powered by a robust backend, the platform allows users to explore a massive database of blooms with incredible speed and precision.</p>
            <p>The core of the platform is built on a custom botanical database containing 200 uniquely classified flowers. Users can utilize an advanced backend filtering system to narrow down discoveries by specific traits such as color, petal shape, botanical type, and symbolism. A real-time dynamic search bar further enhances navigation with instant visual suggestions.</p>
            <p>Beyond browsing, Peony offers a deeply personalized experience. Implementing a highly secure authentication system featuring Google OAuth, custom JWT login, and API-driven OTP email verification, users can safely create accounts to save their favorite flowers and curate custom botanical collections.</p>
        `,
        images: [
            "assets/images/port-1.png",
            "assets/images/flower-showcase-2.png",
            "assets/images/flower-showcase-3.png",
            "assets/images/flower-showcase-4.png"
        ],
        links: [
            { text: "View High-Fidelity Design", url: "https://www.figma.com/design/oiRcTe3ELknVuerEfHZcGC/Flower-Catalogue-Website?node-id=0-1&t=WxXDQcj3uxaawKoF-1", type: "primary" },
            { text: "Visit Live Website", url: "https://flower-catalogue-website.vercel.app", type: "secondary" }
        ],
        detailBlocks: [
            {
                title: "Key Features",
                items: [
                    "Advanced backend filtering (Color, Petal Shape, Type, Symbolism)", 
                    "Secure OTP email verification and Google OAuth Sign-In", 
                    "Personalized user dashboards for Favorites and Collections", 
                    "Dynamic search bar with real-time visual auto-suggestions",
                    "Custom global modal and alert system for seamless UI/UX"
                ]
            },
            {
                title: "Technologies",
                items: [
                    "Frontend: React, Framer Motion, React Router", 
                    "Backend: Node.js, Express.js", 
                    "Database: MongoDB Atlas, Mongoose", 
                    "Security & APIs: JWT, Bcrypt, Resend Email API"
                ]
            },
            {
                title: "Development Process",
                items: [
                    "Full-stack MERN architecture and deployment", 
                    "Engineering a custom botanical data classification seeder", 
                    "Managing complex global states via React Context", 
                    "Designing responsive, animated components and loading states"
                ]
            }
        ],
        goalsHtml: `
            <div class="detail-block">
                <h4>Impact & Goals</h4>
                <p>The primary goal was to architect a performant, data-driven platform that evolved beyond a static front-end design into a fully functional web application. By integrating a scalable MongoDB backend and strict user authentication protocols, the project successfully delivers a highly interactive, reliable, and personalized experience for botanical enthusiasts.</p>
            </div>
        `,
        achievementsHtml: "" 
    },

    "pixel": {
        title: "Retro MC: Interactive RPG Storefront",
        subtitle: "An immersive, gamified e-commerce experience blending retro pixel-art aesthetics with modern React web functionality.",
        role: "Frontend Developer & UI Designer",
        year: "2026",
        platform: "Web Application (Next.js)",
        overviewHtml: `
            <p>Retro MC redefines the standard e-commerce storefront by transforming the shopping experience into an interactive, retro RPG environment. Instead of a traditional grid, users interact with a merchant character (EJ) and browse halftone graphic tees through a dynamic, sliding inventory system.</p>
            <p>The platform prioritizes deep interactivity, featuring typing dialogue effects, animated parchment scroll popups for quests and guides, and a highly responsive layout that seamlessly adapts its complex UI from large desktop monitors down to mobile devices.</p>
            <p>Special attention was given to bridging state-driven React logic with advanced CSS keyframe animations, ensuring that opening the cart, docking the inventory, and triggering modal transitions feel as snappy and immersive as a classic video game.</p>
        `,
        images: [
            "assets/images/pixel-showcase-1.png",
            "assets/images/pixel-showcase-2.png",
            "assets/images/pixel-showcase-3.png",
            "assets/images/pixel-showcase-4.png"
        ],
        links: [
            { text: "View Design Prototype", url: "#", type: "primary" },
            { text: "Visit Live Website", url: "https://pixel-clothing-website.vercel.app/", type: "secondary" }
        ],
        detailBlocks: [
            {
                title: "Frontend Features",
                items: ["Interactive merchant dialogue system", "Docking & sliding inventory drawer", "Animated scroll-based popups", "Dynamic shopping cart sidebar", "Fluid responsive UI layouts"]
            },
            {
                title: "Design Elements",
                items: ["Pixel-art & retro gaming UI", "Medieval fantasy aesthetic", "Custom CSS scroll animations", "Gamified user experience", "Strict pixel aspect-ratio control"]
            },
            {
                title: "Technologies",
                items: ["React / Next.js", "Advanced CSS3 (Keyframes & Variables)", "JavaScript (State Management)", "HTML5 Semantic Structure"]
            }
        ],
        goalsHtml: `
            <div class="project-description" style="grid-column: 1 / -1; margin-top: var(--spacing-md);">
                <h4>Project Goals</h4>
                <p>The primary objective was to build a specialized storefront that completely gamifies the retail experience. The goal was to master the synchronization between React state management and complex CSS animations to provide a smooth, engaging experience that perfectly mimics a retro game interface without sacrificing the usability of a modern shop.</p>
            </div>
        `,
        achievementsHtml: `
            <section class="project-section">
                <h2 class="section-heading">Key Achievements</h2>
                <div class="project-description">
                    <p>Successfully engineered a complex, layered UI system where dynamic React states (like the shopping cart and inventory drawer) perfectly sequence advanced CSS keyframe animations without overlapping or causing layout shifts.</p>
                    <p>Developed a DRY (Don't Repeat Yourself) CSS architecture for the modal popups, utilizing CSS variables to dynamically control height and unroll animations across different screens. Implemented fluid spacing utilizing CSS <code>clamp()</code> to guarantee the pixel art assets retain their perfect dimensions across all devices.</p>
                </div>
            </section>
        `
    },

    "debut": {
        title: "Lumina 18 - Immersive Birthday Invitation",
        subtitle: "A highly animated, visually stunning digital landing page serving as an exclusive invitation and event hub for an elegant 18th birthday celebration.",
        role: "Creative Developer & UI Animator",
        year: "2026",
        platform: "Interactive Web Experience",
        overviewHtml: `
            <p><strong>Lumina 18</strong> reimagines the traditional birthday invitation as a breathtaking digital experience. Designed to capture the magic and elegance of a milestone 18th birthday, this landing page guides guests through a beautifully choreographed visual journey.</p>
            <p>The site heavily utilizes scroll-triggered animations, parallax effects, and smooth page transitions to complement the aesthetic beauty of the event. Guests can explore the debutante's photo gallery, uncover venue details through interactive maps, and submit their attendance via a seamless, custom-built RSVP form.</p>
            <p>Every interaction—from the initial custom loading sequence to the micro-interactions on the buttons—was meticulously crafted to ensure the website feels alive, creating a memorable first impression for every guest before the party even begins.</p>
        `,
        images: [
            "assets/images/debut-1.png",
            "assets/images/debut-2.png",
            "assets/images/debut-3.png",
            "assets/images/debut-4.png"
        ],
        links: [
            { text: "View Animation Storyboard", url: "https://www.figma.com/design/sample/Debut-Invitation", type: "primary" },
            { text: "Experience Live Invitation", url: "https://lumina18-invitation.vercel.app", type: "secondary" }
        ],
        detailBlocks: [
            {
                title: "Key Features",
                items: [
                    "Cinematic scroll-triggered animations and parallax backgrounds", 
                    "Dynamic, masonry-style photo gallery with lightbox integration", 
                    "Interactive, real-time RSVP submission form with automated email confirmations", 
                    "Custom pre-loader sequence setting the thematic tone",
                    "Fully responsive design optimized for seamless mobile guest access"
                ]
            },
            {
                title: "Technologies",
                items: [
                    "Frontend: React.js, Vite", 
                    "Animation: GSAP (GreenSock), Framer Motion", 
                    "Styling: Tailwind CSS, Custom CSS Keyframes", 
                    "Backend (RSVP): Node.js, Nodemailer"
                ]
            },
            {
                title: "Design Process",
                items: [
                    "Establishing a cohesive mood board and elegant color palette", 
                    "Storyboarding scroll-linked animation sequences to ensure narrative flow", 
                    "Prototyping micro-interactions and page transitions in Figma", 
                    "Aggressive performance optimization to ensure smooth 60fps animations across all devices"
                ]
            }
        ],
        goalsHtml: `
            <div class="detail-block">
                <h4>Impact & Goals</h4>
                <p>The primary goal was to elevate the standard paper event invitation into a piece of interactive digital art. By prioritizing fluid animations and high-end design aesthetics, the project successfully built anticipation and excitement among guests, while simultaneously streamlining the RSVP tracking process for the event organizers.</p>
            </div>
        `,
        achievementsHtml: "" 
    }
};