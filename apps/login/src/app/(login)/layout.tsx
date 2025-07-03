import "@/styles/globals.scss";

import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { Skeleton } from "@/components/skeleton";
import { Theme } from "@/components/theme";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Lato } from "next/font/google";
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
                className={`relative min-h-screen  flex  gap-8 justify-center`}
              >
                <div className="relative ml-4  py-8 w-8/12 flex-col">
                  <Logo
                    lightSrc="/logo/thanqs-logo.svg"
                    darkSrc="/logo/thanqs-logo.svg"
                    height={150}
                    width={128}
                  />
                  <div className="max-w-[440px] justify-center mx-auto">
                    {children}
                    <div className="flex flex-row justify-end py-4 items-center space-x-4">
                      <LanguageSwitcher />
                      <Theme />
                    </div>
                  </div>
                </div>
                <div className="relative py-4 w-4/12 flex-col max-h-screen">
                  <div
                    style={{
                      backgroundColor: "hsl(271,54%,92%)",
                      height: "100%",
                      width: "100%",
                    }}
                    className="relative m-8 hidden  w-full max-w-[566px] shrink-0 overflow-hidden rounded-[20px]  lg:block"
                  >
                    <GiftsAndPresentsIllustration />
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

const GiftsAndPresentsIllustration = () => (
  <>
    <img
      src="/icons/ribbon.svg"
      width={403}
      height={403}
      className="absolute -top-20 -right-28 -rotate-12"
    />
    <img
      src="/icons/flowers.svg"
      width={442}
      height={442}
      className="absolute top-[20%] -left-40 rotate-45"
    />
    <img
      src="/icons/present.svg"
      width={483}
      height={483}
      className="absolute -right-16 -bottom-32 -rotate-[19deg]"
    />
  </>
);