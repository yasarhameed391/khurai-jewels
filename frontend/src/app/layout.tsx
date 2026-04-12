import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khuraijewels.com"),
  title: {
    default: "Khurai Jewels | Fine Handcrafted Jewelry in Kerala",
    template: "%s | Khurai Jewels",
  },
  description: "Discover premium handcrafted jewelry from Khurai Jewels, Kochi, Kerala. Adorn Your Everyday with our exclusive collection of rings, necklaces, earrings & bracelets.",
  keywords: ["jewelry", "gold jewelry", "handcrafted jewelry", "fine jewelry", "Kerala jewelry", "rings", "necklaces", "earrings", "bracelets"],
  authors: [{ name: "Thasni Hameed", url: "https://khuraijewels.com" }],
  creator: "Khurai Jewels",
  publisher: "Khurai Jewels",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://khuraijewels.com",
    siteName: "Khurai Jewels",
    title: "Khurai Jewels | Fine Handcrafted Jewelry",
    description: "Discover premium handcrafted jewelry from Khurai Jewels, Kochi, Kerala. Adorn Your Everyday.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Khurai Jewels - Fine Handcrafted Jewelry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khurai Jewels | Fine Handcrafted Jewelry",
    description: "Discover premium handcrafted jewelry from Khurai Jewels, Kochi, Kerala.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://khuraijewels.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#7a4538]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}