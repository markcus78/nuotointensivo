import { useEffect, useRef, type ReactNode } from "react";

const phases = [
  {
    n: "01",
    duration: "60 secondi",
    name: "PRENOTA",
    body: "Compili il modulo qui sotto e completa il pagamento online. Nome, cognome, telefono, fascia d'età, formato che preferisci.",
    detail: "→ Iscrizione e pagamento online, subito.",
    warn: false,
  },
  {
    n: "02",
    duration: "Entro 24h",
    name: "TI CHIAMIAMO",
    body: "Un istruttore ti contatta per confermare il livello di nuoto e l'orario migliore per te. Ti spieghiamo tutto.",
    detail: "→ Sei già iscritto: la chiamata è per trovare il turno giusto.",
    warn: false,
  },
  {
    n: "03",
    duration: "Lun 8.06",
    name: "PRIMO TUFFO",
    body: "Lunedì 8 giugno alle 17:10 il primo allenamento. Ti aspettiamo in vasca. Costume, cuffia, occhialini.",
    detail: "→ Certificato medico di idoneità sportiva non agonistica richiesto per tutti (bambini dai 6 anni), se non già fornito.",
    warn: true,
  },
  {
    n: "04",
    duration: "8 settimane",
    name: "PROGREDISCI",
    body: "Tre o cinque allenamenti a settimana, sempre con lo stesso team di istruttori. Costruzione tecnica, fiato, sicurezza in acqua.",
    detail: "→ 8 giugno – 31 luglio. Pacchetti settimanali o full 4 sett.",
    warn: false,
  },
  {
    n: "05",
    duration: "Settembre",
    name: "RIENTRO AVANZATI",
    body: "Settembre arriva e tu non sei tornato a zero. Stile pulito, resistenza migliorata, sicurezza nuova. Pronti per l'anno.",
    detail: "→ Chi si ferma due mesi ricomincia da capo. Tu no.",
    warn: false,
  },
];

function RevealLi({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className={`reveal ${className ?? ""}`}>
      {children}
    </li>
  );
}

const Phases = () => (
  <section id="funziona" className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 md:col-span-7">
          <p className="sec-num mb-3">03 / Come funziona</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Cinque passi.
            <br />
            Niente di più.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex md:items-end">
          <p className="text-ink2 text-lg leading-relaxed">
            Dal modulo al primo tuffo in due giorni. Dal primo tuffo al rientro a settembre, otto settimane piene di acqua.
          </p>
        </div>
      </div>

      <ol className="relative">
        <span
          className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />

        {phases.map((p, idx) => (
          <RevealLi
            key={p.n}
            className={`relative pl-10 sm:pl-16 ${idx < phases.length - 1 ? "pb-10" : ""}`}
          >
            {p.warn ? (
              <span className="phase-bullet-warn absolute left-0 sm:left-2 top-2" />
            ) : (
              <span className="phase-bullet absolute left-0 sm:left-2 top-2" />
            )}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-3">
                <p
                  className={`font-mono text-sm uppercase tracking-widest ${
                    p.warn ? "text-warn" : "text-muted-foreground"
                  }`}
                >
                  Fase {p.n} &middot; {p.duration}
                </p>
              </div>
              <div className="col-span-12 sm:col-span-9">
                <h3 className="font-display text-4xl sm:text-5xl mb-2">{p.name}</h3>
                <p className="text-ink2 text-lg leading-relaxed mb-3">{p.body}</p>
                <p className="text-muted-foreground text-sm">{p.detail}</p>
              </div>
            </div>
          </RevealLi>
        ))}
      </ol>
    </div>
  </section>
);

export default Phases;
