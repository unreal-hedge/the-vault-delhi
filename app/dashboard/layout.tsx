import type { Metadata } from "next";

// Tell search engines to never index or follow any /dashboard/* route.
// Next.js emits this into a <meta name="robots" ...> tag automatically
// when set in metadata, and an X-Robots-Tag HTTP header on server responses.
export const metadata: Metadata = {
  title: "The Vault — Owner",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
