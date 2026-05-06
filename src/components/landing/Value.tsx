const formats = [
  {
    badge: "FORMATO A",
    name: "INTENSIVO",
    days: "3 allenamenti / settimana",
    schedule: ["Lunedì", "Mercoledì", "Venerdì"],
    weekPriceNow: "€35",
    weekPriceFull: "€40",
    fullPriceNow: "€129",
    fullPriceFull: "€139",
    desc: "Per chi vuole migliorare in modo costante senza stravolgere l'estate.",
    highlight: false,
  },
  {
    badge: "FORMATO B",
    name: "SUPER INTENSIVO",
    days: "5 allenamenti / settimana",
    schedule: ["Lun", "Mar", "Mer", "Gio", "Ven"],
    weekPriceNow: "€55",
    weekPriceFull: "€60",
    fullPriceNow: "€149",
    fullPriceFull: "€159",
    desc: "Cinque sessioni a settimana per un salto di livello che si vede già a settembre.",
    highlight: true,
  },
];

const orari = [
  { ora: "17:10", target: "Bambini",          age: "fino 12 anni" },
  { ora: "18:10", target: "Bambini & Ragazzi", age: "13—17 anni" },
  { ora: "19:10", target: "Adulti",            age: "18+ anni" },
];

const scrollToForm = () =>
  document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });

const Value = () => (
  <section id="prezzi" className="px-5 sm:px-8 py-24 sm:py-32 bg-cream border-b border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-12 md:col-span-7">
          <p className="sec-num mb-3">04 / Prezzi e formato</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Scegli il<br />
            tuo <span className="text-primary">ritmo</span>.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex md:items-end">
          <p className="text-ink2 text-lg leading-relaxed">
            Iscrivendoti entro il <strong className="text-foreground">17 maggio</strong> paghi i prezzi 2025. Dopo il 18 maggio listino aggiornato.
          </p>
        </div>
      </div>

      {/* Format cards */}
      <div className="grid grid-cols-12 gap-4 mb-16">
        {formats.map((f) => (
          <div
            key={f.name}
            className={`col-span-12 md:col-span-6 rounded-2xl p-8 sm:p-10 relative overflow-hidden ${
              f.highlight
                ? "bg-charcoal text-charcoal-foreground"
                : "bg-card border border-border"
            }`}
          >
            {f.highlight && (
              <>
                <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-primary/20 blur-2xl" />
                <span className="absolute top-6 right-6 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">
                  Massimi progressi
                </span>
              </>
            )}
            <p
              className={`font-mono uppercase tracking-widest text-[12px] mb-3 ${
                f.highlight ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {f.badge}
            </p>
            <h3 className="font-display text-5xl sm:text-6xl leading-none mb-2 tracking-tight">{f.name}</h3>
            <p
              className={`font-mono text-xs uppercase tracking-widest mb-6 ${
                f.highlight ? "text-charcoal-foreground/70" : "text-muted-foreground"
              }`}
            >
              {f.days}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {f.schedule.map((g) => (
                <span
                  key={g}
                  className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border ${
                    f.highlight
                      ? "bg-primary/15 border-primary/30 text-primary"
                      : "bg-secondary border-primary/20 text-primary"
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>

            <div className={`grid grid-cols-2 gap-4 pb-6 mb-6 border-b ${f.highlight ? "border-charcoal-foreground/15" : "border-border"}`}>
              <div>
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${
                  f.highlight ? "text-charcoal-foreground/50" : "text-muted-foreground"
                }`}>
                  1 settimana
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl text-primary leading-none">{f.weekPriceNow}</span>
                  <span className={`font-mono text-sm line-through ${f.highlight ? "text-charcoal-foreground/40" : "text-muted-foreground"}`}>
                    {f.weekPriceFull}
                  </span>
                </div>
              </div>
              <div>
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${
                  f.highlight ? "text-charcoal-foreground/50" : "text-muted-foreground"
                }`}>
                  4 settimane
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl text-primary leading-none">{f.fullPriceNow}</span>
                  <span className={`font-mono text-sm line-through ${f.highlight ? "text-charcoal-foreground/40" : "text-muted-foreground"}`}>
                    {f.fullPriceFull}
                  </span>
                </div>
              </div>
            </div>

            <p className={`leading-relaxed mb-6 ${f.highlight ? "text-charcoal-foreground/80" : "text-ink2"}`}>
              {f.desc}
            </p>

            <button
              onClick={scrollToForm}
              className={`w-full h-12 rounded-md font-bold text-sm tracking-wider transition-colors ${
                f.highlight
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              PRENOTA {f.name} &rarr;
            </button>
          </div>
        ))}
      </div>

      {/* Orari */}
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-8">
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono uppercase tracking-widest text-[12px] text-primary mb-3">
              Orari
            </p>
            <h3 className="font-display text-3xl sm:text-5xl leading-[0.95]">
              Tre turni separati.
              <br />
              Bambini e adulti<br className="md:hidden"/> non si sovrappongono.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-ink2 leading-relaxed">
              Ogni fascia ha il suo orario, il suo istruttore, il suo spazio in spogliatoio. Lunedì, mercoledì, venerdì per tutti. Più martedì e giovedì per il Super Intensivo.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {orari.map((o) => (
            <div
              key={o.ora}
              className="border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
            >
              <p className="font-display text-6xl text-primary leading-none mb-2">{o.ora}</p>
              <p className="font-bold text-lg text-foreground">{o.target}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {o.age}
              </p>
              <div className="h-px bg-border my-4" />
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Lun &middot; Mer &middot; Ven
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 mt-1">
                + Mar &middot; Gio (Super)
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          <strong className="text-foreground">Spogliatoi:</strong> bambini al piano terra piscina &middot; adulti negli spogliatoi standard.
        </p>
      </div>
    </div>
  </section>
);

export default Value;
