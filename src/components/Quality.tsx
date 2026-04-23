import { useRef } from "react";
import { qualityTestsList, qualityContent } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  FlaskConical,
  BadgeCheck,
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

  useGSAP(
    () => {
      gsap.from(".quality-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".quality-grid",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="qualidade"
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-12 md:mb-20">
          <div className="flex items-center gap-3 text-cyan-600 mb-4">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
              Garantia de Performance
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9]">
            Controle de <br />{" "}
            <span className="text-cyan-600">Qualidade Superior.</span>
          </h2>
        </header>

        <div className="quality-grid grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="quality-card bg-slate-950 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <FlaskConical className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    Engenharia Aplicada
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                  Nosso Processo <br /> de Validação
                </h3>

                <div className="space-y-6">
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                    {qualityContent.process}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 border-l-4 border-l-cyan-500">
                    <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">
                      Resultado Final
                    </p>
                    <p className="text-xs md:text-sm text-slate-200 font-bold leading-snug">
                      {qualityContent.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="quality-card flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase italic">
                  Conformidade ANVISA
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  Operação sob rígidos padrões regulatórios.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="quality-card bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-10 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <Microscope className="w-6 h-6 text-cyan-600" />
                <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase italic tracking-tighter">
                  Protocolos de Laboratório
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* MUDANÇA: Agora mapeia o array qualityTestsList */}
                {(qualityTestsList || []).map((test, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-cyan-50 transition-colors group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-black text-slate-950 uppercase tracking-wide">
                        {test.nome}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">
                        {test.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quality-card bg-slate-900 p-6 md:p-8 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-slate-800 transition-all shadow-lg">
              <div className="flex flex-col">
                <span className="text-white font-black uppercase italic text-sm md:text-base tracking-tighter">
                  Laudo Técnico Oficial
                </span>
                <span className="text-cyan-500/70 font-bold text-[9px] uppercase tracking-[0.2em] mt-1">
                  Garantia de Procedência
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-cyan-600 transition-all">
                <FileText className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
