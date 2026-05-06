import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// — Zapier webhook — sostituire con URL reale prima del deploy
const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/";

const PROMO_SCADENZA = "17 maggio 2026";

const formSchema = z.object({
  nome: z.string().min(2, "Inserisci il tuo nome"),
  cognome: z.string().min(2, "Inserisci il tuo cognome"),
  telefono: z
    .string()
    .min(9, "Numero non valido")
    .regex(/^[\d\s+\-()]+$/, "Numero non valido"),
  categoria: z.enum(["bambino", "ragazzo", "adulto"] as const),
  formato: z.enum(["intensivo", "superintensivo"] as const),
  note: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function clsx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Index() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

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
      setSubmitError("Errore nell'invio. Prova di nuovo o chiamaci direttamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── PROMO BAR ── */}
      <div className="bg-amber-400 text-gray-900 text-center py-2.5 px-4 text-sm font-semibold">
        Offerta fino al {PROMO_SCADENZA}: iscriviti ora ai prezzi 2025 — fino a <strong>€20 in meno</strong>
      </div>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-16 px-6 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-400 text-blue-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            8 Giugno – 31 Luglio 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-5">
            8 settimane di nuoto intensivo<br />
            che valgono un anno di progressi
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Mentre tutti si fermano, tu avanzi. Bambini, ragazzi e adulti —
            corsi intensivi in piscina con istruttori Wellness Town.
            Roma Sud, dal lunedì al venerdì.
          </p>
          <a
            href="#form"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            Prenota il tuo posto →
          </a>
          <p className="text-blue-200 text-sm mt-4">
            Un istruttore ti contatta entro 24 ore per confermare
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { num: "75+", label: "partecipanti lo scorso anno" },
            { num: "8", label: "settimane di corso" },
            { num: "3 o 5", label: "allenamenti a settimana" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-blue-700">{s.num}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMAT ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-3">
          Scegli il tuo formato
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Stesso pool di istruttori, stessa piscina. Diversa intensità.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Intensivo */}
          <div className="border-2 border-blue-200 rounded-2xl p-7 hover:border-blue-400 transition-colors">
            <div className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Intensivo</div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">3 allenamenti a settimana</h3>
            <p className="text-gray-500 text-sm mb-5">Lunedì · Mercoledì · Venerdì</p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>1 settimana</span>
                <div>
                  <span className="font-bold text-gray-900">€40</span>
                  <span className="text-xs text-green-600 ml-2 line-through">€35 promo</span>
                </div>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>4 settimane</span>
                <div>
                  <span className="font-bold text-gray-900 text-lg">€139</span>
                  <span className="text-xs text-green-600 ml-2 line-through">€129 promo</span>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Ideale per chi vuole migliorare senza stravolgere l'estate.
            </p>
          </div>

          {/* Super Intensivo */}
          <div className="border-2 border-blue-600 rounded-2xl p-7 bg-blue-600 text-white relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
              Il massimo dei progressi
            </div>
            <div className="text-blue-200 font-bold text-xs uppercase tracking-widest mb-2">Super Intensivo</div>
            <h3 className="text-2xl font-black mb-1">5 allenamenti a settimana</h3>
            <p className="text-blue-200 text-sm mb-5">Lunedì · Martedì · Mercoledì · Giovedì · Venerdì</p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-blue-100">
                <span>1 settimana</span>
                <div>
                  <span className="font-bold text-white">€60</span>
                  <span className="text-xs text-amber-300 ml-2 line-through">€55 promo</span>
                </div>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>4 settimane</span>
                <div>
                  <span className="font-bold text-white text-lg">€159</span>
                  <span className="text-xs text-amber-300 ml-2 line-through">€149 promo</span>
                </div>
              </div>
            </div>
            <p className="text-blue-100 text-sm">
              Per chi vuole il salto di livello vero in una sola estate.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center text-sm text-green-800">
          <strong>Promo fino al {PROMO_SCADENZA}:</strong> prezzi 2025 per chi si iscrive entro la scadenza
          — e per tutti i bambini già iscritti alle nostre scuole invernali.
        </div>
      </section>

      {/* ── ORARI ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-3">
            Orari per ogni fascia
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Tre fasce orarie dedicate — così non c'è mai sovrapposizione tra bambini e adulti.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                ora: "17:10",
                target: "Bambini",
                giorni: "Lun · Mer · Ven",
                extra: "+ Mar · Gio (solo Super Intensivo)",
                color: "bg-sky-100 border-sky-300 text-sky-800",
                icon: "🐟",
              },
              {
                ora: "18:10",
                target: "Bambini e Ragazzi",
                giorni: "Lun · Mer · Ven",
                extra: "+ Mar · Gio (solo Super Intensivo)",
                color: "bg-indigo-100 border-indigo-300 text-indigo-800",
                icon: "🏊",
              },
              {
                ora: "19:10",
                target: "Adulti",
                giorni: "Lun · Mer · Ven",
                extra: "+ Mar · Gio (solo Super Intensivo)",
                color: "bg-violet-100 border-violet-300 text-violet-800",
                icon: "💪",
              },
            ].map((s) => (
              <div
                key={s.ora}
                className={clsx("border-2 rounded-2xl p-6 text-center", s.color)}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-3xl font-black mb-1">{s.ora}</div>
                <div className="font-bold text-lg mb-3">{s.target}</div>
                <div className="text-sm opacity-80">{s.giorni}</div>
                <div className="text-xs opacity-60 mt-1">{s.extra}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAFF ── */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
          I tuoi istruttori
        </h2>
        <p className="text-gray-500 mb-8">
          Lo stesso team che allena tutto l'anno a Wellness Town.
          Conoscono ogni livello e sanno come fartelo alzare.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Beatrice Sechi", "Simone Caretta", "Edoardo Stefanucci", "Massimiliano Mauro"].map(
            (nome) => (
              <div
                key={nome}
                className="bg-blue-50 rounded-xl p-4 text-sm font-semibold text-blue-800"
              >
                🏅 {nome}
              </div>
            )
          )}
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="form" className="bg-blue-700 py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-2">
            Prenota il tuo posto
          </h2>
          <p className="text-blue-200 text-center mb-8">
            Compila il modulo. Un nostro istruttore ti contatta entro 24 ore
            per confermare e rispondere a qualsiasi domanda.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  {...register("nome")}
                  className={clsx(
                    "w-full border rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                    errors.nome ? "border-red-400" : "border-gray-300"
                  )}
                  placeholder="Marco"
                />
                {errors.nome && (
                  <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Cognome *
                </label>
                <input
                  {...register("cognome")}
                  className={clsx(
                    "w-full border rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                    errors.cognome ? "border-red-400" : "border-gray-300"
                  )}
                  placeholder="Rossi"
                />
                {errors.cognome && (
                  <p className="text-red-500 text-xs mt-1">{errors.cognome.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Telefono *
              </label>
              <input
                {...register("telefono")}
                type="tel"
                className={clsx(
                  "w-full border rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  errors.telefono ? "border-red-400" : "border-gray-300"
                )}
                placeholder="320 123 4567"
              />
              {errors.telefono && (
                <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Per chi ti iscrivi? *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { value: "bambino", label: "Bambino", sub: "fino a 12 anni" },
                    { value: "ragazzo", label: "Ragazzo", sub: "13–17 anni" },
                    { value: "adulto", label: "Adulto", sub: "18+ anni" },
                  ] as const
                ).map((opt) => (
                  <label key={opt.value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={opt.value}
                      {...register("categoria")}
                      className="sr-only peer"
                    />
                    <div className="border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 rounded-xl p-3 text-center transition-colors">
                      <div className="font-bold text-gray-900 text-sm">{opt.label}</div>
                      <div className="text-gray-500 text-xs">{opt.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.categoria && (
                <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Formato *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "intensivo", label: "Intensivo", sub: "3x settimana" },
                    { value: "superintensivo", label: "Super Intensivo", sub: "5x settimana" },
                  ] as const
                ).map((opt) => (
                  <label key={opt.value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={opt.value}
                      {...register("formato")}
                      className="sr-only peer"
                    />
                    <div className="border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 rounded-xl p-3 text-center transition-colors">
                      <div className="font-bold text-gray-900 text-sm">{opt.label}</div>
                      <div className="text-gray-500 text-xs">{opt.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.formato && (
                <p className="text-red-500 text-xs mt-1">{errors.formato.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Note (opzionale)
              </label>
              <textarea
                {...register("note")}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Livello di nuoto, domande, orari preferiti..."
              />
            </div>

            {submitError && (
              <p className="text-red-600 text-sm text-center">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-lg py-4 rounded-xl transition-colors"
            >
              {submitting ? "Invio in corso..." : "Prenota il tuo posto →"}
            </button>

            <p className="text-gray-400 text-xs text-center">
              Nessun pagamento ora. Ti contattiamo noi per confermare tutto.
            </p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center text-sm">
        <p className="font-semibold text-white mb-1">Wellness Town</p>
        <p>Via Francesco Giangiacomo 55, Roma (EUR · Roma Sud)</p>
        <p className="mt-3">
          <a href="https://wellnesstown.it" className="hover:text-white transition-colors">
            wellnesstown.it
          </a>
        </p>
      </footer>
    </div>
  );
}
