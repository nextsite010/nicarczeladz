import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    name: "Marek K.",
    role: "Czeladź",
    text: "Najlepszy warsztat w okolicy. Rzetelna diagnoza, uczciwa cena i naprawa w jeden dzień. Polecam każdemu!",
  },
  {
    name: "Anna S.",
    role: "Będzin",
    text: "Wreszcie mechanicy, którym mogę zaufać. Wszystko wytłumaczone, bez naciągania. Wracam i polecam dalej.",
  },
  {
    name: "Tomasz W.",
    role: "Sosnowiec",
    text: "Profesjonalna obsługa od początku do końca. Auto pojechało jak nowe, a cena bardzo rozsądna.",
  },
  {
    name: "Karolina M.",
    role: "Czeladź",
    text: "Szybko, fachowo i bez niespodzianek przy płatności. Najlepsze doświadczenie z warsztatem od lat.",
  },
  {
    name: "Piotr Z.",
    role: "Katowice",
    text: "Diagnostyka na najwyższym poziomie. Znaleźli usterkę, której nie wykrył inny serwis. Wielki szacunek.",
  },
];

export function Reviews() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % reviews.length);
  const prev = () => setI((p) => (p - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="opinie" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-40" />
      <div className="container relative mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Opinie klientów
          </span>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Zaufały nam <span className="text-gradient">tysiące kierowców</span>
          </h2>
          <div className="reveal mt-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-semibold">
              4.9 / 5
            </span>
            <span className="text-sm text-muted-foreground">
              · 98 opinii
            </span>
          </div>
        </div>

        <div className="reveal mt-14 max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-border/60 bg-card/60 p-8 md:p-12 backdrop-blur shadow-card">
            <Quote className="absolute -top-5 left-8 h-12 w-12 text-primary/40" />

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${i * 100}%)` }}
              >
                {reviews.map((r) => (
                  <div key={r.name} className="w-full shrink-0 px-2">
                    <div className="flex justify-center gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-center text-lg md:text-xl leading-relaxed text-foreground/90">
                      „{r.text}"
                    </p>
                    <div className="mt-7 text-center">
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-sm text-muted-foreground">{r.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Poprzednia opinia"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Opinia ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      idx === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Następna opinia"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}