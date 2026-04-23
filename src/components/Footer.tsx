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

  // URL dinâmica para o Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${companyInfo.address.street}, ${companyInfo.address.neighborhood}, ${companyInfo.address.city}`,
  )}`;

  return (
    <footer className="relative bg-slate-950 pt-16 pb-8 overflow-hidden">
      <style>{`
        @media (hover: hover) {
          .social-icon:hover {
            transform: translateY(-5px) scale(1.1);
            filter: brightness(1.2);
          }
          /* Efeito vermelho no hover do botão de topo */
          .back-to-top:hover {
             color: #ef4444 !important;
          }
          .back-to-top:hover .icon-circle {
             background-color: rgba(239, 68, 68, 0.1);
             border-color: #ef4444;
          }
        }
        
        .tap-feedback:active {
          transform: scale(0.95);
          opacity: 0.8;
          transition: all 0.1s ease-out;
        }
      `}</style>

      {/* Linha de luz superior técnica */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Card de CTA */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-slate-900 border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter">
                Inicie o seu Projeto
              </h3>
              <p className="text-slate-400 text-xs md:text-sm">
                Consulte nossa engenharia técnica agora mesmo para sua demanda
                industrial.
              </p>
            </div>
            <button
              onClick={() => scrollToSection("contato")}
              className="tap-feedback w-full lg:w-auto px-8 py-4 bg-cyan-600 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-cyan-900/20"
            >
              Solicitar Contato
            </button>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-8 border-b border-white/5">
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-white font-black text-lg uppercase italic tracking-tighter">
              Kuality Química
            </h4>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0 font-medium">
              Tecnologia molecular de alta performance e 35 anos de excelência
              no setor químico industrial.
            </p>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-cyan-500">
              Atendimento
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="tap-feedback flex items-center justify-center sm:justify-start gap-3 text-slate-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-bold">{companyInfo.phone}</span>
              </a>
              <a
                href={`mailto:${companyInfo.salesEmail}`}
                className="tap-feedback flex items-center justify-center sm:justify-start gap-3 text-slate-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-bold">
                  {companyInfo.salesEmail}
                </span>
              </a>
            </div>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-cyan-500">
              Unidade Fabril
            </h4>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-feedback flex items-start justify-center sm:justify-start gap-3 text-slate-400 group/addr transition-all"
            >
              <MapPin className="w-4 h-4 mt-0.5 text-cyan-600 flex-shrink-0 transition-transform" />
              <span className="text-xs md:text-sm leading-relaxed font-medium text-left">
                {companyInfo.address.street}
                <br />
                {companyInfo.address.neighborhood} - {companyInfo.address.city}
              </span>
            </a>
          </div>

          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-cyan-500">
              Mídias Oficiais
            </h4>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/kuality-quimica-ltda/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon tap-feedback w-10 h-10 flex items-center justify-center bg-[#0A66C2] rounded-xl shadow-lg transition-all"
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/kualityquimica/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon tap-feedback w-10 h-10 flex items-center justify-center rounded-xl shadow-lg transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-10 h-10">
                  <defs>
                    <linearGradient
                      id="ig-grad-final"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <rect
                    fill="url(#ig-grad-final)"
                    width="24"
                    height="24"
                    rx="6"
                    ry="6"
                  />
                  <rect
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="2"
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="4"
                    ry="4"
                  />
                  <circle
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="2"
                    cx="12"
                    cy="12"
                    r="3.5"
                  />
                  <circle fill="#FFF" cx="16.5" cy="7.5" r="1" />
                </svg>
              </a>

              {/* Facebook - Implementado com Estilo Original */}
              <a
                href="https://www.facebook.com/KualityQuimica/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon tap-feedback w-10 h-10 flex items-center justify-center bg-[#1877F2] rounded-xl shadow-lg transition-all"
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé Final */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Kuality Química
            </p>
            <p className="text-slate-100 text-[9px] font-black uppercase tracking-[0.2em]">
              CNPJ:67.287.409/0001-01
            </p>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <Globe className="w-3 h-3 text-cyan-500" />
              <span className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">
                Operação Nacional
              </span>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="back-to-top tap-feedback group flex items-center gap-4 text-slate-200 text-[9px] font-black uppercase tracking-widest transition-all duration-200"
          >
            Voltar ao Topo
            <div className="icon-circle w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all">
              <ChevronUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
