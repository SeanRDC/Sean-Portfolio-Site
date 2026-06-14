async function loadComponents() {
  try {
    const navElement = document.getElementById("nav-placeholder");
    if (navElement) {
      const navResponse = await fetch("components/nav.html");
      navElement.innerHTML = await navResponse.text();
    }

    const footerElement = document.getElementById("footer-placeholder");
    if (footerElement) {
      const footerResponse = await fetch("components/footer.html");
      footerElement.innerHTML = await footerResponse.text();
    }

    setActiveNavLink();
    updateYear();

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
      });
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadComponents);

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    document.body.style.cssText = "";

    const allElements = document.querySelectorAll("*");
    allElements.forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.animation = "";
    });

    void document.body.offsetHeight;
  }

  resetPageState();
});

window.addEventListener("load", function () {
  resetPageState();
});

function resetPageState() {
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";

  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.classList.remove("active");
    const modalImg = document.getElementById("modalImage");
    if (modalImg) {
      modalImg.src = "";
    }
  }

  setActiveNavLink();
}

document.addEventListener("DOMContentLoaded", function () {
  setActiveNavLink();
});

window.addEventListener("popstate", function () {
  setActiveNavLink();
});

function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeBtn = document.querySelector(".modal-close");
  const zoomableImages = document.querySelectorAll(".zoomable");

  if (modal && modalImg) {
    zoomableImages.forEach((img) => {
      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        modalImg.src = this.src;
        modalImg.alt = this.alt;

        if (modalCaption) {
          modalCaption.textContent = this.alt;
        }

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";

      setTimeout(() => {
        if (!modal.classList.contains("active")) {
          modalImg.src = "";
        }
      }, 300);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeModal();
      });
    }

    if (modalImg) {
      modalImg.addEventListener("click", function (e) {
        e.stopPropagation();
        closeModal();
      });
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
});

window.addEventListener("pageshow", function (event) {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => link.classList.remove("active"));

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});

let lastScroll = 0;
const nav = document.querySelector(".navigation");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    nav.style.borderBottom = "1px solid rgba(0,0,0,0.08)";
  } else {
    nav.style.borderBottom = "1px solid rgba(0,0,0,0.05)";
  }

  lastScroll = currentScroll;
});

if (window.matchMedia("(min-width: 1024px)").matches) {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 30px;
        height: 30px;
        border: 1px solid var(--color-primary);
        border-radius: 0;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
        mix-blend-mode: exclusion;
    `;
  document.body.appendChild(cursor);

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card",
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "50px";
      cursor.style.height = "50px";
      cursor.style.backgroundColor = "rgba(0,0,0,0.05)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "30px";
      cursor.style.height = "30px";
      cursor.style.backgroundColor = "transparent";
    });
  });
}

window.addEventListener("load", () => {
  document.body.style.opacity = "0";

  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

document
  .querySelectorAll('a:not([href^="#"]):not([href^="mailto"])')
  .forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href && !href.startsWith("http") && href.includes(".html")) {
        e.preventDefault();

        document.body.style.transition = "opacity 0.3s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

const updateYear = () => {
  const yearElement = document.querySelector(".footer-bottom p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(
      /\d{4}/,
      currentYear,
    );
  }
};

updateYear();

console.log("%c👋", "font-size: 16px;");

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function initGSAPAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  tl.from(".navigation", { y: -100, opacity: 0, duration: 0.8 })

    .from(".profile-section .profile-image", { x: -30, opacity: 0 }, "-=0.4")
    .from(
      ".profile-section .bio p",
      { y: 20, opacity: 0, stagger: 0.1 },
      "-=0.6",
    )

    .from(
      ".work-intro h1, .work-intro p, .certificates-header h1, .certificates-header p",
      {
        y: 30,
        opacity: 0,
        stagger: 0.1,
      },
      "-=0.8",
    );

  const revealElements = gsap.utils.toArray(
    ".timeline-block, .project-card, .certificate-card, .skills-column",
  );

  revealElements.forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  const projectImages = gsap.utils.toArray(".project-image img");

  projectImages.forEach((img) => {
    gsap.set(img, { scale: 1.15 });

    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      yPercent: 15,
      ease: "none",
    });
  });
}

window.addEventListener("load", () => {
  setTimeout(initGSAPAnimations, 100);
});
