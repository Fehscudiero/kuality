import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Contador Sincronizado ---
function AnimatedCounter({
  end,
  suffix = "",
  delay = 0,
}: {
  end: number;
  suffix?: string;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef({ value: 0 });
  useGSAP(() => {
    gsap.to(countRef.current, {
      value: end,
      duration: 1.5,
      delay,
      ease: "power3.out",
      onUpdate: () => setDisplayValue(Math.floor(countRef.current.value)),
    });
  }, [end, delay]);
  return (
    <span className="tabular-nums tracking-tighter">
      {displayValue}
      {suffix}
    </span>
  );
}

// --- Particle Canvas ---
const ParticleCanvas = ({ scrollProgress }: { scrollProgress: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // EDIT CIRÚRGICO: Partículas levemente maiores (1.0 a 3.0)
        size: Math.random() * 2.0 + 1.0,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        // EDIT CIRÚRGICO: Mais opacas e visíveis (0.4 a 0.9)
        alpha: Math.random() * 0.5 + 0.4,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollBoost = 1 + scrollProgress * 5;

      particles.current.forEach((p) => {
        p.x += p.speedX * scrollBoost;
        p.y += p.speedY * scrollBoost;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        // EDIT CIRÚRGICO: Vermelho intenso puro ao invés de cyan
        ctx.fillStyle = `rgba(255, 20, 20, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();
    return () => window.removeEventListener("resize", init);
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[3] pointer-events-none mix-blend-screen"
    />
  );
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // CORES DE FUNDO
  const bgColorPrimary = "#0a0d12";
  const bgColorSecondary = "#06080a";

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".tag-item", {
          y: -50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          clearProps: "all",
        })
          .from(
            ".headline",
            {
              y: 80,
              rotationX: -40,
              opacity: 0,
              duration: 1.4,
              transformOrigin: "center bottom",
              clearProps: "all",
            },
            "-=0.8",
          )
          .from(
            ".description",
            {
              y: 30,
              opacity: 0,
              duration: 1.2,
              ease: "power3.out",
              clearProps: "all",
            },
            "-=1",
          )
          .from(
            ".cta-button",
            {
              scale: 0.85,
              y: 40,
              opacity: 0,
              duration: 1.4,
              ease: "elastic.out(1.2, 0.7)",
              clearProps: "all",
            },
            "-=1",
          )
          .from(
            ".stat-item",
            {
              y: 60,
              opacity: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "power4.out",
              clearProps: "all",
            },
            "-=1.2",
          )
          .from(
            ".scroll-indicator",
            { opacity: 0, scale: 0.5, duration: 1, clearProps: "all" },
            "-=0.5",
          );
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".mobile-reveal", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          clearProps: "all",
        });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          gsap.to(sectionRef.current, {
            backgroundColor:
              self.progress > 0.5 ? bgColorSecondary : bgColorPrimary,
            duration: 0.5,
          });
        },
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const scrollToProducts = () => {
    const el = document.getElementById("produtos");
    if (el) {
      const yOffset = -50;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById("sobre");
    if (el) {
      const yOffset = -50;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100dvh] min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0d12]"
      style={{ perspective: "1000px" }}
    >
      <style>{`
        @keyframes text-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 4s linear infinite;
        }
        @keyframes button-breathe {
          0%, 100% { box-shadow: 0 0 15px rgba(6,182,212,0.2); }
          50% { box-shadow: 0 0 30px rgba(6,182,212,0.5); }
        }
        .animate-button-breathe {
          animation: button-breathe 3s ease-in-out infinite;
        }
        @keyframes mouse-scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-mouse-scroll {
          animation: mouse-scroll 1.5s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
        }
      `}</style>

      <ParticleCanvas scrollProgress={scrollProgress} />

      <div className="absolute inset-0 z-[4] opacity-[0.015] pointer-events-none bg-noise" />

      <div
        ref={contentRef}
        className="relative z-[10] flex flex-col items-center justify-between px-6 max-w-6xl w-full h-full pt-20 pb-32 md:pt-28 md:pb-40"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-12">
            {[
              "Tratamento de Superfície",
              "Decapagem Química",
              "Linha Automotiva",
            ].map((tag, i) => (
              <div
                key={i}
                className="tag-item mobile-reveal inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-950/40 border border-cyan-800/50 rounded-full backdrop-blur-sm"
              >
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                </div>
                <span className="text-cyan-300 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                  {tag}
                </span>
              </div>
            ))}
          </div>

          <h1 className="headline mobile-reveal text-[38px] leading-[1.05] sm:text-6xl md:text-[90px] lg:text-[80px] font-black text-white tracking-normal uppercase text-center">
            Quem entende,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-500 animate-text-shimmer">
              busca Kuality.
            </span>
          </h1>

          <p className="description mobile-reveal mt-6 md:mt-8 text-[15px] sm:text-lg md:text-xl text-slate-400/80 max-w-2xl font-medium leading-relaxed px-4 text-center">
            Especializada no desenvolvimento de soluções químicas para
            indústrias de diversos portes.
          </p>

          <div className="cta-button mobile-reveal mt-10 md:mt-14 w-full sm:w-auto">
            <button
              onClick={scrollToProducts}
              className="relative overflow-hidden w-full sm:w-auto px-16 py-4 md:py-5 bg-cyan-700 text-white text-[11px] font-black rounded-xl tracking-[0.25em] transition-all duration-300 animate-button-breathe active:scale-95 active:bg-cyan-800 md:hover:-translate-y-1 md:hover:bg-cyan-600 md:hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]"
            >
              <span className="relative z-10">EXPLORAR SOLUÇÕES</span>
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-auto grid grid-cols-3 gap-y-10 md:gap-y-12 gap-x-2 sm:gap-x-4 md:gap-16 border-t border-cyan-500/20 pt-8 md:pt-12 w-full max-w-4xl">
          {[
            { n: 35, s: "+", l: "ANOS DE KNOW-HOW", d: 0.5 },
            { n: 100, s: "%", l: "PUREZA GARANTIDA", d: 0.6 },
            { n: 10, s: "+", l: "LINHAS ATIVAS", d: 0.7 },
          ].map((s, i) => (
            <div
              key={i}
              className="stat-item mobile-reveal flex flex-col items-center text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <AnimatedCounter end={s.n} suffix={s.s} delay={s.d} />
              </div>
              <div className="text-[8px] sm:text-[10px] md:text-[11px] mt-2 md:mt-3 tracking-wider sm:tracking-[0.25em] md:tracking-[0.4em] text-cyan-400 font-bold uppercase transition-colors duration-300">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={scrollToAbout}
        className="scroll-indicator mobile-reveal absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 p-3 cursor-pointer group z-[20] transition-opacity hover:opacity-100 opacity-60 hidden md:block"
        aria-label="Rolar para a seção Sobre"
      >
        <div className="w-5 h-9 md:w-6 md:h-10 border-2 border-cyan-500/50 rounded-full flex justify-center pt-2 group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-mouse-scroll" />
        </div>
      </div>
    </section>
  );
}