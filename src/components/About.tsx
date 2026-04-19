import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registro obrigatório do Plugin
gsap.registerPlugin(ScrollTrigger)

// --- COMPONENTE DE GEOMETRIA (O "Corte" da tela) ---
function SectionGeometry({ triggerRef }: { triggerRef: React.RefObject<HTMLElement> }) {
  const shapeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!triggerRef.current || !shapeRef.current) return

    // Forçamos o GSAP a ler o estado real da página
    ScrollTrigger.refresh()

    // 1. Reveal: A lâmina entra rasgando
    gsap.fromTo(shapeRef.current, 
      { x: '-120%', opacity: 0 },
      {
        x: '-10%',
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // 2. Parallax: A lâmina sobe devagar enquanto o usuário desce
    gsap.to(shapeRef.current, {
      y: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, { scope: triggerRef })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
      {/* MANTIVE O Z-INDEX 50 E A ESTRUTURA DO QUE FUNCIONOU.
          Troquei bg-red-500 por bg-cyan-200 (Azul Claro visível).
      */}
      <div 
        ref={shapeRef}
        className="absolute top-[-10%] left-0 w-[150%] h-[150%] bg-cyan-200 shadow-2xl"
        style={{ 
          clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0% 100%)',
          transform: 'rotate(-3deg)',
          zIndex: 50
        }}
      />
    </div>
  )
}

// --- SEU COMPONENTE ABOUT ORIGINAL COMPLETO ---
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const features = [
    { title: 'Know-how de 35+ anos', desc: 'Experiência consolidada no segmento químico industrial', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Laboratórios Próprios', desc: 'Técnicos capacitados desenvolvem produtos com matéria-prima selecionada', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { title: 'Produtos Controlados', desc: 'Atendemos padrões da ANVISA e órgãos fiscalizadores', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: 'Logística Eficiente', desc: 'Entregas rápidas com prazos e preços competitivos', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Atendimento Personalizado', desc: 'Relação exclusiva com cada cliente desde o primeiro contato', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.982-.023-1.965-.07-2.944M7 20H1v-2a3 3 0 015.356-1.857M7 20v-2c0-.982.023-1.965.07-2.944' },
    { title: 'Qualidade Garantida', desc: 'Produtos de alta performance com máxima eficiência', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
  ]

  return (
    <section 
      ref={sectionRef} 
      id="sobre" 
      className="relative py-24 bg-white overflow-hidden border-t border-slate-200"
      style={{ isolation: 'isolate' }} // Cria um novo stacking context
    >
      
      {/* 1. Geometria de fundo */}
      <SectionGeometry triggerRef={sectionRef} />

      {/* 2. Conteúdo em Z-10 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Sobre a <span className="text-cyan-600">Kuality</span>
          </h2>
          <div className="w-24 h-1.5 bg-cyan-500 rounded-full mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white">
            <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed text-center sm:text-justify font-medium">
              <p>
                A Kuality fabrica produtos químicos para indústrias de pequeno, médio e grande porte. 
                Com know-how de mais de <span className="text-slate-900 font-bold">35 anos</span> no segmento, a Kuality se preocupa em oferecer produtos 
                de qualidade com a máxima eficiência.
              </p>
              <p>
                Técnicos e profissionais capacitados desenvolvem em nossos laboratórios, produtos com 
                matéria-prima selecionada, seguindo todas as normas e procedimentos padrões adotados 
                pelos órgãos fiscalizadores da área. Atendemos produtos controlados pela <span className="text-cyan-600 font-semibold">ANVISA</span>.
              </p>
              <p>
                A Kuality tem por objetivo melhorar a cada dia, construindo assim uma relação exclusiva 
                com nossos clientes, desde o atendimento, como também logística de entrega, prazos e preços.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div key={i} className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-500 hover:-translate-y-2">
              <div className="flex flex-col gap-6">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-500">
                  <svg className="w-7 h-7 text-cyan-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px]" />
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">Pronto para transformar sua produção?</h3>
          <a href="#contato" className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-all shadow-lg hover:-translate-y-1">
            Solicitar Orçamento
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}