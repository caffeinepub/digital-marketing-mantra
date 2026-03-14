import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Settings,
  Share2,
  Star,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useActor } from "./hooks/useActor";
import { useCountUp, useInView } from "./hooks/useInView";

// ─── Magnetic Button ───────────────────────────────────────────────────────────────────────────

function MagneticBtn({
  children,
  className = "",
  strength = 10,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

// ─── Reveal wrapper ─────────────────────────────────────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
  type = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  type?: "up" | "left" | "scale";
}) {
  const { ref, inView } = useInView();
  const base =
    type === "left"
      ? "reveal-left"
      : type === "scale"
        ? "reveal-scale"
        : "reveal";
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${base} ${inView ? "in-view" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      data-ocid="nav.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-glass navbar-shrunk"
          : "bg-transparent"
      }`}
    >
      <div
        className="nav-inner container mx-auto px-6 flex items-center justify-between transition-all duration-500"
        style={{ height: scrolled ? "56px" : "80px" }}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.25 262), oklch(0.60 0.28 295))",
            }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">
            <span className="gradient-text">Digital Marketing</span>
            <span className="text-foreground"> Mantra</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+917217001969"
            data-ocid="nav.link"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 72170 01969
          </a>
          <MagneticBtn>
            <a
              href="#contact"
              data-ocid="nav.primary_button"
              className="btn-neon px-5 py-2.5 rounded-lg text-sm font-semibold text-white block"
            >
              <span>Book Consultation</span>
            </a>
          </MagneticBtn>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-6">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-foreground font-medium py-2 border-b border-border/50 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+917217001969"
              className="flex items-center gap-2 py-2 text-primary font-semibold border-b border-border/50"
            >
              <span>📞 +91 7217001969</span>
            </a>
            <a
              href="#contact"
              className="btn-neon px-5 py-3 rounded-lg text-sm font-semibold text-white text-center mt-2"
            >
              <span>Book Consultation</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────────────────

function SplitHeadline() {
  // Split headline into segments for stagger animation
  const line1 = "Scaling Businesses with";
  const line2Words = ["Advanced", "Digital"];
  const line3 = "Marketing";

  const words1 = line1.split(" ");

  return (
    <h1
      className="font-display font-black leading-[1.05] tracking-tight mb-6"
      style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
    >
      <span className="block overflow-hidden">
        {words1.map((word, i) => (
          <span
            key={word}
            className="word-reveal inline-block mr-[0.25em]"
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            {word}
          </span>
        ))}
      </span>
      <span className="block overflow-hidden">
        {line2Words.map((word, i) => (
          <span
            key={word}
            className="word-reveal gradient-text inline-block mr-[0.25em]"
            style={{ animationDelay: `${0.5 + i * 0.1}s` }}
          >
            {word}
          </span>
        ))}
      </span>
      <span className="block overflow-hidden">
        <span
          className="word-reveal gradient-text inline-block"
          style={{ animationDelay: "0.75s" }}
        >
          {line3}
        </span>
      </span>
    </h1>
  );
}

function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        const y = window.scrollY * 0.3;
        bgRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center overflow-hidden hero-mesh"
    >
      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
        style={{ top: "-20%", height: "140%" }}
      >
        <div
          className="absolute w-96 h-96 rounded-full animate-float-slow"
          style={{
            top: "10%",
            left: "-8%",
            background:
              "radial-gradient(circle, oklch(0.65 0.25 262 / 0.15) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full animate-float-slow"
          style={{
            top: "20%",
            right: "-5%",
            background:
              "radial-gradient(circle, oklch(0.60 0.28 295 / 0.12) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full animate-float"
          style={{
            bottom: "20%",
            left: "20%",
            background:
              "radial-gradient(circle, oklch(0.65 0.22 240 / 0.10) 0%, transparent 70%)",
            animationDelay: "4s",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.94 0.01 260) 1px, transparent 1px), linear-gradient(90deg, oklch(0.94 0.01 260) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Floating dots */}
        <div
          className="absolute w-3 h-3 rounded-full animate-float"
          style={{
            top: "35%",
            left: "15%",
            background: "oklch(0.65 0.25 262)",
            boxShadow: "0 0 12px oklch(0.65 0.25 262)",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-2 h-2 rounded-full animate-float"
          style={{
            top: "55%",
            right: "20%",
            background: "oklch(0.60 0.28 295)",
            boxShadow: "0 0 10px oklch(0.60 0.28 295)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute w-4 h-4 rounded-full animate-float"
          style={{
            top: "70%",
            right: "35%",
            background: "oklch(0.70 0.20 230 / 0.7)",
            boxShadow: "0 0 12px oklch(0.70 0.20 230)",
            animationDelay: "2.5s",
          }}
        />
        {/* Rotating rings */}
        <div
          className="absolute w-48 h-48 rounded-full animate-rotate-slow"
          style={{
            top: "15%",
            right: "15%",
            border: "1px solid oklch(0.65 0.25 262 / 0.15)",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full animate-rotate-slow"
          style={{
            top: "10%",
            right: "10%",
            border: "1px solid oklch(0.65 0.25 262 / 0.08)",
            animationDirection: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <div className="flex justify-center mb-8">
            <div
              className="section-label"
              style={{
                animation:
                  "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Performance Marketing Agency
            </div>
          </div>

          {/* Split text headline */}
          <SplitHeadline />

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              animation:
                "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both",
            }}
          >
            We help brands generate high-quality leads, increase conversions,
            and dominate their market with data-driven strategies.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              animation:
                "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both",
            }}
          >
            <MagneticBtn strength={12}>
              <a
                href="#lead"
                data-ocid="hero.primary_button"
                className="btn-neon px-8 py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 group"
              >
                <span>Get Free Strategy Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticBtn>
            <MagneticBtn strength={8}>
              <a
                href="#case-studies"
                data-ocid="hero.secondary_button"
                className="btn-ghost px-8 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2"
              >
                View Case Studies
              </a>
            </MagneticBtn>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap gap-6 justify-center mt-14 text-sm text-muted-foreground"
            style={{
              animation:
                "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s both",
            }}
          >
            {[
              "50,000+ Leads Generated",
              "120+ Happy Clients",
              "10x Average ROI",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.09 0.015 265))",
        }}
      />
    </section>
  );
}

// ─── Clients Ticker (dual-row marquee) ─────────────────────────────────────────────────────

function ClientsTicker() {
  const row1 = [
    "TechCorp",
    "RealtyPro",
    "GrowthX",
    "NexGen",
    "FinEdge",
    "UrbanBrands",
    "ScaleUp",
    "VentureHub",
    "ClearPath",
    "ImpactZone",
  ];
  const row2 = [
    "BoldMedia",
    "ShiftCo",
    "ApexDigital",
    "TrueReach",
    "PeakMark",
    "NovaStudio",
    "CoreBrand",
    "PrimeScale",
    "ZenithHQ",
    "LaunchPad",
  ];

  const tickerStyle = {
    color: "oklch(0.40 0.05 265)",
  };

  return (
    <section
      data-ocid="clients.section"
      className="py-10 border-y border-border overflow-hidden relative"
    >
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute inset-y-0 left-0 w-32"
          style={{
            background:
              "linear-gradient(to right, oklch(0.09 0.015 265), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32"
          style={{
            background:
              "linear-gradient(to left, oklch(0.09 0.015 265), transparent)",
          }}
        />
      </div>

      {/* Row 1 — goes left */}
      <div className="flex mb-4" style={{ width: "max-content" }}>
        <div className="flex gap-14 animate-marquee">
          {[
            ...row1.map((c, j) => ({ name: c, id: `r1a-${j}` })),
            ...row1.map((c, j) => ({ name: c, id: `r1b-${j}` })),
          ].map((item) => (
            <span
              key={item.id}
              className="font-display font-bold text-xl whitespace-nowrap flex items-center gap-3"
              style={tickerStyle}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "oklch(0.45 0.12 262)" }}
              />
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — goes right (reverse) */}
      <div className="flex" style={{ width: "max-content" }}>
        <div className="flex gap-14 animate-marquee-reverse">
          {[
            ...row2.map((c, j) => ({ name: c, id: `r2a-${j}` })),
            ...row2.map((c, j) => ({ name: c, id: `r2b-${j}` })),
          ].map((item) => (
            <span
              key={item.id}
              className="font-display font-bold text-xl whitespace-nowrap flex items-center gap-3"
              style={tickerStyle}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "oklch(0.45 0.12 295)" }}
              />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Target,
    title: "Lead Generation",
    description:
      "Hyper-targeted campaigns that attract and convert high-intent prospects into qualified leads for your sales team.",
    color: "oklch(0.65 0.25 262)",
  },
  {
    icon: Code2,
    title: "Website Development",
    description:
      "Lightning-fast, conversion-optimized websites that turn visitors into customers. Built for performance and scalability.",
    color: "oklch(0.60 0.28 295)",
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "Dominate search rankings with data-driven SEO strategies that drive organic traffic and long-term growth.",
    color: "oklch(0.70 0.20 230)",
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    description:
      "Precision Google advertising with smart bidding, audience targeting, and continuous optimization for maximum ROI.",
    color: "oklch(0.65 0.22 200)",
  },
  {
    icon: TrendingUp,
    title: "Meta Ads",
    description:
      "Scroll-stopping creative campaigns on Facebook and Instagram that scale revenue and build brand awareness.",
    color: "oklch(0.62 0.26 280)",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Build a powerful social presence that engages audiences, drives loyalty, and generates consistent inbound leads.",
    color: "oklch(0.65 0.22 310)",
  },
  {
    icon: Settings,
    title: "Marketing Automation",
    description:
      "Intelligent automation systems that nurture leads 24/7, streamline workflows, and accelerate your revenue flywheel.",
    color: "oklch(0.68 0.20 160)",
  },
];

function Services() {
  const [selectedService, setSelectedService] = useState<
    (typeof SERVICES)[0] | null
  >(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const openServiceModal = (service: (typeof SERVICES)[0]) => {
    setSelectedService(service);
    setFormName("");
    setFormPhone("");
    setFormMessage(`I'm interested in ${service.title} services.`);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    const msg = `Hi, I'm ${formName}. My phone: ${formPhone}. I'm interested in ${selectedService.title} services.`;
    window.open(
      `https://wa.me/917217001969?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    setFormSubmitted(true);
    setTimeout(() => setSelectedService(null), 1800);
  };

  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-24 md:py-32 relative"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.65 0.25 262))",
        }}
      />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <div className="flex justify-center mb-5">
              <span className="section-label">What We Do</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mb-5">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Full-spectrum digital marketing solutions engineered for
              measurable business growth.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="h-full">
              <div
                data-ocid={`services.item.${i + 1}`}
                className="glass-card service-card rounded-2xl p-6 h-full flex flex-col group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${s.color}20`,
                    border: `1px solid ${s.color}40`,
                  }}
                >
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {s.description}
                </p>
                <button
                  data-ocid={`services.item.${i + 1}.open_modal_button`}
                  type="button"
                  onClick={() => openServiceModal(s)}
                  className="mt-5 flex items-center gap-1 text-xs font-semibold opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 cursor-pointer bg-transparent border-none p-0"
                  style={{
                    color: s.color,
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Contact Form Modal */}
      {selectedService && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 m-0 max-w-none max-h-none w-full h-full bg-transparent border-none"
          style={{
            backdropFilter: "blur(8px)",
            background: "rgba(0,0,0,0.75)",
          }}
          onClick={() => setSelectedService(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedService(null)}
          data-ocid="services.contact_modal.dialog"
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-7 shadow-2xl"
            style={{
              background: "oklch(0.11 0.02 265 / 0.97)",
              border: `1px solid ${selectedService.color}40`,
              boxShadow: `0 0 60px ${selectedService.color}20, 0 25px 50px rgba(0,0,0,0.6)`,
              animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <button
              data-ocid="services.contact_modal.close_button"
              type="button"
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "oklch(0.20 0.02 265)",
                color: "oklch(0.75 0.05 265)",
              }}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${selectedService.color}20`,
                  border: `1px solid ${selectedService.color}50`,
                }}
              >
                <selectedService.icon
                  className="w-6 h-6"
                  style={{ color: selectedService.color }}
                />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: selectedService.color }}
                >
                  {selectedService.title}
                </p>
                <h3 className="font-display font-black text-lg text-white leading-tight">
                  Get a Free Consultation
                </h3>
              </div>
            </div>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "oklch(0.55 0.20 160 / 0.2)",
                    border: "1px solid oklch(0.55 0.20 160 / 0.5)",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="oklch(0.72 0.18 160)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    role="img"
                    aria-label="Success"
                  >
                    <title>Success</title>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-display font-bold text-lg text-white">
                  Opening WhatsApp…
                </p>
                <p
                  className="text-sm text-center"
                  style={{ color: "oklch(0.60 0.04 265)" }}
                >
                  {"We'll be in touch shortly!"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "oklch(0.65 0.05 265)" }}
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    data-ocid="services.contact_modal.name_input"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "oklch(0.17 0.02 265)",
                      border: "1px solid oklch(0.28 0.04 265)",
                      color: "oklch(0.90 0.02 265)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = selectedService.color;
                      e.target.style.boxShadow = `0 0 0 2px ${selectedService.color}30`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.28 0.04 265)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "oklch(0.65 0.05 265)" }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    data-ocid="services.contact_modal.phone_input"
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "oklch(0.17 0.02 265)",
                      border: "1px solid oklch(0.28 0.04 265)",
                      color: "oklch(0.90 0.02 265)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = selectedService.color;
                      e.target.style.boxShadow = `0 0 0 2px ${selectedService.color}30`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.28 0.04 265)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "oklch(0.65 0.05 265)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    data-ocid="services.contact_modal.message_textarea"
                    rows={3}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm resize-none outline-none transition-all duration-200"
                    style={{
                      background: "oklch(0.17 0.02 265)",
                      border: "1px solid oklch(0.28 0.04 265)",
                      color: "oklch(0.90 0.02 265)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = selectedService.color;
                      e.target.style.boxShadow = `0 0 0 2px ${selectedService.color}30`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.28 0.04 265)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <button
                  data-ocid="services.contact_modal.submit_button"
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${selectedService.color}, oklch(0.50 0.22 262))`,
                    boxShadow: `0 4px 20px ${selectedService.color}40`,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="WhatsApp"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp
                </button>
                <p
                  className="text-center text-xs"
                  style={{ color: "oklch(0.45 0.04 265)" }}
                >
                  We typically respond within minutes
                </p>
              </form>
            )}
          </div>
        </dialog>
      )}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────────────────────

