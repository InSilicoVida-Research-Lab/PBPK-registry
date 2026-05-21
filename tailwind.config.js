/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: '1100px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2c5282',
        },
        secondary: '#718096',
        border: '#e2e8f0',
        'bg-light': '#f8fafc',
        'text-dark': '#1a202c',
        'text-muted': '#64748b',
        success: {
          DEFAULT: '#065f46',
          bg: '#ecfdf5',
        },
        warning: {
          DEFAULT: '#92400e',
          bg: '#fffbeb',
        },
        error: {
          DEFAULT: '#991b1b',
          bg: '#fef2f2',
        },
        accent: '#3182ce',
      },
      fontFamily: {
        serif: ['Times New Roman', 'Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
