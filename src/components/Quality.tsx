import { useRef, useEffect } from "react";
import { qualityTestsList, qualityContent } from "../data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  FlaskConical,
  Microscope,
  FileText,
  CheckCircle2,
  Award,
  TrendingUp,
  Globe,
  Clock,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Design Tokens & Textures
const R = {
  50: "#fff1f2",
  100: "#ffe4e6",
  200: "#fecdd3",
  400: "#fb7185",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
  950: "#450a0a",
};

const grain: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
  backgroundSize: "180px 180px",
};

// Hook - Count Up Animation
function useCountUp(
  numRef: React.RefObject<HTMLSpanElement>,
  target: number,
  suffix: string,
  triggerRef: React.RefObject<HTMLElement>,
) {
  useEffect(() => {
    if (!numRef.current || !triggerRef.current) return;
    const proxy = { v: 0 };
    const anim = gsap.to(proxy, {
      v: target,
      duration: 2.6,
      ease: "expo.out",
      paused: true,
      onUpdate: () => {
        if (numRef.current)
          numRef.current.textContent = Math.round(proxy.v) + suffix;
      },
    });
    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 78%",
      once: true,
      onEnter: () => anim.play(),
    });
    return () => {
      st.kill();
      anim.kill();
    };
  }, [target, suffix, numRef, triggerRef]);
}

