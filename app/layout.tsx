import type { Metadata } from "next";
import "./globals.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Toaster } from "./components/ui/sonner";
import Providers from "./providers";
import MainLayout from "./components/MainLayout";

export const metadata: Metadata = {
  title: "Tesla - eSite Builder",
  description:
    "Tool for configuring Industrial Energy Battery sites using Tesla's Megapack and Powerpack products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="subpixel-antialiased text-foreground">
        <Providers>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
