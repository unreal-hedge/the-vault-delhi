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
        {/* Instant loader — injected via dangerouslySetInnerHTML so React
            does NOT track it in the virtual DOM. This prevents hydration
            mismatch: the inline script removes the loader on non-home pages
            before React hydrates, but if the loader were a React element,
            React would re-add it during hydration, causing a permanent
            loading screen on /dashboard, /book, etc. */}
        <div
          id="initial-loader-wrapper"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              <style id="initial-loader-style">
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
              </style>
              <div id="initial-loader" style="position:fixed;inset:0;z-index:99999;background:#050505;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0">
                <img src="/logo-transparent.png?v=4" alt="" style="width:120px;height:auto;opacity:0.7;margin-bottom:24px" />
                <div style="width:200px;height:3px;border-radius:3px;background:rgba(255,255,255,0.1);overflow:hidden;position:relative">
                  <div style="position:absolute;inset:0;border-radius:3px;background:#c9a84c;animation:il-bar 1.8s ease-in-out infinite"></div>
                </div>
                <p style="margin-top:16px;font-size:11px;letter-spacing:0.15em;color:rgba(201,168,76,0.7);font-family:serif;animation:il-pulse 2.2s ease-in-out infinite">Shuffling the deck...</p>
              </div>
              <script>
                (function(){
                  try {
                    var p = window.location.pathname.replace(/\\/$/, '') || '/';
                    if (p === '/') {
                      document.documentElement.classList.add('loading-lock');
                      setTimeout(function() {
                        var el = document.getElementById('initial-loader');
                        if (el) el.style.display = 'none';
                        document.documentElement.classList.remove('loading-lock');
                      }, 12000);
                    } else {
                      var w = document.getElementById('initial-loader-wrapper');
                      if (w) w.innerHTML = '';
                    }
                  } catch(e) {
                    var w = document.getElementById('initial-loader-wrapper');
                    if (w) w.innerHTML = '';
                  }
                })();
              </script>
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
