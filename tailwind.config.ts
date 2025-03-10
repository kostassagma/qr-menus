import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#2563eb",
      },
    },
  },
  plugins: [
    ({ addUtilities }: any) => {
      addUtilities({
        ".three-dots": {
          overflow: "hidden",
          "text-overflow": "ellipsis",
          "white-space": "nowrap",
        },
      });
    },
    require("@tailwindcss/container-queries")
  ],
} satisfies Config;
