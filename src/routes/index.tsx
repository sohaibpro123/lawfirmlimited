import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Globe2,
  GraduationCap,
  Building2,
  Landmark,
  Home as HomeIcon,
  ShieldCheck,
  Scale,
  Sparkles,
  Star,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Plane,
  Briefcase,
  Receipt,
  HeartHandshake,
  Award,
  Users,
  Languages,
  MessagesSquare,

  MessageCircle,
  Newspaper,
  ChevronRight,
} from "lucide-react";
import aboutImage from "@/assets/about-office.jpg";
import logoAsset from "@/assets/law-firm-logo.png.asset.json";
import emblemUrl from "@/assets/law-firm-emblem.png";
import banner1 from "@/assets/banners/banner-1.jpg.asset.json";
import banner2 from "@/assets/banners/banner-2.jpg.asset.json";
import banner3 from "@/assets/banners/banner-3.jpg.asset.json";
import banner4 from "@/assets/banners/banner-4.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/* ------------------------------ Nav ------------------------------ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Services", "#services"],
    ["About", "#about"],
    ["Why Us", "#why"],
    ["Testimonials", "#testimonials"],
    ["News", "#news"],
    ["Contact", "#contact"],
  ];
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`glass-strong flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "shadow-luxe" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-2 sm:gap-2.5">
            <img
              src={emblemUrl}
              alt="Law Firm Limited emblem"
              width={210}
              height={178}
              className="h-9 w-auto sm:h-10 md:h-11"
            />
            <span className="font-display text-base leading-none tracking-[0.02em] text-ivory sm:text-lg md:text-xl">
              Law Firm Limited
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+442079071460" className="text-sm text-muted-foreground hover:text-foreground">
              +44 20 7907 1460
            </a>
            <GoldButton href="#contact" size="sm">
              Book Consultation
            </GoldButton>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-2 rounded-2xl p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map(([l, h]) => (
                <a
                  key={h}
                  href={h}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-gold px-3 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

/* ------------------------------ Buttons ------------------------------ */
function GoldButton({
  children,
  href,
  size = "md",
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-sm",
  };
  const base =
    "group inline-flex items-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300";
  const style =
    variant === "solid"
      ? "bg-gold text-primary-foreground hover:shadow-gold hover:-translate-y-0.5"
      : "gold-border text-foreground hover:bg-gold/10";
  return (
    <a href={href} className={`${base} ${sizes[size]} ${style}`}>
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

/* ------------------------------ Reveal helper ------------------------------ */
function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ Hero Slider ------------------------------ */
const slides = [
  {
    image: banner1.url,
    kicker: "Immigration · eVisa",
    title: "All BRP holders can now apply for an eVisa",
    desc: "The UK is moving to a fully digital immigration system. Our OISC-regulated advisors will register, verify and manage your UKVI account end-to-end.",
    cta: "Start eVisa Application",
    href: "#contact",
  },
  {
    image: banner2.url,
    kicker: "ILR · Long Residence",
    title: "Important changes to 10-year Long Residence ILR",
    desc: "New Home Office guidance is reshaping settlement rights. Book a confidential review with our senior immigration counsel before you file.",
    cta: "Review My ILR Case",
    href: "#contact",
  },
  {
    image: banner3.url,
    kicker: "Banking · Compliance",
    title: "New rules force UK banks to explain account closures",
    desc: "Protect your business banking relationships. We advise founders, HNW clients and international companies on regulated banking and FCA compliance.",
    cta: "Speak to Our Advisors",
    href: "#contact",
  },
  {
    image: banner4.url,
    kicker: "UK Tax Administration",
    title: "Former tax official highlights challenges in UK tax",
    desc: "Personal, corporate and non-dom taxation is under intense reform. Our tax team delivers proactive planning for individuals and enterprises.",
    cta: "Request a Tax Consultation",
    href: "#contact",
  },
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      {/* background slides */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        {slides.map((s, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.06 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={s.image}
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
        {/* cinematic gradient stack */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/70" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_40%,oklch(0.55_0.15_245/0.35),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />
      </motion.div>

      {/* floating orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[18%] h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-float-slow" />
        <div className="absolute right-[6%] top-[8%] h-80 w-80 rounded-full bg-gold/25 blur-3xl animate-float-slower" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16"
      >
        {/* LEFT: copy */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full glass-strong px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            OISC Regulated · London · Est. 2000
          </motion.div>

          {/* animated slide content */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 inline-block rounded-full bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold">
              {slide.kicker}
            </div>
            <h1 className="font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.75rem]">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {slide.desc}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GoldButton href={slide.href} size="lg">
                {slide.cta}
              </GoldButton>
              <GoldButton href="#services" size="lg" variant="outline">
                Explore Services
              </GoldButton>
            </div>
          </motion.div>

          {/* slider controls */}
          <div className="mt-10 flex items-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground/80 transition hover:bg-gold hover:text-primary-foreground"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground/80 transition hover:bg-gold hover:text-primary-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-10 bg-gold" : "w-4 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <div className="ml-auto hidden text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:block">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* RIGHT: floating trust cards */}
        <div className="relative lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="glass-strong shadow-luxe relative overflow-hidden rounded-3xl p-6"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.28em] text-gold">
                Live Case Desk
              </div>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>
            <div className="mt-4 font-display text-5xl leading-none text-gradient-gold">
              98.6%
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Visa Approval Rate · Last 24 Months
            </div>
            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-muted-foreground">
              <Award className="h-4 w-4 text-gold" />
              Chambers-listed · Legal 500 recognised
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="glass mt-4 flex items-center gap-4 rounded-2xl p-4"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
              <MapPin className="h-5 w-5" />
            </div>

            <div>
              <div className="text-sm font-medium">London · Dubai</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Two International Offices
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="glass mt-4 flex items-center gap-4 rounded-2xl p-4"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
              <MessagesSquare className="h-5 w-5" />
            </div>

            <div>
              <div className="text-sm font-medium">10+ Languages</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                English · Russian · Ukrainian · Mandarin · Hindi · Urdu · Punjabi · Farsi · Romanian · Hebrew · Turkish
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* marquee ticker */}
      <div className="relative border-y border-white/5 bg-navy-deep/40 backdrop-blur">
        <div className="flex overflow-hidden py-4">
          <div className="flex shrink-0 animate-marquee items-center gap-14 whitespace-nowrap pr-14 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              [
                "OISC Regulated",
                "SRA (via LF Legal)",
                "25+ Years Practice",
                "10,000+ Clients",
                "138+ 5★ Reviews",
                "London · Dubai",
                "Multilingual Counsel",
                "Chambers · Legal 500",
              ].map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  {t}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------ Counter ------------------------------ */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { n: 25, s: "+", label: "Years Experience" },
  { n: 15, s: "+", label: "Languages Supported" },
  { n: 10000, s: "+", label: "Successful Cases" },
  { n: 4.8, s: "★", label: "Google Rating", decimal: true },
  { n: 138, s: "+", label: "Verified Reviews" },
  { n: 2, s: "", label: "International Offices" },
];

function Stats() {
  return (
    <section className="relative border-y border-white/5 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{ background: "var(--gradient-mesh)" }} />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 flex items-end justify-between">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">By the Numbers</div>
              <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
                A quarter-century of measurable outcomes.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="group relative h-full bg-background/60 p-10 backdrop-blur transition-colors hover:bg-background/40">
                <div className="font-display text-6xl leading-none tracking-tight md:text-7xl">
                  {s.decimal ? (
                    <span>{s.n.toFixed(1)}</span>
                  ) : (
                    <Counter to={s.n} suffix="" />
                  )}
                  <span className="text-gold">{s.s}</span>
                </div>
                <div className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
                <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Services ------------------------------ */
const services = [
  {
    icon: Plane,
    title: "Immigration & Visas",
    desc: "End-to-end representation for work, study, family and settlement routes.",
    items: ["Work Visa", "Student Visa", "Family Visa", "Business Visa", "Settlement", "British Citizenship", "Appeals", "Nationality"],
  },
  {
    icon: Briefcase,
    title: "Business Services",
    desc: "Company formation and corporate compliance to launch and scale in the UK.",
    items: ["Company Formation", "Business Registration", "UK Banking", "Commercial Advice", "Corporate Compliance"],
  },
  {
    icon: Receipt,
    title: "Taxes",
    desc: "Personal and corporate tax strategy aligned with HMRC standards.",
    items: ["Tax Planning", "Tax Returns", "HMRC Advice", "Capital Gains", "Corporate Tax", "VAT"],
  },
  {
    icon: HomeIcon,
    title: "Property",
    desc: "Search, acquisition and management of prime UK residential and investment property.",
    items: ["Property Search", "Investment", "Buying Property", "Rental Services", "Property Management", "Renovation", "Concierge"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Guidance for UK university admissions and student life from application to arrival.",
    items: ["University Admissions", "Student Guidance", "Visa Assistance", "Accommodation"],
  },
  {
    icon: HeartHandshake,
    title: "Life Insurance",
    desc: "Bespoke financial protection and planning for you and your family.",
    items: ["Family Protection", "Financial Planning", "Insurance Consultation"],
  },
];

function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
                What We Do
              </div>
              <h2 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">
                Full-service legal & advisory,{" "}
                <span className="italic text-gradient-gold">under one roof.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Six practice areas, decades of specialisation. Everything you need to
              establish, protect and grow your presence in the United Kingdom.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <ServiceCard {...s} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  items,
  index,
}: {
  icon: typeof Plane;
  title: string;
  desc: string;
  items: string[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-8, 8]), { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative h-full overflow-hidden rounded-3xl glass p-8 transition-all duration-500 hover:border-gold/40"
    >
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="grid h-14 w-14 place-items-center rounded-2xl gold-border bg-gold/5">
            <Icon className="h-6 w-6 text-gold" />
          </div>
          <div className="font-display text-xs text-muted-foreground">
            0{index}
          </div>
        </div>

        <h3 className="mt-8 font-display text-3xl leading-tight">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>

        <div className="mt-6 h-px bg-gradient-to-r from-gold/40 to-transparent" />

        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span>{it}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-2 text-sm text-gold opacity-0 transition-opacity group-hover:opacity-100">
          Learn more <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------ About ------------------------------ */
function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-gold/20 to-accent/20 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-luxe">
                <img
                  src={aboutImage}
                  alt="Law Firm Limited office in London"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={1280}
                  height={1600}
                />
              </div>
              <div className="absolute -bottom-8 -right-6 hidden max-w-[240px] rounded-2xl glass-strong p-6 shadow-luxe md:block">
                <div className="font-display text-4xl text-gold">25<span className="text-2xl">+</span></div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Years serving clients from London
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
                About the Firm
              </div>
              <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
                A London institution for building{" "}
                <span className="italic text-gradient-gold">a life in the UK.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Law Firm Limited has been providing professional immigration and
                  business consultancy since 2000.
                </p>
                <p>
                  Based in Central London with an international office in Dubai, the
                  firm supports individuals, families and businesses relocating to the
                  United Kingdom.
                </p>
                <p>
                  Our experienced consultants assist with immigration, taxation, property
                  acquisition, education, company formation and legal support.
                </p>
                <p className="text-foreground">
                  We are proud to serve clients in multiple languages while maintaining
                  the highest standards of professionalism, transparency and compliance.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <MiniStat label="OISC Registered" icon={ShieldCheck} />
                <MiniStat label="Multilingual Team" icon={Languages} />
                <MiniStat label="Global Client Base" icon={Globe2} />
                <MiniStat label="Award Winning" icon={Award} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, icon: Icon }: { label: string; icon: typeof ShieldCheck }) {
  return (
    <div className="flex items-center gap-3 rounded-xl glass px-4 py-3">
      <Icon className="h-4 w-4 text-gold" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

/* ------------------------------ Why Us Timeline ------------------------------ */
const whyItems = [
  { t: "25+ Years Experience", d: "Serving individuals, families and enterprises since 2000." },
  { t: "Thousands of Successful Clients", d: "A track record measured in visas, businesses and homes." },
  { t: "OISC Registered", d: "Regulated immigration advice you can trust." },
  { t: "Professional Legal Team", d: "Specialist consultants across six practice areas." },
  { t: "Global Client Base", d: "Instructing from over 40 countries across five continents." },
  { t: "Multilingual Support", d: "Native-level service in 15+ languages." },
  { t: "Fast Communication", d: "Responsive, transparent case management from day one." },
  { t: "Trusted Reputation", d: "Rated 4.8★ by 138+ verified Google reviewers." },
];

function WhyUs() {
  return (
    <section id="why" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">Why Choose Us</div>
            <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
              Precision, trust, and{" "}
              <span className="italic text-gradient-gold">discretion.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {whyItems.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.05}>
                <div className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  <div className="hidden w-1/2 md:block" />
                  <div className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-gold shadow-gold md:left-1/2" />
                  <div className="w-full pl-12 md:w-1/2 md:pl-0 md:px-10">
                    <div className="rounded-2xl glass p-6 transition-all hover:border-gold/40">
                      <div className="mb-2 font-display text-xs text-gold">
                        0{i + 1}
                      </div>
                      <div className="font-display text-2xl">{w.t}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Languages ------------------------------ */
const languages = [
  "English", "Russian", "Ukrainian", "Hindi", "Urdu", "Punjabi",
  "Mandarin", "Romanian", "Hebrew", "Turkish", "Farsi", "Chinese",
];

function LanguagesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">Languages</div>
              <h2 className="font-display text-4xl md:text-5xl">
                Service in <span className="italic text-gradient-gold">15+ languages.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Every consultation is delivered in your language, by native-level
              consultants — because clarity is a right, not a luxury.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-3">
            {languages.map((l, i) => (
              <motion.span
                key={l}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="rounded-full glass px-5 py-2.5 text-sm transition-colors hover:border-gold/50 hover:text-gold"
              >
                {l}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Compliance ------------------------------ */
const compliance = [
  { icon: ShieldCheck, t: "OISC Registered", d: "Regulated by the Office of the Immigration Services Commissioner." },
  { icon: Scale, t: "Professional Immigration Advice", d: "Delivered by qualified, accountable advisors." },
  { icon: Landmark, t: "UK Compliant", d: "Every engagement conducted under UK legal frameworks." },
  { icon: MessageCircle, t: "Secure Consultations", d: "Confidential communication — always." },
  { icon: Award, t: "Professional Standards", d: "The highest ethical and operational benchmarks." },
];

function Compliance() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-12">
            <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">Legal Compliance</div>
            <h2 className="max-w-2xl font-display text-4xl md:text-5xl">
              Regulated, accountable,{" "}
              <span className="italic text-gradient-gold">and transparent.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {compliance.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl glass p-6 transition-all hover:border-gold/40 hover:shadow-luxe">
                <div className="grid h-11 w-11 place-items-center rounded-xl gold-border bg-gold/5">
                  <c.icon className="h-5 w-5 text-gold" />
                </div>
                <div className="mt-5 font-display text-lg leading-tight">{c.t}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */
const testimonials = [
  {
    n: "Aleksandra P.",
    role: "Skilled Worker Visa",
    q: "From first call to visa in hand, the team was extraordinary. I always knew where my application stood. Faultless service.",
  },
  {
    n: "Rajiv S.",
    role: "Business Formation",
    q: "They set up our UK entity, opened banking and handled compliance in weeks. Genuinely world-class advisors.",
  },
  {
    n: "Elena M.",
    role: "Property Acquisition",
    q: "Bought our London home entirely through the firm — legal, tax and search. It felt like a private client concierge.",
  },
  {
    n: "David K.",
    role: "British Citizenship",
    q: "Twenty years of professionalism you can feel from the first meeting. My family is now proudly British.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">Testimonials</div>
              <h2 className="font-display text-4xl md:text-6xl">
                Rated <span className="italic text-gradient-gold">4.8★</span> on Google.
              </h2>
            </div>
            <div className="rounded-2xl glass-strong p-6 text-center">
              <div className="flex items-center justify-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <div className="mt-2 font-display text-3xl">4.8 / 5</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                138+ Verified Reviews
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.08}>
              <figure className="relative h-full rounded-3xl glass p-8 transition-all hover:border-gold/40">
                <div className="mb-4 flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                  ))}
                </div>
                <blockquote className="font-display text-2xl leading-snug">
                  “{t.q}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full gold-border bg-gold/10 font-display text-gold">
                    {t.n[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.n}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ News ------------------------------ */
const news = [
  { tag: "Immigration", date: "Nov 2026", title: "Skilled Worker route: what the latest salary threshold changes mean for applicants." },
  { tag: "Tax", date: "Oct 2026", title: "Autumn Budget 2026 — key non-dom, CGT and property updates to plan around." },
  { tag: "Business", date: "Oct 2026", title: "Setting up in the UK from the GCC: banking, compliance and Innovator Founder pathways." },
  { tag: "Policy", date: "Sep 2026", title: "Home Office announces new statement of changes to Appendix FM." },
  { tag: "Education", date: "Sep 2026", title: "2027 UCAS deadlines and how international students should prepare." },
];

function News() {
  return (
    <section id="news" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">Insights</div>
              <h2 className="font-display text-4xl md:text-6xl">
                Latest news &{" "}
                <span className="italic text-gradient-gold">policy updates.</span>
              </h2>
            </div>
            <GoldButton href="#" variant="outline">View all articles</GoldButton>
          </div>
        </Reveal>

        <div className="overflow-hidden rounded-3xl glass">
          {news.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.05}>
              <a
                href="#"
                className="group grid grid-cols-12 items-center gap-6 border-t border-white/5 px-6 py-8 transition-colors hover:bg-white/[0.02] first:border-t-0 md:px-10"
              >
                <div className="col-span-3 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
                  <Newspaper className="h-3.5 w-3.5 text-gold" />
                  {n.tag}
                </div>
                <div className="col-span-9 md:col-span-8">
                  <div className="font-display text-xl leading-snug md:text-2xl">
                    {n.title}
                  </div>
                </div>
                <div className="col-span-12 flex items-center justify-between text-xs text-muted-foreground md:col-span-2 md:justify-end">
                  <span className="md:hidden">{n.date}</span>
                  <span className="hidden md:inline">{n.date}</span>
                  <ChevronRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CTA ------------------------------ */
function CTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] gold-border p-12 md:p-20">
            <div className="pointer-events-none absolute inset-0 -z-10"
              style={{ background: "var(--gradient-hero)" }} />
            <div className="pointer-events-none absolute -top-40 -right-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl animate-float-slow" />
            <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-float-slower" />

            <div className="max-w-3xl">
              <div className="mb-4 text-xs uppercase tracking-[0.28em] text-gold">
                Ready When You Are
              </div>
              <h2 className="font-display text-4xl leading-[1.1] md:text-6xl lg:text-7xl">
                Need professional{" "}
                <span className="inline-block pr-3 pb-2 italic text-gradient-gold">
                  immigration advice?
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Book your consultation with one of our experienced legal consultants today.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <GoldButton href="#contact" size="lg">
                  <Calendar className="h-4 w-4" />
                  Schedule Consultation
                </GoldButton>
                <GoldButton href="tel:+442079071460" size="lg" variant="outline">
                  <Phone className="h-4 w-4" />
                  +44 20 7907 1460
                </GoldButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Contact ------------------------------ */
function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">Contact</div>
              <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
                Let’s begin your{" "}
                <span className="italic text-gradient-gold">UK journey.</span>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Reach us in London or Dubai. Every enquiry is answered by a qualified consultant within one working day.
              </p>

              <div className="mt-12 space-y-8">
                <ContactBlock
                  icon={MapPin}
                  title="London Head Office"
                  lines={["180 Tottenham Court Road", "London W1T 7PD", "United Kingdom"]}
                />
                <ContactBlock
                  icon={Building2}
                  title="Dubai Representative Office"
                  lines={["+971 509 265 140", "+971 525 977 456"]}
                />
                <ContactBlock
                  icon={Phone}
                  title="Direct"
                  lines={["+44 20 7907 1460", "hello@lawfirmlimited.co.uk"]}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-3xl glass p-8 md:p-10 shadow-luxe"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name" placeholder="Jane Doe" />
                <Field label="Email" type="email" placeholder="jane@company.com" />
                <Field label="Phone" placeholder="+44 …" />
                <Field label="Country" placeholder="United Kingdom" />
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Service of Interest
                  </label>
                  <select className="w-full rounded-xl bg-white/[0.03] px-4 py-3.5 text-sm outline-none ring-1 ring-white/10 focus:ring-gold/60">
                    <option>Immigration & Visas</option>
                    <option>Business Services</option>
                    <option>Taxes</option>
                    <option>Property</option>
                    <option>Education</option>
                    <option>Life Insurance</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us a little about your situation…"
                    className="w-full rounded-xl bg-white/[0.03] px-4 py-3.5 text-sm outline-none ring-1 ring-white/10 focus:ring-gold/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-gold"
              >
                Send Enquiry
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Confidential — no obligation. We reply within one working day.
              </p>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 shadow-luxe">
            <iframe
              title="Law Firm Limited — 180 Tottenham Court Road, London"
              src="https://maps.google.com/maps?q=180%20Tottenham%20Court%20Road%20London%20W1T%207PD&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[420px] w-full grayscale-[70%] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactBlock({
  icon: Icon,
  title,
  lines,
}: {
  icon: typeof MapPin;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gold-border bg-gold/5">
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-gold">{title}</div>
        <div className="mt-2 space-y-1 text-base text-foreground">
          {lines.map((l) => <div key={l}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/[0.03] px-4 py-3.5 text-sm outline-none ring-1 ring-white/10 transition-all placeholder:text-muted-foreground/50 focus:ring-gold/60"
      />
    </div>
  );
}

/* ------------------------------ Footer ------------------------------ */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-lg gold-border">
                <Scale className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-display text-xl">Law Firm Limited</div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  London · Dubai · Est. 2000
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Helping people build their future in the United Kingdom. Immigration,
              business, tax, property, education and legal consultancy — for over
              25 years.
            </p>
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold" /> 180 Tottenham Court Road, London W1T 7PD</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold" /> +44 20 7907 1460</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> hello@lawfirmlimited.co.uk</div>
            </div>
          </div>

          <FooterCol title="Firm" links={["About", "Services", "News", "Careers", "Professional Fees"]} />
          <FooterCol title="Legal" links={["Privacy Policy", "Terms", "Cookie Policy", "Complaints"]} />
        </div>

        <div className="hairline mt-16 flex flex-col items-start justify-between gap-4 pt-8 md:flex-row md:items-center">
          <div className="text-xs text-muted-foreground">
            © 2000–2026 Law Firm Limited. All rights reserved.
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            OISC Registered · UK Compliant
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="mb-5 text-xs uppercase tracking-[0.24em] text-gold">{title}</div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ Scroll progress ------------------------------ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
    />
  );
}

/* ------------------------------ Page ------------------------------ */
function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <WhyUs />
        <LanguagesSection />
        <Compliance />
        <Testimonials />
        <News />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
