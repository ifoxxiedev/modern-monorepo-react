/** @type {import('tailwindcss').Config} */
import config from "../../packages/ui/src/tailwind.config";

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