const CASES = [
  {
    industry: "Real Estate",
    title: "Real Estate Lead Domination",
    result: "Generated 2,400+ qualified leads in 90 days",
    metrics: [
      { label: "ROI", value: "340%" },
      { label: "Leads", value: "2,400+" },
      { label: "CPL", value: "₹180" },
    ],
    detail:
      "Deployed hyper-local Facebook & Google campaigns with AI-powered lookalike audiences, reducing cost per lead by 64% while tripling monthly volume.",
    color: "oklch(0.65 0.25 262)",
  },
  {
    industry: "E-commerce",
    title: "E-commerce Revenue Scale",
    result: "Scaled revenue from ₹42L to ₹2.3Cr/month",
    metrics: [
      { label: "ROAS", value: "5.6x" },
      { label: "Revenue", value: "5.5×" },
      { label: "CVR", value: "+180%" },
    ],
    detail:
      "Full-funnel Meta Ads strategy with dynamic product ads, retargeting sequences, and UGC creative testing drove consistent 5x+ ROAS at scale.",
    color: "oklch(0.60 0.28 295)",
  },
  {
    industry: "B2B SaaS",
    title: "B2B SaaS Pipeline Growth",
    result: "Reduced cost per lead by 68%",
    metrics: [
      { label: "CVR Lift", value: "210%" },
      { label: "CPL Drop", value: "−68%" },
      { label: "MQLs", value: "3.2×" },
    ],
    detail:
      "LinkedIn + Google intent-targeting strategy paired with automated lead nurturing sequences slashed CAC while tripling monthly qualified pipeline.",
    color: "oklch(0.70 0.20 230)",
  },
];

