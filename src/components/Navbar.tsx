import { useState, useEffect, useRef, useCallback } from "react";

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "sobre", "produtos", "qualidade", "contato"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setActiveSection(entry.target.id);
            updateIndicator(entry.target.id);
          }
        });
      },
      { threshold: [0.3, 0.5, 0.7] },
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const updateIndicator = useCallback((sectionId: string) => {
    if (!navRef.current || !indicatorRef.current) return;

    const activeItem = navRef.current.querySelector(
      `[data-section="${sectionId}"]`,
    ) as HTMLElement;
    if (!activeItem) return;

    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const left = itemRect.left - navRect.left;
    const width = itemRect.width;

    indicatorRef.current.style.left = `${left}px`;
    indicatorRef.current.style.width = `${width}px`;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => updateIndicator(activeSection), 200);
    window.addEventListener("resize", () => updateIndicator(activeSection));
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", () =>
        updateIndicator(activeSection),
      );
    };
  }, [activeSection, updateIndicator]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Início", href: "hero" },
    { label: "Sobre", href: "sobre" },
    { label: "Produtos", href: "produtos" },
    { label: "Qualidade", href: "qualidade" },
    { label: "Contato", href: "contato" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(href);
    setTimeout(() => updateIndicator(href), 100);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
          <a
            href="#hero"
            onClick={(e) => handleNavClick("hero", e)}
            className="flex items-center"
          >
            <img
              src="/assets/logo.webp"
              alt="Kuality Química"
              className="h-9 md:h-10 lg:h-11 w-auto"
            />
          </a>

          <div ref={navRef} className="hidden lg:flex items-center">
            <div className="relative flex items-center bg-slate-800/50 rounded-full p-1 backdrop-blur-sm">
              <div
                ref={indicatorRef}
                className="absolute top-1 bottom-1 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 ease-out"
                style={{
                  left: "4px",
                  width: "50px",
                  opacity: 1,
                }}
              />

              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.href}`} // CORREÇÃO: Adicionado href para SEO e rastreabilidade
                  data-section={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    activeSection === item.href
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contato"
              onClick={(e) => handleNavClick("contato", e)}
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              Orçamento
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white relative z-[10000]"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          position: "fixed",
          top: "100%",
          left: 0,
          right: 0,
          background: "rgba(15, 23, 42, 0.98)",
          backdropFilter: "blur(12px)",
          maxHeight: mobileMenuOpen ? "100vh" : "0",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.href}`}
              onClick={(e) => handleNavClick(item.href, e)}
              className={`block px-4 py-4 rounded-xl text-base font-medium transition-colors ${
                activeSection === item.href
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={(e) => handleNavClick("contato", e)}
            className="block w-full text-center px-4 py-4 mt-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </nav>
  );
}
