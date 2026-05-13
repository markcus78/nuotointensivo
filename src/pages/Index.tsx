import Hero from "@/components/landing/Hero";
import WhatItIs from "@/components/landing/WhatItIs";
import Phases from "@/components/landing/Phases";
import Value from "@/components/landing/Value";
import About from "@/components/landing/About";
import Faq from "@/components/landing/Faq";
import FormSection from "@/components/landing/FormSection";
import StickyBar from "@/components/StickyBar";

const navLinks = [
  { href: "#cosa",      label: "Il corso" },
  { href: "#funziona",  label: "Come funziona" },
  { href: "#prezzi",    label: "Prezzi" },
  { href: "#istruttori", label: "Istruttori" },
  { href: "#faq",       label: "FAQ" },
];

const scrollToForm = () =>
  document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Announcement bar */}
      <div className="bg-charcoal text-charcoal-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-10 flex items-center justify-between gap-4 text-[12px] sm:text-[13px]">
          <div className="flex items-center gap-2 font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-warn live-dot" />
            <span className="opacity-90">Promo prezzi 2025 fino al 17 maggio</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 font-mono uppercase tracking-widest opacity-80">
            <span>Roma Sud</span>
            <span>&middot;</span>
            <span>8 Giugno &mdash; 31 Luglio 2026</span>
          </div>
          <button
            onClick={scrollToForm}
            className="font-mono uppercase tracking-widest underline underline-offset-4 decoration-primary hover:text-primary transition-colors text-charcoal-foreground"
          >
            Prenota &rarr;
          </button>
        </div>
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo-wt.png" alt="Wellness Town" className="h-16 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-foreground/70">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <button
            onClick={scrollToForm}
            className="bg-primary text-primary-foreground px-5 h-10 inline-flex items-center rounded-md text-[13px] font-bold tracking-wide hover:bg-primary/90 transition-colors"
          >
            PRENOTA
          </button>
        </div>
      </header>

      <main>
        <Hero />
        <WhatItIs />
        <Phases />
        <Value />
        <About />
        <Faq />
        <FormSection />
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-charcoal-foreground/70 px-5 sm:px-8 py-14 border-t border-charcoal-foreground/10">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 text-sm">
          <div className="col-span-12 md:col-span-4">
            <img
              src="/logo-wt.png"
              alt="Wellness Town"
              className="h-16 w-auto mb-4 brightness-0 invert opacity-90"
            />
            <p className="leading-relaxed">
              by Appiae Sport ssd arl
              <br />
              Via F. Giangiacomo, 55 &mdash; Roma
              <br />
              P.IVA 17326171000
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="font-bold text-charcoal-foreground mb-3 font-mono uppercase tracking-widest text-[12px]">
              Contatti
            </p>
            <a href="tel:+390651390560" className="block hover:text-charcoal-foreground transition-colors">
              Tel &middot; 06 5139 056
            </a>
            <a
              href="https://wa.me/390651390560"
              className="block hover:text-charcoal-foreground transition-colors"
            >
              WhatsApp &middot; 06 5139 056
            </a>
            <a
              href="mailto:info@wellnesstown.org"
              className="block hover:text-charcoal-foreground transition-colors"
            >
              info@wellnesstown.org
            </a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="font-bold text-charcoal-foreground mb-3 font-mono uppercase tracking-widest text-[12px]">
              Naviga
            </p>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block hover:text-charcoal-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right text-charcoal-foreground/40">
            <p>&copy; {new Date().getFullYear()} Wellness Town</p>
          </div>
        </div>
      </footer>

      <StickyBar />
      <div className="h-20" aria-hidden />
    </div>
  );
};

export default Index;
