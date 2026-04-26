import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { MobileCTA } from "@/components/site/MobileCTA";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nas — Nicar Auto Serwis Czeladź" },
      {
        name: "description",
        content:
          "Poznaj zespół Nicar Auto Serwis w Czeladzi — 5 lat doświadczenia, certyfikowani mechanicy, uczciwe ceny i pasja do motoryzacji.",
      },
      { property: "og:title", content: "O nas — Nicar Auto Serwis Czeladź" },
      {
        property: "og:description",
        content: "Doświadczony zespół mechaników z Czeladzi — uczciwe ceny, gwarancja jakości.",
      },
    ],
  }),
  component: OnasPage,
});

function OnasPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <PageHero
          eyebrow="O nas"
          title={<>Pasjonaci motoryzacji <span className="text-gradient">z Czeladzi</span></>}
          description="Od 5 lat dbamy o auta naszych klientów. Łączymy doświadczenie, nowoczesny sprzęt i uczciwe podejście."
        />
        <About />
        <WhyUs />
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-all hover:scale-105 hover:shadow-glow"
            >
              <Phone className="h-5 w-5" /> Umów wizytę
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}