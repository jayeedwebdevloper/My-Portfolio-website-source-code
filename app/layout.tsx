import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
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

export const metadata: Metadata = {
  title: "Web And Mobile Solutions",
  description: "Professional web and mobile app development solutions tailored for businesses of all sizes. We build high-performance websites, cross-platform mobile apps, and integrate powerful AI APIs to deliver smart, scalable, and future-ready digital experiences.",
  keywords: ["web development", "mobile app development", "mobile", "web", "ai", "modern"]
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
        className={`font-open-sans scroll-smooth bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 antialiased w-full min-h-screen relative text-white`}
      >
        <Context>
          <Layout>
            {children}
          </Layout>
        </Context>
        <SpeedInsights />
      </body>
    </html>
  );
}
