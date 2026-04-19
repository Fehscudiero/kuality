import { useState, useRef } from "react";
import { products, type Product } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ChevronRight,
  FlaskConical,
  CheckCircle2,
  Zap,
  Beaker,
  ShieldCheck,
  MoveHorizontal,
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
          clipPath: "polygon(40% 0, 100% 0, 100% 100%, 70% 100%)",
          transform: "rotate(2deg)",
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

    gsap.to(contentRef.current, {
      autoAlpha: 0,
      x: -20 * direction,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(nextIndex);
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, x: 20 * direction },
          { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" },
        );
      },
    });
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
        <header className="mb-16 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-cyan-700 mb-4">
              <Beaker className="w-6 h-6 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Industrial Tech Solutions
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85]">
              Nossas <br className="hidden md:block" />{" "}
              <span className="text-cyan-600">Soluções.</span>
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10 items-center">
          {/* Navegação Desktop Esquerda */}
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

          {/* Console Central Full Screen Mobile / Fixed Desktop */}
          <div className="lg:col-span-6 -mx-6 md:mx-0">
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="bg-slate-950 md:rounded-[4rem] text-white relative shadow-2xl border-y md:border border-white/5 min-h-[680px] md:min-h-[600px] flex flex-col overflow-hidden"
            >
              {/* Indicador Mobile */}
              <div className="lg:hidden absolute top-0 left-0 right-0 p-6 z-20">
                <div className="flex gap-1.5 mb-6">
                  {products.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${currentIndex === idx ? "bg-cyan-500" : "bg-white/10"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <span className="text-[8px] font-black uppercase tracking-widest">
                    Controle Deslizante
                  </span>
                  <MoveHorizontal className="w-4 h-4 animate-bounce" />
                </div>
              </div>

              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

              <div
                ref={contentRef}
                className="relative z-10 p-8 pt-24 md:p-16 w-full flex-1 flex flex-col justify-center"
              >
                <header className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6">
                    <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-base md:text-xl text-slate-400 leading-relaxed font-medium italic border-l-4 border-cyan-600 pl-6">
                    {selectedProduct.description}
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/10">
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-500 flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-current" /> Especificações
                    </h4>
                    <ul className="space-y-4">
                      {selectedProduct.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                          <span className="text-sm md:text-base text-slate-300 font-bold uppercase italic leading-tight">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Vantagens
                    </h4>
                    <div className="grid gap-3">
                      {selectedProduct.advantages.map((a, i) => (
                        <div
                          key={i}
                          className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-emerald-500/50 transition-colors"
                        >
                          <span className="text-xs md:text-sm text-slate-200 font-bold italic uppercase tracking-tight leading-tight">
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

          {/* Navegação Desktop Direita */}
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </section>
  );
}

// Sub-componente de Botão Otimizado com Indicador de Conexão
const NavButton = ({ product, active, onClick, side }: any) => (
  <div className="relative flex items-center">
    <button
      onClick={onClick}
      className={`group relative transition-all duration-500 rounded-2xl border-2 w-full p-6 z-20 ${
        active
          ? "bg-slate-900 border-cyan-500 shadow-2xl scale-[1.05]"
          : "bg-cyan-50/50 border-cyan-100 text-slate-500 hover:border-cyan-200 hover:bg-white"
      }`}
    >
      <div
        className={`flex flex-col ${side === "right" ? "items-end text-right" : "items-start text-left"}`}
      >
        <span
          className={`text-[8px] font-black uppercase tracking-widest mb-1 ${active ? "text-cyan-400" : "text-cyan-600"}`}
        >
          SÉRIE: {product.id.split("-")[1] || "QC"}
        </span>
        <span
          className={`text-sm font-black uppercase italic ${active ? "text-white" : "text-slate-950"}`}
        >
          {product.name}
        </span>
      </div>
    </button>

    {/* Linha de Conexão que indica que está ligado às informações */}
    {active && (
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] z-10 transition-all duration-500 animate-in fade-in zoom-in ${
          side === "left" ? "left-full w-10" : "right-full w-10"
        }`}
      />
    )}
  </div>
);
