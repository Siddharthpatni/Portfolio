/* ==========================================================================
   CINEMATIC v3 — Interaction layer
   - Scroll progress bar
   - Section dot nav (active + over-dark detection)
   - Navbar scrolled state
   - Mobile menu toggle
   - Project card spotlight (mouse-tracked)
   - Reveal-on-scroll for .reveal elements
   - Stat counter animation
   - Marquee duplicate guard
   ========================================================================== */
(() => {
    const $  = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Mark common elements for reveal ----------
    const revealTargets = $$('.section .glass-card, .section .section-title, .section .section-kicker, .section .section-subtitle, .expertise-pillar, .project-card, .timeline-item, .education-card, .skill-category');
    revealTargets.forEach(el => el.classList.add('reveal'));

    // FAIL-SAFE: force reveal of everything after 1.2s no matter what
    setTimeout(() => {
        revealTargets.forEach(el => el.classList.add('is-visible'));
    }, 1200);

    // ---------- Reveal observer ----------
    if (!prefersReduced && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
        revealTargets.forEach(el => io.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('is-visible'));
    }

    // Also reveal anything that's already on-screen on load (initial paint)
    requestAnimationFrame(() => {
        revealTargets.forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) {
                el.classList.add('is-visible');
            }
        });
    });

    // ---------- Scroll progress bar ----------
    const progress = $('#scroll-progress');
    const navbar   = $('#navbar') || $('.navbar');
    const dots     = $$('#section-dots .section-dot');
    const dotNav   = $('#section-dots');
    const hero     = $('#home');

    const sections = ['home','about','education','experience','projects','skills','contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const setActiveDot = (id) => {
        dots.forEach(d => d.classList.toggle('active', d.dataset.target === id));
    };

    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            if (progress) progress.style.width = pct + '%';

            // navbar state
            if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 80);

            // active section dot
            const viewportMid = window.scrollY + window.innerHeight * 0.4;
            let activeId = sections[0]?.id;
            for (const sec of sections) {
                if (sec.offsetTop <= viewportMid) activeId = sec.id;
            }
            if (activeId) setActiveDot(activeId);

            // Over-dark detection (hero + contact are dark)
            if (dotNav) {
                const dark = (hero && window.scrollY < hero.offsetHeight - 80) ||
                             (document.getElementById('contact') &&
                              window.scrollY + window.innerHeight * 0.4 >
                              document.getElementById('contact').offsetTop);
                dotNav.classList.toggle('over-dark', !!dark);
            }
            ticking = false;
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---------- Section dot navigation ----------
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const t = document.getElementById(dot.dataset.target);
            if (t) t.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        });
    });

    // ---------- Mobile menu toggle ----------
    // Disabled duplicate mobile menu toggle listener to prevent conflicts with script.js (SmoothScroll)
    // const menuToggle = $('#mobile-menu-toggle');
    // const navMenu    = $('#nav-menu');
    // if (menuToggle && navMenu) {
    //     menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    //     navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
    // }

    // ---------- Project card spotlight ----------
    $$('.project-card').forEach(card => {
        if (!card.querySelector('.spotlight')) {
            const spot = document.createElement('div');
            spot.className = 'spotlight';
            card.appendChild(spot);
        }
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width)  * 100;
            const y = ((e.clientY - r.top)  / r.height) * 100;
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
    });

    // ---------- Stat counter animation ----------
    const animateCount = (el, target) => {
        const start = performance.now();
        const dur = 1200;
        const from = 0;
        const suffix = (el.dataset.suffix) || '';
        const step = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(from + (target - from) * eased) + suffix;
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const statEls = $$('.stat-number');
    if (statEls.length && 'IntersectionObserver' in window && !prefersReduced) {
        const sio = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const txt = (el.textContent || '').trim();
                const m = txt.match(/(\d+)(\D*)/);
                if (m) {
                    el.dataset.suffix = m[2] || '';
                    animateCount(el, parseInt(m[1], 10));
                }
                sio.unobserve(el);
            });
        }, { threshold: 0.4 });
        statEls.forEach(el => sio.observe(el));
    }

    // ---------- Marquee: respect reduced motion ----------
    if (prefersReduced) {
        const t = $('#tech-marquee-track');
        if (t) t.style.animation = 'none';
    }
})();
