import { useEffect, useRef } from "react";
import { socialProof } from "../data/content";
import { gsap } from "gsap";

const partnerLogos: Record<string, string> = {
  FIDELFERRO: "/assets/fidelferro.webp",
  "JOHN DEERE": "/assets/john.webp",
  "NAKATA AUTOMOTIVA": "/assets/Nacata.webp",
  "MEGA LIGHT": "/assets/mega.webp",
  COLOMBO: "/assets/Colombo.webp",
  JUMIL: "/assets/jumil.webp",
  IVECO: "/assets/iveco.webp",
  WHEATON: "/assets/wheaton.webp",
  GM: "/assets/gm.webp",
  VOLVO: "/assets/volvo.webp",
  KANJIKO: "/assets/kanjico.webp",
};

export default function SocialProof() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !containerRef.current) return;

    const marquee = marqueeRef.current;

    const ctx = gsap.context(() => {
      const setupMarquee = () => {
        const totalWidth = marquee.scrollWidth;
        const singleSetWidth = totalWidth / 3;

        gsap.killTweensOf(marquee);
        gsap.set(marquee, { x: 0 });

        // Velocidade ajustada para FLUIDEZ. Mais tempo = movimento mais suave.
        const isMobile = window.innerWidth < 768;
        const duration = isMobile ? 10 : 25;

        gsap.to(marquee, {
          x: -singleSetWidth,
          duration: duration,
          ease: "none",
          repeat: -1,
          onRepeat: () => {
            gsap.set(marquee, { x: 0 });
          },
        });
      };

      if (document.readyState === "complete") {
        setupMarquee();
      } else {
        window.addEventListener("load", setupMarquee);
      }

      window.addEventListener("resize", setupMarquee);
    });

    return () => {
      ctx.revert();
      window.removeEventListener("load", () => {});
      window.removeEventListener("resize", () => {});
    };
  }, []);

  const infiniteBrands = [
    ...socialProof.brands,
    ...socialProof.brands,
    ...socialProof.brands,
  ];

  return (
    <section className="bg-white overflow-hidden w-full border-b border-slate-100">
      {/* Título com espaçamento leve para não grudar no componente de cima */}
      <div className="text-center pt-6 pb-4">
        <p className="text-[10px] md:text-sm uppercase tracking-[0.4em] text-slate-700 font-black">
          Empresas que confiam na Kuality
        </p>
      </div>

      {/* Container de Ponta a Ponta (w-full) SEM paddings laterais */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] mb-6"
      >
        <div
          ref={marqueeRef}
          className="flex items-center gap-16 md:gap-32 whitespace-nowrap will-change-transform"
        >
          {infiniteBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex-shrink-0 flex items-center justify-center transition-transform duration-500 cursor-pointer hover:scale-110"
            >
              <img
                src={partnerLogos[brand] || "/assets/placeholder.webp"}
                alt={`Parceiro Kuality - ${brand}`}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
