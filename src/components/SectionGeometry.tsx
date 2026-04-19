import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SectionGeometryProps {
  variant?: 'about' | 'products' | 'contact' | 'default'
}

export default function SectionGeometry({ variant = 'about' }: SectionGeometryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const masterShapeRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !masterShapeRef.current) return

    // Pequeno delay para o React terminar de montar o layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()

      // 1. Reveal: A lâmina entra deslizando
      gsap.fromTo(masterShapeRef.current, 
        { x: '-110%', opacity: 0 },
        {
          x: '-10%',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 2. Parallax: Movimento contínuo no scroll
      gsap.to([masterShapeRef.current, lineRef.current], {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, 100)

    return () => clearTimeout(timer)
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Lâmina: Usei bg-slate-200 para dar contraste real no fundo claro */}
      <div 
        ref={masterShapeRef}
        className="absolute top-[-10%] left-[-10%] w-[130%] h-[140%] bg-slate-200 border-r border-slate-300 shadow-2xl"
        style={{ 
          clipPath: 'polygon(0 0, 75% 0, 45% 100%, 0% 100%)',
          transform: 'rotate(-1.5deg)' 
        }}
      />

      {/* Linha de Detalhe Ciano */}
      <div 
        ref={lineRef}
        className="absolute top-0 left-[62%] w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
      />
    </div>
  )
}