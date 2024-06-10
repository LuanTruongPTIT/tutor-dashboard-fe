import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Providers from "./_component/providers";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ProvidersNextUi } from "./_component/next-ui-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "@/context/app.context";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from "next/headers";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import LocalizationProviderContext from "@/context/LocalizationProvider";

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
      <body className={inter.className} suppressHydrationWarning={true}>
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
                {/* <EdgeStoreProvider> */}
                <LocalizationProviderContext>
                  <UserProvider inititalAccessToken={sessionToken?.value}>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                  </UserProvider>
                </LocalizationProviderContext>
                <Toaster />
                <ToastContainer />
                {/* </EdgeStoreProvider> */}
              </ProvidersNextUi>
            </ReactQueryClientProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
