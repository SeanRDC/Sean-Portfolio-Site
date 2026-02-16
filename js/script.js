/**
 * Portfolio Website - Main JavaScript
 * Handles smooth scrolling, animations, and interactions
 */

// ==========================================
// USER RETURN FIX
// ==========================================
(function() {
    'use strict';

    // Fix 1: Handle page loaded from cache (back/forward button)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('Page loaded from cache');
            document.body.style.display = 'block';
            document.documentElement.style.display = 'block';
        }
    });

    // Fix 2: Handle back/forward navigation
    window.addEventListener('popstate', function(event) {
        console.log('Back/Forward button pressed');
        document.body.style.opacity = '1';
        document.body.style.display = 'block';
        
        // Restore scroll position if saved
        if (event.state && event.state.scrollPosition) {
            window.scrollTo(0, event.state.scrollPosition);
        }
    });

    // Fix 3: Save scroll position before leaving page
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        sessionStorage.setItem('lastPage', window.location.href);
    });

    // Fix 4: Restore page state on load
    window.addEventListener('DOMContentLoaded', function() {
        const lastPage = sessionStorage.getItem('lastPage');
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        
        if (scrollPosition && lastPage === window.location.href) {
            window.scrollTo(0, parseInt(scrollPosition));
        }
        
        // Ensure page is visible
        document.body.style.display = 'block';
        document.body.style.opacity = '1';
    });

    // Fix 5: iOS Safari specific fix
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        window.onpageshow = function(event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    // Fix 6: Handle visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            document.body.style.display = 'block';
            document.body.style.opacity = '1';
        }
    });

    // Fix 7: Custom back button handling
    document.addEventListener('DOMContentLoaded', function() {
        const backButtons = document.querySelectorAll('.back-link, .back-button');
        backButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'work.html';
                }
            });
        });
    });

    // Fix 8: Force hardware acceleration
    document.addEventListener('DOMContentLoaded', function() {
        document.body.style.transform = 'translateZ(0)';
        document.body.style.webkitTransform = 'translateZ(0)';
    });

    console.log('Back navigation fix initialized');
})();

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#' or empty
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navigation').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
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

// ==========================================
// ZOOM EFFECT
// ==========================================

// Image Zoom Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    const zoomableImages = document.querySelectorAll('.zoomable');

    // Add click event to all zoomable images
    zoomableImages.forEach(function(img) {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            modalCaption.innerHTML = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking the X
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking on the image
    modalImg.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});
