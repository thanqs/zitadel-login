import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: AlertType;
};

export enum AlertType {
  ALERT,
  INFO,
}

export function Alert({ children, type = AlertType.ALERT }: Props) {
  return (
    <div
      style={{color: "#920000"}}
    >
      <span className="w-full">{children}</span>
    </div>
  );
}
