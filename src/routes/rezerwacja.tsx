import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { MobileCTA } from "@/components/site/MobileCTA";
import { BookingForm } from "@/components/site/BookingForm";

export const Route = createFileRoute("/rezerwacja")({
  head: () => ({
    meta: [
      { title: "Rezerwacja online — Nicar Auto Serwis Czeladź" },
      {
        name: "description",
        content:
          "Zarezerwuj termin wizyty w warsztacie Nicar w Czeladzi online. Wybierz datę i godzinę — potwierdzimy telefonicznie.",
      },
      { property: "og:title", content: "Rezerwacja online — Nicar Auto Serwis" },
      { property: "og:description", content: "Wybierz wolny termin online. Potwierdzimy telefonicznie." },
    ],
  }),
  component: RezerwacjaPage,
});

function RezerwacjaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Rezerwacja online"
          title={<>Wybierz <span className="text-gradient">wolny termin</span></>}
          description="Wybierz datę i godzinę. Skontaktujemy się telefonicznie, żeby potwierdzić rezerwację."
        />
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-industrial opacity-40" />
          <div className="container relative mx-auto px-4 md:px-8 max-w-5xl">
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}