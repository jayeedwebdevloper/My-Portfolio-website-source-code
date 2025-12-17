import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import Context from "@/Context/Context";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const baseTitle = "Web And Mobile Solutions";
const fullTitle = `${baseTitle} | High-performance Web & Mobile Apps`;
const description = "Professional web and mobile app development solutions tailored for businesses of all sizes. We build high-performance websites, cross-platform mobile apps, and integrate powerful AI APIs to deliver smart, scalable, and future-ready digital experiences.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: fullTitle,
    template: "%s | Web And Mobile Solutions",
  },
  description,
  keywords: [
    "web development",
    "mobile app development",
    "mobile",
    "web",
    "ai",
    "modern",
    "full stack",
    "react",
    "next.js",
  ],
  applicationName: baseTitle,
  authors: [{ name: "Jayeed" }],
  creator: "Jayeed",
  publisher: "Jayeed",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: fullTitle,
    description,
    url: "/",
    siteName: baseTitle,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Jayeed" />
      </head>
      <body
        className={`font-open-sans scroll-smooth bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 antialiased w-full min-h-screen relative text-white`}
      >
        <Context>
          <Layout>
            {children}
          </Layout>
        </Context>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
