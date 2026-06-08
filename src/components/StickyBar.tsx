import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const StickyBar = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("candidati");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      aria-hidden={hidden}
      className={`fixed bottom-0 inset-x-0 z-50 bg-charcoal text-charcoal-foreground border-t border-white/10 shadow-2xl transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo-wt.png"
            alt="Wellness Town"
            className="w-8 h-8 rounded-full bg-white p-0.5 shrink-0"
          />
          <p className="text-sm sm:text-base font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-warn live-dot shrink-0" />
            Posti limitati &mdash;{" "}
            <span className="text-charcoal-foreground/90">prima edizione estiva</span>
          </p>
        </div>
        <Button
          onClick={scrollToForm}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide px-5 sm:px-7"
        >
          PRENOTA
        </Button>
      </div>
    </div>
  );
};

export default StickyBar;
