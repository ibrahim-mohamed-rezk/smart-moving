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
      backgroundImage: {
        'my-bg': "url('/75d033f9110ecbc423ce79318c6de657ef8e4a66.png')"
      }
    },
  },
  plugins: [],
};

export default config;
