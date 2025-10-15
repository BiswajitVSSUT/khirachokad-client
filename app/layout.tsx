import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";

// 🧩 Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};


export const metadata: Metadata = {
  metadataBase: new URL("https://www.khirachokada.com"),
  title: {
    default: "KHIRA CHOKADA - Premium Cattle Feed",
    template: "%s | KHIRA CHOKADA",
  },
  description:
    "KHIRA CHOKADA offers pure, nutritious, and premium-quality cattle feed for healthier and more productive livestock across Odisha.",
  keywords: [
    "khirachokada",
    "gaichokada",
    "protein chokada",
    "cattle feed",
    "matrushakti international",
    "cow food",
    "animal food",
    "best cow food in Odisha",
    "best cattle feed in Puri",
    "healthy cow feed",
    "go khadya",
    "pashu khadya",
  ],
  authors: [{ name: "Biswajit" }],
  openGraph: {
    type: "website",
    url: "https://www.khirachokada.com",
    title: "KHIRA CHOKADA - Premium Cattle Feed",
    description:
      "Pure and healthy cattle feed products for your livestock. KHIRA CHOKADA provides premium nutrition for healthy, productive cattle.",
    siteName: "KHIRA CHOKADA",
    images: [
      {
        url: "/og/og_image.png",
        width: 1200,
        height: 630,
        alt: "KHIRA CHOKADA - Premium Cattle Feed",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@khirachokada",
    title: "KHIRA CHOKADA - Premium Cattle Feed",
    description:
      "Pure and healthy cattle feed products for your livestock. KHIRA CHOKADA provides premium nutrition for healthy, productive cattle.",
    images: ["/og/og_image.png"],
    creator: "@Biswajit",
  },
  alternates: {
    canonical: "https://www.khirachokada.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KHIRA CHOKADA",
    url: "https://www.khirachokada.com",
    logo: "https://www.khirachokada.com/og/og_image.png",
    sameAs: [
      "https://facebook.com/khirachokada",
      "https://instagram.com/khirachokada",
    ],
    description:
      "Premium cattle feed brand providing nutritious and high-quality food for healthy livestock.",
  };

  return (
    <html lang="en">
      <head>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
