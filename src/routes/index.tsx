import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Reviews } from "@/components/site/Reviews";
import { WhyUs } from "@/components/site/WhyUs";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nicar Auto Serwis — Profesjonalny warsztat w Czeladzi" },
      {
        name: "description",
        content:
          "Nicar Auto Serwis w Czeladzi — szybka diagnoza, uczciwe ceny i doświadczeni mechanicy. Mechanika, diagnostyka, opony, klimatyzacja. Zadzwoń i umów wizytę.",
      },
      { property: "og:title", content: "Nicar Auto Serwis — Warsztat samochodowy w Czeladzi" },
      {
        property: "og:description",
        content: "Profesjonalny serwis samochodowy w Czeladzi. Szybka diagnoza, uczciwe ceny, doświadczeni mechanicy.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SectionMore to="/o-nas" label="Poznaj nas bliżej" />
        <Services />
        <SectionMore to="/uslugi" label="Zobacz pełną ofertę usług" />
        <Reviews />
        <SectionMore to="/opinie" label="Czytaj wszystkie opinie" />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function SectionMore({ to, label }: { to: "/o-nas" | "/uslugi" | "/opinie"; label: string }) {
  return (
    <div className="container mx-auto -mt-8 mb-4 px-4 md:px-8 text-center">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
