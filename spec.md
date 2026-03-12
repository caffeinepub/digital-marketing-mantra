# Digital Marketing Mantra

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full single-page marketing website for Digital Marketing Mantra agency
- Hero section with animated background, floating elements, headline + 2 CTAs
- Scrolling client logos ticker
- Services section with 7 animated interactive cards
- Case studies section with results and hover effects
- Animated counters results section (50k leads, 200 campaigns, 120 clients, 10x ROI)
- Process timeline (5 steps)
- Testimonials animated slider
- 3-tier pricing section
- Lead generation CTA section with lead capture form
- Contact section with form and Google Maps embed
- Floating WhatsApp button
- Sticky "Book Consultation" CTA button
- Backend: store lead form submissions and contact form submissions

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Motoko backend: `submitLead(name, email, phone, business)` and `submitContact(name, email, message)` functions, plus admin query for submissions
2. Frontend: single-page React app with all sections
3. Animations via CSS keyframes + Intersection Observer for scroll reveals
4. Animated counters using useEffect + requestAnimationFrame
5. Testimonial slider with auto-play
6. Floating WhatsApp button (links to wa.me)
7. Sticky consultation button
8. Fully responsive with mobile navigation
