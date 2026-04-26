type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container relative mx-auto px-4 md:px-8 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary animate-fade-in">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight tracking-tight animate-fade-up">
          {title}
        </h1>
        {description && (
          <p
            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-foreground/80 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}