import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// URL del Web App Apps Script collegato allo Google Sheet
// "Nuoto Intensivo Estivo 2026 — Richieste". I lead vengono appesi come righe.
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxjS7WAPYxm2bxaQUjT5ws3YfuO5VgHynno5WFcToTr16365yFXvNUF5CsPfcT415dX/exec";

const categorieOptions = [
  { value: "bambino" as const, label: "Bambino", sub: "fino 12" },
  { value: "ragazzo" as const, label: "Ragazzo", sub: "13—17" },
  { value: "adulto"  as const, label: "Adulto",  sub: "18+" },
];

const formatoOptions = [
  { value: "intensivo"      as const, label: "Intensivo",       sub: "3× sett. — da €40" },
  { value: "superintensivo" as const, label: "Super Intensivo", sub: "5× sett. — da €60" },
  { value: "non_so"         as const, label: "Non lo so ancora", sub: "decidiamo insieme" },
];

const schema = z.object({
  nome: z.string().trim().min(2, "Inserisci il nome").max(80),
  cognome: z.string().trim().min(2, "Inserisci il cognome").max(80),
  telefono: z
    .string()
    .trim()
    .min(6, "Inserisci un numero valido")
    .max(20, "Numero troppo lungo")
    .regex(/^[+0-9\s().-]+$/, "Formato non valido"),
  email: z.string().trim().email("Email non valida").max(255).optional().or(z.literal("")),
  categoria: z.enum(["bambino", "ragazzo", "adulto"], {
    errorMap: () => ({ message: "Scegli per chi ti iscrivi" }),
  }),
  formato: z.enum(["intensivo", "superintensivo", "non_so"], {
    errorMap: () => ({ message: "Scegli un formato" }),
  }),
  note: z.string().trim().max(500).optional().or(z.literal("")),
  privacy: z.literal(true, { errorMap: () => ({ message: "Devi accettare la Privacy Policy" }) }),
});

type FormValues = {
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  categoria: "" | "bambino" | "ragazzo" | "adulto";
  formato: "" | "intensivo" | "superintensivo" | "non_so";
  note: string;
  privacy: boolean;
};

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const ApplicationForm = () => {
  const [values, setValues] = useState<FormValues>({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    categoria: "",
    formato: "",
    note: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormValues>(key: K, val: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key as keyof FieldErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const newErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const k = issue.path[0] as keyof FieldErrors;
        if (!newErrors[k]) newErrors[k] = issue.message;
      });
      setErrors(newErrors);
      toast.error("Controlla i campi evidenziati");
      return;
    }
    setSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          nome: parsed.data.nome,
          cognome: parsed.data.cognome,
          telefono: parsed.data.telefono,
          email: parsed.data.email ?? "",
          categoria: parsed.data.categoria,
          formato: parsed.data.formato,
          note: parsed.data.note ?? "",
          privacy: parsed.data.privacy,
          source: "landing-nuoto-intensivo-2026",
          submitted_at: new Date().toISOString(),
        }),
      });
      // Evento di conversione Meta Pixel
      (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq?.(
        "track",
        "Lead",
        { content_name: "nuoto-intensivo-estivo-2026" }
      );
      window.location.assign("/grazie");
    } catch {
      toast.error("Qualcosa è andato storto. Riprova o chiamaci direttamente.");
      setSubmitting(false);
    }
  };

  const errClass = (k: keyof FieldErrors) =>
    errors[k] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="nome" className="font-bold text-sm">
            Nome <span className="text-cross">*</span>
          </Label>
          <Input
            id="nome"
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            className={`h-12 ${errClass("nome")}`}
            autoComplete="given-name"
            required
          />
          {errors.nome && <p className="text-destructive text-sm">{errors.nome}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cognome" className="font-bold text-sm">
            Cognome <span className="text-cross">*</span>
          </Label>
          <Input
            id="cognome"
            value={values.cognome}
            onChange={(e) => update("cognome", e.target.value)}
            className={`h-12 ${errClass("cognome")}`}
            autoComplete="family-name"
            required
          />
          {errors.cognome && <p className="text-destructive text-sm">{errors.cognome}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono" className="font-bold text-sm">
          Telefono <span className="text-cross">*</span>
        </Label>
        <Input
          id="telefono"
          type="tel"
          value={values.telefono}
          onChange={(e) => update("telefono", e.target.value)}
          className={`h-12 ${errClass("telefono")}`}
          placeholder="es. 333 1234567"
          autoComplete="tel"
          required
        />
        {errors.telefono && <p className="text-destructive text-sm">{errors.telefono}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-bold text-sm">
          Email <span className="text-muted-foreground font-normal text-xs">(opzionale)</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className={`h-12 ${errClass("email")}`}
          placeholder="nome@email.it"
          autoComplete="email"
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-3">
        <Label className="font-bold text-sm">
          Per chi ti iscrivi? <span className="text-cross">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {categorieOptions.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                name="categoria"
                value={opt.value}
                checked={values.categoria === opt.value}
                onChange={() => update("categoria", opt.value)}
                className="peer sr-only"
              />
              <span className="block text-center px-3 py-4 rounded-md border-2 border-border bg-card peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary text-sm font-bold transition-colors">
                <span className="block">{opt.label}</span>
                <span className="block text-[10px] font-mono uppercase tracking-widest opacity-70 mt-1">
                  {opt.sub}
                </span>
              </span>
            </label>
          ))}
        </div>
        {errors.categoria && <p className="text-destructive text-sm">{errors.categoria}</p>}
      </div>

      <div className="space-y-3">
        <Label className="font-bold text-sm">
          Quale formato preferisci? <span className="text-cross">*</span>
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {formatoOptions.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                name="formato"
                value={opt.value}
                checked={values.formato === opt.value}
                onChange={() => update("formato", opt.value)}
                className="peer sr-only"
              />
              <span className="block text-center px-3 py-4 rounded-md border-2 border-border bg-card peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary text-sm font-bold transition-colors">
                <span className="block">{opt.label}</span>
                <span className="block text-[10px] font-mono uppercase tracking-widest opacity-70 mt-1">
                  {opt.sub}
                </span>
              </span>
            </label>
          ))}
        </div>
        {errors.formato && <p className="text-destructive text-sm">{errors.formato}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="note" className="font-bold text-sm">
          Note <span className="text-muted-foreground font-normal text-xs">(opzionale)</span>
        </Label>
        <Textarea
          id="note"
          value={values.note}
          onChange={(e) => update("note", e.target.value)}
          rows={3}
          placeholder="Livello di nuoto, orario preferito, domande..."
          className={errClass("note")}
        />
      </div>

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="privacy"
          checked={values.privacy}
          onCheckedChange={(c) => update("privacy", c === true)}
          className="mt-1"
        />
        <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed cursor-pointer">
          Ho letto e accetto la{" "}
          <a
            href="https://wellnesstown.it/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            Privacy Policy
          </a>{" "}
          <span className="text-cross">*</span>
        </Label>
      </div>
      {errors.privacy && <p className="text-destructive text-sm -mt-3">{errors.privacy}</p>}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold tracking-wider"
        style={{
          boxShadow: "0 1px 0 hsl(0 0% 0% / 0.04), 0 8px 24px -8px hsl(199 89% 42% / 0.55)",
        }}
      >
        {submitting ? "INVIO IN CORSO..." : "PRENOTA IL MIO POSTO \u2192"}
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Nessun pagamento ora. Ti chiamiamo entro 24 ore per confermare formato, orario e modalità di iscrizione.
      </p>
    </form>
  );
};

export default ApplicationForm;
