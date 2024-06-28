import type { Metadata } from "next";
import "./globals.css";

import { roboto_mono } from '@/app/ui/fonts';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "Tomato timer done right",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto_mono.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
