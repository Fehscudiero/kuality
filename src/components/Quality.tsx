import { useRef } from "react";
import { qualityTests } from "../data/content";
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
        className="absolute top-[-10%] left-0 w-[150%] h-[150%] bg-cyan-100 shadow-2xl"
        style={{
          clipPath: "polygon(0 0, 70% 0, 30% 100%, 0% 100%)",
          transform: "rotate(-3deg)",
          zIndex: 5,
        }}
      />
    </div>
  );
}

export default function Quality() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".quality-card");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  // Valores de fallback baseados na estrutura real dos seus dados
  const processText =
    (qualityTests as any).process ||
    "Nossos processos seguem rigorosos padrões de formulação e testes laboratoriais em cada lote.";
  const resultText =
    (qualityTests as any).result ||
    "Garantimos a máxima pureza, eficácia e segurança para aplicação em escala industrial.";

  return (
    <section
      id="qualidade"
      className="relative py-24 md:py-44 bg-white overflow-hidden border-t border-slate-100"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER PADRONIZADO (Igual ao About e Products) */}
        <header className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-blue-900 mb-4">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Laboratório e Conformidade
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.85]">
              Padrão <br /> <span className="text-cyan-600">Kuality.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border-2 border-[#020B29] shadow-xl self-center md:self-end">
            <Award className="w-8 h-8 text-[#020B29]" />
            <div className="flex flex-col">
              <p className="text-[#0891B2] font-black italic text-[11px] leading-tight uppercase">
                Certificação de Lote
              </p>
              <p className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">
                Controle 100% Nacional
              </p>
            </div>
          </div>
        </header>

        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
        >
          {/* COLUNA ESQUERDA: PROCESSOS REAIS E RESULTADOS (CONTEÚDO DO DATA.TS) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Bloco 1: O Processo (Dark Mode) */}
            <div className="quality-card bg-slate-950 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none" />

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter">
                    Nosso Processo
                  </h3>
                  <span className="text-cyan-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Engenharia Química Aplicada
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium relative z-10">
                {processText}
              </p>
            </div>

            {/* Bloco 2: O Resultado (Light Mode / Trust) */}
            <div className="quality-card bg-white border-2 border-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-lg flex-1 group hover:border-cyan-500 transition-colors duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-slate-950 group-hover:text-cyan-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-slate-950 text-2xl font-black uppercase italic tracking-tighter">
                    O Resultado
                  </h3>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Entrega Homologada
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                {resultText}
              </p>
            </div>
          </div>

          {/* COLUNA DIREITA: BENTO GRID DE CERTIFICAÇÕES REAIS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card Principal de Autoridade */}
            <div className="quality-card bg-white p-10 rounded-[2.5rem] border-2 border-blue-900 shadow-xl relative overflow-hidden flex-1 group">
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <Microscope size={250} className="text-blue-900" />
              </div>

              <div className="relative z-10">
                <h4 className="text-slate-950 font-black uppercase italic tracking-tighter text-3xl mb-10 border-l-4 border-cyan-600 pl-6">
                  Normas & <br />{" "}
                  <span className="text-cyan-600">Conformidades.</span>
                </h4>

                <div className="space-y-4">
                  {[
                    {
                      nome: "Normas da ANVISA",
                      desc: "Aprovação sanitária rigorosa",
                    },
                    {
                      nome: "Padrão ABNT NBR 17088",
                      desc: "Qualidade de produto garantida",
                    },
                    {
                      nome: "Certificação ISO 9001:2015",
                      desc: "Gestão da qualidade verificada",
                    },
                    {
                      nome: "Responsabilidade Ambiental",
                      desc: "Processos eco-sustentáveis",
                    },
                  ].map((cert, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-900 transition-all"
                    >
                      <BadgeCheck className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-slate-950 font-black uppercase italic text-sm tracking-wide">
                          {cert.nome}
                        </span>
                        <span className="text-slate-500 font-medium text-xs mt-1">
                          {cert.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Destaque Técnico Inferior */}
            <div className="quality-card bg-slate-100 p-8 rounded-[2rem] border border-slate-900 flex items-center justify-between group hover:bg-slate-200 transition-colors">
              <div className="flex flex-col">
                <span className="text-slate-950 font-black uppercase italic text-lg tracking-tighter">
                  Laudo Técnico
                </span>
                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">
                  Disponível sob requisição
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                <FileText className="w-5 h-5 text-blue-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
