/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'abyss': '#0D1117',
        'abyss-light': '#161B22',
        'abyss-card': '#1C2128',
        'primary': '#00afff',
        'primary-light': '#33bbff',
        'primary-dark': '#008fcc',
        'background': '#e2e2e2',
        'background-light': '#f5f5f5',
        'surface': '#ffffff',
        'glow-cyan': '#00F0FF',
        'glow-green': '#00FF66',
        'glow-blue': '#0080FF',
        'glow-purple': '#8B5CF6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}