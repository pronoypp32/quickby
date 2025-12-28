import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DigiStore - Premium Digital Products Marketplace",
    template: "%s | DigiStore"
  },
  description: "Download premium digital products instantly. Software, ebooks, templates, graphics, and more. Secure payment and instant delivery.",
  keywords: ["digital products", "software", "ebooks", "templates", "graphics", "online store", "digital downloads"],
  authors: [{ name: "DigiStore Team" }],
  creator: "DigiStore",
  publisher: "DigiStore",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digistore.com",
    title: "DigiStore - Premium Digital Products",
    description: "Download premium digital products instantly",
    siteName: "DigiStore",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiStore - Premium Digital Products",
    description: "Download premium digital products instantly",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
        suppressHydrationWarning
      >
        {/* Navbar - সব page এ দেখাবে (login/register বাদে) */}
        <Navbar />
        
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer - সব page এ দেখাবে (login/register বাদে) */}
        <Footer />
      </body>
    </html>
  );
}