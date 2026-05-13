import dsOneBoxPreset from "./tailwind-preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsOneBoxPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.mdx",
  ],
  safelist: [
    // Grid responsivo (CVA classes)
    "grid-cols-1",
    "sm:grid-cols-2",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "lg:grid-cols-4",
    "lg:grid-cols-6",
    "lg:grid-cols-8",
    "lg:grid-cols-12",
    // Span classes para MetricCard
    "col-span-full",
    "sm:col-span-2",
    "lg:col-span-3",
    "lg:col-span-4",
    "lg:col-span-8",
    "lg:col-span-9",
  ],
}