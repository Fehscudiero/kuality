import { useEffect, useRef } from "react";
import { socialProof } from "../data/content";
import { gsap } from "gsap";

// Mapeamento dos ficheiros na sua pasta public/assets
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

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 3;

    // Lógica de velocidade: menor duração = mais rápido
    // Mobile (< 768px): 15s | Desktop: 25s
    const isMobile = window.innerWidth < 768;
    const customDuration = isMobile ? 5 : 15;

    // Animação GSAP
    const animation = gsap.to(marquee, {
      x: `-${totalWidth}px`,
      duration: customDuration,
      ease: "none",
      repeat: -1,
    });

    // UX: Pausar ao passar o rato (apenas em dispositivos com ponteiro)
    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      animation.kill();
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const infiniteBrands = [
    ...socialProof.brands,
    ...socialProof.brands,
    ...socialProof.brands,
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-slate-700 font-black">
            Empresas que confiam na Kuality
          </p>
        </div>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div
            ref={marqueeRef}
            className="flex items-center gap-12 md:gap-20 whitespace-nowrap will-change-transform"
          >
            {infiniteBrands.map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="flex-shrink-0 flex items-center justify-center hover:scale-110 transition-transform duration-500 cursor-pointer"
              >
                <img
                  src={partnerLogos[brand] || "/assets/placeholder.webp"}
                  alt={`Parceiro Kuality - ${brand}`}
                  className="h-9 md:h-14 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
