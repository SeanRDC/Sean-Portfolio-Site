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
            { text: "Visit Live Website", url: "#", type: "secondary" }
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
        title: "Flower Catalogue Website",
        subtitle: "A modern, searchable digital catalogue designed to help users discover and explore a diverse collection of flowers with detailed information and beautiful imagery.",
        role: "Web Designer & Developer",
        year: "2025",
        platform: "Web Application",
        overviewHtml: `
            <p>The Flower Catalogue Website is a comprehensive digital platform that brings the beauty and diversity of flowers to users' fingertips. Designed with both enthusiasts and casual browsers in mind, this project combines elegant visual design with intuitive functionality.</p>
            <p>The platform features an advanced search system that allows users to filter flowers by type, color, season, and care requirements. Each flower entry includes detailed information, and high-quality imagery to provide a complete understanding of each species.</p>
            <p>With a focus on user experience and accessibility, the website ensures that discovering and learning about flowers is both enjoyable and informative for users of all knowledge levels.</p>
        `,
        images: [
            "assets/images/port-1.png",
            "assets/images/flower-showcase-2.png",
            "assets/images/flower-showcase-3.png",
            "assets/images/flower-showcase-4.png"
        ],
        links: [
            { text: "View High-Fidelity Design", url: "https://www.figma.com/design/oiRcTe3ELknVuerEfHZcGC/Flower-Catalogue-Website?node-id=0-1&t=WxXDQcj3uxaawKoF-1", type: "primary" },
            { text: "Visit Live Website", url: "https://seanrdc.github.io/Flower-Catalogue-Website/", type: "secondary" }
        ],
        detailBlocks: [
            {
                title: "Key Features",
                items: ["Search and filter system", "Detailed flower profiles", "Responsive design for all devices", "Interactive image galleries"]
            },
            {
                title: "Technologies",
                items: ["HTML5 & CSS3", "JavaScript (ES6+)", "Responsive Web Design", "UI/UX Best Practices"]
            },
            {
                title: "Design Process",
                items: ["User research and personas", "Wireframing and prototyping", "Visual design in Figma", "Iterative testing and refinement", "Development and deployment"]
            }
        ],
        goalsHtml: `
            <div class="detail-block">
                <h4>Impact & Goals</h4>
                <p>The project aims to make botanical knowledge accessible and engaging, helping users discover new flowers, and appreciate the diversity of floral species. The intuitive interface ensures that both beginners and experts can easily navigate and find the information they need.</p>
            </div>
        `,
        achievementsHtml: "" // Left blank because Flower doesn't have an achievements section!
    }
};