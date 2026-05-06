/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        bg:       "hsl(42 30% 97%)",
        fg:       "hsl(210 20% 10%)",
        card:     "hsl(0 0% 100%)",
        border:   "hsl(210 20% 88%)",
        muted:    "hsl(210 15% 55%)",
        primary: {
          DEFAULT: "hsl(199 89% 42%)",
          fg:      "hsl(0 0% 100%)",
          soft:    "hsl(199 60% 92%)",
        },
        charcoal: {
          DEFAULT: "hsl(210 20% 10%)",
          fg:      "hsl(42 30% 97%)",
        },
        amber: {
          wt:      "hsl(38 95% 52%)",
          soft:    "hsl(38 95% 94%)",
        },
        teal: {
          wt:      "hsl(178 52% 43%)",
        },
      },
    },
  },
  plugins: [],
};
