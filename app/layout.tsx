import { Cinzel, Montserrat } from 'next/font/google';
import './globals.css';

const heading = Cinzel({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const body = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '700']
});

export const metadata = {
  title: 'Teefah Tailoring Accessories | Premium Fabrics & Supplies',
  description: 'Exquisite fabrics and designer supplies for the visionary creator. Shasha Road Flagship.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}