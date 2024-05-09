import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Providers from "./_component/providers";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { NextUIProvider } from "@nextui-org/react";
import { ProvidersNextUi } from "./_component/next-ui-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfettiProvider />

        <Providers>
          <ProvidersNextUi>{children}</ProvidersNextUi>
        </Providers>
      </body>
    </html>
  );
}
