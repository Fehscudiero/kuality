import { useEffect, useState, useRef } from 'react'
import { socialProof } from '../data/content'

export default function SocialProof() {
  const [isMobile, setIsMobile] = useState(true)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || !marqueeRef.current) return

    let animationId: number
    const container = marqueeRef.current

    const animate = () => {
      container.scrollLeft += 0.5
      if (container.scrollLeft >= container.scrollWidth / 3) {
        container.scrollLeft = 0
      }
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isMobile])

  const allBrands = [...socialProof.brands, ...socialProof.brands, ...socialProof.brands]

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-xs md:text-sm uppercase tracking-widest text-slate-500">
            Empresas que confiam na Kuality
          </p>
        </div>

        {isMobile ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {socialProof.brands.map((brand, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-xs md:text-sm lg:text-base font-bold text-slate-700 text-center block">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div 
            ref={marqueeRef}
            className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-hidden py-2"
            style={{ scrollbarWidth: 'none' }}
            role="marquee"
            aria-label="Logotipos de empresas parceiras"
          >
            {allBrands.map((brand, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-6 md:px-8 lg:px-10 py-3 md:py-4 bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-sm md:text-base lg:text-lg font-semibold text-slate-700 whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}