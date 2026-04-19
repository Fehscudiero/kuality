import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registro global seguro
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterShapeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Se não houver refs, abortamos para não dar erro de runtime
      if (!containerRef.current || !masterShapeRef.current || !lineRef.current)
        return;

      // 1. LIMPEZA DE CACHE DO GSAP
      // Garante que nenhuma instância anterior atrapalhe a nova
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });

      // 2. SETUP DOS ESTADOS INICIAIS (FORÇADO)
      gsap.set(masterShapeRef.current, {
        xPercent: -120, // Começa totalmente fora à esquerda
        opacity: 0,
        rotate: -2,
      });

      // 3. ANIMAÇÃO DE ENTRADA (O SLIDE DA LÂMINA)
      gsap.to(masterShapeRef.current, {
        xPercent: -10,
        opacity: 1,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current, // Gatilho é o próprio container
          start: "top 95%", // Ativa quase assim que aparece no rodapé
          toggleActions: "play none none reverse",
          // markers: true, // DESCOMENTE ESTA LINHA PARA DEBUGAR VISUALMENTE O START/END
        },
      });

      // 4. PARALLAX DE MOVIMENTO (FLUIDEZ NO SCROLL)
      gsap.to(masterShapeRef.current, {
        y: -150, // Move para cima conforme desce o scroll
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Sincronia total com o mouse/dedo
        },
      });

      gsap.to(lineRef.current, {
        y: -250,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 5. O PULO DO GATO: REFRESH APÓS RENDER
      // Pequeno timeout para garantir que o DOM renderizou as alturas finais
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(refreshTimer);
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      // h-full é vital aqui para o ScrollTrigger saber o tamanho da área
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full min-h-[500px]"
      aria-hidden="true"
    >
      {/* A Lâmina Geométrica */}
      <div
        ref={masterShapeRef}
        className="absolute top-[-15%] left-0 w-[140%] h-[150%] bg-slate-200/50 border-r border-white/10 shadow-[25px_0_60px_rgba(0,0,0,0.15)] will-change-transform"
        style={{
          clipPath: "polygon(0 0, 78% 0, 38% 100%, 0% 100%)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Linha de Detalhe Reativa */}
      <div
        ref={lineRef}
        className="absolute top-0 left-[62%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent will-change-transform"
      />
    </div>
  );
}
