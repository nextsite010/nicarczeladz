import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/nicar-logo.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <img
              src={logo}
              alt="Nicar Auto Serwis — logo"
              className="h-14 w-auto object-contain"
            />
            <p className="mt-5 text-base text-foreground/75 leading-relaxed max-w-sm">
              Profesjonalny serwis samochodowy w Czeladzi. Szybko, uczciwie, z gwarancją jakości.
            </p>
            <a
              href="https://www.facebook.com/NICARAutoSerwis/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nicar Auto Serwis na Facebooku"
              className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/40 text-foreground/80 transition-all hover:border-primary/60 hover:text-primary hover:scale-110"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Nawigacja</h4>
            <ul className="mt-4 space-y-2.5 text-base text-foreground/75">
              <li><Link to="/" className="hover:text-primary transition-colors">Start</Link></li>
              <li><Link to="/o-nas" className="hover:text-primary transition-colors">O nas</Link></li>
              <li><Link to="/uslugi" className="hover:text-primary transition-colors">Usługi</Link></li>
              <li><Link to="/opinie" className="hover:text-primary transition-colors">Opinie</Link></li>
              <li><Link to="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Kontakt</h4>
            <ul className="mt-4 space-y-3 text-base text-foreground/75">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                Kamienna 12, 41-250 Czeladź
              </li>
              <li>
                <a href="tel:+48730020887" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  +48 730 020 887
                </a>
              </li>
              <li>
                <a href="mailto:nicarautoserwis@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  nicarautoserwis@gmail.com
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