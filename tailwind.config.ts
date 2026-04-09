import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#050505",
        "deep-green": "#0a1a12",
        gold: "#C9A84C",
        "gold-light": "#E8C878",
        "card-white": "#F5F0E8",
        smoke: "#1a1a1a",
        border: "#2a2a2a",
        "red-chip": "#8B1A1A",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm)", "sans-serif"],
      },
      animation: {
        "pulse-live": "pulseLive 2s ease-in-out infinite",
      },
      keyframes: {
        pulseLive: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
