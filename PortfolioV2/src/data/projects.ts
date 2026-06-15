export type ProjectDetail = {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  platform: string;
  cover: string;
  overview: string[];
  gallery: string[];
  prototypeUrl: string;
  liveUrl: string;
  technologies: string[];
  features: string[];
  goals: string[];
  achievements: string[];
};

const violetRose =
  "radial-gradient(70% 80% at 35% 25%, rgba(255,111,165,0.6), transparent 60%), radial-gradient(60% 70% at 82% 80%, rgba(123,92,255,0.5), transparent 60%), #14141f";
const roseCyan =
  "radial-gradient(70% 80% at 40% 30%, rgba(255,111,165,0.55), transparent 60%), radial-gradient(60% 70% at 80% 80%, rgba(79,210,255,0.5), transparent 60%), #14141f";
const violetCyan =
  "radial-gradient(70% 80% at 35% 25%, rgba(123,92,255,0.6), transparent 60%), radial-gradient(60% 70% at 80% 80%, rgba(79,210,255,0.55), transparent 60%), #14141f";
const cyanRose =
  "radial-gradient(70% 80% at 40% 30%, rgba(79,210,255,0.55), transparent 60%), radial-gradient(60% 70% at 80% 80%, rgba(255,111,165,0.5), transparent 60%), #14141f";

const alt1 =
  "radial-gradient(80% 90% at 70% 20%, rgba(123,92,255,0.45), transparent 60%), #0f0f18";
const alt2 =
  "radial-gradient(80% 90% at 25% 75%, rgba(79,210,255,0.42), transparent 60%), #0f0f18";

export const projects: ProjectDetail[] = [
  {
    id: "beaded-by-unknown",
    title: "Beaded by Unknown",
    subtitle: "A handcrafted jewelry brand, brought online with intent.",
    role: "Design & Build",
    year: "2025",
    platform: "Web",
    cover: "url('/work/beaded-cover.webp') center/cover no-repeat",
    overview: [
      "Beaded by Unknown needed more than a shop — it needed a stage. Each piece is made by hand, so the storefront had to carry that same sense of care: slow, tactile, and unmistakably personal.",
      "I designed and built the full experience around the product photography, letting negative space and motion do the selling. The result is a catalogue that feels less like a store and more like a lookbook you can buy from.",
    ],
    gallery: [violetRose, alt1, alt2],
    prototypeUrl: "#",
    liveUrl: "#",
    technologies: ["React", "Tailwind CSS", "TypeScript", "GSAP", "Figma"],
    features: [
      "Editorial lookbook gallery",
      "Bead-by-bead product detail",
      "Wishlist & save",
      "Frictionless cart",
    ],
    goals: [
      "Make handmade feel premium",
      "Center the photography",
      "Reduce steps to purchase",
    ],
    achievements: [
      "+38% session duration",
      "Sold-out first drop",
      "Fully responsive build",
    ],
  },
  {
    id: "flower-catalogue",
    title: "Flower Catalogue",
    subtitle: "A serene browsing experience for a boutique florist.",
    role: "Design & Build",
    year: "2025",
    platform: "Web",
    cover: "url('/work/flower-cover.webp') center/cover no-repeat",
    overview: [
      "A florist's catalogue lives and dies by its imagery. The brief was calm, considered browsing — somewhere between a gallery and a garden — where every arrangement gets room to breathe.",
      "I built a soft, glass-layered interface that frames each bouquet, with gentle motion guiding the eye from one seasonal collection to the next.",
    ],
    gallery: [roseCyan, alt2, alt1],
    prototypeUrl: "#",
    liveUrl: "#",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Figma"],
    features: [
      "Seasonal collections",
      "Arrangement detail view",
      "Care-guide tooltips",
      "Inquiry-to-order flow",
    ],
    goals: [
      "Calm, gallery-like browsing",
      "Highlight seasonality",
      "Make ordering feel effortless",
    ],
    achievements: [
      "2× catalogue engagement",
      "Cleaner ordering funnel",
      "Brand-defining visual system",
    ],
  },
  {
    id: "pixel-ecommerce",
    title: "Pixel E-Commerce",
    subtitle: "A pixel-perfect storefront for a digital goods shop.",
    role: "Product Design & Build",
    year: "2024",
    platform: "Web App",
    cover: "url('/work/pixel-cover.webp') center/cover no-repeat",
    overview: [
      "Pixel is a storefront for digital assets — icons, kits, and templates — where the audience is designers themselves. That raised the bar: every interaction had to feel as crafted as the products on sale.",
      "I designed the full commerce flow and built it as a fast, responsive web app, with a component system tight enough to scale across hundreds of listings.",
    ],
    gallery: [violetCyan, alt1, alt2],
    prototypeUrl: "#",
    liveUrl: "#",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Recharts", "Figma"],
    features: [
      "Faceted search & filters",
      "Instant preview",
      "License selection",
      "Creator dashboards",
    ],
    goals: [
      "Designer-grade polish",
      "Fast discovery at scale",
      "Clear licensing",
    ],
    achievements: [
      "Scaled to 300+ listings",
      "Sub-second search",
      "Reusable design system",
    ],
  },
  {
    id: "debut-invitation",
    title: "Debut Invitation",
    subtitle: "An interactive digital invitation for a milestone celebration.",
    role: "Design & Build",
    year: "2024",
    platform: "Web",
    cover: "url('/work/debut-cover.webp') center/cover no-repeat",
    overview: [
      "A debut is a once-in-a-lifetime event, and the invitation needed to feel like an experience in its own right — not a static card, but a small story that unfolds as the guest scrolls.",
      "I designed and built an interactive, motion-led page that reveals the details with a sense of occasion, ending in a simple, warm RSVP.",
    ],
    gallery: [cyanRose, alt2, alt1],
    prototypeUrl: "#",
    liveUrl: "#",
    technologies: ["React", "Tailwind CSS", "GSAP", "Figma"],
    features: [
      "Scroll-told narrative",
      "Event detail reveals",
      "Animated RSVP",
      "Add-to-calendar",
    ],
    goals: [
      "Make it feel like an event",
      "Effortless RSVP",
      "Memorable first impression",
    ],
    achievements: [
      "94% RSVP completion",
      "Shared widely by guests",
      "Bespoke motion design",
    ],
  },
];

export function getProject(id: string | undefined): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}

export function getNeighbors(id: string | undefined) {
  const i = projects.findIndex((p) => p.id === id);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
