import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Spec Craft Media Ltd | Building Artists, Content & Culture",
  description:
    "Nairobi's premier music company, record label, and artist development ecosystem. Production. Visuals. Strategy. Distribution.",
  keywords: [
    "music production nairobi",
    "record label kenya",
    "artist development africa",
    "music studio nairobi",
    "spec craft media",
  ],
  openGraph: {
    title: "Spec Craft Media Ltd",
    description: "Building Artists, Content & Culture.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
