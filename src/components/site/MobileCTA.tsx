import { Phone, Navigation } from "lucide-react";

export function MobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 safe-bottom pointer-events-none">
      <div className="pointer-events-auto mx-3 mb-3 flex gap-2 rounded-2xl border border-primary/40 bg-background/85 backdrop-blur-xl p-2 shadow-elegant">
        <a
          href="tel:+48730020887"
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-glow transition-transform active:scale-95"
        >
          <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
          Zadzwoń
        </a>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Kamienna+12,+41-250+Czelad%C5%BA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/60 px-4 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          <Navigation className="h-4 w-4" />
          Dojazd
        </a>
      </div>
    </div>
  );
}