import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const P1 = "21 year old Full-Stack Agentic AI Automation Developer based in the Philippines, pursuing my Bachelor's degree in Computer Science while interning as a Backend AI Engineer at Flyrank AI.";
const P2 = "A Python enthusiast, solving everyday coding challenges. Technical expertise backed by professional certifications in Google's UI/UX Design, IBM's AI Development, and n8n professional workflow automation.";

// Helper function to split text into words and characters for the GSAP wave animation
const renderText = (text: string) => {
  return text.split(" ").map((word, wIdx) => (
    <span key={wIdx} className="inline-block mr-[0.25em]">
      {word.split("").map((char, cIdx) => (
        <span
          key={cIdx}
          className="wave-char inline-block"
          style={{ color: "rgba(19, 18, 16, 0.15)" }} 
        >
          {char}
        </span>
      ))}
    </span>
  ));
};

export default function ProfileScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray(".wave-char");
      const targetColor = "rgba(19, 18, 16, 1)"; 

      gsap.to(chars, {
        color: targetColor,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5, 
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="relative min-h-screen bg-paper py-24 md:py-32 flex items-center z-20 shadow-[0_-30px_40px_-15px_rgba(0,0,0,0.15)] rounded-t-[50px]"
    >
      <style>{`
        :root {
          --light-gray: #d6d2c8;
          --dark-gray: #55524e;
          --gray: #9b9484;
          --dark-blue: #2b293e;
          --light-blue: #35b7da;
        }

        #computer {
          position: absolute;
          width: 340px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.5);
          z-index: 10;
          pointer-events: none;
          background:
          /* Bottom Section */
          repeating-linear-gradient(90deg, var(--gray) 0 10px, var(--light-gray) 10px 18px) 258px 236px / 64px 10px,
          repeating-linear-gradient(90deg, var(--dark-gray) 0 10px, var(--light-gray) 10px 18px) 258px 246px / 64px 38px,
          linear-gradient(var(--dark-gray), var(--dark-gray)) 166px 264px / 10px 14px,
          linear-gradient(var(--light-gray) 10px, var(--dark-gray) 10px) 144px 248px / 80px 20px,
          linear-gradient(90deg, var(--dark-gray) 10px, var(--gray) 10px) 124px 236px / 110px 48px,
          linear-gradient(90deg, var(--gray) 10px, var(--light-gray) 10px) 90px 230px / 250px 60px,
          linear-gradient(90deg, var(--gray) 10px, var(--light-gray) 10px) 100px 220px / 240px 80px,
          linear-gradient(var(--dark-gray), var(--dark-gray)) 10px bottom / 330px 80px,
          linear-gradient(var(--dark-gray), var(--dark-gray)) left bottom / 320px 70px,

          /* Top Section */
          linear-gradient(90deg, var(--gray) 18px, var(--light-gray) 18px 26px, var(--gray) 26px 36px, var(--dark-gray) 36px 122px, var(--light-gray) 122px 160px, var(--gray) 160px) 120px 180px / 170px 10px,
          linear-gradient(var(--gray) 10px, var(--dark-blue) 10px 150px, var(--gray) 150px) 130px 10px / 150px 160px,
          linear-gradient(90deg, var(--gray) 10px, var(--dark-blue) 10px 180px, var(--gray) 180px) 110px 30px / 190px 120px,
          linear-gradient(var(--gray), var(--gray)) 120px 20px / 170px 140px,
          linear-gradient(var(--light-gray), var(--light-gray)) 110px top / 190px 200px,
          linear-gradient(90deg, var(--gray) 10px, var(--light-gray) 10px) 90px 10px / 220px 180px,
          linear-gradient(var(--gray), var(--gray)) 100px top / 200px 200px,
          linear-gradient(var(--dark-gray), var(--dark-gray)) 40px top / 260px 200px,
          linear-gradient(90deg, var(--dark-gray) 50%, var(--light-gray) 50%) 30px 10px / 280px 180px,

          /* Back section */
          linear-gradient(90deg, var(--dark-gray) 96px, var(--gray) 96px) 70px 210px / 216px 14px,
          linear-gradient(var(--dark-gray), var(--dark-gray)) 90px 190px / 178px 30px;
          background-repeat: no-repeat;
        }

        #computer::before {
          content: "";
          display: block;
          position: absolute;
          width: 10px;
          height: 10px;
          top: 95px;
          left: 175px;
          background-color: var(--light-blue);
          animation: hello 3500ms linear infinite forwards alternate;
        }

        @keyframes hello {
          0%, 18% {
            box-shadow: 
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            40px -30px 0 var(--light-blue),
            40px -20px 0 var(--light-blue),
            10px -30px 0 var(--light-blue),
            10px -20px 0 var(--light-blue),
            50px 0 0 var(--light-blue),
            40px 10px 0 var(--light-blue),
            30px 10px 0 var(--light-blue),
            20px 10px 0 var(--light-blue),
            10px 10px 0 var(--light-blue);
          }
          24%, 38% {
            box-shadow:
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            50px -30px 0 var(--light-blue),
            40px -20px 0 var(--light-blue),
            0 -30px 0 var(--light-blue),
            10px -20px 0 var(--light-blue),
            50px 0 0 var(--light-blue),
            40px 10px 0 var(--light-blue),
            30px 0 0 var(--light-blue),
            20px 10px 0 var(--light-blue),
            10px 10px 0 var(--light-blue);
          }
          44%, 58% {
            box-shadow:
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            50px -30px 0 var(--light-blue),
            50px 0 0 var(--light-blue),
            40px 10px 0 var(--light-blue),
            30px -20px 0 var(--light-blue),
            30px 0 0 var(--light-blue),
            30px 10px 0 var(--light-blue),
            10px -10px var(--light-blue),
            0 -30px 0 var(--light-blue),
            0 -20px 0 var(--light-blue),
            0 10px 0 var(--light-blue);
          }
          64%, 78% {
            box-shadow:
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            0 0 0 var(--light-blue),
            50px -30px 0 var(--light-blue),
            50px 0 0 var(--light-blue),
            50px 10px 0 var(--light-blue),
            30px -30px 0 var(--light-blue),
            30px -20px 0 var(--light-blue),
            30px 0 0 var(--light-blue),
            30px 10px 0 var(--light-blue),
            10px -10px var(--light-blue),
            0 -30px 0 var(--light-blue),
            0 -20px 0 var(--light-blue),
            0 10px 0 var(--light-blue);
          }
          84%, 100% {
            box-shadow:
            50px -30px 0 var(--light-blue),
            50px -10px 0 var(--light-blue),
            50px 0 0 var(--light-blue),
            50px 10px 0 var(--light-blue),
            30px -30px 0 var(--light-blue),
            30px -20px 0 var(--light-blue),
            30px -10px 0 var(--light-blue),
            30px 0 0 var(--light-blue),
            30px 10px 0 var(--light-blue),
            20px -10px 0 var(--light-blue),
            10px -10px 0 var(--light-blue),
            0 -30px 0 var(--light-blue),
            0 -20px 0 var(--light-blue),
            0 -10px var(--light-blue),
            0 10px 0 var(--light-blue);
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-16 md:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Labels (Top), Computer (Middle), Image (Bottom) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div className="font-mono-x text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-ink-dim leading-[1.8]">
              <p>Full-Stack Developer.</p>
              <p>AI Automation.</p>
              <p>UI/UX Design.</p>
              <p>Bachelor of Computer Science.</p>
              <p>+03 years of Building.</p>
              <p>Backend AI Engineer Intern.</p>
            </div>

            {/* Container for the stacked visuals */}
            <div className="mt-16 md:mt-auto flex flex-col items-center md:items-start self-start w-[80%] max-w-[320px]">
              
              {/* 1. Computer Block (Stacked on top) */}
              <div className="relative w-full h-[160px] md:h-[118px] mb-4">
                <div id="computer"></div>
              </div>

              {/* 2. Profile Image Block (Stacked below) */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src="/sean-profile.webp"
                  alt="Sean"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: The wave text */}
          <div className="md:col-span-8 flex flex-col justify-center">
            <h2 className="t-display text-[clamp(18px,3vw,50px)] leading-[1.05] tracking-tight text-ink m-0 max-w-4xl">
              <div className="mb-8">{renderText(P1)}</div>
              <div>{renderText(P2)}</div>
            </h2>
          </div>
          
        </div>
      </div>
    </section>
  );
}