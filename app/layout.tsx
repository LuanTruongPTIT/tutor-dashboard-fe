import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Providers from "./_component/providers";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { NextUIProvider } from "@nextui-org/react";
import { ProvidersNextUi } from "./_component/next-ui-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "@/context/app.context";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from "next/headers";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "sonner";

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
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("accesstoken");
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfettiProvider />
        <ClerkProvider
          appearance={{
            elements: {
              footer: "hidden",
            },
          }}
        >
          <Providers>
            <ReactQueryClientProvider>
              <ProvidersNextUi>
                <Toaster />
                <UserProvider inititalAccessToken={sessionToken?.value}>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </UserProvider>
              </ProvidersNextUi>
            </ReactQueryClientProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
