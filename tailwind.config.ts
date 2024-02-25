import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "dark",
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#8B0000",
          secondary: "#FFFF00",
        },
      },
    ],
  },
};
export default config;
