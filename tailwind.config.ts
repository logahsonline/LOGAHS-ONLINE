import type { Config } from "tailwindcss";

// Using Tailwind v4 preset-less configuration.
// This file exists mainly to ensure Tailwind can compile in environments
// that expect tailwind.config.{js,ts}.
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

