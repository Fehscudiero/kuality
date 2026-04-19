import { useRef } from "react";
import { qualityTests } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTE DE GEOMETRIA (Autônomo para Produção) ---
function SectionGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Autonomia do container para disparar no deploy
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

      gsap.to(shapeRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <div
        ref={shapeRef}
        className="absolute top-[-10%] left-0 w-[150%] h-[150%] bg-cyan-200 shadow-2xl"
        style={{
          clipPath: "polygon(0 0, 70% 0, 100% 100%, 30% 100%)",
          transform: "rotate(-3deg)",
          zIndex: 50,
        }}
      />
    </div>
  );
}

export default function Quality() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="qualidade"
      className="py-24 lg:py-36 bg-slate-50 relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Chamada limpa do componente */}
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-100 rounded-2xl mb-6">
            <svg
              className="w-8 h-8 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Padrão de Qualidade <span className="text-cyan-700">Kuality</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nossos produtos passam por rigorosos testes laboratoriais para
            garantir máxima eficiência e segurança em sua aplicação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24">
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Processo de Qualidade
              </h3>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed">
              {qualityTests.process}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Resultados
                </h3>
              </div>
              <div className="animate-pulse">
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700">
                  APROVADO
                </span>
              </div>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed">
              {qualityTests.result}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl">
          <p className="text-center text-white font-semibold text-lg mb-8">
            Certificações e Padrões
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "ABNT NBR 17088",
              "ISO 9001:2015",
              "Responsabilidade Ambiental",
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-2.5 text-white/90">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
