import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Nicar Auto Serwis Czeladź, Kamienna 12" },
      {
        name: "description",
        content:
          "Zadzwoń: 730 020 887. Adres: Kamienna 12, 41-250 Czeladź. Otwarte pon–pt 8–18, sob 9–14. Umów wizytę w warsztacie Nicar.",
      },
      { property: "og:title", content: "Kontakt — Nicar Auto Serwis Czeladź" },
      {
        property: "og:description",
        content: "Telefon, adres, mapa i godziny otwarcia warsztatu Nicar w Czeladzi.",
      },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Kontakt"
          title={<>Jesteśmy <span className="text-gradient">do dyspozycji</span></>}
          description="Zadzwoń, napisz lub przyjedź. Doradzimy najlepsze rozwiązanie dla Twojego auta."
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}