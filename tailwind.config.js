/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a2e',
        'dark-card': '#2d2d52',
        'dark-card-secondary': '#1f1f3a',
        'dark-border': '#16213e',
        'purple-primary': '#a78bfa',
        'purple-secondary': '#c084fc',
        'pink-primary': '#e879f9',
      },
      backgroundImage: {
        'gradient-purple-blue': 'linear-gradient(to right, #a78bfa, #7c3aed, #6366f1)',
        'gradient-card': 'linear-gradient(to bottom right, #2d2d52, #1f1f3a)',
      }
    },
  },
  plugins: [],
}
