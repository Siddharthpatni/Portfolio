// Add to the end of the existing script.js

// ==========================================
// INTERACTIVE SKILLS RADAR CHART
// ==========================================
class SkillsRadarChart {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Logical (CSS) size — rendered at devicePixelRatio for retina crispness
        this.size = 380;
        this.center = this.size / 2;
        this.maxRadius = this.size / 2 - 58; // leave room for outer labels
        this.setupHiDPI();

        this.skills = [
            { name: 'MLOps', value: 0, target: 90 },
            { name: 'DevOps', value: 0, target: 85 },
            { name: 'Python', value: 0, target: 95 },
            { name: 'Docker/K8s', value: 0, target: 88 },
            { name: 'CI/CD', value: 0, target: 90 },
            { name: 'Cloud', value: 0, target: 80 }
        ];

        this.animationProgress = 0;
        this.isAnimating = false;
        this.hasAnimated = false;

        this.setupObserver();
        this.setupThemeListener();
        // Paint an initial empty grid so the chart never looks broken pre-scroll
        this.draw();
    }

    setupHiDPI() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.dpr = dpr;
        this.canvas.width = this.size * dpr;
        this.canvas.height = this.size * dpr;
        this.canvas.style.width = this.size + 'px';
        this.canvas.style.height = this.size + 'px';
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Resolve theme-aware colors at draw time so light/dark both read clearly
    palette() {
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        return dark ? {
            grid:   'rgba(255, 255, 255, 0.07)',
            gridStrong: 'rgba(255, 255, 255, 0.12)',
            axis:   'rgba(255, 255, 255, 0.10)',
            fillFrom: 'rgba(139, 92, 246, 0.34)',
            fillTo:   'rgba(99, 102, 241, 0.10)',
            stroke: 'rgba(167, 139, 250, 0.95)',
            dot:    '#A78BFA',
            dotRing:'rgba(11, 11, 15, 0.9)',
            label:  '#C9CBD3',
            value:  '#A78BFA'
        } : {
            grid:   'rgba(15, 15, 20, 0.06)',
            gridStrong: 'rgba(109, 40, 217, 0.14)',
            axis:   'rgba(15, 15, 20, 0.10)',
            fillFrom: 'rgba(109, 40, 217, 0.26)',
            fillTo:   'rgba(79, 70, 229, 0.08)',
            stroke: 'rgba(109, 40, 217, 0.85)',
            dot:    '#6D28D9',
            dotRing:'#FFFFFF',
            label:  '#3A3A42',
            value:  '#6D28D9'
        };
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.isAnimating = true;
                    this.animate();
                }
            });
        }, { threshold: 0.4 });
        observer.observe(this.canvas);
    }

    // Repaint when the user toggles light/dark so colors always match the theme
    setupThemeListener() {
        const mo = new MutationObserver(() => this.draw());
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    animate() {
        if (this.animationProgress < 1) {
            // Ease-out for a refined settle rather than a linear fill
            this.animationProgress = Math.min(1, this.animationProgress + 0.022);
            const eased = 1 - Math.pow(1 - this.animationProgress, 3);
            this.skills.forEach(skill => { skill.value = skill.target * eased; });
            this.draw();
            requestAnimationFrame(() => this.animate());
        } else {
            this.skills.forEach(skill => { skill.value = skill.target; });
            this.isAnimating = false;
            this.draw();
        }
    }

    pointAt(angle, radius) {
        return {
            x: this.center + Math.cos(angle) * radius,
            y: this.center + Math.sin(angle) * radius
        };
    }

    draw() {
        const ctx = this.ctx;
        const c = this.palette();
        const n = this.skills.length;
        const step = (Math.PI * 2) / n;
        ctx.clearRect(0, 0, this.size, this.size);

        // Concentric grid rings (outermost slightly stronger)
        for (let level = 1; level <= 5; level++) {
            const r = (this.maxRadius / 5) * level;
            this.drawPolygon(r, n, level === 5 ? c.gridStrong : c.grid, 1);
        }

        // Axis spokes
        ctx.strokeStyle = c.axis;
        ctx.lineWidth = 1;
        for (let i = 0; i < n; i++) {
            const angle = step * i - Math.PI / 2;
            const p = this.pointAt(angle, this.maxRadius);
            ctx.beginPath();
            ctx.moveTo(this.center, this.center);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        }

        // Data polygon
        ctx.beginPath();
        this.skills.forEach((skill, i) => {
            const angle = step * i - Math.PI / 2;
            const p = this.pointAt(angle, (skill.value / 100) * this.maxRadius);
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();

        const grad = ctx.createRadialGradient(this.center, this.center, 0, this.center, this.center, this.maxRadius);
        grad.addColorStop(0, c.fillFrom);
        grad.addColorStop(1, c.fillTo);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = c.stroke;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Vertex dots
        this.skills.forEach((skill, i) => {
            const angle = step * i - Math.PI / 2;
            const p = this.pointAt(angle, (skill.value / 100) * this.maxRadius);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = c.dot;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = c.dotRing;
            ctx.stroke();
        });

        // Outer axis labels only — no self-rated percentages (we show the SHAPE of
        // expertise, not unverifiable "95%" claims). Anchored so text never overlaps.
        this.skills.forEach((skill, i) => {
            const angle = step * i - Math.PI / 2;
            const cos = Math.cos(angle);
            const lp = this.pointAt(angle, this.maxRadius + 22);
            ctx.textAlign = cos > 0.25 ? 'left' : cos < -0.25 ? 'right' : 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = c.label;
            ctx.font = '600 12.5px Inter, system-ui, sans-serif';
            ctx.fillText(skill.name, lp.x, lp.y);
        });
    }

    drawPolygon(radius, sides, strokeStyle, lineWidth) {
        const step = (Math.PI * 2) / sides;
        this.ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = step * i - Math.PI / 2;
            const p = this.pointAt(angle, radius);
            i === 0 ? this.ctx.moveTo(p.x, p.y) : this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    }
}

// ==========================================
// PARALLAX SCROLL EFFECT
// ==========================================
class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            this.parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.btn, .social-link, .nav-link');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ==========================================
// TEXT REVEAL ANIMATION
// ==========================================
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-revealed');
                }
            });
        }, { threshold: 0.1 });

        // Split text into words and wrap them
        const textElements = document.querySelectorAll('.section-title');
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            text.split(' ').forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'word-reveal';
                span.textContent = word + ' ';
                span.style.animationDelay = `${index * 0.1}s`;
                element.appendChild(span);
            });

            observer.observe(element);
        });
    }
}

