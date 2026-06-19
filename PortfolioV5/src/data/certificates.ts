// src/data/certificates.ts

export type Tile = {
  label: string;
  meta: string;
  kind: string;
  image: string;
  link?: string;
};

export const TILES: Tile[] = [
  {
    label: "Introduction to Networks",
    meta: "Cisco - Certified",
    kind: "CERT",
    image: "/certs/itn.webp",
  },
  {
    label: "Google UX Design",
    meta: "Professional - 2025",
    kind: "CERT",
    image: "/certs/cg1.webp",
  },
  {
    label: "Relational Database",
    meta: "freeCodeCamp - 2026",
    kind: "CERT",
    image: "/certs/fccrdb.webp",
  },
  {
    label: "Responsive Web Design",
    meta: "freeCodeCamp - 2025",
    kind: "CERT",
    image: "/certs/fccrwb.webp",
  },
  {
    label: "CSS Essentials",
    meta: "Cisco - 2026",
    kind: "CERT",
    image: "/certs/cse.webp",
  },
  {
    label: "HTML Essentials",
    meta: "Cisco - 2025",
    kind: "CERT",
    image: "/certs/he.webp",
  },
  {
    label: "JavaScript Essentials 1",
    meta: "Cisco - 2025",
    kind: "CERT",
    image: "/certs/je1.webp",
  },
  {
    label: "JavaScript Essentials 2",
    meta: "Cisco - 2026",
    kind: "CERT",
    image: "/certs/je2.webp",
  },
  {
    label: "Python Essentials 1",
    meta: "Cisco - 2024",
    kind: "CERT",
    image: "/certs/pe1.webp",
  },
  {
    label: "Python Essentials 2",
    meta: "Cisco - 2024",
    kind: "CERT",
    image: "/certs/pe2.webp",
  },
  {
    label: "Foundations of UX Design",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg2.webp",
  },
  {
    label: "UX Design Process",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg4.webp",
  },
  {
    label: "High-Fidelity Prototypes",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg5.webp",
  },
  {
    label: "UX Research",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg7.webp",
  },
  {
    label: "Low-Fidelity Prototypes",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg8.webp",
  },
  {
    label: "Dynamic UI for Web",
    meta: "Google - 2025",
    kind: "CERT",
    image: "/certs/cg9.webp",
  },
  {
    label: "Git Training",
    meta: "SimpliLearn - 2025",
    kind: "CERT",
    image: "/certs/gt.webp",
  },
  {
    label: "Git & GitHub",
    meta: "LinkedIn - 2025",
    kind: "CERT",
    image: "/certs/lgag.webp",
  },
];