function CaseStudies() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="case-studies"
      data-ocid="case_studies.section"
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <span className="section-label mb-5 inline-block">
              Proven Results
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mt-5 mb-5">
              Case <span className="gradient-text">Studies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real campaigns, real numbers. No fabrications — just proof.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div
                data-ocid={`case_studies.item.${i + 1}`}
                className="glass-card rounded-2xl overflow-hidden relative cursor-default h-full"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Color bar */}
                <div className="h-1" style={{ background: c.color }} />

                <div className="p-7">
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                    style={{ background: `${c.color}15`, color: c.color }}
                  >
                    {c.industry}
                  </span>
                  <h3 className="font-display font-bold text-xl mb-3">
                    {c.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {c.result}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div
                          className="font-display font-black text-xl"
                          style={{ color: c.color }}
                        >
                          {m.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detail on hover */}
                  <div
                    className="text-sm text-muted-foreground leading-relaxed overflow-hidden transition-all duration-400"
                    style={{
                      maxHeight: hovered === i ? "120px" : "0",
                      opacity: hovered === i ? 1 : 0,
                    }}
                  >
                    {c.detail}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Counter ────────────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 50000, label: "Leads Generated", suffix: "+", prefix: "" },
  { value: 200, label: "Campaigns Managed", suffix: "+", prefix: "" },
  { value: 120, label: "Clients Served", suffix: "+", prefix: "" },
  { value: 10, label: "Average ROI", suffix: "x", prefix: "" },
];

