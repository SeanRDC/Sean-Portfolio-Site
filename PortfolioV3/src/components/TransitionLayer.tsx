import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useTransitionStore } from "../utils/transitionStore";

export default function TransitionLayer() {
  const { isMorphing, clickedRect, activeProject, reset } = useTransitionStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMorphing && clickedRect && activeProject && overlayRef.current) {
      // 1. Lock the overlay exactly over the bounding box of the clicked element
      gsap.set(overlayRef.current, {
        position: "fixed",
        top: clickedRect.top,
        left: clickedRect.left,
        width: clickedRect.width,
        height: clickedRect.height,
        backgroundColor: "#171717", // Expanding dark void
        zIndex: 9999,
        autoAlpha: 1,
        borderRadius: "8px"
      });

      // 2. Expand the element to consume the entire screen
      const tl = gsap.timeline({
        onComplete: () => {
          // Navigate instantly once the screen is fully obscured
          navigate(`/projects/${activeProject}`);
          
          // Fade the overlay out to reveal the new page seamlessly
          gsap.to(overlayRef.current, { 
            autoAlpha: 0, 
            duration: 0.8, 
            delay: 0.1,
            ease: "power2.inOut",
            onComplete: reset 
          });
        }
      });

      tl.to(overlayRef.current, {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 0.85,
        ease: "expo.inOut" // The signature aggressive-but-smooth agency easing
      });
    }
  }, [isMorphing, clickedRect, activeProject, navigate, reset]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed pointer-events-none opacity-0 invisible" 
      aria-hidden="true" 
    />
  );
}