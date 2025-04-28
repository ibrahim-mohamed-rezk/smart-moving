import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // important for Next.js
  ],
  theme: {
    extend: {
      fontFamily: {
        'franklin-gothic-heavy': ['Franklin Gothic Heavy', 'sans-serif'],
        'libre-baskerville': ['Libre Baskerville', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
