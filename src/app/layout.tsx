import type { Metadata } from "next";
import { Cinzel, Outfit, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
});

const tiro = Tiro_Devanagari_Marathi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-mr",
});

const title = "Kuthe Bappa — Where is Bappa in Mumbai?";
const description =
  "A cinematic 3D map of Mumbai’s famous Ganpati pandals for Ganeshotsav 2026. Ganpati Bappa Morya. Mangal Murti Morya.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Kuthe Bappa",
  keywords: [
    "Ganeshotsav",
    "Mumbai",
    "Ganpati",
    "Lalbaugcha Raja",
    "darshan",
    "Kuthe Bappa",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: "Kuthe Bappa",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${outfit.variable} ${tiro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