// ==========================================
// PROGRESS BAR ON SCROLL
// ==========================================
class ScrollProgress {
    constructor() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress';
        document.body.appendChild(this.progressBar);

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            this.progressBar.style.width = scrolled + '%';
        });
    }
}

// Add styles for scroll progress
const progressStyles = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #00f2fe 100%);
        z-index: 9999;
        transition: width 0.2s ease-out;
        box-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
    }
    
    .word-reveal {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
    }
    
    .text-revealed .word-reveal {
        animation: revealWord 0.6s ease-out forwards;
    }
    
    @keyframes revealWord {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// ==========================================
// FLOATING ELEMENTS ANIMATION
// ==========================================
class FloatingElements {
    constructor() {
        this.createFloatingShapes();
    }

    createFloatingShapes() {
        const container = document.createElement('div');
        container.className = 'floating-shapes';
        document.body.appendChild(container);

        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 20 + 's';
            shape.style.animationDuration = (15 + Math.random() * 15) + 's';

            // Random shape type
            const shapeType = Math.floor(Math.random() * 3);
            if (shapeType === 0) {
                shape.style.borderRadius = '50%';
            } else if (shapeType === 1) {
                shape.style.borderRadius = '10px';
            }

            const size = 10 + Math.random() * 30;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';

            container.appendChild(shape);
        }
    }
}

const floatingStyles = `
    .floating-shapes {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    }
    
    .floating-shape {
        position: absolute;
        bottom: -100px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(0, 242, 254, 0.1));
        border: 1px solid rgba(102, 126, 234, 0.2);
        animation: float-up linear infinite;
    }
    
    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Update DOMContentLoaded to include new features
const originalDOMContentLoaded = document.addEventListener;
document.addEventListener('DOMContentLoaded', () => {
    // Add styles
    const style = document.createElement('style');
    style.textContent = floatingStyles; // Removed progressStyles to prevent duplicates
    document.head.appendChild(style);

    // Initialize skills radar chart
    new SkillsRadarChart('skills-radar');

    // Initialize parallax effect
    new ParallaxEffect();

    // Initialize magnetic buttons - Disabled to prevent clashing with polish.js
    // new MagneticButtons();

    // Initialize text reveal - Disabled to prevent clashing with serif styling in polish.js
    // new TextReveal();

    // Initialize scroll progress bar - Disabled to prevent clashing with scroll-progress in script-cinematic.js
    // new ScrollProgress();

    // Initialize floating elements
    new FloatingElements();

    // ---------- Project filter chips ----------
    const filterChips = document.querySelectorAll('.project-filters .filter-chip');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    if (filterChips.length && projectCards.length) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const filter = chip.dataset.filter || 'all';
                filterChips.forEach(c => {
                    c.classList.toggle('active', c === chip);
                    c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
                });
                projectCards.forEach(card => {
                    const cats = (card.dataset.categories || '').split(/\s+/);
                    const match = filter === 'all' || cats.includes(filter);
                    card.classList.toggle('is-hidden', !match);
                });
            });
        });
    }
});
