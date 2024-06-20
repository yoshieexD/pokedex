/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens: {
        'xxs': '320px',
        // => @media (min-width:360px) { ... }
        'xs': '480px',
        // => @media (min-width:480px)
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1500px',
        // => @media (min-width: 1024px) { ... }

      }
    }
  },
  plugins: []
};