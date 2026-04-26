import { Wrench, ShieldCheck, Clock, Award } from "lucide-react";
import aboutImg from "@/assets/about-mechanic.jpg";

const features = [
  { icon: Wrench, title: "Pełen zakres usług", desc: "Od podstawowego serwisu po skomplikowane naprawy." },
  { icon: ShieldCheck, title: "Gwarancja jakości", desc: "Każda naprawa objęta gwarancją serwisową." },
  { icon: Clock, title: "Szybki termin", desc: "Większość napraw realizujemy w 24h." },
  { icon: Award, title: "Certyfikowani mechanicy", desc: "Zespół z wieloletnim doświadczeniem." },
];

export function About() {
  return (
    <section id="o-nas" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-50" />

      <div className="container relative mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="reveal relative">
          <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <div className="relative overflow-hidden rounded-2xl shadow-card aspect-[4/5] md:aspect-square">
            <img
              src={aboutImg}
              alt="Doświadczony mechanik Nicar Auto Serwis przy pracy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              width={1280}
              height={1280}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block rounded-2xl bg-card border border-border/60 px-6 py-5 shadow-elegant backdrop-blur">
            <div className="text-3xl font-bold text-gradient">15+</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              lat na rynku
            </div>
          </div>
        </div>

        <div>
          <span className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            O nas
          </span>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Pasja do motoryzacji w każdym detalu
          </h2>
          <p className="reveal mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Nicar Auto Serwis to zespół doświadczonych mechaników z Czeladzi, którzy traktują każde auto
            jak własne. Łączymy najnowsze technologie diagnostyczne z tradycyjnym, rzetelnym podejściem
            do klienta. Uczciwe ceny, jasna komunikacja i jakość, do której wracają.
          </p>

          <div className="reveal mt-10 grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group flex gap-4 rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-card/70 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}