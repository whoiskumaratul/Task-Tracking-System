// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This includes all JavaScript/TypeScript files in the src directory
  ],
  theme: {
    extend: {
      // keyframes: {
      //   'bg-slide': {
      //     '0%': { backgroundPosition: '-100%' },
      //     '100%': { backgroundPosition: '100%' },
      //   },
      // },
      // animation: {
      //   'bg-slide': 'bg-slide 1s ease-in-out',
      // },
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          'Oxygen', 
          'Ubuntu', 
          'Cantarell', 
          '"Fira Sans"', 
          '"Droid Sans"', 
          '"Helvetica Neue"', 
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
};


// macOS will use -apple-system.
// Windows will use Segoe UI.
// Android will use Roboto.