// ==========================================
// PARTICLE BACKGROUND ANIMATION
// ==========================================
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectionDistance = 150;
        this.mouse = { x: null, y: null, radius: 100 };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.6)';
        this.ctx.fill();

        // Add glow effect
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(0, 242, 254, 0.5)';
        this.ctx.shadowBlur = 0;
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = 1 - distance / this.connectionDistance;
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            if (this.mouse.x !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * force * 0.1;
                    particle.vy += Math.sin(angle) * force * 0.1;
                }
            }

            // Limit velocity
            const maxVelocity = 2;
            particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
            particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));

            // Apply damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateParticles();
        this.connectParticles();
        this.particles.forEach(particle => this.drawParticle(particle));

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// ==========================================
// TYPING ANIMATION
// ==========================================
class TypeWriter {
    constructor(elementId, texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;

        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseDuration = pauseDuration;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            speed = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}

// ==========================================
// SMOOTH SCROLL & NAVIGATION
// ==========================================
class SmoothScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');

        this.init();
    }

    init() {
        this.setupScrollSpy();
        this.setupNavbarScroll();
        this.setupSmoothLinks();
        this.setupMobileMenu();
    }

    setupScrollSpy() {
        window.addEventListener('scroll', () => {
            let current = '';

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupNavbarScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    setupSmoothLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    this.closeMobileMenu();

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        if (!this.mobileMenuToggle || !this.navMenu) return;

        // Toggle menu on hamburger click
        this.mobileMenuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active') &&
                !this.navMenu.contains(e.target) &&
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const isActive = this.navMenu.classList.contains('active');

        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navMenu.classList.add('active', 'open');
        this.mobileMenuToggle.classList.add('active');
        document.body.classList.add('menu-open');

        // Set ARIA attributes for accessibility
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active', 'open');
        this.mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');

        // Set ARIA attributes for accessibility
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ==========================================
// 3D TILT EFFECT FOR PROJECT CARDS
// ==========================================
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('[data-tilt]');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease-out';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
}

// ==========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==========================================
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.glass-card, .timeline-item, .project-card, .skill-category');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
        });
    }
}

// ==========================================
// CURSOR FOLLOW EFFECT (Optional Enhancement)
// ==========================================
class CursorEffect {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.classList.add('custom-cursor');
        this.cursorFollower = document.createElement('div');
        this.cursorFollower.classList.add('cursor-follower');

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        this.init();
    }

    init() {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            this.cursorFollower.style.left = followerX + 'px';
            this.cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('expanded');
                this.cursorFollower.classList.add('expanded');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('expanded');
                this.cursorFollower.classList.remove('expanded');
            });
        });
    }
}

// Add cursor styles
const cursorStyles = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: rgba(0, 242, 254, 0.8);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
    }
    
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(102, 126, 234, 0.4);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
    }
    
    .custom-cursor.expanded {
        width: 20px;
        height: 20px;
    }
    
    .cursor-follower.expanded {
        width: 60px;
        height: 60px;
    }
    
    * {
        cursor: none !important;
    }
