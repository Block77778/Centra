import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["600"],
})

export const metadata: Metadata = {
  title: "Centra - Stable, Transparent Future Beyond Fiat | New Currency",
  description:
    "Centra is a stable, transparent fiat replacement designed to end inflation, corruption, and inequality in money. Join the future of new currency with blockchain transparency.",
  keywords:
    "new currency, fiat replacement, transparent money, stable currency, blockchain money, cryptocurrency, inflation-proof currency, decentralized finance",
  authors: [{ name: "Centra Team" }],
  creator: "Centra",
  publisher: "Centra",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Centra - Stable, Transparent Future Beyond Fiat",
    description:
      "A stable, transparent future beyond fiat currency. Designed to end inflation, corruption, and inequality in money.",
    url: "https://centra.org",
    siteName: "Centra",
    type: "website",
    images: [
      {
        url: "/centra-wordmark.png",
        width: 1200,
        height: 630,
        alt: "Centra - The Future Beyond Fiat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centra - Stable, Transparent Future Beyond Fiat",
    description: "A stable, transparent future beyond fiat currency.",
    images: ["/centra-wordmark.png"],
  },
  generator: "v0.app",
}

export const viewport = "width=device-width, initial-scale=1"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="font-[var(--font-poppins)] font-semibold">{children}</body>
    </html>
  )
}
