import { useState, useEffect, useRef } from "react";
import {
  Send,
  CheckCircle,
  Mail,
  Zap,
  RefreshCw,
  FileSearch,
  X,
  FlaskConical,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { companyInfo } from "../data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- COMPONENTE DE GEOMETRIA ---
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
    phone: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [isVisible, setIsVisible] = useState(false);
  const [protocolNumber, setProtocolNumber] = useState("");

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);

    let formatted = val;
    if (val.length > 2) formatted = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    if (val.length > 7)
      formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;

    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = "Insira um nome completo válido.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/i;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Use um e-mail válido terminado em .com ou .com.br";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      newErrors.phone = "Insira um telefone válido com DDD.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Descreva sua demanda com mais detalhes.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const generatedProtocol = `${day}/${month} - ${hours}:${minutes} - 2026`;

    await new Promise((resolve) => setTimeout(resolve, 2500));

    setProtocolNumber(generatedProtocol);
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const handleReset = () => {
    setSubmitStatus("idle");
    setErrors({});
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-16 lg:py-10 bg-slate-50 relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <SectionGeometry />

      <style>{`
        @keyframes shimmer-fast {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s infinite linear;
        }
        @keyframes float-smooth {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-smooth {
          animation: float-smooth 3s ease-in-out infinite;
        }
        .border-glow-modern {
          position: relative;
          background: #020617; 
          border-radius: 2.5rem;
        }
        .border-glow-modern::before {
          content: "";
          position: absolute;
          inset: -3px; 
          border-radius: 2.6rem; 
          background: linear-gradient(135deg, #06b6d4 0%, #020617 40%, #06b6d4 100%);
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
          z-index: -1;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div
          className={`relative bg-white rounded-[2rem] border-2 border-slate-200 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-out overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-600 via-cyan-400 to-slate-900 z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 relative">
            {/* PAINEL DO FORMULÁRIO */}
            <div className="lg:col-span-7 p-6 md:p-10 border-r border-slate-100 flex flex-col relative">
              {/* MODAL / VIEW DE SUCESSO PREMIUM */}
              {submitStatus === "success" && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:absolute lg:inset-0 lg:z-50 lg:bg-white/60 lg:backdrop-blur-md animate-in fade-in duration-500">
                  <div
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-md lg:hidden"
                    onClick={handleReset}
                  />

                  <div className="border-glow-modern w-full max-w-md p-8 md:p-10 text-center space-y-6 shadow-[0_30px_80px_rgba(6,182,212,0.2)] animate-in zoom-in-95 duration-500 z-10">
                    <button
                      onClick={handleReset}
                      className="absolute top-5 right-5 p-2 text-slate-500 hover:text-white hover:rotate-90 transition-all duration-300 z-20"
                      aria-label="Fechar"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="relative mx-auto w-20 animate-float-smooth z-10">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                      <div className="relative w-20 h-20 bg-slate-900 rounded-3xl border border-cyan-500/50 flex items-center justify-center shadow-[0_10px_30px_rgba(6,182,212,0.3)]">
                        <CheckCircle className="w-10 h-10 text-cyan-400" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Demanda <br />{" "}
                        <span className="text-cyan-400 drop-shadow-sm">
                          Protocolada.
                        </span>
                      </h3>
                      <p className="text-slate-400 text-[9px] font-black tracking-widest uppercase">
                        Fila de processamento:{" "}
                        <span className="text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded-md ml-1 border border-cyan-900/50">
                          Prioritária
                        </span>
                      </p>
                    </div>

                    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-inner">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <FileSearch className="w-4 h-4 text-cyan-400" />
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Data / Hora
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-white font-mono tracking-tighter bg-slate-800 px-2 py-1 rounded border border-slate-700 shadow-sm">
                          {protocolNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        Obrigado pelo contato. Um Engenheiro de Performance da{" "}
                        <span className="text-cyan-400 font-bold">
                          Kuality Química
                        </span>{" "}
                        analisará suas especificações técnicas e retornará em
                        até 24h úteis.
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="mx-auto flex items-center justify-center gap-2 w-max text-[9px] font-black text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-[0.2em] group"
                    >
                      <RefreshCw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-500" />
                      Iniciar novo atendimento
                    </button>
                  </div>
                </div>
              )}

              {/* FORMULÁRIO PADRÃO */}
              <header className="mb-10">
                <div className="flex items-center gap-3 text-cyan-600 mb-4">
                  <Zap className="w-5 h-5 fill-current animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Priority Request
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none mb-5">
                  Sintetize seu <br />{" "}
                  <span className="text-cyan-600">Sucesso.</span>
                </h2>
                <p className="text-slate-600 text-sm font-medium italic">
                  Preencha os dados técnicos abaixo para iniciar o protocolo de
                  atendimento.
                </p>
              </header>

              {/* ESPAÇAMENTOS MAIORES */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Seu nome *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.name ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base`}
                      placeholder="Nome Completo"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.email ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base`}
                      placeholder="email@corporativo.com.br"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.phone ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base`}
                      placeholder="(00) 00000-0000"
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Empresa (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full h-14 px-0 bg-transparent border-b-2 border-slate-100 focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base"
                      placeholder="Razão Social ou Fantasia"
                    />
                  </div>
                </div>

                {/* TEXTAREA MAIOR */}
                <div className="group space-y-2">
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                    Especificações Técnicas *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message)
                        setErrors((prev) => ({ ...prev, message: "" }));
                    }}
                    className={`w-full p-5 rounded-xl bg-slate-50 border-2 ${errors.message ? "border-red-400" : "border-transparent"} focus:border-cyan-600 focus:bg-white text-slate-900 font-medium transition-all outline-none resize-none text-base`}
                    placeholder="Descreva a demanda química ou necessidades de sua linha..."
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider pl-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-center w-full pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative overflow-hidden w-full md:w-max px-14 h-16 rounded-xl text-white font-black italic uppercase text-sm tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 group ${
                      isSubmitting
                        ? "bg-slate-950 pointer-events-none shadow-inner shadow-cyan-900/50"
                        : "bg-slate-900 hover:bg-cyan-600 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]"
                    }`}
                  >
                    {isSubmitting && (
                      <>
                        <div className="absolute inset-0 bg-slate-900">
                          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-sm animate-shimmer-fast"></div>
                        </div>
                        <FlaskConical className="w-5 h-5 text-cyan-400 relative z-10 animate-bounce drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <span className="relative z-10 text-cyan-400 drop-shadow-sm">
                          Sintetizando...
                        </span>
                      </>
                    )}

                    {!isSubmitting && (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* NOVO INFO SIDEBAR - HORÁRIO, RESPOSTA, CERTIFICAÇÕES, EXPERIÊNCIA */}
            <div className="lg:col-span-5 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.08),transparent_70%)]"></div>

              <div className="relative z-10 space-y-10">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                    Kuality <span className="text-cyan-400">Forms</span>
                  </h3>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                    Garantimos sigilo absoluto do seu projeto. Nosso laboratório
                    utilizará essas especificações técnicas para sintetizar uma
                    solução de alta pureza, feita sob medida para a sua linha de
                    produção.
                  </p>
                </div>

                <div className="space-y-7">
                  {/* HORÁRIO DE ATENDIMENTO */}
                  <div className="flex items-center gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                      <svg
                        className="w-6 h-6 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Atendimento
                      </p>
                      <p className="text-base font-semibold text-white">
                        Seg-Sex: 8h-18h (GMT-3)
                      </p>
                    </div>
                  </div>

                  {/* TEMPO DE RESPOSTA */}
                  <div className="flex items-center gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                      <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Tempo de Resposta
                      </p>
                      <p className="text-base font-semibold text-white">
                        Primeiro contato em até 24h úteis
                      </p>
                    </div>
                  </div>

                  {/* ANOS DE EXPERIÊNCIA */}
                  <div className="flex items-center gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                      <svg
                        className="w-6 h-6 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Experiência
                      </p>
                      <p className="text-base font-semibold text-white">
                        35+ anos de mercado
                      </p>
                    </div>
                  </div>

                  {/* FORMULAÇÕES DESENVOLVIDAS */}
                  <div className="flex items-center gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                      <FlaskConical className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Formulações
                      </p>
                      <p className="text-base font-semibold text-white">
                        500+ desenvolvidas
                      </p>
                    </div>
                  </div>

                  {/* CERTIFICAÇÕES OFICIAIS */}
                  <div className="pt-8 mt-4 border-t border-white/10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">
                      Certificações Oficiais
                    </p>
                    <div className="flex items-start gap-8">
                      <div
                        className="flex flex-col items-center gap-3"
                        title="ANVISA"
                      >
                        <img
                          src="/assets/anvisa.webp"
                          alt="ANVISA"
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                      <div
                        className="flex flex-col items-center gap-3"
                        title="ISO 9001"
                      >
                        <img
                          src="/assets/iso.webp"
                          alt="ISO 9001"
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER DA SIDEBAR - CONTATO DIRETO */}
              <div className="relative z-10 mt-auto pt-10 border-t border-white/10">
                <a
                  href={`mailto:${companyInfo.salesEmail}`}
                  className="flex items-center gap-4 group active:scale-[0.98] transition-transform duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      E-mail Comercial
                    </p>
                    <p className="text-base font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                      {companyInfo.salesEmail}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center w-full gap-2 md:gap-6">
          <p className="text-[6px] sm:text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] sm:tracking-widest md:tracking-[0.3em] whitespace-nowrap">
            Kuality Chemistry Solutions © 2026
          </p>
          <div className="h-[1px] flex-1 bg-slate-300 mx-2 md:mx-4"></div>
          <p className="text-[6px] sm:text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] sm:tracking-widest md:tracking-[0.3em] whitespace-nowrap text-right">
            Those who understand, seek Kuality.
          </p>
        </div>
      </div>
    </section>
  );
}
