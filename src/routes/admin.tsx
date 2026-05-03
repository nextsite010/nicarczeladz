import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogIn, LogOut, Loader2, Calendar, Ban, Phone, Trash2, Check, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel admina — Nicar" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  car_make_model: string;
  service: string;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  created_at: string;
};

type BlockedSlot = {
  id: string;
  blocked_date: string;
  blocked_time: string;
  reason: string | null;
};

function AdminPage() {
  const [session, setSession] = useState<{ userId: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s ? { userId: s.user.id } : null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ? { userId: data.session.user.id } : null);
      setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(false); return; }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return <LoginCard />;
  if (!isAdmin) return <NoAccessCard />;
  return <AdminDashboard />;
}

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("Błąd logowania", { description: error.message });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (error) toast.error("Błąd rejestracji", { description: error.message });
      else toast.success("Konto utworzone", { description: "Sprawdź email i poproś właściciela o nadanie roli admina." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 bg-grid-industrial">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-8 shadow-card">
        <h1 className="text-2xl font-bold">Panel admina</h1>
        <p className="mt-1 text-sm text-muted-foreground">Zaloguj się, aby zarządzać rezerwacjami.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="field-input" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło (min. 6 znaków)" minLength={6} className="field-input" />
          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-elegant disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            {mode === "login" ? "Zaloguj się" : "Utwórz konto"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-4 w-full text-sm text-muted-foreground hover:text-primary">
          {mode === "login" ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
        </button>
      </div>
    </div>
  );
}

function NoAccessCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center rounded-2xl border border-border/60 bg-card/80 p-8 shadow-card">
        <Ban className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">Brak dostępu</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Twoje konto nie ma roli admina. Skontaktuj się z właścicielem warsztatu, żeby ją przyznać.
        </p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm hover:border-primary/60"
        >
          <LogOut className="h-4 w-4" /> Wyloguj
        </button>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocked, setBlocked] = useState<BlockedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookings" | "blocked">("bookings");

  const load = async () => {
    setLoading(true);
    const [b, bl] = await Promise.all([
      supabase.from("bookings").select("*").order("booking_date", { ascending: true }).order("booking_time", { ascending: true }),
      supabase.from("blocked_slots").select("*").order("blocked_date", { ascending: true }).order("blocked_time", { ascending: true }),
    ]);
    if (b.error) toast.error("Błąd", { description: b.error.message });
    else setBookings((b.data as Booking[]) ?? []);
    if (!bl.error) setBlocked((bl.data as BlockedSlot[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) toast.error("Błąd", { description: error.message });
    else { toast.success("Zaktualizowano"); load(); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Usunąć rezerwację?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) toast.error("Błąd", { description: error.message });
    else { toast.success("Usunięto"); load(); }
  };

  const upcoming = bookings.filter((b) => b.booking_date >= format(new Date(), "yyyy-MM-dd"));
  const past = bookings.filter((b) => b.booking_date < format(new Date(), "yyyy-MM-dd"));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/40 backdrop-blur sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Panel admina — Nicar</h1>
          <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:border-primary/60">
            <LogOut className="h-4 w-4" /> Wyloguj
          </button>
        </div>
        <div className="container mx-auto px-4 md:px-8 flex gap-2">
          <TabBtn active={tab === "bookings"} onClick={() => setTab("bookings")}>
            <Calendar className="h-4 w-4" /> Rezerwacje ({upcoming.length})
          </TabBtn>
          <TabBtn active={tab === "blocked"} onClick={() => setTab("blocked")}>
            <Ban className="h-4 w-4" /> Blokady ({blocked.length})
          </TabBtn>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : tab === "bookings" ? (
          <div className="space-y-8">
            <Section title="Nadchodzące" empty="Brak nadchodzących rezerwacji.">
              {upcoming.map((b) => (
                <BookingRow key={b.id} b={b} onStatus={updateStatus} onDelete={deleteBooking} />
              ))}
            </Section>
            {past.length > 0 && (
              <Section title="Archiwalne" empty="">
                {past.slice(0, 30).map((b) => (
                  <BookingRow key={b.id} b={b} onStatus={updateStatus} onDelete={deleteBooking} muted />
                ))}
              </Section>
            )}
          </div>
        ) : (
          <BlockedTab blocked={blocked} reload={load} />
        )}
      </main>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
        active ? "border-primary text-primary" : "border-transparent text-foreground/60 hover:text-foreground"
      }`}
    >{children}</button>
  );
}

function Section({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  const arr = Array.isArray(children) ? children : [children];
  return (
    <div>
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      {arr.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  );
}

function BookingRow({ b, onStatus, onDelete, muted }: { b: Booking; onStatus: (id: string, s: string) => void; onDelete: (id: string) => void; muted?: boolean }) {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    confirmed: "bg-green-500/15 text-green-500 border-green-500/30",
    cancelled: "bg-destructive/15 text-destructive border-destructive/30",
    done: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  };
  return (
    <div className={`rounded-xl border border-border/60 bg-card/60 p-4 md:p-5 ${muted ? "opacity-60" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-lg">{format(new Date(b.booking_date), "EEE, d MMM yyyy", { locale: pl })} • {b.booking_time.slice(0, 5)}</span>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColors[b.status] ?? ""}`}>{b.status}</span>
          </div>
          <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            <div><span className="text-muted-foreground">Klient:</span> <span className="font-semibold">{b.customer_name}</span></div>
            <div><span className="text-muted-foreground">Telefon:</span> <a href={`tel:${b.phone}`} className="font-semibold text-primary inline-flex items-center gap-1"><Phone className="h-3 w-3" />{b.phone}</a></div>
            <div><span className="text-muted-foreground">Auto:</span> <span className="font-semibold">{b.car_make_model}</span></div>
            <div><span className="text-muted-foreground">Usługa:</span> <span className="font-semibold">{b.service}</span></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {b.status !== "confirmed" && (
            <button onClick={() => onStatus(b.id, "confirmed")} className="inline-flex items-center gap-1 rounded-lg bg-green-500/15 text-green-500 border border-green-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-green-500/25"><Check className="h-3 w-3" />Potwierdź</button>
          )}
          {b.status !== "done" && (
            <button onClick={() => onStatus(b.id, "done")} className="inline-flex items-center gap-1 rounded-lg bg-blue-500/15 text-blue-500 border border-blue-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-blue-500/25"><Check className="h-3 w-3" />Wykonano</button>
          )}
          {b.status !== "cancelled" && (
            <button onClick={() => onStatus(b.id, "cancelled")} className="inline-flex items-center gap-1 rounded-lg bg-destructive/15 text-destructive border border-destructive/30 px-3 py-1.5 text-xs font-semibold hover:bg-destructive/25"><X className="h-3 w-3" />Anuluj</button>
          )}
          <button onClick={() => onDelete(b.id)} className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-semibold hover:border-destructive/60 hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
        </div>
      </div>
    </div>
  );
}

