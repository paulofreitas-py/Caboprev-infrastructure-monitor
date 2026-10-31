/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#050B11', surface: '#0A121A', panel: '#0E1822', border: '#1C303E',
        primary: '#42C8FF', success: '#35D07F', warning: '#F5B942', danger: '#FF5C68',
        purple: '#A78BFA', ink: '#E8F0F5', muted: '#8497A6'
      },
      boxShadow: { panel: '0 18px 50px rgba(0, 0, 0, .22)' }
    }
  },
  plugins: []
}
