import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Services } from "@/components/site/Services";
import { QuickQuote } from "@/components/site/QuickQuote";
import { Faq } from "@/components/site/Faq";
import { MobileCTA } from "@/components/site/MobileCTA";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/uslugi")({
  head: () => ({
    meta: [
      { title: "Usługi — Nicar Auto Serwis Czeladź" },
      {
        name: "description",
        content:
          "Mechanika, diagnostyka komputerowa, opony, klimatyzacja, geometria, elektryka — pełen zakres usług warsztatu Nicar w Czeladzi.",
      },
      { property: "og:title", content: "Usługi warsztatu Nicar — Czeladź" },
      {
        property: "og:description",
        content: "Pełen zakres usług samochodowych pod jednym dachem. Sprawdź ofertę.",
      },
    ],
  }),
  component: UslugiPage,
});

function UslugiPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Nasze usługi"
          title={<>Wszystko, czego potrzebuje <span className="text-gradient">Twoje auto</span></>}
          description="Od rutynowego przeglądu po kompleksowe naprawy — realizujemy każdy zakres usług w jednym miejscu."
        />
        <Services />
        <QuickQuote />
        <Faq />
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <p className="text-foreground/80 text-lg mb-6">
              Nie znalazłeś swojej usługi? Zadzwoń, doradzimy.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-all hover:scale-105 hover:shadow-glow"
            >
              <Phone className="h-5 w-5" /> Skontaktuj się z nami
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}