import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/nicar-logo.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Nicar logo" className="h-12 w-12 object-contain" width={48} height={48} />
              <div>
                <div className="text-lg font-bold">
                  NI<span className="text-primary">CAR</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Auto Serwis
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Profesjonalny serwis samochodowy w Czeladzi. Szybko, uczciwie, z gwarancją jakości.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Nawigacja</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#o-nas" className="hover:text-primary transition-colors">O nas</a></li>
              <li><a href="#uslugi" className="hover:text-primary transition-colors">Usługi</a></li>
              <li><a href="#opinie" className="hover:text-primary transition-colors">Opinie</a></li>
              <li><a href="#dlaczego-my" className="hover:text-primary transition-colors">Dlaczego my</a></li>
              <li><a href="#kontakt" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Kontakt</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                ul. Warszawska 1, 41-250 Czeladź
              </li>
              <li>
                <a href="tel:+48500000000" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  +48 500 000 000
                </a>
              </li>
              <li>
                <a href="mailto:kontakt@nicar-serwis.pl" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  kontakt@nicar-serwis.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Nicar Auto Serwis. Wszystkie prawa zastrzeżone.</span>
          <span>Czeladź · Śląskie</span>
        </div>
      </div>
    </footer>
  );
}