import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SnackbarProvider from "@/components/Snackbar";

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
  description: "Discover premium handcrafted jewelry from Khurai Jewels, . Adorn Your Everyday with our exclusive collection of rings, necklaces, earrings & bracelets.",
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
    description: "Discover premium handcrafted jewelry from Khurai Jewels, . Adorn Your Everyday.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Khurai Jewels - Fine Handcrafted Jewelry",
      },
    ],
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
    icon: "/logo.png",
    apple: "/logo.png",
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
      <body className="min-h-full flex flex-col bg-[#8F4B43]">
        <Navbar />
        <SnackbarProvider>
          <main className="flex-1">{children}</main>
        </SnackbarProvider>
        <Footer />
      </body>
    </html>
  );
}