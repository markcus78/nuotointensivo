import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/";
const PROMO_DATE    = "17 maggio";
const DATA_INIZIO   = "8 giugno";
const DATA_FINE     = "31 luglio";

/* ── TICKER ── */
const tickerItems = [
  "8 GIUGNO", "31 LUGLIO", "BAMBINI", "RAGAZZI", "ADULTI",
  "8 SETTIMANE", "ROMA SUD", "3×/SETTIMANA", "5×/SETTIMANA",
];

function TickerRow({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex gap-10 items-center shrink-0" aria-hidden={hidden}>
      {tickerItems.map((item) => (
        <Fragment key={item}>
          <span className="font-display text-2xl tracking-wider text-charcoal">{item}</span>
          <span className="text-primary font-display text-xl">·</span>
        </Fragment>
      ))}
    </div>
  );
}

/* ── NAV ── */
const navLinks = [
  { href: "corsi",      label: "I corsi" },
  { href: "funziona",   label: "Come funziona" },
  { href: "orari",      label: "Orari" },
  { href: "faq",        label: "FAQ" },
  { href: "prenota",    label: "Prenota" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ── FORM ── */
const formSchema = z.object({
  nome:      z.string().min(2, "Inserisci il nome"),
  cognome:   z.string().min(2, "Inserisci il cognome"),
  telefono:  z.string().min(9, "Numero non valido").regex(/^[\d\s+\-()]+$/, "Numero non valido"),
  categoria: z.enum(["bambino", "ragazzo", "adulto"] as const),
  formato:   z.enum(["intensivo", "superintensivo"] as const),
  note:      z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/* ── FAQ DATA ── */
const faqItems = [
  {
    q: "Mio figlio non ha mai nuotato, può partecipare?",
    a: "Sì. Abbiamo turni dedicati per ogni livello. Quando ti contatteremo, ti chiederemo il livello attuale e troveremo insieme il turno giusto."
  },
  {
    q: "Qual è la differenza tra Intensivo e Super Intensivo?",
    a: "L'Intensivo si svolge lunedì, mercoledì e venerdì (3 allenamenti a settimana). Il Super Intensivo aggiunge anche martedì e giovedì per un totale di 5 sessioni. Stesso team di istruttori, ritmo diverso."
  },
  {
    q: "Si può iniziare da metà corso o fare solo qualche settimana?",
    a: "Sì. Puoi acquistare singole settimane o il pacchetto 4 settimane in qualsiasi momento durante il corso."
  },
  {
    q: "Come funziona il pagamento?",
    a: "Nessun pagamento ora. Prenota con questo modulo, ti chiamiamo per confermare e concordare il pagamento direttamente in struttura o tramite i nostri sistemi."
  },
  {
    q: "Cosa serve portare?",
    a: "Costume, cuffia, occhialini. Per i bambini, certificato medico di idoneità sportiva non agonistica se non già fornito durante la stagione invernale."
  },
];

/* ═══════════════════════════════════
   MAIN
═══════════════════════════════════ */
export default function Index() {
  const navigate  = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const categoria = watch("categoria");
  const formato   = watch("formato");

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    setSubmitError("");
    try {
      await fetch(ZAPIER_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "landing-nuoto-intensivo-2026" }),
        mode: "no-cors",
      });
      navigate("/grazie");
    } catch {
      setSubmitError("Errore nell'invio. Riprova o chiamaci al 06 5139 056.");
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-bg text-fg">

      {/* ═══ PROMO BAR ═══ */}
      <div className="bg-amber-wt text-charcoal">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-9 flex items-center justify-between gap-4 text-[12px]">
          <div className="flex items-center gap-2 font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal live-dot" />
            <span className="font-semibold">Promo fino al {PROMO_DATE}: iscriviti ai prezzi 2025</span>
          </div>
          <button
            onClick={() => scrollTo("prenota")}
            className="hidden sm:block font-mono uppercase tracking-widest underline underline-offset-4 text-charcoal hover:opacity-70 transition-opacity text-[11px]"
          >
            Prenota ora →
          </button>
        </div>
      </div>

      {/* ═══ STICKY HEADER ═══ */}
      <header className="sticky top-0 z-40 backdrop-blur bg-bg/90 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <img src="/logo-wt.png" alt="Wellness Town" className="h-9 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm font-semibold text-fg/60 hover:text-primary transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo("prenota")}
            className="bg-primary text-primary-fg px-5 h-10 inline-flex items-center rounded-md text-[13px] font-bold tracking-wide hover:bg-primary/90 transition-colors">
            PRENOTA
          </button>
        </div>
      </header>

      <main>

        {/* ═══ HERO ═══ */}
        <section className="relative paper-grain border-b border-border overflow-hidden bg-bg">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-0 grid grid-cols-12 gap-8">

            {/* Left */}
            <div className="col-span-12 lg:col-span-7 pb-16 sm:pb-24">
              <div className="flex items-center gap-3 mb-8">
                <span className="sec-label">01 / Nuoto Intensivo Estivo 2026</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="inline-flex items-center gap-2 bg-primary-soft text-primary border border-primary/20 rounded-full px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary live-dot" />
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                  {DATA_INIZIO} · {DATA_FINE} · Roma Sud
                </span>
              </div>

              {/* HEADLINE — outcome formula */}
              <h1 className="font-display text-[72px] leading-[0.88] sm:text-[108px] md:text-[120px] tracking-tight mb-6 text-charcoal">
                TORNA A<br />
                SETTEMBRE<br />
                <span className="text-primary">UN LIVELLO</span><br />
                SOPRA.
              </h1>

              <p className="text-lg sm:text-xl text-fg/70 max-w-xl leading-relaxed mb-8">
                Corsi di nuoto <strong className="text-fg">intensivo ed estivo</strong> a
                Wellness Town. Bambini, ragazzi e adulti. 3 o 5 allenamenti a settimana
                con istruttori certificati.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
                <button onClick={() => scrollTo("prenota")}
                  className="h-14 px-8 inline-flex items-center rounded-md bg-primary text-white text-sm font-bold tracking-wider hover:-translate-y-px transition-transform shadow-lg shadow-primary/30">
                  PRENOTA IL TUO POSTO &nbsp;→
                </button>
                <p className="text-sm text-fg/40 font-mono uppercase tracking-wider">Nessun pagamento ora</p>
              </div>

              {/* Social proof inline */}
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { n: "75+",  label: "bambini l'anno scorso" },
                  { n: "4",    label: "istruttori certificati" },
                  { n: "8",    label: "settimane di corso" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2 bg-primary-soft rounded-lg px-3 py-2">
                    <span className="font-display text-2xl text-primary">{s.n}</span>
                    <span className="text-xs text-fg/60">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Urgency card */}
              <div className="bg-charcoal text-charcoal-fg rounded-xl p-5 max-w-xl">
                <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[11px] text-amber-wt mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-wt live-dot" />
                  <span>Promo fino al {PROMO_DATE} · risparmia fino a €20</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal-fg/40 mb-1">Intensivo · 4 sett.</p>
                    <p className="font-display text-4xl leading-none">
                      €129 <span className="text-charcoal-fg/30 line-through text-2xl">€139</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal-fg/40 mb-1">Super · 4 sett.</p>
                    <p className="font-display text-4xl leading-none">
                      €149 <span className="text-charcoal-fg/30 line-through text-2xl">€159</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: photo grid */}
            <aside className="col-span-12 lg:col-span-5 flex flex-col gap-4 pt-6 lg:pt-0 pb-0 lg:pb-16 self-stretch">
              <div className="relative flex-1 min-h-[360px] rounded-2xl overflow-hidden border border-border stripes bg-gradient-to-br from-primary/15 via-primary/8 to-sky-100">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                <div className="absolute top-4 left-4 bg-charcoal text-charcoal-fg font-mono uppercase tracking-widest text-[10px] px-2 py-1 rounded">
                  EST · 2026
                </div>
                <div className="absolute bottom-4 right-4 bg-card text-fg font-mono uppercase tracking-widest text-[10px] px-2 py-1 rounded shadow">
                  Wellness Town
                </div>
                <div className="absolute bottom-4 left-4">
                  <img src="/logo-wt.png" alt="Wellness Town" className="h-6 w-auto opacity-20" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Bambini", sub: "–12 anni" },
                  { label: "Ragazzi", sub: "13–17 anni" },
                  { label: "Adulti",  sub: "18+ anni" },
                ].map((p) => (
                  <div key={p.label}
                    className="aspect-square rounded-xl overflow-hidden border border-border stripes bg-gradient-to-br from-primary/10 to-sky-50 flex flex-col items-end justify-end p-3">
                    <span className="font-display text-lg text-charcoal leading-none">{p.label}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{p.sub}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Ticker */}
          <div className="border-t border-border bg-card overflow-hidden">
            <div className="ticker-track flex gap-10 py-4 whitespace-nowrap">
              <TickerRow /><TickerRow hidden />
            </div>
          </div>
        </section>

        {/* ═══ PROBLEMA ═══ */}
        <section className="py-20 px-5 sm:px-8 bg-charcoal text-charcoal-fg">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="sec-label text-charcoal-fg/40 block mb-6">02 / Il problema</span>
              <h2 className="font-display text-5xl sm:text-7xl tracking-tight mb-6 leading-none">
                L'ESTATE<br />
                <span className="text-amber-wt">RALLENTA</span><br />
                CHI SI FERMA.
              </h2>
              <p className="text-charcoal-fg/60 text-lg leading-relaxed">
                Settembre arriva presto. Chi ha nuotato tutta l'estate torna in acqua
                già avanzato — più coordinazione, più resistenza, più sicurezza.
                Chi si è fermato ricomincia quasi da capo.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "❌",
                  title: "Senza corso intensivo",
                  items: ["Regressione tecnica dopo 2 mesi di pausa", "Settembre si ricomincia da zero", "Motivazione ai minimi"],
                  dark: true,
                },
                {
                  icon: "✅",
                  title: "Con il corso Wellness Town",
                  items: ["Progressione continua da giugno a luglio", "Settembre si torna già avanzati", "Allenamento strutturato, estate produttiva"],
                  dark: false,
                },
              ].map((card) => (
                <div key={card.title}
                  className={cn(
                    "rounded-2xl p-6",
                    card.dark
                      ? "bg-charcoal-fg/5 border border-charcoal-fg/10"
                      : "bg-primary/20 border border-primary/30"
                  )}>
                  <p className="font-bold text-sm mb-3 flex items-center gap-2">
                    <span>{card.icon}</span>
                    <span className={card.dark ? "text-charcoal-fg/50" : "text-primary"}>{card.title}</span>
                  </p>
                  <ul className="space-y-1.5">
                    {card.items.map((item) => (
                      <li key={item} className="text-sm text-charcoal-fg/70 flex items-start gap-2">
                        <span className="mt-0.5 shrink-0">{card.dark ? "·" : "→"}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ I CORSI ═══ */}
        <section id="corsi" className="py-20 px-5 sm:px-8 bg-bg border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label">03 / I Corsi</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-charcoal mb-4 tracking-tight">
              SCEGLI LA TUA INTENSITÀ
            </h2>
            <p className="text-fg/60 text-lg mb-12 max-w-lg">
              Stesso pool di istruttori, stessa piscina. Due ritmi per due obiettivi diversi.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* INTENSIVO */}
              <div className="border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-colors group">
                <div className="sec-label mb-2">Formato A</div>
                <h3 className="font-display text-5xl text-charcoal mb-2 tracking-tight group-hover:text-primary transition-colors">INTENSIVO</h3>
                <p className="text-muted font-mono text-xs uppercase tracking-widest mb-5">3 allenamenti a settimana</p>
                <div className="flex gap-2 flex-wrap mb-6">
                  {["Lunedì", "Mercoledì", "Venerdì"].map((g) => (
                    <span key={g} className="bg-primary-soft text-primary font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">{g}</span>
                  ))}
                </div>
                <div className="bg-bg border border-border rounded-xl p-5 mb-5">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="sec-label mb-1">1 settimana</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display text-4xl text-primary">€35</span>
                        <span className="font-mono text-xs text-muted line-through">€40</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="sec-label mb-1">4 settimane</p>
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="font-display text-4xl text-primary">€129</span>
                        <span className="font-mono text-xs text-muted line-through">€139</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-soft border border-amber-wt/20 rounded-lg px-3 py-2 text-xs text-charcoal font-semibold">
                    Promo fino al {PROMO_DATE}: prezzi 2025 confermati
                  </div>
                </div>
                <p className="text-fg/60 text-sm leading-relaxed">
                  Per chi vuole migliorare in modo costante senza stravolgere l'estate.
                </p>
                <button onClick={() => scrollTo("prenota")}
                  className="mt-5 w-full h-11 border-2 border-primary text-primary font-bold text-sm rounded-xl hover:bg-primary hover:text-white transition-colors">
                  Prenota Intensivo →
                </button>
              </div>

              {/* SUPER INTENSIVO */}
              <div className="border-2 border-primary rounded-2xl p-8 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-5 right-5 bg-primary text-white font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">
                  Massimi progressi
                </div>
                <div className="sec-label mb-2 text-primary/60">Formato B</div>
                <h3 className="font-display text-5xl text-primary mb-2 tracking-tight">SUPER INTENSIVO</h3>
                <p className="text-primary/70 font-mono text-xs uppercase tracking-widest mb-5">5 allenamenti a settimana</p>
                <div className="flex gap-2 flex-wrap mb-6">
                  {["Lun", "Mar", "Mer", "Gio", "Ven"].map((g) => (
                    <span key={g} className="bg-primary text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">{g}</span>
                  ))}
                </div>
                <div className="bg-card border border-primary/20 rounded-xl p-5 mb-5">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="sec-label mb-1 text-primary/50">1 settimana</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display text-4xl text-primary">€55</span>
                        <span className="font-mono text-xs text-primary/50 line-through">€60</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="sec-label mb-1 text-primary/50">4 settimane</p>
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="font-display text-4xl text-primary">€149</span>
                        <span className="font-mono text-xs text-primary/50 line-through">€159</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-soft border border-amber-wt/20 rounded-lg px-3 py-2 text-xs text-charcoal font-semibold">
                    Promo fino al {PROMO_DATE}: prezzi 2025 confermati
                  </div>
                </div>
                <p className="text-fg/60 text-sm leading-relaxed">
                  Cinque sessioni a settimana per un salto di livello che si vede a settembre.
                </p>
                <button onClick={() => scrollTo("prenota")}
                  className="mt-5 w-full h-11 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                  Prenota Super Intensivo →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ COME FUNZIONA ═══ */}
        <section id="funziona" className="py-20 px-5 sm:px-8 bg-primary-soft border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label text-primary/60">04 / Come funziona</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-charcoal mb-14 tracking-tight">
              3 PASSI.<br />NIENTE DI PIÙ.
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  n: "01",
                  title: "Prenota",
                  desc: "Compila il modulo in 60 secondi. Nessun pagamento ora, nessun impegno immediato.",
                  cta: false,
                },
                {
                  n: "02",
                  title: "Ti chiamiamo noi",
                  desc: "Entro 24 ore un nostro istruttore ti contatta, risponde a tutte le domande e conferma il posto.",
                  cta: false,
                },
                {
                  n: "03",
                  title: "Alleni e avanzi",
                  desc: `Dal ${DATA_INIZIO} sei in acqua. ${DATA_FINE} torni avanzato.`,
                  cta: true,
                },
              ].map((s) => (
                <div key={s.n} className="bg-card border border-border rounded-2xl p-7 relative">
                  <span className="font-display text-7xl text-primary/10 absolute top-4 right-5">{s.n}</span>
                  <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">{s.n}</div>
                  <h3 className="font-display text-3xl text-charcoal mb-3 tracking-tight">{s.title}</h3>
                  <p className="text-fg/60 text-sm leading-relaxed">{s.desc}</p>
                  {s.cta && (
                    <button onClick={() => scrollTo("prenota")}
                      className="mt-4 text-sm font-bold text-primary hover:underline">
                      Prenota ora →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ORARI ═══ */}
        <section id="orari" className="py-20 px-5 sm:px-8 bg-charcoal text-charcoal-fg border-b border-charcoal/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label text-charcoal-fg/40">05 / Orari</span>
              <span className="h-px flex-1 bg-charcoal-fg/10" />
            </div>
            <h2 className="font-display text-5xl sm:text-7xl mb-4 tracking-tight">
              UN ORARIO<br />PER OGNI FASCIA
            </h2>
            <p className="text-charcoal-fg/50 text-lg mb-14 max-w-lg">
              Tre turni separati. Bambini e adulti non si sovrappongono mai.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { ora: "17:10", target: "Bambini",          emoji: "🐟", extra: "+ Mar·Gio (solo Super)" },
                { ora: "18:10", target: "Bambini & Ragazzi", emoji: "🏊", extra: "+ Mar·Gio (solo Super)" },
                { ora: "19:10", target: "Adulti",            emoji: "💪", extra: "+ Mar·Gio (solo Super)" },
              ].map((s) => (
                <div key={s.ora}
                  className="bg-charcoal-fg/5 border border-charcoal-fg/10 rounded-2xl p-7 hover:bg-charcoal-fg/10 transition-colors">
                  <div className="text-3xl mb-4">{s.emoji}</div>
                  <div className="font-display text-6xl leading-none text-primary mb-2">{s.ora}</div>
                  <div className="font-bold text-lg mb-4">{s.target}</div>
                  <div className="h-px bg-charcoal-fg/10 mb-4" />
                  <p className="font-mono text-xs text-charcoal-fg/50 uppercase tracking-wider">
                    Lun · Mer · Ven
                  </p>
                  <p className="font-mono text-[10px] text-charcoal-fg/30 uppercase tracking-wider mt-1">{s.extra}</p>
                </div>
              ))}
            </div>

            <div className="bg-charcoal-fg/5 border border-charcoal-fg/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-charcoal-fg/60">
                <strong className="text-charcoal-fg">Spogliatoi:</strong> bambini → piano terra piscina &nbsp;·&nbsp; adulti → spogliatoi standard
              </p>
              <button onClick={() => scrollTo("prenota")}
                className="shrink-0 h-10 px-6 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Prenota il tuo turno →
              </button>
            </div>
          </div>
        </section>

        {/* ═══ ISTRUTTORI ═══ */}
        <section id="istruttori" className="py-20 px-5 sm:px-8 bg-bg border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label">06 / Istruttori</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-charcoal mb-4 tracking-tight">CHI TI ALLENA</h2>
            <p className="text-fg/60 text-lg mb-12 max-w-lg">
              Il team che allena tutto l'anno a Wellness Town. Lo stesso livello, la stessa cura.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { nome: "Beatrice Sechi",    i: "B" },
                { nome: "Simone Caretta",    i: "S" },
                { nome: "Edoardo Stefanucci", i: "E" },
                { nome: "Massimiliano Mauro", i: "M" },
              ].map((p) => (
                <div key={p.nome}
                  className="border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-primary-soft border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:border-primary transition-all">
                    <span className="font-display text-2xl text-primary group-hover:text-white transition-colors">{p.i}</span>
                  </div>
                  <p className="font-semibold text-sm text-fg">{p.nome}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1">Istruttore</p>
                </div>
              ))}
            </div>

            {/* Stats inline */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { n: "75+", desc: "partecipanti nella stagione 2025" },
                { n: "8",   desc: "settimane di corso continuativo" },
                { n: "3+5", desc: "sessioni a settimana a scelta" },
              ].map((s) => (
                <div key={s.n} className="bg-primary-soft rounded-xl p-5">
                  <div className="font-display text-5xl text-primary">{s.n}</div>
                  <p className="text-sm text-fg/60 mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="py-20 px-5 sm:px-8 bg-bg border-b border-border">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label">07 / Domande frequenti</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-charcoal mb-12 tracking-tight">
              HAI DOMANDE?<br />
              <span className="text-primary">LE ABBIAMO</span><br />
              TUTTE.
            </h2>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <div key={i}
                  className="border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-semibold text-fg text-sm sm:text-base">{item.q}</span>
                    <span className={cn(
                      "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-colors",
                      openFaq === i
                        ? "bg-primary border-primary text-white"
                        : "border-border text-muted"
                    )}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-fg/60 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="py-16 px-5 sm:px-8 bg-primary border-b border-primary/20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-wt live-dot" />
              <span className="font-mono text-xs uppercase tracking-widest">Offerta valida fino al {PROMO_DATE}</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl tracking-tight mb-4 leading-none">
              IL POSTO<br />
              <span className="text-amber-wt">NON ASPETTA.</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              L'anno scorso si sono iscritti in 75. Prenota ora prima che il tuo turno sia pieno.
            </p>
            <button onClick={() => scrollTo("prenota")}
              className="h-14 px-10 bg-white text-primary font-bold text-base rounded-xl hover:-translate-y-px transition-transform shadow-lg">
              PRENOTA ORA — Gratis, nessun impegno →
            </button>
            <p className="text-white/40 text-xs mt-4 font-mono uppercase tracking-wider">
              Prezzi 2025 fino al {PROMO_DATE} · dal {new Date().toLocaleDateString('it-IT', {day: 'numeric', month: 'long'})} mancano {Math.max(0, Math.ceil((new Date('2026-05-17').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} giorni
            </p>
          </div>
        </section>

        {/* ═══ FORM ═══ */}
        <section id="prenota" className="py-20 px-5 sm:px-8 bg-bg">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label">08 / Prenota</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-charcoal mb-4 tracking-tight">
              PRENOTA<br />IL TUO POSTO
            </h2>
            <p className="text-fg/60 text-lg mb-10">
              Compila in 60 secondi. Ti chiamiamo noi entro <strong className="text-fg">24 ore</strong>.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="sec-label block mb-2">Nome *</label>
                  <input {...register("nome")} placeholder="Marco"
                    className={cn("w-full border rounded-lg px-4 py-3 text-fg text-base bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow",
                      errors.nome ? "border-red-400" : "border-border")} />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
                </div>
                <div>
                  <label className="sec-label block mb-2">Cognome *</label>
                  <input {...register("cognome")} placeholder="Rossi"
                    className={cn("w-full border rounded-lg px-4 py-3 text-fg text-base bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow",
                      errors.cognome ? "border-red-400" : "border-border")} />
                  {errors.cognome && <p className="text-red-500 text-xs mt-1">{errors.cognome.message}</p>}
                </div>
              </div>

              <div>
                <label className="sec-label block mb-2">Telefono *</label>
                <input {...register("telefono")} type="tel" placeholder="320 123 4567"
                  className={cn("w-full border rounded-lg px-4 py-3 text-fg text-base bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow",
                    errors.telefono ? "border-red-400" : "border-border")} />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
              </div>

              <div>
                <label className="sec-label block mb-3">Per chi ti iscrivi? *</label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { v: "bambino", l: "Bambino",  s: "fino 12 anni" },
                    { v: "ragazzo", l: "Ragazzo",  s: "13–17 anni" },
                    { v: "adulto",  l: "Adulto",   s: "18+ anni" },
                  ] as const).map((o) => (
                    <label key={o.v} className="cursor-pointer">
                      <input type="radio" value={o.v} {...register("categoria")} className="sr-only" />
                      <div className={cn("border-2 rounded-xl p-4 text-center transition-all",
                        categoria === o.v ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40")}>
                        <div className="font-bold text-sm text-fg">{o.l}</div>
                        <div className="text-muted text-xs mt-0.5">{o.s}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>}
              </div>

              <div>
                <label className="sec-label block mb-3">Formato *</label>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { v: "intensivo",      l: "Intensivo",      s: "3× settimana · da €40" },
                    { v: "superintensivo", l: "Super Intensivo", s: "5× settimana · da €60" },
                  ] as const).map((o) => (
                    <label key={o.v} className="cursor-pointer">
                      <input type="radio" value={o.v} {...register("formato")} className="sr-only" />
                      <div className={cn("border-2 rounded-xl p-4 text-center transition-all",
                        formato === o.v ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40")}>
                        <div className="font-bold text-sm text-fg">{o.l}</div>
                        <div className="text-muted text-xs mt-0.5">{o.s}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.formato && <p className="text-red-500 text-xs mt-1">{errors.formato.message}</p>}
              </div>

              <div>
                <label className="sec-label block mb-2">Note (opzionale)</label>
                <textarea {...register("note")} rows={3}
                  placeholder="Livello di nuoto, orari preferiti, domande..."
                  className="w-full border border-border rounded-lg px-4 py-3 text-fg text-base bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none" />
              </div>

              {submitError && <p className="text-red-600 text-sm text-center">{submitError}</p>}

              <button type="submit" disabled={submitting}
                className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold text-base tracking-wide rounded-xl transition-colors shadow-lg shadow-primary/25">
                {submitting ? "Invio in corso..." : "PRENOTA GRATUITAMENTE →"}
              </button>

              <p className="text-muted text-xs text-center font-mono uppercase tracking-wider">
                Nessun pagamento ora · ti chiamiamo noi entro 24h
              </p>
            </form>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-charcoal text-charcoal-fg/60 px-5 sm:px-8 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 text-sm">
          <div className="col-span-12 md:col-span-4">
            <div className="h-8 w-20 bg-white/10 rounded flex items-center justify-center mb-4">
              <span className="font-display text-xl text-white tracking-wider">WT</span>
            </div>
            <p className="leading-relaxed">
              Wellness Town<br />
              by Appiae Sport ssd arl<br />
              Via F. Giangiacomo, 55 — Roma<br />
              P.IVA 17326171000
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-charcoal-fg mb-3">Contatti</p>
            <a href="tel:+390651390560" className="block hover:text-charcoal-fg transition-colors">Tel · 06 5139 056</a>
            <a href="https://wa.me/390651390560" className="block hover:text-charcoal-fg transition-colors">WhatsApp · 06 5139 056</a>
            <a href="mailto:info@wellnesstown.org" className="block hover:text-charcoal-fg transition-colors">info@wellnesstown.org</a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-charcoal-fg mb-3">Link</p>
            <a href="https://wellnesstown.it" className="block hover:text-charcoal-fg transition-colors">wellnesstown.it</a>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right text-charcoal-fg/30">
            <p>© {new Date().getFullYear()} Wellness Town</p>
          </div>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-charcoal border-t border-charcoal-fg/10 px-4 py-3">
        <button onClick={() => scrollTo("prenota")}
          className="w-full h-12 bg-primary text-white font-bold text-sm rounded-lg">
          PRENOTA — prezzi 2025 fino al {PROMO_DATE}
        </button>
      </div>
      <div className="h-20 sm:h-0" aria-hidden />
    </div>
  );
}
