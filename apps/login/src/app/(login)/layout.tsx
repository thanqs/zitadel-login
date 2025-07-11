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
import Ribbon from "public/icons/ribbon.svg"
import Flowers from "public/icons/flowers.svg"
import Present from "public/icons/present.svg"
import LogoSvg from "public/logo/thanqs-logo.svg"
import Image from "next/image";


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
                    <GiftsAndPresentsIllustration />
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
                  <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
                    {children}

                  </div>
                  <div className="flex flex-row justify-end py-4 items-center space-x-4">
                    <LanguageSwitcher />
                    <Theme />
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
    <Image
      src={Ribbon}
      alt="Ribbon"
      width={403}
      height={403}
      className="absolute -top-20 -right-28 -rotate-12"
    />
    <Image
      src={Flowers}
      alt="Flowers"
      width={442}
      height={442}
      className="absolute top-[20%] -left-40 rotate-45"
    />
    <Image
      src={Present}
      alt="Present"
      width={483}
      height={483}
      className="absolute -right-16 -bottom-32 -rotate-[19deg]"
    />
  </>
);