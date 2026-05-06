import ApplicationForm from "@/components/ApplicationForm";

const FormSection = () => (
  <section
    id="candidati"
    className="px-5 sm:px-8 py-24 sm:py-32 bg-charcoal text-charcoal-foreground scroll-mt-20 relative overflow-hidden"
  >
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl" />
    <div className="max-w-3xl mx-auto relative">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-warn/15 text-warn border border-warn/30 rounded-full px-3 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-warn live-dot" />
          <span className="text-xs font-bold uppercase tracking-[0.18em]">
            Promo prezzi 2025 fino al 17 maggio
          </span>
        </div>
        <p className="sec-num mb-3 text-charcoal-foreground/60">07 / Prenota</p>
        <h2 className="font-display text-5xl sm:text-7xl leading-[0.95] mb-6">
          Compila in 60 secondi.
          <br />
          <span className="text-primary">Ti chiamiamo noi.</span>
        </h2>
        <p className="text-charcoal-foreground/80 text-lg max-w-xl mx-auto leading-relaxed">
          Lasciami i tuoi dati. Un istruttore ti contatta entro 24 ore per confermare formato, orario e modalità di pagamento.
        </p>
      </div>

      <div className="bg-cream text-charcoal rounded-2xl p-6 sm:p-10">
        <ApplicationForm />
      </div>

      {/* Trust strip */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-charcoal-foreground/70 text-[12px] font-mono uppercase tracking-widest">
        <div>&#10003; Nessun pagamento ora</div>
        <div>&#10003; Ti chiamiamo entro 24h</div>
        <div>&#10003; Prezzi 2025 entro il 17 maggio</div>
      </div>
    </div>
  </section>
);

export default FormSection;
