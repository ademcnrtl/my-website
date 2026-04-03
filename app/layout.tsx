import { Inter, Lora } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata = {
  title: 'Adem Can Certel',
  description: 'Making the complex feel simple.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans bg-white text-[#1d1d1f] antialiased selection:bg-[#0071e3] selection:text-white">
        {children}
      </body>
    </html>
  );
}