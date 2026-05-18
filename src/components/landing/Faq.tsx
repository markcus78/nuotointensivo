const faqs = [
  {
    q: "Mio figlio non ha mai nuotato. Può comunque iscriversi?",
    a: "Sì. Abbiamo turni e gruppi differenziati per livello: chi parte da zero non viene messo con chi è già esperto. Quando ti chiamiamo dopo la prenotazione ti chiediamo il livello e troviamo il turno giusto.",
  },
  {
    q: "Qual è la differenza concreta tra Intensivo e Super Intensivo?",
    a: "L'Intensivo è 3 allenamenti a settimana (lunedì, mercoledì, venerdì). Il Super Intensivo aggiunge martedì e giovedì, per un totale di 5 sessioni. Stessi istruttori, stessa piscina. Il Super è per chi vuole il salto di livello più visibile a settembre.",
  },
  {
    q: "Si può iniziare a metà corso o fare solo qualche settimana?",
    a: "Sì. I pacchetti sono settimanali (€35 intensivo, €55 super) o full 4 settimane (€129 intensivo, €149 super, prezzi promo entro il 23 maggio). Puoi entrare anche a giugno avanzato.",
  },
  {
    q: "Devo essere già iscritto a Wellness Town tutto l'anno?",
    a: "No. Il nuoto intensivo estivo è aperto a tutti, anche a chi non ha mai messo piede da noi. È un'occasione per provarci senza impegnarsi sull'anno.",
  },
  {
    q: "Come si paga?",
    a: "Il pagamento avviene online al momento dell'iscrizione, direttamente dal modulo. Dopo, un istruttore ti contatta entro 24h per confermare il livello di nuoto e l'orario migliore per te.",
  },
  {
    q: "Cosa serve portare il primo giorno?",
    a: "Costume, cuffia, occhialini. Il certificato medico di idoneità sportiva non agonistica è richiesto per tutti i partecipanti (bambini dai 6 anni), se non è già stato fornito durante la stagione invernale.",
  },
  {
    q: "Cosa succede se salto un allenamento?",
    a: "Niente di grave. I corsi sono settimanali, ti aspettiamo al successivo. Per chi prende il pacchetto 4 settimane non sono previsti recuperi automatici, ma per assenze prolungate possiamo sempre parlarne in segreteria.",
  },
];

const Faq = () => (
  <section id="faq" className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-4">
        <div className="sticky top-24">
          <p className="sec-num mb-3">06 / Domande frequenti</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Risposte
            <br />
            chiare.
          </h2>
          <p className="mt-6 text-ink2 leading-relaxed">
            Quello che ci chiedono i genitori e gli adulti prima di iscriversi.
          </p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <div className="border-t border-border">
          {faqs.map((faq) => (
            <details key={faq.q} className="border-b border-border py-5 group">
              <summary className="flex items-center justify-between gap-6 list-none cursor-pointer">
                <span className="font-display text-2xl sm:text-3xl tracking-wide">{faq.q}</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p className="mt-4 text-ink2 leading-relaxed max-w-2xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Faq;
