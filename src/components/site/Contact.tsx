import { Phone, MapPin, Clock, Mail } from "lucide-react";

const hours = [
  { d: "Poniedziałek – Piątek", h: "08:00 – 18:00" },
  { d: "Sobota", h: "09:00 – 14:00" },
  { d: "Niedziela", h: "Zamknięte" },
];

export function Contact() {
  return (
    <section id="kontakt" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-50" />
      <div className="container relative mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Kontakt
          </span>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Umów wizytę <span className="text-gradient">już dziś</span>
          </h2>
          <p className="reveal mt-5 text-muted-foreground">
            Zadzwoń, a doradzimy najlepsze rozwiązanie dla Twojego auta.
          </p>
        </div>

        {/* Big phone CTA */}
        <div className="reveal mt-12 mx-auto max-w-3xl">
          <a
            href="tel:+48730020887"
            className="group relative block overflow-hidden rounded-3xl border border-primary/40 bg-gradient-primary p-8 md:p-10 text-center shadow-elegant transition-all duration-500 hover:scale-[1.02] hover:shadow-glow"
          >
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-primary-foreground">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/20 backdrop-blur transition-transform group-hover:rotate-12 group-hover:scale-110">
                <Phone className="h-8 w-8" />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-[0.25em] opacity-80">
                  Zadzwoń teraz
                </div>
                <div className="text-3xl md:text-5xl font-bold tracking-tight">
                  +48 730 020 887
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          <div className="reveal rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Adres</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Kamienna 12<br />
              41-250 Czeladź
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Godziny otwarcia</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {hours.map((h) => (
                <li key={h.d} className="flex justify-between gap-3">
                  <span>{h.d}</span>
                  <span className="text-foreground/90">{h.h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Kontakt</h3>
            <a
              href="tel:+48730020887"
              className="mt-2 block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              +48 730 020 887
            </a>
            <a
              href="mailto:kontakt@nicarautoserwis.pl"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              kontakt@nicarautoserwis.pl
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="reveal mt-10 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <iframe
            title="Mapa lokalizacji Nicar Auto Serwis — Kamienna 12, Czeladź"
            src="https://www.google.com/maps?q=Kamienna+12,+41-250+Czelad%C5%BA&output=embed"
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}