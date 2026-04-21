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
  RefreshCw,
  FileSearch,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { companyInfo } from "../data/content";

// TRAVA DE SEGURANÇA PARA O DEPLOY
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

    await new Promise((resolve) => setTimeout(resolve, 2000));

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
      className="py-24 lg:py-12 bg-slate-50 relative overflow-hidden"
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
            <div className="lg:col-span-7 p-8 md:p-14 border-r border-slate-100 flex flex-col min-h-[650px]">
              {/* MODAL / VIEW DE SUCESSO */}
              {submitStatus === "success" && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:absolute lg:inset-0 lg:z-50 lg:bg-white animate-in fade-in duration-300">
                  {/* Backdrop para mobile */}
                  <div
                    className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm lg:hidden"
                    onClick={handleReset}
                  />

                  <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-12 text-center space-y-8 shadow-2xl lg:shadow-none border-2 border-slate-100 lg:border-none animate-in zoom-in duration-500">
                    {/* Botão de Fechar (X) */}
                    <button
                      onClick={handleReset}
                      className="absolute top-6 right-6 p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                      aria-label="Fechar"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="relative mx-auto w-24">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
                      <div className="relative w-24 h-24 bg-cyan-50 rounded-3xl border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <CheckCircle className="w-12 h-12 text-cyan-600" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        Demanda <br />{" "}
                        <span className="text-cyan-600">Protocolada.</span>
                      </h3>
                      <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">
                        Fila de processamento:{" "}
                        <span className="text-slate-900">Prioritária</span>
                      </p>
                    </div>

                    <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                        <div className="flex items-center gap-2">
                          <FileSearch className="w-4 h-4 text-slate-400" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Data / Hora
                          </span>
                        </div>
                        <span className="text-xs font-black text-slate-900 font-mono tracking-tighter">
                          {protocolNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Obrigado pelo contato. Um Engenheiro de Performance da{" "}
                        <span className="text-cyan-600 font-bold">
                          Kuality Química
                        </span>{" "}
                        analisará suas especificações técnicas e retornará em
                        até 24h úteis.
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-3 w-full text-[10px] font-black text-slate-400 hover:text-cyan-600 transition-colors uppercase tracking-[0.2em]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Iniciar novo atendimento
                    </button>
                  </div>
                </div>
              )}

              {/* FORMULÁRIO PADRÃO */}
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

              <form
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-8"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.name ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm`}
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
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.email ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm`}
                      placeholder="email@corporativo.com.br"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.phone ? "border-red-400" : "border-slate-100"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm`}
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
                      className="w-full h-14 px-0 bg-transparent border-b-2 border-slate-100 focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-sm"
                      placeholder="Razão Social ou Fantasia"
                    />
                  </div>
                </div>

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
                    className={`w-full p-6 rounded-2xl bg-slate-50 border-2 ${errors.message ? "border-red-400" : "border-transparent"} focus:border-cyan-600 focus:bg-white text-slate-900 font-medium transition-all outline-none resize-none`}
                    placeholder="Descreva a demanda química ou necessidades de sua linha..."
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider pl-1">
                      {errors.message}
                    </p>
                  )}
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
            </div>

            {/* INFO SIDEBAR */}
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
