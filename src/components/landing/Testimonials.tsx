const pillars = [
  {
    label: "01 / Il trainer",
    title: "Un trainer\ndedicato.",
    body:
      "Non un istruttore di sala. Un trainer che costruisce il tuo programma su misura, ti chiama se non vieni, ti chiede com'è andata. Senza giudizio, con metodo.",
    dark: false,
  },
  {
    label: "02 / Il sabato collettivo",
    title: "Si parte\ninsieme.",
    body:
      "Il 23 maggio si comincia tutti lo stesso giorno. Non sei l'unico nuovo, non sei sotto giudizio: sei uno tra 30 che cominciano insieme. Il \"primo giorno\" da soli non esiste.",
    dark: true,
  },
  {
    label: "03 / Le 5 settimane",
    title: "Il tempo\nche serve.",
    body:
      "Abbastanza lungo per costruire un'abitudine, abbastanza corto per non spaventare. Alla fine, andare in palestra non sarà più una decisione. Sarà quello che fai il martedì sera.",
    dark: false,
  },
];

const stats = [
  { value: "30", label: "posti per la prima edizione" },
  { value: "12", label: "allenamenti pianificati nel percorso" },
  { value: "2003", label: "anno di apertura di Wellness Town" },
  { value: "31.574", label: "persone hanno scelto Wellness Town" },
];

const Testimonials = () => (
  <section
    id="metodo"
    className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border"
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-12 items-end">
        <div className="col-span-12 md:col-span-7">
          <p className="sec-num mb-3">06 / Perché funziona</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Il problema non è
            <br />
            la motivazione.{" "}
            <span className="text-primary">È il &ldquo;da solo&rdquo;.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="text-ink2 text-lg leading-relaxed">
            Le persone sedentarie non sono pigre, non sono deboli. Quello che
            gli manca non è la voglia. È qualcuno che si arrabbi, in modo
            affettuoso, se non vengono. Per questo abbiamo costruito Aiutalo
            a Smettere attorno a tre cose.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {pillars.map((p) => (
          <article
            key={p.label}
            className={`col-span-12 md:col-span-4 rounded-2xl p-7 sm:p-8 flex flex-col ${
              p.dark
                ? "bg-charcoal text-charcoal-foreground"
                : "bg-card border border-border"
            }`}
          >
            <p
              className={`sec-num mb-6 ${
                p.dark ? "text-charcoal-foreground/60" : "text-muted-foreground"
              }`}
            >
              {p.label}
            </p>
            <h3 className="font-display text-5xl sm:text-6xl leading-[0.95] mb-6 whitespace-pre-line">
              {p.title}
            </h3>
            <p
              className={`leading-relaxed ${
                p.dark ? "text-charcoal-foreground/80" : "text-ink2"
              }`}
            >
              {p.body}
            </p>
          </article>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-7">
            <p className="font-display text-5xl sm:text-6xl text-primary leading-none mb-2">
              {s.value}
            </p>
            <p className="text-ink2 text-sm leading-relaxed">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
