# Digital Marketing Mantra

## Current State
A full premium dark agency website with 13 sections: Hero, Clients marquee, Services, Case Studies, Results counters, Process timeline, Testimonials slider, Pricing, Lead Capture, Contact. All forms go to WhatsApp. Phone number visible in navbar and mobile menu.

## Requested Changes (Diff)

### Add
- **Custom cursor** with a trailing dot/circle that follows mouse movement
- **Page load animation** — logo/title fade in with stagger on first load
- **Scroll reveal animations** — every section heading, paragraph, and card fades/slides up when entering viewport (using IntersectionObserver)
- **Split text animation** — hero headline reveals word-by-word or char-by-char on load
- **Parallax** — hero background and floating elements move at different speeds on scroll
- **Magnetic buttons** — CTA buttons subtly shift toward the cursor on hover
- **Infinite horizontal marquee rows** — services/logos ticker scrolling left and right continuously
- **Counter animation** — numbers count up when the results section scrolls into view (already may exist, enhance if needed)
- **Accordion expand animation** — smooth height expand for any FAQ or process steps
- **Hover reveal on service cards** — background image or color slides in on hover
- **Sticky header** — navbar shrinks/changes style on scroll
- **Section number/tag badge animations** — fade in from left on scroll
- **Smooth scroll** behavior site-wide

### Modify
- Enhance existing sections to use scroll-triggered reveal classes
- Enhance hero section with staggered word-by-word title animation
- Enhance testimonials with auto-scroll marquee (two rows going in opposite directions)

### Remove
- Nothing to remove

## Implementation Plan
1. Add a `useScrollReveal` hook using IntersectionObserver that adds `animate-in` class to elements
2. Add CSS keyframes and animation classes in index.css: fadeInUp, slideInLeft, slideInRight, scaleIn, stagger delays
3. Add custom cursor component with trailing circle
4. Add split text animation to hero heading using letter/word spans
5. Add magnetic button effect to primary CTAs using mouse event listeners
6. Enhance client logos section with CSS marquee animation (two rows)
7. Add parallax effect to hero section using scroll event
8. Add smooth scroll behavior and sticky header scroll shrink effect
9. Wire all section headings, cards, and content blocks with scroll reveal classes
10. Validate and build
