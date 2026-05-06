import { Link } from "react-router-dom";

export default function Grazie() {
  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">🏊</div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
          Richiesta ricevuta!
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Un nostro istruttore ti contatterà entro{" "}
          <strong>24 ore</strong> per confermare il posto e rispondere a
          qualsiasi domanda sul corso.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-6">
          Ricordati: l'offerta ai prezzi 2025 è valida fino al{" "}
          <strong>17 maggio 2026</strong>.
        </div>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
        >
          ← Torna alla pagina
        </Link>
      </div>
    </div>
  );
}
