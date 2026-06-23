import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefcf8',
          100: '#faf7f2',
          200: '#f5eddf',
          300: '#ecd9c0',
        },
        brown: {
          950: '#1a0d05',
          900: '#2c1810',
          800: '#4a2c1a',
          700: '#6b3a22',
          600: '#8b4513',
        },
        terracotta: {
          900: '#7c2d0a',
          700: '#b84014',
          600: '#c1440e',
          500: '#d4572a',
          400: '#e06b40',
          200: '#f5c4b0',
          100: '#fde8df',
        },
        sage: {
          700: '#3d5229',
          600: '#4a6233',
          500: '#5c6e44',
          300: '#9aad7d',
          100: '#e4ecda',
        },
        tan: {
          200: '#e8d5b7',
          100: '#f2e8d5',
        },
        amber: {
          600: '#b45309',
          100: '#fef3c7',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        stone: {
          css: {
            '--tw-prose-body': theme('colors.brown.800'),
            '--tw-prose-headings': theme('colors.brown.900'),
            '--tw-prose-bold': theme('colors.brown.900'),
            '--tw-prose-links': theme('colors.terracotta.600'),
            '--tw-prose-counters': theme('colors.brown.600'),
            '--tw-prose-bullets': theme('colors.terracotta.500'),
            '--tw-prose-hr': theme('colors.tan.200'),
            '--tw-prose-quotes': theme('colors.brown.700'),
            '--tw-prose-quote-borders': theme('colors.terracotta.400'),
            '--tw-prose-captions': theme('colors.brown.600'),
            '--tw-prose-code': theme('colors.brown.900'),
            '--tw-prose-pre-bg': theme('colors.cream.200'),
            h2: {
              fontFamily: theme('fontFamily.serif').join(', '),
              borderBottom: `1px solid ${theme('colors.tan.200')}`,
              paddingBottom: theme('spacing.2'),
            },
            h3: {
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            'input[type="checkbox"]': {
              accentColor: theme('colors.terracotta.600'),
              marginRight: theme('spacing.2'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
