// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

function generateGridColumns(lastValue) {
  let obj = {};
  for (let i = 13; i < lastValue; i++) {
    obj[`${i}`] = `repeat(${i}, minmax(0, 1fr))`;
  }
  return obj;
}

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'fe-sans-maxi': ['var(--font-fe-sans-maxi)'],
      'Google Sans,Helvetica Neue,sans-serif': ['var(--font-fe-lexend-maxi)'],
      'fe-sans-midi': ['var(--font-fe-sans-midi)'],
      'fe-sans-mini': ['var(--font-fe-sans-mini)'],
    },
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      blue: {
        bold: '#0000FF',
        electric: '#00F5FF',
        rich: '#00005A',
      },
      green: {
        reason: '#00FF0A',
      },
      pink: {
        culture: '#FF00FF',
      },
      yellow: {
        reason: '#D2FF00',
        culture: '#FFEB00',
      },
      neutral: {
        dark: {
          1: '#0F2332F2',
          2: '#344060',
          3: '#5A647D',
          4: '#8A94A8',
          5: '#0E2332',
        },
        light: {
          1: '#FBFCFC',
          2: '#F5F6F6',
          3: '#E8EAED',
          4: '#DADDE3',
          5: '#F2F2F2',
        },
      },
    },
    extend: {
      borderWidth: {
        3: '3px',
      },
      fontSize: {
        h1: ['32px'],
        h2: ['24px'],
        h3: ['16px'],
      },
      padding: {
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        31: '7.75rem',
        51: '12.75rem',
      },
      margin: {
        88: '22rem',
      },
      gap: {
        44: '11rem',
      },
      gridTemplateColumns: {
        ...generateGridColumns(20),
      },
      borderRadius: {
        form: '0px',
        card: '0px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark':
          'var(--fe-gradient-dark, linear-gradient(90deg, #00025b 0%, #1003a1 19.18%, #1d0acb 48.30%, #005eff 71.01%))',
      },
    },
  },
  plugins: [],
};
