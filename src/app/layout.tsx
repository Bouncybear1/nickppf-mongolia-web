import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; // Subtitles
import localFont from "next/font/local"; // Primary Font
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

// Load JetBrains Mono from Google Fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

// Load PP Neue Montreal locally (User needs to provide files)
const ppNeueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/ppneuemontreal-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ppneuemontreal-bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/ppneuemontreal-book.woff",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-pp-neue-montreal"
});

export const metadata: Metadata = {
  title: {
    default: "NickPPF Mongolia - Автомашины будгийн хамгаалалтын хуулга",
    template: "%s | NickPPF Mongolia"
  },
  description: "The official distributor of NickPPF in Mongolia. Premium paint protection films and automotive detailing.",
  openGraph: {
    title: "NickPPF Mongolia - Автомашины будгийн хамгаалалтын хуулга",
    description: "The official distributor of NickPPF in Mongolia. Premium paint protection films and automotive detailing.",
    url: "https://nickppf.mn",
    siteName: "NickPPF Mongolia",
    images: [
      {
        url: "/paint-protection-film.avif", // Using a high quality image from public
        width: 1200,
        height: 630,
        alt: "NickPPF Mongolia",
      },
    ],
    locale: "mn_MN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NickPPF Mongolia",
    description: "The official distributor of NickPPF in Mongolia. Premium paint protection films and automotive detailing.",
    images: ["/paint-protection-film.avif"],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppNeueMontreal.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="bg-zinc-950 text-white selection:bg-red-500 selection:text-white font-sans">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen w-full">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
