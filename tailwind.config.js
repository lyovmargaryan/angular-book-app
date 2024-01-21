module.exports = {
  corePlugins: {
    preflight: true // If false: Remove Tailwind Base Layer CSS Reset
  },
  // prefix: '', // for example: "tw-text-gray-800"
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        accent: '#EEBD22',
        success: '#4CAF50',
        warn: '#FF1744',
      }
    },
    screens: {
      xs: { min: '0' },
      sm: { min: '576px' },
      md: { min: '768px' },
      lg: { min: '1024px' },
      xl: { min: '1280px' },
      xxl: { min: '1400px' },
      i13: { min: '1440px' }, // inch
      i14: { min: '1512px' }, // inch

    }
  },
  plugins: []
};
