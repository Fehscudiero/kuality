import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --- 1. Contador Sincronizado (Performance de Elite) ---
function AnimatedCounter({ end, suffix = '', delay = 0 }: { end: number, suffix?: string, delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const countRef = useRef({ value: 0 })
  useGSAP(() => {
    gsap.to(countRef.current, {
      value: end,
      duration: 3,
      delay,
      ease: "expo.out",
      onUpdate: () => setDisplayValue(Math.floor(countRef.current.value))
    })
  }, [end, delay])
  return <span className="tabular-nums tracking-tighter">{displayValue}{suffix}</span>
}

// --- 2. Particle Canvas: "Fluido Molecular" ---
const ParticleCanvas = ({ scrollProgress }: { scrollProgress: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<any[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        alpha: Math.random() * 0.5 + 0.1
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // O scroll progress afeta a velocidade e o rastro das partículas
      const scrollBoost = 1 + scrollProgress * 5 
      
      particles.current.forEach(p => {
        p.x += p.speedX * scrollBoost
        p.y += p.speedY * scrollBoost
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      requestAnimationFrame(animate)
    }

    window.addEventListener('resize', init)
    init(); animate()
    return () => window.removeEventListener('resize', init)
  }, [scrollProgress])

  return <canvas ref={canvasRef} className="absolute inset-0 z-[3] pointer-events-none mix-blend-screen" />
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useGSAP(() => {
    // 1. Revelação Surreal (Entrada)
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
    tl.from(".hero-reveal", { 
      y: 60, opacity: 0, filter: "blur(15px)", duration: 2, stagger: 0.15 
    })

    // 2. REAÇÃO QUÍMICA VIA SCROLL (O "Foda")
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
        // Muda a cor e a densidade do fundo conforme o scroll
        gsap.to(sectionRef.current, {
          backgroundColor: self.progress > 0.5 ? "#06080a" : "#0a0d12",
          duration: 0.5
        })
      }
    })

    // Parallax das camadas de "Gás"
    gsap.to(".chem-cloud", {
      y: (i) => (i + 1) * -150,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        scrub: 1
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0d12] transition-colors duration-700">
      
      {/* BACKGROUND SURREAL: Nuvens de Reação Química */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Camada 1: Ciano Ativo */}
        <div className="chem-cloud absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(0,240,255,0.08)_0%,transparent_70%)] blur-[120px] will-change-transform" />
        
        {/* Camada 2: Azul Cobalto (Profundidade) */}
        <div className="chem-cloud absolute top-[20%] -right-[15%] w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] blur-[100px] will-change-transform" />
        
        {/* Camada 3: Luz de Fundo (Simula reação) */}
        <div 
          className="absolute inset-0 opacity-20 transition-opacity duration-1000"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, rgba(0,240,255,${0.05 + scrollProgress * 0.1}), transparent 80%)`
          }} 
        />
      </div>

      <ParticleCanvas scrollProgress={scrollProgress} />

      {/* Camada de Textura (Noise) */}
      <div className="absolute inset-0 z-[4] opacity-[0.025] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* CONTEÚDO PRINCIPAL */}
      <div ref={contentRef} className="relative z-[10] flex flex-col items-center px-6 max-w-5xl w-full text-center">
        
        {/* Badge Futurista */}
        <div className="hero-reveal mb-8 inline-flex items-center gap-3 px-4 py-1.5 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-xl">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 shadow-[0_0_10px_#00F0FF]"></span>
          </div>
          <span className="text-white/40 text-[9px] font-bold tracking-[0.5em] uppercase font-mono italic">Kuality Molecular Lab v4.0</span>
        </div>

        {/* Headline de Alto Impacto */}
        <h1 className="hero-reveal text-[36px] leading-[0.92] sm:text-6xl md:text-[85px] lg:text-[100px] font-black text-white tracking-[-0.05em] uppercase">
          Quem entende,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-white to-blue-600 drop-shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            busca Kuality.
          </span>
        </h1>

        {/* Frase Blindada e Persuasiva */}
        <p className="hero-reveal mt-8 text-[14px] sm:text-lg text-slate-400/80 max-w-xl font-medium leading-relaxed tracking-tight px-4 border-r border-cyan-500/20 md:border-none">
          especializada no desenvolvimento de soluções químicas para indústrias de diversos portes
        </p>

        {/* Ações Minimalistas */}
        <div className="hero-reveal mt-12 flex flex-col sm:flex-row gap-5">
          <button aria-label="Explorar soluções químicas" className="px-12 py-4 bg-cyan-600 text-white text-[10px] font-black rounded-xl shadow-[0_20px_40px_-10px_rgba(0,175,255,0.4)] hover:-translate-y-1 transition-all active:scale-95 tracking-[0.25em]">
            EXPLORAR SOLUÇÕES
          </button>
          <button aria-label="Solicitar consultoria técnica" className="px-12 py-4 border border-white/5 text-white/60 text-[10px] font-bold rounded-xl hover:bg-white/[0.03] transition-all backdrop-blur-md tracking-[0.25em]">
            CONSULTORIA TÉCNICA
          </button>
        </div>

        {/* Stats de Alta Performance (Sincronizados) */}
        <div className="hero-reveal mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/5 pt-12 w-full max-w-4xl">
          {[
            { n: 35, s: '+', l: 'ANOS DE KNOW-HOW', d: 1.8 },
            { n: 100, s: '%', l: 'PUREZA GARANTIDA', d: 2.0 },
            { n: 9, s: '+', l: 'LINHAS ATIVAS', d: 2.2 }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center group cursor-default">
              <div className="text-3xl md:text-5xl font-black text-white tracking-tighter group-hover:text-cyan-400 transition-colors duration-500">
                <AnimatedCounter end={s.n} suffix={s.s} delay={s.d} />
              </div>
              <div className="text-[8px] md:text-[9px] mt-2 tracking-[0.4em] text-cyan-500/30 font-black uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL INDICATOR: O Fio de Luz Minimalista */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group z-[20]">
        <div className="relative w-[1px] h-16 bg-white/5 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent -translate-y-full animate-[scroll-light_3s_ease-in-out_infinite]" />
        </div>
        <div className="mt-4 opacity-10 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-y-1">
          <svg className="w-4 h-4 text-cyan-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes scroll-light {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>

    </section>
  )
}