import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gray: "#808080",
          gold: "#F4C430",
          "gold-light": "#FDF6E0",
          brown: "#8B6914",
        },
        ocean: {
          DEFAULT: "#1A3C4D",
          light: "#234E63",
          dark: "#122E3B",
          deeper: "#0D2230",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
