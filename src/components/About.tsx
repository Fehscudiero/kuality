import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Award,
  ShieldCheck,
  ArrowRight,
  Trophy,
  Microscope,
  BadgeCheck,
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
          zIndex: 50,
        }}
      />
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Know-how de 35+ anos",
      desc: "Experiência consolidada no segmento químico industrial.",
      icon: Trophy,
    },
    {
      title: "Laboratórios próprios",
      desc: "Pesquisa avançada e desenvolvimento técnico rigoroso.",
      icon: Microscope,
    },
    {
      title: "Produtos controlados",
      desc: "Garantia total de conformidade e segurança química.",
      icon: BadgeCheck,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative py-20 md:py-32 lg:py-12 bg-white overflow-hidden border-t border-slate-100"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      {/* Estilos para animação dos ícones */}
      <style>{`
        @keyframes float-smooth {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-float-smooth {
          animation: float-smooth 4s ease-in-out infinite;
        }
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .animate-icon-pulse {
          animation: icon-pulse 3s infinite ease-in-out;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-[#450a0a] mb-4">
              <Award className="w-5 h-5 animate-icon-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                História e Compromisso
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.9]">
              Sobre a <br /> <span className="text-cyan-600">Kuality.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-[#450a0a] shadow-lg self-center md:self-end group hover:border-[#cc0000] transition-colors duration-500">
            <div className="bg-[#450a0a]/5 p-2 rounded-lg group-hover:bg-[#cc0000]/5 transition-colors">
              <ShieldCheck className="w-8 h-8 text-[#450a0a] group-hover:text-[#cc0000] transition-colors" />
            </div>
            <p className="text-[#cc0000] font-black italic text-[11px] max-w-[150px] leading-tight uppercase">
              Excelência Química há 35 anos.
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto mb-20 ">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-slate-100 text-slate-600 text-lg md:text-xl leading-relaxed text-justify font-medium">
            <p className="mb-6">
              A Kuality é especialista no desenvolvimento de{" "}
              <span className="text-slate-950 font-bold">
                soluções químicas
              </span>{" "}
              de{" "}
              <span className="text-slate-950 font-bold">alta performance</span>{" "}
              para indústrias de todos os portes. Com uma trajetória consolidada
              de <span className="text-slate-950 font-bold">35 anos</span>,
              nossa missão é entregar{" "}
              <span className="text-slate-950 font-bold">
                eficiência operacional
              </span>{" "}
              e qualidade técnica superior em cada formulação.
            </p>

            <p className="mb-6">
              Nossos{" "}
              <span className="text-slate-950 font-bold">
                laboratórios próprios
              </span>{" "}
              contam com tecnologia de ponta e especialistas dedicados ao
              processamento de{" "}
              <span className="text-slate-950 font-bold">
                matéria-prima certificada
              </span>
              . Operamos sob os mais rígidos controles de qualidade, garantindo
              total{" "}
              <span className="text-slate-950 font-bold">
                conformidade regulatória
              </span>{" "}
              e aprovação técnica da{" "}
              <span className="text-cyan-600 font-bold">ANVISA</span>.
            </p>

            <p>
              Focada em inovação e{" "}
              <span className="text-slate-950 font-bold">
                exclusividade no atendimento
              </span>
              , a Kuality otimiza processos desde a consultoria inicial até a{" "}
              <span className="text-slate-950 font-bold">
                logística inteligente
              </span>
              , assegurando prazos ágeis, preços competitivos e uma parceria
              estratégica duradoura.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-8 shadow-md border border-blue-900/10 hover:border-blue-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden relative"
            >
              <div className="flex items-center justify-centerflex-col gap-6 relative z-10">
                {/* Icon Container Otimizado (Molecular Pulse) */}
                <div className="relative w-16 h-16 animate-float-smooth">
                  <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl group-hover:bg-blue-900 transition-colors duration-500">
                    <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] group-hover:bg-cyan-500/20 transition-all duration-1000" />
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-10 tracking-tight leading-tight relative z-10">
            Pronto para transformar sua <br />
            <span className="text-cyan-500 italic">produção industrial?</span>
          </h3>
          <a
            href="#contato"
            className="relative z-10 inline-flex items-center gap-4 px-12 py-5 bg-cyan-600 text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-xl hover:bg-cyan-500 transition-all shadow-lg hover:-translate-y-1 hover:shadow-cyan-500/20 active:scale-95"
          >
            Solicitar Orçamento
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
