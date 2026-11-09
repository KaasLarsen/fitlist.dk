import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { CampaignBanner } from "@/components/CampaignBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getActiveCampaignBanner } from "@/lib/campaigns";
import { homeOgPath } from "@/lib/og";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Fitlist — Træningsmaskiner til hjemmet",
    template: "%s | Fitlist",
  },
  description:
    "Den ultimative hjælper til træningsmaskiner til hjemmet. Guides, sammenligninger og anbefalinger.",
  metadataBase: new URL("https://www.fitlist.dk"),
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "Fitlist",
    images: [
      {
        url: homeOgPath(),
        width: 1200,
        height: 630,
        alt: "Fitlist — Træningsmaskiner til hjemmet",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [homeOgPath()],
  },
  other: {
    "google-adsense-account": "ca-pub-7373148222153531",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const campaign = getActiveCampaignBanner();

  return (
    <html
      lang="da"
      className={`${dmSans.variable} ${oswald.variable} h-full antialiased${campaign ? " has-campaign-banner" : ""}`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <CampaignBanner />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
