import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, Award, Wrench, Clock } from "lucide-react";

const faqs = [
  {
    q: "Ile kosztuje przegląd / naprawa?",
    a: "Każda wycena jest indywidualna i zawsze podawana z góry — bez ukrytych kosztów. Zadzwoń lub wyślij formularz, oddzwonimy z konkretną kwotą w 30 minut.",
  },
  {
    q: "Jak szybko naprawicie moje auto?",
    a: "Większość standardowych usług (wymiana oleju, klocków, opon, diagnostyka) realizujemy tego samego dnia. Większe naprawy zwykle do 24–48 h od dostawy części.",
  },
  {
    q: "Czy dajecie gwarancję na naprawy?",
    a: "Tak. Każda usługa objęta jest pisemną gwarancją serwisową na robociznę oraz gwarancją producenta na zamontowane części.",
  },
  {
    q: "Czy obsługujecie wszystkie marki?",
    a: "Tak — pracujemy zarówno na autach europejskich, azjatyckich jak i amerykańskich. Posiadamy zaawansowane testery diagnostyczne dla wszystkich popularnych marek.",
  },
  {
    q: "Czy mogę zostawić auto przed otwarciem?",
    a: "Oczywiście. Skontaktuj się z nami wcześniej — udostępnimy Ci możliwość bezpiecznego zostawienia kluczyków poza godzinami pracy.",
  },
  {
    q: "Czy wystawiacie faktury VAT?",
    a: "Tak, wystawiamy faktury VAT dla firm oraz paragony dla klientów indywidualnych.",
  },
];

const guarantees = [
  { icon: ShieldCheck, t: "Gwarancja na robociznę", d: "Pisemna, każde zlecenie" },
  { icon: Award, t: "Oryginalne części", d: "Lub równoważnik wysokiej jakości" },
  { icon: Wrench, t: "Doświadczeni mechanicy", d: "5 lat w branży" },
  { icon: Clock, t: "Termin pod kontrolą", d: "Naprawa w ustalonym czasie" },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 bg-grid-industrial opacity-40" />
      <div className="container relative mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Gwarancja & FAQ
          </span>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Pełna jasność. <span className="text-gradient">Zero niespodzianek.</span>
          </h2>
        </div>

        <div className="reveal mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {guarantees.map((g) => (
            <div
              key={g.t}
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card/50 p-5 backdrop-blur transition-all hover:border-primary/60 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{g.t}</h3>
              <p className="mt-1 text-sm text-foreground/70">{g.d}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 max-w-3xl mx-auto rounded-3xl border border-border/60 bg-card/50 backdrop-blur p-3 md:p-6 shadow-card">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-primary px-3">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 text-base leading-relaxed px-3">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}