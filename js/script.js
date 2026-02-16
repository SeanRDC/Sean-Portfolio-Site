/**
 * Portfolio Website - Main JavaScript
 * Handles smooth scrolling, animations, and interactions
 */

function goBackOrFallback(fallbackUrl) {
    // Check if there is a referrer (meaning the user came from somewhere)
    // AND if the history length suggests there is a stack to go back to.
    if (document.referrer && window.history.length > 1) {
        window.history.back();
    } else {
        // If there is no history, redirect to a default page (e.g., Home)
        window.location.href = fallbackUrl;
    }
}

// ==========================================
// NAVIGATION ACTIVE STATE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
});

// Also update on back/forward navigation
window.addEventListener('popstate', function() {
    setActiveNavLink();
});

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// IMAGE ZOOM MODAL FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const zoomableImages = document.querySelectorAll('.zoomable');

    if (modal && modalImg) {
        
        // Open modal when clicking zoomable images
        zoomableImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                
                if (modalCaption) {
                    modalCaption.textContent = this.alt;
                }
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal function
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                if (!modal.classList.contains('active')) {
                    modalImg.src = '';
                }
            }, 300);
        }

        // Close with X button
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeModal();
            });
        }

        // Close when clicking image
        if (modalImg) {
            modalImg.addEventListener('click', function(e) {
                e.stopPropagation();
                closeModal();
            });
        }

        // Close when clicking background
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==========================================
// MOBILE MENU TOGGLE (if needed)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

// ==========================================
// PREVENT NAVIGATION ISSUES
// ==========================================

// Clear any stored navigation state when page loads
window.addEventListener('pageshow', function(event) {
    // Remove active class from all nav links first
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Then reapply based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should fade in
const fadeElements = document.querySelectorAll('.timeline-block, .project-card');
fadeElements.forEach(el => {
    // Set initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    fadeInObserver.observe(el);
});

// ==========================================
// NAVIGATION BACKGROUND ON SCROLL
// ==========================================

let lastScroll = 0;
const nav = document.querySelector('.navigation');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// CURSOR EFFECT (OPTIONAL - FOR DESKTOP)
// ==========================================

if (window.matchMedia("(min-width: 1024px)").matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0, 102, 255, 0.6);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth follow effect
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        cursor.style.left = cursorX - 4 + 'px';
        cursor.style.top = cursorY - 4 + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Grow cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ==========================================
// TIMELINE PROGRESS INDICATOR
// ==========================================

const timelineBlocks = document.querySelectorAll('.timeline-block');

if (timelineBlocks.length > 0) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.borderLeftColor = 'var(--color-accent)';
                entry.target.style.borderLeftWidth = '2px';
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineBlocks.forEach(block => {
        block.style.borderLeft = '2px solid transparent';
        block.style.paddingLeft = 'var(--spacing-sm)';
        block.style.transition = 'border-color 0.4s ease';
        
        progressObserver.observe(block);
    });
}

// ==========================================
// PAGE TRANSITION EFFECT
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add transition on page navigation
document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"])').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip external links
        if (href && !href.startsWith('http') && href.includes('.html')) {
            e.preventDefault();
            
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

// ==========================================
// FOOTER YEAR AUTO-UPDATE
// ==========================================

const updateYear = () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear);
    }
};

updateYear();

// ==========================================
// CONSOLE SIGNATURE
// ==========================================

console.log(
    '%c👋 Hello There! ',
    'background: #0066ff; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cLooking for something? Feel free to reach out!',
    'color: #666; font-size: 14px; padding: 5px 0;'
);

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images if you add actual images later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
