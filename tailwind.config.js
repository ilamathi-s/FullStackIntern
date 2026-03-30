/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      accent: "var(--color-accent)",
      bg: "var(--color-bg)",
      card: "var(--color-card)",
      text: "var(--color-text)",
      muted: "var(--color-muted)",
      border: "var(--color-border)",
    },
    },
  },
  plugins: [],
}

