const rows = [
  {
    n: "01",
    title: "8 settimane di acqua, senza interruzioni.",
    body: "Dal 8 giugno al 31 luglio. Niente pause, niente rallentamenti. Tutta l'estate sotto il livello dell'acqua.",
  },
  {
    n: "02",
    title: "Tre o cinque allenamenti a settimana.",
    body: "Intensivo: lunedì, mercoledì, venerdì. Super Intensivo: cinque giorni su cinque. Stesso team di istruttori, ritmo che scegli tu.",
  },
  {
    n: "03",
    title: "Fasce d'età separate.",
    body: "Bambini fino ai 12. Ragazzi 13-17. Adulti 18+. Tre turni dedicati, ogni gruppo ha il suo spazio e il suo istruttore.",
  },
  {
    n: "04",
    title: "Nessuna iscrizione invernale richiesta.",
    body: "Anche se non hai mai messo piede a Wellness Town, puoi iscriverti solo all'estivo. Pacchetti settimanali o full 4 settimane.",
  },
];

const WhatItIs = () => (
  <section id="cosa" className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-4">
        <div className="sticky top-24">
          <p className="sec-num mb-3">02 / Cos&apos;è</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Non sono<br />lezioni sciolte.
          </h2>
          <p className="mt-6 text-ink2 text-lg leading-relaxed">
            È un corso intensivo strutturato, con istruttori dedicati e progressione tecnica. Pensato per chi vuole{" "}
            <strong className="text-foreground">non perdere l&apos;estate</strong>.
          </p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <div className="divide-y divide-border border-t border-b border-border">
          {rows.map((row) => (
            <div key={row.n} className="p-6 sm:p-8 grid grid-cols-12 gap-4 items-start">
              <div className="col-span-2 sm:col-span-1 font-mono text-muted-foreground text-sm">
                {row.n}
              </div>
              <div className="col-span-10 sm:col-span-11">
                <p className="font-display text-2xl sm:text-3xl tracking-wide mb-2">{row.title}</p>
                <p className="text-ink2 leading-relaxed">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhatItIs;
