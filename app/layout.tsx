import type { Metadata } from "next";
import { Nunito, Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
const fontRubik = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

const fontNunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warehouse",
  description: "Play with large data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontRubik.className} ${fontNunito.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
