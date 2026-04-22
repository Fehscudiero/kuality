import { useEffect, useState } from "react";
import { companyInfo } from "../data/content";
import { Phone, Mail, ChevronUp, MapPin, Globe } from "lucide-react";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    const section = document.querySelector("footer");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative bg-slate-950 pt-16 pb-8 overflow-hidden">
      {/* Linha de luz superior com gradiente técnico */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Card de CTA (Call to Action) */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
             <div className="space-y-2 text-center lg:text-left">
               <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Inicie o seu Projeto</h3>
               <p className="text-slate-400 text-sm">Nossos engenheiros estão prontos para analisar sua demanda industrial.</p>
             </div>
             <button
               onClick={() => scrollToSection("contato")}
               className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all"
             >
               Solicitar Contato
             </button>
          </div>
        </div>

        {/* Informações da Empresa & Redes Sociais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          <div className="space-y-4">
            <h4 className="text-white font-black text-lg uppercase italic tracking-tighter mb-6">Kuality Química</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Alta tecnologia molecular para soluções de máxima performance industrial. Pureza garantida e 35 anos de know-how.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Contato</h4>
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{companyInfo.phone}</span>
            </a>
            <a href={`mailto:${companyInfo.salesEmail}`} className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{companyInfo.salesEmail}</span>
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Endereço</h4>
            <div className="flex items-start gap-3 text-slate-400">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span className="text-sm leading-relaxed">
                {companyInfo.address.street}<br />
                {companyInfo.address.neighborhood} - {companyInfo.address.city}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Redes Sociais</h4>
            <div className="flex items-center gap-5">
              
              {/* LinkedIn: Logotipo Original */}
              <a 
                href="https://www.linkedin.com/company/kuality-quimica-ltda/?originalSubdomain=br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md"
                aria-label="LinkedIn da Kuality Química"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9">
                  <path fill="#0A66C2" d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"/>
                  <path fill="#FFF" d="M7.12 20.45V9H3.56v11.45h3.56zM5.34 7.43c1.14 0 2.06-.93 2.06-2.06 0-1.14-.92-2.06-2.06-2.06-1.14 0-2.06.92-2.06 2.06 0 1.13.92 2.06 2.06 2.06zM20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28z"/>
                </svg>
              </a>
              
              {/* Instagram: Logotipo Original (Gradiente Meta) */}
              <a 
                href="https://www.instagram.com/kualityquimica/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md"
                aria-label="Instagram da Kuality Química"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <rect fill="url(#ig-grad)" width="24" height="24" rx="6" ry="6"/>
                  <rect fill="none" stroke="#FFF" strokeWidth="2" x="5" y="5" width="14" height="14" rx="4" ry="4"/>
                  <circle fill="none" stroke="#FFF" strokeWidth="2" cx="12" cy="12" r="3.5"/>
                  <circle fill="#FFF" cx="16.5" cy="7.5" r="1"/>
                </svg>
              </a>
              
              {/* Facebook: Logotipo Original (Circular Moderno) */}
              <a 
                href="https://www.facebook.com/KualityQuimica/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md"
                aria-label="Facebook da Kuality Química"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9">
                  <path fill="#1877F2" d="M24 12.072a12 12 0 1 0-13.875 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385A12.004 12.004 0 0 0 24 12.072z"/>
                  <path fill="#FFF" d="M16.671 15.293l.532-3.469h-3.328V9.572c0-.949.466-1.874 1.956-1.874h1.514V4.745s-1.374-.234-2.686-.234c-2.741 0-4.533 1.662-4.533 4.669v2.641H7.078v3.469h3.047v8.385a12.09 12.09 0 0 0 3.75 0v-8.385h2.796z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé e Voltar ao Topo */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-cyan-500 text-[9px] font-black uppercase tracking-[0.2em] text-center md:text-left">
              © {new Date().getFullYear()} Kuality Química
            </p>
            <p className="text-white text-[7px] font-black uppercase tracking-[0.2em] text-center md:text-left">
              CNPJ:67.287.409/0001-01
            </p>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <Globe className="w-3 h-3 text-cyan-500" />
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">
                Operação Nacional
              </span>
            </div>
          </div>

          {/* Botão Voltar ao Topo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-4 text-red-500 text-[9px] font-black uppercase tracking-widest hover:text-red-400 transition-all"
          >
            Voltar ao Topo
            <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center group-hover:bg-red-500/10 group-hover:border-red-500 transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <ChevronUp className="w-4 h-4 text-red-500 group-hover:text-red-400 transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}