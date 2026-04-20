import { useState, useEffect, useRef } from "react";
import {
  Send,
  CheckCircle,
  Loader2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { companyInfo } from "../data/content";

// TRAVA DE SEGURANÇA PARA O DEPLOY
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- COMPONENTE DE GEOMETRIA (Autônomo para Produção) ---
function SectionGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !shapeRef.current) return;

      gsap.fromTo(
        shapeRef.current,
        { x: "120%", opacity: 0 },
        {
          x: "10%",
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(shapeRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        ref={shapeRef}
        className="absolute top-[-10%] right-0 w-[150%] h-[150%] bg-cyan-100 shadow-2xl"
        style={{
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 70% 100%)",
          transform: "rotate(3deg)",
          zIndex: 50,
        }}
      />
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitStatus("idle"), 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-24 lg:py-36 bg-slate-50 relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div
          className={`relative bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-1000 ease-out overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-600 via-cyan-400 to-slate-900"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* FORMULÁRIO */}
            <div className="lg:col-span-7 p-8 md:p-14 border-r border-slate-100">
              <header className="mb-10">
                <div className="flex items-center gap-2 text-cyan-600 mb-4">
                  <Zap className="w-5 h-5 fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Priority Request
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none mb-6">
                  Sintetize seu <br />{" "}
                  <span className="text-cyan-600">Sucesso.</span>
                </h2>
                <p className="text-slate-600 text-sm font-medium italic">
                  Preencha os dados técnicos abaixo para iniciar o protocolo de
                  atendimento industrial.
                </p>
              </header>

              {submitStatus === "success" ? (
                <div className="h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-emerald-200 animate-in zoom-in duration-300">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-black uppercase italic text-slate-900">
                    Transmissão Concluída
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                        Seu nome
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full h-14 px-0 bg-transparent border-b-2 border-slate-100 focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm"
                        placeholder="Nome ou Empresa"
                      />
                    </div>
                    <div className="group space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                        Seu melhor email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full h-14 px-0 bg-transparent border-b-2 border-slate-100 focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm"
                        placeholder="email@corporativo.com"
                      />
                    </div>
                  </div>
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Especificações
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full p-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-cyan-600 focus:bg-white text-slate-900 font-medium transition-all outline-none resize-none"
                      placeholder="Descreva a demanda química..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-max px-16 h-16 rounded-2xl bg-slate-900 text-white font-black italic uppercase text-xs tracking-[0.2em] hover:bg-cyan-600 active:scale-95 transition-all flex items-center justify-center gap-4"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* INFO (COL 5) */}
            <div className="lg:col-span-5 bg-slate-900 p-8 md:p-14 text-white flex flex-col justify-between relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.08),transparent_70%)]"></div>
              <div className="relative z-10 space-y-10">
                <div>
                  <ShieldCheck className="text-cyan-400 w-10 h-10 mb-6" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                    Kuality Labs
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    Confidencialidade técnica garantida por nossos protocolos de
                    conformidade.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Telefone Responsivo */}
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-3 sm:gap-5 group active:scale-[0.98] transition-transform duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center md:group-hover:bg-cyan-600 transition-all border border-white/10">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] sm:text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-0.5">
                        Hotline
                      </p>
                      <p className="text-xs sm:text-sm md:text-base font-bold md:group-hover:text-cyan-400 transition-colors truncate">
                        {companyInfo.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email Responsivo */}
                  <a
                    href={`mailto:${companyInfo.salesEmail}`}
                    className="flex items-center gap-3 sm:gap-5 group active:scale-[0.98] transition-transform duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center md:group-hover:bg-cyan-600 transition-all border border-white/10">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] sm:text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-0.5">
                        E-mail Oficial
                      </p>
                      <p className="text-xs sm:text-sm md:text-base font-bold md:group-hover:text-cyan-400 transition-colors truncate">
                        {companyInfo.salesEmail}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative z-10 mt-12 pt-10 border-t border-white/5">
                <div className="flex items-start gap-4">
                  <MapPin className="text-cyan-500 w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm font-bold">
                      {companyInfo.address.street}
                    </p>
                    <p className="text-xs text-slate-600 uppercase tracking-widest mt-1">
                      {companyInfo.address.neighborhood} •{" "}
                      {companyInfo.address.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER SEÇÃO - PRETO PURO, LADO A LADO, SEM HOVER */}
        <div className="mt-12 flex justify-between items-center w-full gap-2 md:gap-6">
          <p className="text-[6px] sm:text-[8px] md:text-[10px] font-black text-black uppercase tracking-[0.1em] sm:tracking-widest md:tracking-[0.4em] whitespace-nowrap">
            Kuality Chemistry Solutions © 2026
          </p>
          <div className="h-[2px] flex-1 bg-black mx-2 md:mx-4"></div>
          <p className="text-[6px] sm:text-[8px] md:text-[10px] font-black text-black uppercase tracking-[0.1em] sm:tracking-widest md:tracking-[0.4em] whitespace-nowrap text-right">
            Those who understand, seek Kuality.
          </p>
        </div>
      </div>
    </section>
  );
}
