/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Logo-inspired color palette (Cyan to Teal to Green gradient)
        'silica-cyan': {
          50: '#f0fdfd',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        'silica-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#134e4a',
          900: '#0d3b35',
        },
        'silica-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        // Core branding colors
        'silica-primary': '#0ea5e9',     // Sky Cyan
        'silica-secondary': '#06b6d4',   // Cyan
        'silica-tertiary': '#14b8a6',    // Teal
        'silica-accent': '#22c55e',      // Green accent
        'silica-dark': '#0a1628',        // Dark background from logo
        'silica-light': '#f0fdfd',       // Light cyan
        
        // Legacy colors maintained for compatibility
        'silica-blue': '#0ea5e9',
        'silica-gray': '#6B7280',
        'code-bg': '#1E293B',
        'code-text': '#E5E7EB',
        'quantum-gold': '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'rotate-slow': 'rotate-slow 90s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.5',
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)',
          },
          '50%': {
            opacity: '1',
            boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'rotate-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-logo': 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 25%, #14b8a6 50%, #0d9488 100%)',
        'gradient-radial-logo': 'radial-gradient(circle, #0ea5e9 0%, #06b6d4 50%, #0d9488 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(14, 165, 233, 0.4)',
        'glow-teal': '0 0 30px rgba(14, 184, 166, 0.4)',
        'glow-logo': '0 0 40px rgba(14, 165, 233, 0.3), 0 0 80px rgba(6, 182, 212, 0.2)',
      },
    },
  },
  plugins: [],
};
