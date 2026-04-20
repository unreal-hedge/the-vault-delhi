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
        {/* Instant loader — visible before JS hydrates. Includes logo, bar, and text.
            ScrollIntro removes this once frames are loaded. */}
        <style
          id="initial-loader-style"
          dangerouslySetInnerHTML={{
            __html: `
              html.loading-lock, html.loading-lock body {
                overflow: hidden !important;
                height: 100% !important;
              }
              @keyframes il-bar {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
              }
              @keyframes il-pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
              }
              @keyframes il-msg {
                0% { content: "Shuffling the deck..."; }
                14% { content: "Setting up the tables..."; }
                28% { content: "Checking the vault door..."; }
                42% { content: "Warming up the felt..."; }
                56% { content: "Counting the chips..."; }
                70% { content: "Preparing your seat..."; }
                84% { content: "Locking down the vault..."; }
              }
            `,
          }}
        />
        <div
          id="initial-loader"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#050505",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-transparent.png?v=4"
            alt=""
            style={{ width: 120, height: "auto", opacity: 0.7, marginBottom: 24 }}
          />
          {/* Indeterminate loading bar */}
          <div
            style={{
              width: 200,
              height: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.1)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 3,
                background: "#c9a84c",
                animation: "il-bar 1.8s ease-in-out infinite",
              }}
            />
          </div>
          {/* Loading text */}
          <p
            style={{
              marginTop: 16,
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "rgba(201,168,76,0.7)",
              fontFamily: "serif",
              animation: "il-pulse 2.2s ease-in-out infinite",
            }}
          >
            Shuffling the deck...
          </p>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var p = window.location.pathname;
                  if (p === "/" || p === "") {
                    document.documentElement.classList.add("loading-lock");
                    setTimeout(function() {
                      var el = document.getElementById("initial-loader");
                      if (el) el.style.display = "none";
                      document.documentElement.classList.remove("loading-lock");
                    }, 12000);
                  } else {
                    var el = document.getElementById("initial-loader");
                    if (el) el.remove();
                    var st = document.getElementById("initial-loader-style");
                    if (st) st.remove();
                  }
                } catch(e) {
                  var el = document.getElementById("initial-loader");
                  if (el) el.remove();
                }
              })();
            `,
          }}
        />
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
