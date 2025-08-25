"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  suffix?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string | ReactNode;
  success?: string | ReactNode;
  disabled?: boolean;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: ChangeEvent<HTMLInputElement>) => void;
};

const styles = (error: boolean, disabled: boolean) =>
  clsx({
    "file:text-foreground focus:border-brand-blue flex h-10 w-full rounded-lg border-2 border-transparent bg-[#FAF7F5] py-[7px] ps-3 pe-2 text-base font-normal outline-hidden transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50":
      true,
    "border border-[#EB0000] dark:border-warn-dark-500 hover:border-warn-light-500 hover:dark:border-warn-dark-500 focus:border-warn-light-500 focus:dark:border-warn-dark-500":
      error,
    "pointer-events-none text-gray-500 dark:text-gray-800 border border-input-light-border dark:border-input-dark-border hover:border-light-hoverborder hover:dark:border-hoverborder cursor-default":
      disabled,
  });

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      placeholder,
      defaultValue,
      suffix,
      required = false,
      error,
      disabled,
      success,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    return (
      <label className="font-primary text-base leading-5 space-y-0.5 font-medium">
        <span
          className="leading-5 block"
        >
          {label} {required && "*"}
        </span>
        <input
          suppressHydrationWarning
          ref={ref}
          className={styles(!!error, !!disabled)}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={props.autoComplete ?? "off"}
          onChange={(e) => onChange && onChange(e)}
          onBlur={(e) => onBlur && onBlur(e)}
          {...props}
        />

        {suffix && (
          <span className="z-30 absolute right-[3px] bottom-[22px] transform translate-y-1/2 bg-background-light-500 dark:bg-background-dark-500 p-2 rounded-sm">
            @{suffix}
          </span>
        )}

        <div className="leading-14.5px text-[#920000] dark:text-warn-dark-500 flex flex-row items-center">
          <span>{error ? error : " "}</span>
        </div>

        {success && (
          <div className="text-md mt-1 flex flex-row items-center text-green-500">
            <CheckCircleIcon className="h-4 w-4" />
            <span className="ml-1">{success}</span>
          </div>
        )}
      </label>
    );
  },
);
