import { useEffect, useState } from "react";
import { Phone, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-workshop.jpg";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax animated background */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroImg}
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--gradient-hero-overlay)]" />
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-28 pb-20 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow" />
          Auto Serwis · Czeladź
        </span>

        <h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Profesjonalny serwis <br className="hidden sm:block" />
          samochodowy w <span className="text-gradient">Czeladzi</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Szybka diagnoza, uczciwe ceny, doświadczeni mechanicy. Twoje auto w rękach pasjonatów.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="tel:+48500000000"
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
            Zadzwoń teraz
          </a>
          <a
            href="#uslugi"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-8 py-4 text-base font-medium backdrop-blur transition-all duration-300 hover:border-primary/60 hover:bg-background/60"
          >
            Zobacz usługi
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          {[
            { v: "15+", l: "Lat doświadczenia" },
            { v: "5000+", l: "Zadowolonych klientów" },
            { v: "4.9★", l: "Średnia ocena" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-gradient">{s.v}</div>
              <div className="mt-1 text-[11px] md:text-xs uppercase tracking-wider text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#o-nas"
        aria-label="Przewiń niżej"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}