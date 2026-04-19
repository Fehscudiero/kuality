import { useState, useRef } from "react";
import { products } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ChevronRight,
  FlaskConical,
  CheckCircle2,
  Zap,
  Beaker,
  Target,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SectionGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !shapeRef.current) return;
      gsap.fromTo(
        shapeRef.current,
        { x: "120%", opacity: 0 },
        {
          x: "15%",
          opacity: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        ref={shapeRef}
        className="absolute top-[-10%] right-0 w-[140%] h-[120%] bg-cyan-100/30"
        style={{
          clipPath: "polygon(45% 0, 100% 0, 100% 100%, 75% 100%)",
          transform: "rotate(1deg)",
          zIndex: 5,
        }}
      />
    </div>
  );
}

export default function Products() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedProduct = products[currentIndex];
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const leftGroup = products.slice(0, 5);
  const rightGroup = products.slice(5, 10);

  const navigate = (direction: number) => {
    const nextIndex =
      (currentIndex + direction + products.length) % products.length;
    const tl = gsap.timeline();
    tl.to(contentRef.current, {
      autoAlpha: 0,
      x: -40 * direction,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    })
      .call(() => setCurrentIndex(nextIndex))
      .fromTo(
        contentRef.current,
        { autoAlpha: 0, x: 40 * direction, scale: 0.95 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
      );
  };

  const onTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  };

  return (
    <section
      id="produtos"
      className="py-24 md:py-44 bg-white relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-10 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="flex items-center justify-center md:justify-start gap-3 text-cyan-700 mb-6">
              <Target className="w-6 h-6 animate-pulse" />
              <Beaker className="w-6 h-6 text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                Linha de Performance Industrial
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.8]">
              Nossas <br className="hidden md:block" />{" "}
              <span className="text-cyan-600">Soluções.</span>
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-center">
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
            {leftGroup.map((p, idx) => (
              <NavButton
                key={p.id}
                product={p}
                active={currentIndex === idx}
                onClick={() => navigate(idx - currentIndex)}
                side="left"
              />
            ))}
          </div>

          <div className="lg:col-span-6 -mx-6 md:mx-0 relative">
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="bg-slate-950 md:rounded-[4rem] text-white relative shadow-2xl min-h-[700px] md:min-h-[600px] flex flex-col overflow-hidden"
            >
              {/* MOBILE: Informativo Superior (Sinalização para Direita) */}
              <div className="lg:hidden absolute top-0 left-0 right-0 z-30 p-4 flex flex-col gap-3 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent">
                <div className="flex gap-1">
                  {products.map((_, idx) => (
                    <div
                      key={idx}
                      className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden"
                    >
                      <div
                        className={`h-full bg-cyan-500 transition-all duration-500 ${currentIndex === idx ? "w-full shadow-[0_0_10px_cyan]" : "w-0"}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 animate-swipe-right">
                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white">
                      Deslize para o lado
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>
              </div>

              <div
                ref={contentRef}
                className="relative z-10 p-8 pt-24 md:p-16 w-full flex-1 flex flex-col"
              >
                <header className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6">
                    <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">
                      {selectedProduct.category}
                    </span>
                  </div>
                  {/* Fonte reduzida no mobile (text-4xl vs text-5xl anterior) */}
                  <h3 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
                    {selectedProduct.name}
                  </h3>
                  {/* Fonte reduzida no mobile (text-lg vs text-xl anterior) */}
                  <p className="text-lg md:text-2xl text-slate-400 leading-relaxed font-medium italic border-l-4 border-cyan-600 pl-6">
                    {selectedProduct.description}
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-auto pt-8 border-t border-white/5">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 fill-current" />{" "}
                      Especificações
                    </h4>
                    <ul className="space-y-3">
                      {selectedProduct.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 text-cyan-600 mt-1 flex-shrink-0" />
                          <span className="text-sm md:text-base text-slate-300 font-bold uppercase italic leading-tight">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Vantagens
                    </h4>
                    <div className="grid gap-2">
                      {selectedProduct.advantages.map((a, i) => (
                        <div
                          key={i}
                          className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center"
                        >
                          <span className="text-[11px] md:text-sm text-slate-200 font-bold italic uppercase tracking-tight">
                            {a}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
            {rightGroup.map((p, idx) => (
              <NavButton
                key={p.id}
                product={p}
                active={currentIndex === idx + 5}
                onClick={() => navigate(idx + 5 - currentIndex)}
                side="right"
              />
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes swipe-right { 
          0% { transform: translateX(-5px); opacity: 0.6; } 
          50% { transform: translateX(5px); opacity: 1; } 
          100% { transform: translateX(-5px); opacity: 0.6; } 
        }
        .animate-swipe-right { animation: swipe-right 1.5s infinite ease-in-out; }
      `,
        }}
      />
    </section>
  );
}

const NavButton = ({ product, active, onClick, side }: any) => (
  <div className="relative flex items-center">
    <button
      onClick={onClick}
      className={`group relative transition-all duration-500 rounded-2xl border-2 w-full p-7 z-20 ${
        active
          ? "bg-slate-900 border-cyan-500 shadow-xl scale-[1.08]"
          : "bg-cyan-50/30 border-cyan-100 text-slate-500 hover:border-cyan-200 hover:bg-white"
      }`}
    >
      <div
        className={`flex flex-col ${side === "right" ? "items-end text-right" : "items-start text-left"}`}
      >
        <span
          className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${active ? "text-cyan-400" : "text-cyan-600"}`}
        >
          MÓDULO {product.id.split("-")[1] || "QC"}
        </span>
        <span
          className={`text-base font-black uppercase italic ${active ? "text-white" : "text-slate-950"}`}
        >
          {product.name}
        </span>
      </div>
    </button>
    {active && (
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-px bg-cyan-500 shadow-[0_0_15px_cyan] z-10 w-20 ${side === "left" ? "left-full" : "right-full"}`}
      />
    )}
  </div>
);
