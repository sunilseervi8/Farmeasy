/** @type {import('tailwindcss').Config} */
export default {
 
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  
  ],
  theme: {
    extend: {
      backgroundColor: {
          'custom-blue': '#000d6b',
          'hover-blue':'#020a4de9',
      },
      colors:{
        'txt-blue':'#000d6b',
      },
    },
  },
  plugins: [],
}

