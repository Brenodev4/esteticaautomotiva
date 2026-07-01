/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        preto: '#0a0a0a',
        escuro: '#111827',
        card: '#1f2937',
        borda: '#374151',
        dourado: '#f59e0b',
        'dourado-hover': '#d97706',
      }
    }
  },
  plugins: []
}
