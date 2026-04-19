import { useRef } from "react";
import { qualityTests } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTE DE GEOMETRIA (Estrutura idêntica ao que funcionou, apenas cor Azul) ---
function SectionGeometry({
  triggerRef,
}: {
  triggerRef: React.RefObject<HTMLElement>;
}) {
  const shapeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current || !shapeRef.current) return;
      ScrollTrigger.refresh();

      gsap.fromTo(
        shapeRef.current,
        { x: "-120%", opacity: 0 },
        {
          x: "-10%",
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(shapeRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: triggerRef },
  );

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <div
        ref={shapeRef}
        className="absolute top-[-10%] left-0 w-[150%] h-[150%] bg-cyan-200 shadow-2xl"
        style={{
          clipPath: "polygon(0 0, 70% 0, 30% 100%, 0% 100%)",
          transform: "rotate(-3deg)",
          zIndex: 50, // O Z-index que salvou a pátria
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
      className="relative py-12 md:py-20 lg:py-24 bg-white overflow-hidden border-t border-slate-200"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry triggerRef={sectionRef} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            Qualidade <span className="text-cyan-600">Kuality</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg lg:text-xl mt-2 md:mt-3">
            Padrões rigorosos para garantir excelência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-16 md:w-18 h-16 md:h-18 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-xl flex-shrink-0">
                <svg
                  className="w-8 md:w-9 h-8 md:h-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                  {qualityTests.testName}
                </h3>
                <p className="text-xs md:text-sm lg:text-base font-bold text-cyan-600 uppercase tracking-wider">
                  {qualityTests.testNorm}
                </p>
              </div>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed">
              {qualityTests.testDetails}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-16 md:w-18 h-16 md:h-18 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-xl flex-shrink-0">
                <svg
                  className="w-8 md:w-9 h-8 md:h-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                  Resultado
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs md:text-sm font-bold bg-green-100 text-green-700">
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
                <span className="font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
