import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Send, Phone, CheckCircle2 } from "lucide-react";
import { format, addDays, startOfDay, isBefore } from "date-fns";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";

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

// Mon–Fri 9:00–17:00 every 1h, last slot 16:00
const ALL_HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię").max(60),
  phone: z.string().trim().min(7, "Nieprawidłowy numer").max(20).regex(/^[+\d\s-]+$/, "Tylko cyfry, spacje i +"),
  car: z.string().trim().min(2, "Podaj markę i model").max(80),
  service: z.string().min(1, "Wybierz usługę"),
});

function isWeekend(d: Date) {
  const day = d.getDay();
  return day === 0 || day === 6;
}

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [taken, setTaken] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  // Load taken slots for the selected date
  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    setLoadingSlots(true);
    const dStr = format(date, "yyyy-MM-dd");
    supabase
      .rpc("get_taken_slots", { _from: dStr, _to: dStr })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error(error);
          setTaken(new Set());
        } else {
          const set = new Set<string>();
          for (const row of (data ?? []) as Array<{ slot_time: string }>) {
            // slot_time comes as "HH:MM:SS"
            set.add(row.slot_time.slice(0, 5));
          }
          setTaken(set);
        }
        setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date]);

  const availableHours = useMemo(() => ALL_HOURS.filter((h) => !taken.has(h)), [taken]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, phone, car, service });
    if (!parsed.success) {
      toast.error("Sprawdź formularz", { description: parsed.error.issues[0]?.message });
      return;
    }
    if (!date || !time) {
      toast.error("Wybierz termin", { description: "Zaznacz datę i godzinę." });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      customer_name: parsed.data.name,
      phone: parsed.data.phone,
      car_make_model: parsed.data.car,
      service: parsed.data.service,
      booking_date: format(date, "yyyy-MM-dd"),
      booking_time: time + ":00",
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      if (error.code === "23505") {
        toast.error("Termin już zajęty", { description: "Ktoś właśnie zarezerwował ten slot. Wybierz inny." });
        // Refresh taken slots
        setTime("");
        const dStr = format(date, "yyyy-MM-dd");
        const { data } = await supabase.rpc("get_taken_slots", { _from: dStr, _to: dStr });
        const set = new Set<string>();
        for (const row of (data ?? []) as Array<{ slot_time: string }>) set.add(row.slot_time.slice(0, 5));
        setTaken(set);
      } else {
        toast.error("Błąd zapisu", { description: error.message });
      }
      return;
    }
    setDone(true);
    toast.success("Rezerwacja przyjęta!", {
      description: "Skontaktujemy się telefonicznie w celu potwierdzenia.",
    });
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-primary/40 bg-card/70 backdrop-blur p-8 md:p-12 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h3 className="mt-4 text-2xl md:text-3xl font-bold">Rezerwacja przyjęta</h3>
        <p className="mt-3 text-foreground/80">
          Termin: <span className="font-semibold text-foreground">{date && format(date, "EEEE, d MMMM yyyy", { locale: pl })}</span>{" "}
          o <span className="font-semibold text-foreground">{time}</span>
        </p>
        <p className="mt-2 text-sm text-foreground/70">
          Zadzwonimy pod {phone}, żeby potwierdzić rezerwację.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:+48730020887" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-elegant">
            <Phone className="h-4 w-4" /> Zadzwoń od razu
          </a>
          <button
            onClick={() => {
              setDone(false);
              setName(""); setPhone(""); setCar(""); setService(""); setDate(undefined); setTime("");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-medium hover:border-primary/60"
          >
            Nowa rezerwacja
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur p-6 md:p-10 shadow-card">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Date + time */}
        <div className="space-y-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Data wizyty
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "mt-2 field-input flex items-center justify-between text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    {date ? format(date, "EEEE, d MMMM yyyy", { locale: pl }) : "Wybierz datę…"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50 bg-card" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); setTime(""); }}
                  disabled={(d) => isBefore(d, today) || isBefore(maxDate, d) || isWeekend(d)}
                  initialFocus
                  locale={pl}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <p className="mt-2 text-xs text-muted-foreground">Pon–pt, do 60 dni naprzód</p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Godzina
            </label>
            {!date ? (
              <p className="mt-3 text-sm text-muted-foreground">Najpierw wybierz datę.</p>
            ) : loadingSlots ? (
              <p className="mt-3 text-sm text-muted-foreground">Ładowanie wolnych godzin…</p>
            ) : availableHours.length === 0 ? (
              <p className="mt-3 text-sm text-destructive">Brak wolnych terminów tego dnia. Wybierz inną datę.</p>
            ) : (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {ALL_HOURS.map((h) => {
                  const isTaken = taken.has(h);
                  const isSelected = time === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      disabled={isTaken}
                      onClick={() => setTime(h)}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all",
                        isTaken && "border-border/40 bg-muted/30 text-muted-foreground line-through cursor-not-allowed",
                        !isTaken && !isSelected && "border-border/60 bg-background/40 hover:border-primary/60 hover:text-primary",
                        isSelected && "border-primary bg-gradient-primary text-primary-foreground shadow-glow"
                      )}
                    >
                      <Clock className="inline h-3 w-3 mr-1" />{h}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Customer fields */}
        <div className="space-y-5">
          <Field label="Imię">
            <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="Jan" />
          </Field>
          <Field label="Telefon">
            <input className="field-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} placeholder="+48 ..." />
          </Field>
          <Field label="Marka i model">
            <input className="field-input" value={car} onChange={(e) => setCar(e.target.value)} maxLength={80} placeholder="np. Skoda Octavia 2018" />
          </Field>
          <Field label="Usługa">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23ff8a3d%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25rem]"
            >
              <option value="">Wybierz usługę…</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground shadow-elegant transition-all hover:scale-[1.02] hover:shadow-glow disabled:opacity-60"
        >
          <Send className="h-5 w-5" />
          {submitting ? "Rezerwuję…" : "Zarezerwuj termin"}
        </button>
        <a href="tel:+48730020887" className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 px-6 py-4 text-base font-medium hover:border-primary/60 hover:text-primary">
          <Phone className="h-4 w-4" /> Wolisz zadzwonić?
        </a>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Rezerwacja jest niezobowiązująca. Potwierdzimy ją telefonicznie.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}