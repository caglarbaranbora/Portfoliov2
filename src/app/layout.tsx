import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site";
const inter = Inter({ subsets: ["latin"] });

const description =
  "Caglar Baran Bora — Mobile & Frontend Developer and co-founder of Guchly Studio. Building cross-platform apps (Swift, React Native) and scalable web products with Next.js, TypeScript and Tailwind.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Caglar Baran Bora — Mobile & Frontend Developer",
    template: "%s — Caglar Baran Bora",
  },
  description,
  keywords: [
    "Caglar Baran Bora",
    "Mobile Developer",
    "Frontend Developer",
    "React Native",
    "Swift",
    "Next.js",
    "TypeScript",
    "Guchly Studio",
    "iOS Developer",
    "Portfolio",
    "Turkey",
  ],
  authors: [{ name: "Caglar Baran Bora", url: SITE_URL }],
  creator: "Caglar Baran Bora",
  applicationName: "Caglar Bora Portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Caglar Baran Bora",
    title: "Caglar Baran Bora — Mobile & Frontend Developer",
    description,
    images: [
      {
        url: "/assets/images/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Caglar Baran Bora — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caglar Baran Bora — Mobile & Frontend Developer",
    description,
    creator: "@caglarbaranbora",
    images: ["/assets/images/portfolio.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/assets/images/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <LoaderProvider>{children}</LoaderProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
