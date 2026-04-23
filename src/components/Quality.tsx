import { useRef } from "react";
import { qualityTestsList, qualityContent } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  FlaskConical,
  Microscope,
  FileText,
  CheckCircle2,
  Award,
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
        { x: "-120%", opacity: 0 },
        {
          x: "-10%",
          opacity: 1,
          duration: 1.5,
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
        className="absolute top-[-10%] left-0 w-[150%] h-[150%] bg-cyan-50 shadow-2xl"
        style={{
          clipPath: "polygon(0 0, 70% 0, 30% 100%, 0% 100%)",
          transform: "rotate(-3deg)",
          zIndex: 50,
        }}
      />
    </div>
  );
}

export default function Quality() {
  const sectionRef = useRef<HTMLElement>(null);
  const safeTests = qualityTestsList || [];

  useGSAP(
    () => {
      gsap.from(".quality-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".quality-grid",
          start: "top 90%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="qualidade"
      className="py-12 md:py-24 bg-white relative overflow-hidden"
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-10 md:mb-20 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-600 mb-3">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Garantia de Performance
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
            Controle de <br className="hidden md:block" />
            <span className="text-cyan-600">Qualidade Superior.</span>
          </h2>
        </header>

        <div className="quality-grid grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
          {/* PROCESSO: Stack Vertical no Mobile */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            <div className="quality-card bg-slate-950 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <FlaskConical className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">
                    Engenharia Aplicada
                  </span>
                </div>

                <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter mb-4 leading-tight">
                  Nosso Processo <br className="hidden md:block" /> de Validação
                </h3>

                <div className="space-y-4 md:space-y-6">
                  <p className="text-slate-400 text-xs md:text-base leading-relaxed font-medium">
                    {qualityContent?.process}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 border-l-4 border-l-cyan-500">
                    <p className="text-[9px] font-black uppercase tracking-widest text-cyan-500 mb-1">
                      Resultado Final
                    </p>
                    <p className="text-[11px] md:text-sm text-slate-200 font-bold leading-snug">
                      {qualityContent?.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Compacto no Mobile */}
            <div className="quality-card flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase italic">
                  Conformidade ANVISA
                </h4>
                <p className="text-[9px] text-slate-500 font-medium">
                  Padrões regulatórios rígidos.
                </p>
              </div>
            </div>
          </div>

          {/* LISTA DE TESTES: Grid 1 Coluna Mobile, 2 Colunas Desktop */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <div className="quality-card bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="w-5 h-5 text-cyan-600" />
                <h3 className="text-base md:text-xl font-black text-slate-900 uppercase italic tracking-tighter">
                  Protocolos de Laboratório
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {safeTests.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-slate-50 hover:bg-cyan-50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] md:text-xs font-black text-slate-950 uppercase tracking-wide">
                        {test.nome}
                      </p>
                      <p className="text-[10px] md:text-xs text-slate-500 font-medium mt-0.5 leading-tight">
                        {test.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quality-card bg-slate-900 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-slate-800 transition-all shadow-md">
              <div className="flex flex-col">
                <span className="text-white font-black uppercase italic text-xs md:text-base tracking-tighter">
                  Laudo Técnico Oficial
                </span>
                <span className="text-cyan-500/70 font-bold text-[8px] md:text-[9px] uppercase tracking-[0.2em] mt-0.5">
                  Garantia de Procedência
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
