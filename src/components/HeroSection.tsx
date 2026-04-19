import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- 1. Contador Sincronizado (Performance de Elite) ---
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
      duration: 3,
      delay,
      ease: "expo.out",
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

// --- 2. Particle Canvas: "Fluido Molecular" ---
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
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        alpha: Math.random() * 0.5 + 0.1,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // O scroll progress afeta a velocidade e o rastro das partículas
      const scrollBoost = 1 + scrollProgress * 5;

      particles.current.forEach((p) => {
        p.x += p.speedX * scrollBoost;
        p.y += p.speedY * scrollBoost;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
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

  useGSAP(
    () => {
      // 1. Revelação Otimizada: Menos tempo, sem blur pesado no LCP
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-reveal", {
        y: 30, // Reduzi de 60 para 30 para ser mais rápido
        opacity: 0,
        duration: 0.8, // De 2s para 0.8s (Crucial para o LCP)
        stagger: 0.1,
        clearProps: "all", // Limpa os estilos após animar para não bugar o SEO
      });

      // 2. REAÇÃO QUÍMICA VIA SCROLL
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          gsap.to(sectionRef.current, {
            backgroundColor: self.progress > 0.5 ? "#06080a" : "#0a0d12",
            duration: 0.5,
          });
        },
      });

      gsap.to(".chem-cloud", {
        y: (i) => (i + 1) * -150,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0d12]"
    >
      {/* Background e Particles continuam... */}
      <ParticleCanvas scrollProgress={scrollProgress} />

      {/* CORREÇÃO DO NOISE: Removido link externo que dava 403 e substituído por um gradiente ou asset local */}
      <div className="absolute inset-0 z-[4] opacity-[0.015] pointer-events-none bg-noise" />

      <div
        ref={contentRef}
        className="relative z-[10] flex flex-col items-center px-6 max-w-5xl w-full text-center"
      >
        {/* Badge */}
        <div className="hero-reveal mb-8 inline-flex items-center gap-3 px-4 py-1.5 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-xl">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
          </div>
          <span className="text-white/40 text-[9px] font-bold tracking-[0.5em] uppercase font-mono italic">
            Kuality Molecular Lab v4.0
          </span>
        </div>

        {/* Headline - H1 deve carregar o mais rápido possível */}
        <h1 className="hero-reveal text-[36px] leading-[0.92] sm:text-6xl md:text-[85px] lg:text-[100px] font-black text-white tracking-[-0.05em] uppercase">
          Quem entende,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-white to-blue-600">
            busca Kuality.
          </span>
        </h1>

        {/* PARÁGRAFO LCP: Removi o delay excessivo e o blur */}
        <p className="hero-reveal mt-8 text-[14px] sm:text-lg text-slate-400/80 max-w-xl font-medium leading-relaxed tracking-tight px-4 border-cyan-500/20 md:border-none">
          Especializada no desenvolvimento de soluções químicas para indústrias
          de diversos portes.
        </p>

        {/* Botões */}
        <div className="hero-reveal mt-12 flex flex-col sm:flex-row gap-5">
          <button className="px-12 py-4 bg-cyan-600 text-white text-[10px] font-black rounded-xl shadow-lg hover:-translate-y-1 transition-all tracking-[0.25em]">
            EXPLORAR SOLUÇÕES
          </button>
          <button className="px-12 py-4 border border-white/5 text-white/60 text-[10px] font-bold rounded-xl hover:bg-white/[0.03] transition-all tracking-[0.25em]">
            CONSULTORIA TÉCNICA
          </button>
        </div>

        {/* Stats */}
        <div className="hero-reveal mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/5 pt-12 w-full max-w-4xl">
          {[
            { n: 35, s: "+", l: "ANOS DE KNOW-HOW", d: 0.5 },
            { n: 100, s: "%", l: "PUREZA GARANTIDA", d: 0.6 },
            { n: 9, s: "+", l: "LINHAS ATIVAS", d: 0.7 },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-black text-white">
                <AnimatedCounter end={s.n} suffix={s.s} delay={s.d} />
              </div>
              <div className="text-[8px] md:text-[9px] mt-2 tracking-[0.4em] text-cyan-500/30 font-black uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
