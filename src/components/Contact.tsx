import { useState, useEffect, useRef } from "react";
import {
  Send,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
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
    if (val.length > 7) formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    
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
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
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
            
            {/* PAINEL DO FORMULÁRIO COMPACTADO (Removido o min-h-[650px] e reduzido paddings) */}
            <div className="lg:col-span-7 p-6 md:p-10 border-r border-slate-100 flex flex-col relative">
              
              {/* MODAL / VIEW DE SUCESSO PREMIUM */}
              {submitStatus === "success" && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:absolute lg:inset-0 lg:z-50 lg:bg-white/60 lg:backdrop-blur-md animate-in fade-in duration-500">
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md lg:hidden" onClick={handleReset} />
                  
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
                        Demanda <br /> <span className="text-cyan-400 drop-shadow-sm">Protocolada.</span>
                      </h3>
                      <p className="text-slate-400 text-[9px] font-black tracking-widest uppercase">
                        Fila de processamento: <span className="text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded-md ml-1 border border-cyan-900/50">Prioritária</span>
                      </p>
                    </div>

                    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-inner">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <FileSearch className="w-4 h-4 text-cyan-400" />
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Data / Hora</span>
                        </div>
                        <span className="text-[10px] font-black text-white font-mono tracking-tighter bg-slate-800 px-2 py-1 rounded border border-slate-700 shadow-sm">
                          {protocolNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        Obrigado pelo contato. Um Engenheiro de Performance da <span className="text-cyan-400 font-bold">Kuality Química</span> analisará suas especificações técnicas e retornará em até 24h úteis.
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
              <header className="mb-8">
                <div className="flex items-center gap-2 text-cyan-600 mb-3">
                  <Zap className="w-4 h-4 fill-current animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                    Priority Request
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase leading-none mb-4">
                  Sintetize seu <br />{" "}
                  <span className="text-cyan-600">Sucesso.</span>
                </h2>
                <p className="text-slate-600 text-xs font-medium italic">
                  Preencha os dados técnicos abaixo para iniciar o protocolo de
                  atendimento.
                </p>
              </header>

              {/* ESPAÇAMENTOS REDUZIDOS (space-y-5 e gap-5) */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Seu nome *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className={`w-full h-12 px-0 bg-transparent border-b-2 ${errors.name ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm`}
                      placeholder="Nome Completo"
                    />
                    {errors.name && <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">{errors.name}</p>}
                  </div>
                  
                  <div className="group space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={`w-full h-12 px-0 bg-transparent border-b-2 ${errors.email ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm`}
                      placeholder="email@corporativo.com.br"
                    />
                    {errors.email && <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full h-12 px-0 bg-transparent border-b-2 ${errors.phone ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm`}
                      placeholder="(00) 00000-0000"
                    />
                    {errors.phone && <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">{errors.phone}</p>}
                  </div>
                  
                  <div className="group space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Empresa (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-12 px-0 bg-transparent border-b-2 border-slate-100 focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm"
                      placeholder="Razão Social ou Fantasia"
                    />
                  </div>
                </div>

                {/* TEXTAREA MENOR (rows 3, padding menor) */}
                <div className="group space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                    Especificações Técnicas *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                    }}
                    className={`w-full p-4 rounded-xl bg-slate-50 border-2 ${errors.message ? "border-red-400" : "border-transparent"} focus:border-cyan-600 focus:bg-white text-slate-900 font-medium transition-all outline-none resize-none text-sm`}
                    placeholder="Descreva a demanda química ou necessidades de sua linha..."
                  />
                  {errors.message && <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider pl-1">{errors.message}</p>}
                </div>
                
                <div className="flex justify-center w-full pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative overflow-hidden w-full md:w-max px-12 h-14 rounded-xl text-white font-black italic uppercase text-[11px] tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 group ${
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
                        <FlaskConical className="w-4 h-4 text-cyan-400 relative z-10 animate-bounce drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <span className="relative z-10 text-cyan-400 drop-shadow-sm">Sintetizando...</span>
                      </>
                    )}
                    
                    {!isSubmitting && (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* INFO SIDEBAR COMPACTADA (Paddings p-6 md:p-10) */}
            <div className="lg:col-span-5 bg-slate-900 p-6 md:p-10 text-white flex flex-col justify-between relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.08),transparent_70%)]"></div>
              
              <div className="relative z-10 space-y-8">
                <div>
                  <ShieldCheck className="text-cyan-400 w-8 h-8 mb-4" />
                  <h3 className="text-xl font-black uppercase tracking-tighter italic">
                    Kuality Labs
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Confidencialidade técnica garantida por nossos protocolos.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-4 group active:scale-[0.98] transition-transform duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center md:group-hover:bg-cyan-600 transition-all border border-white/10">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-0.5">
                        Hotline
                      </p>
                      <p className="text-sm font-bold md:group-hover:text-cyan-400 transition-colors truncate">
                        {companyInfo.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${companyInfo.salesEmail}`}
                    className="flex items-center gap-4 group active:scale-[0.98] transition-transform duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center md:group-hover:bg-cyan-600 transition-all border border-white/10">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-0.5">
                        E-mail Oficial
                      </p>
                      <p className="text-sm font-bold md:group-hover:text-cyan-400 transition-colors truncate">
                        {companyInfo.salesEmail}
                      </p>
                    </div>
                  </a>

                  {/* BLOCO DE REDES SOCIAIS OFICIAIS */}
                  <div className="pt-4 mt-2 flex items-center gap-4 border-t border-white/5">
                    <a 
                      href="https://www.linkedin.com/company/kuality-quimica-ltda/?originalSubdomain=br" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md"
                      aria-label="LinkedIn da Kuality Química"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                        <path fill="#0A66C2" d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"/>
                        <path fill="#FFF" d="M7.12 20.45V9H3.56v11.45h3.56zM5.34 7.43c1.14 0 2.06-.93 2.06-2.06 0-1.14-.92-2.06-2.06-2.06-1.14 0-2.06.92-2.06 2.06 0 1.13.92 2.06 2.06 2.06zM20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://www.instagram.com/kualityquimica/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md"
                      aria-label="Instagram da Kuality Química"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                        <defs>
                          <linearGradient id="ig-grad-sidebar" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f09433" />
                            <stop offset="25%" stopColor="#e6683c" />
                            <stop offset="50%" stopColor="#dc2743" />
                            <stop offset="75%" stopColor="#cc2366" />
                            <stop offset="100%" stopColor="#bc1888" />
                          </linearGradient>
                        </defs>
                        <rect fill="url(#ig-grad-sidebar)" width="24" height="24" rx="6" ry="6"/>
                        <rect fill="none" stroke="#FFF" strokeWidth="2" x="5" y="5" width="14" height="14" rx="4" ry="4"/>
                        <circle fill="none" stroke="#FFF" strokeWidth="2" cx="12" cy="12" r="3.5"/>
                        <circle fill="#FFF" cx="16.5" cy="7.5" r="1"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://www.facebook.com/KualityQuimica/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md"
                      aria-label="Facebook da Kuality Química"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                        <path fill="#1877F2" d="M24 12.072a12 12 0 1 0-13.875 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385A12.004 12.004 0 0 0 24 12.072z"/>
                        <path fill="#FFF" d="M16.671 15.293l.532-3.469h-3.328V9.572c0-.949.466-1.874 1.956-1.874h1.514V4.745s-1.374-.234-2.686-.234c-2.741 0-4.533 1.662-4.533 4.669v2.641H7.078v3.469h3.047v8.385a12.09 12.09 0 0 0 3.75 0v-8.385h2.796z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* FOOTER DA SIDEBAR REAJUSTADO */}
              <div className="relative z-10 mt-auto pt-8 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <MapPin className="text-cyan-500 w-4 h-4 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">
                      {companyInfo.address.street}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                      {companyInfo.address.neighborhood} •{" "}
                      {companyInfo.address.city}
                    </p>
                  </div>
                </div>
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