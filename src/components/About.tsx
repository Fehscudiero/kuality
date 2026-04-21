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
      title: "Laboratórios Próprios",
      desc: "Pesquisa avançada e desenvolvimento técnico rigoroso.",
      icon: Microscope,
    },
    {
      title: "Produtos Controlados",
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-[#020B29] mb-4">
              {" "}
              <Award className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                História e Compromisso
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[slate-950] tracking-tighter uppercase italic leading-[0.9]">
              Sobre a <br /> <span className="text-cyan-600">Kuality.</span>
            </h2>
          </div>

          {/* Badge 1: Excelência Química com Borda Azul Escuro */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-[#020B29] shadow-lg self-center md:self-end">
            <ShieldCheck className="w-8 h-8 text-[#020B29]" />
            <p className="text-[#0891B2] font-black italic text-[11px] max-w-[150px] leading-tight uppercase">
              Excelência Química há 35 anos.
            </p>
          </div>
        </header>

        {/* Texto Institucional com Destaques Estratégicos */}
        <div className="max-w-4xl mx-auto mb-20">
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

        {/* Cards de Features com Borda Azul */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-8 shadow-md border border-blue-900/20 hover:border-blue-900 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col gap-6">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-900 transition-all">
                  <feature.icon className="w-7 h-7 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px]" />
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-8">
            Pronto para transformar sua produção?
          </h3>
          <a
            href="#contato"
            className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-all shadow-lg hover:-translate-y-1"
          >
            Solicitar Orçamento
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
