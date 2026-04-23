import { useState, useRef, useEffect, useCallback } from "react";
import { products } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ChevronRight,
  FlaskConical,
  CheckCircle2,
  Zap,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────
// NOISE GRAIN — subtle industrial texture
// ─────────────────────────────────────────────
const grainStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`,
  backgroundSize: "200px 200px",
};

// ─────────────────────────────────────────────
// SECTION GEOMETRY — parallax diagonal + glow blob
// ─────────────────────────────────────────────
function SectionGeometry() {
  const root = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Shape slide-in from right
      gsap.fromTo(
        shapeRef.current,
        { x: "130%", opacity: 0 },
        {
          x: "15%",
          opacity: 1,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      // Parallax scrub on scroll
      gsap.to(shapeRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
      // Blob float animation
      gsap.to(blobRef.current, {
        y: -30,
        x: 20,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        ref={shapeRef}
        className="absolute top-[-10%] right-0 w-[160%] h-[160%] bg-cyan-100"
        style={{
          clipPath: "polygon(45% 0, 100% 0, 100% 100%, 75% 100%)",
          transform: "rotate(1deg)",
        }}
      />
      {/* Accent glow blob */}
      <div
        ref={blobRef}
        className="absolute top-[30%] right-[18%] w-48 h-48 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// SCANLINES overlay for the main card
// ─────────────────────────────────────────────
const scanlineStyle: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
  backgroundSize: "100% 4px",
};

// ─────────────────────────────────────────────
// PARTICLE CANVAS — floating dots inside card
// ─────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COUNT = 22;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random() * 0.4 + 0.08,
    }));

    let rafId: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${p.a})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ─────────────────────────────────────────────
// NAV BUTTON — magnetic 3D tilt + active glow
// ─────────────────────────────────────────────
interface NavButtonProps {
  product: (typeof products)[0];
  active: boolean;
  onClick: () => void;
  side: "left" | "right";
  index: number;
}

function NavButton({ product, active, onClick, side, index }: NavButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Magnetic tilt
  useEffect(() => {
    const btn = btnRef.current;
    const glow = glowRef.current;
    if (!btn || !glow) return;

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      const dx = (x / r.width - 0.5) * 2,
        dy = (y / r.height - 0.5) * 2;
      gsap.to(btn, {
        rotateY: dx * 7,
        rotateX: -dy * 7,
        duration: 0.25,
        ease: "power2.out",
        transformPerspective: 600,
      });
      gsap.to(glow, {
        x: x - r.width / 2,
        y: y - r.height / 2,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(btn, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Active connector line draw
  useEffect(() => {
    if (!lineRef.current) return;
    if (active) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.4,
          ease: "power3.out",
          transformOrigin: side === "left" ? "left" : "right",
        },
      );
    }
  }, [active, side]);

  return (
    <div
      className="relative flex items-center"
      style={{ transformStyle: "preserve-3d" }}
    >
      <button
        ref={btnRef}
        onClick={onClick}
        className="group relative transition-all duration-200 rounded-2xl border-2 border-blue-950 w-full p-4 xl:p-5 z-20 overflow-hidden"
        style={{
          background: active ? "#020617" : "white",
          boxShadow: active
            ? "inset 0 2px 8px rgba(0,0,0,0.7), 0 0 0 1px rgba(6,182,212,0.15)"
            : "2px 3px 0 #172554",
          transform: active ? "translate(1px, 2px)" : undefined,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Grain */}
        {active && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={grainStyle}
          />
        )}

        {/* Glow cursor */}
        <div
          ref={glowRef}
          className="absolute w-24 h-24 rounded-full pointer-events-none opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%)",
            transform: "translate(-50%,-50%)",
            left: "50%",
            top: "50%",
            filter: "blur(14px)",
          }}
        />

        {/* Active cyan top border */}
        {active && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ff3d41, transparent)",
            }}
          />
        )}

        <div
          className={`relative z-10 flex flex-col ${side === "right" ? "items-end text-right" : "items-start text-left"}`}
        >
          <span
            className={`text-[8px] xl:text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 ${active ? "text-cyan-400" : "text-blue-900 group-hover:text-blue-950"}`}
          >
            MÓDULO {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`text-sm xl:text-base font-black uppercase italic leading-tight ${active ? "text-white" : "text-slate-950"}`}
          >
            {product.name}
          </span>
          {active && (
            <span className="text-[8px] font-bold uppercase tracking-widest text-cyan-500/70 mt-1">
              {product.category}
            </span>
          )}
        </div>
      </button>

      {/* Active connector line */}
      {active && (
        <div
          ref={lineRef}
          className={`absolute top-1/2 -translate-y-1/2 h-[2px] z-10 w-5 xl:w-10 ${side === "left" ? "left-[calc(100%-1px)]" : "right-[calc(100%-1px)]"}`}
          style={{
            background: "linear-gradient(90deg, #ff3d41, #ff3d41)",
            boxShadow: "0 0 8px #ff3d41, 0 0 20px rgba(255,61,65,0.4)",
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PRODUCT COUNTER — animated 01 / 10
// ─────────────────────────────────────────────
function ProductCounter({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;
    gsap.fromTo(
      numRef.current,
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
    );
  }, [current]);

  return (
    <div className="flex items-center gap-2">
      <div className="overflow-hidden h-5">
        <span
          ref={numRef}
          className="block text-xs font-black tabular-nums"
          style={{ color: "#ff3d41" }}
        >
          {String(current + 1).padStart(2, "0")}
        </span>
      </div>
      <div
        className="h-[1px] w-6"
        style={{ background: "rgba(6,182,212,0.4)" }}
      />
      <span
        className="text-xs font-black tabular-nums"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROGRESS DOTS — gsap-animated
// ─────────────────────────────────────────────
function ProgressDots({ total, current }: { total: number; current: number }) {
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        width: i === current ? 24 : 4,
        background: i === current ? "#ff3d41" : "rgba(255,255,255,0.12)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  }, [current]);

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="h-1 rounded-full"
          style={{
            width: i === current ? 24 : 4,
            background: i === current ? "#ff3d41" : "rgba(255,255,255,0.12)",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// FEATURE LIST — clip-path stagger reveal
// ─────────────────────────────────────────────
function FeatureList({
  items,
  icon: Icon,
  label,
  accent,
}: {
  items: string[];
  icon: React.ElementType;
  label: string;
  accent: string;
}) {
  const listRef = useRef<HTMLUListElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".feat-item");
    gsap.fromTo(
      children,
      { x: -14, opacity: 0, clipPath: "inset(0 100% 0 0)" },
      {
        x: 0,
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.45,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, [items]);

  return (
    <div>
      <h4
        className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4"
        style={{ color: accent }}
      >
        <Icon
          className="w-3 h-3 sm:w-3.5 sm:h-3.5"
          style={{ fill: "currentColor" }}
        />
        {label}
      </h4>
      <ul
        ref={listRef as React.RefObject<HTMLUListElement>}
        className="space-y-2 sm:space-y-3"
      >
        {items.map((f, i) => (
          <li key={i} className="feat-item flex items-start gap-2 sm:gap-3">
            <ChevronRight
              className="w-3 h-3 sm:w-4 sm:h-4 mt-[2px] flex-shrink-0"
              style={{ color: accent }}
            />
            <span className="text-[11px] sm:text-sm text-slate-300 font-bold uppercase italic leading-tight">
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdvantageList({ items }: { items: string[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".adv-item");
    gsap.fromTo(
      children,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.22,
      },
    );
  }, [items]);

  return (
    <div>
      <h4
        className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4"
        style={{ color: "#10b981" }}
      >
        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        Vantagens
      </h4>
      <div ref={listRef} className="grid gap-1.5 sm:gap-2">
        {items.map((a, i) => (
          <div
            key={i}
            className="adv-item p-1.5 sm:p-3 rounded-md sm:rounded-xl border flex items-center overflow-hidden relative group"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(23,37,84,0.5)",
            }}
          >
            {/* Hover fill */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, rgba(6,182,212,0.06), transparent)",
              }}
            />
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "#ff3d41" }}
            />
            <span className="relative z-10 text-[10px] sm:text-xs text-slate-200 font-bold italic uppercase tracking-tight leading-snug">
              {a}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Products() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedProduct = products[currentIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const isAnimating = useRef(false);

  const leftGroup = products.slice(0, 5);
  const rightGroup = products.slice(5, 10);

  // ── GSAP entrance animations ──
  useGSAP(
    () => {
      // Header split-word reveal
      const words = headerRef.current?.querySelectorAll(".hd-word");
      if (words) {
        gsap.fromTo(
          words,
          { y: "105%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
          },
        );
      }

      // Header badge fade
      gsap.fromTo(
        ".hd-badge",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        },
      );

      // Nav buttons stagger
      gsap.fromTo(
        ".nav-btn-left",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".nav-btn-right",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        },
      );

      // Main card — dramatic reveal from bottom with scale
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.93, rotateX: 6 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "power4.out",
          transformPerspective: 1200,
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        },
      );
    },
    { scope: sectionRef },
  );

  // ── NAVIGATION with GSAP transition ──
  const navigate = useCallback(
    (direction: number) => {
      if (isAnimating.current || direction === 0) return;
      isAnimating.current = true;

      const nextIndex =
        (currentIndex + direction + products.length) % products.length;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      tl.to(contentRef.current, {
        autoAlpha: 0,
        x: -28 * direction,
        y: -8,
        scale: 0.96,
        filter: "blur(4px)",
        duration: 0.28,
        ease: "power2.in",
      })
        .call(() => setCurrentIndex(nextIndex))
        .set(contentRef.current, {
          x: 28 * direction,
          y: 8,
          scale: 0.96,
          filter: "blur(4px)",
        })
        .to(contentRef.current, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.52,
          ease: "back.out(1.3)",
        });

      // Card border flash
      gsap.fromTo(
        cardRef.current,
        { boxShadow: "4px 6px 0 #172554, 0 0 0 1px rgba(6,182,212,0)" },
        {
          boxShadow: "4px 6px 0 #172554, 0 0 0 1px rgba(6,182,212,0.6)",
          duration: 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
      );
    },
    [currentIndex],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) navigate(diff > 0 ? 1 : -1);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <section
      ref={sectionRef}
      id="produtos"
      className="pt-16 pb-32 sm:pt-24 sm:pb-40 md:pt-4 md:pb-20 bg-white relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ══════ HEADER ══════ */}
        <header
          ref={headerRef}
          className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 text-center md:text-left"
        >
          <div className="max-w-2xl mx-auto md:mx-0">
            {/* Badge */}
            <div className="hd-badge flex items-center justify-center md:justify-start gap-3 text-cyan-600 mb-4">
              <FlaskConical className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                Linha de Performance Industrial
              </span>
            </div>
            {/* Split headline */}
            <div className="overflow-hidden">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter uppercase italic leading-[1.1] md:leading-[0.9]">
                {["Nossas"].map((w, i) => (
                  <span
                    key={i}
                    className="hd-word inline-block mr-3"
                    style={{ display: "inline-block" }}
                  >
                    {w}
                  </span>
                ))}
                <br className="hidden md:block" />
                <span
                  className="hd-word inline-block"
                  style={{ color: "#ff3d41", display: "inline-block" }}
                >
                  Soluções.
                </span>
              </h2>
            </div>
          </div>

          {/* Product count pill */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="flex flex-col items-end">
              <span
                className="text-4xl font-black tracking-tighter"
                style={{ color: "#0f172a", lineHeight: 1 }}
              >
                {String(products.length).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">
                Produtos Disponíveis
              </span>
            </div>
            <div
              className="w-[2px] h-12 rounded-full"
              style={{
                background: "linear-gradient(180deg, #ff3d41, transparent)",
              }}
            />
          </div>
        </header>

        {/* ══════ MAIN GRID ══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 xl:gap-14 items-center">
          {/* LEFT NAV */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-3 xl:gap-4">
            {leftGroup.map((p, idx) => (
              <div key={p.id} className="nav-btn-left">
                <NavButton
                  product={p}
                  active={currentIndex === idx}
                  onClick={() => navigate(idx - currentIndex)}
                  side="left"
                  index={idx}
                />
              </div>
            ))}
          </div>

          {/* CENTER CARD */}
          <div className="lg:col-span-6 -mx-4 sm:-mx-6 md:mx-0 relative">
            {/* Mobile SM nav arrows */}
            <div className="hidden sm:flex lg:hidden absolute inset-y-0 -left-4 -right-4 justify-between items-center z-[60] pointer-events-none">
              <button
                onClick={() => navigate(-1)}
                className="w-14 h-24 bg-slate-950 border-y-2 border-r-2 border-blue-950 rounded-r-2xl flex items-center justify-center text-cyan-400 hover:text-white shadow-[3px_3px_0_#172554] active:translate-x-[-1px] transition-all pointer-events-auto"
                style={{ backdropFilter: "blur(4px)" }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-14 h-24 bg-cyan-600 border-y-2 border-l-2 border-blue-950 rounded-l-2xl flex items-center justify-center text-slate-950 hover:bg-cyan-400 shadow-[-3px_3px_0_#172554] active:translate-x-[1px] transition-all pointer-events-auto"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* THE CARD */}
            <div
              ref={cardRef}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative rounded-[2.5rem] md:rounded-[3rem] text-white overflow-hidden z-30"
              style={{
                background: "#020617",
                border: "2px solid #172554",
                boxShadow:
                  "6px 8px 0 #172554, 0 32px 80px -16px rgba(2,6,23,0.6)",
                height: "clamp(520px, 62vw, 680px)",
              }}
            >
              {/* Particle canvas */}
              <ParticleCanvas />

              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ ...scanlineStyle, zIndex: 1 }}
              />

              {/* Grain */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{ ...grainStyle, zIndex: 1 }}
              />

              {/* Top gradient fade */}
              <div
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, #020617 0%, transparent 100%)",
                  zIndex: 2,
                }}
              />

              {/* Corner accent — top right */}
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(6,182,212,0.12), transparent 70%)",
                  zIndex: 2,
                }}
              />

              {/* TOP BAR — mobile swipe hint + dots */}
              <div
                className="lg:hidden absolute top-0 left-0 right-0 z-30 px-5 pt-5 pb-3"
                style={{
                  background:
                    "linear-gradient(180deg, #020617 60%, transparent)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <ProductCounter
                    current={currentIndex}
                    total={products.length}
                  />
                  <div
                    className="flex items-center gap-2 px-3 py-1 rounded-full border"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(6,182,212,0.2)",
                    }}
                  >
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400/70">
                      Deslize
                    </span>
                    <ArrowRight className="w-3 h-3 text-cyan-400 animate-bounce-x" />
                  </div>
                </div>
                <ProgressDots total={products.length} current={currentIndex} />
              </div>

              {/* CONTENT */}
              <div
                ref={contentRef}
                className="relative z-10 p-5 pt-20 sm:p-10 sm:pt-24 md:p-12 w-full h-full flex flex-col justify-center"
              >
                {/* Desktop counter */}
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <ProductCounter
                    current={currentIndex}
                    total={products.length}
                  />
                  <ProgressDots
                    total={products.length}
                    current={currentIndex}
                  />
                </div>

                {/* Header */}
                <div className="mb-4 sm:mb-8 flex-shrink-0">
                  <div
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full border mb-3 sm:mb-4"
                    style={{
                      background: "rgba(6,182,212,0.08)",
                      borderColor: "rgba(6,182,212,0.2)",
                    }}
                  >
                    <FlaskConical className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                      {selectedProduct.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-3 sm:mb-4 line-clamp-2 drop-shadow-md">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-xs sm:text-base text-slate-400 leading-snug sm:leading-relaxed font-medium italic border-l-[3px] sm:border-l-4 border-cyan-600 pl-3 sm:pl-4 line-clamp-2 sm:line-clamp-3">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Features + Advantages */}
                <div
                  className="flex-1 border-t pt-3 sm:pt-6"
                  style={{ borderColor: "rgba(23,37,84,0.5)" }}
                >
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 h-full">
                    <FeatureList
                      items={selectedProduct.features}
                      icon={Zap}
                      label="Especificações"
                      accent="#06b6d4"
                    />
                    <AdvantageList items={selectedProduct.advantages} />
                  </div>
                </div>
              </div>

              {/* Bottom left — prev/next arrow hint (desktop) */}
              <div className="hidden lg:flex absolute bottom-6 right-8 z-20 items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) =>
                    gsap.to(e.currentTarget, {
                      background: "rgba(6,182,212,0.15)",
                      duration: 0.2,
                    })
                  }
                  onMouseLeave={(e) =>
                    gsap.to(e.currentTarget, {
                      background: "rgba(255,255,255,0.07)",
                      duration: 0.2,
                    })
                  }
                >
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(6,182,212,0.15)",
                    border: "1px solid rgba(6,182,212,0.25)",
                  }}
                  onMouseEnter={(e) =>
                    gsap.to(e.currentTarget, {
                      background: "rgba(6,182,212,0.3)",
                      duration: 0.2,
                    })
                  }
                  onMouseLeave={(e) =>
                    gsap.to(e.currentTarget, {
                      background: "rgba(6,182,212,0.15)",
                      duration: 0.2,
                    })
                  }
                >
                  <ArrowRight className="w-4 h-4 text-cyan-300" />
                </button>
              </div>
            </div>

            {/* Mobile XS — bottom swipe controls */}
            <div className="flex sm:hidden items-center justify-between mt-5 px-1">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black uppercase italic border-2 border-blue-950 shadow-[2px_3px_0_#172554] active:translate-y-[1px] active:shadow-none transition-all"
                style={{ background: "#020617", color: "#ff3d41" }}
              >
                <ArrowLeft className="w-4 h-4" /> Anterior
              </button>

              {/* XS dots */}
              <div className="flex items-center gap-1">
                {products.map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full transition-all duration-300"
                    style={{
                      background:
                        i === currentIndex ? "#ff3d41" : "rgba(255,61,65,0.2)",
                      transform: i === currentIndex ? "scale(1.5)" : "scale(1)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black uppercase italic border-2 border-blue-950 shadow-[-2px_3px_0_#ff3d41] active:translate-y-[1px] active:shadow-none transition-all"
                style={{ background: "#0891b2", color: "#020617" }}
              >
                Próximo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT NAV */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-3 xl:gap-4">
            {rightGroup.map((p, idx) => (
              <div key={p.id} className="nav-btn-right">
                <NavButton
                  product={p}
                  active={currentIndex === idx + 5}
                  onClick={() => navigate(idx + 5 - currentIndex)}
                  side="right"
                  index={idx + 5}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(4px); }
        }
        .animate-bounce-x { animation: bounce-x 1.2s ease-in-out infinite; }
      `,
        }}
      />
    </section>
  );
}
