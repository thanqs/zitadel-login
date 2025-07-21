"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function LayoutProviders({ children }: Props) {
  const isDark = false;

  return (
    <div className={`${isDark ? "ui-dark" : "ui-light"} `}>{children}</div>
  );
}
