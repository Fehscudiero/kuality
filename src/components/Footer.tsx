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
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                Inicie o seu Projeto
              </h3>
              <p className="text-slate-400 text-sm">
                Nossos engenheiros estão prontos para analisar sua demanda
                industrial.
              </p>
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
            <h4 className="text-white font-black text-lg uppercase italic tracking-tighter mb-6">
              Kuality Química
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Alta tecnologia molecular para soluções de máxima performance
              industrial. Pureza garantida e 35 anos de know-how.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
              Contato
            </h4>
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{companyInfo.phone}</span>
            </a>
            <a
              href={`mailto:${companyInfo.salesEmail}`}
              className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">{companyInfo.salesEmail}</span>
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
              Endereço
            </h4>
            <div className="flex items-start gap-3 text-slate-400">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span className="text-sm leading-relaxed">
                {companyInfo.address.street}
                <br />
                {companyInfo.address.neighborhood} - {companyInfo.address.city}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
              Redes Sociais
            </h4>
            <div className="flex items-center gap-5">
              {/* LinkedIn CORRIGIDO */}
              <a
                href="https://www.linkedin.com/company/kuality-quimica-ltda/?originalSubdomain=br"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#0A66C2] rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 drop-shadow-md"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram MANTIDO (Padrão) */}
              <a
                href="https://www.instagram.com/kualityquimica/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 drop-shadow-md"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-9 h-9"
                >
                  <defs>
                    <linearGradient
                      id="ig-grad-footer"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <rect
                    fill="url(#ig-grad-footer)"
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

              {/* Facebook CORRIGIDO */}
              <a
                href="https://www.facebook.com/KualityQuimica/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#1877F2] rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 drop-shadow-md"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé e Voltar ao Topo */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
              © {new Date().getFullYear()} Kuality Química
            </p>
            <p className="text-white text-[9px] font-black uppercase tracking-[0.2em] text-center md:text-left">
              CNPJ:67.287.409/0001-01
            </p>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <Globe className="w-3 h-3 text-cyan-500" />
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">
                Operação Nacional
              </span>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-4 text-red-500/80 text-[9px] font-black uppercase tracking-widest hover:text-red-400 transition-all"
          >
            Voltar ao Topo
            <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center group-hover:bg-red-500/10 group-hover:border-red-500 transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <ChevronUp className="w-4 h-4 text-red-500" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
