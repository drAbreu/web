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
        // DATASTAR Twilight Palette - Astronomy/Sunset Theme
        // All colors derived from the cosmic sunset gradient
        brand: {
          navy: '#1a2845',      // Deep space navy
          purple: '#4a3a5a',    // Twilight purple
          burgundy: '#8b4560',  // Dusk burgundy
          coral: '#c97870',     // Sunset coral (primary accent)
          salmon: '#e89a80',    // Warm salmon
          orange: '#f4a566',    // Golden hour orange (secondary accent)
          gold: '#ffc488',      // Stellar gold (highlight)
        },
        // Accent Colors - Subdued twilight tones
        accent: {
          coral: '#c97870',     // Alias for brand-coral
          gold: '#ffc488',      // Alias for brand-gold
          cream: '#fff8f0',     // Soft cream
        },
        // Neutrals
        neutral: {
          silver: '#b8b8c8',
          'dark-navy': '#0d1520',
          'light-cream': '#fef9f3',
        },
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #1a2845 0%, #4a3a5a 25%, #8b4560 50%, #c97870 75%, #f4a566 100%)',
        'gradient-twilight': 'linear-gradient(to right, #c97870, #f4a566, #ffc488)',
        'gradient-warm': 'linear-gradient(to right, #f4a566, #ffc488)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
