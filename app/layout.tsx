import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'AverNoxTrader | Your Financial Future',
  description: 'Trade cryptocurrencies with AI-powered automation, real-time analytics, and institutional-grade security.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#050505] text-white antialiased selection:bg-[#00FF88]/30 selection:text-white`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