function BlockedTab({ blocked, reload }: { blocked: BlockedSlot[]; reload: () => void }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    const { error } = await supabase.from("blocked_slots").insert({
      blocked_date: date,
      blocked_time: time + ":00",
      reason: reason || null,
    });
    if (error) {
      if (error.code === "23505") toast.error("Termin już zablokowany");
      else toast.error("Błąd", { description: error.message });
    } else {
      toast.success("Termin zablokowany");
      setDate(""); setTime(""); setReason("");
      reload();
    }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("blocked_slots").delete().eq("id", id);
    if (error) toast.error("Błąd", { description: error.message });
    else { toast.success("Usunięto blokadę"); reload(); }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={add} className="rounded-xl border border-border/60 bg-card/60 p-5">
        <h2 className="text-lg font-bold mb-4">Zablokuj termin</h2>
        <div className="grid md:grid-cols-4 gap-3">
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="field-input" />
          <select required value={time} onChange={(e) => setTime(e.target.value)} className="field-input">
            <option value="">Godzina…</option>
            {["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"].map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
          <input type="text" placeholder="Powód (opcjonalnie)" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={100} className="field-input md:col-span-1" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-elegant"><Plus className="h-4 w-4" />Zablokuj</button>
        </div>
      </form>

      <div>
        <h2 className="text-lg font-bold mb-3">Aktywne blokady</h2>
        {blocked.length === 0 ? (
          <p className="text-sm text-muted-foreground">Brak zablokowanych terminów.</p>
        ) : (
          <div className="space-y-2">
            {blocked.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-card/60 p-3">
                <div>
                  <span className="font-semibold">{format(new Date(s.blocked_date), "EEE, d MMM yyyy", { locale: pl })} • {s.blocked_time.slice(0, 5)}</span>
                  {s.reason && <span className="ml-3 text-sm text-muted-foreground">— {s.reason}</span>}
                </div>
                <button onClick={() => remove(s.id)} className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-semibold hover:border-destructive/60 hover:text-destructive"><Trash2 className="h-3 w-3" /> Usuń</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}