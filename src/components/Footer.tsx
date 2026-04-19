import { useEffect, useState } from "react";
import { companyInfo, ctaMessage } from "../data/content";
import { Globe, Phone, Mail, ChevronUp, ShieldCheck } from "lucide-react";

export default function Footer() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 pt-12 pb-6 overflow-hidden">
      {/* Efeito de Glow de Fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Card CTA */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-4">
                <Globe className="w-3 h-3" />
                Soluções Industriais
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase italic">
                {ctaMessage}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Ajustado: bg-cyan-700 para contraste AA com texto branco */}
              <a
                href={`tel:${companyInfo.phone?.replace(/\D/g, "")}`}
                aria-label="Ligar para a Kuality"
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-cyan-700 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-cyan-600 transition-all active:scale-95 shadow-lg shadow-cyan-900/20"
              >
                <Phone className="w-4 h-4" />
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.salesEmail}`}
                aria-label="E-mail comercial"
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-white/10 text-white border border-white/20 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/20 transition-all active:scale-95"
              >
                <Mail className="w-4 h-4" />
                Contato Direto
              </a>
            </div>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-6">
            <img
              src="/assets/logo.webp"
              alt="Kuality Química"
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Liderança e precisão em engenharia química industrial há mais de
              três décadas.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/KualityQuimica/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook da Kuality"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-cyan-700 hover:text-white transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/kualityquimica/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Kuality"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-cyan-700 hover:text-white transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/kuality-quimica-ltda/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn da Kuality"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-cyan-700 hover:text-white transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:pl-8">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              {["Início", "Produtos", "Sobre", "Contato"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-cyan-400 text-xs transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-[1px] bg-cyan-600 scale-x-0 group-hover:scale-x-100 transition-transform" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Engenharia
            </h4>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-start gap-3">
                {/* Ajustado: cyan-500 tem melhor contraste no fundo escuro que o 600 */}
                <Phone className="w-4 h-4 text-cyan-500 mt-0.5" />
                <p className="text-xs font-bold leading-none">
                  {companyInfo.phone}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-500 mt-0.5" />
                <p className="text-xs font-bold leading-none">
                  {companyInfo.salesEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Localização
            </h4>
            <div className="space-y-3 text-right text-slate-400">
              <p className="text-xs leading-relaxed italic">
                {companyInfo.address.street}
                <br />
                {companyInfo.address.city} - CEP {companyInfo.address.cep}
              </p>
              <div className="inline-flex items-center gap-2 text-[9px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/5 px-2 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Unidade Homologada
              </div>
            </div>
          </div>
        </div>

        {/* Barra Final */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Kuality Química • CNPJ:{" "}
            {companyInfo.cnpj || "67.287.409/0001-01"}
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo da página"
            className="group flex items-center gap-3 text-white text-[9px] font-black uppercase tracking-widest hover:text-cyan-400 transition-colors"
          >
            Voltar ao Topo
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500 group-hover:bg-cyan-500 transition-all">
              <ChevronUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
