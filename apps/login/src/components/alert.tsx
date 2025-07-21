import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: AlertType;
};

export enum AlertType {
  ALERT,
  INFO,
}

const yellow =
  "border-yellow-600/40 dark:border-yellow-500/20 bg-yellow-200/30 text-yellow-600 dark:bg-yellow-700/20 dark:text-yellow-200";
const red =
  "border-red-600/40 dark:border-red-500/20 bg-red-200/30 text-red-600 dark:bg-red-700/20 dark:text-red-200";
const neutral =
  "border-divider-light dark:border-divider-dark bg-black/5 text-gray-600 dark:bg-white/10 dark:text-gray-200";

export function Alert({ children, type = AlertType.ALERT }: Props) {
  return (
    <div
      style={{color: "#920000"}}
    >
      <span className="text-sm w-full ">{children}</span>
    </div>
  );
}
