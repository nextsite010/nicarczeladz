import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import logo from "@/assets/nicar-logo.png";

const links = [
  { href: "#o-nas", label: "O nas" },
  { href: "#uslugi", label: "Usługi" },
  { href: "#opinie", label: "Opinie" },
  { href: "#dlaczego-my", label: "Dlaczego my" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <a
          href="#top"
          aria-label="Nicar Auto Serwis — strona główna"
          className="group transition-transform duration-300 hover:scale-[1.03]"
        >
          <img
            src={logo}
            alt="Nicar Auto Serwis — logo"
            className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,138,61,0.25)]"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:scale-x-0 after:origin-right after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+48500000000"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 md:px-5 md:py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all duration-300 hover:scale-105 hover:shadow-glow"
        >
          <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
          <span className="hidden sm:inline">Zadzwoń teraz</span>
          <span className="sm:hidden">Zadzwoń</span>
        </a>
      </div>
    </header>
  );
}