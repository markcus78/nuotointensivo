const istruttori = [
  { nome: "Beatrice Sechi",     iniziale: "B" },
  { nome: "Simone Caretta",     iniziale: "S" },
  { nome: "Edoardo Stefanucci", iniziale: "E" },
  { nome: "Massimiliano Mauro", iniziale: "M" },
];

const About = () => (
  <section id="istruttori" className="px-5 sm:px-8 py-24 sm:py-32 bg-primary text-primary-foreground border-b border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-14">
        <div className="col-span-12 md:col-span-7">
          <p className="sec-num mb-3 text-primary-foreground/70">05 / Chi ti allena</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95] mb-6">
            Quattro istruttori.
            <br />
            Stessi tutta l&apos;estate.
          </h2>
          <p className="text-lg sm:text-2xl leading-relaxed text-primary-foreground/90 max-w-2xl">
            Sono il team che allena tutto l&apos;anno a Wellness Town. Stesso livello, stessa cura, stesso metodo.
            <strong> Non cambiano da una settimana all&apos;altra.</strong>
          </p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-primary-foreground/20">
            <img
              src="/wellness-town-facciata.jpg"
              alt="Wellness Town, Roma Sud"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {istruttori.map((p) => (
          <div
            key={p.nome}
            className="bg-primary-foreground/10 backdrop-blur border border-primary-foreground/15 rounded-2xl p-6 text-center hover:bg-primary-foreground/15 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center mx-auto mb-4">
              <span className="font-display text-2xl">{p.iniziale}</span>
            </div>
            <p className="font-bold">{p.nome}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/70 mt-1">
              Istruttore
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-primary-foreground/80 text-center">
        📍 Wellness Town &mdash; Via Francesco Giangiacomo 55, Roma Sud
      </p>
    </div>
  </section>
);

export default About;
