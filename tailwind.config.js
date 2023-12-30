/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,md}'
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:["Poppins"]
      },
      colors: {
        'black-primary': '#131110',
        'pastel-beige': '#ffeeeb',
        'pastel-blue': '#eeebff',
        'pastel-green': '#8ce3ad',
        'pastel-yellow': '#FFE5A3',
        'border':'#e7e7e9',
        'secondary':'#FE795D',
      },
      boxShadow: {
        'gradient': 'inset -100px 100px 50px 0px #eeebff',
        'gradient-hover': 'inset -100px 100px 50px 0px #ffeeeb',
      },
      listStyleImage: {
				square: `url('data:image/svg+xml,<svg height="16" width="16" transform="translate(0, 1)" transform-origin="center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17"><path fill="%23131110" d="M8 16.065c.787 0 2.747-1.704 4.523-3.481C14.299 10.804 16 8.844 16 8.054c0-.787-1.7-2.748-3.477-4.527C10.745 1.75 8.786.047 8 .047c-.787 0-2.747 1.703-4.523 3.48C1.701 5.305 0 7.267 0 8.055c0 .788 1.7 2.75 3.477 4.528C5.253 14.36 7.213 16.065 8 16.065Z"></path></svg>')`,
			},
    },
  },
  plugins: [],
  darkMode: 'class'
}