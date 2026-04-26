import { Wrench, Gauge, Disc3, Wind, Battery, CircleDot, Sparkles, ShieldCheck } from "lucide-react";

const items = [
  { icon: Wrench, label: "Mechanika" },
  { icon: Gauge, label: "Diagnostyka" },
  { icon: Disc3, label: "Opony" },
  { icon: Wind, label: "Klimatyzacja" },
  { icon: Battery, label: "Elektryka" },
  { icon: CircleDot, label: "Geometria" },
  { icon: Sparkles, label: "Detailing" },
  { icon: ShieldCheck, label: "Gwarancja" },
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/30 py-5">
      <div className="absolute inset-0 bg-diagonal-stripes opacity-40" />
      <div className="relative flex animate-marquee whitespace-nowrap">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-8 text-foreground/70">
            <it.icon className="h-5 w-5 text-primary" />
            <span className="font-stencil text-sm md:text-base">{it.label}</span>
            <span className="text-primary/50">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}