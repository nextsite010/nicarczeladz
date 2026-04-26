import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Reviews } from "@/components/site/Reviews";
import { MobileCTA } from "@/components/site/MobileCTA";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/opinie")({
  head: () => ({
    meta: [
      { title: "Opinie klientów — Nicar Auto Serwis" },
      {
        name: "description",
        content:
          "Ocena 4.9 / 5 na podstawie 98 opinii. Przeczytaj, co o warsztacie Nicar mówią kierowcy z Czeladzi i okolic.",
      },
      { property: "og:title", content: "Opinie o Nicar Auto Serwis — 4.9/5" },
      {
        property: "og:description",
        content: "Tysiące zadowolonych kierowców. Sprawdź autentyczne opinie klientów.",
      },
    ],
  }),
  component: OpiniePage,
});

function OpiniePage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Opinie klientów"
          title={<>4.9 / 5 — <span className="text-gradient">98 opinii</span></>}
          description="Zaufanie kierowców jest naszą najlepszą wizytówką. Zobacz, co mówią o naszej pracy."
        />
        <Reviews />
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-all hover:scale-105 hover:shadow-glow"
            >
              <Phone className="h-5 w-5" /> Dołącz do zadowolonych klientów
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}