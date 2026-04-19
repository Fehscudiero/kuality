import { useEffect, useState } from "react";
import { companyInfo } from "../data/content";
import { Phone, Mail, ChevronUp, MapPin } from "lucide-react";

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
    <footer className="relative bg-slate-950 pt-12 pb-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`mb-16 transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                Pronto para elevar sua{" "}
                <span className="text-cyan-400">Performance?</span>
              </h3>
              <p className="text-slate-400 text-sm font-medium">
                Fale agora com nosso time de engenharia química.
              </p>
            </div>
            <button
              onClick={() => scrollToSection("contato")}
              className="w-full md:w-auto px-10 py-5 bg-cyan-500 text-slate-950 font-black uppercase italic text-xs tracking-widest rounded-xl shadow-lg active:scale-95"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 text-center md:text-left">
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-xl shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                K
              </div>
              <span className="text-xl font-black text-white uppercase tracking-tighter">
                Kuality Química
              </span>
            </div>
            <p className="text-slate-400 text-sm italic max-w-sm">
              "Quem entende, busca Kuality." — Mais de 35 anos transformando a
              indústria.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6">
              Navegação
            </h4>
            <ul className="space-y-4">
              {["Início", "Produtos", "Qualidade", "Sobre"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() =>
                      item === "Início"
                        ? window.scrollTo({ top: 0, behavior: "smooth" })
                        : scrollToSection(item.toLowerCase())
                    }
                    className="text-slate-400 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6">
              Contato
            </h4>
            <div className="space-y-6">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-4 group"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-bold text-sm">
                  {companyInfo.phone}
                </span>
              </a>
              <a
                href={`mailto:${companyInfo.salesEmail}`}
                className="flex items-center gap-4 group"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-bold text-sm break-all">
                  {companyInfo.salesEmail}
                </span>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-slate-400 text-xs italic">
                  {companyInfo.address.street},{" "}
                  {companyInfo.address.neighborhood}
                  <br />
                  {companyInfo.address.city} - CEP {companyInfo.address.cep}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Kuality Química • CNPJ:
            67.287.409/0001-01
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 text-white text-[9px] font-black uppercase tracking-widest hover:text-cyan-400 transition-colors"
          >
            Voltar ao Topo
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
