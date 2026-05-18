import { Fragment } from "react";

const tickerItems = [
  "8 GIUGNO — 31 LUGLIO",
  "8 SETTIMANE",
  "BAMBINI · RAGAZZI · ADULTI",
  "3 O 5 ALLENAMENTI",
  "ROMA SUD",
  "ISTRUTTORI CERTIFICATI",
];

const scrollToForm = () =>
  document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });

const TickerRow = ({ hidden }: { hidden?: boolean }) => (
  <div className="flex gap-12 items-center shrink-0" aria-hidden={hidden}>
    {tickerItems.map((item) => (
      <Fragment key={item}>
        <span className="font-display text-2xl tracking-wider">{item}</span>
        <span className="text-primary font-display text-2xl">&middot;</span>
      </Fragment>
    ))}
  </div>
);

type HeroProps = { hideCTA?: boolean };

const Hero = ({ hideCTA = false }: HeroProps) => (
  <>
    <section className="relative paper-grain border-b border-border overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24 grid grid-cols-12 gap-8">
        {/* Left */}
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-center gap-3 mb-8">
            <span className="sec-num">01 / Nuoto Intensivo Estate 2026</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="inline-flex items-center gap-2 bg-secondary text-primary border border-primary/20 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary live-dot" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
              8 settimane &middot; 8 giugno &mdash; 31 luglio &middot; Roma Sud
            </span>
          </div>

          <h1 className="font-display text-[64px] leading-[0.92] sm:text-[96px] md:text-[116px] tracking-tight mb-6">
            DUE MESI IN VASCA.{" "}
            <br />
            <span className="text-primary">SETTEMBRE</span> NON{" "}
            <br className="hidden sm:block" />
            TI RICONOSCE.
          </h1>

          <p className="text-lg sm:text-2xl text-ink2 max-w-2xl leading-relaxed mb-8">
            Corsi di nuoto intensivo per <strong className="text-foreground">bambini, ragazzi e adulti</strong>. Tre o cinque allenamenti a settimana,{" "}
            <span className="marker font-bold">istruttori certificati di Wellness Town</span>, una piscina dedicata. Niente settimane buttate, niente regressione tecnica.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
            {!hideCTA && (
              <button
                onClick={scrollToForm}
                className="h-14 px-8 inline-flex items-center rounded-md bg-primary text-primary-foreground text-sm font-bold tracking-wider hover:-translate-y-px transition-transform"
                style={{
                  boxShadow:
                    "0 1px 0 hsl(0 0% 0% / 0.04), 0 8px 24px -8px hsl(199 89% 42% / 0.55)",
                }}
              >
                PRENOTA IL TUO POSTO &nbsp;&rarr;
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="w-9 h-9 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center font-bold text-[13px] text-primary">
                  75
                </span>
                <span className="w-9 h-9 rounded-full bg-foreground/15 border-2 border-background flex items-center justify-center font-bold text-[13px]">
                  +
                </span>
              </div>
              <div className="text-[13px] leading-tight">
                <p className="font-bold">Già 75 iscritti nel 2025</p>
                <p className="text-muted-foreground">stagione passata &middot; 8 settimane</p>
              </div>
            </div>
          </div>

          {/* Promo card */}
          <div className="bg-charcoal text-charcoal-foreground rounded-xl p-4 sm:p-5 max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[11px] text-warn">
                <span className="w-1.5 h-1.5 rounded-full bg-warn live-dot" />
                <span>Promo &middot; fino al 23 maggio</span>
              </div>
              <div className="font-mono uppercase tracking-widest text-[11px] opacity-70">
                Edizione &middot; Estate 2026
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal-foreground/50 mb-1">
                  Intensivo &middot; 4 sett.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl leading-none text-primary">€129</span>
                  <span className="font-mono text-sm text-charcoal-foreground/40 line-through">€139</span>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal-foreground/50 mb-1">
                  Super &middot; 4 sett.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl leading-none text-primary">€149</span>
                  <span className="font-mono text-sm text-charcoal-foreground/40 line-through">€159</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[12px] text-charcoal-foreground/60">
              Iscrivendoti entro il 23 maggio paghi i prezzi 2025. Dal 24 maggio listino 2026.
            </p>
          </div>
        </div>

        {/* Right: visual block — placeholder professionale, sostituire con foto vasca quando disponibili */}
        <aside className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border">
            <img
              src="/vasca-principale.jpg"
              alt="Piscina Wellness Town"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-charcoal text-charcoal-foreground font-mono uppercase tracking-widest text-[10px] px-2 py-1 rounded">
              EST &middot; 2026
            </div>
          </div>
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-border">
            <img
              src="/vasca-allenamento.jpg"
              alt="Allenamento in vasca Wellness Town"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </aside>
      </div>

      {/* Ticker */}
      <div className="border-t border-b border-border bg-card overflow-hidden">
        <div className="ticker-track flex gap-12 py-4 whitespace-nowrap">
          <TickerRow />
          <TickerRow hidden />
        </div>
      </div>
    </section>
  </>
);

export default Hero;
