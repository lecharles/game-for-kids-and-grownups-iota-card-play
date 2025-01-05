import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6B46C1",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#319795",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F56565",
          foreground: "#FFFFFF",
        },
        card: {
          red: "#FF0000",
          blue: "#0000FF",
          green: "#00FF00",
          yellow: "#FFFF00",
        },
      },
      keyframes: {
        "card-flip": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        "card-hover": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "card-flip": "card-flip 0.6s ease-in-out",
        "card-hover": "card-hover 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;