`;

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ==========================================
// INITIALIZE ALL COMPONENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle background
    new ParticleBackground('particles-canvas');

    // Initialize typing animation
    const titles = [
        'Agentic AI & Full-Stack Engineer',
        'LLM Pipeline Architect',
        'Autonomous Systems Builder',
        'Open-Source AI Tooling',
        'FastAPI + Playwright + LangGraph',
        'Shipping AI to Production'
    ];
    window.typewriterInstance = new TypeWriter('typed-text', titles);

    // Initialize language switcher
    if (typeof LanguageSwitcher !== 'undefined') {
        new LanguageSwitcher();
    }

    // Initialize smooth scroll and navigation
    new SmoothScroll();

    // Initialize 3D tilt effect - Disabled to prevent clashing with smooth tilt in polish.js
    // new TiltEffect();

    // Initialize scroll animations - Disabled to prevent clashing with refined observer in script-cinematic.js
    // new ScrollAnimations();

    // Initialize custom cursor (optional - uncomment if desired)
    // const style = document.createElement('style');
    // style.textContent = cursorStyles;
    // document.head.appendChild(style);
    // new CursorEffect();

    // Initialize performance optimizations
    new PerformanceOptimizer();

    // Initialize theme toggle
    new ThemeToggle();

    // Initialize document modal
    new DocumentModal();
});

// ==========================================
// THEME TOGGLE
// ==========================================
class ThemeToggle {
    constructor() {
        this.toggleButton = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        if (!this.toggleButton) return;

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Toggle theme on button click
        this.toggleButton.addEventListener('click', () => this.toggleTheme());

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Remove theme from localStorage if it matches system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if ((newTheme === 'dark' && systemPrefersDark) || (newTheme === 'light' && !systemPrefersDark)) {
            // Keep explicit preference
        }
    }
}

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Disabled legacy statsObserver to prevent clashing with refined counter animation in script-cinematic.js
// document.addEventListener('DOMContentLoaded', () => {
//     const aboutSection = document.querySelector('.about-section');
//     if (aboutSection) {
//         statsObserver.observe(aboutSection);
//     }
// });

// ==========================================
// FLOATING DOCUMENT MODAL
// ==========================================
class DocumentModal {
    constructor() {
        this.fab = document.getElementById('floating-doc-btn');
        this.overlay = document.getElementById('doc-modal-overlay');
        this.closeBtn = document.getElementById('doc-modal-close');
        this.downloadBtns = document.querySelectorAll('.doc-download-btn');
        this.init();
    }

    init() {
        if (!this.fab || !this.overlay) return;

        this.fab.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });

        this.downloadBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const docType = btn.dataset.doc;
                this.openDocument(docType);
            });
        });

        // Hero "Résumé" CTA — open the résumé directly for recruiters
        const heroResumeBtn = document.getElementById('hero-resume-btn');
        if (heroResumeBtn) {
            heroResumeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openDocument('resume');
            });
        }
    }

    open() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    openDocument(type) {
        const content = type === 'resume' ? this.getResumeHTML() : this.getCoverLetterHTML();
        // Open in a new tab so the recruiter can read it and one-click "Save as PDF".
        const win = window.open('', '_blank');
        if (win) {
            win.document.open();
            win.document.write(content);
            win.document.close();
        } else {
            // Popup blocked — fall back to a file download.
            this.downloadAsFile(type, content);
        }
        this.close();
    }

    downloadAsFile(type, content) {
        const filename = type === 'resume'
            ? 'Siddharth_Patni_Resume.html'
            : 'Siddharth_Patni_Cover_Letter.html';
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getResumeHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Siddharth Patni - Resume</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --accent: #4F46E5; --ink: #15151C; --muted: #4B4D57; --soft: #6B6D78; --line: #E2E2E8; }
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        html { background: #EDEEF2; }
        body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: var(--ink); line-height: 1.46; font-size: 10.2pt;
               max-width: 8.5in; margin: 28px auto; padding: 0.62in 0.66in; background: #fff;
               box-shadow: 0 8px 40px rgba(20,20,40,0.14); border-radius: 2px; }

        /* Floating toolbar (screen only) */
        .toolbar { position: fixed; top: 16px; right: 16px; display: flex; align-items: center; gap: 14px; z-index: 50;
                   background: rgba(18,18,26,0.92); backdrop-filter: blur(8px); padding: 9px 9px 9px 16px; border-radius: 12px;
                   box-shadow: 0 8px 28px rgba(0,0,0,0.28); }
        .toolbar-hint { font-size: 11px; color: rgba(255,255,255,0.62); letter-spacing: 0.01em; }
        .toolbar button { font-family: inherit; font-size: 12.5px; font-weight: 600; color: #fff; background: var(--accent);
                          border: none; padding: 9px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
                          transition: transform .15s ease, background .15s ease; }
        .toolbar button:hover { background: #4338CA; transform: translateY(-1px); }

        /* Header */
        .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; padding-bottom: 12px; border-bottom: 2px solid var(--ink); }
        .head-left h1 { font-size: 25pt; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; line-height: 1; margin-bottom: 6px; }
        .subtitle { font-size: 10.5pt; color: var(--accent); font-weight: 600; letter-spacing: 0.005em; }
        .contact-row { text-align: right; font-size: 9pt; color: var(--muted); line-height: 1.7; white-space: nowrap; }
        .contact-row a { color: var(--muted); text-decoration: none; }
        .contact-row .sep { color: var(--line); }

        /* Sections */
        h2 { font-size: 9.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; color: var(--accent);
             margin: 15px 0 8px; padding-bottom: 4px; border-bottom: 1px solid var(--line); }
        .summary { font-size: 10pt; color: var(--muted); margin-bottom: 2px; line-height: 1.52; }

        .entry { margin-bottom: 9px; }
        .entry-row { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
        .entry-title { font-size: 10.5pt; font-weight: 700; color: var(--ink); }
        .entry-org { font-size: 10pt; font-weight: 600; color: var(--accent); }
        .entry-date { font-size: 8.6pt; font-weight: 600; color: var(--soft); white-space: nowrap; font-variant-numeric: tabular-nums; }
        .entry-loc { font-size: 8.8pt; color: var(--soft); margin-top: 1px; }
        ul { padding-left: 15px; margin: 4px 0 0; }
        li { font-size: 9.6pt; color: var(--muted); margin-bottom: 2.5px; line-height: 1.46; padding-left: 2px; }
        li::marker { color: var(--accent); }

        .skills-table { width: 100%; font-size: 9.6pt; line-height: 1.55; border-collapse: collapse; }
        .skills-table td { padding: 2px 0; vertical-align: top; color: var(--muted); }
        .skills-table .label { font-weight: 700; color: var(--ink); width: 96px; padding-right: 10px; white-space: nowrap; }

        .project-title { font-size: 10.2pt; font-weight: 700; color: var(--ink); }
        .project-tech { font-size: 9pt; font-weight: 500; color: var(--soft); }

        @media print {
            @page { size: Letter; margin: 0.5in; }
            html, body { background: #fff; }
            body { box-shadow: none; margin: 0; padding: 0; max-width: 100%; font-size: 10pt; }
            .no-print { display: none !important; }
            h2 { margin-top: 13px; break-after: avoid; }
            .entry, .skills-table tr, .head { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="toolbar no-print">
        <span class="toolbar-hint">Choose “Save as PDF” as the destination</span>
        <button onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6v-8Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Save as PDF
        </button>
    </div>

    <div class="head">
        <div class="head-left">
            <h1>Siddharth Patni</h1>
            <div class="subtitle">AI &amp; Autonomous Systems Engineer &nbsp;·&nbsp; MLOps &nbsp;·&nbsp; LLM Pipelines</div>
        </div>
        <div class="contact-row">
            Braunschweig, Germany<br>
            <a href="mailto:patnisiddharth1311@gmail.com">patnisiddharth1311@gmail.com</a><br>
            +49 155 1083 5846<br>
            <a href="https://www.linkedin.com/in/siddharth-divyang-patni-644857185">linkedin.com/in/siddharth-divyang-patni</a><br>
            <a href="https://github.com/Siddharthpatni">github.com/Siddharthpatni</a>
        </div>
    </div>

    <h2>Professional Summary</h2>
    <p class="summary">Results-driven AI & Autonomous Systems Engineer with professional experience in ML pipelines, computer vision, and full-stack development. Pursuing M.Sc. in Digital Technologies (TU Clausthal). Skilled in building production-grade intelligent systems using LLMs, RAG architectures, and MLOps best practices. Demonstrated ability to reduce processing times by 90%+, improve application performance by 30%, and deliver end-to-end AI solutions from prototype to deployment.</p>

    <h2>Technical Skills</h2>
    <table class="skills-table">
        <tr><td class="label">AI / ML:</td><td>PyTorch, TensorFlow, LangChain, LangGraph, HuggingFace Transformers, RAG, OpenCV, YOLO, CNNs, NLP</td></tr>
        <tr><td class="label">MLOps:</td><td>MLflow, DVC, Model Cards, Weights & Biases, experiment tracking, model versioning, CI/CD for ML</td></tr>
        <tr><td class="label">Languages:</td><td>Python, JavaScript/TypeScript, SQL, Bash, HTML/CSS</td></tr>
        <tr><td class="label">Backend:</td><td>FastAPI, Flask, Node.js, Express.js, REST APIs, WebSocket, JWT authentication</td></tr>
        <tr><td class="label">Frontend:</td><td>React, Next.js, responsive design, state management</td></tr>
        <tr><td class="label">DevOps:</td><td>Docker, Kubernetes, GitHub Actions, Jenkins, Terraform, Prometheus, Grafana</td></tr>
        <tr><td class="label">Cloud:</td><td>AWS (EC2, S3, Lambda), Azure, Google Cloud Platform</td></tr>
        <tr><td class="label">Data:</td><td>PostgreSQL, MongoDB, Redis, ChromaDB (vector DB), Pandas, NumPy</td></tr>
    </table>

    <h2>Professional Experience</h2>
    <div class="entry">
        <div class="entry-row">
            <div><span class="entry-title">Software Developer Intern</span> &mdash; <span class="entry-org">L&T Technology Services</span></div>
            <span class="entry-date">Dec 2023 &ndash; Apr 2024</span>
        </div>
        <div class="entry-loc">Vadodara, India</div>
        <ul>
            <li>Containerized 5+ microservices with Docker and integrated into Linux-based CI/CD pipelines, reducing deployment regressions by 40% and improving release consistency across environments</li>
            <li>Optimized React frontend components and Flask REST API endpoints, improving perceived page load times by approximately 30% through lazy loading and response caching</li>
            <li>Standardized API-UI contracts with OpenAPI specifications and implemented request/response validation, reducing integration defects by 25%</li>
            <li>Collaborated with cross-functional teams of 8+ engineers using Agile/Scrum methodology with Jira for sprint planning</li>
        </ul>
    </div>
    <div class="entry">
        <div class="entry-row">
            <div><span class="entry-title">Data Analyst Intern</span> &mdash; <span class="entry-org">Snapfix Ltd.</span></div>
            <span class="entry-date">Jun 2023 &ndash; Jul 2023</span>
        </div>
        <div class="entry-loc">Remote, India</div>
        <ul>
            <li>Designed and implemented Python/SQL ETL pipelines to standardize and transform 10+ heterogeneous datasets, reducing weekly report preparation time by approximately 40%</li>
            <li>Created automated data quality checks with validation rules, improving data accuracy across analytical reports</li>
            <li>Authored comprehensive technical documentation and handover guides ensuring reproducibility for future teams</li>
        </ul>
    </div>

    <h2>Key Projects</h2>
    <div class="entry">
        <div><span class="project-title">AI Driver Safety System</span> <span class="project-tech">&mdash; Python, YOLO, CNN, OpenCV, TensorFlow, Keras</span></div>
        <ul>
            <li>Engineered a real-time AI-powered driver safety system incorporating traffic sign recognition (98% accuracy), pedestrian detection, and driver drowsiness monitoring</li>
            <li>Implemented custom CNN architecture for traffic sign classification on GTSRB dataset and YOLO v5 for pedestrian detection with 30 FPS inference speed</li>
            <li>Built modular pipeline with OpenCV for video stream processing, enabling real-time alerts and safety event logging</li>
        </ul>
    </div>
    <div class="entry">
        <div><span class="project-title">LLM-Powered Conversational Chatbot</span> <span class="project-tech">&mdash; Python, Flask, React, HuggingFace Transformers, WebSocket</span></div>
        <ul>
            <li>Developed a production-ready chatbot with real-time message streaming, context-aware multi-turn conversations, and conversation history management</li>
            <li>Designed RESTful + WebSocket API backend with Flask, implementing token-based streaming for sub-second response latency</li>
            <li>Built modern React frontend with dark mode, markdown rendering, and responsive design for mobile and desktop</li>
        </ul>
    </div>
    <div class="entry">
        <div><span class="project-title">Workflow Automation Engine</span> <span class="project-tech">&mdash; Node.js, React, Python, Docker, PostgreSQL, Redis</span></div>
        <ul>
            <li>Architected a distributed workflow orchestration platform handling 1000+ task executions with retry logic, parallel execution, and dependency graph resolution</li>
            <li>Implemented JWT authentication, role-based access control, and full CI/CD pipeline with GitHub Actions and Docker</li>
        </ul>
    </div>
    <div class="entry">
        <div><span class="project-title">Multi-Disease Diagnostic Application</span> <span class="project-tech">&mdash; Python, Flask, OpenCV, scikit-learn, Pandas</span></div>
        <ul>
            <li>Built end-to-end ML-powered diagnostic system reducing medical image processing time from ~30 minutes to under 10 seconds (95%+ reduction)</li>
            <li>Trained and deployed classification models with scikit-learn achieving 92%+ accuracy on test datasets</li>
        </ul>
    </div>

    <h2>Education</h2>
    <div class="entry">
        <div class="entry-row">
            <div><span class="entry-title">M.Sc. Digital Technologies</span> &mdash; <span class="entry-org">TU Clausthal & Ostfalia University</span></div>
            <span class="entry-date">Mar 2025 &ndash; Present</span>
        </div>
        <div class="entry-loc">Braunschweig, Germany</div>
        <ul><li>Specialization: Information & Communication Technologies &mdash; Focus on MLOps, AI infrastructure, autonomous systems, and software safety</li></ul>
    </div>
    <div class="entry">
        <div class="entry-row">
            <div><span class="entry-title">B.Tech Computer Engineering</span> &mdash; <span class="entry-org">Charotar University of Science & Technology (CGPA: 7.6/10)</span></div>
            <span class="entry-date">Jul 2021 &ndash; May 2024</span>
        </div>
        <div class="entry-loc">Gujarat, India</div>
    </div>
    <div class="entry">
        <div class="entry-row">
            <div><span class="entry-title">Diploma in Computer Engineering</span> &mdash; <span class="entry-org">Gujarat Technological University (CGPA: 8.92/10 &mdash; High Distinction)</span></div>
            <span class="entry-date">Jun 2018 &ndash; Jun 2021</span>
        </div>
        <div class="entry-loc">Gujarat, India</div>
    </div>

    <h2>Languages</h2>
    <p style="font-size:10pt;color:#222;">English (C1 Advanced) &nbsp;&bull;&nbsp; German (A2&ndash;B1, actively learning) &nbsp;&bull;&nbsp; Hindi (Native)</p>
</body>
</html>`;
    }

    getCoverLetterHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Siddharth Patni - Cover Letter</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --accent: #4F46E5; --ink: #15151C; --muted: #3A3C46; --soft: #6B6D78; --line: #E2E2E8; }
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        html { background: #EDEEF2; }
        body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: var(--ink); line-height: 1.62; font-size: 10.5pt;
               max-width: 8.5in; margin: 28px auto; padding: 0.7in 0.78in; background: #fff;
               box-shadow: 0 8px 40px rgba(20,20,40,0.14); border-radius: 2px; }

        .toolbar { position: fixed; top: 16px; right: 16px; display: flex; align-items: center; gap: 14px; z-index: 50;
                   background: rgba(18,18,26,0.92); backdrop-filter: blur(8px); padding: 9px 9px 9px 16px; border-radius: 12px;
                   box-shadow: 0 8px 28px rgba(0,0,0,0.28); }
        .toolbar-hint { font-size: 11px; color: rgba(255,255,255,0.62); }
        .toolbar button { font-family: inherit; font-size: 12.5px; font-weight: 600; color: #fff; background: var(--accent);
                          border: none; padding: 9px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
                          transition: transform .15s ease, background .15s ease; }
        .toolbar button:hover { background: #4338CA; transform: translateY(-1px); }

        .header { margin-bottom: 26px; border-bottom: 2px solid var(--ink); padding-bottom: 14px; }
        .header h1 { font-size: 19pt; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 5px; }
        .header-contact { font-size: 9pt; color: var(--soft); line-height: 1.65; }
        .header-contact a { color: var(--accent); text-decoration: none; }
        .header-contact .sep { color: var(--line); }
        .date { font-size: 9.5pt; color: var(--soft); margin-bottom: 22px; }
        .recipient { margin-bottom: 22px; font-size: 10pt; color: var(--soft); line-height: 1.5; }
        .subject { font-size: 11pt; font-weight: 700; color: var(--ink); margin-bottom: 18px; }
        .body-text p { font-size: 10.4pt; color: var(--muted); margin-bottom: 12px; }
        .closing { margin-top: 22px; }
        .closing p { font-size: 10.4pt; color: var(--muted); }
        .signature { margin-top: 18px; font-weight: 700; color: var(--ink); font-size: 11pt; }
        @media print {
            @page { size: Letter; margin: 0.6in; }
            html, body { background: #fff; }
            body { box-shadow: none; margin: 0; padding: 0; max-width: 100%; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="toolbar no-print">
        <span class="toolbar-hint">Choose “Save as PDF” as the destination</span>
        <button onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6v-8Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Save as PDF
        </button>
    </div>
    <div class="header">
        <h1>Siddharth Patni</h1>
        <div class="header-contact">
            Braunschweig, Germany &nbsp;|&nbsp;
            <a href="mailto:patnisiddharth1311@gmail.com">patnisiddharth1311@gmail.com</a> &nbsp;|&nbsp;
            +49 155 1083 5846 &nbsp;|&nbsp;
            <a href="https://www.linkedin.com/in/siddharth-divyang-patni-644857185">linkedin.com/in/siddharth-divyang-patni</a>
        </div>
    </div>

    <div class="date">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>

    <div class="recipient">
        <p>[Hiring Manager Name]</p>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
    </div>

    <div class="subject">Re: Application for [Position Title]</div>

    <div class="body-text">
        <p>Dear Hiring Manager,</p>

        <p>I am writing to express my interest in the [Position Title] role at [Company Name]. As an AI & Autonomous Systems Engineer pursuing my M.Sc. in Digital Technologies at TU Clausthal, I bring hands-on experience building production-grade AI systems combined with strong full-stack and DevOps skills.</p>

        <p>During my internship at L&T Technology Services, I containerized 5+ microservices with Docker, optimized React/Flask applications to achieve 30% faster load times, and reduced integration defects by 25% through OpenAPI contract standardization. These experiences reinforced my focus on engineering discipline and production readiness — principles I apply consistently to my AI work.</p>

        <p>My project portfolio reflects my ability to deliver end-to-end intelligent systems. I engineered an AI Driver Safety System achieving 98% traffic sign recognition accuracy at 30 FPS using YOLO and custom CNNs. I built an LLM-powered chatbot with real-time streaming and context-aware multi-turn conversations using HuggingFace Transformers. I also architected a distributed Workflow Automation Engine handling 1,000+ task executions with retry logic and dependency graph resolution.</p>

        <p>What differentiates me is my commitment to production-grade ML engineering. I apply MLOps best practices (MLflow, DVC, Docker, Kubernetes), implement comprehensive CI/CD pipelines, and design systems for scalability, reproducibility, and maintainability from day one.</p>

        <p>I am excited about the opportunity to contribute my AI/ML, full-stack, and DevOps expertise to [Company Name]. I am confident that my technical depth and results-driven approach would make me a strong addition to your team.</p>

        <p>Thank you for your consideration. I look forward to the opportunity to discuss how I can contribute to your team's goals.</p>
    </div>

    <div class="closing">
        <p>Sincerely,</p>
        <div class="signature">Siddharth Patni</div>
    </div>
</body>
</html>`;
    }
}
