import { useState, useEffect, useRef, useCallback } from "react";
import {
  Send,
  CheckCircle,
  Mail,
  Zap,
  RefreshCw,
  FileSearch,
  X,
  FlaskConical,
  Copy,
  Check,
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

// Gera protocolo com data e hora formatados pt-BR
function buildProtocol(): { id: string; datetime: string } {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const rand = Math.floor(1000 + Math.random() * 9000);
  return {
    id: `KQ-${year}${month}-${rand}`,
    datetime: `${day}/${month}/${year} \u00e0s ${hours}:${minutes}`,
  };
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

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
  const [protocol, setProtocol] = useState({ id: "", datetime: "" });
  const [copied, setCopied] = useState(false);

  // Trava scroll do body enquanto modal está aberto
  useEffect(() => {
    if (submitStatus === "success") {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) window.scrollTo(0, -parseInt(scrollY || "0", 10));
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [submitStatus]);

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

  // Animação GSAP — usa refs diretos para não depender de seletores globais
  useGSAP(() => {
    if (submitStatus === "success" && successRef.current) {
      const backdrop = successRef.current.querySelector(".modal-backdrop");
      const card = successRef.current.querySelector(".modal-card");
      const items = successRef.current.querySelectorAll(".modal-item");
      if (!backdrop || !card) return;
      const tl = gsap.timeline();
      tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(
          card,
          { y: 36, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "power4.out" },
          "-=0.15",
        )
        .from(
          items,
          { y: 14, opacity: 0, stagger: 0.07, duration: 0.3 },
          "-=0.15",
        );
    }
  }, [submitStatus]);

  const copyProtocol = useCallback(() => {
    navigator.clipboard.writeText(`${protocol.id} — ${protocol.datetime}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [protocol]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    let formatted = val;
    if (val.length > 2) formatted = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    if (val.length > 7)
      formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 3)
      newErrors.name = "Insira um nome completo válido.";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/i;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Use um e-mail válido terminado em .com ou .com.br";
    if (formData.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Insira um telefone válido com DDD.";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Descreva sua demanda com mais detalhes.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const generated = buildProtocol();
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setProtocol(generated);
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const handleReset = useCallback(() => {
    setSubmitStatus("idle");
    setErrors({});
  }, []);

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
          0%   { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%)  skewX(-15deg); }
        }
        .animate-shimmer-fast { animation: shimmer-fast 1.5s infinite linear; }

        /* ── Modal root: fixo, acima de tudo, safe-area para notch/home bar ── */
        .kq-modal-root {
          position: fixed !important;
          inset: 0 !important;
          z-index: 99999 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: env(safe-area-inset-top, 0px)
                   env(safe-area-inset-right, 0px)
                   env(safe-area-inset-bottom, 0px)
                   env(safe-area-inset-left, 0px);
        }

        /* ── Backdrop ── */
        .kq-modal-backdrop {
          position: absolute !important;
          inset: 0;
          background: rgba(2, 6, 23, 0.97);
          -webkit-backdrop-filter: blur(18px);
          backdrop-filter: blur(18px);
        }

        /* ── Card mobile: tela cheia com borda cyan ── */
        .kq-modal-card {
          position: relative;
          z-index: 1;
          width: calc(100% - 24px);
          max-height: calc(100vh - 48px);
          max-height: calc(100dvh - 48px); /* dynamic viewport height */
          background: #0f172a;
          border: 2px solid rgba(6, 182, 212, 0.4);
          border-radius: 1.75rem;
          box-shadow: 0 0 0 1px rgba(6,182,212,0.08),
                      0 32px 80px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ── Card desktop: mais largo, bordas maiores ── */
        @media (min-width: 640px) {
          .kq-modal-card {
            width: 100%;
            max-width: 460px;
            border-radius: 2.5rem;
            border-color: rgba(255, 255, 255, 0.12);
          }
        }

        /* ── Scroll interno do modal ── */
        .kq-modal-scroll {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          flex: 1;
        }
      `}</style>

      {/* ════════════════════════════════════════
          MODAL DE SUCESSO
      ════════════════════════════════════════ */}
      {submitStatus === "success" && (
        <div ref={successRef} className="kq-modal-root">
          {/* Backdrop — bloqueia toque no conteúdo por baixo */}
          <div
            className="modal-backdrop kq-modal-backdrop"
            onTouchMove={(e) => e.preventDefault()}
          />

          <div className="modal-card kq-modal-card">
            {/* Barra decorativa topo */}
            <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-700" />

            {/* Botão fechar — área de toque mínima 44×44px */}
            <button
              onClick={handleReset}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 active:bg-white/15 transition-colors"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>

            {/* Conteúdo scrollável */}
            <div className="kq-modal-scroll px-5 py-7 sm:px-10 sm:py-11 flex flex-col gap-6">
              {/* Ícone + Título */}
              <div className="modal-item flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
                  <div className="relative w-[68px] h-[68px] bg-slate-800 border-2 border-cyan-500/50 rounded-[1.5rem] flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[1.6rem] sm:text-4xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-2">
                    Demanda <br />
                    <span className="text-cyan-400">Protocolada.</span>
                  </h3>
                  <p className="text-slate-400 text-sm font-medium max-w-[240px] mx-auto leading-snug">
                    Sua mensagem foi entregue com sucesso à nossa divisão
                    técnica.
                  </p>
                </div>
              </div>

              {/* Protocolo — Lab Receipt */}
              <div className="modal-item bg-slate-950/80 border border-white/8 rounded-2xl overflow-hidden">
                {/* Header do receipt */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <FileSearch className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em]">
                      Protocolo de Atendimento
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">
                      Ativo
                    </span>
                  </div>
                </div>

                {/* ID */}
                <div className="px-4 pt-4 pb-3">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    ID
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight truncate">
                      {protocol.id}
                    </span>
                    <button
                      onClick={copyProtocol}
                      aria-label="Copiar protocolo"
                      className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-cyan-600 active:scale-90 rounded-xl transition-all shadow-lg shadow-cyan-900/40"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Data / Hora */}
                <div className="px-4 pb-4 pt-3 border-t border-white/5">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                    Data / Hora
                  </p>
                  <p className="text-sm font-mono font-semibold text-cyan-300 tracking-wide">
                    {protocol.datetime}
                  </p>
                </div>
              </div>

              {/* Info técnica */}
              <div className="modal-item flex items-start gap-3 px-4 py-4 rounded-2xl bg-white/5 border border-white/5">
                <Zap className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  <strong className="text-white uppercase tracking-wider block mb-1 text-[10px]">
                    Próximo Passo:
                  </strong>
                  Nossa engenharia comercial analisará sua demanda e retornará
                  em até <span className="text-white font-bold">24h úteis</span>
                  .
                </p>
              </div>

              {/* CTA */}
              <div className="modal-item pb-1">
                <button
                  onClick={handleReset}
                  className="w-full h-13 sm:h-14 py-4 bg-white active:bg-cyan-500 text-slate-950 active:text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                  Novo Atendimento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          FORMULÁRIO PRINCIPAL
      ════════════════════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`relative bg-white rounded-[2rem] border-2 border-slate-200 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-out overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-600 via-cyan-400 to-slate-900 z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative">
            {/* Painel formulário */}
            <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 lg:border-r border-slate-100 flex flex-col">
              <header className="mb-8">
                <div className="flex items-center gap-2 text-cyan-600 mb-3">
                  <Zap className="w-4 h-4 fill-current animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Priority Request
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none mb-4">
                  Sintetize seu <br />
                  <span className="text-cyan-600">Sucesso.</span>
                </h2>
                <p className="text-slate-600 text-sm font-medium italic">
                  Preencha os dados técnicos abaixo para iniciar o protocolo de
                  atendimento.
                </p>
              </header>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 sm:space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Seu nome *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      autoComplete="name"
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                      }}
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.name ? "border-red-400" : "border-slate-200"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base`}
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
                      autoComplete="email"
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email)
                          setErrors((p) => ({ ...p, email: "" }));
                      }}
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.email ? "border-red-400" : "border-slate-200"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base`}
                      placeholder="email@corporativo.com.br"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1 group-focus-within:text-cyan-600 transition-colors">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      autoComplete="tel"
                      onChange={handlePhoneChange}
                      className={`w-full h-14 px-0 bg-transparent border-b-2 ${errors.phone ? "border-red-400" : "border-slate-200"} focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base`}
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
                      autoComplete="organization"
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full h-14 px-0 bg-transparent border-b-2 border-slate-200 focus:border-cyan-600 text-slate-900 font-bold transition-all outline-none text-base"
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
                        setErrors((p) => ({ ...p, message: "" }));
                    }}
                    className={`w-full p-4 sm:p-5 rounded-xl bg-slate-50 border-2 ${errors.message ? "border-red-400" : "border-transparent"} focus:border-cyan-600 focus:bg-white text-slate-900 font-medium transition-all outline-none resize-none text-base`}
                    placeholder="Descreva a demanda química ou necessidades de sua linha..."
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider pl-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative overflow-hidden w-full sm:w-max sm:px-14 h-14 sm:h-16 rounded-xl text-white font-black italic uppercase text-sm tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 group ${
                      isSubmitting
                        ? "bg-slate-950 pointer-events-none shadow-inner shadow-cyan-900/50"
                        : "bg-slate-900 active:bg-cyan-600 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]"
                    }`}
                  >
                    {isSubmitting && (
                      <>
                        <div className="absolute inset-0 bg-slate-900">
                          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-sm animate-shimmer-fast" />
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

            {/* Sidebar */}
            <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 md:p-12 text-white flex flex-col justify-between relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.08),transparent_70%)]" />

              <div className="relative z-10 space-y-8 sm:space-y-10">
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

                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg
                          className="w-5 h-5 text-cyan-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      ),
                      label: "Atendimento",
                      value: "Seg-Sex: 8h-18h (GMT-3)",
                    },
                    {
                      icon: <Zap className="w-5 h-5 text-cyan-400" />,
                      label: "Tempo de Resposta",
                      value: "Primeiro contato em até 24h úteis",
                    },
                    {
                      icon: (
                        <svg
                          className="w-5 h-5 text-cyan-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ),
                      label: "Experiência",
                      value: "35+ anos de mercado",
                    },
                    {
                      icon: <FlaskConical className="w-5 h-5 text-cyan-400" />,
                      label: "Formulações",
                      value: "500+ desenvolvidas",
                    },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-11 h-11 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                        {icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                      Certificações Oficiais
                    </p>
                    <div className="flex items-center gap-6">
                      <img
                        src="/assets/anvisa.webp"
                        alt="ANVISA"
                        className="w-12 h-12 object-contain"
                      />
                      <img
                        src="/assets/iso.webp"
                        alt="ISO 9001"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
                <a
                  href={`mailto:${companyInfo.salesEmail}`}
                  className="flex items-center gap-4 group active:opacity-80 transition-opacity"
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/20 transition-all">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      E-mail Comercial
                    </p>
                    <p className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                      {companyInfo.salesEmail}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex justify-between items-center w-full gap-2 sm:gap-6">
          <p className="text-[7px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
            Kuality Chemistry Solutions © 2026
          </p>
          <div className="h-px flex-1 bg-slate-300 mx-2 sm:mx-4" />
          <p className="text-[7px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
            Those who understand, seek Kuality.
          </p>
        </div>
      </div>
    </section>
  );
}
