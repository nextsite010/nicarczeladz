import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/nicar-logo.png";

const links = [
  { to: "/", label: "Start" },
  { to: "/o-nas", label: "O nas" },
  { to: "/uslugi", label: "Usługi" },
  { to: "/opinie", label: "Opinie" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link
          to="/"
          aria-label="Nicar Auto Serwis — strona główna"
          onClick={() => setOpen(false)}
          className="group transition-transform duration-300 hover:scale-[1.03]"
        >
          <img
            src={logo}
            alt="Nicar Auto Serwis — logo"
            className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,138,61,0.25)]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:scale-x-0 after:origin-right after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+48730020887"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 md:px-5 md:py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline">Zadzwoń teraz</span>
            <span className="sm:hidden">Zadzwoń</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/40 text-foreground transition hover:border-primary/60 hover:text-primary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[64px] z-40 origin-top transition-all duration-300 ${
          open ? "opacity-100 scale-y-100" : "pointer-events-none opacity-0 scale-y-95"
        }`}
      >
        <nav className="mx-4 mt-2 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-elegant p-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-primary bg-primary/10" }}
              className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}