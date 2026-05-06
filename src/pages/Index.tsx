import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ── PLACEHOLDER — sostituire con URL Zapier reale ── */
const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/";

const PROMO_DATE = "17 maggio";

/* ────────────────────────────── TICKER ─────────────────────────────── */
const tickerItems = [
  "8 GIUGNO",
  "31 LUGLIO",
  "BAMBINI",
  "RAGAZZI",
  "ADULTI",
  "8 SETTIMANE",
  "ROMA SUD",
  "3×/SETTIMANA",
  "5×/SETTIMANA",
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

/* ────────────────────────────── NAV ─────────────────────────────── */
const navLinks = [
  { href: "#corsi",    label: "I corsi" },
  { href: "#orari",   label: "Orari" },
  { href: "#istruttori", label: "Istruttori" },
  { href: "#prenota", label: "Prenota" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ────────────────────────────── FORM ─────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Index() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

      {/* ── PROMO BAR ── */}
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

      {/* ── STICKY HEADER ── */}
      <header className="sticky top-0 z-40 backdrop-blur bg-bg/90 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5">
            {/* Logo placeholder — sostituire con <img src="/logo-wt.png"> */}
            <div className="h-8 px-3 bg-primary rounded flex items-center">
              <span className="font-display text-xl text-white tracking-wider">WT</span>
            </div>
            <span className="hidden sm:block font-semibold text-sm text-fg/70">
              Wellness Town
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href.replace("#", ""))}
                className="text-sm font-semibold text-fg/60 hover:text-primary transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollTo("prenota")}
            className="bg-primary text-primary-fg px-5 h-10 inline-flex items-center rounded-md text-[13px] font-bold tracking-wide hover:bg-primary/90 transition-colors"
          >
            PRENOTA
          </button>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="relative paper-grain border-b border-border overflow-hidden bg-bg">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24 grid grid-cols-12 gap-8">

            {/* Left */}
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <span className="sec-label">01 / Nuoto Intensivo Estivo</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="inline-flex items-center gap-2 bg-primary-soft text-primary border border-primary/20 rounded-full px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary live-dot" />
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                  8 Giugno · 31 Luglio 2026 · Roma Sud
                </span>
              </div>

              <h1 className="font-display text-[72px] leading-[0.88] sm:text-[108px] md:text-[128px] tracking-tight mb-6 text-charcoal">
                8 SETTIMANE
                <br />
                <span className="text-primary">IN ACQUA</span>
                <br />
                <span className="text-fg/30">CHE CAMBIANO</span>
                <br />
                TUTTO.
              </h1>

              <p className="text-lg sm:text-xl text-fg/70 max-w-xl leading-relaxed mb-8">
                Mentre tutti si fermano, tu avanzi. Corsi di nuoto{" "}
                <strong className="text-fg">intensivo ed estivo</strong> per bambini,
                ragazzi e adulti — 3 o 5 allenamenti a settimana con i nostri istruttori.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
                <button
                  onClick={() => scrollTo("prenota")}
                  className="h-14 px-8 inline-flex items-center rounded-md bg-primary text-white text-sm font-bold tracking-wider hover:-translate-y-px transition-transform shadow-lg shadow-primary/30"
                >
                  PRENOTA IL TUO POSTO &nbsp;→
                </button>
                <div className="text-sm text-fg/50 font-mono uppercase tracking-wider">
                  Nessun pagamento ora
                </div>
              </div>

              {/* Promo urgency card */}
              <div className="bg-charcoal text-charcoal-fg rounded-xl p-5 max-w-xl">
                <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[11px] text-amber-wt mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-wt live-dot" />
                  <span>Offerta a tempo · scade {PROMO_DATE}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal-fg/50 mb-1">Intensivo · 4 settimane</p>
                    <p className="font-display text-4xl leading-none">
                      €129 <span className="text-charcoal-fg/30 line-through text-2xl">€139</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal-fg/50 mb-1">Super · 4 settimane</p>
                    <p className="font-display text-4xl leading-none">
                      €149 <span className="text-charcoal-fg/30 line-through text-2xl">€159</span>
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-px bg-charcoal-fg/10" />
                <p className="mt-3 text-charcoal-fg/50 text-xs font-mono uppercase tracking-wider">
                  Valido anche per iscritti alle scuole invernali WT
                </p>
              </div>
            </div>

            {/* Right: photo grid */}
            <aside className="col-span-12 lg:col-span-5 flex flex-col gap-4 mt-6 lg:mt-0">
              {/* Main photo placeholder */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/30">
                  <span className="font-display text-7xl">🏊</span>
                  <span className="font-mono text-xs uppercase tracking-widest mt-2">foto vasca</span>
                </div>
                <div className="absolute top-4 left-4 bg-charcoal text-charcoal-fg font-mono uppercase tracking-widest text-[10px] px-2 py-1 rounded">
                  EST · 2026
                </div>
                <div className="absolute bottom-4 right-4 bg-card text-fg font-mono uppercase tracking-widest text-[10px] px-2 py-1 rounded shadow">
                  Wellness Town
                </div>
              </div>
              {/* Thumbnail row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { emoji: "🏊", label: "bambini" },
                  { emoji: "💪", label: "adulti" },
                  { emoji: "🥇", label: "istruttori" },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="aspect-square rounded-lg overflow-hidden border border-border bg-gradient-to-br from-primary/15 to-primary/5 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{p.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Ticker */}
          <div className="border-t border-b border-border bg-card overflow-hidden">
            <div className="ticker-track flex gap-10 py-4 whitespace-nowrap">
              <TickerRow />
              <TickerRow hidden />
            </div>
          </div>
        </section>

        {/* ── I CORSI ── */}
        <section id="corsi" className="py-20 px-5 sm:px-8 bg-bg border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label">02 / I Corsi</span>
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
              <div className="border-2 border-border rounded-2xl p-8 hover:border-primary/40 transition-colors group">
                <div className="sec-label mb-3">Formato A</div>
                <h3 className="font-display text-5xl text-charcoal mb-2 tracking-tight group-hover:text-primary transition-colors">INTENSIVO</h3>
                <p className="text-muted font-mono text-xs uppercase tracking-widest mb-6">
                  3 allenamenti a settimana
                </p>

                <div className="flex gap-2 flex-wrap mb-6">
                  {["Lunedì", "Mercoledì", "Venerdì"].map((g) => (
                    <span key={g} className="bg-primary-soft text-primary font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">
                      {g}
                    </span>
                  ))}
                </div>

                <div className="bg-bg border border-border rounded-xl p-5 mb-4">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="sec-label mb-1">1 settimana</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl text-primary">€40</span>
                        <span className="font-mono text-xs line-through text-muted">€35 promo</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="sec-label mb-1">4 settimane</p>
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="font-display text-4xl text-primary">€139</span>
                        <span className="font-mono text-xs line-through text-muted">€129 promo</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-border mb-3" />
                  <p className="text-xs text-muted">
                    Prezzi 2025 attivi fino al <strong className="text-fg">{PROMO_DATE}</strong>
                  </p>
                </div>

                <p className="text-fg/60 text-sm leading-relaxed">
                  Per chi vuole migliorare in modo costante senza stravolgere l'estate. Tre sessioni settimanali bastano per fare la differenza.
                </p>
              </div>

              {/* SUPER INTENSIVO */}
              <div className="border-2 border-primary rounded-2xl p-8 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-5 right-5 bg-primary text-white font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">
                  Massimi progressi
                </div>
                <div className="sec-label mb-3 text-primary/70">Formato B</div>
                <h3 className="font-display text-5xl text-primary mb-2 tracking-tight">SUPER INTENSIVO</h3>
                <p className="text-primary/70 font-mono text-xs uppercase tracking-widest mb-6">
                  5 allenamenti a settimana
                </p>

                <div className="flex gap-2 flex-wrap mb-6">
                  {["Lun", "Mar", "Mer", "Gio", "Ven"].map((g) => (
                    <span key={g} className="bg-primary text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">
                      {g}
                    </span>
                  ))}
                </div>

                <div className="bg-card border border-primary/20 rounded-xl p-5 mb-4">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="sec-label mb-1 text-primary/60">1 settimana</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl text-primary">€60</span>
                        <span className="font-mono text-xs line-through text-muted">€55 promo</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="sec-label mb-1 text-primary/60">4 settimane</p>
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="font-display text-4xl text-primary">€159</span>
                        <span className="font-mono text-xs line-through text-muted">€149 promo</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-border mb-3" />
                  <p className="text-xs text-muted">
                    Prezzi 2025 attivi fino al <strong className="text-fg">{PROMO_DATE}</strong>
                  </p>
                </div>

                <p className="text-fg/60 text-sm leading-relaxed">
                  Il massimo dei progressi in una sola estate. Cinque sessioni a settimana per un salto di livello che si vede a settembre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ORARI ── */}
        <section id="orari" className="py-20 px-5 sm:px-8 bg-charcoal text-charcoal-fg border-b border-charcoal/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label text-charcoal-fg/40">03 / Orari</span>
              <span className="h-px flex-1 bg-charcoal-fg/10" />
            </div>

            <h2 className="font-display text-5xl sm:text-7xl mb-4 tracking-tight">
              UN ORARIO PER OGNI FASCIA
            </h2>
            <p className="text-charcoal-fg/50 text-lg mb-14 max-w-lg">
              Tre turni separati. Bambini e adulti non si sovrappongono mai.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  ora: "17:10",
                  target: "Bambini",
                  giorni: "Lun · Mer · Ven",
                  extra: "+ Mar · Gio (solo Super)",
                  emoji: "🐟",
                },
                {
                  ora: "18:10",
                  target: "Bambini & Ragazzi",
                  giorni: "Lun · Mer · Ven",
                  extra: "+ Mar · Gio (solo Super)",
                  emoji: "🏊",
                },
                {
                  ora: "19:10",
                  target: "Adulti",
                  giorni: "Lun · Mer · Ven",
                  extra: "+ Mar · Gio (solo Super)",
                  emoji: "💪",
                },
              ].map((s) => (
                <div key={s.ora} className="bg-charcoal-fg/5 border border-charcoal-fg/10 rounded-2xl p-7 hover:bg-charcoal-fg/10 transition-colors">
                  <div className="text-3xl mb-4">{s.emoji}</div>
                  <div className="font-display text-6xl leading-none text-primary mb-2">{s.ora}</div>
                  <div className="font-bold text-lg mb-4">{s.target}</div>
                  <div className="h-px bg-charcoal-fg/10 mb-4" />
                  <p className="font-mono text-xs text-charcoal-fg/50 uppercase tracking-wider">{s.giorni}</p>
                  <p className="font-mono text-[10px] text-charcoal-fg/30 uppercase tracking-wider mt-1">{s.extra}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-charcoal-fg/5 border border-charcoal-fg/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-charcoal-fg/40 mb-1">Spogliatoi</p>
                <p className="text-sm text-charcoal-fg/70">
                  Bambini → spogliatoi piano terra piscina &nbsp;·&nbsp; Adulti → spogliatoi standard
                </p>
              </div>
              <button
                onClick={() => scrollTo("prenota")}
                className="shrink-0 h-10 px-6 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Scegli il tuo turno →
              </button>
            </div>
          </div>
        </section>

        {/* ── ISTRUTTORI ── */}
        <section id="istruttori" className="py-20 px-5 sm:px-8 bg-bg border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label">04 / Istruttori</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <h2 className="font-display text-5xl sm:text-7xl text-charcoal mb-4 tracking-tight">
              CHI TI ALLENA
            </h2>
            <p className="text-fg/60 text-lg mb-12 max-w-lg">
              Il team che allena tutto l'anno a Wellness Town. Lo stesso livello, la stessa cura.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { nome: "Beatrice Sechi",        iniziale: "B" },
                { nome: "Simone Caretta",         iniziale: "S" },
                { nome: "Edoardo Stefanucci",     iniziale: "E" },
                { nome: "Massimiliano Mauro",     iniziale: "M" },
              ].map((i) => (
                <div key={i.nome} className="border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-primary-soft border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:border-primary transition-colors">
                    <span className="font-display text-2xl text-primary group-hover:text-white transition-colors">{i.iniziale}</span>
                  </div>
                  <p className="font-semibold text-sm text-fg">{i.nome}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1">Istruttore</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { n: "75+", desc: "partecipanti nella stagione 2025" },
                { n: "8",   desc: "settimane di corso continuativo" },
                { n: "3+5", desc: "sessioni a settimana a seconda del piano" },
              ].map((s) => (
                <div key={s.n} className="bg-primary-soft rounded-xl p-5">
                  <div className="font-display text-5xl text-primary">{s.n}</div>
                  <p className="text-sm text-fg/60 mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORM ── */}
        <section id="prenota" className="py-20 px-5 sm:px-8 bg-primary/5 border-b border-border">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="sec-label text-primary/60">05 / Prenota</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <h2 className="font-display text-5xl sm:text-7xl text-charcoal mb-4 tracking-tight">
              PRENOTA IL TUO POSTO
            </h2>
            <p className="text-fg/60 text-lg mb-10">
              Compila il modulo. Un nostro istruttore ti contatta entro{" "}
              <strong className="text-fg">24 ore</strong> per confermare e rispondere
              a qualsiasi domanda.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Nome + Cognome */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="sec-label block mb-2">Nome *</label>
                  <input
                    {...register("nome")}
                    placeholder="Marco"
                    className={cn(
                      "w-full border rounded-lg px-4 py-3 text-fg text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow",
                      errors.nome ? "border-red-400" : "border-border"
                    )}
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
                </div>
                <div>
                  <label className="sec-label block mb-2">Cognome *</label>
                  <input
                    {...register("cognome")}
                    placeholder="Rossi"
                    className={cn(
                      "w-full border rounded-lg px-4 py-3 text-fg text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow",
                      errors.cognome ? "border-red-400" : "border-border"
                    )}
                  />
                  {errors.cognome && <p className="text-red-500 text-xs mt-1">{errors.cognome.message}</p>}
                </div>
              </div>

              {/* Telefono */}
              <div>
                <label className="sec-label block mb-2">Telefono *</label>
                <input
                  {...register("telefono")}
                  type="tel"
                  placeholder="320 123 4567"
                  className={cn(
                    "w-full border rounded-lg px-4 py-3 text-fg text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow",
                    errors.telefono ? "border-red-400" : "border-border"
                  )}
                />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
              </div>

              {/* Categoria */}
              <div>
                <label className="sec-label block mb-3">Per chi ti iscrivi? *</label>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { v: "bambino",  l: "Bambino",  s: "fino a 12 anni" },
                      { v: "ragazzo",  l: "Ragazzo",  s: "13–17 anni" },
                      { v: "adulto",   l: "Adulto",   s: "18+ anni" },
                    ] as const
                  ).map((o) => (
                    <label key={o.v} className="cursor-pointer">
                      <input type="radio" value={o.v} {...register("categoria")} className="sr-only" />
                      <div
                        className={cn(
                          "border-2 rounded-xl p-4 text-center transition-all",
                          categoria === o.v
                            ? "border-primary bg-primary-soft"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <div className="font-bold text-sm text-fg">{o.l}</div>
                        <div className="text-muted text-xs mt-0.5">{o.s}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>}
              </div>

              {/* Formato */}
              <div>
                <label className="sec-label block mb-3">Formato *</label>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { v: "intensivo",      l: "Intensivo",      s: "3× settimana" },
                      { v: "superintensivo", l: "Super Intensivo", s: "5× settimana" },
                    ] as const
                  ).map((o) => (
                    <label key={o.v} className="cursor-pointer">
                      <input type="radio" value={o.v} {...register("formato")} className="sr-only" />
                      <div
                        className={cn(
                          "border-2 rounded-xl p-4 text-center transition-all",
                          formato === o.v
                            ? "border-primary bg-primary-soft"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <div className="font-bold text-sm text-fg">{o.l}</div>
                        <div className="text-muted text-xs mt-0.5">{o.s}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.formato && <p className="text-red-500 text-xs mt-1">{errors.formato.message}</p>}
              </div>

              {/* Note */}
              <div>
                <label className="sec-label block mb-2">Note (opzionale)</label>
                <textarea
                  {...register("note")}
                  rows={3}
                  placeholder="Livello di nuoto, orari preferiti, domande..."
                  className="w-full border border-border rounded-lg px-4 py-3 text-fg text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
                />
              </div>

              {submitError && (
                <p className="text-red-600 text-sm text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold text-base tracking-wide rounded-xl transition-colors shadow-lg shadow-primary/25"
              >
                {submitting ? "Invio in corso..." : "PRENOTA IL TUO POSTO →"}
              </button>

              <p className="text-muted text-xs text-center font-mono uppercase tracking-wider">
                Nessun pagamento ora · ti chiamiamo noi entro 24h
              </p>
            </form>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
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

      {/* ── STICKY BOTTOM BAR (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-primary border-t border-primary/20 px-4 py-3">
        <button
          onClick={() => scrollTo("prenota")}
          className="w-full h-12 bg-white text-primary font-bold text-sm rounded-lg"
        >
          PRENOTA ORA — prezzi 2025 fino al {PROMO_DATE}
        </button>
      </div>
    </div>
  );
}
