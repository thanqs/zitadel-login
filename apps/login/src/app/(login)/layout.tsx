import "@/styles/globals.scss";

import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { Skeleton } from "@/components/skeleton";
import { Theme } from "@/components/theme";
import { ThemeProvider } from "@/components/theme-provider";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { getBrandingSettings } from "@/lib/zitadel";
import { Analytics } from "@vercel/analytics/react";
import { Lato } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode, Suspense } from "react";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  const branding = await getBrandingSettings({
    serviceUrl,
    organization: undefined,
  });

  return (
    <html className={`${lato.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Suspense
            fallback={
              <div
                className={`relative min-h-screen bg-background-light-600 dark:bg-background-dark-600 flex flex-col justify-center`}
              >
                <div className="relative mx-auto max-w-[440px] py-8 w-full">
                  <Skeleton>
                    <div className="h-40"></div>
                  </Skeleton>
                  <div className="flex flex-row justify-end py-4 items-center space-x-4">
                    <Theme />
                  </div>
                </div>
              </div>
            }
          >
            <LanguageProvider>
              <div
                className={`relative min-h-screen bg-background-light-600 dark:bg-background-dark-600 flex flex-col justify-center`}
              >
                <div
                  className="px-8"
                  style={{
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                    height: "72px",
                  }}
                >
                  <Logo
                    lightSrc={branding?.lightTheme?.logoUrl}
                    darkSrc={branding?.darkTheme?.logoUrl}
                    height={150}
                    width={128}
                  />
                </div>
                <div className="relative mx-auto max-w-[440px] py-8 w-full ">
                  {children}
                  <div className="flex flex-row justify-end py-4 items-center space-x-4">
                    <LanguageSwitcher />
                    <Theme />
                  </div>
                </div>
              </div>
            </LanguageProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
