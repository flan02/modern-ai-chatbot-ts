/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Modern Chatbot | RAG",
  description: "Developed by Dan Chanivet using RAG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistMono.className, "min-h-screen antialiased")}>
        <Providers>
          <main className="h-screen dark text-foreground bg-background">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