function StatCounter({ stat }: { stat: (typeof STATS)[0]; inView: boolean }) {
  const { ref, inView } = useInView();
  const count = useCountUp(stat.value, inView);

  const display =
    stat.value >= 1000
      ? `${(count / 1000).toFixed(count >= stat.value ? 0 : 1)}K`
      : `${count}`;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <div
        className="font-display font-black stat-number animate-counter-glow"
        style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          color: "oklch(0.78 0.18 262)",
          lineHeight: 1,
        }}
      >
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="text-muted-foreground mt-3 font-medium text-sm md:text-base">
        {stat.label}
      </div>
    </div>
  );
}

function Results() {
  return (
    <section
      id="results"
      data-ocid="results.section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Dark gradient section bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.65 0.25 262 / 0.08) 0%, transparent 70%), oklch(0.07 0.018 265)",
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <span className="section-label mb-5 inline-block">
            By The Numbers
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mt-5">
            Results That <span className="gradient-text">Speak</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s) => (
            <StatCounter key={s.label} stat={s} inView={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: 1,
    title: "Strategy",
    desc: "Deep-dive audit + competitor analysis to craft a custom growth blueprint.",
  },
  {
    n: 2,
    title: "Campaign Setup",
    desc: "Pixel-perfect setup of tracking, audiences, creatives, and funnel structure.",
  },
  {
    n: 3,
    title: "Traffic Generation",
    desc: "Multi-channel launch driving high-intent traffic to optimized landing pages.",
  },
  {
    n: 4,
    title: "Lead Capture",
    desc: "Automated lead flows with CRM sync, instant follow-up, and nurture sequences.",
  },
  {
    n: 5,
    title: "Conversion Optimization",
    desc: "Continuous A/B testing and data analysis to compound results month over month.",
  },
];

function Process() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="process"
      data-ocid="process.section"
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <span className="section-label mb-5 inline-block">
              How It Works
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mt-5 mb-5">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A battle-tested 5-step framework that transforms marketing spend
              into predictable revenue.
            </p>
          </Reveal>
        </div>

        {/* Desktop timeline */}
        <div
          className="hidden lg:block"
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          {/* Connecting line */}
          <div className="relative flex items-start justify-between mb-8">
            <div
              className="absolute top-6 left-12 right-12 h-px"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.65 0.25 262 / 0.2), oklch(0.60 0.28 295 / 0.2))",
              }}
            >
              <div
                className="h-full transition-all duration-2000 ease-out process-line"
                style={{
                  width: inView ? "100%" : "0%",
                  transition: "width 2s ease-out",
                }}
              />
            </div>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`reveal stagger-${i + 1} ${inView ? "in-view" : ""} flex flex-col items-center w-1/5 px-4`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-lg mb-6 relative z-10 transition-all duration-500"
                  style={{
                    background: inView
                      ? "linear-gradient(135deg, oklch(0.65 0.25 262), oklch(0.60 0.28 295))"
                      : "oklch(0.18 0.025 265)",
                    color: "white",
                    boxShadow: inView
                      ? "0 0 20px oklch(0.65 0.25 262 / 0.4)"
                      : "none",
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  {s.n}
                </div>
                <h3 className="font-display font-bold text-sm text-center mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-xs text-center leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.25 262), oklch(0.60 0.28 295))",
                      color: "white",
                      boxShadow: "0 0 16px oklch(0.65 0.25 262 / 0.4)",
                    }}
                  >
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px flex-1 my-2"
                      style={{
                        background:
                          "linear-gradient(to bottom, oklch(0.65 0.25 262 / 0.4), transparent)",
                      }}
                    />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display font-bold text-base mb-1">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Digital Marketing Mantra transformed our lead pipeline completely. We went from 30 leads/month to 300+ in 60 days. The ROI is insane.",
    name: "Rajesh Kumar",
    role: "Real Estate Developer, Mumbai",
    rating: 5,
  },
  {
    quote:
      "Our Google Ads ROI went from 2x to 9x in just 3 months. Their team knows exactly what they're doing. Best agency decision I've ever made.",
    name: "Priya Sharma",
    role: "E-commerce CEO, Delhi",
    rating: 5,
  },
  {
    quote:
      "Best investment we've made for the business. 150+ leads every single month, consistently. Our sales team can't keep up!",
    name: "Arjun Mehta",
    role: "SaaS Founder, Bangalore",
    rating: 5,
  },
  {
    quote:
      "Their Meta Ads strategy is simply unmatched. Pure results, pure professionalism. We scaled 4x revenue in under 6 months.",
    name: "Neha Joshi",
    role: "Retail Brand Owner, Pune",
    rating: 5,
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = (i: number) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section
      data-ocid="testimonials.section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.60 0.28 295 / 0.07) 0%, transparent 70%), oklch(0.09 0.015 265)",
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <span className="section-label mb-5 inline-block">
              What Clients Say
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mt-5">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            key={animKey}
            className="glass-card rounded-3xl p-8 md:p-12 testimonial-slide"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }, (_, idx) => idx + 1).map(
                (pos) => (
                  <Star
                    key={`star-${pos}`}
                    className="w-5 h-5 fill-current"
                    style={{ color: "oklch(0.80 0.20 80)" }}
                  />
                ),
              )}
            </div>

            {/* Quote */}
            <blockquote className="font-display font-medium text-xl md:text-2xl leading-relaxed mb-8 text-foreground">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 262), oklch(0.60 0.28 295))",
                  color: "white",
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="font-display font-bold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((testimonial, dotIdx) => (
              <button
                type="button"
                key={testimonial.name}
                onClick={() => goTo(dotIdx)}
                aria-label={`Testimonial ${dotIdx + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: active === dotIdx ? "32px" : "8px",
                  height: "8px",
                  background:
                    active === dotIdx
                      ? "oklch(0.65 0.25 262)"
                      : "oklch(0.30 0.04 265)",
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() =>
                goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
              }
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo((active + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Starter",
    price: "₹15,000",
    period: "/month",
    description:
      "Perfect for businesses just getting started with digital marketing.",
    features: [
      "2 Platforms (Google + Meta)",
      "Basic monthly reporting",
      "Up to 5 campaigns",
      "Email support",
      "Landing page review",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "₹35,000",
    period: "/month",
    description:
      "For scaling businesses that need comprehensive multi-channel growth.",
    features: [
      "4 Platforms (Google, Meta, SEO, Email)",
      "Advanced analytics dashboard",
      "Up to 15 campaigns",
      "Dedicated account manager",
      "Bi-weekly strategy calls",
      "CRO audits & A/B testing",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹75,000",
    period: "/month",
    description:
      "Full-service marketing engine for established businesses at scale.",
    features: [
      "All platforms included",
      "Full-service management",
      "Unlimited campaigns",
      "Custom growth strategy",
      "Weekly strategy sessions",
      "Marketing automation setup",
      "Custom reporting & BI",
      "Dedicated team of 3",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

function Pricing() {
  return (
    <section
      id="pricing"
      data-ocid="pricing.section"
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <span className="section-label mb-5 inline-block">
              Transparent Pricing
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mt-5 mb-5">
              Choose Your <span className="gradient-text">Plan</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              No hidden fees, no lock-in contracts. Cancel or upgrade anytime.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                data-ocid={`pricing.item.${i + 1}`}
                className={`rounded-2xl p-7 h-full flex flex-col relative overflow-hidden ${
                  p.popular ? "pricing-popular" : "glass-card"
                }`}
              >
                {p.popular && (
                  <div
                    className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.25 262), oklch(0.60 0.28 295))",
                      color: "white",
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-black text-xl mb-1">
                    {p.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {p.description}
                  </p>
                  <div className="flex items-end gap-1">
                    <span
                      className="font-display font-black text-4xl"
                      style={{
                        color: p.popular
                          ? "oklch(0.75 0.20 262)"
                          : "oklch(0.94 0.01 260)",
                      }}
                    >
                      {p.price}
                    </span>
                    <span className="text-muted-foreground text-sm mb-1">
                      {p.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{
                          color: p.popular
                            ? "oklch(0.65 0.25 262)"
                            : "oklch(0.60 0.20 160)",
                        }}
                      />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticBtn className="w-full">
                  <a
                    href="#contact"
                    data-ocid={`pricing.item.${i + 1}.primary_button`}
                    className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-300 block ${
                      p.popular ? "btn-neon text-white" : "btn-ghost"
                    }`}
                  >
                    <span>{p.cta}</span>
                  </a>
                </MagneticBtn>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lead Generation CTA ────────────────────────────────────────────────────────────────────────

