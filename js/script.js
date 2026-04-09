// ====================================================
// CONFIGURATION (CHANGE YOUR BUSINESS DETAILS HERE)
// ====================================================
const CONFIG = {
    whatsappNumber: "+252 61 5965670", // PHONE NUMBER
    whatsappMessage: "Hello Witr Logistics! I need a freight quote.",
    bookingEmail: "info@witrsupply.com" // GMAIL
};

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileBtn.classList.toggle('active');
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Setup active state for navigation based on URL or scroll position
    const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const itemPage = item.getAttribute('href').split('.')[0];
        if (currentPage === itemPage || (currentPage === 'index' && itemPage === '')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Initialize smooth scrolling for anchor links 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('nav-active');
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Background Slider
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 2000); // Change image every 5 seconds
    }
});

// ----------------------------------------------------
// NEW JS FEATURES: 1. Animated Count-Up Numbers
// ----------------------------------------------------
const counters = document.querySelectorAll('.counter-val');

if (counters.length > 0) {
    const observerCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const speed = 100; // Duration of animation

                const updateCount = () => {
                    const count = +counter.innerText;
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observerCounters.observe(counter));
}

// ----------------------------------------------------
// NEW JS FEATURES: 2. Dynamic Scroll-To-Top Button
// ----------------------------------------------------
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.id = "scrollTopBtn";
scrollTopBtn.title = "Go to top";
document.body.appendChild(scrollTopBtn);

// Style dynamically or via CSS (done dynamically for self-containment)
Object.assign(scrollTopBtn.style, {
    display: "none",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "99",
    border: "none",
    outline: "none",
    backgroundColor: "var(--accent)",
    color: "#fff",
    cursor: "pointer",
    padding: "15px",
    borderRadius: "50%",
    fontSize: "1.2rem",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "0.3s"
});

// Show/Hide button on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Optional Hover effect
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = "translateY(-5px)";
});
scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = "translateY(0)";
});

// ----------------------------------------------------
// NEW JS FEATURES: 3. Dynamic Configurations (WhatsApp & Forms)
// ----------------------------------------------------
const setupDynamicConfig = () => {
    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

    // 1. Automatically update any existing WhatsApp links you coded in the HTML
    const existingWaLinks = document.querySelectorAll('a[href*="wa.me"]');
    existingWaLinks.forEach(link => {
        link.setAttribute('href', waUrl);
    });

    // 2. Dynamically set the Booking Form Email receiver
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.setAttribute('action', `https://formsubmit.co/${CONFIG.bookingEmail}`);
    }
};

// Execute configurations after DOM completes
document.addEventListener('DOMContentLoaded', setupDynamicConfig);

