import { BadgeCheck, Banknote, Zap, Users, HeartHandshake } from "lucide-react";

const points = [
  { icon: BadgeCheck, title: "Gwarancja na naprawy", desc: "Każda usługa objęta pisemną gwarancją serwisową." },
  { icon: Banknote, title: "Uczciwe ceny", desc: "Transparentny cennik, bez ukrytych kosztów i niespodzianek." },
  { icon: Zap, title: "Ekspresowy serwis", desc: "Większość napraw w ciągu 24 godzin od przyjęcia auta." },
  { icon: Users, title: "Doświadczony zespół", desc: "Mechanicy z 15+ letnim doświadczeniem w branży." },
  { icon: HeartHandshake, title: "Indywidualne podejście", desc: "Doradzamy szczerze i traktujemy każde auto z troską." },
];

export function WhyUs() {
  return (
    <section id="dlaczego-my" className="relative py-24 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Dlaczego my
          </span>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Pięć powodów, dla których <span className="text-gradient">wracają do nas</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((p, i) => (
            <div
              key={p.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-7 backdrop-blur transition-all duration-500 hover:border-primary/60 hover:-translate-y-2 hover:shadow-elegant"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-700 group-hover:bg-primary/30 group-hover:scale-125" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}