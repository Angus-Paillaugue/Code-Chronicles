import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,md}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'],
        mono: ['JetBrains Mono'],
      },
      colors: {
        'black-primary': '#131110',
        border: '#e7e7e9',
        'border-dark': '#2d2d2d',
      },
      listStyleImage: {
        square: `url('data:image/svg+xml,<svg height="16" width="16" transform="translate(0, 1)" transform-origin="center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17"><path fill="%23131110" d="M8 16.065c.787 0 2.747-1.704 4.523-3.481C14.299 10.804 16 8.844 16 8.054c0-.787-1.7-2.748-3.477-4.527C10.745 1.75 8.786.047 8 .047c-.787 0-2.747 1.703-4.523 3.48C1.701 5.305 0 7.267 0 8.055c0 .788 1.7 2.75 3.477 4.528C5.253 14.36 7.213 16.065 8 16.065Z"></path></svg>')`,
      },
      textShadow: {
        code: '0 1px rgba(0, 0, 0, 0.3)',
        none: 'none',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, addUtilities, theme }) {
      // Add text-shadow utilities
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {
          values: theme('textShadow'),
        }
      ),
        addUtilities({
          // Add font-ligatures utilities
          '.ligatures-normal': {
            fontVariantLigatures: 'normal',
          },
          '.ligatures-none': {
            fontVariantLigatures: 'none',
          },
          // Add text-wrap utilities
          '.text-wrap-none': {
            textWrap: 'none',
          },
          '.text-wrap-balance': {
            textWrap: 'balance',
          },
        });
    }),
  ],
  darkMode: 'class',
};
