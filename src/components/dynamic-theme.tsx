"use client";

import { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import { ReactNode } from "react";
import { ThemeWrapper } from "./theme-wrapper";

export function DynamicTheme({
  branding,
  children,
}: {
  children: ReactNode;
  branding?: BrandingSettings;
  appName?: string;
}) {
  return (
    <ThemeWrapper branding={branding}>
      <div className="rounded-lg bg-background-light-400 px-8 py-12 dark:bg-background-dark-500">
        <div className="mx-auto flex flex-col items-center space-y-4">


          <div className="w-full">{children}</div>
          <div className="flex flex-row justify-between"></div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