function SectionGeometry() {
  const root = useRef<HTMLDivElement>(null);
  const shapeA = useRef<HTMLDivElement>(null);
  const shapeB = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        shapeA.current,
        { x: "-130%", opacity: 0 },
        {
          x: "-12%",
          opacity: 1,
          duration: 1.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.to(shapeB.current, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        ref={shapeA}
        className="absolute top-[-15%] left-0 w-[165%] h-[145%]"
        style={{
          background: `linear-gradient(140deg, ${R[50]} 0%, ${R[100]}60 100%)`,
          clipPath: "polygon(0 0, 66% 0, 26% 100%, 0% 100%)",
        }}
      />
      <div
        ref={shapeB}
        className="absolute top-[15%] right-[4%] w-72 h-72 rounded-full"
        style={{
          background: `radial-gradient(circle, ${R[500]}12, transparent 70%)`,
        }}
      />
    </div>
  );
}

function StatCard({
  value,
  suffix,
  label,
  sublabel,
  icon: Icon,
  triggerRef,
}: any) {
  const card = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useCountUp(num, value, suffix, triggerRef);

  useEffect(() => {
    const el = card.current,
      gl = glow.current;
    if (!el || !gl) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      const dx = (x / r.width - 0.5) * 2,
        dy = (y / r.height - 0.5) * 2;
      gsap.to(el, {
        rotateY: dx * 11,
        rotateX: -dy * 11,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 900,
      });
      gsap.to(gl, {
        x: x - r.width / 2,
        y: y - r.height / 2,
        opacity: 1,
        duration: 0.25,
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "elastic.out(1, 0.35)",
      });
      gsap.to(gl, { opacity: 0, duration: 0.5 });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!bar.current || !triggerRef.current) return;
    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 78%",
      once: true,
      onEnter: () =>
        gsap.fromTo(
          bar.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "expo.out",
            transformOrigin: "left",
          },
        ),
    });
    return () => st.kill();
  }, [triggerRef]);

  return (
    <div
      ref={card}
      className="relative rounded-2xl p-5 md:p-6 overflow-hidden cursor-default select-none bg-white transition-shadow"
      style={{
        border: `1px solid ${R[100]}`,
        boxShadow: `0 2px 28px 0 ${R[200]}55`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={glow}
        className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${R[400]}50, transparent 70%)`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ background: R[50], border: `1px solid ${R[100]}` }}
      >
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
      </div>
      <div className="relative z-10 mb-1">
        <span
          ref={num}
          className="text-3xl md:text-4xl font-black tracking-tighter"
          style={{ color: R[800] }}
        >
          0{suffix}
        </span>
      </div>
      <div className="relative z-10">
        <p
          className="text-[10px] md:text-xs font-black uppercase tracking-widest"
          style={{ color: R[900] }}
        >
          {label}
        </p>
        <p className="text-[9px] md:text-[10px] font-medium mt-0.5 text-slate-500 leading-snug">
          {sublabel}
        </p>
      </div>
      <div
        ref={bar}
        className="absolute bottom-0 left-0 h-[3px] w-full rounded-b-2xl"
        style={{
          background: `linear-gradient(90deg, ${R[500]}, ${R[700]})`,
          transformOrigin: "left",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}

const CERTS = [
  {
    code: "ISO 9001",
    subtitle: "Gestão da Qualidade",
    tag: "Internacional",
    body: "Norma internacional que valida nosso sistema de gestão completo.",
  },
  {
    code: "UKAS",
    subtitle: "Acreditação Britânica",
    tag: "Global",
    body: "Reconhecimento entre os mais rigorosos do mundo para competência técnica.",
  },
  {
    code: "INMETRO",
    subtitle: "Metrologia Nacional",
    tag: "Nacional",
    body: "Certificação que atesta conformidade com padrões metrológicos brasileiros.",
  },
];

function CertList() {
  const wrap = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".cert-item",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.14,
          scrollTrigger: { trigger: wrap.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".cert-code",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.14,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: wrap.current, start: "top 80%" },
        },
      );
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="lg:col-span-5 space-y-4 mb-20px">
      <div className="flex items-center pt-20 gap-2 mb-2" style={{ color: R[600] }}>
        <Award className="w-4 h-4" />
        <span className="text-[10px] text-slate-900 font-black uppercase tracking-[0.3em]">
          Nossas Certificações5
        </span>
      </div>
      {CERTS.map((cert, i) => (
        <div
          key={i}
          className="cert-item group relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-red-100 transition-all"
          style={{ background: i % 2 === 0 ? R[50] : "white" }}
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, {
              x: 5,
              boxShadow: `0 8px 32px -4px ${R[200]}99`,
              duration: 0.3,
            })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { x: 0, boxShadow: "none", duration: 0.6 })
          }
        >
          <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-red-400 to-red-700" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="cert-code text-sm md:text-base font-black text-red-800">
                {cert.code}
              </span>
              <span className="text-[8px] font-black uppercase bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                {cert.tag}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase italic text-slate-900">
              {cert.subtitle}
            </p>
            <p className="text-[9px] font-medium mt-1 text-slate-800 leading-relaxed">
              {cert.body}
            </p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
        </div>
      ))}
      <div className="relative mt-2 rounded-2xl p-6 bg-gradient-to-br from-red-800 to-red-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={grain} />
        <p className="relative z-10 text-xs md:text-sm font-bold text-red-100 leading-relaxed">
          A qualidade não é um departamento — é a{" "}
          <span className="text-white">espinha dorsal</span> de tudo o que
          fabricamos.
        </p>
        <p className="relative z-10 text-[9px] font-black uppercase tracking-widest mt-3 text-red-400">
          — Missão Kuality Química
        </p>
      </div>
    </div>
  );
}

const STATS = [
  {
    value: 35,
    suffix: "+",
    label: "Anos de Excelência",
    sublabel: "Trajetória no setor químico, Salto/SP",
    icon: Clock,
  },
  {
    value: 100,
    suffix: "%",
    label: "Conformidade",
    sublabel: "Lotes auditados sem ressalvas",
    icon: ShieldCheck,
  },
  {
    value: 3,
    suffix: "",
    label: "Selos Globais",
    sublabel: "ISO 9001 · UKAS · INMETRO",
    icon: Globe,
  },
  {
    value: 98,
    suffix: "%",
    label: "Aprovação",
    sublabel: "Taxa em 1ª inspeção industrial",
    icon: TrendingUp,
  },
];

export default function Quality() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".title-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.95,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: ".qual-header", start: "top 88%" },
        },
      );
      gsap.fromTo(
        ".quality-card",
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: { trigger: ".quality-grid", start: "top 88%" },
        },
      );
      gsap.fromTo(
        statsRef.current,
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".stat-card",
        { y: 65, opacity: 0, scale: 0.91 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".h-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="qualidade"
      className="py-14 md:py-28 bg-slate-50 relative overflow-hidden"
    >
      <SectionGeometry />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10">
        <header className="qual-header mb-10 md:mb-20">
          <div className="flex items-center gap-2 mb-3 text-red-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.32em]">
              Garantia de Performance
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic leading-tight text-slate-900">
            {["Controle", "de"].map((w, i) => (
              <span key={i} className="title-word inline-block mr-3">
                {w}
              </span>
            ))}
            <br className="hidden md:block" />
            <span className="title-word text-red-600 mr-3">Qualidade</span>
            <span className="title-word">Superior.</span>
          </h2>
        </header>

        <div className="quality-grid grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="quality-card relative rounded-[1.75rem] md:rounded-[2.5rem] p-6 md:p-10 text-white overflow-hidden bg-slate-900 flex-1"
              style={{ boxShadow: `0 28px 64px -14px ${R[900]}55` }}
            >
              <div className="absolute inset-0 opacity-10" style={grain} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <FlaskConical className="w-4 h-4 text-red-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-red-400">
                    Engenharia Aplicada
                  </span>
                </div>
                <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter mb-5 text-white">
                  Nosso Processo de Validação
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-400 mb-5">
                  {qualityContent?.process}
                </p>
                <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700 border-l-red-500 border-l-4">
                  <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">
                    Resultado Final
                  </p>
                  <p className="text-xs md:text-sm font-bold text-white">
                    {qualityContent?.result}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="quality-card rounded-[1.75rem] md:rounded-[2.5rem] p-6 md:p-10 bg-white border border-slate-200 shadow-xl flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="w-4 h-4 text-red-600" />
                <h3 className="text-sm md:text-xl font-black uppercase italic tracking-tighter text-slate-900">
                  Protocolos de Laboratório
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(qualityTestsList || []).map((test, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-red-50 hover:border-red-100 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-black uppercase text-slate-900">
                        {test.nome}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight">
                        {test.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="quality-card relative rounded-2xl p-5 md:p-7 flex items-center justify-between bg-gradient-to-r from-red-700 to-red-900 shadow-lg cursor-pointer hover:scale-[1.018] transition-transform">
              <div className="absolute inset-0 opacity-10" style={grain} />
              <div className="relative z-10">
                <span className="text-white font-black uppercase italic text-sm md:text-base tracking-tighter">
                  Laudo Técnico Oficial
                </span>
                <span className="block font-bold text-[9px] uppercase tracking-[0.2em] text-red-200/60 mt-0.5">
                  Rastreabilidade completa · Garantia de Procedência
                </span>
              </div>
              <FileText className="relative z-10 w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div ref={statsRef} className="mt-16 md:mt-28">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-rule flex-1 h-px bg-gradient-to-r from-red-400 to-slate-200" />
            <div className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em]">
                Números que Comprovam
              </span>
            </div>
            <div className="h-rule flex-1 h-px bg-gradient-to-l from-red-400 to-slate-200" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-start">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="text-7xl md:text-8xl font-black tracking-tighter text-red-50/50"
                  style={{ WebkitTextStroke: `2px ${R[200]}` }}
                >
                  35+
                </span>
                <div>
                  <h3 className="text-xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-tight">
                    Anos de Ciência,
                    <br />
                    <span className="text-red-600">Zero Concessões.</span>
                  </h3>
                  <p className="text-xs md:text-sm font-medium mt-2 max-w-sm text-slate-800">
                    Compromisso inabalável com a qualidade que o seu processo
                    merece.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s, i) => (
                  <StatCard key={i} {...s} triggerRef={statsRef} />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-1 justify-center">
                {[
                  "Salto / SP",
                  "Mercado Industrial",
                  "Assessoria Inclusa",
                  "Entrega Ágil",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-white text-black-700 border border-red-100 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <CertList />
          </div>
        </div>
      </div>
    </section>
  );
}
