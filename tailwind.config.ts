import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sistema de colores Carbon - Gama Primaria (Rosa)
        primary: {
          10: 'var(--primary-10)',
          20: 'var(--primary-20)',
          30: 'var(--primary-30)',
          40: 'var(--primary-40)',
          50: 'var(--primary-50)',
          60: 'var(--primary-60)',
          70: 'var(--primary-70)',
          80: 'var(--primary-80)',
          90: 'var(--primary-90)',
          100: 'var(--primary-100)',
          DEFAULT: 'var(--primary-50)',
        },
        // Gama Secundaria (Azul Violeta)
        secondary: {
          10: 'var(--secondary-10)',
          20: 'var(--secondary-20)',
          30: 'var(--secondary-30)',
          40: 'var(--secondary-40)',
          50: 'var(--secondary-50)',
          60: 'var(--secondary-60)',
          70: 'var(--secondary-70)',
          80: 'var(--secondary-80)',
          90: 'var(--secondary-90)',
          100: 'var(--secondary-100)',
          DEFAULT: 'var(--secondary-50)',
        },
        // Gama Terciaria (Verde Azulado)
        tertiary: {
          10: 'var(--tertiary-10)',
          20: 'var(--tertiary-20)',
          30: 'var(--tertiary-30)',
          40: 'var(--tertiary-40)',
          50: 'var(--tertiary-50)',
          60: 'var(--tertiary-60)',
          70: 'var(--tertiary-70)',
          80: 'var(--tertiary-80)',
          90: 'var(--tertiary-90)',
          100: 'var(--tertiary-100)',
          DEFAULT: 'var(--tertiary-50)',
        },
        // Aliases para compatibilidad
        accent: {
          DEFAULT: 'var(--accent)',
          dark: 'var(--accent-dark)',
          light: 'var(--accent-light)',
        },
        // Grises específicos para texto
        gray: {
          80: 'var(--gray-800)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
}

export default config