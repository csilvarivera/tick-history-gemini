import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { EnvProvider } from '../context/EnvContext';
import './globals.css';

const feSansMaxiFont = localFont({
  src: [
    {
      path: '../../public/fonts/FESans-MaxiBold.woff2',
      weight: '800 900',
    },
    {
      path: '../../public/fonts/FESans-MaxiMedium.woff2',
      weight: '600 700',
    },
    {
      path: '../../public/fonts/FESans-MaxiRegular.woff2',
      weight: '400 500',
    },
    {
      path: '../../public/fonts/FESans-MaxiBlond.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/FESans-MaxiLight.woff2',
      weight: '200',
    },
    {
      path: '../../public/fonts/FESans-MaxiThin.woff2',
      weight: '100',
    },

    {
      path: '../../public/fonts/FESans-MaxiBoldItalic.woff2',
      weight: '800 900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MaxiMediumItalic.woff2',
      weight: '600 700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MaxiItalic.woff2',
      weight: '400 500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MaxiBlondItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MaxiLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MaxiThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-fe-sans-maxi',
});

const feLexendMaxiFont = localFont({
  src: [
    {
      path: '../../public/fonts/Lexend-Bold.ttf',
      weight: '800 900',
    },
    {
      path: '../../public/fonts/Lexend-Medium.ttf',
      weight: '600 700',
    },
    {
      path: '../../public/fonts/Lexend-Regular.ttf',
      weight: '400 500',
    },
    {
      path: '../../public/fonts/Lexend-Light.ttf',
      weight: '200',
    },
    {
      path: '../../public/fonts/Lexend-Thin.ttf',
      weight: '100',
    },
  ],
  variable: '--font-fe-lexend-maxi',
});

const feSansMidiFont = localFont({
  src: [
    {
      path: '../../public/fonts/FESans-MidiBold.woff2',
      weight: '800 900',
    },
    {
      path: '../../public/fonts/FESans-MidiMedium.woff2',
      weight: '600 700',
    },
    {
      path: '../../public/fonts/FESans-MidiRegular.woff2',
      weight: '400 500',
    },
    {
      path: '../../public/fonts/FESans-MidiBlond.woff2',
      weight: 'normal',
    },
    {
      path: '../../public/fonts/FESans-MidiLight.woff2',
      weight: '200',
    },

    {
      path: '../../public/fonts/FESans-MidiBoldItalic.woff2',
      weight: '800 900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MidiMediumItalic.woff2',
      weight: '600 700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MidiItalic.woff2',
      weight: '400 500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MidiBlondItalic.woff2',
      weight: 'normal',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MidiLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
  ],
  variable: '--font-fe-sans-midi',
});

const feSansMiniFont = localFont({
  src: [
    {
      path: '../../public/fonts/FESans-MiniBold.woff2',
      weight: '800 900',
    },
    {
      path: '../../public/fonts/FESans-MiniMedium.woff2',
      weight: '600 700',
    },
    {
      path: '../../public/fonts/FESans-MiniRegular.woff2',
      weight: '400 500',
    },
    {
      path: '../../public/fonts/FESans-MiniBlond.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/FESans-MiniLight.woff2',
      weight: '100 200',
    },

    {
      path: '../../public/fonts/FESans-MiniBoldItalic.woff2',
      weight: '800 900',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MiniMediumItalic.woff2',
      weight: '600 700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MiniItalic.woff2',
      weight: '400 500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MiniBlondItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FESans-MiniLightItalic.woff2',
      weight: '100 200',
      style: 'italic',
    },
  ],
  variable: '--font-fe-sans-mini',
});

export const metadata: Metadata = {
  title: 'AMA data assistant',
  description: 'AMA data assistant: a demo prototype from Google Cloud',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${feSansMaxiFont.variable} ${feSansMidiFont.variable} ${feSansMiniFont.variable} ${feLexendMaxiFont.variable}`}
        style={{ height: '100dvh'}}
      >
        <EnvProvider>{children}</EnvProvider>
      </body>
    </html>
  );
}