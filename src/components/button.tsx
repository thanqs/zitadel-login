import { clsx } from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

export enum ButtonSizes {
  Small = "Small",
  Large = "Large",
}

export enum ButtonVariants {
  Primary = "Primary",
  Secondary = "Secondary",
  Destructive = "Destructive",
}

export enum ButtonColors {
  Neutral = "Neutral",
  Primary = "Primary",
  Warn = "Warn",
}

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: ButtonSizes;
  variant?: ButtonVariants;
  color?: ButtonColors;
};

export const getButtonClasses = (
  size: ButtonSizes,
  variant: ButtonVariants,
  color: ButtonColors,
) =>
  clsx({
    "inline-flex items-center h-10 justify-center gap-2 whitespace-nowrap rounded-3xl text-base font-semibold leading-5 transition cursor-pointer focus-visible:outline-hidden focus-visible:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 disabled:bg-neutral-200 disabled:text-neutral-400 font-primary":
      true,
    "disabled:border-none    disabled:cursor-not-allowed disabled:bg-[#E6E3E1] disabled:color-[#A2A2A2]":
      variant === ButtonVariants.Primary,
    "bg-[#ffcc00] text-[#16171C] hover:brightness-105 active:brightness-95":
      variant === ButtonVariants.Primary && color !== ButtonColors.Warn,
    "bg-warn-light-500 hover:bg-warn-light-400 text-white":
      variant === ButtonVariants.Primary && color === ButtonColors.Warn,
    "border border-button-light-border dark:border-button-dark-border text-gray-950 hover:bg-gray-500 hover:bg-opacity-20 hover:dark:bg-white hover:dark:bg-opacity-10 focus:bg-gray-500 focus:bg-opacity-20 focus:dark:bg-white focus:dark:bg-opacity-10 disabled:text-gray-600 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent disabled:cursor-not-allowed disabled:dark:text-gray-900":
      variant === ButtonVariants.Secondary,
    "border border-button-light-border dark:border-button-dark-border text-warn-light-500 hover:bg-warn-light-500 hover:bg-opacity-10 dark:hover:bg-warn-light-500 focus:bg-warn-light-500 focus:bg-opacity-20":
      color === ButtonColors.Warn && variant !== ButtonVariants.Primary,
    "w-full px-5": size === ButtonSizes.Large,
    "px-5": size === ButtonSizes.Small,
  });

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = ButtonVariants.Primary,
      size = ButtonSizes.Small,
      color = ButtonColors.Primary,
      ...props
    },
    ref,
  ) => (
    <button
      type="button"
      ref={ref}
      className={`${getButtonClasses(size, variant, color)} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
);
