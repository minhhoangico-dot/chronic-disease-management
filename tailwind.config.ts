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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', // Sky 500
          600: '#0284c7', // Sky 600
          700: '#0369a1', // Sky 700
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981', // Emerald 500
          600: '#059669', // Emerald 600
        },
      },
    },
  },
  plugins: [],
};
export default config;
