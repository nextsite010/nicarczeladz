import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Phone, Wrench, Calendar } from "lucide-react";

const services = [
  "Przegląd okresowy",
  "Diagnostyka komputerowa",
  "Wymiana opon",
  "Klimatyzacja",
  "Hamulce",
  "Zawieszenie",
  "Elektryka",
  "Inne",
];

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię").max(60, "Za długie"),
  phone: z
    .string()
    .trim()
    .min(7, "Nieprawidłowy numer")
    .max(20, "Za długi numer")
    .regex(/^[+\d\s-]+$/, "Tylko cyfry, spacje i +"),
  car: z.string().trim().min(2, "Podaj markę i model").max(80, "Za długie"),
  service: z.string().min(1, "Wybierz usługę"),
  notes: z.string().max(500, "Maks. 500 znaków").optional(),
});

type Form = z.infer<typeof schema>;

export function QuickQuote() {
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    car: "",
    service: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof Form, string>> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof Form;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Sprawdź formularz", { description: "Uzupełnij wymagane pola." });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Zgłoszenie wysłane!", {
        description: "Oddzwonimy w ciągu 30 minut. Zapraszamy też pod 730 020 887.",
      });
      setForm({ name: "", phone: "", car: "", service: "", notes: "" });
    }, 700);
  };

  return (
    <section id="wycena" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-industrial opacity-60" />
      <div className="absolute inset-0 bg-radial-glow opacity-50" />
      <div className="container relative mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-2">
            <span className="reveal inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Szybka wycena
            </span>
            <h2 className="reveal mt-4 text-3xl md:text-5xl font-bold leading-tight">
              Oddzwonimy w <span className="text-gradient">30 minut</span>
            </h2>
            <p className="reveal mt-5 text-lg text-foreground/80 leading-relaxed">
              Opisz krótko problem lub usługę. Skontaktujemy się i podamy orientacyjny koszt
              oraz termin — bez zobowiązań.
            </p>

            <div className="reveal mt-8 space-y-4">
              {[
                { icon: Phone, t: "Bez kolejki", d: "Telefon zwrotny w ciągu 30 minut" },
                { icon: Wrench, t: "Konkretna wycena", d: "Bez ukrytych kosztów" },
                { icon: Calendar, t: "Szybki termin", d: "Większość napraw w 24h" },
              ].map((b) => (
                <div key={b.t} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{b.t}</div>
                    <div className="text-sm text-foreground/70">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="reveal lg:col-span-3 relative rounded-3xl border border-border/60 bg-card/70 backdrop-blur p-6 md:p-10 shadow-card"
          >
            <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Imię" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={60}
                  placeholder="Jan"
                  className="field-input"
                />
              </Field>
              <Field label="Telefon" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  maxLength={20}
                  placeholder="+48 ..."
                  className="field-input"
                />
              </Field>
              <Field label="Marka i model auta" error={errors.car}>
                <input
                  type="text"
                  value={form.car}
                  onChange={(e) => update("car", e.target.value)}
                  maxLength={80}
                  placeholder="np. Skoda Octavia 2018"
                  className="field-input"
                />
              </Field>
              <Field label="Usługa" error={errors.service}>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23ff8a3d%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25rem]"
                >
                  <option value="">Wybierz usługę…</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Krótki opis (opcjonalnie)" error={errors.notes}>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="Np. stuk w przednim zawieszeniu na nierównościach…"
                  className="field-input resize-none"
                />
              </Field>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground shadow-elegant transition-all duration-300 hover:scale-[1.02] hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                {submitting ? "Wysyłanie…" : "Wyślij zgłoszenie"}
              </button>
              <a
                href="tel:+48730020887"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 px-6 py-4 text-base font-medium hover:border-primary/60 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" /> Wolisz zadzwonić?
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Wysyłając formularz akceptujesz, że oddzwonimy na podany numer w celu wyceny.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}