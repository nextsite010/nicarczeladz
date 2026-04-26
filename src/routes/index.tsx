import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Reviews } from "@/components/site/Reviews";
import { WhyUs } from "@/components/site/WhyUs";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

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
        <Services />
        <Reviews />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
