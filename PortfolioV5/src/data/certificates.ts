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
    link: "https://www.credly.com/badges/62be9ccd-87c7-411b-9571-c2fb008b82e2/linked_in_profile"
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
  {
    label: "OWASP Top 10 - 2021",
    meta: "Infosec - 2026",
    kind: "CERT",
    image: "/certs/OWASP.webp",
  },
  {
    label: "Introduction to Dart",
    meta: "Google Cloud - 2026",
    kind: "CERT",
    image: "/certs/GC1.webp",
  },
  {
    label: "AI Capabilities & Limitations",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A1.webp",
  },
  {
    label: "AI Fluency for Builders",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A2.webp",
  },
  {
    label: "AI Fluency for educators",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A3.webp",
  },
  {
    label: "AI Fluency for nonprofits",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A4.webp",
  },
  {
    label: "AI Fluency for Small Business",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A5.webp",
  },
  {
    label: "AI Fluency for students",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A6.webp",
  },
  {
    label: "AI Framework & Foundations",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A7.webp",
  },
  {
    label: "Claude 101",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A8.webp",
  },
  {
    label: "Teaching the AI Fluency Framework",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A9.webp",
  },
  {
    label: "Claude Cowork",
    meta: "Antrophic Academy - 2026",
    kind: "CERT",
    image: "/certs/Antrophic/A10.webp",
  },
  {
    label: "CSS (Basic)",
    meta: "HackerRank Skills - 2026",
    kind: "SKILL",
    image: "/certs/Hackerrank/H1.webp",
  },
  {
    label: "Problem Solving (Basic)",
    meta: "HackerRank Skills - 2026",
    kind: "SKILL",
    image: "/certs/Hackerrank/H2.webp",
  },
  {
    label: "Python (Basic)",
    meta: "HackerRank Skills - 2026",
    kind: "SKILL",
    image: "/certs/Hackerrank/H3.webp",
  },
  {
    label: "Developing AI App w/ Python & Flask",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I1.webp",
  },
  {
    label: "Intro to AI",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I2.webp",
  },
  {
    label: "Intro to Software Engineering",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I3.webp",
  },
  {
    label: "Gen AI: Intro and Apps",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I4.webp",
  },
  {
    label: "Python for Data Science, AI & Development",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I5.webp",
  },
  {
    label: "Gen AI: Elevate Software Career",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I6.webp",
  },
  {
    label: "Building Gen AI Powered Apps",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I7.webp",
  },
  {
    label: "Software Dev Career Guide",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I8.webp",
  },
  {
    label: "Intro to HTML, CSS & JavaScript",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I9.webp",
  },
  {
    label: "Gen AI: Prompt Engineering",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/I10.webp",
  },
  {
    label: "IBM AI Developer",
    meta: "IBM - 2026",
    kind: "CERT",
    image: "/certs/IBM/IBM.webp",
  },
];
