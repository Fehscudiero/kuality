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

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Card de CTA (Call to Action) */}
        <div
          className={`mb-20 transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-4">
                Pronto para elevar sua <br className="hidden md:block" />
                <span className="text-cyan-400">Performance Industrial?</span>
              </h3>
              <p className="text-slate-400 text-sm md:text-base font-medium max-w-xl mx-auto md:mx-0">
                Nossa engenharia química está pronta para otimizar sua linha de
                produção.
              </p>
            </div>

            <button
              onClick={() => scrollToSection("contato")}
              className="w-full md:w-auto px-12 py-6 bg-cyan-500 text-slate-950 font-black uppercase italic text-xs tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:bg-cyan-400 transition-all hover:-translate-y-1 active:scale-95 z-10"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>

        {/* Grid Principal - Alinhamento Óptico (Center no Mobile, Left no Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mb-20">
          {/* Coluna 01: Branding e Redes Sociais */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6 group">
              <img
                src="/assets/logo.webp"
                alt="Kuality Química Logo"
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-slate-400 text-sm md:text-base italic leading-relaxed max-w-sm mb-8">
              Referência em{" "}
              <span className="text-white font-bold">engenharia química</span>{" "}
              há mais de 35 anos. Pureza, rigor técnico e compromisso com o
              resultado industrial.
            </p>

            {/* Redes Sociais (Build Safe SVGs) */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group"
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group"
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 02: Navegação Rápida */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-cyan-400 font-black uppercase text-[10px] tracking-[0.4em] mb-8">
              Navegação Rápida
            </h4>
            <nav>
              <ul className="space-y-5 text-center md:text-left">
                {["Início", "Produtos", "Qualidade", "Sobre"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() =>
                        item === "Início"
                          ? window.scrollTo({ top: 0, behavior: "smooth" })
                          : scrollToSection(item.toLowerCase())
                      }
                      className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all hover:translate-x-1 inline-block"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Coluna 03: Contato Direto */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-cyan-400 font-black uppercase text-[10px] tracking-[0.4em] mb-8">
              Contato Direto
            </h4>
            {/* Wrapper flex-col para garantir que no mobile os itens fiquem centralizados como um bloco */}
            <div className="space-y-6 flex flex-col w-full md:w-auto">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center justify-center md:justify-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-slate-300 font-bold text-sm group-hover:text-white transition-colors">
                  {companyInfo.phone}
                </span>
              </a>

              <a
                href={`mailto:${companyInfo.salesEmail}`}
                className="flex items-center justify-center md:justify-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-slate-300 font-bold text-sm break-all group-hover:text-white transition-colors text-center md:text-left">
                  {companyInfo.salesEmail}
                </span>
              </a>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-slate-400 text-xs italic leading-relaxed text-center md:text-left max-w-[220px]">
                  {companyInfo.address.street},{" "}
                  {companyInfo.address.neighborhood}
                  <br />
                  {companyInfo.address.city} - {companyInfo.address.cep}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Legal / Copyright */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-cyan-500 text-[9px] font-black uppercase tracking-[0.2em] text-center md:text-left">
              © {new Date().getFullYear()} Kuality Química
            </p>
            <p className="text-cyan-500 text-[7px] font-black uppercase tracking-[0.2em] text-center md:text-left">
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
            className="group flex items-center gap-4 text-slate-500 text-[9px] font-black uppercase tracking-widest hover:text-cyan-400 transition-all"
          >
            Voltar ao Topo
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
