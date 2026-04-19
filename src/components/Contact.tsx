import { useState, useEffect } from 'react'
import { companyInfo } from '../data/content'

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('contato')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  return (
    <section id="contato" className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Entre em <span className="text-cyan-400">Contato</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg lg:text-xl mt-2 md:mt-3">Nossa equipe está pronta para atendê-lo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <div 
            className={`bg-slate-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-slate-700/50 backdrop-blur-sm transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm md:text-base font-medium text-slate-300 mb-2 md:mb-3" htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-sm md:text-base focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-slate-300 mb-2 md:mb-3" htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-sm md:text-base focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-slate-300 mb-2 md:mb-3" htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-sm md:text-base focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  placeholder="Descreva sua necessidade ou solicite um orçamento..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mensagem Enviada!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          <div className={`space-y-4 md:space-y-6 transition-all duration-500 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-slate-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-5 md:mb-6 lg:mb-8">Fale com a gente</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
                    <svg className="w-6 md:w-7 h-6 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 mb-1">Telefone</p>
                    <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`} className="text-white font-semibold text-base md:text-lg hover:text-cyan-400 transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
                    <svg className="w-6 md:w-7 h-6 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 mb-1">E-mail</p>
                    <a href={`mailto:${companyInfo.salesEmail}`} className="text-white font-semibold text-base md:text-lg hover:text-cyan-400 transition-colors">
                      {companyInfo.salesEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
                    <svg className="w-6 md:w-7 h-6 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 mb-1">Endereço</p>
                    <p className="text-white font-semibold text-base md:text-lg">{companyInfo.address.street}</p>
                    <p className="text-slate-400 text-sm md:text-base">{companyInfo.address.neighborhood}, {companyInfo.address.city}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl">
              <p className="text-white font-medium text-center text-base md:text-lg lg:text-xl mb-2">Atendimento</p>
              <p className="text-cyan-100 text-center text-sm md:text-base mb-3 md:mb-4">
                Nossa equipe está pronta para atendê-lo de segunda a sexta-feira, das 8h às 18h.
              </p>
              <p className="text-white font-bold text-center text-lg md:text-xl lg:text-2xl">Responderemos em até 24 horas!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}