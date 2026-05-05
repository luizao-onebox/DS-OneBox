import dsOneBoxPreset from "./tailwind-preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsOneBoxPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.mdx",
  ],
}