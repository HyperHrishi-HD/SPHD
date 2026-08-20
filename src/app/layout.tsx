import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SPHD — Happy Anniversary Mom & Dad",
  description:
    "Celebrating 18 beautiful years of Swapna & Praveen — August 21, 2008 to August 21, 2026.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${dancing.variable}`}>
      <body className="min-h-screen bg-[#FFF5EE] text-[#2D1B00] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