function LeadForm() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const message = `New Lead from Website \ud83d\ude80\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBusiness: ${form.business}\n\n(Sent via website lead form)`;
    const waUrl = `https://wa.me/917217001969?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    setStatus("success");
    setForm({ name: "", email: "", phone: "", business: "" });
    if (actor) {
      try {
        await actor.submitLead(
          form.name,
          form.email,
          form.phone,
          form.business,
        );
      } catch {}
    }
  };

  return (
    <section
      id="lead"
      data-ocid="lead.section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, oklch(0.65 0.25 262 / 0.10) 0%, transparent 65%), oklch(0.07 0.018 265)",
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="section-label mb-5 inline-block">
              Free Strategy Session
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mt-5 mb-5">
              Get <span className="gradient-text">100+</span> Qualified
              <br />
              Leads Every Month
            </h2>
            <p className="text-muted-foreground text-lg">
              Tell us about your business and we'll craft a custom strategy —
              completely free.
            </p>
          </Reveal>

          <Reveal type="scale">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-sm font-medium mb-1.5 text-muted-foreground"
                  >
                    Your Name
                  </label>
                  <input
                    id="lead-name"
                    data-ocid="lead.input"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    placeholder="Rajesh Kumar"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-email"
                    className="block text-sm font-medium mb-1.5 text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    id="lead-email"
                    data-ocid="lead.email_input"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                    placeholder="rajesh@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-phone"
                    className="block text-sm font-medium mb-1.5 text-muted-foreground"
                  >
                    Phone Number
                  </label>
                  <input
                    id="lead-phone"
                    data-ocid="lead.phone_input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    required
                    placeholder="+91 7217001969"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-business"
                    className="block text-sm font-medium mb-1.5 text-muted-foreground"
                  >
                    Business Name
                  </label>
                  <input
                    id="lead-business"
                    data-ocid="lead.business_input"
                    type="text"
                    value={form.business}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, business: e.target.value }))
                    }
                    required
                    placeholder="Your Business"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>
              </div>

              {status === "success" && (
                <div
                  data-ocid="lead.success_state"
                  className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                  style={{
                    background: "oklch(0.60 0.20 160 / 0.15)",
                    border: "1px solid oklch(0.60 0.20 160 / 0.4)",
                    color: "oklch(0.70 0.18 160)",
                  }}
                >
                  <Check className="w-5 h-5 flex-shrink-0" />
                  We received your request! Expect a call within 24 hours.
                </div>
              )}

              {status === "error" && (
                <div
                  data-ocid="lead.error_state"
                  className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                  style={{
                    background: "oklch(0.55 0.22 25 / 0.15)",
                    border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                    color: "oklch(0.70 0.18 25)",
                  }}
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  Something went wrong. Please try again.
                </div>
              )}

              <MagneticBtn className="w-full">
                <button
                  type="submit"
                  data-ocid="lead.submit_button"
                  disabled={status === "loading"}
                  className="btn-neon w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        data-ocid="lead.loading_state"
                      />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Get My Free Strategy</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </MagneticBtn>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────────────────────

function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const msg = `New Contact Form Message \ud83d\udcec\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}\n\n(Sent via website contact form)`;
    const waUrl = `https://wa.me/917217001969?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    if (actor) {
      try {
        await actor.submitContact(form.name, form.email, form.message);
      } catch {}
    }
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <span className="section-label mb-5 inline-block">
              Get In Touch
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mt-5 mb-5">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Ready to grow? Reach out and we'll get back to you within a few
              hours.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <Reveal type="left">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium mb-1.5 text-muted-foreground"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  data-ocid="contact.name_input"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  placeholder="Rajesh Kumar"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium mb-1.5 text-muted-foreground"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  data-ocid="contact.email_input"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                  placeholder="rajesh@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-1.5 text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  required
                  rows={4}
                  placeholder="Tell us about your business and goals..."
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm resize-none"
                />
              </div>

              {status === "success" && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                  style={{
                    background: "oklch(0.60 0.20 160 / 0.15)",
                    border: "1px solid oklch(0.60 0.20 160 / 0.4)",
                    color: "oklch(0.70 0.18 160)",
                  }}
                >
                  <Check className="w-5 h-5 flex-shrink-0" />
                  Message sent! We'll respond within 24 hours.
                </div>
              )}

              {status === "error" && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                  style={{
                    background: "oklch(0.55 0.22 25 / 0.15)",
                    border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                    color: "oklch(0.70 0.18 25)",
                  }}
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  Something went wrong. Please try again.
                </div>
              )}

              <MagneticBtn className="w-full">
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={status === "loading"}
                  className="btn-neon w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        data-ocid="contact.loading_state"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </MagneticBtn>
            </form>
          </Reveal>

          {/* Info + Map */}
          <Reveal delay={0.15}>
            <div className="space-y-6">
              {/* Contact info */}
              <div className="glass-card rounded-2xl p-6 space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.65 0.25 262 / 0.12)",
                      border: "1px solid oklch(0.65 0.25 262 / 0.25)",
                    }}
                  >
                    <Mail
                      className="w-4 h-4"
                      style={{ color: "oklch(0.70 0.22 262)" }}
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm font-medium">
                      info@digitalmarketingmantra.in
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.65 0.25 262 / 0.12)",
                      border: "1px solid oklch(0.65 0.25 262 / 0.25)",
                    }}
                  >
                    <Phone
                      className="w-4 h-4"
                      style={{ color: "oklch(0.70 0.22 262)" }}
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="text-sm font-medium">
                      <a
                        href="tel:+917217001969"
                        className="hover:text-primary transition-colors"
                      >
                        +91 7217001969
                      </a>
                    </div>
                  </div>
                </div>
                {/* Location */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.65 0.25 262 / 0.12)",
                      border: "1px solid oklch(0.65 0.25 262 / 0.25)",
                    }}
                  >
                    <MapPin
                      className="w-4 h-4"
                      style={{ color: "oklch(0.70 0.22 262)" }}
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Location
                    </div>
                    <div className="text-sm font-medium">New Delhi, India</div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="map-container h-60">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d76.82493084999999!3d28.527554500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                  data-ocid="contact.map_marker"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { icon: SiFacebook, href: "#", label: "Facebook" },
    { icon: SiInstagram, href: "#", label: "Instagram" },
    { icon: SiLinkedin, href: "#", label: "LinkedIn" },
    { icon: SiX, href: "#", label: "X" },
  ];

  return (
    <footer
      className="border-t border-border py-16 relative"
      style={{ background: "oklch(0.07 0.018 265)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.25 262), oklch(0.60 0.28 295))",
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="gradient-text">Digital Marketing</span>
                <span> Mantra</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              India's fastest-growing performance marketing agency. We help
              ambitious brands scale revenue with data-driven digital
              strategies.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-all"
                >
                  <s.icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                "Lead Generation",
                "SEO",
                "Google Ads",
                "Meta Ads",
                "Social Media",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Case Studies", href: "#case-studies" },
                { label: "Process", href: "#process" },
                { label: "Pricing", href: "#pricing" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {year} Digital Marketing Mantra. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dotX = 0;
    let dotY = 0;
    let glowX = 0;
    let glowY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      glowX += (dotX - glowX) * 0.12;
      glowY += (dotY - glowY) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 5}px, ${dotY - 5}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 20}px, ${glowY - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] w-2.5 h-2.5 rounded-full"
        style={{
          background: "oklch(0.75 0.25 262)",
          boxShadow: "0 0 8px 2px oklch(0.65 0.25 262 / 0.8)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      <div
        ref={glowRef}
        className="cursor-glow pointer-events-none fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.25 262 / 0.25) 0%, transparent 70%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}

// ─── Floating Elements ────────────────────────────────────────────────────────────────────────

function FloatingElements() {
  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/917217001969"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        aria-label="Chat on WhatsApp"
        className="whatsapp-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform"
        style={{ background: "oklch(0.60 0.25 145)" }}
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </a>

      {/* Sticky consultation */}
      <a
        href="#contact"
        data-ocid="nav.secondary_button"
        className="sticky-cta hidden xl:flex fixed bottom-6 left-6 z-50 items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white shadow-lg"
      >
        <Phone className="w-4 h-4" />
        Book Consultation
      </a>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen font-body">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ClientsTicker />
        <Services />
        <CaseStudies />
        <Results />
        <Process />
        <Testimonials />
        <Pricing />
        <LeadForm />
        <Contact />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
