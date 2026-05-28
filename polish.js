/* polish.js — magnetic CTAs, card tilt, custom cursor blob */
(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    /* -------- Custom cursor blob (desktop, fine pointer only) -------- */
    if (!isCoarse && !reduced) {
        const blob = document.getElementById('cursor-blob');
        if (blob) {
            let tx = 0, ty = 0, cx = 0, cy = 0;
            let active = false;
            const ease = 0.18;

            window.addEventListener('mousemove', (e) => {
                tx = e.clientX;
                ty = e.clientY;
                if (!active) {
                    blob.classList.add('is-active');
                    cx = tx; cy = ty;
                    active = true;
                }
            }, { passive: true });

            window.addEventListener('mouseout', (e) => {
                if (!e.relatedTarget) blob.classList.remove('is-active');
            });

            const raf = () => {
                cx += (tx - cx) * ease;
                cy += (ty - cy) * ease;
                blob.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }
    }

    /* -------- Magnetic CTAs -------- */
    if (!isCoarse && !reduced) {
        const magnets = document.querySelectorAll('.btn-primary, .btn-secondary, .hero-social .social-link');
        magnets.forEach((el) => {
            const strength = el.classList.contains('social-link') ? 0.25 : 0.3;
            el.addEventListener('mousemove', (e) => {
                const r = el.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    /* -------- Subtle 3D tilt on cards -------- */
    if (!isCoarse && !reduced) {
        const cards = document.querySelectorAll('.project-card, .education-card, .expertise-card');
        cards.forEach((card) => {
            let raf = null;
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
                });
            });
            card.addEventListener('mouseleave', () => {
                if (raf) cancelAnimationFrame(raf);
                card.style.transform = '';
            });
        });
    }

    /* -------- Add <em> serif wrap to section titles that don't have one --
       Looks for the LAST word and italicizes it as the accent. */
    const titles = document.querySelectorAll('.section-title, .section-header h2');
    titles.forEach((h) => {
        if (h.querySelector('em')) return;
        const text = h.textContent.trim();
        const words = text.split(/\s+/);
        if (words.length < 2) return;
        const last = words.pop();
        h.innerHTML = `${words.join(' ')} <em>${last}</em>`;
    });
})();
