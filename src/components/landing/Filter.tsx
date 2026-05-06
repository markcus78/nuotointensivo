const notFor = [
  "Pensi di venire “quando ti va”.",
  "Cerchi una prova omaggio per testare la struttura.",
  "Vuoi un fisico in 5 settimane. Spoiler: non capita.",
  "Non hai uno smartphone (ti scriviamo di lì).",
];

const yesFor = [
  <>Hai rimandato troppe volte e questa volta <strong>fai sul serio</strong>.</>,
  "Sai che da solo non riesci. Niente di male, è il punto.",
  "Ti presenti quando hai detto che saresti venuto.",
  "Hai 5 settimane, una palestra a Roma Sud e voglia di farlo finire bene.",
];

const scrollToForm = () =>
  document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });

const Filter = () => (
  <section className="px-5 sm:px-8 py-24 sm:py-32 bg-charcoal text-charcoal-foreground">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
        <div>
          <p className="sec-num mb-3 text-charcoal-foreground/60">03 / Onestà brutale</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Non sei per tutti.
            <br />
            <span className="text-primary">Noi nemmeno.</span>
          </h2>
        </div>
        <p className="text-charcoal-foreground/70 max-w-md">
          Leggi prima di candidarti. Ci risparmi una telefonata e ti risparmi una delusione.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal-foreground/15 rounded-2xl overflow-hidden">
        {/* Non per te */}
        <div className="bg-charcoal p-7 sm:p-10">
          <p className="font-mono uppercase tracking-widest text-[12px] text-cross mb-6">
            Non per te se
          </p>
          <ul className="space-y-5">
            {notFor.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-cross/20 text-cross flex items-center justify-center font-black shrink-0 mt-0.5 text-sm">
                  ✕
                </span>
                <span className="text-lg leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fa per te */}
        <div className="bg-cream text-charcoal p-7 sm:p-10">
          <p className="font-mono uppercase tracking-widest text-[12px] text-check mb-6">
            Fa per te se
          </p>
          <ul className="space-y-5">
            {yesFor.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-check/15 text-check flex items-center justify-center font-black shrink-0 mt-0.5 text-sm">
                  ✓
                </span>
                <span className="text-lg leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={scrollToForm}
          className="h-14 px-10 inline-flex items-center rounded-md bg-primary text-primary-foreground text-sm font-bold tracking-wider hover:-translate-y-px transition-transform"
          style={{
            boxShadow: "0 1px 0 hsl(0 0% 0% / 0.04), 0 8px 24px -8px hsl(199 89% 42% / 0.55)",
          }}
        >
          SONO PRONTO. CANDIDATI &rarr;
        </button>
        <p className="mt-3 text-charcoal-foreground/60 text-sm">
          Compila in 60 secondi &middot; ti chiamiamo entro poche ore
        </p>
      </div>
    </div>
  </section>
);

export default Filter;
