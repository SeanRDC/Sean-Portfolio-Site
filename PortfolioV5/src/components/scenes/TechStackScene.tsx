import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type TechCategory = {
  name: string;
  role: string;
  badges: string[];
};

// Grouped stack to drastically reduce scroll length while looking premium
const STACK: TechCategory[] = [
  {
    name: "Languages",
    role: "Syntax, logic, and foundations",
    badges: [
      "https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white",
      "https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white",
      "https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white",
      "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white",
      "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",
      "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
      "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
      "https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white",
      "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
      "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
    ],
  },
  {
    name: "Frontend",
    role: "Client-side architecture & UI",
    badges: [
      "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
      "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white",
      "https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D",
      "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
      "https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white",
      "https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white",
      "https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black",
      "https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white",
      "https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white",
      "https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white&style=for-the-badge",
      "https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white",
      "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white",
      "https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white",
    ],
  },
  {
    name: "Mobile & Cross-Platform",
    role: "Native apps & desktop environments",
    badges: [
      "https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
      "https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white",
      "https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white",
    ],
  },
  {
    name: "Backend & Data",
    role: "Servers, APIs, and databases",
    badges: [
      "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white",
      "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB",
      "https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white",
      "https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white",
      "https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white",
      "https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%23BBDEAD",
      "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
      "https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white",
      "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white",
      "https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white",
    ],
  },
  {
    name: "Cloud & DevOps",
    role: "Deployment, CI/CD, and hosting",
    badges: [
      "https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white",
      "https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white",
      "https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase",
      "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
      "https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white",
      "https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white",
      "https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=%2300C7B7",
      "https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white",
      "https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white",
      "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",
      "https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white",
      "https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white",
      "https://img.shields.io/badge/gitlab%20CI-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white",
    ],
  },
  {
    name: "Tools & Design",
    role: "Workflows and creative direction",
    badges: [
      "https://img.shields.io/badge/PowerShell-%235391FE.svg?style=for-the-badge&logo=powershell&logoColor=white",
      "https://img.shields.io/badge/Windows%20Terminal-%234D4D4D.svg?style=for-the-badge&logo=windows-terminal&logoColor=white",
      "https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white",
      "https://img.shields.io/badge/cisco-%23049fd9.svg?style=for-the-badge&logo=cisco&logoColor=black",
      "https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white",
      "https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white",
      "https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white",
      "https://img.shields.io/badge/Adobe%20Lightroom-31A8FF.svg?style=for-the-badge&logo=Adobe%20Lightroom&logoColor=white",
      "https://img.shields.io/badge/Adobe%20After%20Effects-9999FF.svg?style=for-the-badge&logo=Adobe%20After%20Effects&logoColor=white",
    ],
  },
];

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function TechStackScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-paper"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden border-y border-line">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 md:grid-cols-2">
          
          {/* Sticky Heading */}
          <div className="relative flex flex-col justify-center border-line px-6 md:border-r md:px-10">
            <div className="font-mono-x mb-6 text-[11px] uppercase tracking-[0.4em] text-ink-dim">
              03 - Capability
            </div>
            <h2 className="t-colossal text-[clamp(56px,11vw,150px)] leading-[0.82] text-ink">
              TECH
              <br />
              STACK
            </h2>
            <p className="mt-8 max-w-xs font-body text-[14px] font-light leading-relaxed text-ink-soft">
              One continuous system - from the database layer to the DOM, from
              the circuit to the chassis.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-24 bg-line-strong">
                <div
                  className="h-full bg-ink"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="font-mono-x text-[10px] tabular-nums text-ink-dim">
                {String(Math.round(progress * 100)).padStart(2, "0")}%
              </span>
            </div>
          </div>

          {/* Scrolling Categories List */}
          <div className="relative overflow-hidden px-6 md:px-10">
            <div
              className="absolute inset-x-6 md:inset-x-10"
              style={{
                top: "50%",
                transform: `translateY(calc(-${progress * 100}% + 26vh))`,
                willChange: "transform",
              }}
            >
              {STACK.map((cat, i) => {
                const center = (i + 0.5) / STACK.length;
                const near = 1 - clamp01(Math.abs(progress - center) / 0.18);
                
                return (
                  <div
                    key={cat.name}
                    className="flex flex-col gap-5 border-b border-line py-8"
                    style={{ opacity: 0.35 + near * 0.65 }}
                  >
                    {/* Category Title Header */}
                    <div className="flex items-center gap-6">
                      <span className="font-mono-x w-8 text-[12px] text-ink-faint">
                        0{i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="t-display text-[clamp(26px,4vw,42px)] leading-none text-ink">
                          {cat.name}
                        </div>
                        <div className="mt-2 font-mono-x text-[11px] uppercase tracking-wider text-ink-dim">
                          {cat.role}
                        </div>
                      </div>
                    </div>

                    {/* Badge Wrap Layout */}
                    <div className="pl-14 flex flex-wrap gap-2.5">
                      {cat.badges.map((url, j) => (
                        <img 
                          key={j} 
                          src={url} 
                          alt="Tech Badge" 
                          draggable={false}
                          className="h-[26px] md:h-[28px] w-auto object-contain rounded-sm"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Center reading line & fading gradients */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-paper to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}