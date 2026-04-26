import type { Metadata } from "next";
import { Cormorant_Garamond, Bebas_Neue, DM_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WaitlistModal } from "@/components/WaitlistModal";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Vault | Delhi's First. And Its Finest.",
  description:
    "Delhi's premier poker destination — open even late at night. Purpose-built tables, professional dealers, secure parking, and a private club atmosphere at The Vault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${bebas.variable} ${dmSans.variable} ${cinzel.variable}`}
    >
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <WaitlistModal />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
