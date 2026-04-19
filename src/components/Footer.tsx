import { useEffect, useState } from "react";
import { companyInfo, ctaMessage } from "../data/content";
import {
  // Ícones universais que não dão erro de exportação
  Globe,
  Share2,
  Phone,
  Mail,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";

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
    <footer className="relative bg-slate-950 pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`mb-24 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Globe className="w-3 h-3" />
                Soluções Industriais de Alta Performance
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tight uppercase italic">
                {ctaMessage}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a
                href={`tel:${companyInfo.phone?.replace(/\D/g, "")}`}
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-cyan-600 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-900/20 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.salesEmail}`}
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-white/5 text-white border border-white/10 font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-white/10 transition-all active:scale-95"
              >
                <Mail className="w-4 h-4" />
                Contato Direto
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <img
              src="/assets/logo.webp"
              alt="Kuality Química"
              className="h-12 w-auto brightness-0 invert opacity-90"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Liderança e precisão em engenharia química industrial há mais de
              três décadas.
            </p>
            <div className="flex items-center gap-4">
              {/* Usando Share2 como ícone genérico para evitar erros de exportação do TS */}
              <a
                href="https://www.facebook.com/KualityQuimica/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all"
              >
                <Share2 size={18} />
              </a>
              <a
                href="https://www.instagram.com/kualityquimica/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all"
              >
                <Share2 size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/kuality-quimica-ltda/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>

          <div className="lg:pl-10">
            <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              Navegação
            </h4>
            <ul className="space-y-4">
              {["Início", "Produtos", "Sobre", "Contato"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-[1px] bg-cyan-600 scale-x-0 group-hover:scale-x-100 transition-transform" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              Engenharia
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-cyan-600 mt-1" />
                <p className="text-white text-sm font-bold">
                  {companyInfo.phone}
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-cyan-600 mt-1" />
                <p className="text-white text-sm font-bold">
                  {companyInfo.salesEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              Localização
            </h4>
            <div className="space-y-4 text-right">
              <p className="text-slate-400 text-sm leading-relaxed italic">
                {companyInfo.address.street}
                <br />
                {companyInfo.address.neighborhood}
                <br />
                {companyInfo.address.city} - CEP {companyInfo.address.cep}
              </p>
              <div className="inline-flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Unidade Homologada
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Kuality Química • CNPJ:{" "}
            {companyInfo.cnpj || "00.000.000/0001-00"}
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest hover:text-cyan-400 transition-colors"
          >
            Voltar ao Topo
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500 group-hover:bg-cyan-500 transition-all">
              <ChevronUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
