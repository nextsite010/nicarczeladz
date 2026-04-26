import {
  Cog,
  Gauge,
  Battery,
  Disc3,
  Wind,
  CircleDot,
  Car,
  Sparkles,
} from "lucide-react";

const services = [
  { icon: Cog, title: "Mechanika pojazdowa", desc: "Naprawy silników, zawieszenia, układu hamulcowego i napędowego." },
  { icon: Gauge, title: "Diagnostyka komputerowa", desc: "Profesjonalne testery do wszystkich marek i modeli." },
  { icon: Disc3, title: "Wymiana opon", desc: "Sezonowa wymiana, wyważanie i przechowywanie opon." },
  { icon: Battery, title: "Elektryka i akumulatory", desc: "Diagnostyka instalacji, wymiana i serwis akumulatorów." },
  { icon: Wind, title: "Klimatyzacja", desc: "Odgrzybianie, napełnianie i naprawa układu klimatyzacji." },
  { icon: CircleDot, title: "Geometria kół", desc: "Precyzyjne ustawienie zbieżności i kątów kół." },
  { icon: Car, title: "Przeglądy okresowe", desc: "Pełen serwis według zaleceń producenta." },
  { icon: Sparkles, title: "Detailing i kosmetyka", desc: "Czyszczenie wnętrza i pielęgnacja lakieru." },
];

export function Services() {
  return (
    <section id="uslugi" className="relative py-24 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Nasze usługi
          </span>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Kompleksowa <span className="text-gradient">obsługa Twojego auta</span>
          </h2>
          <p className="reveal mt-5 text-muted-foreground">
            Od rutynowego przeglądu po skomplikowane naprawy — wszystko pod jednym dachem.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:bg-card hover:shadow-elegant"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow group-hover:scale-110 group-hover:rotate-6">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}