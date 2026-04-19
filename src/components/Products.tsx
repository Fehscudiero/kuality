import { useState, useRef } from "react";
import { products, type Product } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registro do Plugin
gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTE DE GEOMETRIA ---
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
        { x: "120%", opacity: 0 },
        {
          x: "10%",
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
        className="absolute top-[-10%] right-0 w-[150%] h-[150%] bg-cyan-200 shadow-2xl"
        style={{
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 70% 100%)",
          transform: "rotate(3deg)",
          zIndex: 50,
        }}
      />
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="produtos"
      className="relative py-12 md:py-20 lg:py-24 bg-white overflow-hidden border-t border-slate-200"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry triggerRef={sectionRef} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            Nossos <span className="text-cyan-700">Produtos</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg lg:text-xl mt-2 md:mt-3">
            Clique em um produto para ver os detalhes completos
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 lg:mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                activeCategory === category
                  ? "bg-cyan-700 text-white shadow-lg shadow-cyan-900/20"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-md"
              }`}
            >
              {category === "all" ? "Todos" : category}
            </button>
          ))}
        </div>

        {/* items-start impede que os cards vizinhos estiquem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 items-start">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      // duration-500 e ease-in-out deixam o movimento suave e sem trancos
      className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 transition-all duration-500 ease-in-out cursor-pointer ${
        isExpanded
          ? "border-cyan-500 shadow-2xl ring-4 ring-cyan-500/10"
          : "border-slate-100 hover:border-cyan-300 hover:shadow-xl hover:-translate-y-1"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-5 md:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/20 group-hover:scale-110 transition-transform duration-500 ease-in-out">
              <svg
                className="w-6 md:w-7 h-6 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/50 px-2 py-0.5 rounded transition-colors duration-500">
                {product.category}
              </span>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mt-1 transition-colors duration-500">
                {product.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            aria-label={
              isExpanded
                ? `Recolher detalhes de ${product.name}`
                : `Expandir detalhes de ${product.name}`
            }
            title={isExpanded ? "Recolher" : "Expandir"}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out flex-shrink-0 ${
              isExpanded
                ? "bg-cyan-700 rotate-180 text-white shadow-lg"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <svg
              className="w-4 md:w-5 h-4 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm md:text-base lg:text-lg text-slate-700 leading-relaxed mb-4 md:mb-5">
          {product.description}
        </p>

        {/* Animação do grid sincronizada */}
        <div
          className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-4 md:pt-5 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                <div className="bg-cyan-50/50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6">
                  <h4 className="text-sm md:text-base font-bold text-cyan-800 mb-3 md:mb-4 flex items-center gap-2">
                    Características
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs md:text-sm text-slate-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-cyan-600 mt-1.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50/50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6">
                  <h4 className="text-sm md:text-base font-bold text-green-800 mb-3 md:mb-4 flex items-center gap-2">
                    Vantagens
                  </h4>
                  <ul className="space-y-2">
                    {product.advantages.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs md:text-sm text-slate-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
