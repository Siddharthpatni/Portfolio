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
        this.width = 400;
        this.height = 400;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.maxRadius = Math.min(this.width, this.height) / 2 - 40;

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

        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.isAnimating = true;
                    this.animate();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.canvas);
    }

    animate() {
        if (this.animationProgress < 1) {
            this.animationProgress += 0.02;
            this.skills.forEach(skill => {
                skill.value = skill.target * this.animationProgress;
            });
            this.draw();
            requestAnimationFrame(() => this.animate());
        } else {
            this.draw();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const numSkills = this.skills.length;
        const angleStep = (Math.PI * 2) / numSkills;

        // Draw background grid
        for (let level = 1; level <= 5; level++) {
            const radius = (this.maxRadius / 5) * level;
            this.drawPolygon(radius, numSkills, 'rgba(102, 126, 234, 0.1)', 1);
        }

        // Draw axes
        this.ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < numSkills; i++) {
            const angle = angleStep * i - Math.PI / 2;
            const x = this.centerX + Math.cos(angle) * this.maxRadius;
            const y = this.centerY + Math.sin(angle) * this.maxRadius;

            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }

        // Draw skill data
        this.ctx.beginPath();
        this.skills.forEach((skill, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const radius = (skill.value / 100) * this.maxRadius;
            const x = this.centerX + Math.cos(angle) * radius;
            const y = this.centerY + Math.sin(angle) * radius;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        this.ctx.closePath();

        // Fill
        const gradient = this.ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, this.maxRadius
        );
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 242, 254, 0.2)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Stroke
        this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Draw points
        this.skills.forEach((skill, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const radius = (skill.value / 100) * this.maxRadius;
            const x = this.centerX + Math.cos(angle) * radius;
            const y = this.centerY + Math.sin(angle) * radius;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00f2fe';
            this.ctx.fill();
            this.ctx.strokeStyle = '#667eea';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });

        // Draw labels
        this.ctx.fillStyle = '#cbd5e1';
        this.ctx.font = '14px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.skills.forEach((skill, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const labelRadius = this.maxRadius + 25;
            const x = this.centerX + Math.cos(angle) * labelRadius;
            const y = this.centerY + Math.sin(angle) * labelRadius;

            this.ctx.fillText(skill.name, x, y);

            // Draw percentage
            const valueRadius = this.maxRadius + 10;
            const valueX = this.centerX + Math.cos(angle) * valueRadius;
            const valueY = this.centerY + Math.sin(angle) * valueRadius;

            this.ctx.fillStyle = '#00f2fe';
            this.ctx.font = 'bold 11px Inter, sans-serif';
            this.ctx.fillText(Math.round(skill.value) + '%', valueX, valueY);
            this.ctx.fillStyle = '#cbd5e1';
            this.ctx.font = '14px Inter, sans-serif';
        });
    }

    drawPolygon(radius, sides, strokeStyle, lineWidth) {
        const angleStep = (Math.PI * 2) / sides;

        this.ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = angleStep * i - Math.PI / 2;
            const x = this.centerX + Math.cos(angle) * radius;
            const y = this.centerY + Math.sin(angle) * radius;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
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
    style.textContent = progressStyles + floatingStyles;
    document.head.appendChild(style);

    // Initialize skills radar chart
    new SkillsRadarChart('skills-radar');

    // Initialize parallax effect
    new ParallaxEffect();

    // Initialize magnetic buttons
    new MagneticButtons();

    // Initialize text reveal
    new TextReveal();

    // Initialize scroll progress bar
    new ScrollProgress();

    // Initialize floating elements
    new FloatingElements();
});
