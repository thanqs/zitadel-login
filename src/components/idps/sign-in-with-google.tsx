"use client";

import { forwardRef } from "react";
import { Translated } from "../translated";
import { BaseButton, SignInWithIdentityProviderProps } from "./base-button";

export const SignInWithGoogle = forwardRef<
  HTMLButtonElement,
  SignInWithIdentityProviderProps
>(function SignInWithGoogle(props, ref) {
  const { children, name, ...restProps } = props;

  return (
    <BaseButton {...restProps} ref={ref}>
      <div className="h-5 w-5 flex items-center justify-center [&>svg]:size-8">
        <svg width="90" height="92" viewBox="0 0 90 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 47.1C90 44 89.7 40.8 89.2 37.8H45.9V55.5H70.7C69.7 61.2 66.4 66.2 61.5 69.4L76.3 80.9C85 72.8 90 61 90 47.1Z" fill="#4280EF"/>
        <path d="M45.9 91.8999C58.3 91.8999 68.7 87.7999 76.3 80.7999L61.5 69.3999C57.4 72.1999 52.1 73.7999 45.9 73.7999C33.9 73.7999 23.8 65.6999 20.1 54.8999L4.90002 66.5999C12.7 82.0999 28.5 91.8999 45.9 91.8999Z" fill="#34A353"/>
        <path d="M20.1 54.7999C18.2 49.0999 18.2 42.8999 20.1 37.1999L4.90002 25.3999C-1.59998 38.3999 -1.59998 53.6999 4.90002 66.5999L20.1 54.7999Z" fill="#F6B704"/>
        <path d="M45.9 18.2999C52.4 18.1999 58.8 20.6999 63.5 25.1999L76.6 11.9999C68.3 4.19989 57.3 -0.000110182 45.9 0.0998898C28.5 0.0998898 12.7 9.89989 4.90002 25.3999L20.1 37.1999C23.8 26.2999 33.9 18.2999 45.9 18.2999Z" fill="#E54335"/>
        </svg>
      </div>
      {children ? (
        children
      ) : (
        <Translated i18nKey="signInWithGoogle" namespace="idp" />
      )}
    </BaseButton>
  );
});
