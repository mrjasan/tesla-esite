import { Noto_Sans } from "@next/font/google"
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import MainLayout from "./components/MainLayout";

const notoSans = Noto_Sans({
  subsets: [
    'latin',
  ],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

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
    <html lang="en" className={notoSans.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Providers>
        <body className="subpixel-antialiased text-foreground">
          <MainLayout>{children}</MainLayout>
        </body>
      </Providers>
    </html>
  );
}
