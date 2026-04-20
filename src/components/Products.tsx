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
  ArrowLeft,
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
      className="py-16 sm:py-24 md:py-40 bg-white relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <header className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="flex items-center justify-center md:justify-start gap-3 text-cyan-700 mb-4">
              <Target className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
              <Beaker className="w-5 h-5 md:w-6 md:h-6 text-cyan-500 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                Linha de Performance Industrial
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.8]">
              Nossas <br className="hidden md:block" />{" "}
              <span className="text-cyan-600">Soluções.</span>
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10 xl:gap-16 items-center">
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 xl:gap-5">
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

          <div className="lg:col-span-6 -mx-4 sm:-mx-6 md:mx-0 relative">
            <div className="hidden sm:flex lg:hidden absolute inset-y-0 -left-4 -right-4 justify-between items-center z-[60] pointer-events-none">
              <button
                onClick={() => navigate(-1)}
                className="w-14 h-24 bg-slate-950 border-y-2 border-r-2 border-blue-950 rounded-r-2xl flex items-center justify-center text-cyan-400 hover:text-white shadow-[3px_3px_0_#172554] active:translate-x-[-1px] active:shadow-[1px_3px_0_#172554] transition-all pointer-events-auto"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-14 h-24 bg-cyan-600 border-y-2 border-l-2 border-blue-950 rounded-l-2xl flex items-center justify-center text-slate-950 hover:bg-cyan-400 shadow-[-3px_3px_0_#172554] active:translate-x-[1px] active:shadow-[-1px_3px_0_#172554] transition-all pointer-events-auto"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              // AQUI O PAINEL ESTÁ FIXO: Usando h-[...] explícito em vez de min-h
              className="bg-slate-950 border-[2px] md:border-[3px] border-blue-950 rounded-[2.5rem] md:rounded-[3rem] text-white relative shadow-[4px_6px_0_#172554] md:shadow-[6px_8px_0_#172554] h-[640px] sm:h-[600px] md:h-[620px] lg:h-[650px] xl:h-[680px] w-full flex flex-col overflow-hidden transition-all duration-500 z-30"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

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
              </div>

              {/* flex-1 min-h-0 garante que o scroll interno funcione sem vazar do pai fixo */}
              <div
                ref={contentRef}
                className="relative z-10 p-6 pt-20 sm:p-10 sm:pt-24 md:p-12 w-full flex-1 flex flex-col min-h-0"
              >
                {/* Header fixo no topo, não encolhe */}
                <header className="flex-shrink-0 mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-4">
                    <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-cyan-400">
                      {selectedProduct.category}
                    </span>
                  </div>
                  {/* Tamanho de fonte ajustado e line-clamp para não quebrar layout com nomes grandes */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-4 line-clamp-2 drop-shadow-md">
                    {selectedProduct.name}
                  </h3>
                  {/* Texto menor e travado em 3 linhas máximo */}
                  <p className="text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed font-medium italic border-l-4 border-cyan-600 pl-4 md:pl-5 line-clamp-3">
                    {selectedProduct.description}
                  </p>
                </header>

                {/* Área rolável internamente, preenche o espaço que sobrar */}
                <div className="flex-1 overflow-y-auto no-scrollbar border-t border-blue-950/50 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 flex items-center gap-2">
                        <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />{" "}
                        Especificações
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {selectedProduct.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-slate-300 font-bold uppercase italic leading-tight">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                        Vantagens
                      </h4>
                      <div className="grid gap-2">
                        {selectedProduct.advantages.map((a, i) => (
                          <div
                            key={i}
                            className="p-2.5 sm:p-3 bg-white/5 rounded-lg border border-blue-950/50 flex items-center"
                          >
                            <span className="text-[10px] sm:text-xs text-slate-200 font-bold italic uppercase tracking-tight leading-snug">
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
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 xl:gap-5">
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

      {/* Adicionada a classe no-scrollbar para ocultar a barra visualmente */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes swipe-right { 
          0% { transform: translateX(-5px); opacity: 0.6; } 
          50% { transform: translateX(5px); opacity: 1; } 
          100% { transform: translateX(-5px); opacity: 0.6; } 
        }
        .animate-swipe-right { animation: swipe-right 1.5s infinite ease-in-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
      className={`group relative transition-all duration-200 rounded-2xl border-2 border-blue-950 w-full p-4 xl:p-6 z-20 overflow-hidden ${
        active
          ? "bg-slate-950 translate-y-[2px] translate-x-[1px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]"
          : "bg-white text-slate-500 shadow-[2px_3px_0_#172554] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_2px_0_#172554]"
      }`}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
      )}

      <div
        className={`relative z-10 flex flex-col ${side === "right" ? "items-end text-right" : "items-start text-left"}`}
      >
        <span
          className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 ${active ? "text-cyan-400" : "text-blue-900 group-hover:text-blue-950"}`}
        >
          MÓDULO {product.id.split("-")[1] || "QC"}
        </span>
        <span
          className={`text-sm sm:text-base xl:text-lg font-black uppercase italic ${active ? "text-white" : "text-slate-950"}`}
        >
          {product.name}
        </span>
      </div>
    </button>

    {active && (
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-cyan-500 shadow-[0_0_10px_cyan] z-10 w-6 xl:w-12 ${side === "left" ? "left-[95%]" : "right-[95%]"}`}
      />
    )}
  </div>
);
