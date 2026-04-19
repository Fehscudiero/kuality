import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// TRAVA DE SEGURANÇA PARA O DEPLOY
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- COMPONENTE DE GEOMETRIA (Autônomo para Produção) ---
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

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Excelência Química",
      desc: "Desenvolvemos soluções personalizadas com rigor técnico e as melhores matérias-primas do mercado.",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    },
    {
      title: "Sustentabilidade",
      desc: "Processos focados na redução do impacto ambiental e eficiência no uso de recursos industriais.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-24 lg:py-36 bg-white relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              Inovação que <span className="text-cyan-700">transforma</span> a
              indústria.
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                A Kuality Química combina décadas de expertise técnica com uma
                visão moderna de sustentabilidade para entregar produtos que
                superam as expectativas de performance.
              </p>
              <p>
                Nossa infraestrutura conta com laboratórios de ponta para
                controle de qualidade e desenvolvimento, garantindo conformidade
                com as normas mais exigentes do setor.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-4xl font-bold text-cyan-600 mb-2">35+</div>
              <div className="text-slate-800 font-bold uppercase tracking-wider text-xs">
                Anos de Experiência
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-4xl font-bold text-cyan-600 mb-2">100%</div>
              <div className="text-slate-800 font-bold uppercase tracking-wider text-xs">
                Nacional
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-500">
                  <svg
                    className="w-7 h-7 text-cyan-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px]" />
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar sua produção?
          </h3>
          <button
            onClick={() => {
              const el = document.getElementById("contato");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-all shadow-lg hover:-translate-y-1"
          >
            Solicitar Orçamento
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
