import { Playfair_Display, Meie_Script } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

// Professional serif font for headings and UI
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'] 
});

// Curvy, stylish script font for decorative elements
const meieScript = Meie_Script({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-meie' 
});

export const metadata = {
  title: 'LuxeDiamond | Luxury Jewelry',
  description: 'Hand-crafted excellence defined by purity and passion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${meieScript.variable}`}>
      <body className="antialiased bg-white text-black min-h-screen flex flex-col">
        {/* The Navbar is fixed, so it stays at the top */}
        <Navbar />

        {/* Adding 'pt-20' (padding-top: 80px) ensures the 
          body content starts below the fixed Navbar 
        */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}