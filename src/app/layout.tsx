import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
  title: "Droid Transfer: Android file transfer for Mac",
  description:
    "Droid Transfer moves photos, videos and folders between your Mac and an Android phone over USB or Wi-Fi. Free for macOS.",
  openGraph: {
    title: "Droid Transfer",
    description: "Your Android phone, one drag away.",
    images: ["/app-icon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
