import "@/styles/globals.scss";

import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { ThemeProvider } from "@/components/theme-provider";
import { Fustat } from "next/font/google";
import { ReactNode, Suspense } from "react";
import LogoSvg from "../../public/logo/thanqs-logo.svg"
import { ThanqsSidebar, GiftsAndPresentsIllustration } from "@/components/thanqs-sidebar";

const fustat = Fustat({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],

});

export default async function RootLayout({
                                           children,
                                         }: {
  children: ReactNode;
}) {

  return (
    <html className={`${fustat.className}`} suppressHydrationWarning>
    <head>
      <link
        href="https://fonts.cdnfonts.com/css/general-sans"
        rel="stylesheet"
      />
    </head>
    <body>
    <ThemeProvider>
      <Suspense
        fallback={
          <div
            className={`relative min-h-screen  flex  gap-8 justify-center`}
          >
            <div className="relative w-full flex-col flex grow">
              <div className="flex h-[72px] items-center px-4 lg:h-20 lg:px-6">
                <Logo
                  lightSrc={LogoSvg}
                  darkSrc={LogoSvg}
                  height={150}
                  width={128}
                />
              </div>
            </div>
            <div className="relative hidden m-8 w-full max-w-[566px] flex-col max-h-screen lg:block">
              <div
                style={{
                  backgroundColor: "hsl(271,54%,92%)",
                  height: "100%",
                  width: "100%",
                }}
                className="relative w-full  shrink-0 overflow-hidden rounded-[20px]"
              >
                <GiftsAndPresentsIllustration/>
              </div>
            </div>
          </div>
        }
      >
        <LanguageProvider>
          <div
            className={`relative min-h-screen  flex  gap-8 justify-center`}
          >
            <div className="relative w-full flex-col flex grow">
              <div className="flex h-[72px] items-center px-4 lg:h-20 lg:px-6">
                <Logo
                  lightSrc={LogoSvg}
                  darkSrc={LogoSvg}
                  height={150}
                  width={128}
                />
              </div>
              <div className="m-auto w-full max-w-[566px] space-y-6 pb-10">
                {children}
              </div>
              <div className="flex flex-row justify-end py-4 items-center space-x-4">
                <LanguageSwitcher />
              </div>
            </div>
            <div className="relative hidden m-8 w-full max-w-[566px] flex-col max-h-screen lg:block">
              <ThanqsSidebar/>
            </div>
          </div>
        </LanguageProvider>
      </Suspense>
    </ThemeProvider>
    </body>
    </html>
  );
}

